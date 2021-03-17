const express = require('express');
const router = express.Router();

router.get('/view', async (req, res) => {
	try {
		res.json({
			mains: [
				{
					name: 'The Caesar',
					description:
						'Crisp romaine lettuce tossed with our homemade Caesar dressing, croutons, and shredded parmesan cheese.',
					price: '19',
				},
			],
			sides: [
				{
					name: 'Fries',
					price: '5',
				},
			],
			drinks: [
				{
					name: 'Soft Drink',
					price: '4',
					category: 'drink',
				},
			],
		});
	} catch (err) {
		res.json({ status: err.message });
	}
});
module.exports = router;
