import React from 'react';
import Input from './Input';

export default function Extras({ type, items }) {
	return (
		<section className='extras'>
			<h2 className='extras-heading'>{type}</h2>
			{items.map((item, index) => (
				<article className='menu-item' key={index}>
<<<<<<< HEAD:client/src/components/dashboard/customer/Extras.js
					<div className='extras-name'>{item.Name}</div>
					<Input type={type} name={item.Name} index={index} />
					<strong className='extras-price'>${item.Price}</strong>
=======
					<div className='extras-name'>{item.name}</div>
					<Input style={{
                 width: "1rem",
  				height: "1rem",
  				padding: "0.25rem",
 				margin: "0 0.75rem",
  				backgroundColor: "transparent",
  				border: "1px",
  				borderRadius: "50%",
 				textAlign: "center",
              }} type={type} name={item.name} index={index} />
					<strong className='extras-price'>${item.price}</strong>
>>>>>>> 6b252ebb250ec7081af033e7509a1e2da3920571:client/src/components/dashboard/customer/menus/Extras.js
				</article>
			))}
		</section>
	);
}
