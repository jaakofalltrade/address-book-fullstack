exports.shorthands = undefined;

exports.up = (pgm) => {
	pgm.createTable('address_book', {
		id: {
			type: 'serial',
			primaryKey: true
		},
		user_id: {
			type: 'integer',
			reference: '"users"',
			notNull: true
		},
		contact_id: {
			type: 'integer',
			reference: '"contacts"',
			notNull: true
		}
	})
};

exports.down = (pgm) => {

};
