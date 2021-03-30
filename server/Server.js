const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const DatabaseConnection = require('./Database/Connection');
const passport = require('passport');
const Access = require('./Database/Models/Access');
const { update } = require('./Database/Models/Access');
const app = express();

// Connect to Mongo DB
DatabaseConnection();

// Middle wares
app.use(helmet());
app.enable('trust proxy', 1);
app.use(cors());
app.use(express.json());

//Passport middleware
app.use(passport.initialize());

// Routes

app.use('/Api/Account', require('./routes/Access'));
app.use('/Api/Menu', require('./routes/Menu'));
app.use('/Api/Reservations', require('./routes/Reservations'));

app.get('/ChangePermissions', (req, res) => {
	try {
		console.log(req.query.Email);
		if (req.query.Email === undefined) {
			return res
				.status(400)
				.json({ status: 'Enter an email you would like to switch permissions' });
		}
		var account = Access.find({ Email: req.query.Email });
		if (account.AccountType === undefined) {
			return res.status(400).json({ status: 'Email does not exist' });
		}
		console.log(account);
		console.log('Current perms: ' + account.AccountType);
		if (account.AccountType == 'Manager') {
			// change to customer
			const updateuser = Access.updateOne(
				{ Email: req.query.Email },
				{ $set: { AccountType: 'Customer' } },
			);
			return res
				.status(200)
				.json({ status: 'Successfully changed account permissions to Customer' });
		} else {
			const updateuser = Access.updateOne(
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
app.get('*', (req, res) => {
	res.status(200).json({ msg: 'Server is up and running...' });
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));
