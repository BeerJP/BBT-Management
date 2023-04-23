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

import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';


function Content(props) {

    const ip = props.ip;
    const [isOpen, setOpen] = useState(false);
    const [isReportyear, setReportyear] = useState(0);
    const [isReportmont, setReportmont] = useState(0);
    const [isReportdept, setReportdept] = useState(0);
    const [isReportview, setReportview] = useState('');
    const [isReportdate, setReportdate] = useState();
    const [isReportrows, setReportrows] = useState();
    const [isReportdata, setReportdata] = useState();

    const deptChange = (event) => { setReportdept(event.target.value); };
    const yearChange = (event) => { setReportyear(event.target.value); };
    const montChange = (event) => { setReportmont(event.target.value); };

    useEffect(() => {
        axios.get("http://"+ ip +":5000/report_date", {crossdomain: true})
        .then(response => {
            setReportdate(response.data);
        });
    }, [ip]);

    // useEffect(() => {
    //     const getEmp = async () => {
    //       try {
    //         const response = await axios.get("http://" + ip + ":5000/report", { crossdomain: true });
    //         await new Promise(resolve => setTimeout(resolve, 2000));
    //         setReportdata(response.data);
    //       } catch (error) {
    //         console.error(error);
    //       }
    //     };
    //     getEmp();
    //   }, [ip]);

    // useEffect(() => {
    //     if(isReportdata !== undefined){
    //         const dataArray = isReportdata[0].employee.split('-');
    //         const objectArray = dataArray.map(item => JSON.parse(item));
    //         console.log(objectArray)
    //         console.log(isReportdata[0])
    //     }
    // }, [isReportdata]);

    // function employeeList(id, date) {
    //     var arr = [];
    //     axios.post("http://" + ip + ":5000/report_emp", { id: id, date: date }, { crossdomain: true })
    //     .then(response => {
    //         arr.push(response.data)
    //     }).catch(error => {
    //         console.log(error);
    //     });
    //     return arr
    // }

    function createData(date, ta, nta, lta, ld, bld, hld, sld, wid, wd) {
        return {
            date, ta, nta, lta, ld, bld, hld, sld
        };
    };

    useEffect(() => {
        setReportrows()
        var rows = []
        if (isReportdate !== undefined) {
            isReportdate.map((item) => {
                rows.push(createData(
                    item.th_date,
                    item.ta,
                    item.nta,
                    item.lta,
                    item.ld,
                    item.bld,
                    item.hld,
                    item.sld,
                ))
            })
            setReportrows(rows)
        };
    }, [isReportdate]);

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
                                        {/* <FormControl sx={{ width: 140 }} size="small">
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
                                        </FormControl> */}
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
                                <Table aria-label="collapsible table" stickyHeader>
                                    <TableHead>
                                        <TableRow>
                                                <TableCell align="center">วันที่</TableCell>
                                                <TableCell align="center" style={{ width: 100 }}>ใบบันทึกเวลา</TableCell>
                                                <TableCell align="center" style={{ width: 100 }}>เข้างานปกติ</TableCell>
                                                <TableCell align="center" style={{ width: 100 }}>เข้างานสาย</TableCell>
                                                <TableCell align="center" style={{ width: 70 }}>ใบลา</TableCell>
                                                <TableCell align="center" style={{ width: 70 }}>ลากิจ</TableCell>
                                                <TableCell align="center" style={{ width: 70 }}>ลาพักร้อน</TableCell>
                                                <TableCell align="center" style={{ width: 70 }}>ลาป่วย</TableCell>
                                                <TableCell />
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {
                                        isReportrows === undefined ? ''
                                        :
                                        isReportrows.map((row) => (
                                            <TableRow
                                            key={row.name}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell align="center">{row.date}</TableCell>
                                                <TableCell align="center">{row.ta}</TableCell>
                                                <TableCell align="center">{row.nta}</TableCell>
                                                <TableCell align="center">{row.lta}</TableCell>
                                                <TableCell align="center">{row.ld}</TableCell>
                                                <TableCell align="center">{row.bld}</TableCell>
                                                <TableCell align="center">{row.hld}</TableCell>
                                                <TableCell align="center">{row.sld}</TableCell>
                                                <TableCell align="center">
                                                    <IconButton
                                                    aria-label="expand row"
                                                    size="small"
                                                    onClick={() => setOpen(!isOpen)}
                                                    >
                                                        <MoreHorizIcon />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
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