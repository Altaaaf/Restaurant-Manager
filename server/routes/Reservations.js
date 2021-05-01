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
				FirstName: item.firstName,
				lastName: item.lastName,
				ID: `${item.ID ? item.ID : item._id}`,
			});
		}
		return res.status(200).json({ Bookings: BookingsList });
	} catch (err) {
		console.error(err);
		return res.status(500).json({ status: 'Server Error' });
	}
});

router.post('/BookingPage', async (req, res) => {
	try {
		const { error } = BookingPage(req.body);
		if (error) {
			console.error(error.message);
			return res.status(400).json({
				status: error.message,
			});
		}
		// create ReservationID
		var newID = 1;
		const mostRecentReservation = await Reservation.find().limit(1).sort({ _id: -1 });
		if (mostRecentReservation[0].ID !== undefined && mostRecentReservation[0].ID !== null) {
			newID = mostRecentReservation[0].ID + 1;
		}
		const CreateReservation_ = new Reservation({
			ID: newID,
			FirstName: req.body.FirstName,
			lastName: req.body.lastName,
			phone: req.body.phone,
			ReservationTime: req.body.ReservationTime,
			coverNo: req.body.coverNo,
		});
		CreateReservation_.save();
		return res.status(200).json({ status: 'successfully saved booking!' });
	} catch (err) {
		console.error(err);
		return res.status(500).json({ status: 'Server Error' });
	}
});
module.exports = router;
