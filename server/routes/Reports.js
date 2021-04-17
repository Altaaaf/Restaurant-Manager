const express = require('express');
const Access = require('../Database/Models/Access');
const Reservation = require('../Database/Models/Reservation');
const Order = require('../Database/Models/Orders');
const router = express.Router();

router.get('/Orders', async (req, res) => {
	try {
		let TableColumns = [
			{
				headerName: 'ID',
				field: 'ID',
				editable: false,
				sortable: true,
				filter: true,
				checkboxSelection: true,
			},
			{
				headerName: 'Customer Name',
				field: 'CustomerName',
				editable: true,
				sortable: true,
				filter: true,
				checkboxSelection: true,
			},
			{
				headerName: 'Subtotal',
				field: 'Subtotal',
				editable: false,
				sortable: true,
				filter: true,
				checkboxSelection: true,
			},
			{
				headerName: 'Tax',
				field: 'Tax',
				editable: false,
				sortable: true,
				filter: true,
			},
			{
				headerName: 'Order Date',
				field: 'createdDate',
				editable: false,
				sortable: true,
				filter: true,
				checkboxSelection: true,
			},
		];
		let orderList = [];
		let Orders = await Order.find();
		for (var item_ = 0; item_ < Orders.length; item_++) {
			const item = Orders[item_];
			const EntireOrder = item.Order;
			var total = 0;
			for (var i = 0; i < EntireOrder.length; i++) {
				total += EntireOrder[i].Quantity * EntireOrder[i].Price;
			}
			orderList.push({
				ID: item._id,
				CustomerName: item.CustomerName,
				Subtotal: (total.toLocaleString() * 1.0875).toFixed(2),
				Tax: (total * 0.0875).toFixed(2),
				createdDate: `${item.createdAt ? item.createdAt : new Date().toUTCString()}`,
			});
		}
		res.status(200).json({ Columns: TableColumns, RowInformation: orderList });
	} catch (err) {
		console.error(err);
		res.status(500).json({ status: 'Server Error' });
	}
});
router.get('/Reservations', async (req, res) => {
	try {
		let TableColumns = [
			{
				headerName: 'ID',
				field: 'ID',
				sortable: true,
				filter: true,
				checkboxSelection: true,
			},
			{
				headerName: 'First Name',
				field: 'FirstName',
				sortable: true,
				filter: true,
				checkboxSelection: true,
			},
			{
				headerName: 'Last Name',
				field: 'lastName',
				sortable: true,
				filter: true,
				checkboxSelection: true,
			},
			{
				headerName: 'phone',
				field: 'phone',
				editable: true,
				sortable: true,
				filter: true,
				checkboxSelection: true,
			},
			{
				headerName: 'Number of People',
				field: 'coverNo',
				editable: true,
				sortable: true,
				filter: true,
				checkboxSelection: true,
			},
			{
				headerName: 'ReservationTime',
				field: 'ReservationTime',
				editable: true,
				sortable: true,
				filter: true,
				checkboxSelection: true,
			},
		];
		let BookingsList = [];

		let Booking = await Reservation.find();
		for (var item_ = 0; item_ < Booking.length; item_++) {
			var item = Booking[item_];

			BookingsList.push({
				ID: item._id,
				ReservationTime: item.ReservationTime,
				coverNo: item.coverNo,
				phone: item.phone,
				FirstName: item.FirstName,
				lastName: item.lastName,
			});
		}
		res.status(200).json({ Columns: TableColumns, RowInformation: BookingsList });
	} catch (err) {
		console.error(err);
		res.status(500).json({ status: 'Server Error' });
	}
});
router.get('/Managers', async (req, res) => {
	try {
		try {
			let TableColumns = [
				{
					headerName: 'ID',
					field: 'ID',
					sortable: true,
					filter: true,
					checkboxSelection: true,
				},
				{
					headerName: 'Username',
					field: 'Username',
					editable: true,
					sortable: true,
					filter: true,
					checkboxSelection: true,
				},
				{
					headerName: 'Email',
					field: 'Email',
					sortable: true,
					filter: true,
					checkboxSelection: true,
				},
				{
					headerName: 'PhoneNumber',
					field: 'PhoneNumber',
					editable: true,
					sortable: true,
					filter: true,
					checkboxSelection: true,
				},
				{
					headerName: 'FirstName',
					field: 'FirstName',
					editable: true,
					sortable: true,
					filter: true,
					checkboxSelection: true,
				},
				{
					headerName: 'LastName',
					field: 'LastName',
					editable: true,
					sortable: true,
					filter: true,
					checkboxSelection: true,
				},
			];
			let Managers = [];

			let AllUsers = await Access.find();
			for (var user = 0; user < AllUsers.length; user++) {
				var current_user = AllUsers[user];

				if (current_user.AccountType == 'Manager') {
					Managers.push({
						ID: current_user._id,
						Username: current_user.Username,
						Email: current_user.Email,
						PhoneNumber: current_user.PhoneNumber,
						FirstName: current_user.FirstName,
						LastName: current_user.LastName,
					});
				}
			}
			res.status(200).json({ Columns: TableColumns, RowInformation: Managers });
		} catch (err) {
			console.error(err);
			res.status(500).json({ status: 'Server Error' });
		}
	} catch (err) {
		console.error(err);
		res.status(500).json({ status: 'Server Error' });
	}
});
router.get('/Customers', async (req, res) => {
	try {
		let TableColumns = [
			{
				headerName: 'ID',
				field: 'ID',
				sortable: true,
				filter: true,
				checkboxSelection: true,
			},
			{
				headerName: 'Username',
				field: 'Username',
				sortable: true,
				filter: true,
				checkboxSelection: true,
			},
			{
				headerName: 'Email',
				field: 'Email',
				sortable: true,
				filter: true,
				checkboxSelection: true,
			},
			{
				headerName: 'PhoneNumber',
				field: 'PhoneNumber',
				editable: true,
				sortable: true,
				filter: true,
			},
			{
				headerName: 'FirstName',
				field: 'FirstName',
				editable: true,
				sortable: true,
				filter: true,
				checkboxSelection: true,
			},
			{
				headerName: 'LastName',
				field: 'LastName',
				editable: true,
				sortable: true,
				filter: true,
				checkboxSelection: true,
			},
		];
		let Customers = [];

		let AllUsers = await Access.find();
		for (var user = 0; user < AllUsers.length; user++) {
			var current_user = AllUsers[user];

			if (current_user.AccountType == 'Customer') {
				Customers.push({
					ID: current_user._id,
					Username: current_user.Username,
					Email: current_user.Email,
					PhoneNumber: current_user.PhoneNumber,
					FirstName: current_user.FirstName,
					LastName: current_user.LastName,
				});
			}
		}
		res.status(200).json({ Columns: TableColumns, RowInformation: Customers });
	} catch (err) {
		console.error(err);
		res.status(500).json({ status: 'Server Error' });
	}
});

router.put('/Modify/Reservations', async (req, res) => {
	try {
		const Changes = req.body.updates;
		for (var index = 0; index < Changes.length; index++) {
			const newRecord = Changes[index];
			const ID = newRecord.ID;
			delete newRecord['ID'];
			await Reservation.findByIdAndUpdate(ID, newRecord);
		}
		res.status(200).json({ status: 'Successfully made changes' });
	} catch (err) {
		console.error(err);
		res.status(500).json({ status: 'Server Error' });
	}
});
router.put('/Modify/Customers', async (req, res) => {
	try {
		const Changes = req.body.updates;
		for (var index = 0; index < Changes.length; index++) {
			const newRecord = Changes[index];
			const ID = newRecord.ID;
			delete newRecord['ID'];
			await Access.findByIdAndUpdate(ID, newRecord);
		}
		res.status(200).json({ status: 'Successfully made changes' });
	} catch (err) {
		console.error(err);
		res.status(500).json({ status: 'Server Error' });
	}
});
router.put('/Modify/Managers', async (req, res) => {
	try {
		const Changes = req.body.updates;
		for (var index = 0; index < Changes.length; index++) {
			const newRecord = Changes[index];
			const ID = newRecord.ID;
			delete newRecord['ID'];
			await Access.findByIdAndUpdate(ID, newRecord);
		}
		res.status(200).json({ status: 'Successfully made changes' });
	} catch (err) {
		console.error(err);
		res.status(500).json({ status: 'Server Error' });
	}
});
router.put('/Modify/Orders', async (req, res) => {
	try {
		res.status(200).json({ status: 'Successfully made changes' });
	} catch (err) {
		console.error(err);
		res.status(500).json({ status: 'Server Error' });
	}
});
module.exports = router;
