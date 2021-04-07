import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import addDays from 'date-fns/addDays';
import 'react-datepicker/dist/react-datepicker.css';


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
				<div className='col s12 dark-text'>
					<DatePicker
					
						selected={this.state.startDate}
						onChange={(e) => {
							this.handleChange(e);
							this.props.onChange(e);
						}}
						showTimeSelect
						timeFormat='HH:mm'
						timeIntervals={40}
						timeCaption='time'
						dateFormat='MMMM dd, yy, h:mm aa'
						minDate={new Date()}
						maxDate={addDays(new Date(), 7)}
					/>
				</div>
			</form>
		);
	}
}

export default Timeslot;
