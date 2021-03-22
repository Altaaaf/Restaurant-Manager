import React from 'react';
import Input from './Input';

export default function Mains({ meals }) {
	return (
		<section className='mains'>
			{meals.map((meal, index) => (
				<article className='menu-item' key={index}>
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
				</article>
			))}
		</section>
	);
}
