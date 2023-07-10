import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import sidebarApi from '../API/SidebarApi';
import DoctorIcon from '../image/doctor_icon.jpg';
import Dashboard from './Dashboard'
import Schedule from './Schedule';
import { IoMdLogOut } from 'react-icons/io'
import { AiFillGithub } from 'react-icons/ai'
import Doctor from './Doctor';
import Patient from './Patient';
import Preference from './Preference';
import About from './About';
import DoctorBio from './DoctorBio';
import { Stack } from '@mui/material';

const drawerWidth = 240;

function Sidebar(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const navTo = useNavigate();
    const location = useLocation();

    const [sidebar, setSiderbar] = React.useState(sidebarApi);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const dashboardHandling = (id) => {
        navTo(sidebar[id - 1].link);
    }

    const dashboardStyle = { backgroundColor: '#7575ff', color: '#fff', borderRadius: '5px' }

    const drawer = (
        <Box>
            <Box textAlign='center' padding='20px'>
                <img src={DoctorIcon} alt="doctorImg" style={{ width: '80px', height: '80px', borderRadius: '50%', border: '2px solid #ccc', marginBottom: '10px' }} />
                <Typography fontWeight='bold'>Jane Doe</Typography>
                <Typography fontSize='12px' color='#aaa'>Admin</Typography>
            </Box>
            <Divider />
            <List sx={{ paddingX: '10px' }}>
                {sidebar.map((ele) => {
                    return (
                        <ListItem key={ele.id} disablePadding onClick={() => dashboardHandling(ele.id)}>
                            <ListItemButton style={ele.link.slice(0, 4) === location.pathname.slice(0, 4) ? dashboardStyle : {}}>
                                <ListItemIcon style={{ fontSize: '20px', marginLeft: '20px', color: ele.link.slice(0, 4) === location.pathname.slice(0, 4) ? '#fff' : '' }}>
                                    {ele.icon}
                                </ListItemIcon>
                                <ListItemText primary={ele.name} style={{ marginLeft: '-10px' }} />
                            </ListItemButton>
                        </ListItem>
                    )
                })}
            </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { md: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` }, bgcolor: '#7575ff'
                }}
            >
                <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'center', md: 'space-between' } }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ display: { md: 'none' }, position: { xs: 'absolute', md: 'unset' }, left: { xs: '50px' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div" fontSize='16px'>
                        APPOINTMENT PLANNER
                    </Typography>
                    <Stack direction='row' gap={1} variant='div' sx={{ display: { md: 'flex', sm: 'none', xs: 'none' }, alignItems: 'center', justifyContent: 'center', borderLeft: '2px solid #b7b7ff', padding: '5px' }}>
                        <IoMdLogOut fontSize='28px' color='#b7b7ff' />
                        <Link to={'https://aman00097.github.io/Appointment-App/'} target='_blank'><AiFillGithub color='#b7b7ff' fontSize='28px' /></Link>
                    </Stack>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', md: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 0, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar display='none' />
                <Routes>
                    <Route path='/' element={<Dashboard />} />
                    <Route path='/schedule' element={<Schedule />} />
                    <Route path='/doctor' element={<Doctor />} />
                    <Route path='/patient' element={<Patient />} />
                    <Route path='/preference' element={<Preference />} />
                    <Route path='/about' element={<About />} />
                    <Route path='/doctor/detail/:doctorId' element={<DoctorBio />} />
                </Routes>
            </Box>
        </Box>
    );
}

Sidebar.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default Sidebar;