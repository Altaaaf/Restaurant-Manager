import React from 'react';

export default function Total({ data }) {
	var totalPrice = 0;
	data.forEach(function (item) {
		totalPrice += item.Quantity * item.Price;
	});
	const tax = (totalPrice * 0.0875).toFixed(2);
	

	return (
		<div className='total'>
			<span className='total-title'>Subtotal:</span>
			<span className='total-price'>${totalPrice.toLocaleString()}</span>
			<span className='tax-title'>Tax:</span>
			<span className='tax-price'>${tax}</span>
			<span className='Order-title'>Order Total:</span>
			<span className='Order-price'>${(totalPrice.toLocaleString() * 1.0875).toFixed(2)}</span>
		</div>
	);
}
