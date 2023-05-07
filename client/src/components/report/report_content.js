import { React, useState, useEffect } from 'react';
import axios from 'axios';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import Tooltip from '@mui/material/Tooltip';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';


function Content(props) {

    const ip = props.ip;
    const [isOpen, setOpen] = useState(false);

    const [isReportdate, setReportdate] = useState();
    const [isReportrows, setReportrows] = useState();
    const [isReportsets, setReportsets] = useState();

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

    const columns = [
        {
            field: 'work_date',
            headerName: 'วันที่',
            type: 'date',
            width: 135,
            headerAlign: 'center',
            align: 'center',
            valueGetter: (params) => {
                const dateString = params.value;
                const dateObj = new Date(dateString);
                return dateObj;
            },
        },
        { field: 'ta', headerName: 'ใบบันทึกเวลา', width: 135, headerAlign: 'center', align: 'center', disableColumnMenu: true, sortable: false },
        { field: 'nta', headerName: 'เข้างานปกติ', width: 135, headerAlign: 'center', align: 'center', disableColumnMenu: true, sortable: false },
        { field: 'lta', headerName: 'เข้างานสาย', width: 135, headerAlign: 'center', align: 'center', disableColumnMenu: true, sortable: false },
        { field: 'ld', headerName: 'ใบลา', width: 135, headerAlign: 'center', align: 'center', disableColumnMenu: true, sortable: false },
        { field: 'bld', headerName: 'ลากิจ', width: 135, headerAlign: 'center', align: 'center', disableColumnMenu: true, sortable: false },
        { field: 'hld', headerName: 'ลาพักร้อน', width: 135, headerAlign: 'center', align: 'center', disableColumnMenu: true, sortable: false },
        { field: 'sld', headerName: 'ลาป่วย', width: 135, headerAlign: 'center', align: 'center', disableColumnMenu: true, sortable: false },
        {
            field: 'info',
            headerAlign: 'center',
            align: 'center',
            headerName: '',
            width: 100,
            sortable: false,
            disableColumnMenu: true,
            renderCell: (params) => {
                const onClick = (e) => {
                const currentRow = params.row;
                setReportsets([params.row.id, params.row.work_date])
                setOpen(true)
                };

                return (
                <Stack direction="row" spacing={2}>
                    <Tooltip title="ข้อมูลเพิ่มเติม"> 
                        <IconButton variant="outlined" size="small" onClick={onClick}><MoreHorizIcon/></IconButton>
                    </Tooltip>
                </Stack>
                );
            },
        },
    ];

    const columns_emp = [
        { field: 'id',  headerName: 'รหัส',  width: 135, headerAlign: 'center', align: 'center', disableColumnMenu: true, sortable: false },
        { field: 'name', headerName: 'ชื่อ - นามสกุล', flex: 1, headerAlign: 'center', align: 'center', disableColumnMenu: true, sortable: false },
        { field: 'time_in', headerName: 'เวลาเข้างาน', width: 135, headerAlign: 'center', align: 'center', disableColumnMenu: true, sortable: false },
        { field: 'time_out', headerName: 'เวลาออกงาน', width: 135, headerAlign: 'center', align: 'center', disableColumnMenu: true, sortable: false },
        { field: 'time_state', headerName: 'สถานะ', width: 135, headerAlign: 'center', align: 'center', disableColumnMenu: true, sortable: false },
    ];

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800,
        height: 600,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const minYear = 2020;
    const maxYear = new Date().getFullYear() + 10;
  
    const minDate = new Date(minYear, 0, 1);
    const maxDate = new Date(maxYear, 11, 31);

    return(
        <> 
            <Modal
            open={isOpen}
            onClose={() => [setOpen(false), setReportrows(), setReportsets()]}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {
                        isReportrows === undefined ? ''
                        :
                        <DataGrid
                        sx={{
                            "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
                                outline: "none !important",
                            },
                        }}
                        rows={isReportrows}
                        columns={columns_emp}
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