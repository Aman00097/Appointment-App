import { Box, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const About = () => {
    return (
        <Box padding='50px 20px'>
            <Typography variant='p'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod quidem doloremque, laudantium ut dolorem impedit. Ipsa voluptas adipisci reprehenderit totam rerum placeat qui facilis, dolore quae minus libero, impedit repellat! Consequatur eos repellat illum similique cum minus qui perferendis totam eligendi laboriosam modi culpa aperiam voluptas natus, quia quasi fugiat dolores excepturi delectus? Dolores labore culpa voluptate? Tempora voluptatum perspiciatis dolorum qui provident aspernatur delectus nobis laborum vel ducimus obcaecati.</Typography>
            <Link to={'https://github.com/Aman00097/Appointment-App'} target='_blank'>  <Typography variant='h5' sx={{ textAlign: 'center', mt: '10px', cursor: 'pointer', color: '#7575ff' }}>Source Code</Typography></Link>
        </Box>
    )
}

export default About
