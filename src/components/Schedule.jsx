import React, { useContext, useEffect } from 'react'
import MyCalendar from './MyCalendar';
import { Box, Stack, Typography } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Context } from '../App';


const Schedule = () => {
    const { addDoctor, events } = useContext(Context);
    const [eventFilter, setEventFilter] = React.useState('All');
    const [waitingList, setWaitingList] = React.useState([]);

    waitingList.sort((a, b) => new Date(a.start) - new Date(b.start))

    const handleChange = (e) => {
        setEventFilter(e.target.value);
    };

    useEffect(() => {
        setWaitingList(events.filter(ele => new Date().toLocaleString() < new Date(ele.start).toLocaleString()))
    }, [events])


    return (
        <Box sx={{ width: '100%', display: { xs: 'flex', sm: 'flex' }, justifyContent: 'center', flexDirection: { xs: 'column', sm: 'row' }, marginY: '30px' }}>
            <Box sx={{ width: { xs: '100%', sm: '70%' }, boxShadow: '0 0 10px #ccc', marginBottom: { xs: '30px', sm: '0' }, marginRight: { xs: '0px', sm: '20px' }, padding: '5px', bgcolor: '#fff', borderRadius: '5px' }}>
                <MyCalendar eventFilter={eventFilter} />
            </Box>
            <Stack>
                {
                    addDoctor && <FormControl fullWidth sx={{ width: { xs: '100%', sm: '230px' }, paddingX: { xs: '10px', sm: '0px' }, mb: '10px' }}>
                        <InputLabel id="demo-simple-select-helper-label" sx={{ marginTop: '-8px', color: '#a5a5a5', fontSize: '14px' }}>Choose Specialist</InputLabel>
                        <Select
                            fullWidth
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            value={eventFilter}
                            label="Choose Specialist"
                            onChange={handleChange}
                            sx={{ height: '35px', bgcolor: '#fff' }}
                        >
                            <MenuItem value='All' >
                                <Typography fontSize='14px'>All</Typography>
                            </MenuItem>
                            {
                                addDoctor.map((ele, index) => {
                                    return (
                                        <MenuItem key={index} value={ele.name} >
                                            <Typography fontSize='14px'>Dr. {ele.name}</Typography>
                                        </MenuItem>
                                    )
                                })
                            }
                        </Select>
                        {/* <FormHelperText>With label + helper text</FormHelperText> */}
                    </FormControl>
                }

                <Stack>
                    <Typography variant='h6' margin='auto' fontWeight='bold' marginY='10px'>Waiting List</Typography>
                    <Stack className='waiting' sx={{ maxHeight: '340px', overflowY: 'scroll', padding: '5px 10px' }}>
                        {
                            waitingList.map((ele, index) => {
                                const appointmentTime = `${new Date(ele.start).toString().slice(4, 10)}, ${new Date(ele.start).toString().slice(16, 21)} ${new Date(ele.start).getHours() > 11 ? 'PM' : 'AM'} - ${new Date(ele.end).toString().slice(16, 21)} ${new Date(ele.end).getHours() > 11 ? 'PM' : 'AM'}`;

                                return (<Stack key={index} sx={{ bgcolor: '#fff5f5', padding: '5px 10px', marginY: '5px', border: '1px solid #ccc', borderRadius: '7px' }}>
                                    <Typography fontSize='14px' fontWeight='bold'>{ele.patientName}</Typography>
                                    <Typography fontSize='12px'>{appointmentTime}</Typography>
                                    <Typography fontSize='12px'>Appointment with: Dr. {ele.doctorName}</Typography>
                                </Stack>)
                            })
                        }
                    </Stack>
                </Stack>
            </Stack>
        </Box>
    )
}

export default Schedule;
