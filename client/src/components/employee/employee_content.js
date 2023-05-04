import { React, useState, useEffect } from 'react';
import axios from 'axios';
import EmployeeCard from './emp_card';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { DataGrid } from '@mui/x-data-grid';

function Content(props) {

    const ip = props.ip;
    const [isEmployee, setEmployee] = useState([]);
    const [isEmpid, setEmpid] = useState('');

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
        { field: 'id',  headerName: 'รหัส',  width: 120, headerAlign: 'center', align: 'center', disableColumnMenu: true },
        { field: 'emp_name', headerName: 'ชื่อ', width: 150, headerAlign: 'center', align: 'center', disableColumnMenu: true },
        { field: 'emp_surname', headerName: 'นามสกุล', width: 150, headerAlign: 'center', align: 'center', disableColumnMenu: true },
        { field: 'dept_name', headerName: 'แผนก', width: 120, headerAlign: 'center', align: 'center', disableColumnMenu: true }
    ];

    const handleCellClick = (params) => {
        isEmployee.map((item) => {
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