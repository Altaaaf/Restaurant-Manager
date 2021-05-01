import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toastr from 'toastr';
class ForgotPassword extends Component {
	constructor() {
		super();
		this.state = {
			EmailAddress: '',
		};
	}

	onChange = (e) => {
		this.setState({ [e.target.id]: e.target.value });
	};

	onSubmit = (e) => {
		e.preventDefault();

		// send request to server

		axios
			.post('http://localhost:5000/Api/Misc/ForgotPassword', { Email: this.state.EmailAddress })
			.then((res) => {
				if (res.status == 200) {
					const data = res.data;
					toastr.success('Successfully sent new password');
				} else {
					toastr.error('Unexpected failure occured');
				}
			})
			.catch((err) => {
				toastr.error(err.response.data.status);
			});
	};

	render() {
		return (
			<div className='container'>
				<div className='row'>
					<div className='col s8 offset-s2'>
						<Link to='/' className='btn-flat dark-text waves-effect'>
							<i className='material-icons left'>keyboard_backspace</i> Back to home
						</Link>
						<form noValidate onSubmit={this.onSubmit}>
							<input
								onChange={this.onChange}
								value={this.state.EmailAddress}
								id='EmailAddress'
								type='text'
							/>
							<label className='dark-text' htmlFor='EmailAddress'>
								Email
							</label>
							<br />
							<button
								style={{
									width: '150px',
									borderRadius: '3px',
									letterSpacing: '1.5px',
									marginTop: '1rem',
								}}
								type='submit'
								className='btn btn-large waves-effect waves-light hoverable navy accent-3'>
								Reset Password
							</button>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

export default ForgotPassword;
