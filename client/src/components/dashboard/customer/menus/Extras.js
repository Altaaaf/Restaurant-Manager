import React from 'react';
import Input from './Input';

export default function Extras({ type, items }) {
	return (
		<section className='extras'>
			<h2 className='extras-heading'>{type}</h2>
			{items.map((item, index) => (
				<article className='menu-item' key={index}>
					<div className='extras-name'>{item.Name}</div>
					<Input type={type} name={item.Name} index={index} />
					<strong className='extras-price'>${item.Price}</strong>
				</article>
			))}
		</section>
	);
}
