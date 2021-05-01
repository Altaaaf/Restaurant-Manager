import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import Alert from '@material-ui/lab/Alert';

import axios from 'axios';


const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: 200,
        },
    },
    booking_form_details: {
        textAlign: 'center'
    },
    root_card: {
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
        transition: '0.3s',
        width: '40 %'
    },
    details: {
        float: 'left'
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: 350,
        height: 540,
        float: 'right'
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
    playIcon: {
        height: 38,
        width: 38,
    },
    cardConatainer: {
        marginTop: 100,
        marginLeft: 320,
        marginLeft: 550,
        textAlign: 'center',
        width: 800,
        alignItems: 'center',
        justifyContent: 'center'
    }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(props.open);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [bookingDate, setBookingDate] = useState(props.bookingDate);
    const [bookingTime, setBookingTime] = useState('');


    const theme = useTheme();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [currency, setCurrency] = React.useState('USD');
    const [bokingData, setBookingData] = useState([]);
    const [comment, setComment] = useState('');
    const [members, setMembers] = useState('');
    const [area_type, setArea_type] = useState('');
    const [alert, setAlert] = useState('');

    const handleChange = (event) => {
        setCurrency(event.target.value);
    };



    const bookingAPI = async (paylod) => {
        const result = await axios.post('http://localhost:5000/Api/booking/booking', paylod)
        if(result.data) setAlert(true)
        return result;
    }

    const GetbookingAPI = async (paylod) => {
        const result = await axios.get('http://localhost:5000/Api/booking/booking', paylod)
        setBookingData(result.data)
        return result;
    }

    const handleSaveBooking = () => {
        let paylod = {
            booking_date: props.bookingDate,
            booking_time: props.time,
            slot_id: props.slot_id,
            coverNo: '1',
            phone: mobile,
            email: email,
            FirstName: firstName,
            lastName: lastName,
            comment: comment,
            members: members,
            area_type: area_type
        }
        console.log('paylod', paylod)
        bookingAPI(paylod)
        GetbookingAPI()

    }

    const memebers = [
        {
            value: '1',
            label: '1',
        },
        {
            value: '2',
            label: '2',
        },
        {
            value: '3',
            label: '3',
        },
        {
            value: '4',
            label: '4',
        },
        {
            value: '5',
            label: '5',
        },
        {
            value: '6',
            label: '6',
        },
        {
            value: '7',
            label: '7',
        },
        {
            value: '8',
            label: '8',
        },
        {
            value: '9',
            label: '9',
        },
        {
            value: '10',
            label: '10',
        },
    ];

    const areaType = [
        {
            value: 'Outdoor',
            label: 'Outdoor',
        },
        {
            value: 'Indoor',
            label: 'Indoor',
        },
    ];

    useEffect(() => {
        GetbookingAPI()
    }, [])

    console.log('bokingData', bokingData)
    return (
        <div>
            <Dialog fullScreen open={props.open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">

                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Welcome To Barns Link Booking
                        </Typography>
                        <IconButton edge="start" color="inherit" onClick={() => props.handleClose()} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>

                <div className={classes.cardConatainer}>
                    <Card className={classes.root_card}>
                        <div className={classes.details}>
                            <CardContent className={classes.content}>
                                <Typography component="h5" variant="h5">
                                    Barns Link
                           </Typography>
                                <Typography variant="subtitle1" color="textSecondary">
                                    Booking
                           </Typography>
                            </CardContent>
                            <div className={classes.booking_form_details}>
                                <form className={classes.root} noValidate autoComplete="off">
                                    <div>
                                        <TextField
                                            disabled={true}
                                            size="small"
                                            value={props.bookingDate}
                                            error={false}
                                            id="standard-error"
                                            label="Date"
                                            defaultValue=""
                                            variant="outlined"
                                        />
                                        <TextField
                                            disabled={true}
                                            value={props.time}
                                            size="small"
                                            error={false}
                                            id="standard-error-helper-text"
                                            label="Time"
                                            defaultValue=""
                                            helperText=""
                                            variant="outlined"
                                        />
                                    </div>
                                    <div>
                                        <TextField
                                            value={email}
                                            onChange={(e) => setFirstName(e.target.value)}
                                            value={firstName}
                                            error={false}
                                            id="standard-error"
                                            label="First Name"
                                            defaultValue=""
                                            variant="outlined"
                                        />
                                        <TextField
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                            error={false}
                                            id="standard-error-helper-text"
                                            label="Last Name"
                                            defaultValue=""
                                            helperText=""
                                            variant="outlined"
                                        />
                                    </div>
                                    <div>
                                        <TextField
                                            error={false}
                                            id="standard-error"
                                            label="Email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            defaultValue=""
                                            variant="outlined"
                                        />
                                        <TextField
                                            error={false}
                                            value={mobile}
                                            id="standard-error-helper-text"
                                            label="Phone"
                                            onChange={(e) => setMobile(e.target.value)}
                                            defaultValue=""
                                            helperText=""
                                            variant="outlined"
                                        />

                                    </div>
                                    <div>
                                        <TextField
                                            id="filled-select-currency"
                                            select
                                            label="Outdoor or Indoor"
                                            value={area_type}
                                            onChange={(e) => setArea_type(e.target.value)}
                                            helperText="Please select"
                                            variant="outlined"
                                        >
                                            {areaType.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                        <TextField
                                            id="filled-select-currency"
                                            select
                                            label="How many people"
                                            value={members}
                                            onChange={(e) => setMembers(e.target.value)}
                                            helperText="Please select"
                                            variant="outlined"
                                        >
                                            {memebers.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </div>
                                    <div>
                                        <TextField
                                            style={{ width: '97%' }}
                                            error={false}
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                            id="standard-error-helper-text"
                                            label="Comment"
                                            defaultValue=""
                                            helperText=""
                                            variant="outlined"
                                        />
                                    </div>
                                    {alert ? <Alert
                                        severity="success"
                                        action={
                                            <IconButton
                                                aria-label="close"
                                                size="small"
                                                onClick={() => {
                                                    setAlert(false);
                                                }}
                                            >
                                                <CloseIcon fontSize="inherit" />
                                            </IconButton>
                                        }
                                    >
                                        Booking confirmed Thanks for your booking!
                                    </Alert> : null}
                                    <div>
                                        <Button style={{ width: '97%', marginTop: '30px' }} onClick={() => handleSaveBooking()} size='sm' variant="contained" color="primary"  >Confirm Booking</Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <CardMedia
                            className={classes.cover}
                            image="https://images.firstwefeast.com/complex/image/upload/c_limit,f_auto,fl_lossy,q_auto,w_1100/xmmmujiilpyeidz7oins"
                            title="Live from space album cover"
                        />
                    </Card>
                </div>
            </Dialog>
        </div>
    );
}
