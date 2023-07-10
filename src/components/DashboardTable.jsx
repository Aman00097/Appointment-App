import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const columns = [
    { id: 'time', label: 'Time', minWidth: 100 },
    { id: 'patientName', label: 'Patient Name', minWidth: 80 },
    {
        id: 'doctorName',
        label: 'Doctor Name',
        minWidth: 120,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'symptoms',
        label: 'Symptoms',
        minWidth: 200,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
    }
];

function createData(time, patientName, doctorName, symptom) {
    return { time, patientName, doctorName, symptom };
}

export default function DashboardTable({ todaysEvents }) {
    const navTo = useNavigate();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    todaysEvents.sort((a, b) => new Date(a.start) - new Date(b.start));

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: { xs: 200, sm: 150 } }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id} align={column.align} style={{
                                        minWidth: column.minWidth, fontWeight: 'bold', borderBottom: '2px solid #ccc', padding: '5px 10px', textAlign: 'center'
                                    }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            todaysEvents.map((ele, index) => {
                                let time = `${new Date(ele.start).toTimeString().slice(0, 5)} ${new Date(ele.start).getHours() > 11 ? 'PM' : 'AM'}`;
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                        <TableCell sx={{ textAlign: 'center', padding: '5px 10px' }}>{time}</TableCell>
                                        <TableCell sx={{ textAlign: 'center', padding: '5px 10px' }}>{ele.patientName}</TableCell>
                                        <TableCell sx={{ textAlign: 'center', padding: '5px 10px' }}><Link sx={{ cursor: 'pointer' }}>{ele.doctorName}</Link></TableCell>
                                        <TableCell sx={{ textAlign: 'center', padding: '5px 10px' }}>{ele.symptom}</TableCell>
                                    </TableRow>
                                );
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
    );
}