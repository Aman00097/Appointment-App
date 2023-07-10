import React, { useContext, useEffect, useState } from 'react'
import { Box, Button, Divider, Link, Stack, TextField, Typography } from '@mui/material'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import { Context } from '../App';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';


const columns = [
  { id: 'id', label: 'ID', minWidth: 50 },
  { id: 'name', label: 'Name', minWidth: 100 },
  {
    id: 'gender',
    label: 'Gender',
    minWidth: 100,
    align: 'left',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'bloodGroup',
    label: 'Blood Group',
    minWidth: 50,
    align: 'left',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'symptoms',
    label: 'Symptoms',
    minWidth: 150,
    align: 'left',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'number',
    label: 'Moblie No.',
    minWidth: 150,
    align: 'left',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'email',
    label: 'Email',
    minWidth: 100,
    align: 'left',
    format: (value) => value.toLocaleString('en-US'),
  },
];


const Patient = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const { addPatient, setAddPatient } = useContext(Context);

  const [searchValue, setSearchValue] = useState('');
  const [searchAddPatient, setSearchAddPatient] = useState(addPatient);

  const [open, setOpen] = useState(false);
  const showAddPatient = () => {
    setOpen(true);
    setCurrentPatientDetail('');
  }

  useEffect(() => {
    if (searchValue === '' || searchValue === null) {
      setSearchAddPatient(addPatient);
    } else {
      setSearchAddPatient(addPatient.filter((ele) => ele.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        ele.gender.toLowerCase().includes(searchValue.toLowerCase()) ||
        ele.bloodGroup.toLowerCase().includes(searchValue.toLowerCase()) ||
        ele.email.toLowerCase().includes(searchValue.toLowerCase()) ||
        ele.number.toLowerCase().includes(searchValue.toLowerCase()) ||
        ele.symptom.toLowerCase().includes(searchValue.toLowerCase())));
    }
  }, [addPatient, searchValue]);


  const [openPatientDetail, setOpenPatientDetail] = useState(false);
  const [currentPatientDetail, setCurrentPatientDetail] = useState();
  const showPatientData = (id) => {
    setOpenPatientDetail(true);
    setCurrentPatientDetail(searchAddPatient.find((ele) => ele.id === id));
  }

  return (
    <>
      <Box sx={{ padding: { xs: '20px 10px', sm: '20px' }, display: 'flex', justifyContent: 'center', flexDirection: 'column', margin: { xs: 'auto', sm: 'none' } }}>
        <Typography variant='h6' sx={{ fontSize: '16px', fontWeight: 'bold' }}>PATIENT LIST</Typography>
        <Typography variant='h6' sx={{
          background: '#7575ff',
          borderRadius: '5px', width: '52px', height: '4px'
        }}></Typography>

        <Box sx={{ marginTop: '20px', display: 'flex', justifyContent: { sm: 'end', xs: 'space-between' }, alignItems: 'center' }}>
          <Stack direction='row' alignItems='center' gap={1} border={1} bgcolor='#fff' padding='5px 10px' borderRadius={1} mr={1}>
            <TextField size='small'
              InputProps={{ disableUnderline: true }}
              placeholder='Search'
              variant='standard'
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}></TextField>
            <CloseIcon sx={{ fontSize: '18px', cursor: 'pointer' }} onClick={() => setSearchValue('')} />
            <Divider variant='fullWidth' orientation="vertical" color='black' flexItem />
            <SearchIcon sx={{ fontSize: '18px', cursor: 'pointer' }} />
          </Stack>
          <Button variant='contained' sx={{ height: '40px', bgcolor: '#7575ff', fontSize: '12px', paddingY: { xs: '0', sm: '6px' }, "::before": { xs: { content: '"+"', fontSize: '20px' }, sm: { content: '"ADD NEW"', fontSize: '12px' } } }} onClick={showAddPatient}>&nbsp;PATIENT</Button>
        </Box>

        <Box sx={{ maxWidth: { xs: '95vw', sm: '100%' }, margin: ' 30px auto' }}>
          {
            addPatient.length < 1 ? <Typography variant='h6'>Enter Patient Details</Typography> : <Paper sx={{ width: '100%', overflow: 'hidden' }}>
              <TableContainer sx={{ maxHeight: 440 }}>
                <Table size='small' stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{ minWidth: column.minWidth, fontWeight: 'bold', borderBottom: '2px solid #ccc' }}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                      searchAddPatient.map((ele, index) => {
                        return (
                          <TableRow key={index} className='tableRow' sx={{ cursor: 'pointer', ":hover": { bgcolor: '#f1f1f1' } }} onDoubleClick={() => showPatientData(ele.id)}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell sx={{ color: '#7575ff', ":hover": { textDecoration: 'underline' } }} onClick={() => showPatientData(ele.id)}>{ele.name}</TableCell>
                            <TableCell>{ele.gender}</TableCell>
                            <TableCell>{ele.bloodGroup}</TableCell>
                            <TableCell>{ele.symptom}</TableCell>
                            <TableCell>{ele.number}</TableCell>
                            <TableCell>{ele.email}</TableCell>
                          </TableRow>
                        )
                      })
                    }
                  </TableBody>
                </Table>
              </TableContainer>
              {/* <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            /> */}
            </Paper>
          }
        </Box>
      </Box>
      <AddPatient open={open} setOpen={setOpen} />
      <ShowPatientDetails open={open} setOpen={setOpen} openPatientDetail={openPatientDetail} setOpenPatientDetail={setOpenPatientDetail} currentPatientDetail={currentPatientDetail} addPatient={addPatient} setAddPatient={setAddPatient} />
    </>
  )
}

export default Patient;



export const AddPatient = ({ open, setOpen, currentPatientDetail }) => {
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

  const { patient, setPatient, recentActivity, setRecentActivity } = useContext(Context);
  const { addPatient, setAddPatient } = useContext(Context);

  const handleClose = () => {
    setOpen(false);
    setPatient({ name: '', gender: '', dob: '', bloodGroup: '', number: '', email: '', symptom: '' });
  }

  useEffect(() => {
    if (currentPatientDetail) {
      setPatient({ ...currentPatientDetail });
    }
  }, [currentPatientDetail]);

  const addPatientHandling = (e, input) => {
    if (!currentPatientDetail) {
      const id = new Date().getTime();
      setPatient({ ...patient, id: id, [input]: e.target.value })
    } else {
      setPatient({ ...patient, [input]: e.target.value })
    }
  }

  const addedPatient = () => {
    if (!Object.values(patient).includes('')) {
      if (currentPatientDetail) {
        let index = addPatient.indexOf(currentPatientDetail)
        addPatient[index] = { ...patient }
        setRecentActivity([{ title: 'Updated Patient Details', activity: `of ID ${patient.id}`, time: new Date().toLocaleString() }, ...recentActivity])
      } else {
        setAddPatient([...addPatient, patient]);
        setRecentActivity([{ title: 'Added New Patient', activity: patient.name, time: new Date().toLocaleString() }, ...recentActivity])
      }
      handleClose();
    } else {
      alert('Please fill all the fields');
    }
  }

  return (

    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '10px 20px 0px', borderBottom: '1px solid #ccc', borderTopLeftRadius: '7px', borderTopRightRadius: '7px', bgcolor: '#7575ff' }}>
          <Typography variant='h6' sx={{ fontSize: '16px', color: '#fff' }}>{!currentPatientDetail ? 'New Patient' : 'Edit Patient'}</Typography>
          <Typography variant='h6' ><CloseIcon onClick={() => handleClose()} sx={{ cursor: 'pointer', fontSize: '20px', fontWeight: 'bolder', color: '#fff' }} /></Typography>
        </Box>

        <Box sx={{ padding: '20px 20px 10px' }}>
          <Box sx={{ mb: '10px' }}>
            <TextField id="outlined-basic" label="Patient Name" variant="outlined" size='small' fullWidth value={patient.name} onChange={(e) => addPatientHandling(e, 'name')} />
          </Box>
          <Box marginBottom='10px'>
            <Typography variant='h6' fontSize='14px' required>Gender</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', fontSize: '14px' }}>
              <input type="radio" checked={currentPatientDetail && currentPatientDetail.gender === 'male' ? 'checked' : null} name='gender' value='Male' onChange={(e) => addPatientHandling(e, 'gender')} />Male
              <input type="radio" checked={currentPatientDetail && currentPatientDetail.gender === 'female' ? 'checked' : null} name='gender' value='Female' style={{ marginLeft: '20px' }} onChange={(e) => addPatientHandling(e, 'gender')} />Female
              <input type="radio" checked={currentPatientDetail && currentPatientDetail.gender === 'other' ? 'checked' : null} name='gender' value='Other' style={{ marginLeft: '20px' }} onChange={(e) => addPatientHandling(e, 'gender')} />Other
            </Box>
          </Box>
          <Box mb='20px'>
            <Typography variant='h6' fontSize='14px' mr='20px' required>DOB</Typography>
            <input type="date" style={{ width: '200px', height: '30px' }} value={patient.dob} onChange={(e) => addPatientHandling(e, 'dob')} />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: { sm: 'end', xs: 'space-between' }, alignItems: 'center', marginBottom: '10px' }}>
            <FormControl sx={{ width: 177, marginRight: '10px' }}>
              <InputLabel id="demo-simple-select-helper-label" sx={{ marginTop: '-8px', color: '#a5a5a5', fontSize: '14px' }}>Blood Group</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                label="Blood Group"
                sx={{ height: '40px', bgcolor: '#fff' }}
                value={patient.bloodGroup}
                onChange={(e) => addPatientHandling(e, 'bloodGroup')}
              >
                <MenuItem value={'AB+'}>AB+</MenuItem>
                <MenuItem value={'A+'}>A+</MenuItem>
                <MenuItem value={'B+'}>B+</MenuItem>
                <MenuItem value={'O+'}>O+</MenuItem>
                <MenuItem value={'AB-'}>AB</MenuItem>
                <MenuItem value={'A-'}>A-</MenuItem>
                <MenuItem value={'B-'}>B-</MenuItem>
                <MenuItem value={'O-'}>O-</MenuItem>
              </Select>
            </FormControl>
            <TextField id="outlined-basic" label="Mobile Number" variant="outlined" size='small' value={patient.number} onChange={(e) => addPatientHandling(e, 'number')} />
          </Box>
          <Box marginBottom='10px'>
            <TextField id="outlined-basic" label="Email" variant="outlined" size='small' fullWidth value={patient.email} onChange={(e) => addPatientHandling(e, 'email')} />
          </Box>
          <Box>
            <TextField id="outlined-basic" label="Symptoms" variant="outlined" size='small' fullWidth value={patient.symptom} onChange={(e) => addPatientHandling(e, 'symptom')} />
          </Box>
        </Box>
        <hr />
        <Button variant='contained' sx={{ float: 'right', margin: '0px 20px 10px', bgcolor: '#7575ff' }} onClick={addedPatient}>{!currentPatientDetail ? 'Save' : 'Update'}</Button>
      </Box>
    </Modal>
  );
}

export const ShowPatientDetails = ({ openPatientDetail, setOpenPatientDetail, open, setOpen, currentPatientDetail, addPatient, setAddPatient }) => {
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

  const { setPatient, events } = useContext(Context);

  const handleClose = () => {
    setOpenPatientDetail(false);
    if (currentPatientDetail) {
      setPatient({ name: '', gender: '', dob: '', bloodGroup: '', number: '', email: '', symptom: '' });
    }
  }

  const deletePatient = (id) => {
    setAddPatient(addPatient.filter((ele) => ele.id !== id));
    handleClose();
  }

  const editPatient = () => {
    setOpen(true);
    handleClose();
    setPatient({ ...currentPatientDetail });
  }

  const currentPatientAppointment = currentPatientDetail && events.filter(ele => ele.patientName === currentPatientDetail.name)

  const borderColor = ['#df5286', '#1aaa55', '#865fcf', '#fce200', '#ea7a57', '#00bdae'];

  let color = 0;
  const colorFunc = () => {
    if (color === 6) return color = 0;
    return color++;
  }

  return (
    <>
      <Modal
        open={openPatientDetail}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '10px 20px 0px', borderBottom: '1px solid #ccc', borderTopLeftRadius: '7px', borderTopRightRadius: '7px', bgcolor: '#7575ff' }}>
            <Typography variant='h6' sx={{ fontSize: '16px', color: '#fff' }}>Patient Details</Typography>
            <Typography variant='h6' ><CloseIcon onClick={() => handleClose()} sx={{ cursor: 'pointer', fontSize: '20px', fontWeight: 'bolder', color: '#fff' }} /></Typography>
          </Box>

          {
            currentPatientDetail && <Stack direction='column' gap={2} sx={{ padding: '20px', justifyContent: 'space-between', height: '350px', overflowY: 'auto' }}>
              <Stack direction='row' gap={1} justifyContent='space-between'>
                <Typography variant='p' sx={{ width: '50%', fontWeight: 'bold', fontSize: 'small' }}>Patient ID</Typography>
                <Typography variant='p' sx={{ width: '55%', fontSize: 'small', float: 'left' }}>{currentPatientDetail.id}</Typography>
              </Stack>
              <Stack direction='row' gap={1} justifyContent='space-between'>
                <Typography variant='p' sx={{ width: '50%', fontWeight: 'bold', fontSize: 'small' }}>Patient Name</Typography>
                <Typography variant='p' sx={{ width: '50%', fontSize: 'small', float: 'left' }}>{currentPatientDetail.name}</Typography>
              </Stack>
              <Stack direction='row' gap={1} justifyContent='space-between'>
                <Typography variant='p' sx={{ width: '50%', fontWeight: 'bold', fontSize: 'small' }}>Gender</Typography>
                <Typography variant='p' sx={{ width: '50%', fontSize: 'small', float: 'left' }}>{currentPatientDetail.gender}</Typography>
              </Stack>
              <Stack direction='row' gap={1} justifyContent='space-between'>
                <Typography variant='p' sx={{ width: '50%', fontWeight: 'bold', fontSize: 'small' }}>DOB</Typography>
                <Typography variant='p' sx={{ width: '50%', fontSize: 'small', float: 'left' }}>{currentPatientDetail.dob}</Typography>
              </Stack>
              <Stack direction='row' gap={1} justifyContent='space-between'>
                <Typography variant='p' sx={{ width: '50%', fontWeight: 'bold', fontSize: 'small' }}>Blood Group</Typography>
                <Typography variant='p' sx={{ width: '50%', fontSize: 'small', float: 'left' }}>{currentPatientDetail.bloodGroup}</Typography>
              </Stack>
              <Stack direction='row' gap={1} justifyContent='space-between'>
                <Typography variant='p' sx={{ width: '50%', fontWeight: 'bold', fontSize: 'small' }}>Mobile Number</Typography>
                <Typography variant='p' sx={{ width: '50%', fontSize: 'small', float: 'left' }}>{currentPatientDetail.number}</Typography>
              </Stack>
              <Stack direction='row' gap={1} justifyContent='space-between'>
                <Typography variant='p' sx={{ width: '50%', fontWeight: 'bold', fontSize: 'small' }}>Email</Typography>
                <Typography variant='p' sx={{ width: '50%', fontSize: 'small', float: 'left' }}>{currentPatientDetail.email}</Typography>
              </Stack>
              <Stack direction='row' gap={1} justifyContent='space-between'>
                <Typography variant='p' sx={{ width: '50%', fontWeight: 'bold', fontSize: 'small' }}>Symptoms</Typography>
                <Typography variant='p' sx={{ width: '50%', fontSize: 'small', float: 'left' }}>{currentPatientDetail.symptom}</Typography>
              </Stack>
              <Stack>
                <Typography fontSize='14px' color='#7575ff' fontWeight='bold'>{currentPatientAppointment.length ? 'Appointment History' : ''}</Typography>
                {
                  currentPatientAppointment.map(ele => {
                    const appointmentTime = `${new Date(ele.start).toString().slice(4, 10)}, ${new Date(ele.start).toString().slice(16, 21)} ${new Date(ele.start).getHours() > 11 ? 'PM' : 'AM'} - ${new Date(ele.end).toString().slice(16, 21)} ${new Date(ele.end).getHours() > 11 ? 'PM' : 'AM'}`;

                    return (
                      <Box sx={{ marginY: '10px', ":hover": { cursor: 'default', bgcolor: '#f1f1f1' } }}>
                        <Box sx={{ borderLeft: `2px solid ${borderColor[colorFunc()]}`, padding: '5px 10px' }}>
                          <Typography fontSize='14px' fontWeight='bold'>{appointmentTime}</Typography>
                          <Typography fontSize='14px'>Appointment with Dr. {ele.doctorName}</Typography>
                        </Box>
                      </Box>
                    )
                  })
                }
              </Stack>
            </Stack>
          }
          <hr />
          <Button variant='contained' sx={{ float: 'right', margin: '0px 20px 10px', bgcolor: '#7575ff' }} onClick={editPatient}>Edit</Button>
          <Button variant='outlined' sx={{ float: 'right', margin: '0px 0px 10px', color: '#000', border: '1px solid #ccc', ":hover": { bgcolor: "#eee", border: '1px solid #000' } }} onClick={() => deletePatient(currentPatientDetail.id)}>Delete</Button>
        </Box>
      </Modal>
      <AddPatient open={open} setOpen={setOpen} currentPatientDetail={currentPatientDetail} />
    </>
  )
}