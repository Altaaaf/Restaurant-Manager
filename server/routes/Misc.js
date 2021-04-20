const express = require('express');
const bcrypt = require('bcryptjs');
const Access = require('../Database/Models/Access');
const Verification = require('../Database/Models/Verification');
const { AlphanumericGen } = require('../Helpers/Generators');
const nodemailer = require('nodemailer');
require('dotenv/config');
const router = express.Router();

router.get('/verify/:code', async (req, res) => {
	try {
		//req.params.code
		const findverification = await Verification.findOne({ Code: req.params.code });
		if (typeof findverification === undefined || findverification === null) {
			return res.status(400).json({ status: 'Verification code does not exist!' });
		}
		const findEmail = await Access.findOne({ Email: findverification.Email });
		if (typeof findEmail === undefined || findEmail === null) {
			return res.status(400).json({ status: 'Email does not exist' });
		}
		const updateVerificationStatus = await Access.findByIdAndUpdate(findEmail._id, {
			EmailVerified: true,
		});
		const deleteAllVerificationEmails = await Verification.deleteMany({
			Email: findverification.Email,
		});
		res.json({ status: 'Successfully verified email account!' });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ status: 'Server Error!' });
	}
});
router.post('/verify', async (req, res) => {
	try {
		const EmailAddress = req.body.Email;
		if (typeof EmailAddress === undefined || EmailAddress === null) {
			return res.status(400).json({ status: 'Missing email address' });
		}

		const User = await Access.findOne({ Email: EmailAddress });
		if (typeof User === undefined || User === null) {
			return res.status(400).json({ status: 'Email does not exist' });
		}
		if (User.EmailVerified) {
			return res.status(400).json({ status: 'Email is already verified!' });
		}
		const deleteAllVerifications = await Verification.deleteMany({ Email: req.body.Email });

		console.log(deleteAllVerifications);

		const VerificationCode = AlphanumericGen(64);

		const addVerification = new Verification({
			Email: req.body.Email,
			Code: VerificationCode,
		});
		addVerification.save();
        const contactEmail = nodemailer.createTransport({
            service: 'gmail',
            auth: {
            user: 'Barnslink@gmail.com',
            pass: 'Nyit2021',
},
        });
        
        const verify = () => {
            contactEmail.verify((error) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Ready to Send');
                }
            });
        };
		const mail = {
			from: process.env.EMAIL,
			to: EmailAddress,
			subject: 'Email Verification!',
			html: `<p>Your verfication link is http://localhost:5000/Api/Misc/Verify/${VerificationCode}</p>`,
		};
		contactEmail.sendMail(mail, (error) => {
			if (error) {
				console.log('the error is: ' + error);
				res.json({ status: error });
			} else {
				res.json({ status: 'Successfully sent an email with verification link' });
			}
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json({ status: 'Server Error!' });
	}
});
router.post('/ForgotPassword', async (req, res) => {
	try {
		const EmailAddress = req.body.Email;
		if (typeof EmailAddress === undefined || EmailAddress === null) {
			return res.status(400).json({ status: 'Missing email address' });
		}

		const User = await Access.findOne({ Email: EmailAddress });
		if (typeof User === undefined || User === null) {
			return res.status(400).json({ status: 'Email does not exist' });
		}

		const newPassword = AlphanumericGen(15);

		const updatePassword = await Access.findByIdAndUpdate(User._id, {
			Password: bcrypt.hashSync(newPassword, 10),
		});
		console.log(updatePassword);
        const contactEmail = nodemailer.createTransport({
            service: 'gmail',
            auth: {
            user: 'Barnslink@gmail.com',
            pass: 'Nyit2021',
},
        });
        
        const verify = () => {
            contactEmail.verify((error) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Ready to Send');
                }
            });
        };
		const mail = {
			from: process.env.EMAIL,
			to: EmailAddress,
			subject: 'Forgot password!',
			html: `<p>Your new password is: ${newPassword} </p>`,
		};
		contactEmail.sendMail(mail, (error) => {
			if (error) {
				console.log('the error is: ' + error);
				res.json({ status: error });
			} else {
				res.json({ status: 'Successfully sent an email with new login password!' });
			}
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json({ status: 'Server Error!' });
	}
});

router.get('/ChangePermissions', async (req, res) => {
	try {
		if (typeof req.query.Email === undefined || req.query.email === null) {
			return res
				.status(400)
				.json({ status: 'Enter an email you would like to switch permissions' });
		}
		const account = await Access.findOne({ Email: req.query.Email });
		if (typeof account.AccountType === undefined || account.AccountType === null) {
			return res.status(400).json({ status: 'Email does not exist' });
		}
		if (account.AccountType == 'Manager') {
			// change from customer to manager
			const updateuser = await Access.updateOne(
				{ Email: req.query.Email },
				{ $set: { AccountType: 'Customer' } },
			);
			return res
				.status(200)
				.json({ status: 'Successfully changed account permissions to Customer' });
		} else {
			// change from customer to manager
			const updateuser = await Access.updateOne(
				{ Email: req.query.Email },
				{ $set: { AccountType: 'Manager' } },
			);
			return res
				.status(200)
				.json({ status: 'Successfully changed account permissions to Manager' });
		}
	} catch (err) {
		console.log(err);
		return res.status(500).json({ status: 'Server Error!' });
	}
});
module.exports = router;