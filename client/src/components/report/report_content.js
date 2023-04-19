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


function Content(props) {

    const ip = props.ip;

    const [isOpen, setOpen] = useState(false);

    const [isReporttype, setReporttype] = useState('');
    const [isReportrows, setReportrows] = useState('');
    const [isReportyear, setReportyear] = useState('');
    const [isReportmont, setReportmont] = useState('');
    const [isReportdate, setReportdate] = useState('');
    const [isReportemps, setReportemps] = useState('');
    const [isReportdept, setReportdept] = useState('');

    const [isReportview, setReportview] = useState('');

    const [age, setAge] = useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
      };


    function setClose() {
        setOpen(false)
        setReporttype('')
        setReportrows('')
        setReportyear('')
        setReportmont('')
        setReportdate('')
        setReportemps('')
        setReportdept('')
        setReportview('')
    }

    const style = { 
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        height: 500,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    return(
        <>  
            <Modal
            open={isOpen}
            onClose={() => setClose()}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Age</InputLabel>
                            <Select
                            sx={{ mb: 3 }}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={age}
                            label="Age"
                            onChange={handleChange}
                            >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Age</InputLabel>
                            <Select
                            sx={{ mb: 3 }}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={age}
                            label="Age"
                            onChange={handleChange}
                            >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Box>
            </Modal>
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
                        <Paper elevation={1} sx={{ display: 'flex'}}>
                            <AppBar position='static' color='inherit'>
                                <Toolbar>
                                    <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}></Typography>
                                    <Typography id='modal-modal-description' sx={{ textAlign: 'center'}} onClick={() => setOpen(true)}>
                                        <Button variant='outlined' color='inherit' size='normal' sx={{ mr: 1, width: 160 }} endIcon={<SearchIcon />}>
                                            เลือกรายการ
                                        </Button>
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
                            lg: 830
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