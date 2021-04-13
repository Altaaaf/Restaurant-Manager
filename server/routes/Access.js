const express = require('express');
const bcrypt = require('bcryptjs');
const { Login, Register } = require('../validator/Access');
const Access = require('../Database/Models/Access');
const jwt = require('jsonwebtoken');
require('dotenv/config');
const router = express.Router();

// /api/account/Login
router.post('/Login', async (req, res) => {
	try {
		const { error } = Login(req.body);
		if (error) {
			console.error(error.message);
			return res.status(400).json({
				status: error.message,
			});
		}
		// validate username exists before continuing
		Access.findOne({ Email: req.body.Email }).then((user) => {
			if (user) {
				if (bcrypt.compareSync(req.body.Password, user.Password)) {
					jwt.sign(
						{
							id: user.id,
							name: user.Username,
							accountType: user.AccountType,
						},
						process.env.secretOrKey,
						{
							expiresIn: 31556926, // 1 year in seconds
						},
						(err, token) => {
							res.json({
								success: true,
								token: 'Bearer ' + token,
								error: err,
							});
						},
					);
				} else {
					return res.status(400).json({ status: 'incorrect password!' });
				}
			} else {
				return res.status(400).json({ status: 'username does not exist' });
			}
		});
	} catch (err) {
		console.error(err.message);
		res.status(500).json({ status: 'Server Error' });
	}
});

// /api/account/Register
router.post('/Register', async (req, res) => {
	try {
		// validate the parameters sent in request body are what's required
		const { error } = Register(req.body);
		if (error) {
			console.error(error.message);
			return res.status(400).json({
				status: error.message,
			});
		}

		// check to see both passwords are the same
		// probably do it on client side!

		//validate email doesn't exist already
		// If email exists already return error
		// If email does not exist create new user with hashed password
		Access.findOne({ Email: req.body.Email }).then((user) => {
			if (user) {
				return res.status(400).json({ status: 'username already exists' });
			} else {
				//const HashedPassword = await bcrypt.hash(req.body.Password, 10)
				try {
					const RegisterUser = new Access({
						Username: req.body.Username,
						Email: req.body.Email,
						FirstName: req.body.FirstName,
						LastName:req.body.LastName,
						Password: bcrypt.hashSync(req.body.Password, 10),
						AccountType: req.body.AccountType,
					});
					RegisterUser.save();
					return res.status(200).json({ status: 'Successfully registered user' });
				} catch {
					res.status(500).json({ status: 'Server Error' });
				}
			}
		});
	} catch (err) {
		console.error(err.message);
		res.status(500).json({ status: 'Server Error' });
	}
});

module.exports = router;
