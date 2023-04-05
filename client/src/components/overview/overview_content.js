import { React, useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { DataGrid } from '@mui/x-data-grid';
import { PieChart, Pie, Cell } from 'recharts';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import Button from '@mui/material-next/Button';


import ts from '../../assets/icon/timesheet.png';
import ld from '../../assets/icon/leave.png';
import al from '../../assets/icon/angle-left.png';
import ar from '../../assets/icon/angle-right.png';


function Content(props) {

    const ip = props.ip;
    const [isWork, setWork] = useState([
        {value: 0}, {value: 0}
    ])
    const [isTime, setTime] = useState([
        {value: 0}, {value: 0}
    ])
    const [isLeav, setLeav] = useState([
        {value: 0}, {value: 0}, {value: 0}
    ])
    const [isOverview, setOverview] = useState({
        emp:0, ta:0, nta:0, lta:0, ld:0, bld:0, hld:0, sld:0, wd:0, hd:0
    });
    const [timeSheet, setTimesheet] = useState([{
        id: ' ', emp_name: ' ', emp_surname: ' ', emp_startdate: ' ', ta: ' ', ld: ' '
    }]);

    useEffect(() => {
        axios.get("http://"+ ip +":5000/overview", {crossdomain: true})
        .then(response => {
            setOverview(response.data[0])

            setWork([
                {value: response.data[0].wd},
                {value: response.data[0].hd}
            ])

            setTime([
                {value: response.data[0].nta},
                {value: response.data[0].lta}
            ])

            setLeav([
                {value: response.data[0].bld},
                {value: response.data[0].hld},
                {value: response.data[0].sld}
            ])
        });

        axios.get("http://"+ ip +":5000/timecount", {crossdomain: true})
        .then(response => {
            setTimesheet(response.data);
        });

    }, [ip]);

    const data = [
        { name: 'Group A', value: 400 },
        { name: 'Group B', value: 300 },
        { name: 'Group C', value: 300 },
    ];
    
    const workColors = ['#0088FE', '#FFBB28'];
    const timeColors = ['#00C49F', '#FF8042'];
    const leavColors = ['#0088FE', '#00C49F', '#FFBB28'];

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
            field: 'department',
            headerName: 'แผนก',
            width: 190,
            headerAlign: 'center',
            align: 'center',
            disableColumnMenu: true
        },
        {
            field: 'emp_startdate',
            headerName: 'วันเริ่มงาน',
            type: 'number',
            width: 130,
            headerAlign: 'center',
            align: 'center',
            disableColumnMenu: true
        },
        {
            field: 'ta',
            headerName: 'วันทำงาน',
            type: 'number',
            width: 130,
            headerAlign: 'center',
            align: 'center',
            disableColumnMenu: true,
            sortable: false
        },
        {
            field: 'ld',
            headerName: 'วันลางาน',
            type: 'number',
            width: 130,
            headerAlign: 'center',
            align: 'center',
            disableColumnMenu: true,
            sortable: false
        }
    ];
      

    return(
        <>
            <div className='overview_container'>
                <div className='overview_article'>
                    <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',    
                        '& > :not(style)': {
                        m: 0.2,
                        minWidth: 250,
                        width: 390,
                        height: 300,
                        },
                    }}
                    >
                        <Paper sx={{ display: 'flex' }}>
                            <label className='overview_chart_header'>ข้อมูลวันทำงาน</label>
                            <PieChart width={260} height={300}>
                                <Pie
                                data={isWork}
                                cx={120}
                                cy={150}
                                innerRadius={0}
                                outerRadius={100}
                                fill="#8884d8"
                                paddingAngle={2}
                                dataKey="value"
                                >
                                {isWork.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={workColors[index % workColors.length]} />
                                ))}
                                </Pie>
                            </PieChart>
                            <div className='overview_chart_box'>
                                <h4>วันทำงาน</h4>
                                <label style={{color: '#0088FE'}}>{isOverview.wd + ' วัน'}</label>
                                <h4>วันหยุด</h4>
                                <label style={{color: '#FFBB28'}}>{isOverview.hd + ' วัน'}</label>
                            </div>
                        </Paper>
                        <Paper sx={{ display: 'flex' }}>
                            <label className='overview_chart_header'>ข้อมูลใบบันทึกเวลา</label>
                            <PieChart width={260} height={300}>
                                <Pie
                                data={isWork}
                                cx={120}
                                cy={150}
                                innerRadius={0}
                                outerRadius={100}
                                fill="#8884d8"
                                paddingAngle={2}
                                dataKey="value"
                                >
                                {isWork.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={timeColors[index % timeColors.length]} />
                                ))}
                                </Pie>
                            </PieChart>
                            <div className='overview_chart_box'>
                                <h4>ปกติ</h4>
                                <label style={{color: '#00C49F'}}>{isOverview.wd + ' วัน'}</label>
                                <h4>สาย</h4>
                                <label style={{color: '#FF8042'}}>{isOverview.hd + ' วัน'}</label>
                            </div>
                        </Paper>
                        <Paper sx={{ display: 'flex', position: 'relative'}}>
                            <label className='overview_chart_header'>ข้อมูลใบลา</label>
                            <PieChart width={260} height={300}>
                                <Pie
                                data={data}
                                cx={120}
                                cy={150}
                                innerRadius={0}
                                outerRadius={100}
                                fill="#8884d8"
                                paddingAngle={2}
                                dataKey="value"
                                >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={leavColors[index % leavColors.length]} />
                                ))}
                                </Pie>
                            </PieChart>
                            <div className='overview_chart_box_three'>
                                <h4>ลากิจ</h4>
                                <label style={{color: '#0088FE'}}>{isOverview.wd + ' วัน'}</label>
                                <h4>ลาพักร้อน</h4>
                                <label style={{color: '#FF8042'}}>{isOverview.hd + ' วัน'}</label>
                                <h4>ลาป่วย</h4>
                                <label style={{color: '#FF8042'}}>{isOverview.hd + ' วัน'}</label>
                            </div>
                        </Paper>
                    </Box>
                </div>
                <div className='year_picker'>
                    <div>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker']}>
                                <DatePicker label={'เลือกปี'} views={['year']} />
                            </DemoContainer>
                        </LocalizationProvider>
                    </div>
                    <div className='clear_button'>
                        <Button variant="contained" size="small" sx={{
                            borderRadius: 'none',
                            height: 52,
                            width: 95,
                            marginTop: 1,
                            marginLeft: 0.5
                        }}>
                            ล้างข้อมูล
                        </Button>
                    </div>
                    </div>
                <div className='overview_table_box'>
                    <Box sx={{ height: '100%', width: '100%' }}>
                        <DataGrid
                            rows={timeSheet}
                            columns={columns}
                            columnHeaderHeight={93}
                            initialState={{
                            pagination: {
                                paginationModel: {
                                pageSize: 6,
                                },
                            },
                            }}
                            pageSizeOptions={[6]}
                            disableRowSelectionOnClick
                        />
                    </Box>
                </div>
            </div>
        </>
    );
};

export default Content;