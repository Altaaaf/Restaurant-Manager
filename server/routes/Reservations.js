const express = require('express');
const Reservation = require('../Database/Models/Reservation');
const { BookingForm } = require('../validator/Access');
const router = express.Router();

	

router.post('/BookingPage', async (req, res) => {
	try {
		const { error } = BookingPage(req.body);
		if (error) {
			console.error(error.message);
			return res.status(400).json({
				status: error.message,
			});
		}
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
