import React, { useContext } from 'react';
import { Context } from '../menus/Context';
import { Link } from 'react-router-dom';
export default function Total({ data }) {
	let Order = [];
	try {
		const [items] = useContext(Context);
		for (var item of Object.keys(items)) {
			const [group, index] = item.split('-');
			const Quantity = items[item];
			const MenuItem = data[group][index];
			if (Quantity > 0) {
				Order.push({
					Name: MenuItem.Name,
					Quantity: Quantity,
					Price: MenuItem.Price,
					Total: Quantity * MenuItem.Price,
				});
			}
		}
	} catch (err) {
		console.log(err);
	}

	return (
		<Link
			to={{
				pathname: '/customer/cart',
				state: {
					Order: Order,
				},
			}}
			className='btn btn-large waves-effect waves-light hoverable navy accent-3'>
			Order Now
		</Link>
	);
}
