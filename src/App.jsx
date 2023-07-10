import React, { createContext, useContext, useEffect, useState } from 'react';
import './App.css'
import Sidebar from './components/Sidebar'
import doctorList from './API/doctorList';
import patientList from './API/patientList';
import recentActivity from './API/recentActivity';
import eventsList from './API/eventsList';

export const Context = createContext();

const getLocalDoctorData = () => {
  if (localStorage.getItem('doctor-list')) {
    return JSON.parse(localStorage.getItem('doctor-list'));
  } else {
    return [...doctorList];
  }
}

const getLocalPatientData = () => {
  if (localStorage.getItem('patient-list')) {
    return JSON.parse(localStorage.getItem('patient-list'));
  } else {
    return [...patientList];
  }
}

const getLocalEventsData = () => {
  if (localStorage.getItem('events-list')) {
    return JSON.parse(localStorage.getItem('events-list'));
  } else {
    return [...eventsList];
  }
}

const getLocalRecentActivityData = () => {
  if (localStorage.getItem('recentActivity-list')) {
    return JSON.parse(localStorage.getItem('recentActivity-list'));
  } else {
    return [...recentActivity];
  }
}

function App() {
  const [addDoctor, setAddDoctor] = useState(getLocalDoctorData());
  const [addPatient, setAddPatient] = useState(getLocalPatientData());
  const [doctorDetail, setDoctorDetail] = React.useState();
  const [patient, setPatient] = useState({ name: '', gender: '', dob: '', bloodGroup: '', number: '', email: '', symptom: '' });
  const [events, setEvents] = React.useState(getLocalEventsData());
  const [preference, setPreference] = useState({ defaultView: 'Weekly', startTime: '6:00 AM', endTime: '10:00 PM', slotDuration: '60 mins', bookingColor: 'Doctors Colors', firstDayOfWeek: 'Sunday' });
  const [recentActivity, setRecentActivity] = useState(getLocalRecentActivityData());
  const [slotInfo, setSlotInfo] = useState();


  useEffect(() => {
    localStorage.setItem('doctor-list', JSON.stringify(addDoctor));
    localStorage.setItem('patient-list', JSON.stringify(addPatient));
    localStorage.setItem('events-list', JSON.stringify(events));
    localStorage.setItem('recentActivity-list', JSON.stringify(recentActivity));
  }, [addDoctor, addPatient, events, recentActivity])


  return (
    <Context.Provider value={{ addDoctor, setAddDoctor, addPatient, setAddPatient, doctorDetail, setDoctorDetail, patient, setPatient, events, setEvents, preference, setPreference, recentActivity, setRecentActivity, slotInfo, setSlotInfo }}>
      <Sidebar />
    </Context.Provider>
  )
}

export default App
