import { React, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import '../assets/style/calendar.css';
// import CalendarInfo from '../components/calendar/ca_date';
// import CalendarTable from '../components/calendar/ca_table';
import Content from '../components/calendar/calendar_content';
import IpContext from '../ipContext';


function Calendar() {

    const ip = useContext(IpContext);
    const [isTypeid, setTypeid] = useState('')

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.post("http://"+ ip +":5000/session", {
            token: token
        }, {crossdomain: true})
        .then(response => {
            if (response.data.user_id) {
                setTypeid(response.data.type_id)
            }
            else {
                setTypeid(0)
                localStorage.removeItem('token')
                window.location.href ='/login'
            }
        });
    }, [ip]);

    if (isTypeid === 1) {
        return (
            <>
                <div className='container'>
                    <Content ip={ip}/>
                </div>
            </>
        )
    } else if (isTypeid === 0) {
        return (
            <>
                {
                    window.location.href ='/'
                }
            </>
        )
    }
};

export default Calendar;