import { React, useState, useEffect, Fragment } from 'react';
import axios from 'axios';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import Button from '@mui/material-next/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import PropTypes from 'prop-types';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';


function Content(props) {

    const ip = props.ip;

    const [isReportyear, setReportyear] = useState(0);
    const [isReportmont, setReportmont] = useState(0);
    const [isReportdept, setReportdept] = useState(0);
    const [isReportview, setReportview] = useState('');

    const deptChange = (event) => {
        setReportdept(event.target.value);
    };

    const yearChange = (event) => {
        setReportyear(event.target.value);
    };

    const montChange = (event) => {
        setReportmont(event.target.value);
    };

    useEffect(() => {
        
    })

    function setDefault() {
        setReportyear('')
        setReportmont('')
        setReportdept('')
        setReportview('')
    }

    const style = { 
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        height: 350,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    function createData(name, calories, fat, carbs, protein, price) {
        return {
            name,
            calories,
            fat,
            carbs,
            protein,
            price,
            history: [
            {
                id: '1001',
                name: 'จักรพันธ์ ภูพาพุทธ',
                customerId: '8.37 น.',
                amount: '17.00 น.',
            },
            {
                id: '1002',
                name: 'สมชาย อัคเคอ',
                customerId: '8.37 น.',
                amount: '17.00 น.',
            },
            ],
        };
    }

    function Row(props) {
        const { row } = props;
        const [open, setOpen] = useState(false);
      
        return (
            <Fragment>
                <TableRow sx={{ '& > *': { borderBottom: 'unset' }}}>
                    <TableCell align="center">{row.name}</TableCell>
                    <TableCell align="center">{row.calories}</TableCell>
                    <TableCell align="center">{row.fat}</TableCell>
                    <TableCell align="center">{row.carbs}</TableCell>
                    <TableCell align="center">{row.protein}</TableCell>
                    <TableCell align="center">
                        <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                        >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box sx={{ margin: 'auto', width: 900 }}>
                                <Table aria-label="collapsible table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center">รหัส</TableCell>
                                            <TableCell align="center">ชื่อ - นามสกุล</TableCell>
                                            <TableCell align="center">เวลาเข้างาน</TableCell>
                                            <TableCell align="center">เวลาออกงาน</TableCell>
                                            <TableCell align="center">สถานะ</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            row.history.map((historyRow) => (
                                                <TableRow key={historyRow.id}>
                                                    <TableCell align="center">{historyRow.id}</TableCell>
                                                    <TableCell align="center">{historyRow.name}</TableCell>
                                                    <TableCell align="center">{historyRow.customerId}</TableCell>
                                                    <TableCell align="center">{historyRow.amount}</TableCell>
                                                    <TableCell align="center">ปกติ</TableCell>
                                                </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </Fragment>
        );
    }

    Row.propTypes = {
        row: PropTypes.shape({
          calories: PropTypes.number.isRequired,
          carbs: PropTypes.number.isRequired,
          fat: PropTypes.number.isRequired,
          history: PropTypes.arrayOf(
            PropTypes.shape({
              amount: PropTypes.number.isRequired,
              customerId: PropTypes.string.isRequired,
              name: PropTypes.string.isRequired,
              id: PropTypes.string.isRequired,
            }),
          ).isRequired,
          name: PropTypes.string.isRequired,
          price: PropTypes.number.isRequired,
          protein: PropTypes.number.isRequired,
        }).isRequired,
    };
      
    const rows = [
        createData('03-01-2566', 5, 5, 0, 0, 1),
        createData('04-01-2566', 5, 3, 2, 0, 1),
        createData('05-01-2566', 5, 5, 0, 0, 1),
        createData('06-01-2566', 4, 4, 0, 1, 1),
        createData('07-01-2566', 5, 4, 1, 0, 1),
        createData('09-01-2566', 5, 5, 0, 0, 1),
        createData('10-01-2566', 5, 3, 2, 0, 1),
        createData('11-01-2566', 5, 5, 0, 0, 1),
        createData('12-01-2566', 4, 4, 0, 1, 1),
        createData('13-01-2566', 5, 4, 1, 0, 1),
        createData('14-01-2566', 5, 5, 0, 0, 1),
        createData('16-01-2566', 5, 3, 2, 0, 1),
        createData('17-01-2566', 5, 5, 0, 0, 1),
        createData('18-01-2566', 4, 4, 0, 1, 1),
        createData('19-01-2566', 5, 4, 1, 0, 1),
    ];

    return(
        <>  
            <div className='report_container'>
                <div className='report_article'>
                    <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        '& > :not(style)': {
                        m: 0.2,
                        width: '100%',
                        height: '100%',
                        },
                    }}
                    >
                        <Paper elevation={0} sx={{ display: 'flex'}}>
                            <AppBar position='static' color='inherit'>
                                <Toolbar>
                                    <Typography variant='h7' component='div' sx={{ flexGrow: 1 }}>
                                        รายงานสรุปการทำงาน
                                    </Typography>
                                    <Typography id='modal-modal-description' sx={{ textAlign: 'center', display: 'flex', alignItems: 'center' }}>
                                        {/* <FormControl sx={{ width: 140 }} size="small">
                                            <InputLabel sx={{ background: 'white' }}>&nbsp;&nbsp;&nbsp;ปี</InputLabel>
                                            <Select
                                            sx={{ mr: 1 }}
                                            value={isReportyear}
                                            label="Type"
                                            onChange={yearChange}
                                            >
                                                <MenuItem value={0}>ทั้งหมด</MenuItem>
                                                <MenuItem value={2566}>2566</MenuItem>
                                            </Select>
                                        </FormControl> */}
                                        <FormControl sx={{ width: 140 }} size="small">
                                            <InputLabel sx={{ background: 'white' }}>&nbsp;เดือน</InputLabel>
                                            <Select
                                            sx={{ mr: 1 }}
                                            value={isReportmont}
                                            label="Type"
                                            onChange={montChange}
                                            >
                                                <MenuItem value={0}>ทั้งหมด</MenuItem>
                                                <MenuItem value={1}>มกราคม</MenuItem>
                                                <MenuItem value={2}>กุมพาพันธ์</MenuItem>
                                                <MenuItem value={3}>มีนาคม</MenuItem>
                                                <MenuItem value={4}>เมษายน</MenuItem>
                                                <MenuItem value={5}>พฤษภาคม</MenuItem>
                                                <MenuItem value={6}>มิถุนายน</MenuItem>
                                                <MenuItem value={7}>กรกฏาคม</MenuItem>
                                                <MenuItem value={8}>สิงหาคม</MenuItem>
                                                <MenuItem value={9}>กันยายน</MenuItem>
                                                <MenuItem value={10}>ตุลาคม</MenuItem>
                                                <MenuItem value={11}>พฤษจิกายน</MenuItem>
                                                <MenuItem value={12}>ธันวาคม</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Typography>
                                </Toolbar>
                            </AppBar>
                        </Paper>
                    </Box>
                    <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        overflow: 'hidden',
                        overflowY: 'auto',
                        '& > :not(style)': {
                        m: 0.2,
                        width: '100%',
                        height: {
                            sm: 1000,
                            md: 630,
                            lg: 820
                        },
                        },
                    }}
                    >
                        <Paper elevation={1} sx={{ display: 'flex', flexDirection: 'column'}}>
                            <TableContainer>
                                <Table aria-label="collapsible table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center">วันที่</TableCell>
                                            <TableCell align="center">ใบบันทึกเวลา</TableCell>
                                            <TableCell align="center">เข้างานปกติ</TableCell>
                                            <TableCell align="center">เข้างานสาย</TableCell>
                                            <TableCell align="center">ใบลา</TableCell>
                                            <TableCell />
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {
                                        rows.map((row) => (
                                            <Row key={row.name} row={row} />
                                        ))
                                    }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    </Box>
                </div>
            </div>
        </>
    );
};

export default Content;