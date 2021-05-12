const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const DatabaseConnection = require('./Database/Connection');
const { verify } = require('./Helpers/Mail');
const passport = require('passport');
const User = require('./Database/Models/Access');
const jwt = require('jsonwebtoken');
const app = express();

// Connect to Mongo DB
DatabaseConnection();

// Establish and verify NodeMailer
verify();

// Middle wares
app.use(helmet());
app.enable('trust proxy', 1);
app.use(cors());
app.use(express.json());

//Passport middleware
app.use(passport.initialize());
/*
app.use(function (req, res, next) {
	try {
		if (req.headers.authorization === null || req.headers.authorization === undefined) {
			return res.status(404).json({ status: 'Please first log in before accessing API' });
		}
		const jwtAuth = jwt.decode(req.headers.authorization.split(' ')[1]);
		if (jwtAuth === null || jwtAuth === undefined) {
			return res
				.status(404)
				.json({ status: 'Invalid login session, please relogin to your account' });
		}
		User.findOne({ _id: jwtAuth.id }).then((user) => {
			if (user) {
				if (!(user.AccountType == 'Customer' || user.AccountType == 'Manager')) {
					return res.status(404).json({
						Status: 'You do not have privileges to be accessing the API at the moment',
					});
				}
			} else {
				return res.status(404).json({ status: 'Please first log in before accessing API' });
			}
		});
	} catch (err) {
		console.log(err);
		return res.status(404).json({
			Status: 'Unexpected failure when validating login session!',
		});
	}
	next();
});
*/
// Routes
app.use('/Api/Account', require('./routes/Access'));
app.use('/Api/Menu', require('./routes/Menu'));
app.use('/Api/Inventory', require('./routes/Inventory'));
app.use('/Api/Users', require('./routes/Users'));
app.use('/Api/Orders', require('./routes/Order'));
app.use('/Api/Reports', require('./routes/Reports'));
app.use('/Api/Misc', require('./routes/Misc'));
app.use('/Api/booking', require('./routes/booking'));
app.use('/', require('./routes/mail'));

app.get('*', (req, res) => {
	res.status(200).json({ msg: 'Server is up and running...' });
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));
