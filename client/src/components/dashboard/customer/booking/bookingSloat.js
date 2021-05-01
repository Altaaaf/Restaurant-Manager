import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button, Typography } from '@material-ui/core';
import BookingForm from './bookingFrom';
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import addDays from 'date-fns/addDays';

const useStyles = makeStyles({
    table: {

    },
});







const slots = [
    {
        slot: '12-PM to 01-PM',
        book_count: [],
        id: '1'
    },
    {
        slot: '01-PM to 02-PM',
        book_count: [],
        id: '2'
    },
    {
        slot: '02-PM to 03-PM',
        book_count: [],
        id: '3'
    },
    {
        slot: '03-PM to 04-PM',
        book_count: [],
        id: '4'
    },
    {
        slot: '04-PM to 05-PM',
        book_count: [],
        id: '5'
    },
    {
        slot: '05-PM to 06-PM',
        book_count: [],
        id: '6'
    },
    {
        slot: '06-PM to 07-PM',
        book_count: [],
        id: '7'
    },
    {
        slot: '07-PM to 08-PM',
        book_count: [],
        id: '8'
    },
    {
        slot: '08-PM to 09-PM',
        book_count: [],
        id: '9'
    },
    {
        slot: '09-PM to 10-PM',
        book_count: [],
        id: '10'
    },
]


const DenseTable = () => {
    const classes = useStyles();
    const [defaultSlots, setDefaultSlots] = useState(slots);
    const [open, setOpen] = useState(false)
    const [alert, setAlert] = useState(false)
    const [time, setTime] = useState();
    const [slot_id, setSlotId] = useState();
    const [bookingData, setBookingData] = useState([]);



    const handleCompare = async () => {
        await slots.map(sl => {
            bookingData.filter(fil => {
                console.log(sl)
                console.log(fil)
                if (sl.id === fil.slot_id) {
                    console.log('found')
                    sl.book_count.push(fil)
                }
            })
        })
    }

    console.log(handleCompare())



    const handleClose = () => {
        setOpen(false)
    }

    const [selectedDate, setSelectedDate] = useState();

    const GetbookingAPI = async (paylod) => {
        const result = await axios.post('http://localhost:5000/Api/booking/booking/get', paylod)
        setBookingData(result.data)
        return result;
    }

    const handleDateChange = (date) => {
        setSelectedDate(date);
        GetbookingAPI({ booking_date: date.toISOString() });
        handleCompare();
    };

    const handleOpenBookingForm = (time, id) => {
        if (!selectedDate) return setAlert(true);
        setSlotId(id)
        setAlert(false)
        setTime(time)
        setOpen(true)
    }

    useEffect(() => {
        GetbookingAPI({ booking_date: new Date().toISOString() })
        handleCompare();
    }, [])

    return (
        <div>
            <BookingForm time={time} slot_id={slot_id} bookingDate={selectedDate} open={open} handleClose={() => handleClose()} />
            {alert ? <Alert
                severity="error"
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
                Select Date for your booking!
        </Alert> : null}
            <div style={{ float: 'left', marginBottom: '10px', backgroundColor: 'white', borderRadius: '10px', padding: '20px' }}>
                <h6>Select Your Booking Date</h6>
                <DatePicker
                     selected={selectedDate}
                    onChange={date => handleDateChange(date)}
                    showTimeSelect
                    placeholderText="Select a date"
                    timeFormat='HH:mm'
                    timeIntervals={30}
                    dateFormat='MMMM dd, yyyy'
                    minDate={new Date()}
					maxDate={addDays(new Date(), 7)}
                />
            </div>
            <TableContainer component={Paper}>
                <Table style={{ width: '100%', height: '100%' }} size="small" aria-label="a dense table">
                    <TableHead >
                        <TableRow>
                            <TableCell >Sr.No</TableCell>
                            <TableCell>Booking Time</TableCell>
                            <TableCell align="right">Booked Slots</TableCell>
                            <TableCell align="right">Available Slots</TableCell>
                            <TableCell align="right">Click To Book Slot</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody style={{ marginTop: '20px' }}>
                        {slots.map((row, index) => (
                            <TableRow key={row.name}>
                                <TableCell >{index + 1}</TableCell>
                                <TableCell component="th" scope="row">
                                    <Typography>{row.slot}</Typography>
                                </TableCell>
                                <TableCell align="right">{row.book_count.length ? row.book_count.length + '-Slots Booked' : '0 - Slots'}</TableCell>
                                <TableCell align="right">{row.book_count.length === '0' ? '3 - Slots Available' : row.book_count.length === 1 ? '2 - Slots Available' : row.book_count.length === 2 ? '1 - Slots Avalable' : row.book_count.length === 3 ? 'All Slots Booked' : 'All Slots Avalable'}</TableCell>
                                <TableCell align="right"><Button disabled={row.book_count.length >= 3 ? true : false} onClick={() => handleOpenBookingForm(row.slot, row.id)} size='sm' variant="contained" color="primary"  >Book</Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>

    );
}

export default DenseTable;