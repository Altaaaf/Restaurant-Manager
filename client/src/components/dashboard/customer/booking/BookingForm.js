import React from 'react';
import InputField from './inputField';
import DateField from './DataField';
import PropTypes from 'prop-types';
const BookingForm = ({ booking, onSave, onChange }) => {
	return (
		<form>
			<InputField
				name='firstName'
				value={booking.firstName}
				label='First Name'
				onChange={onChange}
			/>

			<InputField name='lastName' value={booking.lastName} label='Last Name' onChange={onChange} />

			<DateField
				name='diningDate'
				value={booking.diningDate}
				label='Dining Date'
				onChange={onChange}
			/>

			<InputField
				name='coverNo'
				value={booking.coverNo}
				label='How many people?'
				onChange={onChange}
			/>

			<InputField name='phone' value={booking.phone} label='Phone' onChange={onChange} />

			<input type='submit' className='btn btn-primary' onClick={onSave} />
		</form>
	);
};

BookingForm.propTypes = {
	booking: PropTypes.object.isRequired,
};

export default BookingForm;
