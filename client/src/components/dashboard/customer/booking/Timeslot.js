import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import addDays from 'date-fns/addDays';
import 'react-datepicker/dist/react-datepicker.css';
import { setHours, setMinutes } from 'date-fns';

class Timeslot extends Component {
	constructor(props) {
		super(props);
		this.state = {
			startDate: new Date(),
		};
		this.handleChange = this.handleChange.bind(this);
		this.onFormSubmit = this.onFormSubmit.bind(this);
	}

	handleChange(date) {
		this.setState({
			startDate: date,
		});
	}

	onFormSubmit(e) {
		e.preventDefault();
		console.log(this.state.startDate);
	}

	render() {
		return (
			<form onSubmit={this.onFormSubmit}>
				<div className='form-group'>
					<label>Select Date:</label>
					<DatePicker
						selected={this.state.startDate}
						onChange={(e) => {
							this.handleChange(e);
							this.props.onChange(e);
						}}
						showTimeSelect
						placeholderText='Select a date'
						timeFormat='HH:mm'
						timeIntervals={30}
						dateFormat='MMMM dd, yyyy'
						minDate={new Date()}
						maxDate={addDays(new Date(), 7)}
						minTime={setHours(setMinutes(new Date(), 0), 11)}
						maxTime={setHours(setMinutes(new Date(), 0), 21)}
					/>
				</div>
			</form>
		);
	}
}

export default Timeslot;
