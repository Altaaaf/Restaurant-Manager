const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const DatabaseConnection = require('./Database/Connection');
const { verify } = require('./Helpers/Mail');
const passport = require('passport');
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

// Routes

app.use('/Api/Account', require('./routes/Access'));
app.use('/Api/Menu', require('./routes/Menu'));
app.use('/Api/Reservations', require('./routes/Reservations'));
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
