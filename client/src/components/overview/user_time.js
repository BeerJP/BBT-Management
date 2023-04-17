import { React, useEffect, useState } from 'react';
import axios from 'axios';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { DataGrid } from '@mui/x-data-grid';


function UserSheetInfo(props) {

    const ip = props.ip;
    const emp = props.emp;


    const [isTimesheet, setTimesheet] = useState([]);
    const [isAlltime, setAlltime] = useState([]);
    const [isCurrent, setCurrent] = useState([]);
    const [isTimesort, setTimesort] = useState(1);

    useEffect(() => {
        setTimesheet([])
        setAlltime([])
        setCurrent([])
        const getAll = () => {
            axios.post("http://"+ ip +":5000/timesheet", { id: emp }, {crossdomain: true})
            .then(response => {
                setAlltime(response.data);
            });
        };
        const getCur = () => {
            axios.post("http://"+ ip +":5000/timesheet_current", { id: emp }, {crossdomain: true})
            .then(response => {
                setCurrent(response.data);
                setTimesheet(response.data);
            });
        };
        getAll();
        getCur();
    }, [emp, ip]);

    useEffect(() => {
        if (isTimesort === '1') {
            setTimesheet(isCurrent)
        } else {
            setTimesheet(isAlltime)
        }
    }, [isTimesort])

    const columns = [
        { field: 'th_date', headerName: 'วันที่',  width: 150, headerAlign: 'center', align: 'center', disableColumnMenu: false },
        { field: 'time_in', headerName: 'เวลาเข้างาน', width: 130, headerAlign: 'center', align: 'center', disableColumnMenu: true },
        { field: 'time_out', headerName: 'เวลาออกงาน', width: 130, headerAlign: 'center', align: 'center', disableColumnMenu: true },
        {
            field: 'time_state',
            headerAlign: 'center',
            align: 'center',
            headerName: '',
            width: 150,
            sortable: false,
            disableClickEventBubbling: true,
            disableColumnMenu: true,
            renderHeader: (params) => (
                <Stack direction="row" spacing={2}>
                    <select className='ov-text-box ov-select-box' name="type" id="combotype" onChange={(event => {setTimesort(event.target.value)})}>
                        <option value="1">ปัจจุบัน</option>
                        <option value="2">ทั้งหมด</option>
                    </select>
                </Stack>
            ),
        }
    ];


    return (
        <>
            <Paper elevation={0} sx={{ display: 'flex' }}>
                <Box sx={{ height: 776, width: '100%', }}>
                    <DataGrid
                    sx={{
                        "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
                            outline: "none !important",
                        },
                    }}
                    rows={isTimesheet}
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

export default UserSheetInfo;