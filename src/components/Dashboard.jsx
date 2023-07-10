import React, { useContext, useEffect, useState } from 'react'
import { Box, Link, Typography } from '@mui/material/';
import DashboardTable from './DashboardTable';
import { Context } from '../App';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';


const Dashboard = () => {
  const navTo = useNavigate();
  const { events } = useContext(Context);
  const [todaysEvents, setTodaysEvents] = useState([]);
  const [thisWeekEvents, setThisWeekEvents] = useState([]);

  const getTodayEvents = () => {
    // let today = new Date().toLocaleDateString();
    // setTodayEvents(events.filter((ele) => new Date(ele.start).toLocaleDateString() === today));

    const today = moment().startOf('day');
    return events.filter(event => moment(event.start).isSame(today, 'day'));
  };
  
  const getThisWeekEvents = () => {
    const startOfWeek = moment().startOf('week');
    const endOfWeek = moment().endOf('week');
    return events.filter(
      event =>
        moment(event.start).isBetween(startOfWeek, endOfWeek, 'day', '[]')
    );
  };

  useEffect(() => {
    setTodaysEvents(getTodayEvents);
    setThisWeekEvents(getThisWeekEvents);
  }, [events]);

  return (
    <Box sx={{ maxWidth: { xs: '350px', sm: '600px', md: '100%' }, display: 'flex', justifyContent: 'space-evenly', flexDirection: { xs: 'column', md: 'row' }, paddingTop: { xs: '20px', sm: '30px' }, margin: { xs: 'auto', sm: 'none' }, marginBottom: { sm: '20px', lg: '0px' } }}>
      <Box sx={{ width: { xs: '100%', sm: '100%', md: '60%' }, marginRight: { md: '20px' }, marginBottom: { xs: '30px' } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: { xs: 'wrap', sm: 'nowrap', md: 'nowrap' }, marginBottom: '30px' }}>

          <Box sx={{ bgcolor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', boxShadow: '0 0 5px #ccc', width: { xs: '100%', sm: 'calc((100%/2) - 10px)' }, height: '100px', textAlign: 'center', padding: '10px', borderRadius: '5px', marginBottom: { xs: '20px', sm: '0' } }}>
            <Typography variant='h6' fontSize='16px' fontWeight='bold'>Total Appointments - Today</Typography>
            <Typography variant='h4' color='#7575ff'>{todaysEvents.length}</Typography>
          </Box>
          <Box sx={{ bgcolor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', boxShadow: '0 0 5px #ccc', width: { xs: '100%', sm: 'calc((100%/2) - 10px)' }, height: '100px', textAlign: 'center', padding: '10px', borderRadius: '5px' }}>
            <Typography variant='h6' fontSize='16px' fontWeight='bold' >Total Appointments - This Week</Typography>
            <Typography variant='h4' color='#7575ff'>{thisWeekEvents.length}</Typography>
          </Box>

        </Box>

        <Box sx={{ bgcolor: '#fff', boxShadow: '0 0 5px #ccc', borderRadius: '5px', marginBottom: '30px' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '20px', borderBottom: '2px solid #ccc' }}>
            <Typography variant='h6' fontSize='14px' fontWeight='bold'>Today's Appointments</Typography>
            <Typography variant='h6' fontSize='14px'><Link sx={{ cursor: 'pointer' }} onClick={() => navTo('/schedule')}>Book Appointments</Link></Typography>
          </Box>
          <DashboardTable todaysEvents={todaysEvents} />
        </Box>

        <Box sx={{ bgcolor: '#fff', boxShadow: '0 0 5px #ccc', borderRadius: '5px', padding: '10px' }}>
          <Typography variant='h6' fontSize='14px' fontWeight='bold' marginBottom='10px'>Consultation</Typography>
          <Graph />
        </Box>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', maxWidth: { sm: '600px', md: '30%' } }}>

        <RecentActives />
        <DoctorAvailable />
        <Box sx={{ boxShadow: '0 0 5px #ccc', borderRadius: '5px' }}>

        </Box>

      </Box>
    </Box>
  )
}

export default Dashboard

const Graph = () => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );


  const { events } = useContext(Context);

  const startOfWeek = moment().startOf('week');
  const endOfWeek = moment().endOf('week');
  let datesOfWeek = [];
  let diabetologyWeek = [];
  let orthopaedicsWeek = [];
  let cardiologyWeek = [];

  const getDataOfWeek = () => {
    let currentDate = new Date(startOfWeek);
    while (currentDate <= endOfWeek) {
      datesOfWeek.push(new Date(currentDate));
      let diabetology = 0;
      let orthopaedics = 0;
      let cardiology = 0;
      events.forEach(ele => {
        if (new Date(ele.start).toDateString() === currentDate.toDateString()) {
          if (ele.department === 'Diabetology') {
            diabetology++;
          } else if (ele.department === 'Orthopedics') {
            orthopaedics++;
          } else if (ele.department === 'Cardiology') {
            cardiology++;
          }
        }
      })
      diabetologyWeek.push(diabetology);
      orthopaedicsWeek.push(orthopaedics);
      cardiologyWeek.push(cardiology);
      currentDate.setDate(currentDate.getDate() + 1);
    }
  }
  getDataOfWeek();

  const labels = datesOfWeek.map((ele) => ele.toDateString().slice(4, 10));

  let colors = labels.map(ele => ele === new Date().toDateString().slice(4, 10) ? "#7575ff" : "#000")

  const options = {
    responsive: true,
    scales: {
      y: {
        title: {
          display: true,
          text: "Numbers of Patient",
          color: '#000',
        },
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
        suggestedMax: 4
      },
      x: {
        title: {
          display: true,
          text: "Days of Week",
          color: '#000',
        },
        beginAtZero: true,
        ticks: {
          color: colors,
        }
      }
    },

  };

  const data = {
    labels,
    datasets: [
      {
        label: 'Diabetology',
        data: diabetologyWeek,
        borderColor: 'rgba(255, 99, 132, 0.5)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        tension: 0.4,
        borderWidth: 2,
        pointStyle: false,
      },
      {
        label: 'Orthopaedics',
        data: orthopaedicsWeek,
        borderColor: 'rgba(53, 162, 235, 0.5)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        tension: 0.4,
        borderWidth: 2,
        pointStyle: false,
      },
      {
        label: 'Cardiology',
        data: cardiologyWeek,
        borderColor: '#f6aa60',
        backgroundColor: '#f6aa60',
        tension: 0.4,
        borderWidth: 2,
        pointStyle: false,
      }
    ],
  };

  return <Line options={options} data={data} />;
}

const RecentActives = () => {
  const { recentActivity } = useContext(Context);
  const borderColor = ['#df5286', '#1aaa55', '#865fcf', '#fce200', '#ea7a57', '#00bdae'];

  let color = 0;
  const colorFunc = () => {
    if (color === 6) return color = 0;
    return color++;
  }

  return (
    <Box sx={{ bgcolor: '#fff', width: '100%', boxShadow: '0 0 5px #ccc', borderRadius: '5px', marginBottom: '30px' }}>
      <Typography variant='h6' padding='10px 20px ' fontSize='16px' fontWeight='bold'>Recent Activities</Typography>
      <Box sx={{ overflowY: 'scroll', maxHeight: '300px' }}>
        {
          recentActivity && recentActivity.map((ele, index) => {
            return (
              <Box key={index} sx={{ padding: '0px 15px', marginY: '10px', ":hover": { cursor: 'default', bgcolor: '#f1f1f1' } }}>
                <Box sx={{ borderLeft: `2px solid ${borderColor[colorFunc()]}`, padding: '5px 10px' }}>
                  <Typography fontSize='14px' fontWeight='bold'>{ele.title} -</Typography>
                  <Typography fontSize='14px'>{ele.activity}</Typography>
                  <Typography fontSize='14px' color='#999'>{ele.time}</Typography>
                </Box>
              </Box>
            )
          })
        }
      </Box>
    </Box>
  )
}

const DoctorAvailable = () => {
  const navTo = useNavigate();
  const { addDoctor } = useContext(Context);

  return (
    <Box sx={{ bgcolor: '#fff', width: '100%', boxShadow: '0 0 5px #ccc', borderRadius: '5px', marginBottom: '30px' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', margin: '0 20px 0 10px' }}>
        <Typography variant='h6' sx={{ padding: '10px', fontSize: '16px', fontWeight: 'bold' }}>Doctor Available</Typography>
        <Typography variant='h6' sx={{ padding: '10px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}><Link onClick={() => navTo('/doctor')}>View All</Link></Typography>
      </Box>
      <Box sx={{ overflowY: 'scroll', maxHeight: '300px', display: 'flex', flexWrap: 'wrap', paddingX: { md: '0px', sm: '10px' } }}>
        {
          addDoctor && addDoctor.map((ele, index) => {
            return (
              <Box key={index} sx={{ width: { md: '100%', sm: 'calc(100%/2)', xs: '100%' }, height: '50px', padding: '5px 10px', display: 'flex', alignItems: 'center', ":hover": { cursor: 'default', bgcolor: '#f1f1f1' } }}>
                <img src={ele.image} alt="" style={{ borderRadius: '50%', width: '30px', height: '30px', marginRight: '20px' }} />
                <Box>
                  <Typography sx={{ fontSize: '14px', color: '#666' }}>{ele.name}</Typography>
                  <Typography sx={{ fontSize: '10px', color: '#666' }}>{ele.department}</Typography>
                </Box>
              </Box>
            )
          })
        }
      </Box>
    </Box>
  )
}