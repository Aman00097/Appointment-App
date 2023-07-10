import React, { useContext, useEffect, useState } from 'react'
import { Box, Button, Typography, TextField } from '@mui/material'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import { Context } from '../App';

const Doctor = () => {
  const { addDoctor } = useContext(Context);
  const navTo = useNavigate();

  const [specialist, setSpecialist] = React.useState('All');
  const [data, setData] = React.useState([...addDoctor]);

  const specialistOption = (e) => {
    setSpecialist(e.target.value);
  };

  useEffect(() => {
    if (specialist === 'All') {
      setData([...addDoctor]);
    } else {
      setData(addDoctor.filter((ele) => ele.department === specialist));
    }
  }, [specialist, addDoctor]);

  const [open, setOpen] = React.useState(false);

  const showAddDoctor = () => setOpen(true);

  return (
    <>
      <Box sx={{ padding: '20px' }}>
        <Typography variant='h6' sx={{ fontSize: '16px', fontWeight: 'bold' }}>DOCTORS LIST</Typography>
        <Typography variant='h6' sx={{
          background: '#7575ff',
          borderRadius: '5px', width: '52px', height: '4px'
        }}></Typography>

        <Box sx={{ marginTop: '20px', display: 'flex', justifyContent: { sm: 'end', xs: 'space-between' }, alignItems: 'center' }}>
          <FormControl sx={{ width: 200, marginRight: '10px' }}>
            <InputLabel id="demo-simple-select-helper-label" sx={{ marginTop: '-8px', color: '#a5a5a5', fontSize: '14px' }}>Specialist</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={specialist}
              label="Specialist"
              onChange={specialistOption}
              sx={{ height: '35px', bgcolor: '#fff' }}
            >
              <MenuItem value="All">
                <em>All</em>
              </MenuItem>
              <MenuItem value={'General Medicine'} >General Medicine</MenuItem>
              <MenuItem value={'Neurology'}>Neurology</MenuItem>
              <MenuItem value={'Dermatology'}>Dermatology</MenuItem>
              <MenuItem value={'Orthopedics'}>Orthopedics</MenuItem>
              <MenuItem value={'Diabetology'}>Diabetology</MenuItem>
              <MenuItem value={'Cardiology'}>Cardiology</MenuItem>
            </Select>
            {/* <FormHelperText>With label + helper text</FormHelperText> */}
          </FormControl>

          <Button variant='contained' sx={{ bgcolor: '#7575ff', fontSize: '12px', paddingY: { xs: '0', sm: '6px' }, "::before": { xs: { content: '"+"', fontSize: '20px' }, sm: { content: '"ADD NEW"', fontSize: '12px' } } }} onClick={showAddDoctor}>&nbsp;DOCTOR</Button>
        </Box>

        <Box sx={{ marginY: '30px', display: 'flex', alignItems: 'center', justifyContent: { xs: 'space-evenly', sm: 'space-between' }, flexWrap: 'wrap' }}>

          {
            !addDoctor.length ? <Typography variant='h6' margin='auto'>Add a New Doctor</Typography> : data.map((ele, index) => {
              return (
                <Box key={index} sx={{ bgcolor: '#fff', boxShadow: '0 0 5px #ccc', display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', width: { xs: '100%', sm: '49%' }, padding: '10px', marginBottom: '20px', ":hover": { cursor: 'pointer', boxShadow: '0 0 5px #7575ff' } }} onClick={() => navTo(ele.link)}>
                  <img src={ele.image} alt="" style={{ width: '90px', height: '90px', borderRadius: '50%', marginRight: '20px' }} />
                  <Box width='60%'>
                    <Typography fontSize='16px' fontWeight='bold'>Dr. {ele.name}</Typography>
                    <Typography fontSize='12px' >{ele.education}</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '5px' }}>
                      <Box sx={{ paddingRight: '10px', borderRight: '1px solid ' }}>
                        <Typography fontSize='12px' color='#717171'>Designation</Typography>
                        <Typography fontSize='12px'>{ele.designation}</Typography>
                      </Box>
                      <Box sx={{ paddingLeft: '10px' }}>
                        <Typography fontSize='12px' color='#717171'>Experience</Typography>
                        <Typography fontSize='12px'>{ele.experience}</Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              )
            })
          }
        </Box>
      </Box>
      <AddDoctor open={open} setOpen={setOpen} />
    </>
  )
}

export default Doctor



export const AddDoctor = ({ open, setOpen, doctorDetail }) => {
  const navTo = useNavigate();

  const { addDoctor, setAddDoctor, recentActivity, setRecentActivity } = useContext(Context);

  const [doctor, setDoctor] = useState({ name: '', gender: '', email: '', number: '', education: '', department: '', experience: '', designation: '', time: '', image: '', link: '', workTime: '' });

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

  const handleClose = () => {
    setOpen(false);
    setDoctor({ name: '', gender: '', email: '', number: '', education: '', department: '', experience: '', designation: '', time: '', image: '', workTime: '' });
  }

  useEffect(() => {
    if (doctorDetail) {
      setDoctor({ ...doctorDetail });
    }
  }, [doctorDetail]);


  const chooseImg = () => {
    let fileImg = document.querySelector("#fileImg");
    fileImg.click();
  }

  const loadImg = (e) => {
    let image = e.target.files[0];
    setDoctor({ ...doctor, image: URL.createObjectURL(image) });
  }

  const addDoctorHandling = (e, input) => {
    if (!doctorDetail) {
      const id = new Date().getTime();
      setDoctor({ ...doctor, id: id, [input]: e.target.value, link: `/doctor/detail/${id}` });
    } else {
      console.log(e.target.value);
      setDoctor({ ...doctor, [input]: e.target.value })
    }
  }

  const addedDoctor = () => {
    // if (!Object.values(doctor).includes('')) {
    if (doctor.name !== '' && doctor.gender !== '' && doctor.email !== '' && doctor.number !== '' && doctor.education !== '' && doctor.department !== '' && doctor.experience !== '' && doctor.time !== '' && doctor.image !== '' && doctor.designation !== '') {
      if (doctorDetail) {
        let index = addDoctor.indexOf(doctorDetail)
        addDoctor[index] = { ...doctor };
        setRecentActivity([{ title: 'Updated Doctor Details', activity: `of ID ${doctor.id}`, time: new Date().toLocaleString() }, ...recentActivity])
        navTo(`/doctor/detail/${doctorDetail.id}`);
      } else {
        setAddDoctor([...addDoctor, doctor]);
        setRecentActivity([{ title: 'Added New Doctor', activity: doctor.name, time: new Date().toLocaleString() }, ...recentActivity])
      }
      handleClose();
      setDoctor({ name: '', gender: '', email: '', number: '', education: '', department: '', experience: '', designation: '', time: '', image: '' });
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
          <Typography variant='h6' sx={{ fontSize: '16px', color: '#fff' }}>{!doctorDetail ? 'Add Doctor' : 'Edit Doctor'}</Typography>
          <Typography variant='h6' ><CloseIcon onClick={() => handleClose()} sx={{ cursor: 'pointer', fontSize: '20px', fontWeight: 'bolder', color: '#fff' }} /></Typography>
        </Box>

        <Box sx={{ padding: '20px 20px 10px 20px', width: '100%' }}>
          <Box sx={{ margin: 'auto', marginBottom: '10px' }}>
            <TextField id="outlined-basic" label="Doctor Name" variant="outlined" size='small' value={doctor.name} sx={{ width: '100%' }} onChange={(e) => addDoctorHandling(e, 'name')}
            />
          </Box>
          <Box sx={{ fontSize: '14px' }}>
            <Typography variant='h6' fontSize='14px' required>Gender</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <input type="radio" checked={doctor.gender === 'Male' ? 'checked' : null} name='gender' value='male' onChange={(e) => addDoctorHandling(e, 'gender')} />Male
              <input type="radio" checked={doctor.gender === "Female" ? 'checked' : null} name='gender' value='female' onChange={(e) => addDoctorHandling(e, 'gender')} style={{ marginLeft: '20px' }} />Female
              <input type="radio" checked={doctor.gender === "Other" ? 'checked' : null} name='gender' value='other' onChange={(e) => addDoctorHandling(e, 'gender')} style={{ marginLeft: '20px' }} />Other
            </Box>
            <Box>
              <TextField type='email' size='small' autoFocus id="name" label="Email Address" fullWidth sx={{ marginY: '15px' }} value={doctor.email} onChange={(e) => addDoctorHandling(e, 'email')} />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
              <TextField type='tel' size='small' autoFocus id="name" label="Moblie Number" sx={{ marginY: '5px', width: '49%' }} value={doctor.number} onChange={(e) => addDoctorHandling(e, 'number')} />
              <TextField
                size='small' autoFocus id="name" label="Education" type="phone" sx={{ marginY: '5px', width: '49%' }} value={doctor.education} onChange={(e) => addDoctorHandling(e, 'education')} />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>

              <Box sx={{ display: 'flex', justifyContent: { sm: 'end', xs: 'space-between' }, alignItems: 'center' }}>
                <FormControl sx={{ width: 177, marginRight: '10px' }}>
                  <InputLabel id="demo-simple-select-helper-label" sx={{ marginTop: '-8px', color: '#a5a5a5', fontSize: '14px' }}>Department</InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    label="Specialist"
                    value={doctor.department}
                    onChange={(e) => addDoctorHandling(e, 'department')}
                    sx={{ height: '35px', bgcolor: '#fff' }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={'General Medicine'} >General Medicine</MenuItem>
                    <MenuItem value={'Neurology'}>Neurology</MenuItem>
                    <MenuItem value={'Dermatology'}>Dermatology</MenuItem>
                    <MenuItem value={'Orthopedics'}>Orthopedics</MenuItem>
                    <MenuItem value={'Diabetology'}>Diabetology</MenuItem>
                    <MenuItem value={'Cardiology'}>Cardiology</MenuItem>
                  </Select>
                  {/* <FormHelperText>With label + helper text</FormHelperText> */}
                </FormControl>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: { sm: 'end', xs: 'space-between' }, alignItems: 'center' }}>
                <FormControl sx={{ width: 177, marginLeft: '-10px' }}>
                  <InputLabel id="demo-simple-select-helper-label" sx={{ marginTop: '-8px', color: '#a5a5a5', fontSize: '14px' }}>Experience</InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    label="Specialist"
                    value={doctor.experience}
                    onChange={(e) => addDoctorHandling(e, 'experience')}
                    sx={{ height: '35px', bgcolor: '#fff' }}
                  >
                    <MenuItem value={'1+ years '} > 1+ years</MenuItem>
                    <MenuItem value={'2+ years'}>2+ years</MenuItem>
                    <MenuItem value={'5+ years'}>5+ years</MenuItem>
                    <MenuItem value={'10+ years'}>10+ years</MenuItem>
                    <MenuItem value={'15+ years'}>15+ years</MenuItem>
                    <MenuItem value={'20+ years'}>20+ years</MenuItem>
                  </Select>
                </FormControl>
              </Box>

            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <TextField
                size='small' autoFocus id="name" label="Designation" type="phone" sx={{ marginY: '5px', width: '49%' }} value={doctor.designation} onChange={(e) => addDoctorHandling(e, 'designation')} />
              <Box sx={{ display: 'flex', justifyContent: { sm: 'end', xs: 'space-between' }, alignItems: 'center' }}>
                <FormControl sx={{ width: 177, marginLeft: '10px' }}>
                  <InputLabel id="demo-simple-select-helper-label" sx={{ marginTop: '-8px', color: '#a5a5a5', fontSize: '14px' }}>Duty Timing</InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    label="Specialist"
                    value={doctor.time}
                    onChange={(e) => addDoctorHandling(e, 'time')}
                    sx={{ height: '40px', bgcolor: '#fff' }}
                  >
                    <MenuItem value={'12:00 AM - 09:00 AM'}>12:00 AM - 09:00 AM</MenuItem>
                    <MenuItem value={'10:00 AM - 07:00 PM'}>10:00 AM - 07:00 PM</MenuItem>
                    <MenuItem value={'06:00 PM - 03:00 AM'}>06:00 PM - 03:00 AM</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>

            <Box>
              <TextField type='file' fullWidth accept="image/*" id='fileImg' sx={{ display: 'none' }} onChange={(e) => loadImg(e)} />
              <button type='button' style={{ width: '100%', height: '40px', fontSize: '16px', cursor: 'pointer' }} onClick={chooseImg}>Upload Image</button>
            </Box>
          </Box>
        </Box>
        <hr />
        <Button variant='contained' sx={{ float: 'right', margin: '0px 20px 10px', bgcolor: '#7575ff' }} onClick={addedDoctor}>{!doctorDetail ? 'Save' : 'Update'}</Button>
      </Box>
    </Modal>
  );
}