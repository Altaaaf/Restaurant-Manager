const Joi = require('joi');

const Login = (data) => {
	const schema = Joi.object({
		Email: Joi.string().email().required(),
		Password: Joi.string().min(8).required(),
	});
	return schema.validate(data);
};

const Register = (data) => {
	const schema = Joi.object({
		Username: Joi.string().min(7).required(),
		Email: Joi.string().email().required(),
		Password: Joi.string().min(8).required(),
		PasswordConfirmation: Joi.string().min(8).required(),
		AccountType: Joi.string(),
	});
	return schema.validate(data);
};

const BookingPage = (data) => {
	const schema = Joi.object({
		firstName: Joi.string().min(1).required(),
		lastName: Joi.string().min(1).required(),
		coverNo: Joi.string().min(2).required("reservation for 2 people and up"),
		phone:Joi.string().min(10).required("10 digits phone number")
	});
	return schema.validate(data);
};
module.exports = { Login, Register, BookingPage };
