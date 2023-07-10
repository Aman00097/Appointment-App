import { BsSpeedometer2 } from 'react-icons/bs';
import { FaRegCalendarCheck } from 'react-icons/fa';
import { LuStethoscope } from 'react-icons/lu';
import { MdHealing } from 'react-icons/md';
import { GiSettingsKnobs } from 'react-icons/gi';
import { BsInfoCircle } from 'react-icons/bs';

const sidebarApi = [
    {
        id: 1,
        icon: <BsSpeedometer2 />,
        name: 'Dashboard',
        link: '/Appointment-App'
    },
    {
        id: 2,
        icon: <FaRegCalendarCheck />,
        name: 'Schedule',
        link: '/schedule'
    },
    {
        id: 3,
        icon: <LuStethoscope />,
        name: 'Doctors',
        link: '/doctor'
    },
    {
        id: 4,
        icon: <MdHealing />,
        name: 'Patients',
        link: '/patient'
    },
    {
        id: 5,
        icon: <GiSettingsKnobs />,
        name: 'Preference',
        link: '/preference'
    },
    {
        id: 6,
        icon: <BsInfoCircle />,
        name: 'About',
        link: '/about'
    },
];

export default sidebarApi;