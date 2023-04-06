import { React, useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';

import ui from '../../assets/icon/user-line.png';
import ua from '../../assets/icon/user-add.png';
import ue from '../../assets/icon/edit.png';
// import InfoCard from './emp_info';
// import AddCard from './emp_add';
// import EditCard from './emp_update';


function Content(props) {

    const ip = props.ip;

    // const [employee, setEmployee] = useState();
    // const infoEmp = () => { setCard('infomation'); };
    // const addEmp = () => { setCard('add'); };
    // const editEmp = () => { setCard('edit'); };

    // useEffect(() => {
    //     if (selectEmp){
    //         axios.post("http://"+ ip +":5000/employee_info", {
    //             id: selectEmp
    //         },
    //          {crossdomain: true})
    //         .then(response => {
    //             setEmployee(response.data);
    //         });
    //     }
    // }, [ip, selectEmp]);

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
                            <Paper elevation={1} sx={{ display: 'flex' }}>
                                <Box>

                                </Box>
                            </Paper>
                            <Paper elevation={2} sx={{ display: 'flex' }}>
                                <Box>
                                    
                                </Box>
                            </Paper>
                        </Box>
                    </div>
            </div>
        </>
    );
};

export default Content;