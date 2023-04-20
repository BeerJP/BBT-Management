import { React, useState, useEffect } from 'react';
import axios from 'axios';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import AppBar from "@mui/material/AppBar";
import Button from '@mui/material-next/Button';
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import SearchIcon from '@mui/icons-material/Search';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


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

    return(
        <>  
            {/* <Modal
            open={isOpen}
            onClose={() => setClose()}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label" sx={{ background: 'white' }}>รายงาน&nbsp;</InputLabel>
                            <Select
                            sx={{ mb: 3 }}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={isReporttype}
                            label="Age"
                            onChange={typeChange}
                            >
                                <MenuItem value={1}>ทั้งหมด</MenuItem>
                                <MenuItem value={2}>รายงานสรุป</MenuItem>
                                <MenuItem value={3}>รายการย่อย</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label" sx={{ background: 'white' }}>แผนก&nbsp;</InputLabel>
                            <Select
                            sx={{ mb: 3 }}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={isReportdept}
                            label="Age"
                            onChange={deptChange}
                            >
                                <MenuItem value={1}>ทั้งหมด</MenuItem>
                                <MenuItem value={2}>ออฟฟิศ 1</MenuItem>
                                <MenuItem value={3}>ออฟฟิศ 2</MenuItem>
                                <MenuItem value={4}>สโตร์ & ขนส่ง</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label" sx={{ background: 'white' }}>ขอบเขต&nbsp;</InputLabel>
                            <Select
                            sx={{ mb: 3 }}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={isReportrows}
                            label="Age"
                            onChange={rowsChange}
                            >
                                <MenuItem value={1}>ทั้งหมด</MenuItem>
                                <MenuItem value={2}>โดยปี</MenuItem>
                                <MenuItem value={3}>โดยเดือน</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    {
                        isReportrows === 2 ? 
                        <Box sx={{ minWidth: 120, display: 'flex', justifyContent: 'space-between' }}>
                            <LocalizationProvider dateAdapter={AdapterMoment}>
                                <DatePicker sx={{width: 185}} views={['year']}/>
                            </LocalizationProvider>
                            <label className='date-picker-label'>-</label>
                            <LocalizationProvider dateAdapter={AdapterMoment}>
                                <DatePicker sx={{width: 185}} views={['year']}/>
                            </LocalizationProvider>
                        </Box>
                        :
                        isReportrows === 3 ? 
                        <Box sx={{ minWidth: 120, display: 'flex', justifyContent: 'space-between' }}>
                            <LocalizationProvider dateAdapter={AdapterMoment}>
                                <DatePicker sx={{width: 185}} views={['year', 'month']}/>
                            </LocalizationProvider>
                            <label className='date-picker-label'>-</label>
                            <LocalizationProvider dateAdapter={AdapterMoment}>
                                <DatePicker sx={{width: 185}} views={['year', 'month']}/>
                            </LocalizationProvider>
                        </Box>
                        : ''
                    }
                    <Typography sx={{ mt: 3, textAlign: 'center' }} >
                        <Button variant="outlined" color="success" size="normal" sx={{ borderRadius: 'none' }}>
                            ตกลง
                        </Button>
                    </Typography>
                </Box>
            </Modal> */}
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
                                        <FormControl sx={{ width: 140 }} size="small">
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
                                        </FormControl>
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
                                        <FormControl sx={{ width: 150 }} size="small">
                                            <InputLabel sx={{ background: 'white' }}>แผนก&nbsp;</InputLabel>
                                            <Select
                                            sx={{ mr: 1 }}
                                            value={isReportdept}
                                            label="Type"
                                            onChange={deptChange}
                                            >
                                                <MenuItem value={0}>ทั้งหมด</MenuItem>
                                                <MenuItem value={1}>ออฟฟิศ 1</MenuItem>
                                                <MenuItem value={2}>ออฟฟิศ 2</MenuItem>
                                                <MenuItem value={3}>สโตร์ & ขนส่ง</MenuItem>
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
                        // '&::-webkit-scrollbar': {
                        //     width: '5px'
                        //   }
                    }}
                    >
                        <Paper elevation={1} sx={{ display: 'flex', flexDirection: 'column'}}>
                            {
                                isReportview === '' ? ''
                                :
                                <Paper elevation={1} sx={{ display: 'flex'}}><h4>รายงานวันที่ {isReportview.start} - {isReportview.end}</h4></Paper>
                            }
                        </Paper>
                    </Box>
                </div>
            </div>
        </>
    );
};

export default Content;