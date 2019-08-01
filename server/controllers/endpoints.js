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
			throw new Error('Username already taken!');
      		res.status(500).end();
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
        		res.status(201).json({ ...data, token });
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
			res.status(500).end();
			console.log('[+] User does not exist.');
		}
		return argon2.verify(user.password, password)
		.then(valid => {
			if(!valid) {
				res.status(500).end();
				console.log('[+] Wrong Password.');
			}
			const token = jwt.sign({ userId: user.id }, secret);
			delete user.password;
			console.log('[+] Login: Successful!');
			res.status(200).json({ ...user, token });
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
				userId: user,
				contactId: undefined
			}
		]
	},
	{
		deepInsert: true,
	})
	.then(contact => {
		console.log(`[+] Create Contacts: Successful!`)
		res.status(200).json(contact);
	})
	.catch(err => {
		console.log(err);
		res.status(500).end();
	})
}

function getContacts(req, res) {
	const db = req.app.get('db');
	const { user } = req.params;
	db.address_book.find({
		userId: user
	})
	.then(result => {
		if(result.length === 0) {
			res.status(204).end();
		} else {
			let count = 0;
			let conts = [];
			result.map(async (x) => {
				await db.contacts.findOne({
					id: x.contactId
				})
				.then((data) => {
					count++;
					conts.push(data);
					if(count === result.length) {
						console.log(`[+] Contacts: Successfully queried with user id: ${user}`)
						res.status(200).json(conts);
					}
				});
			});
			count = 0;
		}
	})
	.catch(err => {
		console.log(err);
		res.status(204).end();
	});

}

function getAddressBook(req, res) {
	console.log(`It works!`);
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
			res.status(200).json(data);
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
	getAddressBook
}
