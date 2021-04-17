import React, { Component } from 'react';

import Button from './Button';

class Profile extends Component {
	constructor() {
		super();
		this.state = {
			currentAccount: [
				{
					email: '',
					password: '',
					firstName: '',
					lastName: '',
				},
			],
		};
	}

	handleEmailChange = (e) => {
		const login = { ...this.state.currentAccount };
		login.email = e.target.value;

		this.setState({ currentAccount: login });
	};

	handlePasswordChange = (e) => {
		const login = { ...this.state.currentAccount };
		login.password = e.target.value;

		this.setState({ currentAccount: login });
	};

	handleEmailClick = () => {
		const login = { ...this.state.currentAccount };
		login.email = '';

		this.setState({ currentAccount: login });
	};

	handlePasswordClick = () => {
		const login = { ...this.state.currentAccount };
		login.password = '';

		this.setState({ currentAccount: login });
	};

	handleEditing = (e) => {
		e.preventDefault();
		this.setState({ isEditing: true });
	};

	handleAlert = (value) => {
		this.setState({ showAlert: value });
	};

	render() {
		const { isEditing, handleAlert, handleEditing, currentAccount } = this.state;

		return (
			<div className='profile-pcontainer'>
				<h1>Account</h1>
				<form>
					<div className='Pinput'>
						<p>First Name</p>
						<input disabled={!isEditing} value={localStorage.getItem('firstName')} />
					</div>
					<div className='Pinput'>
						<p>Last Name</p>
						<input disabled={!isEditing} value={localStorage.getItem('lastName')} />
					</div>
					<div className='Pinput'>
						<p>Email</p>
						<input disabled={!isEditing} value={localStorage.getItem('email')} />
					</div>
					<div className='Pinput'>
						<p>Phone</p>
						<input disabled={!isEditing} value={localStorage.getItem('phone')} />
					</div>

					<div
						className='Pbutton'
						onClick={() => {
							if (currentAccount._id === null) {
								handleAlert(true);
							} else {
								handleEditing();
							}
						}}>
						<Button title={!isEditing ? 'Edit' : 'Save'} />
					</div>
				</form>
			</div>
		);
	}
}

export default Profile;
