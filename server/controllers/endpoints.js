const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const secret = require('../../secret');

function createUser(req, res) {
	const db = req.app.get('db');
	const { username, password } = req.body;

	db.users.findOne({
		username
	})
	.then(user => {
		if(user) {
      		res.status(200).json({message: "Username already taken", result: false});
		} else {
			argon2.hash(password)
			.then(hash => {
				return db.users.insert({
					username: username,
					password: hash
				},
				{
					fields: ['id', 'username']
				});
			})
			.then(data => {
				const token = jwt.sign({ userId: data.id }, secret);
        		res.status(201).json({ ...data, token, message: "You have successfully signed up!", result: true });
        		console.log('[+] Inserting: Successful!');
			}).catch(err => {
				res.status(500).end();
				console.log(err);
			})
		}
	}).catch(err => {
		res.status(500).end();
		console.log(err);
	});
}

function login(req, res) {
	const db = req.app.get('db');
	const { username, password } = req.body;

	db.users.findOne({
		username,
	},
	{
		fields: ['id', 'username', 'password']
	})
	.then(user => {
		if(!user) {
			res.status(200).json({message: "Username/Password do not match", result: false});
			console.log('[+] User does not exist.');
		}
		return argon2.verify(user.password, password)
		.then(valid => {
			if(!valid) {
				res.status(200).json({message: "Username/Password do not match", result: false});
				console.log('[+] Wrong Password.');
			}
			const token = jwt.sign({ userId: user.id }, secret);
			delete user.password;
			console.log('[+] Login: Successful!');
			res.status(200).json({ ...user, token, message: "Logged In!", result: true });
		});
	}).catch(err => {
		console.log(err);
		res.status(500).end()
	})
}

function createContact(req, res) {
	const db = req.app.get('db');
	const { user } = req.query;
	const {
		fname,
		lname,
		home_phone,
		mobile_phone,
		work_phone,
		email,
		city,
		state_or_province,
		postal_code,
		country
	} = req.body;

	db.contacts.insert({
		fname,
		lname,
		home_phone,
		mobile_phone,
		work_phone,
		email,
		city,
		state_or_province,
		postal_code,
		country,
		address_book: [
			{
				user_id: user,
				contact_id: undefined
			}
		]
	},
	{
		deepInsert: true,
	})
	.then(contact => {
		console.log(`[+] Create Contacts: Successful!`)
		res.status(200).json({contact, message: "Contact added!", result: true});
	})
	.catch(err => {
		console.log(err);
		res.status(500).end();
	})
}

function getContacts(req, res) {
	const db = req.app.get('db');
	const { user } = req.params;
	db.query(`select * from address_book join contacts on contacts.id = address_book.contact_id where user_id = ${user}`)
	.then(response => {
		if(response.length > 0) {
			res.status(200).json({response, message: "Contacts Queried!", result: true})
		} else {
			res.status(200).json({message: "Empty!", result: false})
		}
	})
	.catch(err => {
		console.log(err);
		res.status(500).end();
	});

}

function getAddressBook(req, res) {
	console.log(`It works!`);
}

function deleteAddressBook(req, res) {
	const db = req.app.get('db');
	db.query(`delete from address_book where address_book.contact_id = ${req.params.id}`)
	.then(response => {
		console.log(response);
		res.status(200).json({message: "Contact Deleted!", result: true})
	}).catch(err => {
		console.log(err);
		res.status(500).end();
	})
}

function getContactbyId(req, res) {
	const db = req.app.get('db');
	const { contact } = req.params;

	db.contacts.findOne({
		id: contact
	})
	.then(data => {
		if(data) {
			console.log(`[+] Contact: Successfully queried with id: ${contact}`)
			res.status(200).json({data, message: "Contact Queried", result: true});
		} else {
			console.log(`[+] Contact: Failed Query with id: ${contact}`)
			res.status(204).end()
		}
	})
}

function tokenizer(req, res, next) {
	if((req.originalUrl === '/api/login') || (req.originalUrl == '/api/user')) {
	} else {
		console.log(`[!] Authorized: ${req.originalUrl}`)
    	if (!req.headers.authorization) {
      		return res.status(401).end();
    	}
    	try {
      		const token = req.headers.authorization.split(' ')[1];
      		jwt.verify(token, secret);
    	} catch (err) {
      		console.error(err);
      		res.status(401).end();
    	}
  	}
  next();
}

module.exports = {
	createUser,
	tokenizer,
	login,
	createContact,
	getContacts,
	getContactbyId,
	getAddressBook,
	deleteAddressBook,
}
