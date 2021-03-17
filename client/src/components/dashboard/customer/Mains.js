import React from 'react';
import Input from './Input';

export default function Mains({ meals }) {
	return (
		<section className='mains'>
			{meals.map((meal, index) => (
				<article className='menu-item' key={index}>
					<h3 className='mains-name'>{meal.Name}</h3>
					<Input type='mains' name={meal.Name} index={index} />
					<strong className='mains-price'>${meal.Price}</strong>
					<p className='mains-description'>{meal.Description}</p>
				</article>
			))}
		</section>
	);
}
