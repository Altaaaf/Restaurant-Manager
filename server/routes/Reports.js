const express = require('express');
const Access = require('../Database/Models/Access');
const Reservation = require('../Database/Models/Booking');
const Order = require('../Database/Models/Orders');
const Inventory = require('../Database/Models/Inventory');
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
				
			},
			{
				headerName: 'Customer Name',
				field: 'CustomerName',
				editable: true,
				sortable: true,
				filter: true,
				
			},
			{
				headerName: 'Subtotal',
				field: 'Subtotal',
				editable: false,
				sortable: true,
				filter: true,
				
			},
			{
				headerName: 'Total',
				field: 'Total',
				editable: false,
				sortable: true,
				filter: true,
				
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
				ID: `${item.ID ? item.ID : item._id}`,
				CustomerName: item.CustomerName,
				Subtotal: (total.toLocaleString() * 1.0875).toFixed(2),
				Total: total.toLocaleString(),
				Tax: (total * 0.0875).toFixed(2),
				createdDate: `${item.createdDate ? item.createdDate : new Date().toUTCString()}`,
			});
		}
		return res.status(200).json({ Columns: TableColumns, RowInformation: orderList });
	} catch (err) {
		console.error(err);
		return res.status(500).json({ status: 'Server Error' });
	}
});

router.get('/Inventory', async (req, res) => {
	try {
		let TableColumns = [
			{
				headerName: 'Item Name',
				field: 'Name',
				editable: false,
				sortable: true,
				filter: true,
				
			},
			{
				headerName: 'Quantity',
				field: 'Quantity',
				editable: true,
				sortable: true,
				filter: true,
				
			},
			{
				headerName: 'Total Used',
				field: 'TotalRequests',
				editable: true,
				sortable: true,
				filter: true,
				
			},
			{
				headerName: 'In stock quantity',
				field: 'TotalLeft',
				editable: true,
				sortable: true,
				filter: true,
				
			},
			
		];
		let inventoryList = [];
		let inventory = await Inventory.find();
		for (var item_ = 0; item_ < inventory.length; item_++) {
			const Inventory = inventory[item_];
			inventoryList.push({
					Name: Inventory.Name,
					Quantity: Inventory.Quantity,
					TotalRequests: Inventory.TotalRequests,
					TotalLeft:((Inventory.Quantity)-(Inventory.TotalRequests)),
			});
		}
		return res.status(200).json({ Columns: TableColumns, RowInformation: inventoryList });
	} catch (err) {
		console.error(err);
		return res.status(500).json({ status: 'Server Error' });
	}
});
router.get('/Booking', async (req, res) => {
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
				editable: true,
				sortable: true,
				filter: true,
				
			},
			{
				headerName: 'Last Name',
				field: 'lastName',
				editable: true,
				sortable: true,
				filter: true,
			
			},
			{
				headerName: 'phone',
				field: 'phone',
				editable: true,
				sortable: true,
				filter: true,
			
			},
			{
				headerName: 'Number of People',
				field: 'members',
				editable: false,
				sortable: true,
				filter: true,
				
			},
			{
				headerName: 'Area',
				field: 'area_type',
				editable: true,
				sortable: true,
				filter: true,
				
			},
			{
				headerName: 'ReservationTime',
				field: 'booking_date',
				editable: false,
				sortable: true,
				filter: true,
			},
			{
				headerName: 'ReservationTime',
				field: 'booking_time',
				editable: false,
				sortable: true,
				filter: true,
				
			},
		];
		let BookingsList = [];

		let Booking = await Reservation.find();
		for (var item_ = 0; item_ < Booking.length; item_++) {
			const booking = Booking[item_];

			BookingsList.push({	
			booking_date: booking.booking_date,
			booking_time: booking.booking_time,
			slot_id: booking.slot_id,
			coverNo: booking.coverNo,
			phone: booking.phone,
			email: booking.email,
			FirstName: booking.FirstName,
			lastName: booking.lastName,
			comment: booking.comment,
			members: booking.members,
			area_type: booking.area_type,
			});
		}
		return res.status(200).json({ Columns: TableColumns, RowInformation: BookingsList });
	} catch (err) {
		console.error(err);
		return res.status(500).json({ status: 'Server Error' });
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
					editable: true,
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
			return res.status(200).json({ Columns: TableColumns, RowInformation: Managers });
		} catch (err) {
			console.error(err);
			return res.status(500).json({ status: 'Server Error' });
		}
	} catch (err) {
		console.error(err);
		return res.status(500).json({ status: 'Server Error' });
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
				editable: true,
				sortable: true,
				filter: true,
				checkboxSelection: true,
			},
			{
				headerName: 'Email',
				field: 'Email',
				editable: true,
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
		return res.status(200).json({ Columns: TableColumns, RowInformation: Customers });
	} catch (err) {
		console.error(err);
		return res.status(500).json({ status: 'Server Error' });
	}
});

router.put('/Modify/Reservations', async (req, res) => {
	try {
		const Changes = req.body.updates;
		for (var index = 0; index < Changes.length; index++) {
			const newRecord = Changes[index];
			const ID = newRecord.ID;
			delete newRecord['ID'];
			var Query = ID.length > 7 ? { _id: ID } : { ID: ID };
			await Reservation.updateOne(Query, { $set: newRecord });
		}
		return res.status(200).json({ status: 'Successfully made changes' });
	} catch (err) {
		console.error(err);
		return res.status(500).json({ status: 'Server Error' });
	}
});
router.put('/Modify/Customers', async (req, res) => {
	try {
		const Changes = req.body.updates;
		for (var index = 0; index < Changes.length; index++) {
			const newRecord = Changes[index];
			const ID = newRecord.ID;
			delete newRecord['ID'];
			var Query = ID.length > 7 ? { _id: ID } : { ID: ID };
			await Access.updateOne(Query, { $set: newRecord });
		}
		return res.status(200).json({ status: 'Successfully made changes' });
	} catch (err) {
		console.error(err);
		return res.status(500).json({ status: 'Server Error' });
	}
});
router.put('/Modify/Managers', async (req, res) => {
	try {
		const Changes = req.body.updates;
		for (var index = 0; index < Changes.length; index++) {
			const newRecord = Changes[index];
			const ID = newRecord.ID;
			delete newRecord['ID'];
			var Query = ID.length > 7 ? { _id: ID } : { ID: ID };
			await Access.updateOne(Query, { $set: newRecord });
		}
		return res.status(200).json({ status: 'Successfully made changes' });
	} catch (err) {
		console.error(err);
		return res.status(500).json({ status: 'Server Error' });
	}
});
router.put('/Modify/Orders', async (req, res) => {
	try {
		const Changes = req.body.updates;
		for (var index = 0; index < Changes.length; index++) {
			const newRecord = Changes[index];
			const ID = newRecord.ID;
			delete newRecord['ID'];
			var Query = ID.length > 7 ? { _id: ID } : { ID: ID };
			await Order.updateOne(Query, { $set: newRecord });
		}
		return res.status(200).json({ status: 'Successfully made changes' });
	} catch (err) {
		console.error(err);
		return res.status(500).json({ status: 'Server Error' });
	}
});
module.exports = router;
