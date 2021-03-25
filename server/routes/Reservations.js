const express = require('express');
const Reservation = require('../Database/Models/Reservation');
const router = express.Router();

router.post('/CreateReservation', async (req, res) => {
	try {
		const CreateReservation_ = new Reservation({
			FirstName: req.body.firstName,
			LastName: req.body.lastName,
			PhoneNumber: req.body.phone,
			ReservationTime: req.body.diningDate,
			People: req.body.coverNo,
		});
		CreateReservation_.save();
		res.json({ status: 'successfully saved booking!' });
	} catch (err) {
		res.json({ status: err.message });
	}
});
module.exports = router;
