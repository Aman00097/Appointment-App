import React, { useContext } from 'react'
import { Context } from '../App';
import { Box, Stack, Typography } from '@mui/material'

import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const Preference = () => {
  const { preference, setPreference } = useContext(Context);

  const preferenceHandling = (e, input) => {
    setPreference({ ...preference, [input]: e.target.value });
  }

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant='h6' sx={{ fontSize: '16px', fontWeight: 'bold' }}>PREFERENCE</Typography>
      <Typography variant='h6' sx={{
        background: '#7575ff',
        borderRadius: '5px', width: '52px', height: '4px'
      }}></Typography>

      <Stack sx={{ marginTop: '25px' }}>
        <FormControl sx={{ width: 300, marginBottom: '15px' }}>
          <Typography variant='p' fontSize='12px' marginBottom='3px' fontWeight='bold'>Default View</Typography>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={preference.defaultView}
            onChange={(e) => preferenceHandling(e, 'defaultView')}
            sx={{ height: '30px', bgcolor: '#fff' }}
          >
            <MenuItem value={'Daily'}>Daily</MenuItem>
            <MenuItem value={'Weekly'}>Weekly</MenuItem>
            <MenuItem value={'Monthly'}>Monthly</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ width: 300, marginBottom: '15px' }}>
          <Typography variant='p' fontSize='12px' marginBottom='3px' fontWeight='bold'>Calender Start Time</Typography>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={preference.startTime}
            onChange={(e) => preferenceHandling(e, 'startTime')}
            sx={{ height: '30px', bgcolor: '#fff' }}
          >
            <MenuItem value={'6:00 AM'}>6:00 AM</MenuItem>
            <MenuItem value={'7:00 AM'}>7:00 AM</MenuItem>
            <MenuItem value={'8:00 AM'}>8:00 AM</MenuItem>
            <MenuItem value={'9:00 AM'}>9:00 AM</MenuItem>
            <MenuItem value={'10:00 AM'}>10:00 AM</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ width: 300, marginBottom: '15px' }}>
          <Typography variant='p' fontSize='12px' marginBottom='3px' fontWeight='bold'>Calender End Time</Typography>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={preference.endTime}
            onChange={(e) => preferenceHandling(e, 'endTime')}
            sx={{ height: '30px', bgcolor: '#fff' }}
          >
            <MenuItem value={'6:00 PM'}>6:00 PM</MenuItem>
            <MenuItem value={'7:00 PM'}>7:00 PM</MenuItem>
            <MenuItem value={'8:00 PM'}>8:00 PM</MenuItem>
            <MenuItem value={'9:00 PM'}>9:00 PM</MenuItem>
            <MenuItem value={'10:00 PM'}>10:00 PM</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ width: 300, marginBottom: '15px' }}>
          <Typography variant='p' fontSize='12px' marginBottom='3px' fontWeight='bold'>Slot Duration</Typography>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={preference.slotDuration}
            onChange={(e) => preferenceHandling(e, 'slotDuration')}
            sx={{ height: '30px', bgcolor: '#fff' }}
          >
            <MenuItem value={'10 mins'}>10 mins</MenuItem>
            <MenuItem value={'20 mins'}>20 mins</MenuItem>
            <MenuItem value={'30 mins'}>30 mins</MenuItem>
            <MenuItem value={'60 mins'}>60 mins</MenuItem>
            <MenuItem value={'120 mins'}>120 mins</MenuItem>
          </Select>
        </FormControl>

        {/* <FormControl sx={{ width: 300, marginBottom: '15px' }}>
          <Typography variant='p' fontSize='12px' marginBottom='3px' fontWeight='bold'>Booking Color View</Typography>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={preference.bookingColor}
            onChange={(e) => preferenceHandling(e, 'bookingColor')}
            sx={{ height: '30px', bgcolor: '#fff' }}
          >
            <MenuItem value={'Doctors Colors'}>Doctors Colors</MenuItem>
            <MenuItem value={'Department Colors'}>Department Colors</MenuItem>
          </Select>
        </FormControl> */}

        <FormControl sx={{ width: 300, marginBottom: '15px' }}>
          <Typography variant='p' fontSize='12px' marginBottom='3px' fontWeight='bold'>First Day of the Week</Typography>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={preference.firstDayOfWeek}
            onChange={(e) => preferenceHandling(e, 'firstDayOfWeek')}
            sx={{ height: '30px', bgcolor: '#fff' }}
          >
            <MenuItem value={'Sunday'}>Sunday</MenuItem>
            <MenuItem value={'Monday'}>Monday</MenuItem>
            <MenuItem value={'Tuesday'}>Tuesday</MenuItem>
            <MenuItem value={'Wednesday'}>Wednesday</MenuItem>
            <MenuItem value={'Thursday'}>Thursday</MenuItem>
            <MenuItem value={'Friday'}>Friday</MenuItem>
            <MenuItem value={'Saturday'}>Saturday</MenuItem>
          </Select>
        </FormControl>
      </Stack>
    </Box>
  )
}

export default Preference
