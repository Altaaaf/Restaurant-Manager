import React from 'react';
import Input from './Input';

export default function Extras({ type, items }) {
	return (
		<section className='extras'>
			<h2 className='extras-heading'>{type}</h2>
			{items.map((item, index) => (
				<article className='menu-item' key={index}>
					<div className='extras-name'>{item.name}</div>
					<Input
						style={{
							width: '1rem',
							height: '1rem',
							padding: '0.25rem',
							margin: '0 0.75rem',
							backgroundColor: 'transparent',
							border: '1px',
							borderRadius: '50%',
							textAlign: 'center',
						}}
						type={type}
						name={item.name}
						index={index}
					/>
					<strong className='extras-price'>${item.price}</strong>
				</article>
			))}
		</section>
	);
}
