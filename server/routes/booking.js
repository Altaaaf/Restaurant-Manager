const express = require('express');
const Reservation = require('../Database/Models/Booking');
const { Booking } = require('../validator/Access');
const router = express.Router();

router.get('/View', async (req, res) => {
	try {
		return res.status(200).json({ Bookings: await Reservation.find({}, { _id: 0 }) });
	} catch (err) {
		console.error(err);
		return res.status(500).json({ status: 'Server Error' });
	}
});

router.post('/booking', async (req, res) => {
	try {
		console.log(req.body);
		const { error } = Booking(req.body);
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

		let paylod = {
			ID: newID,
			booking_date: req.body.booking_date.split('T')[0],
			booking_time: req.body.booking_time,
			slot_id: req.body.slot_id,
			coverNo: req.body.coverNo,
			phone: req.body.phone,
			email: req.body.email,
			FirstName: req.body.FirstName,
			lastName: req.body.lastName,
			comment: req.body.comment,
			members: req.body.members,
			area_type: req.body.area_type,
		};
		const createBooking = new Reservation(paylod);
		createBooking.save().then((response) => {
			return res.json({ status: 'successfully saved booking!', data: response });
		});
	} catch (err) {
		console.log(err);
		res.json({ status: err.message });
	}
});

router.post('/booking/get', async (req, res) => {
	try {
		console.log('==============', req.body);
		var booking_time = req.body.booking_date;
		booking_time = booking_time.split('T')[0];
		console.log('==============', booking_time);
		Reservation.find({ booking_date: booking_time })
			.then((response) => {
				//console.log(response);
				return res.send(response);
			})
			.catch((err) => {
				console.log(err);
				return res.send(err);
			});
	} catch (err) {
		console.log(err);
		res.json({ status: err.message });
	}
});

module.exports = router;
