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
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';


import ui from '../../assets/icon/user-line.png';
import ua from '../../assets/icon/user-add.png';
import ue from '../../assets/icon/edit.png';
// import InfoCard from './emp_info';
// import AddCard from './emp_add';
// import EditCard from './emp_update';


function Content(props) {

    const ip = props.ip;

    const [isEmployee, setEmployee] = useState([{
        id: ' ',
        emp_id: ' ',
        emp_name: ' ',
        emp_surname: ' ',
        emp_gender: ' ',
        emp_birthdate: ' ',
        emp_status: ' ',
        emp_startdate: ' ',
        emp_enddate: ' ',
        emp_mac1: ' ',
        emp_mac2: ' ',
        dept_id: ' ',
        dept_name: ' ',
        user_name: ' ',
        user_password: ' ',
        type_id: ' ',
        type_name: ' ',
        emp_age: ' '
    }]);

    const [isSelect, setSelect] = useState({
        emp_id: ' ',
        emp_name: ' ',
        emp_surname: ' ',
        emp_gender: ' ',
        emp_birthdate: ' ',
        emp_startdate: ' ',
        emp_enddate: ' ',
        emp_mac1: ' ',
        emp_mac2: ' ',
        dept_id: ' ',
        dept_name: ' ',
        user_name: ' ',
        type_id: ' ',
        type_name: ' ',
        emp_age: ' '
    });
    // const infoEmp = () => { setCard('infomation'); };
    // const addEmp = () => { setCard('add'); };
    // const editEmp = () => { setCard('edit'); };

    useEffect(() => {

        axios.get("http://"+ ip +":5000/employee", {crossdomain: true})
        .then(response => {
            setEmployee(response.data)
        })

    }, [ip]);
    
    const columns = [
        { 
            field: 'id', 
            headerName: 'รหัส', 
            width: 130,
            headerAlign: 'center',
            align: 'center',
            disableColumnMenu: true
        },
        {
            field: 'emp_name',
            headerName: 'ชื่อ',
            width: 190,
            headerAlign: 'center',
            align: 'center',
            disableColumnMenu: true
        },
        {
            field: 'emp_surname',
            headerName: 'นามสกุล',
            width: 190,
            headerAlign: 'center',
            align: 'center',
            disableColumnMenu: true
        },
        {
            field: 'dept_name',
            headerName: 'แผนก',
            width: 190,
            headerAlign: 'center',
            align: 'center',
            disableColumnMenu: true
        }
    ];

    const handleCellClick = (params) => {
        const selectedRow = isEmployee.map((item, index) => {
            if (item.emp_id === params.row.emp_id) {
                setSelect(isEmployee[index])
            }
        })
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
                            width: {
                                sm: 570,
                                md: 840,
                                lg: 570
                            },
                            height: {
                                sm: 840,
                                md: 570,
                                lg: 840
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
                                        <Button color="inherit" disabled={true}>แก้ไขข้อมูล</Button>
                                        <Button color="inherit">เพิ่มข้อมูล</Button>
                                    </Toolbar>
                                </AppBar>
                                <div className='employee_card'>
                                    <div>
                                        <Grid container spacing={3} padding={1}>
                                            <Grid item xs={12} sm={6}>
                                            <TextField
                                                disabled={true}
                                                id="firstName"
                                                name="firstName"
                                                label="ชื่อ"
                                                fullWidth
                                                value={isSelect.emp_name}
                                                margin="normal"
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                            <TextField
                                                disabled={true}
                                                id="lastName"
                                                name="lastName"
                                                label="นามสกุล"
                                                fullWidth
                                                value={isSelect.emp_surname}
                                                margin="normal"
                                            />
                                            </Grid>
                                            <Grid item lg={6} md={4} sm={6}>
                                            <TextField
                                                disabled={true}
                                                id="age"
                                                name="age"
                                                label="อายุ"
                                                fullWidth
                                                value={isSelect.emp_age}
                                                margin="normal"
                                            />
                                            </Grid>
                                            <Grid item lg={6} md={4} sm={6}>
                                            <TextField
                                                disabled={true}
                                                id="department"
                                                name="department"
                                                label="แผนก"
                                                fullWidth
                                                value={isSelect.dept_name}
                                                margin="normal"
                                            />
                                            </Grid>
                                            <Grid item lg={6} md={4} sm={6}>
                                            <TextField
                                                disabled={true}
                                                id="startDate"
                                                name="startDate"
                                                label="วันเริ่มงาน"
                                                fullWidth
                                                value={isSelect.emp_startdate}
                                                margin="normal"
                                            />
                                            </Grid>
                                            <Grid item lg={6} md={4} sm={6}>
                                            <TextField
                                                disabled={true}
                                                id="macAddress1"
                                                name="macAddress1"
                                                label="MAC Address1"
                                                fullWidth
                                                value={isSelect.emp_mac1}
                                                margin="normal"
                                            />
                                            </Grid>
                                            <Grid item lg={6} md={4} sm={6}>
                                            <TextField
                                                disabled={true}
                                                id="macAddress2"
                                                name="macAddress2"
                                                label="MAC Address2"
                                                fullWidth
                                                value={isSelect.emp_mac2 === null ? ' ' : isSelect.emp_mac2}
                                                margin="normal"
                                            />
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={3} padding={1}>
                                            <Grid item xs={12} sm={6}>
                                            <TextField
                                                disabled={true}
                                                id="userName"
                                                name="userName"
                                                label="ชื่อผู้ใช้งาน"
                                                fullWidth
                                                value={isSelect.user_name}
                                                margin="normal"
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                            <TextField
                                                disabled={true}
                                                id="userType"
                                                name="userType"
                                                label="ประเภทผู้ใช้งาน"
                                                fullWidth
                                                value={isSelect.type_name}
                                                margin="normal"
                                            />
                                            </Grid>
                                        </Grid>
                                        <Stack 
                                        direction="row" 
                                        spacing={2} 
                                        marginTop={3}
                                        justifyContent={'flex-end'}
                                        sx={{
                                            height: 50,
                                            padding: 1,
                                        }}
                                        >
                                            <Button variant="contained" color="success" sx={{display: 'none' }}>
                                                บันทึกข้อมูล
                                            </Button>
                                            <Button variant="outlined" color="error" sx={{display: 'none' }}>
                                                ยกเลิก
                                            </Button>
                                        </Stack>
                                    </div>
                                </div>
                            </Paper>
                            <Paper elevation={1} sx={{ display: 'flex' }}>
                                <Box sx={{ 
                                    height: '100%', 
                                    width: '100%',
                                    }}>
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