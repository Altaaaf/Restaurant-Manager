const express = require('express');
const router = express.Router();

// Login
router.post('/Login', async (req, res) => {
	try {
		res.status(200).json({ status: 'Login isnt implemented yet' });
	} catch (err) {
		console.error(err.message);
		res.status(500).json({ status: 'Server Error' });
	}
});

// Register
router.post('/Register', async (req, res) => {
	try {
		res.status(200).json({ status: 'Register isnt implemented yet' });
	} catch (err) {
		console.error(err.message);
		res.status(500).json({ status: 'Server Error' });
	}
});

module.exports = router;
