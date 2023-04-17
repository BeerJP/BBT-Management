import { React, useState, useEffect } from 'react';
import axios from 'axios';

import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

function Content(props) {

    const ip = props.ip;

    const [open, setOpen] = useState(false);
    const [isUpdate, setUpdate] = useState(false);

    const [isTypeselect, setTypeselect] = useState('1');
    const [isLeaverow, setLeaverow] = useState([]);
    const [isLeaveday, setLeaveday] = useState([]);
    const [isLeavepen, setLeavepen] = useState([]);
    const [isLeaveapp, setLeaveapp] = useState([]);
    const [isEmployee, setEmployee] = useState([]);

    const [isSelectleve, setSelectleve] = useState();

    useEffect(() => {
        const getLeave = async() => {
            await axios.get("http://"+ ip +":5000/leave", {crossdomain: true})
            .then(response => {
                setLeaveday(response.data);
                setLeaverow(response.data);
            });

            await axios.get("http://"+ ip +":5000/leavepending", {crossdomain: true})
            .then(response => {
                setLeavepen(response.data);
            });
    
            await axios.get("http://"+ ip +":5000/leaveapprove", {crossdomain: true})
            .then(response => {
                setLeaveapp(response.data);
            });
        };

        const getEmp = async() => {

            await axios.get("http://"+ ip +":5000/employee_table", {crossdomain: true})
            .then(response => {
                setEmployee(response.data)
            });
        }

        getEmp();
        getLeave();
    }, [ip, isUpdate]);

    useEffect(() => {
        switch(isTypeselect) {
            case '2':
                setLeaverow(isLeavepen);
                break;
            case '3':
                setLeaverow(isLeaveapp);
                break;
            default:
                setLeaverow(isLeaveday);
          }
    }, [isTypeselect])

    const leave_columns = [
        { field: 'th_date', headerName: 'วันที่', width: 110, headerAlign: 'center', align: 'center', disableColumnMenu: false },
        { field: 'emp_id', headerName: 'รหัสพนักงาน', width: 110, headerAlign: 'center', align: 'center', disableColumnMenu: true },
        { field: 'leave_appove', headerName: 'สถานะ', width: 110, headerAlign: 'center', align: 'center', disableColumnMenu: true },
        { field: 'leave_type', headerName: 'ประเภท', width: 110, headerAlign: 'center', align: 'center', disableColumnMenu: true },
        {
            field: 'edit',
            headerAlign: 'center',
            align: 'center',
            headerName: '',
            width: 140,
            sortable: false,
            disableClickEventBubbling: true,
            disableColumnMenu: true,
            renderHeader: (params) => (
                <Stack direction="row" spacing={2}>
                    <select className='text-box select-box' name="type" id="combotype" onChange={(event => {setTypeselect(event.target.value)})}>
                        <option value="1">ทั้งหมด</option>
                        <option value="2">รอตรวจสอบ</option>
                        <option value="3">ตรวจสอบแล้ว</option>
                    </select>
                </Stack>
            ),
            renderCell: (params) => {
                const onClick = (e) => {
                    const currentRow = params.row;
                    setOpen(true)
                    setSelectleve(currentRow)
                };
                return (
                  <Stack direction="row" spacing={2}>
                    <Button variant="outlined" color="warning" size="small" onClick={onClick}>ตรวจสอบ</Button>
                  </Stack>
                );
            },
        }
    ];

    const employee_columns = [
        { field: 'id',  headerName: 'รหัส',  width: 130, headerAlign: 'center', align: 'center', disableColumnMenu: true },
        { 
            field: 'fullName', headerName: 'ชื่อ', width: 190, headerAlign: 'center', align: 'center', disableColumnMenu: true,
            valueGetter: (params) =>`${params.row.emp_name || ''} ${params.row.emp_surname || ''}`
        },
        { field: 'dept_name', headerName: 'แผนก', width: 130, headerAlign: 'center', align: 'center', disableColumnMenu: true },
        {
            field: 'edit',
            headerAlign: 'center',
            align: 'center',
            headerName: '',
            width: 130,
            sortable: false,
            disableClickEventBubbling: true,
            disableColumnMenu: true,
            renderHeader: (params) => (
                <Stack direction="row" spacing={2}>
                    <Button variant="outlined" size="small" onClick={() => setUpdate(!isUpdate)}>แสดงทั้งหมด</Button>
                </Stack>
            ),
            renderCell: (params) => {
                return (
                  <Stack direction="row" spacing={2}>
                    <Button variant="outlined" color="warning" size="small" >ข้อมูลใบลา</Button>
                  </Stack>
                );
            },
        }
    ];

    const handleCellClick = (params) => {
        const getLeave = async() => {
            await axios.post("http://"+ ip +":5000/leave_emp", {id: params.row.id}, {crossdomain: true})
            .then(response => {
                setLeaveday(response.data);
                setLeaverow(response.data);
            });

            await axios.post("http://"+ ip +":5000/leavepending_emp", {id: params.row.id}, {crossdomain: true})
            .then(response => {
                setLeavepen(response.data);
            });
    
            await axios.post("http://"+ ip +":5000/leaveapprove_emp", {id: params.row.id}, {crossdomain: true})
            .then(response => {
                setLeaveapp(response.data);
            });
        };

        getLeave()
    };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        height: 300,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    return (
        <>
            <Modal
            open={open}
            onClose={() => [setOpen(false), setSelectleve()]}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {
                        isSelectleve === undefined ? '' :
                        <div>
                            <Typography id="modal-modal-title" variant="h6" component="h2" sx={{textAlign: 'center'}}>
                                รหัสพนักงาน {isSelectleve.emp_id} วันที่ {isSelectleve.th_date}
                            </Typography>
                            <div className="le-modal">
                                <div className="le-modal-box">
                                    <h4>ข้อมูลใบลา</h4>
                                    <div>
                                        <label className='le-labelname'>ประเภท</label>
                                        <label>: {isSelectleve.leave_type}</label>
                                    </div>
                                    <div>
                                        <label className='le-labelname'>เหตุผล</label>
                                        <label>: {isSelectleve.leave_description}</label>
                                    </div>
                                    <div>
                                        <label className='le-labelname'>รูปแบบ</label>
                                        <label>: ปกติ</label>
                                    </div>
                                    <div>
                                        <label className='le-labelname'>สถานะ</label>
                                        <label>: รอการอนุมัติ</label>
                                    </div>
                                </div>
                                <div className="le-modal-box">
                                    <h4>จำนวนพนักงานที่ลา</h4>
                                    <div>
                                        <label className='le-labelname'>แผนกเดียวกัน</label>
                                        <label>: 0</label>
                                    </div>
                                    <div>
                                        <label className='le-labelname'>แผนกอื่น</label>
                                        <label>: 0</label>
                                    </div>
                                    <div>
                                        <label className='le-labelname'>รวมทั้งหมด</label>
                                        <label>: 0</label>
                                    </div>
                                </div>
                            </div>
                            <Typography id="modal-modal-description" sx={{ mt: 2 , textAlign: 'center'}} >
                                <Button variant="outlined" color="success" size="normal" sx={{mr: 2, width: 90}}>อนุมัติ</Button>
                                <Button variant="outlined" color="error" size="normal" sx={{ml: 2, width: 90}}>ไม่อนุมัติ</Button>
                            </Typography>
                        </div>
                    }
                </Box>
            </Modal>
            <div className='leave_container'>
                <div className='leave_article'>
                    <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                        '& > :not(style)': {
                        m: 0.2,
                        width: { sm: 590, lg: 590
                        },
                        height: { sm: 840, lg: 840
                        },
                        margin:'auto',
                        marginBottom: 1
                        },
                    }}
                    >
                        <Paper elevation={1} sx={{ display: 'flex' }}>
                            <Box sx={{ height: '100%', width: '100%', }}>
                                <DataGrid
                                sx={{
                                    "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
                                        outline: "none !important",
                                    },
                                }}
                                rows={isLeaverow}
                                columns={leave_columns}
                                columnHeaderHeight={80}
                                initialState={{
                                    pagination: {
                                        paginationModel: {
                                        pageSize: 10,
                                        },
                                    },
                                }}
                                pageSizeOptions={[10]}
                                disableRowSelectionOnClick
                                />
                            </Box>
                        </Paper>
                        <Paper elevation={1} sx={{ display: 'flex' }}>
                            <Box sx={{ height: '100%', width: '100%', }}>
                                <DataGrid
                                sx={{
                                    "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
                                        outline: "none !important",
                                    },
                                }}
                                onCellClick={handleCellClick}
                                rows={isEmployee}
                                columns={employee_columns}
                                columnHeaderHeight={80}
                                initialState={{
                                    pagination: {
                                        paginationModel: {
                                        pageSize: 10,
                                        },
                                    },
                                }}
                                pageSizeOptions={[10]}
                                disableRowSelectionOnClick
                                />
                            </Box>
                        </Paper>
                    </Box>
                </div>
            </div>
        </>
    );
};

export default Content;