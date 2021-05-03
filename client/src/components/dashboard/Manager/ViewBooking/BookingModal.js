import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Popper } from '@material-ui/core';
import './ManagerBooking.css';

export default function ScrollDialog(props) {
	const [open, setOpen] = React.useState(props.open ? props.open : false);
	const [scroll, setScroll] = React.useState('paper');

	const handleClose = () => {
		props.handleClose();
	};

	const descriptionElementRef = React.useRef(null);

	React.useEffect(() => {
		if (open) {
			const { current: descriptionElement } = descriptionElementRef;
			if (descriptionElement !== null) {
				descriptionElement.focus();
			}
		}
	}, [open]);

	console.log('props', props);
	return (
		<div>
			<Dialog
				open={props.open}
				onClose={handleClose}
				scroll={scroll}
				aria-labelledby='scroll-dialog-title'
				aria-describedby='scroll-dialog-description'>
				<DialogTitle id='scroll-dialog-title'>Booking Details</DialogTitle>
				<DialogContent dividers={scroll === 'paper'}>
					<DialogContentText
						id='scroll-dialog-description'
						ref={descriptionElementRef}
						tabIndex={-1}>
						<table className='order_table'>
							<tr>
<<<<<<< HEAD
								<th style={{ width: '150px' }}>Email</th>
								<th style={{ width: '150px' }}>Area</th>
								<th style={{ width: '150px' }}>Comments</th>
								<th style={{ width: '150px' }}>SlotID</th>
								<th style={{ width: '150px' }}>Booking Date</th>
							</tr>
							{
								<tr>
									<td>{props.Email}</td>
									<td>{props.Area}</td>
									<td>{props.Comment}</td>
									<td>{props.SlotID}</td>
									<td>{props.BookingDate}</td>
								</tr>
							}
=======
								<th style={{ width: '150px' }}>Name</th>
								<th style={{ width: '150px' }}>Date</th>
								<th style={{ width: '150px' }}>Party No.</th>
								<th style={{ width: '150px' }}>Email</th>
							</tr>
							{props.booking &&
								props.booking.map((BookingsList, index) => {
									return (
										<tr>
											<td>{BookingsList.lastName}</td>
											<td>{BookingsList.booking_date}</td>
											<td>{BookingsList.members}</td>
											<td>{BookingsList.email}</td>
										</tr>
									);
								})}
>>>>>>> a6ae2606384e06a36f5a366c163a89a62334f7fb
						</table>
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} variant='contained' color='secondary'>
						Close
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
