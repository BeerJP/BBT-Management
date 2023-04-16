import { React, useState, useEffect } from 'react';
import axios from 'axios';
import CalendarInfo from './ca_date';

import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

function Content(props) {

    const ip = props.ip;

    const [isUpdate, setUpdate] = useState(false);
    const [open, setOpen] = useState(false);
    const [isChecked, setChecked] = useState(true);
    const [isHoliname, setHoliname] = useState('');
    const [isHolidate, setHolidate] = useState('');
    const [isSelect, setSelect] = useState('');
    const [workDay, setWorkday] = useState([{ id: '', work_id: '', work_date: '', work_status: '' }]);
    const [holiDay, setHoliday] = useState([{ id: '', work_id: '', work_date: '', work_status: '' }]);

    useEffect(() => {
        console.log('test')
    }, [open])

    useEffect(() => {

        const getHoliday = async() => {
            await axios.get("http://"+ ip +":5000/holiday", {crossdomain: true})
            .then(response => {
                setHoliday(response.data);
            });
        };
    
        const getWorkday = async() => {
            await axios.get("http://"+ ip +":5000/workday", {crossdomain: true})
            .then(response => {
                setWorkday(response.data);
            });
        };

        getWorkday();
        getHoliday();
    }, [ip, isUpdate]);

    useEffect(() => {
    
        var result = workDay.find(obj => {
            return obj.work_date === isSelect
        })

        if (result === undefined) {
            setChecked(false);
            setHolidate('')
        } else {
            setChecked(true);
            setHolidate(result.work_id)
        }
        
    }, [isSelect, workDay])

    const columns = [
        { field: 'th_date', headerName: 'วันที่', width: 150, headerAlign: 'center', align: 'center', disableColumnMenu: false },
        { field: 'holi_name', headerName: 'วันหยุด', width: 300, headerAlign: 'center', align: 'center', disableColumnMenu: true },
        {
            field: 'edit',
            headerAlign: 'center',
            align: 'center',
            headerName: '',
            width: 120,
            sortable: false,
            disableClickEventBubbling: true,
            disableColumnMenu: true,
            renderHeader: (params) => (
                <Stack direction="row" spacing={2}>
                    <IconButton onClick={() => setOpen(true)}><AddCircleOutlineIcon /></IconButton>
                </Stack>
            ),
            renderCell: (params) => {
                const onClick = (e) => {
                    const currentRow = params.row;
                    cancelHoliday(currentRow.work_id);
                };
                
                return (
                  <Stack direction="row" spacing={2}>
                    <Button variant="outlined" color="warning" size="small" onClick={onClick}>ยกเลิก</Button>
                  </Stack>
                );
            },
        }
    ];

    const insertHoliday = () => {
        axios.post("http://"+ ip +":5000/add_holiday", { 
            name: isHoliname, 
            date: isHolidate 
        }, {crossdomain: true})
        .then(axios.put("http://"+ ip +":5000/update_work", {
            state: '0', 
            date: isHolidate 
        }, {crossdomain: true}))
        setHoliname('');
        setHolidate('');
        setUpdate(!isUpdate)
        setOpen(false)
    };



    const cancelHoliday = (work_id) => {
        axios.post("http://"+ ip +":5000/cancel_holiday", { 
            date: work_id,
        }, {crossdomain: true})
        .then(axios.put("http://"+ ip +":5000/update_work", {
            state: '1', 
            date: work_id 
        }, {crossdomain: true}))
        setHoliday([{ id: '', work_id: '', work_date: '', work_status: '' }]);
        setUpdate(!isUpdate)
    };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        height: 250,
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
                        เพิ่มข้อมูลวันหยุด
                    </Typography>
                    <div className='lb-box-long ca-info'>
                        <div>
                            <label className='lb-header'>วันหยุด<a>*</a></label>
                            <input className='text-box' onChange={(event => {setHoliname(event.target.value)})}></input>
                        </div>
                    </div>
                    <div className='lb-box-long ca-info'>
                        <div>   
                            <label className='lb-header'>วันที่<a>*</a></label>
                            <input className='text-box' style={isChecked ? {border: '1px solid lightgreen'} : {border: '1px solid red'}} 
                            id='holiday' type='date' onSelect={(event => {setSelect(event.target.value)})}/>
                        </div>
                    </div>
                    <Typography id="modal-modal-description" sx={{ mt: 2 , textAlign: 'center'}} >
                        <Button variant="outlined" color="success" size="normal"
                        style={isChecked ? {pointerEvents: 'auto'} : {pointerEvents: 'none'}}
                        onClick={insertHoliday}
                        >บันทึก</Button>
                    </Typography>
                </Box>
            </Modal>
            <div className='calendar_container'>
                <div className='calendar_article'>
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
                        <Paper elevation={1} sx={{ display: 'flex', flexDirection: 'column' }}>
                            <CalendarInfo ip={ip} update={isUpdate}/>
                        </Paper>
                        <Paper elevation={1} sx={{ display: 'flex' }}>
                            <Box sx={{ height: '100%', width: '100%', }}>
                                <DataGrid
                                sx={{
                                    "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
                                        outline: "none !important",
                                    },
                                }}
                                rows={holiDay}
                                columns={columns}
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