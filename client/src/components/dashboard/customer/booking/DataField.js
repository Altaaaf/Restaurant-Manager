import React from 'react';
import PropTypes from 'prop-types';
const DateField = ({ name, label, value, onChange }) => {
	return (
		<div className='form-group'>
			<label htmlFor='{name}Input'>{label}</label>
			<input
				type='date'
				value={value}
				className='form-control'
				name={name}
				onChange={onChange}
				placeholder='dd-MM-yyyy'
			/>
		</div>
	);
};

DateField.propTypes = {
	name: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	value: PropTypes.string,
	onChange: PropTypes.func.isRequired,
};

export default DateField;
