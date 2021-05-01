import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Popper } from '@material-ui/core';
import './OrdersCss.css';
import axios from 'axios';
import toastr from 'toastr';
export default function ScrollDialog(props) {
	const [open, setOpen] = React.useState(props.open ? props.open : false);
	const [scroll, setScroll] = React.useState('paper');
	const [deleveryCharge, setDeleveryCharge] = React.useState(2);
	const [totalItems, setTotalItems] = React.useState(props.orders.length);
	const [total, setTotal] = React.useState(0);

	const handleClose = () => {
		props.handleClose();
	};

	const descriptionElementRef = React.useRef(null);

	var totalPrice = 0;
	var tax = 0;
	var subTotal = 0;
	const calculateSubtotal = () => {
		props.orders.forEach((item) => {
			totalPrice += item.Quantity * item.Price;
		});
		console.log('sum: ', totalPrice);
		tax = (totalPrice * 0.0875).toFixed(2);
		subTotal = totalPrice + tax;
		console.log('subTotal', subTotal);
	};

	calculateSubtotal();

	React.useEffect(() => {
		if (open) {
			const { current: descriptionElement } = descriptionElementRef;
			if (descriptionElement !== null) {
				descriptionElement.focus();
			}
		}
	}, [open]);

	const setCancelled = () => {
		try {
			console.log(props);
			axios
				.put('http://localhost:5000/Api/Orders/setCancelled', { ID: props.id })
				.then((res) => {
					if (res.status == 200) {
						const data = res.data;
						toastr.success('Successfully updated status');
					} else {
						toastr.error('Unexpected failure occured');
					}
				})
				.catch((err) => {
					toastr.error(err.response.data.status);
				});
		} catch (err) {
			toastr.error('Error occured!');
			console.log(err);
		}
	};

	console.log('props', props);
	return (
		<div>
			<Dialog
				open={props.open}
				onClose={handleClose}
				scroll={scroll}
				aria-labelledby='scroll-dialog-title'
				aria-describedby='scroll-dialog-description'>
				<DialogTitle id='scroll-dialog-title'>Order Details</DialogTitle>
				<DialogContent dividers={scroll === 'paper'}>
					<DialogContentText
						id='scroll-dialog-description'
						ref={descriptionElementRef}
						tabIndex={-1}>
						<table className='order_table'>
							<tr>
								<th style={{ width: '150px' }}>Name</th>
								<th style={{ width: '150px' }}>Quantity</th>
								<th style={{ width: '150px' }}>Price</th>
								<th style={{ width: '150px' }}>Total</th>
							</tr>
							{props.orders &&
								props.orders.map((order, index) => {
									return (
										<tr>
											<td>{order.Name}</td>
											<td>{order.Quantity}</td>
											<td>${order.Price}</td>
											<td>${order.Quantity * order.Price}</td>
										</tr>
									);
								})}
						</table>
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={setCancelled} variant='contained' color='secondary'>
						Cancel Order
					</Button>
					<Button onClick={handleClose} variant='contained' color='secondary'>
						Close
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
