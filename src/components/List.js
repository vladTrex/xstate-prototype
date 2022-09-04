import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const MainList = ({ locations = [], onLocationClick }) => {
    return (
        <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Location Name</TableCell>
                        <TableCell align="right">Train Number</TableCell>
                        <TableCell align="right">Train Info</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {locations.map(row => (
                        <TableRow
                            hover
                            key={row.name}
                            onClick={() => onLocationClick(row)}
                            style={{ cursor: 'pointer' }}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">{row.serialNumber}</TableCell>
                            <TableCell align="right">{row.info}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default MainList;