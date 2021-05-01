const express = require('express');
const Menu = require('../Database/Models/Menu');
const { AddItem } = require('../validator/Access');
const router = express.Router();

// change this to be more effecient!
router.get('/view', async (req, res) => {
	try {
		let Menu_ = {
			mains: [],
			sides: [],
			drinks: [],
		};
		let Items = await Menu.find();
		for (var item_ = 0; item_ < Items.length; item_++) {
			var item = Items[item_];

			if (item.Type == 'mains') {
				Menu_.mains.push({
					Name: item.Name,
					Price: item.Price,
					Description: item.Description,
				});
			} else if (item.Type == 'sides') {
				Menu_.sides.push({
					Name: item.Name,
					Price: item.Price,
				});
			} else if (item.Type == 'drinks') {
				Menu_.drinks.push({
					Name: item.Name,
					Price: item.Price,
				});
			}
		}
		return res.status(200).json(Menu_);
	} catch (err) {
		console.error(err);
		return res.status(500).json({ status: 'Server Error' });
	}
});
router.post('/item', async (req, res) => {
	try {
		const { error } = AddItem(req.body);
		if (error) {
			console.error(error.message);
			return res.status(400).json({
				status: error.message,
			});
		}
		Menu.findOne({ Name: req.body.Name }).then((item) => {
			if (item) {
				return res.status(400).json({ status: 'item already exists on menu' });
			} else {
				try {
					const AddItem = new Menu({
						Name: req.body.Name,
						Price: req.body.Price,
						Description: req.body.Description,
						Type: req.body.Type,
					});
					AddItem.save();
					return res.status(200).json({ status: 'Successfully added item to menu' });
				} catch {
					res.status(500).json({ status: 'Server Error' });
				}
			}
		});
	} catch (err) {
		console.error(err);
		return res.status(500).json({ status: 'Server Error' });
	}
});
router.delete('/item', async (req, res) => {
	try {
		Menu.findOne({ Name: req.body.Name }).then((item) => {
			if (item) {
				try {
					item.remove();
					return res.status(200).json({ status: 'successfully removed item from menu' });
				} catch {
					return res.status(400).json({ status: 'failed to remove item form menu' });
				}
			} else {
				return res.status(400).json({ status: 'item does not exist on menu' });
			}
		});
	} catch (err) {
		console.error(err);
		return res.status(500).json({ status: 'Server Error' });
	}
});
module.exports = router;
