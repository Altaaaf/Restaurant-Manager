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
		FirstName: Joi.string()
			.regex(/^[A-Z]+$/)
			.required(),
		lastName: Joi.string()
			.regex(/^[A-Z]+$/)
			.required(),
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

const BookingPage = (data) => {
	const schema = Joi.object({
		firstName: Joi.string()
			.regex(/^[A-Z]+$/)
			.required(),
		lastName: Joi.string()
			.regex(/^[A-Z]+$/)
			.required(),
		coverNo: Joi.number().min(2).required('reservation for 2 people and up'),
		phone: Joi.string()
			.regex(/^\d{3}-\d{3}-\d{4}$/)
			.required('10 digits phone number'),
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

module.exports = { Login, Register, BookingPage, AddItem };
