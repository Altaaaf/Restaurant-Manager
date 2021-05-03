import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from './contactFooter';
import './Contact.css';

const ContactForm = () => {
	const [status, setStatus] = useState('Submit');
	const handleSubmit = async (e) => {
		e.preventDefault();
		setStatus('Sending...');
		const { name, email, subject, message } = e.target.elements;
		let details = {
			name: name.value,
			email: email.value,
			subject: subject.value,
			message: message.value,
		};
		let response = await fetch('http://localhost:5000/contact', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
			},
			body: JSON.stringify(details),
		});
		setStatus('Submit');
		let result = await response.json();
		alert(result.status);
	};
	return (
		<section class='contact-page-section'>
			<div class='container'>
				<Link to='/dashboard/customer/Dashboards' className='btn-flat waves-effect'>
					<i className='material-icons left'>keyboard_backspace</i> Back to home
				</Link>

				<h2>Send us a message</h2>
				<div class='column col-lg-8 col-md-12 dark-text col-sm-12'>
					<div class='row clearfix'>
						<div class='contact-form'>
							<form onSubmit={handleSubmit}>
								<div class='row clearfix'>
									<div htmlFor='name' class='col-lg-6 col-md-12 dark-text col-sm-12 form-group'>
										<input type='text' name='name' id='name' placeholder='Name' required />
									</div>

									<div htmlFor='email' class='col-lg-6 col-md-12 dark-text col-sm-12 form-group'>
										<input type='email' name='email' id='email' placeholder ='Email' required />
									</div>

									<div htmlFor='subject' class='col-lg-6 col-md-12 dark-text col-sm-12 form-group'>
										<input type='text' name='subject' id='subject' placeholder='Subject' required />
									</div>

									<div htmlFor='message' class='col-lg-12 col-md-12 dark-text col-sm-12 form-group'>
										<input type='text' id='message' placeholder='Massage' required />
									</div>

									<div class='col-lg-12 col-md-12 col-sm-12 form-group'>
										<button class='btn btn-warning btn-lg text-white' type='submit'>
											<span class='btn-title'>{status}</span>
										</button>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</section>
	);
};

export default ContactForm;
