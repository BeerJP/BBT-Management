import { React, useState } from 'react';
import CalendarInfo from '../calendar/ca_date';
import UserSheetInfo from './user_time'
import UserLeaveInfo from './user_leave'

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';



function Content(props) {

    const ip = props.ip;
    const emp = props.user;

    const [isCard, setCard] =useState('time')
    const selectTime = () => { setCard('time'); };
    const selectLeave = () => { setCard('leave'); };

    return(
        <>
            <div className='overview_container'>
                <div className='overview_article'>
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
                        <Paper elevation={1} sx={{ display: 'flex', flexDirection: 'column' }}>
                            <AppBar position="static">
                                <Toolbar>
                                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}></Typography>
                                    <Typography id="modal-modal-description" sx={{ textAlign: 'center'}} >
                                        <Button variant="outlined" color="inherit" size="normal" sx={{ mr: 1, width: 120 }}
                                        onClick={selectTime}>ใบบันทึกเวลา</Button>
                                        <Button variant="outlined" color="inherit" size="normal" sx={{ ml: 1, width: 120 }}
                                        onClick={selectLeave}>ใบลา</Button>
                                    </Typography>
                                </Toolbar>
                            </AppBar>
                            {
                                isCard === 'time' ?
                                <UserSheetInfo ip={ip} emp={emp} />
                                :
                                <UserLeaveInfo ip={ip} emp={emp} />
                            }
                        </Paper>
                    </Box>
                </div>
            </div>
        </>
    );
};

export default Content;