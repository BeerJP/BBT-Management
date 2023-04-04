import { React, useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';


function AdminContent2(props) {

    const ip = props.data;
    const [timeSheet, setTimesheet] = useState([{
        id: ' ',
        emp_name: ' ',
        emp_surname: ' ',
        emp_startdate: ' ',
        ta: ' ',
        ld: ' '
    }]);
    
    useEffect(() => {
        axios.get("http://"+ ip +":5000/timecount", {crossdomain: true})
        .then(response => {
            setTimesheet(response.data);
        });
    }, [ip]);

    const columns = [
        {   field: 'id',
            headerName: 'รหัส', 
            width: 110,
            headerAlign: 'center',
            align: 'center',
            disableColumnMenu: true
        },  
        {
            field: 'fullName',
            headerName: 'ชื่อ - สกุล',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 200,
            headerAlign: 'center',
            align: 'center',
            valueGetter: (params) =>
              `${params.row.emp_name || ''} ${params.row.emp_surname || ''}`,
          },
        {
            field: 'emp_startdate',
            headerName: 'วันเริ่มงาน',
            type: 'number',
            width: 120,
            headerAlign: 'center',
            align: 'center',
            disableColumnMenu: true
        },
        {
            field: 'ta',
            headerName: 'วันทำงาน',
            type: 'number',
            sortable: false,
            width: 110,
            headerAlign: 'center',
            align: 'center',
            disableColumnMenu: true
        },
        {
            field: 'ld',
            headerName: 'วันลางาน',
            type: 'number',
            sortable: false,
            headerAlign: 'center',
            width: 110,
            align: 'center',
            disableColumnMenu: true
        },
    ];
    
    
    return (
        <>
            <div className='box-body ov-body-2'>
                <Box sx={{ height: '100%', width: '100%' }}>
                    <DataGrid
                        columnHeaderHeight={80}
                        rows={timeSheet}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                pageSize: 13,
                            },
                        },
                        }}
                        pageSizeOptions={[5]}
                        disableRowSelectionOnClick
                    />
                </Box>
            </div>
            {/* <div className='box-body ov-body-2'>
                <div className='ov-content-3'>
                    <div className='ov-header-3'>
                        <p className='left'>รหัส</p>
                        <p className='center-name'>ชื่อ - สกุล</p>
                        <p className='center'>วันเริ่มงาน</p>
                        <p className='center'>วันทำงาน</p>
                        <p className='center'>วันลางาน</p>
                    </div>
                    <div className='ov-content-4'>
                        {
                            timeSheet.map((item, index) => (
                                <div className='ov-content-emp' key={index}>
                                    <p className='left'>{item.emp_id}</p>
                                    <p>{item.emp_name + " " + item.emp_surname}</p>
                                    <p className="center">{item.emp_startdate}</p>
                                    <p className="center">{item.ta}</p>
                                    <p className="center">{item.ld}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div> */}
        </>
    );
};

export default AdminContent2;