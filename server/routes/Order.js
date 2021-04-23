const express = require('express');
const Order = require('../Database/Models/Orders');
const router = express.Router();
const jwt = require('jsonwebtoken');
router.get('/View', async (req, res) => {
	try {
		// split to remove bearer!
		const jwtAuth = jwt.decode(req.headers.authorization.split(' ')[1]);
		console.log(jwtAuth);
		if (jwtAuth === undefined || jwtAuth == null) {
			res.status(500).json({ status: 'not authenticated to use this route.' });
		}
		let orderList = [];
		// manager can view all orders
		if (jwtAuth.accountType == 'Manager') {
			const Orders = await Order.find();
			for (var item_ = 0; item_ < Orders.length; item_++) {
				var item = Orders[item_];
				orderList.push({
					CustomerName: item.CustomerName,
					Order: item.Order,
					createdDate: `${item.createdDate ? item.createdDate : new Date().toUTCString()}`,
					ID: item._id,
					Status: item.Status,
				});
			}
		}
		// customers can only view their orders!
		else if (jwtAuth.accountType == 'Customer') {
			console.log('Customer');
			const Orders = await Order.find({ CustomerName: jwtAuth.name });

			for (var item_ = 0; item_ < Orders.length; item_++) {
				var item = Orders[item_];
				orderList.push({
					Order: item.Order,
					createdDate: `${item.createdDate ? item.createdDate : new Date().toUTCString()}`,
					ID: item._id,
					Status: item.Status,
				});
			}
		}
		res.status(200).json({ Orders: orderList });
	} catch (err) {
		console.error(err);
		res.status(500).json({ status: 'Server Error' });
	}
});
router.post('/Create', async (req, res) => {
	try {
		// split to remove bearer!
		const jwtAuth = jwt.decode(req.headers.authorization.split(' ')[1]);
		console.log(jwtAuth);
		if (jwtAuth === undefined || jwtAuth == null) {
			res.status(500).json({ status: 'not authenticated to use this route.' });
		}

		const CreateOrder = new Order({
			CustomerName: jwtAuth.name,
			Order: req.body.Order,
		});
		CreateOrder.save();

		res.json({ status: 'successfully saved order' });
	} catch (err) {
		console.error(err);
		res.status(500).json({ status: 'Server Error' });
	}
});
router.put('/setDelivered', async (req, res) => {
	try {
		console.log(req.body.ID);
		const updateStatus = await Order.findByIdAndUpdate(req.body.ID, {
			Status: 'Ready',
		});
		console.log(updateStatus);
		res.status(200).json({ status: 'Successfully changed status' });
	} catch (err) {
		console.error(err);
		res.status(500).json({ status: 'Server Error' });
	}
});
router.put('/setCancelled', async (req, res) => {
	try {
		console.log(req.body.ID);
		const updateStatus = await Order.findByIdAndUpdate(req.body.ID, {
			Status: 'Cancelled',
		});
		console.log(updateStatus);
		res.status(200).json({ status: 'Successfully changed status' });
	} catch (err) {
		console.error(err);
		res.status(500).json({ status: 'Server Error' });
	}
});
module.exports = router;
