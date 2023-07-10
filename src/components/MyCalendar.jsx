import React, { Fragment, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import PropTypes from 'prop-types'
import moment from 'moment'
import { Calendar, Views, DateLocalizer, momentLocalizer, } from 'react-big-calendar'
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Typography, TextField, FormControl, InputLabel, Select, MenuItem, Stack } from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete';
import { Context } from '../App';
import { AddPatient } from './Patient';

const ColoredDateCellWrapper = ({ children }) =>
    React.cloneElement(React.Children.only(children), {
        style: {
            backgroundColor: '#fff',
        },
    })

/**
 * We are defaulting the localizer here because we are using this same
 * example on the main 'About' page in Storybook
 */
export default function MyCalendar({ eventFilter, }) {
    const { components, defaultDate, max, views } = useMemo(
        () => ({
            components: {
                timeSlotWrapper: ColoredDateCellWrapper,
            },
            defaultDate: new Date(),
            // max: dates.add(dates.endOf(new Date(2015, 17, 1), 'day'), -1, 'hours'),
            // views: Object.keys(Views).map((k) => Views[k]),
        }),
        []
    )


    const { events, setSlotInfo, preference } = useContext(Context);
    const today = new Date();
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    moment.locale('in', {
        week: {
            dow: daysOfWeek.indexOf(preference.firstDayOfWeek),
        }
    })
    const mLocalizer = momentLocalizer(moment)

    const [open, setOpen] = useState(false);
    const [appointmentDetailPopupOpen, setAppointmentDetailPopupOpen] = useState(false);
    const [eventsData, setEventsData] = useState([]);
    const [eventsId, setEventsId] = useState();

    useEffect(() => {
        setEventsData(events.map(ele => {
            if (eventFilter === ele.doctorName) {
                return { ...ele, start: new Date(ele.start), end: new Date(ele.end) }
            } else if (eventFilter === 'All') {
                return { ...ele, start: new Date(ele.start), end: new Date(ele.end) }
            }
        }))
    }, [events, appointmentDetailPopupOpen, eventFilter]);

    const showAddAppointment = useCallback(({ start, end }) => {
        setOpen(true);
        setSlotInfo({ start, end });
    }, [])

    const showEventsDetail = (e) => {
        setAppointmentDetailPopupOpen(true);
        setEventsId(e.id);
    }

    return (
        <Fragment>
            <Calendar
                components={components}
                defaultDate={defaultDate}
                events={eventsData}
                defaultView={preference.defaultView === 'Weekly' ? Views.WEEK : preference.defaultView === 'Monthly' ? Views.MONTH : Views.DAY}
                localizer={mLocalizer}
                min={new Date(today.getFullYear(), today.getMonth(), today.getDate(), Number(preference.startTime.split(':')[0]))}
                max={new Date(today.getFullYear(), today.getMonth(), today.getDate(), Number(preference.endTime.split(':')[0]) + 12)}
                showMultiDayTimes
                step={Number(preference.slotDuration.slice(0, 3))}
                timeslots={1}
                style={{ height: '440px', backgroundColor: '#fff' }}
                onSelectSlot={showAddAppointment}
                onSelectEvent={showEventsDetail}
                selectable
                eventPropGetter={(e) => {
                    if (e.department === 'General Medicine') {
                        return { style: { backgroundColor: '#df5286' } }
                    } else if (e.department === 'Neurology') {
                        return { style: { backgroundColor: '#1aaa55' } }
                    } else if (e.department === 'Dermatology') {
                        return { style: { backgroundColor: '#865fcf' } }
                    } else if (e.department === 'Orthopedics') {
                        return { style: { backgroundColor: '#fce200' } }
                    } else if (e.department === 'Diabetology') {
                        return { style: { backgroundColor: '#ea7a57' } }
                    } else if (e.department === 'Cardiology') {
                        return { style: { backgroundColor: '#00bdae' } }
                    }
                }}
            />
            <AddAppointment open={open} setOpen={setOpen} />
            <AppointmentDetailPopup appointmentDetailPopupOpen={appointmentDetailPopupOpen} setAppointmentDetailPopupOpen={setAppointmentDetailPopupOpen} eventsId={eventsId} />
        </Fragment>
    )
}


export const AddAppointment = ({ open, setOpen, eventDetails }) => {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        borderRadius: 2,
        outline: 'none'
    };

    const [openPatient, setOpenPatient] = useState(false);
    const { addPatient, addDoctor, events, setEvents, recentActivity, setRecentActivity, slotInfo } = useContext(Context);
    const handleClose = () => {
        setOpen(false);
        setAppointment({ patientName: '', doctorName: '', department: 'General Medicine', location: '', start: '', end: '', symptom: '' });
    }

    const patientName = addPatient.map((ele) => ele.name);
    const doctorListName = addDoctor.map((ele) => ele.name);
    const [appointment, setAppointment] = React.useState({ patientName: '', doctorName: '', department: 'General Medicine', location: '', start: '', end: '', symptom: '' });

    useEffect(() => {
        if (eventDetails) setAppointment({ ...eventDetails, start: new Date(eventDetails.start), end: new Date(eventDetails.end) })
    }, [eventDetails])

    useEffect(() => {
        setAppointment({ ...appointment, ...slotInfo });
    }, [slotInfo])

    const appointmentHandling = (e, input) => {
        if (!eventDetails) {
            const id = new Date().getTime();
            setAppointment({ ...appointment, id: id, [input]: e.target.value })
        } else {
            setAppointment({ ...appointment, [input]: e.target.value })
        }
    }

    const addAppointment = () => {
        if (!Object.values(appointment).includes('')) {
            if (!eventDetails) {
                setEvents([...events, { ...appointment, title: appointment.patientName }]);
                setRecentActivity([{ title: 'Added New Appointment', activity: `for patient ${appointment.patientName}`, time: new Date().toLocaleString() }, ...recentActivity])
            } else {
                let index = events.indexOf(eventDetails);
                events[index] = { ...appointment };
                setRecentActivity([{ title: 'Updated Appointment', activity: `of patient ${appointment.patientName}`, time: new Date().toLocaleString() }, ...recentActivity]);
            }
            handleClose();
        } else {
            alert('Please fill all the fields');
        }
    }

    return (
        <>
            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '10px 20px 0px', borderBottom: '1px solid #ccc', borderTopLeftRadius: '7px', borderTopRightRadius: '7px', bgcolor: '#7575ff' }}>
                        <Typography variant='h6' sx={{ fontSize: '16px', color: '#fff' }}>{!eventDetails ? 'Add Appointment' : 'Edit Appointment'}</Typography>
                        <Typography variant='h6' ><CloseIcon onClick={() => handleClose()} sx={{ cursor: 'pointer', fontSize: '20px', fontWeight: 'bolder', color: '#fff' }} /></Typography>
                    </Box>
                    <Box sx={{ padding: '20px 20px 0', width: '100%' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: 'auto', marginBottom: '10px' }}>
                            <Autocomplete
                                size='small'
                                disablePortal
                                id="combo-box-demo"
                                value={appointment.patientName}
                                options={patientName}
                                onChange={(e, value) => setAppointment({
                                    ...appointment, patientName: value
                                })}
                                sx={{ width: 310 }}
                                renderInput={(params) => <TextField {...params} label="Patient Name" />}
                            />
                            <AddIcon sx={{ width: '35px', height: '35px', padding: '5px', bgcolor: '#7575ff', color: '#fff', border: 'none', borderRadius: '50%', cursor: 'pointer' }} onClick={() => setOpenPatient(true)} />
                        </Box>
                        <Box sx={{ margin: 'auto', marginBottom: '20px' }}>
                            <Autocomplete
                                size='small'
                                disablePortal
                                id="combo-box-demo"
                                value={appointment.doctorName}
                                options={doctorListName}
                                onChange={(e, value) => setAppointment({
                                    ...appointment, doctorName: value
                                })}
                                sx={{ width: '100%' }}
                                renderInput={(params) => <TextField {...params} label="Consultation" />}
                            />
                        </Box>
                        <Box sx={{ margin: 'auto', marginBottom: '10px' }}>
                            <FormControl fullWidth sx={{ marginRight: '10px' }}>
                                <InputLabel id="demo-simple-select-helper-label" sx={{ marginTop: '-8px', color: '#a5a5a5', fontSize: '14px' }}>Department</InputLabel>
                                <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    value={appointment.department}
                                    label="Specialist"
                                    onChange={(e) => appointmentHandling(e, 'department')}
                                    sx={{ height: '35px', bgcolor: '#fff' }}
                                >
                                    <MenuItem value={'General Medicine'} >General Medicine</MenuItem>
                                    <MenuItem value={'Neurology'}>Neurology</MenuItem>
                                    <MenuItem value={'Dermatology'}>Dermatology</MenuItem>
                                    <MenuItem value={'Orthopedics'}>Orthopedics</MenuItem>
                                    <MenuItem value={'Diabetology'}>Diabetology</MenuItem>
                                    <MenuItem value={'Cardiology'}>Cardiology</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <Box sx={{ margin: 'auto', marginBottom: '10px' }}>
                            <TextField id="outlined-basic" label="Location" variant="outlined" size='small' value={appointment.location} onChange={(e) => appointmentHandling(e, 'location')} sx={{ width: '100%' }} />
                        </Box>
                        <Stack sx={{ marginBottom: '10px' }}>
                            <Typography fontSize='12px' fontWeight='bold'>Start Date Time</Typography>
                            <TextField type='datetime-local' size='small'
                                value={appointment.start && new Date(appointment.start.getTime() - appointment.start.getTimezoneOffset() * 60000).toISOString().slice(0, -1)}
                                onChange={(e) => setAppointment({ ...appointment, start: new Date(e.target.value) })}></TextField>
                        </Stack>
                        <Stack sx={{ marginBottom: '10px' }}>
                            <Typography fontSize='12px' fontWeight='bold'>End Date Time</Typography>
                            <TextField type='datetime-local' size='small'
                                value={appointment.end && new Date(appointment.end.getTime() - appointment.end.getTimezoneOffset() * 60000).toISOString().slice(0, -1)}
                                onChange={(e) => setAppointment({ ...appointment, end: new Date(e.target.value) })}></TextField>
                        </Stack>
                        <Box sx={{ margin: 'auto' }}>
                            <textarea rows="3" placeholder='Symptom' value={appointment.symptom} onChange={(e) => appointmentHandling(e, 'symptom')}></textarea>
                        </Box>
                    </Box>
                    <hr />
                    <Button variant='contained' sx={{ float: 'right', margin: '0px 20px 10px', bgcolor: '#7575ff' }} onClick={addAppointment}>{!eventDetails ? 'Add' : 'Update'}</Button>
                </Box>
            </Modal>
            <AddPatient open={openPatient} setOpen={setOpenPatient} />
        </>
    );
}

export const AppointmentDetailPopup = ({ appointmentDetailPopupOpen, setAppointmentDetailPopupOpen, eventsId }) => {

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        borderRadius: 2,
        outline: 'none'
    };

    const { events, setEvents } = useContext(Context);
    const eventDetails = events.find((ele) => ele.id === eventsId);
    const [open, setOpen] = useState(false);
    const handleClose = () => setAppointmentDetailPopupOpen(false);

    return (
        <>
            {
                eventDetails && <Modal
                    open={appointmentDetailPopupOpen}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '10px 20px 0px', borderBottom: '1px solid #ccc', borderTopLeftRadius: '7px', borderTopRightRadius: '7px', bgcolor: '#7575ff' }}>
                            <Typography variant='h6' sx={{ fontSize: '16px', color: '#fff' }}>Appointment Details</Typography>
                            <Typography variant='h6' ><CloseIcon onClick={() => handleClose()} sx={{ cursor: 'pointer', fontSize: '20px', fontWeight: 'bolder', color: '#fff' }} /></Typography>
                        </Box>
                        <Stack sx={{ padding: '20px 20px 0', width: '100%', fontSize: '12px' }}>
                            <Stack direction='row' alignItems='center' mb={1} >
                                <Typography variant='p' width='35%' fontWeight='bold'>Patient Name</Typography>
                                <Typography width='5%'>:</Typography>
                                <Typography variant='p' width="60%">{eventDetails.patientName}</Typography>
                            </Stack>
                            <Stack direction='row' alignItems='center' mb={1} >
                                <Typography variant='p' width='35%' fontWeight='bold'>Doctor Name</Typography>
                                <Typography width='5%'>:</Typography>
                                <Typography variant='p' width="60%">{eventDetails.doctorName}</Typography>
                            </Stack>
                            <Stack direction='row' alignItems='center' mb={1} >
                                <Typography variant='p' width='35%' fontWeight='bold'>Notes</Typography>
                                <Typography width='5%'>:</Typography>
                                <Typography variant='p' width="60%">{eventDetails.symptom}</Typography>
                            </Stack>
                            <Stack direction='row' alignItems='center' mb={1} >
                                <Typography variant='p' width='35%' fontWeight='bold'>Appointment Date</Typography>
                                <Typography width='5%'>:</Typography>
                                <Typography variant='p' width="60%">{new Date(eventDetails.start).toString().slice(4, 15)}</Typography>
                            </Stack>
                            <Stack direction='row' alignItems='center' mb={1} >
                                <Typography variant='p' width='35%' fontWeight='bold'>Appointment Time</Typography>
                                <Typography width='5%'>:</Typography>
                                <Typography variant='p' width="60%">{new Date(eventDetails.start).toString().slice(16, 21)} {new Date(eventDetails.start).getHours() > 11 ? 'PM' : 'AM'} - {new Date(eventDetails.end).toString().slice(16, 21)} {new Date(eventDetails.start).getHours() > 11 ? 'PM' : 'AM'}</Typography>
                            </Stack>
                        </Stack>
                        <hr />
                        <Button variant='outlined' sx={{ float: 'right', margin: '0px 20px 10px', bgcolor: '#fff', color: '#000', border: '1px solid #ccc', ":hover": { bgcolor: '#ccc', border: '1px solid #000' } }} onClick={() => setEvents(events.filter(ele => ele.id !== eventDetails.id))}>Delete</Button>
                        <Button variant='contained' sx={{ float: 'right', margin: '0px 0px 10px', bgcolor: '#7575ff' }} onClick={() => setOpen(true)}>Edit</Button>
                    </Box>
                </Modal>
            }
            <AddAppointment open={open} setOpen={setOpen} eventDetails={eventDetails} />
        </>
    );
}