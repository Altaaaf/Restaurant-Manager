const express = require('express');
const Order = require('../Database/Models/Orders');
const Inventory = require('../Database/Models/Inventory');
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
					ID: `${item.ID ? item.ID : item._id}`,
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
					ID: `${item.ID ? item.ID : item._id}`,
					Status: item.Status,
				});
			}
		}
		return res.status(200).json({ Orders: orderList });
	} catch (err) {
		console.error(err);
		return res.status(500).json({ status: 'Server Error' });
	}
});
router.post('/Create', async (req, res) => {
	try {
		// split to remove bearer!
		const jwtAuth = jwt.decode(req.headers.authorization.split(' ')[1]);
		if (jwtAuth === undefined || jwtAuth == null) {
			return res.status(500).json({ status: 'not authenticated to use this route.' });
		}

		// validate all items exist in inventory before creating order
		const RequestedOrder = req.body.Order;

		for (var item = 0; item < RequestedOrder.length; item++) {
			// find each item in inventory tab
			const RequestedItemName = RequestedOrder[item].Name;
			const RequestedItemQuantity = RequestedOrder[item].Quantity;
			const ValidateItem = await Inventory.findOne({ Name: RequestedItemName });
			if (typeof ValidateItem.Quantity === undefined || ValidateItem.Quantity === null) {
				return res.status(400).json({ status: 'This item is no longer available for sale!' });
			}
			if (ValidateItem.Quantity < RequestedItemQuantity) {
				return res.status(400).json({ status: RequestedItemName + ' is out of stock' });
			}
		}
		// update inventory quantities
		for (var item = 0; item < RequestedOrder.length; item++) {
			// find each item in inventory tab
			const RequestedItemName = RequestedOrder[item].Name;
			const RequestedItemQuantity = RequestedOrder[item].Quantity;
			const ValidateItem = await Inventory.findOne({ Name: RequestedItemName });
			await Inventory.findByIdAndUpdate(ValidateItem._id, {
				Quantity: ValidateItem.Quantity - RequestedItemQuantity,
				LastRequested: Date.now(),
				TotalRequests: ValidateItem.TotalRequests + RequestedItemQuantity,
			});
		}
		// create orderID
		var newID = 1;
		const mostRecentOrder = await Order.find().limit(1).sort({ _id: -1 });
		if (mostRecentOrder[0].ID !== undefined && mostRecentOrder[0].ID !== null) {
			newID = mostRecentOrder[0].ID + 1;
		}

		// create Order
		const CreateOrder = new Order({
			ID: newID,
			CustomerName: jwtAuth.name,
			Order: RequestedOrder,
		});
		CreateOrder.save();

		return res.status(200).json({ status: 'successfully saved order' });
	} catch (err) {
		console.error(err);
		return res.status(500).json({ status: 'Server Error' });
	}
});
router.put('/setCancelled', async (req, res) => {
	try {
		// check to see what type of ID it is
		var Query = req.body.ID.length > 7 ? { _id: req.body.ID } : { ID: req.body.ID };

		const GatherOrder = await Order.findOne(Query);
		if (typeof GatherOrder === undefined || GatherOrder === null) {
			return res.status(400).json({ status: 'Unexpected failure updating order status!' });
		}
		const EntireOrder = GatherOrder.Order;

		for (var item = 0; item < EntireOrder.length; item++) {
			// find each item in inventory tab
			const RequestedItemName = EntireOrder[item].Name;
			const RequestedItemQuantity = EntireOrder[item].Quantity;
			const ValidateItem = await Inventory.findOne({ Name: RequestedItemName });
			if (typeof ValidateItem !== undefined && ValidateItem !== null) {
				await Inventory.findByIdAndUpdate(ValidateItem._id, {
					Quantity: ValidateItem.Quantity + RequestedItemQuantity,
				});
			}
		}
		const updateStatus = await Order.findByIdAndUpdate(GatherOrder._id, {
			Status: 'Cancelled',
		});
		return res.status(200).json({ status: 'Successfully changed status' });
	} catch (err) {
		console.error(err);
		return res.status(500).json({ status: 'Server Error' });
	}
});
router.put('/setDelivered', async (req, res) => {
	try {
		// check to see what type of ID it is
		var Query = req.body.ID.length > 7 ? { _id: req.body.ID } : { ID: req.body.ID };

		const GatherOrder = await Order.findOne(Query);
		if (typeof GatherOrder === undefined || GatherOrder === null) {
			return res.status(400).json({ status: 'Unexpected failure updating order status!' });
		}
		const updateStatus = await Order.findByIdAndUpdate(GatherOrder._id, {
			Status: 'Ready',
		});
		console.log(updateStatus);
		return res.status(200).json({ status: 'Successfully changed status' });
	} catch (err) {
		console.error(err);
		return res.status(500).json({ status: 'Server Error' });
	}
});
module.exports = router;
