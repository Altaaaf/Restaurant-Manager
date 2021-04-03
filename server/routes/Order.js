const express = require('express');
const Order = require('../Database/Models/Orders');
const Menu = require('../Database/Models/Menu');
const { OrderPage } = require('../validator/Access');
const router = express.Router();

router.get('/view', async (req, res) => {
	try {
		let orderList = [];

		let Orders = await Order.find();
		for (var item_ = 0; item_ < Orders.length; item_++) {
			var item = Orders[item_];

			orderList.push({
				Ordered: item.Ordered,
                Total: item.Total,
                time:item.OrderTime,
                FirstName: item.FirstName,
                lastName: item.lastName
				
			});
			}
		
            res.status(200).json({ Orders: orderList });
        } catch (err) {
            console.error(err);
            res.status(500).json({ status: 'Server Error' });
        }
});
router.post('/OrderPage', async (req, res) => {
	try {
		//const { error } = BookingPage(req.body);
		//if (error) {
		//	console.error(error.message);
		//	return res.status(400).json({
		//		status: error.message,
		//	});
		//}
		const CreateOrder_ = new Order({
			    Ordered: item.Ordered,
                Total: item.Total,
                time:item.OrderTime,
                FirstName: item.FirstName,
                lastName: item.lastName
		});
		Order_.save();
		res.json({ status: 'successfully saved order!' });
	} catch (err) {
		res.json({ status: err.message });
	}
});
module.exports = router;