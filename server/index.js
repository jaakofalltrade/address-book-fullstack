const express = require('express');
const massive = require('massive');

const endpoint = require('./controllers/endpoints.js');

massive({
	host: 'localhost',
	port: 5432,
	database: 'addressdb',
	user: 'postgres',
	password: 'addressdb'
})
.then(db => {
	const app = express();
	app.set('db', db);

	//Middlewares
	app.use(express.json());
	app.use(endpoint.tokenizer);

	//Routes
	app.post('/api/user', endpoint.createUser);
	app.post('/api/login', endpoint.login);
	app.post('/api/contact', endpoint.createContact);
	app.get('/api/contact/:contact', endpoint.getContactbyId)
	app.get('/api/contacts/:user', endpoint.getContacts);

	app.get('/', function(req, res) {
		res.status(200).send('<h1>Howdy!</h1>');
	});

	const PORT = 3002;
	app.listen(PORT, () => {
		console.log(`[+] Server listening at Port [${PORT}]`);
	});
});