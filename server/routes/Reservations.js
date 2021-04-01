const express = require('express');
const Reservation = require('../Database/Models/Reservation');
const { BookingPage } = require('../validator/Access');
const router = express.Router();

router.get('/View', async (req, res) => {
	try {
		let BookingsList = [];

		let Booking = await Reservation.find();
		for (var item_ = 0; item_ < Booking.length; item_++) {
			var item = Booking[item_];

			BookingsList.push({
				ReservationTime: item.ReservationTime,
				coverNo: item.coverNo,
				phone: item.phone,
				FirstName: item.FirstName,
				lastName: item.lastName,
			});
		}
		res.status(200).json({ Bookings: BookingsList });
	} catch (err) {
		console.error(err);
		res.status(500).json({ status: 'Server Error' });
	}
});

router.post('/BookingPage', async (req, res) => {
	try {
		//const { error } = BookingPage(req.body);
		//if (error) {
		//	console.error(error.message);
		//	return res.status(400).json({
		//		status: error.message,
		//	});
		//}
		const CreateReservation_ = new Reservation({
			FirstName: req.body.firstName,
			lastName: req.body.lastName,
			phone: req.body.phone,
			ReservationTime: req.body.diningDate,
			coverNo: req.body.coverNo,
		});
		CreateReservation_.save();
		res.json({ status: 'successfully saved booking!' });
	} catch (err) {
		res.json({ status: err.message });
	}
});
module.exports = router;
