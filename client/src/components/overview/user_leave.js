import { React, useEffect, useState } from 'react';
import axios from 'axios';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { DataGrid } from '@mui/x-data-grid';


function UserLeaveInfo(props) {

    const ip = props.ip;
    const emp = props.emp;

    const [isUpdate, setUpdate] = useState(false);
    const [isLeaveset, setLeaveset] = useState(false);
    const [isLeaveadd, setLeaveadd] = useState(false);

    const [isSelectleve, setSelectleve] = useState();
    const [isLeaveday, setLeaveday] = useState([]);
    const [isChecked, setChecked] = useState(true);
    const [workDay, setWorkday] = useState([]);

    const [isDescription, setDescription] = useState('');
    const [isDate, setDate] = useState('');
    const [isType, setType] = useState('ลากิจ');

    useEffect(() => {
 
        const getLeaveemp = async() => {
            await axios.post("http://"+ ip +":5000/leave_emp", {id: emp}, {crossdomain: true})
            .then(response => {
                setLeaveday(response.data);
            });
        };

        const getWorkday = async() => {
            await axios.post("http://"+ ip +":5000/workday_emp", {id: emp}, {crossdomain: true})
            .then(response => {
                setWorkday(response.data);
            });
        };

        getLeaveemp();
        getWorkday();

    }, [emp, ip, isUpdate]);

    const columns = [
        { field: 'th_date', headerName: 'วันที่', width: 150, headerAlign: 'center', align: 'center', disableColumnMenu: false },
        { field: 'leave_type', headerName: 'ประเภท', width: 150, headerAlign: 'center', align: 'center', disableColumnMenu: true },
        { field: 'leave_appove', headerName: 'สถานะ', width: 150, headerAlign: 'center', align: 'center', disableColumnMenu: true },
        {
            field: 'edit',
            headerAlign: 'center',
            align: 'center',
            headerName: '',
            width: 100,
            sortable: false,
            disableClickEventBubbling: true,
            disableColumnMenu: true,
            renderHeader: (params) => (
                <Stack direction="row" spacing={2}>
                    <IconButton onClick={() => setLeaveadd(true)}><AddCircleOutlineIcon /></IconButton>
                </Stack>
            ),
            renderCell: (params) => {
                const onClick = (e) => {
                    const currentRow = params.row;
                    setLeaveset(true)
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

    useEffect(() => {
    
        var result = workDay.find(obj => {
            return obj.work_date === isDate
        })

        if (result === undefined) {
            setChecked(false);
            setDate('')
        } else {
            setChecked(true);
            setDate(result.work_date)
        }

    }, [isDate, workDay])

    const insertLeave = () => {
        // axios.post("http://"+ ip +":5000/add_leave", { 
        //     type: leaveType,
        //     date: leaveDate,
        //     description: leaveName,
        //     id: id,
        // }, {crossdomain: true})
        // setUpdate(!isUpdate)
        // document.getElementById('type').options[0].selected=true;
        // document.getElementById('date').options[0].selected=true;
        // document.getElementById('desc').value = '';
        // setLeavetype('');
        // setLeavename('');
        // setLeavedate('');
    };

    const deleteLeave = (id, date) => {
        axios.post("http://"+ ip +":5000/cancel_leave", { 
            id: id,
            date: date,
        }, {crossdomain: true})
        setLeaveset(false)
        setUpdate(!isUpdate);
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

    console.log(isDate)
    console.log(isDescription)
    console.log(isType)

    return (
        <>
            <Modal
            open={isLeaveadd}
            onClose={() => setLeaveadd(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{textAlign: 'center'}}>
                        เพิ่มข้อมูลใบลา
                    </Typography>
                    <div className="le-modal">
                        <div className="le-modal-box">
                            <div className='lb-box-long ov-info'>
                                <div>
                                    <label className='lb-header'>เหตุผลการลา<a>*</a></label>
                                    <input className='text-box' onChange={(event => {setDescription(event.target.value)})}></input>
                                </div>
                            </div>
                            <div className='lb-box-long ov-info'>
                                <div>
                                    <label className='lb-header'>ประเภทการลา<a>*</a></label>
                                    <select className='ov-select-box-leave' name="gender" id="gen" onClick={(event => {setType(event.target.value)})}>
                                        <option value={"ลากิจ"}>ลากิจ</option>
                                        <option value={"ลาพักร้อน"}>ลาพักร้อน</option>
                                        <option value={"ลาป่วย"}>ลาป่วย</option>
                                    </select>
                                </div>
                            </div>
                            <div className='lb-box-long ov-info'>
                                <div>   
                                    <label className='lb-header'>วันที่<a>*</a></label>
                                    <input className='text-box' style={isChecked ? {border: '1px solid lightgreen'} : {border: '1px solid red'}} 
                                    id='holiday' type='date' onSelect={(event => {setDate(event.target.value)})}/>
                                </div>
                            </div>
                        </div>
                        <div className="le-modal-box">
                            <h4>สิทธิการลาคงเหลือ</h4>
                            <div>
                                <label className='le-labelname'>ลากิจ</label>
                                <label>: 0</label>
                            </div>
                            <div>
                                <label className='le-labelname'>ลาพักร้อน</label>
                                <label>: 0</label>
                            </div>
                            <div>
                                <label className='le-labelname'>ลาป่วย</label>
                                <label>: 0</label>
                            </div>
                        </div>
                    </div>
                    <Typography id="modal-modal-description" sx={{ mt: 2 , textAlign: 'center'}} >
                        <Button variant="outlined" color="success" size="large"
                        style={isChecked ? {pointerEvents: 'auto'} : {pointerEvents: 'none'}}
                        onClick={insertLeave}
                        >บันทึก</Button>
                    </Typography>
                </Box>
            </Modal>
            <Modal
            open={isLeaveset}
            onClose={() => [setLeaveset(false), setSelectleve()]}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {
                        isSelectleve === undefined ? '' :
                        <div>
                            <Typography id="modal-modal-title" variant="h6" component="h2" sx={{textAlign: 'center'}}>
                                วันที่ {isSelectleve.th_date}
                            </Typography>
                            <div className="le-modal">
                                <div className="le-modal-box">
                                    <h4>ข้อมูลใบลา</h4>
                                    <div>
                                        <label className='le-labelname-type'>ประเภท</label>
                                        <label>:&nbsp;&nbsp;{isSelectleve.leave_type}</label>
                                    </div>
                                    <div>
                                        <label className='le-labelname-type'>เหตุผล</label>
                                        <label>:&nbsp;&nbsp;{isSelectleve.leave_description}</label>
                                    </div>
                                    <div>
                                        <label className='le-labelname-type'>รูปแบบ</label>
                                        <label>:&nbsp;&nbsp;ปกติ</label>
                                    </div>
                                    <div>
                                        <label className='le-labelname-type'>สถานะ</label>
                                        <label>:&nbsp;&nbsp;{isSelectleve.leave_appove}</label>
                                    </div>
                                </div>
                            </div>
                            <Typography id="modal-modal-description" sx={{ mt: 2 , textAlign: 'center'}} >
                                <Button variant="outlined" color="error" size="normal" sx={{width: 90}}
                                onClick={() => deleteLeave(isSelectleve.emp_id, isSelectleve.leave_date)}>ยกเลิก</Button>
                            </Typography>
                        </div>
                    }
                </Box>
            </Modal>
            <Paper elevation={0} sx={{ display: 'flex' }}>
                <Box sx={{ height: 776, width: '100%', }}>
                    <DataGrid
                    sx={{
                        "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
                            outline: "none !important",
                        },
                    }}
                    rows={isLeaveday}
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

export default UserLeaveInfo;