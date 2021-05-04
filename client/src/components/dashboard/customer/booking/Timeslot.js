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
					<DatePicker
						selected={this.state.startDate}
						onChange={(e) => {
							this.handleChange(e);
							this.props.onChange(e);
						}}
						
						placeholderText='Select a date'
						minDate={new Date()}
						maxDate={addDays(new Date(), 7)}
						
					/>
				
			</form>
		);
	}
}

export default Timeslot;
