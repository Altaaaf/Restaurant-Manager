const Joi = require('joi');

const Login = (data) => {
	const schema = Joi.object({
		Email: Joi.string()
			.email({ minDomainSegments: 2, tlds: { allow: ['com', 'edu'] } })
			.required(),
		Password: Joi.string().min(8).required(),
	});
	return schema.validate(data);
};

const Register = (data) => {
	const schema = Joi.object({
		FirstName: Joi.string().min(2).required(),
		LastName: Joi.string().min(2).required(),
		Username: Joi.string().min(7).required(),
		Email: Joi.string()
			.email({ minDomainSegments: 2, tlds: { allow: ['com', 'edu'] } })
			.required(),
		Password: Joi.string().min(8).required('Password needs 8 letters or numbers'),
		PasswordConfirmation: Joi.string().min(8).required(),
		AccountType: Joi.string(),
	});
	return schema.validate(data);
};

const Booking = (data) => {
	const schema = Joi.object({
		booking_date: Joi.string().required(),
		booking_time: Joi.string().required(),
		slot_id: Joi.number().required(),
		coverNo: Joi.number().required(),
		phone: Joi.string().required(),
		email: Joi.email().required(),
		FirstName: Joi.string().required(),
		lastName: Joi.string().required(),
		comment: Joi.string(),
		members: Joi.number(),
		area_type: Joi.string(),
	});
	return schema.validate(data);
};

const AddItem = (data) => {
	const schema = Joi.object({
		Name: Joi.string().min(1).required('Any name to describe the item'),
		Price: Joi.number().required('Dollar amount for the item'),
		Description: Joi.string(),
		Type: Joi.string().valid('mains', 'drinks', 'sides').required('Either, Drinks, Sides or Mains'),
	});
	return schema.validate(data);
};

module.exports = { Login, Register, booking, AddItem };
