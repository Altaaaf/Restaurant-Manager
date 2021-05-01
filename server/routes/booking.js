const express = require('express');
const Reservation = require('../Database/Models/Booking');
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

router.post('/booking', async (req, res) => {
    try {
        console.log(req.body);
        let paylod = {
            booking_date: req.body.booking_date,
            booking_time: req.body.booking_time,
            slot_id: req.body.slot_id,
            coverNo: req.body.coverNo,
            phone: req.body.phone,
            email: req.body.email,
            FirstName: req.body.FirstName,
            lastName: req.body.lastName,
            comment: req.body.comment,
            members: req.body.members,
          area_type: req.body.area_type
        }

        const createBooking = new Reservation(paylod)
        createBooking.save().then(response => {
            return res.json({ status: 'successfully saved booking!', data: response });
        })
    } catch (err) {
        res.json({ status: err.message });
    }
});


router.post('/booking/get', async (req, res) => {
    try {
        console.log("==============", req.body);
        Reservation.find({ booking_date: req.body.booking_date }).then(response => {
            return res.send(response);
        }).catch(err => {
            console.log(err)
            return res.send(err)
        })
    } catch (err) {
        res.json({ status: err.message });
    }
});

module.exports = router;
