const express = require('express');
const Access = require('../Database/Models/Access');
const Reservation = require('../Database/Models/Booking');
const Order = require('../Database/Models/Orders');
const Inventory = require('../Database/Models/Inventory');
const router = express.Router();

const AccountTableInformation = [
	{
		headerName: 'ID',
		field: '_id',
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

// recode to be more effecient
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
				headerName: 'In stock Quantity',
				field: 'Quantity',
				editable: true,
				sortable: true,
				filter: true,
			},
			{
				headerName: 'Total purchases',
				field: 'TotalRequests',
				editable: true,
				sortable: true,
				filter: true,
			},
			{
				headerName: 'Last Purchased',
				field: 'LastRequested',
				editable: true,
				sortable: true,
				filter: true,
			},
		];
		return res
			.status(200)
			.json({ Columns: TableColumns, RowInformation: await Inventory.find({}, { _id: 0 }) });
	} catch (err) {
		console.error(err);
		return res.status(500).json({ status: 'Server Error' });
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
		let BookingsList = await Reservation.find(
			{},
			{ _id: 0, slot_id: 0, coverNo: 0, email: 0, comment: 0 },
		);
		return res.status(200).json({ Columns: TableColumns, RowInformation: BookingsList });
	} catch (err) {
		console.error(err);
		return res.status(500).json({ status: 'Server Error' });
	}
});
router.get('/Managers', async (req, res) => {
	try {
		try {
			return res.status(200).json({
				Columns: AccountTableInformation,
				RowInformation: await Access.find(
					{ AccountType: 'Manager' },
					{ Password: 0, EmailVerified: 0, AccountType: 0, Salary: 0 },
				),
			});
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
		return res.status(200).json({
			Columns: AccountTableInformation,
			RowInformation: await Access.find(
				{ AccountType: 'Customer' },
				{ Password: 0, EmailVerified: 0, AccountType: 0, Salary: 0 },
			),
		});
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
			var Query = { ID: ID };
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
			const ID = newRecord._id;
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
			const ID = newRecord._id;
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
