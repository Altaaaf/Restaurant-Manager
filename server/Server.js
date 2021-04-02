const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const DatabaseConnection = require('./Database/Connection');
const passport = require('passport');
const Access = require('./Database/Models/Access');

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
app.use('/Api/Inventory', require('./routes/Inventory'));
app.use('/Api/Users', require('./routes/Users'));
app.use('/', require('./routes/mail'));

app.get('/ChangePermissions', async (req, res) => {
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
app.get('*', (req, res) => {
	res.status(200).json({ msg: 'Server is up and running...' });
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));
