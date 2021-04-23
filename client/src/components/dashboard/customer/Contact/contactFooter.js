import React from 'react';
import { FiHome, FiPhoneCall, FiMail } from 'react-icons/fi';
import { GoGlobe } from 'react-icons/go';

function Footer(props) {
	return (
		<div className='footer'>
			<div className='container'>
				<div className='row justify-content-center'>
					<div className='col-7 col-sm-5'>
						<h5>Contact us :</h5>
						<FiHome size={25} />
						<address>
							1855 Broadway, New York, NY 10023
							<br />
							<FiPhoneCall size={25} /> +1 (212)-212-2222 <br />
							<FiMail size={25} /> <a href='barnslink@hotmail.com'>barnslink@gmail.com</a> <br />
							<GoGlobe size={25} />{' '}
							<a href='https://github.com/Altaaaf/Restaurant-Manager'>About us</a>
						</address>
					</div>
				</div>
				<div className='row justify-content-center'>
					<div className='col-auto'>
						<p>© Copyright 2021 NYIT Fab Five</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Footer;
