import { React, useState, useEffect } from 'react';
import axios from 'axios';
import AppBar from "@mui/material/AppBar";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


import ui from '../../assets/icon/user-line.png';
import ua from '../../assets/icon/user-add.png';
import ue from '../../assets/icon/edit.png';
// import InfoCard from './emp_info';
// import AddCard from './emp_add';
// import EditCard from './emp_update';


function Content(props) {

    const ip = props.ip;
    const [deptInfo, setDeptinfo] = useState([{ dept_id: ' ', dept_name: ' ' }]);
    const [typeInfo, setTypeinfo] = useState([{ label: ' ', id: ' ' }]);
    const [isDisabled, setDisabled] = useState(true);
    const [isEdit, setEdit] = useState(true);
    const [isEmployee, setEmployee] = useState([{
        id: ' ', emp_id: ' ', emp_name: ' ', emp_surname: ' ', emp_gender: ' ', emp_birthdate: ' ', 
        emp_status: ' ', emp_startdate: ' ', emp_enddate: ' ', emp_mac1: ' ', emp_mac2: ' ', dept_id: ' ', 
        dept_name: ' ', user_name: ' ', user_password: ' ', type_id: ' ', type_name: ' ', emp_age: ' '
    }]);
    const [isEmpid, setEmpid] = useState('');
    const [isName, setName] = useState('');
    const [isSurname, setSurname] = useState('');
    const [isGender, setGender] = useState('');
    const [isBirth, setBirth] = useState('');
    const [isStart, setStart] = useState('');
    const [isEnd, setEnd] = useState('');
    const [isMac1, setMac1] = useState('');
    const [isMac2, setMac2] = useState('');
    const [isDeptid, setDeptid] = useState('');
    const [isDeptname, setDeptname] = useState('');
    const [isUsername, setUsername] = useState('');
    const [isPassword, setPassword] = useState('');
    const [isTypeid, setTypeid] = useState('');
    const [isTypename, setTypename] = useState('');
    const [isEmpage, setEmpage] = useState('');

    // console.log(isEmpid)
    // console.log(isName)
    // console.log(isSurname)
    // console.log(isDept)
    // console.log(isGender)
    // console.log(isBirth)
    // console.log(isMac1)
    // console.log(isMac2)
    // console.log(isEnd)
    // console.log(isUsername)
    // console.log(isPassword)
    // console.log(isType)

    useEffect(() => {

        const getEmp = async() => {

            await axios.get("http://"+ ip +":5000/employee", {crossdomain: true})
            .then(response => {
                setEmployee(response.data)
            });
        }

        const getDepart = async() => {
            await axios.get("http://"+ ip +":5000/department", {crossdomain: true})
            .then(response => {
                setDeptinfo(response.data);
            });
        };
    
        const getType = async() => {
            await axios.get("http://"+ ip +":5000/type", {crossdomain: true})
            .then(response => {
                setTypeinfo(response.data);
            });
        };
        getEmp();
        getDepart();
        getType();

    }, [ip, update]);

    
    const columns = [
        {  field: 'id',  headerName: 'รหัส',  width: 130, headerAlign: 'center', align: 'center', disableColumnMenu: true },
        { field: 'emp_name', headerName: 'ชื่อ', width: 190, headerAlign: 'center', align: 'center', disableColumnMenu: true },
        { field: 'emp_surname', headerName: 'นามสกุล', width: 190, headerAlign: 'center', align: 'center', disableColumnMenu: true },
        { field: 'dept_name', headerName: 'แผนก', width: 190, headerAlign: 'center', align: 'center', disableColumnMenu: true }
    ];

    function update() {
        return (
            axios.put("http://"+ ip +":5000/update_employee", { 
                id: isEmpid,
                name: isName, 
                surname: isSurname,
                dept: isDeptid,
                gender: isGender,
                birth: isBirth,
                mac1: isMac1,
                mac2: isMac2
            }, {crossdomain: true})
            .then(axios.put("http://"+ ip +":5000/update_user", { 
                id: isEmpid,
                username: isUsername,
                password: isPassword,
                type: isTypeid 
            }, {crossdomain: true}))
            .then(
                setEdit(true)
            )
        );
    }

    function cancel() {
        return (
            isEmployee.map((item, index) => {
                if (item.emp_id === isEmpid) {
                    setName(item.emp_name)
                    setSurname(item.emp_surname)
                    setGender(item.emp_gender)
                    setBirth(item.emp_birthdate)
                    setStart(item.emp_startdate)
                    setMac1(item.emp_mac1 === null ? '' : item.emp_mac1)
                    setMac2(item.emp_mac2 === null ? '' : item.emp_mac2)
                    setDeptid(item.dept_id)
                    setDeptname(item.dept_name)
                    setUsername(item.user_name)
                    setTypeid(item.type_id)
                    setTypename(item.type_name)
                    setEmpage(item.emp_age)
                    setPassword('')
                }
            }),
            setEdit(true)
        );
    }

    const handleCellClick = (params) => {
        const selectedRow = isEmployee.map((item, index) => {
            if (item.emp_id === params.row.emp_id) {
                setEmpid(item.emp_id)
                setName(item.emp_name)
                setSurname(item.emp_surname)
                setGender(item.emp_gender)
                setBirth(item.emp_birthdate)
                setStart(item.emp_startdate)
                setMac1(item.emp_mac1 === null ? '' : item.emp_mac1)
                setMac2(item.emp_mac2 === null ? '' : item.emp_mac2)
                setDeptid(item.dept_id)
                setDeptname(item.dept_name)
                setUsername(item.user_name)
                setTypeid(item.type_id)
                setTypename(item.type_name)
                setEmpage(item.emp_age)
            }
        })
        setEdit(true)
        setDisabled(false)
    };


    const handleDateChange = (date) => {
      console.log(date)
    };

    return (
        <>
            <div className='employee_container'>
                <div className='employee_article'>
                        <Box
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'space-between',
                            '& > :not(style)': {
                            m: 0.2,
                            width: { sm: 570, md: 840, lg: 570
                            },
                            height: { sm: 840, md: 570, lg: 840
                            },
                            margin:'auto',
                            marginBottom: 1
                            },
                        }}
                        >
                            <Paper elevation={1} sx={{ 
                                display: 'flex', 
                                flexDirection: 'column' 
                                }}>
                                <AppBar position="static">
                                    <Toolbar>
                                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                        ข้อมูลพนักงาน
                                    </Typography>
                                        <Button color="inherit" disabled={isDisabled} onClick={() => setEdit(!isEdit)}>แก้ไขข้อมูล</Button>
                                        {/* <Button color="inherit">เพิ่มข้อมูล</Button> */}
                                    </Toolbar>
                                </AppBar>
                                <div className='employee_card'>
                                    <div>
                                        <Grid container spacing={3} padding={1}>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                onChange={e => setName(e.target.value)}
                                                disabled={isEdit}
                                                id="firstName"
                                                name="firstName"
                                                label="ชื่อ"
                                                fullWidth
                                                value={isName}
                                                margin="normal"
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                onChange={e => setSurname(e.target.value)}
                                                disabled={isEdit}
                                                id="lastName"
                                                name="lastName"
                                                label="นามสกุล"
                                                fullWidth
                                                value={isSurname}
                                                margin="normal"
                                                />
                                            </Grid>
                                            <Grid item lg={6} md={4} sm={6} marginTop={2}>
                                                <TextField
                                                disabled={isEdit}
                                                id="age"
                                                name="age"
                                                label="อายุ"
                                                fullWidth
                                                value={isEmpage}
                                                sx={isEdit ? {display: '' } : {display: 'none'}}
                                                />
                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <DatePicker onChange={handleDateChange}
                                                    label={isBirth} format={'YYYY-MM-DD'} sx={isEdit ? {display: 'none' } : {display: ''}} />
                                                </LocalizationProvider>
                                            </Grid>
                                            <Grid item lg={6} md={4} sm={6} marginTop={2}>
                                                <Autocomplete
                                                disabled={isEdit}
                                                marginTop={5}
                                                id="department"
                                                fullWidth
                                                options={deptInfo}
                                                value={isDeptname}
                                                renderInput={(params) => <TextField {...params} label='แผนก' />}
                                                />
                                            </Grid>
                                            <Grid item  lg={6} md={4} sm={6} marginTop={2}>
                                                <TextField
                                                disabled={isEdit}
                                                id="startDate"
                                                name="startDate"
                                                label="วันเริ่มงาน"
                                                fullWidth
                                                value={isStart}
                                                sx={isEdit ? {display: '' } : {display: 'none'}}
                                                />
                                                <LocalizationProvider dateAdapter={AdapterDayjs} label={isStart}>
                                                    <DatePicker label={isStart} format={'YYYY-MM-DD'} sx={isEdit ? {display: 'none' } : {display: ''}} />
                                                </LocalizationProvider>
                                            </Grid>
                                            <Grid item lg={6} md={4} sm={6}>
                                                <TextField
                                                onChange={e => setMac1(e.target.value)}
                                                disabled={isEdit}
                                                id="macAddress1"
                                                name="macAddress1"
                                                label="MAC Address 1"
                                                fullWidth
                                                value={isMac1}
                                                margin="normal"
                                                />
                                            </Grid>
                                            <Grid item lg={6} md={4} sm={6}>
                                                <TextField
                                                onChange={e => setMac2(e.target.value)}
                                                disabled={isEdit}
                                                id="macAddress2"
                                                name="macAddress2"
                                                label="MAC Address 2"
                                                fullWidth
                                                value={isMac2}
                                                margin="normal"
                                                />
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={3} padding={1}>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                onChange={e => setUsername(e.target.value)}
                                                disabled={isEdit}
                                                id="userName"
                                                name="userName"
                                                label="ชื่อผู้ใช้งาน"
                                                fullWidth
                                                value={isUsername}
                                                margin="normal"
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6} marginTop={2}>
                                                <Autocomplete
                                                disabled={isEdit}
                                                marginTop={5}
                                                id="combo-box-demo"
                                                fullWidth
                                                options={typeInfo}
                                                value={isTypename}
                                                renderInput={(params) => <TextField {...params} label='ประเภทผู้ใช้งาน' />}
                                                />
                                            </Grid>
                                        </Grid>
                                        <Stack direction="row" spacing={2} marginTop={3} justifyContent={'space-between'} sx={{ height: 50, padding: 1, }}>
                                            <TextField
                                            onChange={e => setPassword(e.target.value)}
                                            disabled={isEdit}
                                            id="userPassword"
                                            name="userPassword"
                                            type='password'
                                            label="รหัสผ่าน"
                                            sx={isEdit ? {display: 'none' } : {display: '', width: 265 }}
                                            value={isPassword === null ? '' : isPassword}
                                            />
                                            <Button variant="contained" color="success" sx={isEdit ? {display: 'none' } : {display: '', width: 110 }} onClick={update}>
                                                บันทึกข้อมูล
                                            </Button>
                                            <Button variant="outlined" color="error" sx={isEdit ? {display: 'none' } : {display: '', width: 110 }} onClick={cancel}>
                                                ยกเลิก
                                            </Button>
                                        </Stack>
                                    </div>
                                </div>
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
                                        // disableRowSelectionOnClick
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