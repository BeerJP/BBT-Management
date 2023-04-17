import { React, useEffect, useState } from 'react';
import axios from 'axios';
// import et from '../../assets/icon/edit-ta.png';
// import al from '../../assets/icon/angle-left.png';
// import ar from '../../assets/icon/angle-right.png';
import tc from '../../assets/icon/check.png';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { DataGrid } from '@mui/x-data-grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';


function TimeSheetInfo(props) {

    const ip = props.ip;
    const selectEmp = props.select;

    const [open, setOpen] = useState(false);
    const [isUpdate, setUpdate] = useState(false);
    const [isDate, setDate] = useState('');
    const [isIn, setIn] = useState('');
    const [isOut, setOut] = useState('');
    const [isWork, setWork] = useState('');

    const [isTimesheet, setTimesheet] = useState([{ 
        time_in: '', time_out: '', work_id: '', emp_id: '', work_date: '', work_status: '', id: '', th_date: ''
    }]);

    useEffect(() => {
        setTimesheet([])
        const getSelect = () => {
            axios.post("http://"+ ip +":5000/timesheet", { id: selectEmp }, {crossdomain: true})
            .then(response => {
                setTimesheet(response.data);
            });
        };

        getSelect();

    }, [ip, selectEmp, isUpdate]);

    const columns = [
        { field: 'th_date', headerName: 'วันที่',  width: 150, headerAlign: 'center', align: 'center', disableColumnMenu: false },
        { field: 'time_in', headerName: 'เวลาเข้างาน', width: 150, headerAlign: 'center', align: 'center', disableColumnMenu: true },
        { field: 'time_out', headerName: 'เวลาออกงาน', width: 150, headerAlign: 'center', align: 'center', disableColumnMenu: true },
        {
            field: 'edit',
            headerAlign: 'center',
            align: 'center',
            headerName: '',
            width: 90,
            sortable: false,
            disableClickEventBubbling: true,
            disableColumnMenu: true,
            
            renderCell: (params) => {
                const onClick = (e) => {
                  const currentRow = params.row;
                  setDate(currentRow.th_date)
                  setIn(currentRow.time_in)
                  setOut(currentRow.time_out)
                  setWork(currentRow.work_id)
                  setOpen(true)
                };
                
                return (
                  <Stack direction="row" spacing={2}>
                    <Button variant="outlined" color="warning" size="small" onClick={onClick}>แก้ไข</Button>
                  </Stack>
                );
            },
        }
    ];


    function editTime() {
        
        axios.put("http://"+ ip +":5000/update_time", { 
            id: selectEmp,
            date: isWork,
            in: isIn,
            out: isOut,
        }, {crossdomain: true})
        
        setOpen(false)
        setUpdate(!isUpdate)
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        height: 200,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    return (
        <>
            <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{textAlign: 'center'}}>
                        รหัสพนักงาน {selectEmp} วันที่ {isDate}
                    </Typography>
                    <div>
                        <div className="ta-center">
                            <label>เวลาเข้า&nbsp;</label>
                            <input id='inputIn' type='time' onChange={(e) =>setIn(e.target.value)} defaultValue={isIn}></input>
                        </div>
                        <div className="ta-center">
                            <label>เวลาออก</label>
                            <input id='inputIn' type='time' onChange={(e) =>setOut(e.target.value)} defaultValue={isOut}></input>
                        </div>
                    </div>
                    <Typography id="modal-modal-description" sx={{ mt: 2 , textAlign: 'center'}} >
                        <Button variant="outlined" color="success" onClick={editTime} size="normal">บันทึก</Button>
                    </Typography>
                </Box>
            </Modal>
            <Paper elevation={0} sx={{ display: 'flex' }}>
                <Box sx={{ height: 840, width: '100%', }}>
                    <DataGrid
                    sx={{
                        "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
                            outline: "none !important",
                        },
                    }}
                    rows={isTimesheet}
                    columns={columns}
                    columnHeaderHeight={80}
                    initialState={{
                        pagination: {
                            paginationModel: {
                            pageSize: 50,
                            },
                        },
                    }}
                    pageSizeOptions={[50]}
                    disableRowSelectionOnClick
                    />
                </Box>
            </Paper>
        </>
    );
};

export default TimeSheetInfo;