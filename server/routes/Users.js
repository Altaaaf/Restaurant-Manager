const express = require('express');
const Access = require('../Database/Models/Access');
const router = express.Router();

router.get('/View', async (req, res) => {
	try {
		return res
			.status(200)
			.json({
				Customers: await Access.find(
					{ AccountType: 'Customer' },
					{ _id: 0, Password: 0, EmailVerified: 0, AccountType: 0, Salary: 0 },
				),
				Managers: await Access.find(
					{ AccountType: 'Manager' },
					{ _id: 0, Password: 0, EmailVerified: 0, AccountType: 0, Salary: 0 },
				),
			});
	} catch (err) {
		console.error(err);
		return res.status(500).json({ status: 'Server Error' });
	}
});
module.exports = router;
