import { React, useState, useEffect } from 'react';
import axios from 'axios';
import right from '../../assets/icon/angle-right.png';
import left from '../../assets/icon/angle-left.png';

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Card from '@mui/material/Card';



function CalendarDate(props) {

    const ip = props.ip;
    const update = props.update;

    const [isHoliday, setHoliday] = useState([]);
    const [isList, setList] = useState();

    useEffect(() => {
        const getHoliday = () => {
            axios.get("http://"+ ip +":5000/holiday", {crossdomain: true})
            .then(response => {
                setHoliday(response.data);
            });
        };
        getHoliday();
    }, [ip, update]);

    const ca = new Date();
    const monthName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const weekday_th = ['อา.', 'จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.'];

    const [count ,setCount] = useState(0);
    const plus = () => setCount (count + 1);
    const minus = () => setCount (count - 1);

    const year = new Date(ca.getFullYear(), ca.getMonth() + count).getFullYear() + 543;
    const month = new Date(ca.getFullYear(), ca.getMonth() + count).toLocaleString('en-US', {month:'long'});
    const day = new Date(ca.getFullYear(), ca.getMonth() + count, 1).toLocaleString('en-US', {weekday:'long'});
    const dayInMonth = new Date(ca.getFullYear(), ca.getMonth() + 1 + count, 0).getDate();
    const previousDayInMonth = new Date(ca.getFullYear(), ca.getMonth() + count, 0).getDate();
    const lastDay = weekday.indexOf(day);
    const dateId = year + '' + (monthName.indexOf(month.substring(0, 3)) + 1).toString().padStart(2, '0');
    const thMonth = new Date(ca.getFullYear(), ca.getMonth() + count).toLocaleString('th-TH', {month: 'long'});

    const inMonth =[], previous = [], next = [];

    for (var d = 0; d < dayInMonth; d++){
        inMonth[d] = d + 1;
    };

    for (var p = 0; p < lastDay; p++){
        previous[p] = p + (previousDayInMonth - lastDay) + 1;
    };

    for (var n = 0; n < 42 - (inMonth.length + previous.length); n++){
        next[n] = n + 1;
    };


    useEffect(() => {

        const hc = document.querySelectorAll("[class='this-month']");
        const hd = [...hc].map(input => input.id);
        const hb = [...isHoliday].map(input => input.work_id);

        var list = [];

        const color = hd.map(function(id) {
            if (hb.includes(id)){
                document.getElementById(id).style.background = "#F1948A"

                var result = isHoliday.find(obj => {
                    return obj.work_id === id
                })

                list.push(result)
                
            } else {
                document.getElementById(id).style.background = "white"
            }
        })

        setList(list)

    }, [count, isHoliday]);


    return (
        <>  
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        ตารางทำงาน
                    </Typography>
                </Toolbar>
            </AppBar>
            <div className='ca-body-date'>
                <div className="calendar">
                    <div className="ca-menu">
                        <button onClick={minus}><img src={left} alt=""/></button>
                        <div className="ca-label">
                            <label>{thMonth}</label>
                            <label>{year}</label>
                        </div>
                        <button onClick={plus}><img src={right} alt=""/></button>
                    </div>
                    <div className="ca-content">
                        <ul className="weekdays">
                        {   
                            weekday_th.map((wday) =>(
                                <li key={wday}>{wday.substring(0, 3)}</li>
                        ))}
                        </ul>
                        <ul className="day-grid">
                        {
                            previous.map((pday) => (
                                <li key={pday}>{pday}</li>   
                        ))}
                        {
                            inMonth.map((day) => (
                                <li className="this-month" 
                                key={day} id={dateId + '' + day.toString().padStart(2, '0')}
                                >{day}</li>   
                        ))}
                        {
                            next.map((nday) => (
                                <li key={nday}>{nday}</li>
                        ))}
                        </ul>
                    </div>
                </div>
            </div>
            <Card sx={{ height: '90%' }}>
                <ul className='list-holiday'>
                    {
                        isList === undefined ? '':
                        isList.map((item) => (
                            <li key={item.work_id}>{item.work_id.substring(6) + ' ' + item.holi_name}</li>
                        ))
                    }
                </ul> 
            </Card>
        </>
    );
};

export default CalendarDate;