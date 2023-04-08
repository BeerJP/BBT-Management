import { React, useState, useEffect } from 'react';
import axios from 'axios';
import EmployeeCard from './emp_card';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

import AppBar from "@mui/material/AppBar";
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
    const [isEmployee, setEmployee] = useState([{ id: ' ', emp_name: ' ', emp_surname: ' ', dept_name: ' ' }]);
    const [isEmpid, setEmpid] = useState('');

    const [deptInfo, setDeptinfo] = useState([{ dept_id: ' ', dept_name: ' ' }]);
    const [typeInfo, setTypeinfo] = useState([{ label: ' ', id: ' ' }]);

    useEffect(() => {

        const getEmp = async() => {

            await axios.get("http://"+ ip +":5000/employee_table", {crossdomain: true})
            .then(response => {
                setEmployee(response.data)
            });
        }

        getEmp();

    }, [ip, isEmpid]);


    const columns = [
        { field: 'id',  headerName: 'รหัส',  width: 130, headerAlign: 'center', align: 'center', disableColumnMenu: true },
        { field: 'emp_name', headerName: 'ชื่อ', width: 190, headerAlign: 'center', align: 'center', disableColumnMenu: true },
        { field: 'emp_surname', headerName: 'นามสกุล', width: 190, headerAlign: 'center', align: 'center', disableColumnMenu: true },
        { field: 'dept_name', headerName: 'แผนก', width: 190, headerAlign: 'center', align: 'center', disableColumnMenu: true }
    ];

    const handleCellClick = (params) => {
        const selectedRow = isEmployee.map((item, index) => {
            if (item.id === params.row.id) {
                setEmpid(item.id)
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
                            width: { sm: 570, lg: 570
                            },
                            height: { sm: 840, lg: 840
                            },
                            margin:'auto',
                            marginBottom: 1
                            },
                        }}
                        >
                            <Paper elevation={1} sx={{ display: 'flex', flexDirection: 'column' }}>
                                <EmployeeCard ip={ip} select={[isEmpid, setEmpid]} />
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