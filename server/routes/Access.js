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
		// validate email exists before checking password
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
		const { error } = Register(req.body);
		if (error) {
			console.error(error.message);
			return res.status(400).json({
				status: error.message,
			});
		}

		Access.findOne({ Email: req.body.Email }).then((user) => {
			if (user) {
				return res.status(400).json({ status: 'username already exists' });
			} else {
				try {
					const RegisterUser = new Access({
						FirstName: req.body.FirstName,
						LastName: req.body.LastName,
						Username: req.body.Username,
						Email: req.body.Email,
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
