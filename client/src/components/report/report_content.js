import { React, useState, useEffect, Fragment } from 'react';
import axios from 'axios';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Stack from '@mui/material/Stack';

import Modal from '@mui/material/Modal';

import { DataGrid } from '@mui/x-data-grid';

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

    const [isReportdate, setReportdate] = useState();
    const [isReportrows, setReportrows] = useState();
    const [isReportsets, setReportsets] = useState();

    // const [isReportyear, setReportyear] = useState(0);
    // const [isReportmont, setReportmont] = useState(0);
    // const [isReportdept, setReportdept] = useState(0);
    // const [isReportview, setReportview] = useState();

    // const deptChange = (event) => { setReportdept(event.target.value); };
    // const yearChange = (event) => { setReportyear(event.target.value); };
    // const montChange = (event) => { setReportmont(event.target.value); };

    useEffect(() => {
        axios.get("http://"+ ip +":5000/report_date", {crossdomain: true})
        .then(response => {
            setReportdate(response.data);
        });
    }, [ip]);

    useEffect(() => {
        if(isReportsets !== undefined){
            axios.post("http://"+ ip +":5000/report_emp", { id: isReportsets[0], date: isReportsets[1] }, {crossdomain: true})
            .then(response => {
                setReportrows(response.data);
            });
        }
    }, [ip, isReportsets]);

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

    // function createData(date, ta, nta, lta, ld, bld, hld, sld, wid, wd) {
    //     return {
    //         date, ta, nta, lta, ld, bld, hld, sld,  wid, wd
    //     };
    // };

    // useEffect(() => {
    //     setReportrows()
    //     var rows = []
    //     if (isReportdate !== undefined) {
    //         isReportdate.map((item) => {
    //             rows.push(createData(
    //                 item.th_date,
    //                 item.ta,
    //                 item.nta,
    //                 item.lta,
    //                 item.ld,
    //                 item.bld,
    //                 item.hld,
    //                 item.sld,
    //                 item.work_id,
    //                 item.work_date,
    //             ))
    //         })
    //         setReportrows(rows)
    //     };
    // }, [isReportdate]);

    console.log(isReportrows)

    const columns = [
        { field: 'id',  headerName: 'วันที่',  width: 135, headerAlign: 'center', align: 'center' },
        { field: 'ta', headerName: 'ใบบันทึกเวลา', width: 135, headerAlign: 'center', align: 'center', disableColumnMenu: true, sortable: false },
        { field: 'nta', headerName: 'เข้างานปกติ', width: 135, headerAlign: 'center', align: 'center', disableColumnMenu: true, sortable: false },
        { field: 'lta', headerName: 'เข้างานสาย', width: 135, headerAlign: 'center', align: 'center', disableColumnMenu: true, sortable: false },
        { field: 'ld', headerName: 'ใบลา', width: 135, headerAlign: 'center', align: 'center', disableColumnMenu: true, sortable: false },
        { field: 'bld', headerName: 'ลากิจ', width: 135, headerAlign: 'center', align: 'center', disableColumnMenu: true, sortable: false },
        { field: 'hld', headerName: 'ลาพักร้อน', width: 135, headerAlign: 'center', align: 'center', disableColumnMenu: true, sortable: false },
        { field: 'sld', headerName: 'ลาป่วย', width: 135, headerAlign: 'center', align: 'center', disableColumnMenu: true, sortable: false },
        {
            renderCell: (params) => {
                const onClick = (e) => {
                const currentRow = params.row;
                setReportsets([params.row.work_id, params.row.work_date])
                setOpen(true)
                };

                return (
                <Stack direction="row" spacing={2}>
                    <IconButton variant="outlined" size="small" onClick={onClick}><MoreHorizIcon/></IconButton>
                </Stack>
                );
            },
        }
    ];

    // const style = {
    //     position: 'absolute',
    //     top: '50%',
    //     left: '50%',
    //     transform: 'translate(-50%, -50%)',
    //     width: 1000,
    //     height: 500,
    //     bgcolor: 'background.paper',
    //     border: '2px solid #000',
    //     boxShadow: 24,
    //     p: 4,
    //     overflow: 'hidden',
    //     overflowY: 'auto',
    // };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 1000,
        height: 600,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    return(
        <> 
            <Modal
            open={isOpen}
            onClose={() => [setOpen(false), setReportrows(), setReportsets()]}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    
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
                        <Paper elevation={1} sx={{ display: 'flex' }}>
                            <Box sx={{ height: '100%', width: '100%', }}>
                                {
                                    isReportdate === undefined ? ''
                                    :
                                    <DataGrid
                                    sx={{
                                        "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
                                            outline: "none !important",
                                        },
                                    }}
                                    rows={isReportdate}
                                    columns={columns}
                                    columnHeaderHeight={80}
                                    initialState={{
                                        pagination: {
                                            paginationModel: {
                                            pageSize: 30,
                                            },
                                        },
                                    }}
                                    pageSizeOptions={[30]}
                                    />
                                }
                            </Box>
                        </Paper>
                    </Box>
                </div>
            </div>
        </>
    );
};

export default Content;