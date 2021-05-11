import React, { useContext } from 'react';
import { Context } from './Context';

export default function Total({ data }) {
	const [items] = useContext(Context);

	const totalPrice = Object.keys(items).reduce((acc, curr) => {
		const [group, item] = curr.split('-');

		const amount = items[curr] * data[group][item].Price;
		return acc + amount;
	}, 0);
	const tax = (totalPrice * 0.0875).toFixed(2);

	return (
		<div className='total'>
			<span className='total-title'>Subtotal:</span>
			<span className='total-price'>${totalPrice.toLocaleString()}</span>
			<span className='tax-title'>Tax:</span>
			<span className='tax-price'>${tax}</span>
			<span className='Order-title'>Order Total:</span>
			<span className='Order-price'>${(totalPrice + tax).toLocaleString()}</span>
		</div>
	);
}
