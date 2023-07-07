import { React, useState, useEffect } from 'react';
import ReportDate from './report_date';
import ReportMont from './report_month';
import ReportYear from './report_year';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";


function Content(props) {

    const ip = props.ip;
    const [isTypeselect, setTypeselect] = useState('1');

    return(
        <> 
            <div className='report_container'>
                <div className='report_article'>
                    <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        '& > :not(style)': {
                        m: 0.2,
                        width: '100%',
                        height: '100%',
                        },
                    }}
                    >
                        <Paper elevation={0} sx={{ display: 'flex'}}>
                            <AppBar position='static' color='inherit'>
                                <Toolbar>
                                    <Typography variant='h7' component='div' sx={{ flexGrow: 9 }}>
                                        รายงานสรุปการทำงาน
                                    </Typography>
                                    <Typography variant='h7' component='div' sx={{ flexGrow: 1, textAlign: 'right' }}>
                                        <select className='le-text-box le-select-box' name="type" id="combotype" onChange={(event => {setTypeselect(event.target.value)})}>
                                            <option value="1">ปี</option>
                                            <option value="2">เดือน</option>
                                            <option value="3">วัน</option>
                                        </select>
                                    </Typography>
                                </Toolbar>
                            </AppBar>
                        </Paper>
                    </Box>
                    <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        overflow: 'hidden',
                        overflowY: 'auto',
                        '& > :not(style)': {
                        m: 0.2,
                        width: '100%',
                        height: {
                            sm: 1000,
                            md: 630,
                            lg: 820
                        },
                        },
                    }}
                    >
                        {
                            isTypeselect === '1' ?
                            <ReportYear ip={ip}/>
                            :
                            isTypeselect === '2' ?
                            <ReportMont ip={ip}/>
                            :
                            <ReportDate ip={ip}/>
                        }
                    </Box>
                </div>
            </div>
        </>
    );
};

export default Content;