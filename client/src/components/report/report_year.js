import { React, useState, useEffect } from 'react';
import axios from 'axios';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import Tooltip from '@mui/material/Tooltip';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CloseIcon from '@mui/icons-material/Close';


function ReportYear(props) {

    const ip = props.ip;
    const [isOpen, setOpen] = useState(false);

    const [isReportyear, setReportyear] = useState();
    const [isReportrows, setReportrows] = useState();
    const [isReportsets, setReportsets] = useState();

    useEffect(() => {
        axios.get("http://"+ ip +":5000/report_year", {crossdomain: true})
        .then(response => {
            setReportyear(response.data);
        });
    }, [ip]);

    useEffect(() => {
        if(isReportsets !== undefined){
            axios.post("http://"+ ip +":5000/report_year_emp", { id: isReportsets[0], cid: isReportsets[1] }, {crossdomain: true})
            .then(response => {
                setReportrows(response.data);
            });
        }
    }, [ip, isReportsets]);

    const columns = [
        { field: 'id', headerName: 'ปี', width: 135, headerAlign: 'center', align: 'center', },
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
                setReportsets([params.row.id, params.row.cid])
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
        { field: 'id',  headerName: 'รหัส',  width: 100, headerAlign: 'center', align: 'center', disableColumnMenu: true, sortable: false },
        { field: 'name', headerName: 'ชื่อ - นามสกุล', flex: 1, headerAlign: 'center', align: 'center', disableColumnMenu: true, sortable: false },
        { field: 'nta', headerName: 'ปกติ', width: 100, headerAlign: 'center', align: 'center', disableColumnMenu: true, sortable: false },
        { field: 'lta', headerName: 'สาย', width: 100, headerAlign: 'center', align: 'center', disableColumnMenu: true, sortable: false },
        { field: 'bld', headerName: 'ลากิจ', width: 100, headerAlign: 'center', align: 'center', disableColumnMenu: true, sortable: false },
        { field: 'hld', headerName: 'ลาพักร้อน', width: 100, headerAlign: 'center', align: 'center', disableColumnMenu: true, sortable: false },
        { field: 'sld', headerName: 'ลาป่วย', width: 100, headerAlign: 'center', align: 'center', disableColumnMenu: true, sortable: false },
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

    return(
        <> 
            <Modal
            open={isOpen}
            onClose={() => [setOpen(false), setReportrows(), setReportsets()]}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <CloseIcon onClick={() => setOpen(false)} sx={{position: 'absolute', top: 0.5, right: 0.5}}/>
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
            <Paper elevation={1} sx={{ display: 'flex' }}>
                <Box sx={{ height: '100%', width: '100%', }}>
                    {
                        isReportyear === undefined ? ''
                        :
                        <DataGrid
                        sx={{
                            "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
                                outline: "none !important",
                            },
                        }}
                        rows={isReportyear}
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
        </>
    );
};

export default ReportYear;