import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import classnames from 'classnames';

class Register extends Component {
	constructor() {
		super();
		this.state = {
			name: '',
			email: '',
			password: '',
			password2: '',
			errors: {},
		};
	}

	componentDidMount() {
		// If logged in and user navigates to Register page, should redirect them to dashboard
		if (this.props.auth.isAuthenticated) {
			this.props.history.push('/dashboard/customer/Dashboards');
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({
				errors: nextProps.errors,
			});
		}
	}

	onChange = (e) => {
		this.setState({ [e.target.id]: e.target.value });
	};

	onSubmit = (e) => {
		e.preventDefault();

		const newUser = {
			Username: this.state.name,
			Email: this.state.email,
			Password: this.state.password,
			PasswordConfirmation: this.state.password2,
		};

		this.props.registerUser(newUser, this.props.history);
	};

	render() {
		const { errors } = this.state;
		console.log(this.state.errors.status);
		return (
			<div className='container'>
				<div className='row'>
					<div className='col s8 offset-s2'>
						<Link to='/' className='btn-flat white-text waves-effect'>
							<i className='material-icons left'>keyboard_backspace</i> Back to home
						</Link>
						<div className='col s12 white-text' style={{ paddingLeft: '11.250px' }}>
							<h4>
								<b>Register</b> below
							</h4>
							<p className='white-text text-darken-1'>
								Already have an account? <Link to='/login'>Log in</Link>
							</p>
						</div>
						<form noValidate onSubmit={this.onSubmit}>
							<p className='red-text col s12'>  {this.state.errors.status}</p>
							<div className='input-field white-text col s12'>
								<input
									onChange={this.onChange}
									value={this.state.name}
									error={errors.name}
									id='name'
									type='text'
									className={classnames('', {
										invalid: errors.name,
									})}
								/>
								<label className='white-text' htmlFor='name'>Name</label>
								<span className='red-text'>{errors.name}</span>
							</div>
							<div className='input-field col s12'>
								<input
									onChange={this.onChange}
									value={this.state.email}
									error={errors.email}
									id='email'
									type='email'
									className={classnames('', {
										invalid: errors.email,
									})}
								/>
								<label className='white-text' htmlFor='email'>Email</label>
								<span className='red-text'>{errors.email}</span>
							</div>
							<div className='input-field col s12'>
								<input
									onChange={this.onChange}
									value={this.state.password}
									error={errors.password}
									id='password'
									type='password'
									className={classnames('', {
										invalid: errors.password,
									})}
								/>
								<label className='white-text' htmlFor='password'>Password</label>
								<span className='red-text'>{errors.password}</span>
							</div>
							
							<div className='input-field col s12'>
								<input
									onChange={this.onChange}
									value={this.state.password2}
									error={errors.password2}
									id='password2'
									type='password'
									className={classnames('', {
										invalid: errors.password2,
									})}
								/>
								<label className='white-text' htmlFor='password2'>Confirm Password</label>
								<span className='red-text'>{errors.password2}</span>
							</div>
							
							<div className='col s12' style={{ paddingLeft: '11.250px' }}>
								<button
									style={{
										width: '150px',
										borderRadius: '3px',
										letterSpacing: '1.5px',
										marginTop: '1rem',
									}}
									type='submit'
									className='btn btn-large waves-effect waves-light hoverable navy accent-3'>
									Sign up
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

Register.propTypes = {
	registerUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors,
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
