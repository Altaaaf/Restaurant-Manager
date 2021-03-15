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

module.exports = { Login, Register };
