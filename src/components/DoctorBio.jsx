import React, { useContext, useEffect, useState } from 'react'
import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import { useNavigate, useParams } from 'react-router-dom';
import { Context } from '../App';
import { AddDoctor } from './Doctor';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import CloseIcon from '@mui/icons-material/Close';
import Modal from '@mui/material/Modal';
import Autocomplete from '@mui/material/Autocomplete';

const DoctorBio = () => {
    const navTo = useNavigate();
    const { doctorId } = useParams();
    const { addDoctor, setAddDoctor, doctorDetail, setDoctorDetail } = useContext(Context);
    const [open, setOpen] = React.useState(false);
    const [openBreak, setOpenBreak] = React.useState(false);

    // console.log(doctorDetail)

    useEffect(() => {
        setDoctorDetail(addDoctor.find((ele) => ele.id === Number(doctorId)));
    }, [open, openBreak]);

    const deleteDoctor = (id) => {
        setAddDoctor(addDoctor.filter((ele) => ele.id !== id));
        navTo('/doctor');
    }
    // console.log(doctorDetail)
    return (
        <>
            <Box sx={{ padding: '20px' }}>
                <Box sx={{ display: 'flex' }}>
                    <ChevronLeftIcon sx={{ fontSize: '28px', mr: '10px', cursor: 'pointer', ":hover": { color: '#7575ff' } }} onClick={() => navTo('/doctor')} />
                    <Box>
                        <Typography variant='h6' sx={{ fontSize: '16px', fontWeight: 'bold' }}>DOCTOR DETAILS</Typography>
                        <Typography variant='h6' sx={{
                            background: '#7575ff',
                            borderRadius: '5px', width: '52px', height: '4px'
                        }}></Typography>
                    </Box>
                </Box>

                <Box sx={{ marginY: '30px', display: 'flex', justifyContent: { sm: 'end', xs: 'space-between' }, alignItems: 'center' }}>
                    <Button variant='contained' sx={{ width: '100px', bgcolor: 'red', marginRight: '10px', ":hover": { bgcolor: '#f44343' } }} onClick={() => deleteDoctor(doctorDetail.id)}>Delete</Button>
                    <Button variant='contained' sx={{ width: '100px', bgcolor: '#7575ff' }} onClick={() => setOpen(true)}>Edit</Button>
                </Box>
                {
                    doctorDetail && <Box sx={{ display: 'flex', justifyContent: { xs: 'center', sm: 'space-between', lg: 'space-evenly' }, flexDirection: { xs: 'column', sm: 'row' }, width: { xs: '100%', sm: '100%', lg: '80%' } }}>
                        <Box sx={{ width: { xs: '100%', sm: '45%', lg: '35%' }, display: 'flex', justifyContent: 'space-evenly', marginBottom: { xs: '20px', sm: '0' } }}>
                            <img src={doctorDetail.image} alt="" style={{ width: '100px', height: '100px', borderRadius: '50%', marginRight: '20px' }} />

                            <Box>
                                <Box marginBottom='10px'>
                                    <Typography sx={{ fontWeight: 'bold' }}>Dr. {doctorDetail.name}</Typography>
                                    <Typography fontSize='10px'>{doctorDetail.education}</Typography>
                                    <Typography fontSize='14px'>{doctorDetail.designation}</Typography>
                                </Box>
                                <Box marginBottom='10px'>
                                    <Typography fontSize='14px' color='#666666'>Specialization</Typography>
                                    <Typography fontSize='14px'>{doctorDetail.department}</Typography>
                                </Box>
                                <Box marginBottom='10px'>
                                    <Typography fontSize='14px' color='#666666'>Experience</Typography>
                                    <Typography fontSize='14px'>{doctorDetail.experience}</Typography>
                                </Box>
                                {/* <Box marginBottom='10px'>
                                    <Typography fontSize='14px' color='#666666'>Availability</Typography>
                                    <Typography fontSize='14px'>SUN,TUE,WED,THU</Typography>
                                </Box> */}
                                <Box marginBottom='10px'>
                                    <Typography fontSize='14px' color='#666666'>Mobile</Typography>
                                    <Typography fontSize='14px'>{doctorDetail.number}</Typography>
                                </Box>
                            </Box>
                        </Box>

                        <Box sx={{ width: { xs: '100%', sm: '45%', lg: '35%' }, display: 'flex', flexDirection: 'column' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                                <Typography fontSize='14px' marginRight='20px' >Break Hours</Typography>
                                <Typography sx={{ display: 'flex', fontSize: '14px', color: '#7575ff', cursor: 'pointer' }} onClick={() => setOpenBreak(true)}>
                                    <AddIcon sx={{ fontSize: '18px', bgcolor: '#7575ff', color: '#fff', borderRadius: '50%', marginRight: '5px' }} /> Add</Typography>
                            </Box>
                            {!doctorDetail.workTime ? <Typography variant='p' align='center' color='red'>Please Add Break Time</Typography> : <Box>
                                <Box display='flex' marginBottom='10px' justifyContent='space-between'>
                                    <Typography fontSize='14px'>Sunday</Typography>
                                    <Typography fontSize='14px'>{doctorDetail.workTime.sunday.start} - {doctorDetail.workTime.sunday.end}</Typography>
                                </Box>
                                <Box display='flex' marginBottom='10px' justifyContent='space-between'>
                                    <Typography fontSize='14px'>Monday</Typography>
                                    <Typography fontSize='14px'>{doctorDetail.workTime.monday.start} - {doctorDetail.workTime.monday.end}</Typography>
                                </Box>
                                <Box display='flex' marginBottom='10px' justifyContent='space-between'>
                                    <Typography fontSize='14px'>Tuesday</Typography>
                                    <Typography fontSize='14px'>{doctorDetail.workTime.tuesday.start} - {doctorDetail.workTime.tuesday.end}</Typography>
                                </Box>
                                <Box display='flex' marginBottom='10px' justifyContent='space-between'>
                                    <Typography fontSize='14px'>Wednesday</Typography>
                                    <Typography fontSize='14px'>{doctorDetail.workTime.wednesday.start} - {doctorDetail.workTime.wednesday.end}</Typography>
                                </Box>
                                <Box display='flex' marginBottom='10px' justifyContent='space-between'>
                                    <Typography fontSize='14px'>Thursday</Typography>
                                    <Typography fontSize='14px'>{doctorDetail.workTime.thursday.start} - {doctorDetail.workTime.thursday.end}</Typography>
                                </Box>
                                <Box display='flex' marginBottom='10px' justifyContent='space-between'>
                                    <Typography fontSize='14px'>Friday</Typography>
                                    <Typography fontSize='14px'>{doctorDetail.workTime.friday.start} - {doctorDetail.workTime.friday.end}</Typography>
                                </Box>
                                <Box display='flex' marginBottom='10px' justifyContent='space-between'>
                                    <Typography fontSize='14px'>Saturday</Typography>
                                    <Typography fontSize='14px'>{doctorDetail.workTime.saturday.start} - {doctorDetail.workTime.saturday.end}</Typography>
                                </Box>
                            </Box>}
                        </Box>
                    </Box>
                }
            </Box>
            <AddDoctor open={open} setOpen={setOpen} doctorDetail={doctorDetail} />
            <AddBreak openBreak={openBreak} setOpenBreak={setOpenBreak} />
        </>
    )
}

export default DoctorBio


export const AddBreak = ({ openBreak, setOpenBreak }) => {
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

    const handleClose = () => setOpenBreak(false);
    const { addDoctor, doctorDetail } = useContext(Context);

    const time = ['12:00 AM', '01:00 AM', '02:00 AM', '03:00 AM', '04:00 AM', '05:00 AM', '06:00 AM', '07:00 AM', '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM', '09:00 PM', '10:00 PM', '11:00 PM'];

    const [timeData, setTimeData] = useState({
        sunday: { start: '12:00 AM', end: '11:00 PM' },
        monday: { start: '12:00 AM', end: '11:00 PM' },
        tuesday: { start: '12:00 AM', end: '11:00 PM' },
        wednesday: { start: '12:00 AM', end: '11:00 PM' },
        thursday: { start: '12:00 AM', end: '11:00 PM' },
        friday: { start: '12:00 AM', end: '11:00 PM' },
        saturday: { start: '12:00 AM', end: '11:00 PM' },
    });

    useEffect(() => {
        if (doctorDetail && doctorDetail.workTime) { setTimeData({ ...doctorDetail.workTime }) } else {
            setTimeData({
                sunday: { start: '12:00 AM', end: '11:00 PM' },
                monday: { start: '12:00 AM', end: '11:00 PM' },
                tuesday: { start: '12:00 AM', end: '11:00 PM' },
                wednesday: { start: '12:00 AM', end: '11:00 PM' },
                thursday: { start: '12:00 AM', end: '11:00 PM' },
                friday: { start: '12:00 AM', end: '11:00 PM' },
                saturday: { start: '12:00 AM', end: '11:00 PM' },
            })
        }

    }, [doctorDetail])

    const handleBreakData = (value, days, time) => {
        if (days === 'sunday') return setTimeData({ ...timeData, [days]: { ...timeData.sunday, [time]: value } })
        else if (days === 'monday') return setTimeData({ ...timeData, [days]: { ...timeData.monday, [time]: value } })
        else if (days === 'tuesday') return setTimeData({ ...timeData, [days]: { ...timeData.tuesday, [time]: value } })
        else if (days === 'wednesday') return setTimeData({ ...timeData, [days]: { ...timeData.wednesday, [time]: value } })
        else if (days === 'thursday') return setTimeData({ ...timeData, [days]: { ...timeData.thursday, [time]: value } })
        else if (days === 'friday') return setTimeData({ ...timeData, [days]: { ...timeData.friday, [time]: value } })
        else if (days === 'saturday') return setTimeData({ ...timeData, [days]: { ...timeData.saturday, [time]: value } })
    }

    const addBreakData = () => {
        let index = addDoctor.indexOf(doctorDetail);
        addDoctor[index] = { ...doctorDetail, workTime: { ...timeData } };
        setOpenBreak(false);
        setTimeData({
            sunday: { start: '12:00 AM', end: '11:00 PM' },
            monday: { start: '12:00 AM', end: '11:00 PM' },
            tuesday: { start: '12:00 AM', end: '11:00 PM' },
            wednesday: { start: '12:00 AM', end: '11:00 PM' },
            thursday: { start: '12:00 AM', end: '11:00 PM' },
            friday: { start: '12:00 AM', end: '11:00 PM' },
            saturday: { start: '12:00 AM', end: '11:00 PM' },
        })
    }

    return (
        <Modal
            open={openBreak}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '10px 20px 0px', borderBottom: '1px solid #ccc', borderTopLeftRadius: '7px', borderTopRightRadius: '7px', bgcolor: '#7575ff' }}>
                    <Typography variant='h6' sx={{ fontSize: '16px', color: '#fff' }}>Add Break</Typography>
                    <Typography variant='h6'><CloseIcon onClick={() => handleClose()} sx={{ cursor: 'pointer', fontSize: '20px', fontWeight: 'bolder', color: '#fff' }} /></Typography>
                </Box>
                <Stack padding='10px'>
                    <Stack direction='row' gap={1} alignItems='center' mt='20px'>
                        <Typography align='center' pt={.4} sx={{ width: '30px', height: '30px', borderRadius: '50%', bgcolor: 'red', color: '#fff' }}>S</Typography>
                        <Autocomplete
                            size='small'
                            disablePortal
                            id="combo-box-demo"
                            value={timeData.sunday.start}
                            options={time}
                            onChange={(e, value) => handleBreakData(value, 'sunday', 'start')}
                            sx={{ width: 180 }}
                            renderInput={(params) => <TextField {...params} label="Start Time" />}
                        />
                        <Autocomplete
                            size='small'
                            disablePortal
                            id="combo-box-demo"
                            value={timeData.sunday.end}
                            options={time}
                            onChange={(e, value) => handleBreakData(value, 'sunday', 'end')}
                            sx={{ width: 180 }}
                            renderInput={(params) => <TextField {...params} label="End Time" />}
                        />
                    </Stack>
                    <Stack direction='row' gap={1} alignItems='center' mt='20px'>
                        <Typography align='center' pt={.4} sx={{ width: '30px', height: '30px', borderRadius: '50%', bgcolor: 'red', color: '#fff' }}>M</Typography>
                        <Autocomplete
                            size='small'
                            disablePortal
                            id="combo-box-demo"
                            value={timeData.monday.start}
                            options={time}
                            onChange={(e, value) => handleBreakData(value, 'monday', 'start')}
                            sx={{ width: 180 }}
                            renderInput={(params) => <TextField {...params} label="Start Time" />}
                        />
                        <Autocomplete
                            size='small'
                            disablePortal
                            id="combo-box-demo"
                            value={timeData.monday.end}
                            options={time}
                            onChange={(e, value) => handleBreakData(value, 'monday', 'end')}
                            sx={{ width: 180 }}
                            renderInput={(params) => <TextField {...params} label="End Time" />}
                        />
                    </Stack>
                    <Stack direction='row' gap={1} alignItems='center' mt='20px'>
                        <Typography align='center' pt={.4} sx={{ width: '30px', height: '30px', borderRadius: '50%', bgcolor: 'red', color: '#fff' }}>T</Typography>
                        <Autocomplete
                            size='small'
                            disablePortal
                            id="combo-box-demo"
                            value={timeData.tuesday.start}
                            options={time}
                            onChange={(e, value) => handleBreakData(value, 'tuesday', 'start')}
                            sx={{ width: 180 }}
                            renderInput={(params) => <TextField {...params} label="Start Time" />}
                        />
                        <Autocomplete
                            size='small'
                            disablePortal
                            id="combo-box-demo"
                            value={timeData.tuesday.end}
                            options={time}
                            onChange={(e, value) => handleBreakData(value, 'tuesday', 'end')}
                            sx={{ width: 180 }}
                            renderInput={(params) => <TextField {...params} label="End Time" />}
                        />
                    </Stack>
                    <Stack direction='row' gap={1} alignItems='center' mt='20px'>
                        <Typography align='center' pt={.4} sx={{ width: '30px', height: '30px', borderRadius: '50%', bgcolor: 'red', color: '#fff' }}>W</Typography>
                        <Autocomplete
                            size='small'
                            disablePortal
                            id="combo-box-demo"
                            value={timeData.wednesday.start}
                            options={time}
                            onChange={(e, value) => handleBreakData(value, 'wednesday', 'start')}
                            sx={{ width: 180 }}
                            renderInput={(params) => <TextField {...params} label="Start Time" />}
                        />
                        <Autocomplete
                            size='small'
                            disablePortal
                            id="combo-box-demo"
                            value={timeData.wednesday.end}
                            options={time}
                            onChange={(e, value) => handleBreakData(value, 'wednesday', 'end')}
                            sx={{ width: 180 }}
                            renderInput={(params) => <TextField {...params} label="End Time" />}
                        />
                    </Stack>
                    <Stack direction='row' gap={1} alignItems='center' mt='20px'>
                        <Typography align='center' pt={.4} sx={{ width: '30px', height: '30px', borderRadius: '50%', bgcolor: 'red', color: '#fff' }}>T</Typography>
                        <Autocomplete
                            size='small'
                            disablePortal
                            id="combo-box-demo"
                            value={timeData.thursday.start}
                            options={time}
                            onChange={(e, value) => handleBreakData(value, 'thursday', 'start')}
                            sx={{ width: 180 }}
                            renderInput={(params) => <TextField {...params} label="Start Time" />}
                        />
                        <Autocomplete
                            size='small'
                            disablePortal
                            id="combo-box-demo"
                            value={timeData.thursday.end}
                            options={time}
                            onChange={(e, value) => handleBreakData(value, 'thursday', 'end')}
                            sx={{ width: 180 }}
                            renderInput={(params) => <TextField {...params} label="End Time" />}
                        />
                    </Stack>
                    <Stack direction='row' gap={1} alignItems='center' mt='20px'>
                        <Typography align='center' pt={.4} sx={{ width: '30px', height: '30px', borderRadius: '50%', bgcolor: 'red', color: '#fff' }}>F</Typography>
                        <Autocomplete
                            size='small'
                            disablePortal
                            id="combo-box-demo"
                            value={timeData.friday.start}
                            options={time}
                            onChange={(e, value) => handleBreakData(value, 'friday', 'start')}
                            sx={{ width: 180 }}
                            renderInput={(params) => <TextField {...params} label="Start Time" />}
                        />
                        <Autocomplete
                            size='small'
                            disablePortal
                            id="combo-box-demo"
                            value={timeData.friday.end}
                            options={time}
                            onChange={(e, value) => handleBreakData(value, 'friday', 'end')}
                            sx={{ width: 180 }}
                            renderInput={(params) => <TextField {...params} label="End Time" />}
                        />
                    </Stack>
                    <Stack direction='row' gap={1} alignItems='center' mt='20px'>
                        <Typography align='center' pt={.4} sx={{ width: '30px', height: '30px', borderRadius: '50%', bgcolor: 'red', color: '#fff' }}>S</Typography>
                        <Autocomplete
                            size='small'
                            disablePortal
                            id="combo-box-demo"
                            value={timeData.saturday.start}
                            options={time}
                            onChange={(e, value) => handleBreakData(value, 'saturday', 'start')}
                            sx={{ width: 180 }}
                            renderInput={(params) => <TextField {...params} label="Start Time" />}
                        />
                        <Autocomplete
                            size='small'
                            disablePortal
                            id="combo-box-demo"
                            value={timeData.saturday.end}
                            options={time}
                            onChange={(e, value) => handleBreakData(value, 'saturday', 'end')}
                            sx={{ width: 180 }}
                            renderInput={(params) => <TextField {...params} label="End Time" />}
                        />
                    </Stack>
                </Stack>
                <hr />
                <Button variant='contained' sx={{ float: 'right', margin: '0px 20px 10px', bgcolor: '#7575ff' }} onClick={addBreakData}>Save</Button>
            </Box>
        </Modal>
    )
}