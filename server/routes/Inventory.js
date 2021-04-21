const express = require('express');
const Inventory = require('../Database/Models/Inventory');
const Menu = require('../Database/Models/Menu');
const router = express.Router();
// retrieve data from inventory and return
router.get('/view', async (req, res) => {
	try {
		// get price for each
		let InventoryStock = [];

		let Items = await Inventory.find();
		for (var item_ = 0; item_ < Items.length; item_++) {
			var item = Items[item_];

			const MenuItems = await Menu.findOne({ Name: item.Name });
			if (typeof MenuItems !== undefined && MenuItems !== null) {
				// price for each item * quantity

				const PossibleProfit = MenuItems.Price * item.Quantity;

				InventoryStock.push({
					Name: item.Name,
					Quantity: item.Quantity,
					Cost: item.Cost,
					ProjectedProfit: PossibleProfit,
					LastRequested: item.LastRequested,
					TotalRequests: item.TotalRequests,
				});
			}
		}
		res.status(200).json({ Inventory: InventoryStock });
	} catch (err) {
		console.error(err);
		res.status(500).json({ status: 'Server Error' });
	}
});
// add item to database
router.post('/item', async (req, res) => {
	try {
		const MenuItems = await Menu.findOne({ Name: req.body.Name });
		if (typeof MenuItems === undefined || MenuItems === null) {
			return res
				.status(400)
				.json({ status: 'You are only allowed to add items that are on menu!' });
		}

		const Item = await Inventory.findOne({ Name: req.body.Name });
		if (typeof Item === undefined || Item === null) {
			// item doesn't exist in database so adding it as new item...
			const AddItem = new Inventory({
				Name: req.body.Name,
				Quantity: req.body.Quantity,
			});
			AddItem.save();
			return res.status(200).json({ status: 'Successfully added item to inventory' });
		} else {
			// item exists already so updating current record!
			const updateItem = await Inventory.updateOne(
				{ Name: req.body.Name },
				{ $set: { Quantity: Item.Quantity + req.body.Quantity } },
			);
			return res.status(200).json({ status: 'successfully updated item!' });
		}
	} catch (err) {
		console.error(err);
		res.status(500).json({ status: 'Server Error' });
	}
});
// delete items from inventory
router.delete('/item', async (req, res) => {
	try {
		Inventory.findOne({ Name: req.body.Name }).then((item) => {
			if (item) {
				try {
					item.remove();
					return res.status(200).json({ status: 'Successfully removed item from inventory' });
				} catch {
					return res.status(400).json({ status: 'Failed to remove item from inventory' });
				}
			} else {
				return res.status(400).json({ status: 'Item does not exist in inventory!' });
			}
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ status: 'Server Error' });
	}
});
module.exports = router;
