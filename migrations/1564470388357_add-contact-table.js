exports.shorthands = undefined;

exports.up = (pgm) => {
	pgm.createTable('contacts', {
		id: {
			type: 'serial',
			primaryKey: true
		},
		fname: {
			type: 'text',
			notNull: true
		},
		lname: {
			type: 'text',
		},
		home_phone: {
			type: 'text'
		},
		mobile_phone: {
			type: 'text'
		},
		work_phone: {
			type: 'text'
		},
		email: {
			type: 'text'
		},
		city: {
			type: 'text'
		},
		state_or_province: {
			type: 'text'
		},
		postal_code: {
			type: 'integer'
		},
		country: {
			type: 'text'
		}
	});
};

exports.down = (pgm) => {

};