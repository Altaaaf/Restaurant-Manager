import React from 'react';
import InputField from './inputField';
import PropTypes from 'prop-types';
import Timeslot from './Timeslot';
import { Link } from 'react-router-dom';
const BookingForm = ({ booking, onSave, onChange, handleDate }) => {
	return (
		<form>
			<div style={{ height: '15vh' }} className='container '>
				<Link to='/dashboard/customer/Dashboards' className='btn-flat waves-effect'>
					<i className='material-icons left'>keyboard_backspace</i> Back to home
				</Link>
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

						<Timeslot
							name='ReservationTime'
							value={booking.ReservationTime}
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

						<Link
							style={{
								width: '140px',
								borderRadius: '3px',
								letterSpacing: '1.5px',
								marginTop: '3rem',
							}}
							onClick={onSave}
							className='btn btn-small waves-effect waves-light hoverable navy accent-3'>
							submit
						</Link>
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
