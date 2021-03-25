import React from 'react';
import InputField from './inputField';
import DateField from './DataField';
import PropTypes from 'prop-types';
const BookingForm = ({ booking, onSave, onChange }) => {
	return (
		<form>
			<div style={{ height: '15vh' }} className='container valign-wrapper'>
				<div className='row'>
					<div className='col s12 dark-text center-align'>
						<InputField
							name='firstName'
							value={booking.firstName}
							label='First Name'
							onChange={onChange}
						/>

						<InputField
							name='lastName'
							value={booking.lastName}
							label='Last Name'
							onChange={onChange}
						/>

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

						<div className='col s12'>
							<button
								style={{
									width: '140px',
									borderRadius: '3px',
									letterSpacing: '1.5px',
									marginTop: '1rem',
								}}
								onClick={onSave}
								className='btn btn-large waves-effect waves-light hoverable navy accent-3'>
								submit
							</button>
						</div>
					</div>
				</div>
			</div>
		</form>
	);
};

BookingForm.propTypes = {
	booking: PropTypes.object.isRequired,
};

export default BookingForm;
