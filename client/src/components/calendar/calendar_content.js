import { React, useState, useEffect } from 'react';
import axios from 'axios';
import CalendarInfo from './ca_date';

import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

function Content(props) {

    const ip = props.ip;

    const [workDay, setWorkday] = useState([{ id: '', work_id: '', work_date: '', work_status: '' }]);
    const [holiDay, setHoliday] = useState([{ id: '', work_id: '', work_date: '', work_status: '' }]);

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
    }, [ip]);

    const columns = [
        { field: 'th_date', headerName: 'วันที่', width: 150, headerAlign: 'center', align: 'center', disableColumnMenu: false },
        { field: 'holi_name', headerName: 'วันหยุด', width: 300, headerAlign: 'center', align: 'center', disableColumnMenu: true },
        {
            field: 'edit',
            headerAlign: 'center',
            align: 'center',
            headerName: '',
            width: 100,
            sortable: false,
            disableClickEventBubbling: true,
            disableColumnMenu: true,
            
            renderCell: (params) => {
                const onClick = (e) => {
                  const currentRow = params.row;
                //   setDate(currentRow.th_date)
                //   setIn(currentRow.time_in)
                //   setOut(currentRow.time_out)
                //   setWork(currentRow.work_id)
                //   setOpen(true)
                };
                
                return (
                  <Stack direction="row" spacing={2}>
                    <Button variant="outlined" color="warning" size="small" onClick={onClick}>แก้ไข</Button>
                  </Stack>
                );
            },
        }
    ];

    return (
        <>
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
                            <CalendarInfo ip={ip}/>
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