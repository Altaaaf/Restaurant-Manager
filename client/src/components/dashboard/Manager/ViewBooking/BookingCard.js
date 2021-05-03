import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import './ManagerBooking.css';
import BookingPage from './BookingModal';
import CallOutlinedIcon from '@material-ui/icons/CallOutlined';
import DeckIcon from '@material-ui/icons/Deck';
import GroupOutlinedIcon from '@material-ui/icons/GroupOutlined';
import DateRangeOutlinedIcon from '@material-ui/icons/DateRangeOutlined';

const useStyles = makeStyles((theme) => ({
	root: {
		maxWidth: 360,
		boxShadow: '2px 2px 2px 2px #888888',
		margin: '20px',
	},
	media: {
		height: 0,
		paddingTop: '56.25%', // 16:9
	},
	expand: {
		transform: 'rotate(0deg)',
		marginLeft: 'auto',
		transition: theme.transitions.create('transform', {
			duration: theme.transitions.duration.shortest,
		}),
	},
	expandOpen: {
		transform: 'rotate(180deg)',
	},
	avatar: {
		border: '3px solid lightnavy',
		backgroundColor: 'white',
	},
	registerButton: {
		width: '100%',
	},
	catalogIcon: {
		color: 'black',
		cursor: 'pointer',
	},
}));

export default function RecipeReviewCard(props) {
	const classes = useStyles();
	const [open, setOpen] = useState(false);

	const handleChangeView = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<>
			<BookingPage
				BookingDate={props.BookingDate}
				Email={props.Email}
				Area={props.Area}
				Comment={props.Comment}
				SlotID={props.SlotID}
				FirstName={props.FirstName}
				open={open}
				handleClose={() => handleClose()}
			/>
			{
				<Card className={classes.root}>
					<CardHeader
						style={{
							whiteSpace: 'pre-line',
						}}
						avatar={
							<Avatar aria-label='recipe' src={props.logo} className={classes.avatar}>
								<DeckIcon className={classes.catalogIcon} />
							</Avatar>
						}
						action={
							<IconButton aria-label='settings'>
								<MoreVertIcon />
							</IconButton>
						}
						title={`Booking id : ${props.id}`}
						subheader={`Customer Name : ${props.CustomerName}`}
					/>
					<CardContent>
						<Typography variant='body2' color='textSecondary' component='p'>
							<div className='card_items'>
								<GroupOutlinedIcon style={{ color: '#b38917' }} />
								<b>Total People : </b>
								<p>{props.coverNo}</p>
							</div>

							<div className='card_items'>
								<CallOutlinedIcon color='primary' />
								<b>Contact Number :</b>
								<p>{props.phone}</p>
							</div>
							<div className='card_items'>
								<DateRangeOutlinedIcon color='primary' />
								<b>Reservation Time :</b>
								<p>{props.createdDate}</p>
							</div>
						</Typography>
					</CardContent>
					<Button
						onClick={() => handleChangeView()}
						className={classes.registerButton}
						variant='contained'
						color='lightgreen'>
						View This Reservation
					</Button>
				</Card>
			}
		</>
	);
}
