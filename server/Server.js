const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors');
const helmet = require('helmet');
const DatabaseConnection = require('./Database/Connection');

const app = express();

// Connect to Mongo DB
DatabaseConnection();

// Middle wares
app.use(helmet());
app.enable('trust proxy', 1);
app.use(cors());
app.use(express.json());

app.get('*', (req, res) => {
	res.status(200).json({ msg: 'Server is up and running...' });
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));
