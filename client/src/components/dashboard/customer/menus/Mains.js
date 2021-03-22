import React from 'react';
import Input from './Input';

export default function Mains({ meals }) {
	return (
		<section className='mains'>
			{meals.map((meal, index) => (
				<article className='menu-item' key={index}>
<<<<<<< HEAD:client/src/components/dashboard/customer/Mains.js
					<h3 className='mains-name'>{meal.Name}</h3>
					<Input type='mains' name={meal.Name} index={index} />
					<strong className='mains-price'>${meal.Price}</strong>
					<p className='mains-description'>{meal.Description}</p>
=======
					<h3 className='mains-name'>{meal.name}</h3>
					<Input style={{
                 width: "1rem",
  				height: "1rem",
  				padding: "0.25rem",
 				margin: "0 0.75rem",
  				backgroundColor: "transparent",
  				border: "1px solid grey",
  				borderRadius: "50%",
 				textAlign: "center",
              }} type='mains' name={meal.name} index={index} />
					<strong className='mains-price'>${meal.price}</strong>
					<p className='mains-description'>{meal.description}</p>
>>>>>>> 6b252ebb250ec7081af033e7509a1e2da3920571:client/src/components/dashboard/customer/menus/Mains.js
				</article>
			))}
		</section>
	);
}
