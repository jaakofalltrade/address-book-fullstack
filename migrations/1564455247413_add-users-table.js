exports.shorthands = undefined;

exports.up = (pgm) => {
	pgm.createTable('users', {
		id: {
			type: 'serial',
			primaryKey: true,
		},
		username: {
			type: 'text',
			notNull: true
		},
		password: {
			type: 'text',
			notNull: true
		}
	})
};

exports.down = (pgm) => {

};
