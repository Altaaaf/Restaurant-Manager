import React, { useContext } from 'react';
import { Context } from '../menus/Context';
import { Link } from 'react-router-dom';
export default function Total({ data }) {
	let Order = [];
	try {
		const [items] = useContext(Context);
		Object.keys(items).reduce((acc, curr) => {
			const [group, item] = curr.split('-');
			Order.push({
				Name: data[group][item].Name,
				Quantity: items[curr],
				Price: data[group][item].Price,
			});
		});
	} catch {}
	console.log(Order);

	return (
		<Link
			to={{
				pathname: '/customer/cart',
				state: {
					Order: Order,
				},
			}}>
			Order Now
		</Link>
	);
}
