import React, { useContext } from 'react';
import { Context } from './Context';

export default function Input({ type, name, index }) {
	const [items, updateItem] = useContext(Context);

	//console.log(name);

	return (
		<input
			style={{
				width: '1rem',
				height: '1rem',
				padding: '0.25rem',
				margin: '0 0.75rem',
				backgroundColor: 'transparent',
				border: '1px solid grey',
				borderRadius: '50%',
				textAlign: 'center',
			}}
			type='text'
			inputmode='numeric'
			pattern='[0-9]*'
			onChange={({ target }) => updateItem(type, index, target.value)}
			name={name.replace(' ', '-').toLowerCase()}
		/>
	);
}
