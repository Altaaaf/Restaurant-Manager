const express = require('express');
const Menu = require('../Database/Models/Menu');
const { AddItem } = require('../validator/Access');
const router = express.Router();

// change this to be more effecient!
router.get('/view', async (req, res) => {
	try {
		return res.status(200).json({
			mains: await Menu.find({ Type: 'mains' }, { _id: 0 }),
			sides: await Menu.find({ Type: 'sides' }, { _id: 0 }),
			drinks: await Menu.find({ Type: 'drinks' }, { _id: 0 }),
		});
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
