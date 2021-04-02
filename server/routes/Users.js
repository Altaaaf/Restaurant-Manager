const express = require('express');
const Access = require('../Database/Models/Access');
const router = express.Router();

router.get('/View', async (req, res) => {
	try {
		let Customers = [];
		let Managers = [];

		let AllUsers = await Access.find();
		for (var user = 0; user < AllUsers.length; user++) {
			var current_user = AllUsers[user];
			console.log(current_user.AccountType);

			if (current_user.AccountType == 'Customer') {
				Customers.push({
					Username: current_user.Username,
					Email: current_user.Email,
					PhoneNumber: current_user.PhoneNumber,
					FirstName: current_user.FirstName,
					LastName: current_user.LastName,
				});
			} else if (current_user.AccountType == 'Manager') {
				Managers.push({
					Username: current_user.Username,
					Email: current_user.Email,
					PhoneNumber: current_user.PhoneNumber,
					FirstName: current_user.FirstName,
					LastName: current_user.LastName,
				});
			}
		}
		res.status(200).json({ Customers: Customers, Managers: Managers });
	} catch (err) {
		console.error(err.message);
		res.status(500).json({ status: 'Server Error' });
	}
});
module.exports = router;
