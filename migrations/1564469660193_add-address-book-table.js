exports.shorthands = undefined;

exports.up = (pgm) => {
	pgm.createTable('address_book', {
		id: {
			type: 'serial',
			primaryKey: true
		},
		userId: {
			type: 'integer',
			reference: '"users"',
			notNull: true
		},
		contactId: {
			type: 'integer',
			reference: '"contacts"',
			notNull: true
		}
	})
};

exports.down = (pgm) => {

};
