import { React, useState, useEffect } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

import ts from '../../assets/icon/timesheet.png';
import ld from '../../assets/icon/leave.png';
import al from '../../assets/icon/angle-left.png';
import ar from '../../assets/icon/angle-right.png';


function Content(props) {

    const ip = props.ip;
    const [isOverview, setOverview] = useState([{
        emp:0,
        ta:0,
        nta:0,
        lta:0,
        ld:0,
        bld:0,
        hld:0,
        sld:0,
        wd:0,
        hd:0
    }]);

    useEffect(() => {
        axios.get("http://"+ ip +":5000/overview", {crossdomain: true})
        .then(response => {
            setOverview(response.data);
        });
    }, [ip]);


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
                        height: 200,
                        },
                    }}
                    >
                        <Paper />
                        <Paper />
                        <Paper />
                </Box>
                </div>
                <h1>Hello</h1>
            </div>
        </>
    );
};

export default Content;