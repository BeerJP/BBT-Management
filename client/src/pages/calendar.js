import { React, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import '../assets/style/calendar.css';
import CalendarInfo from '../components/calendar/ca_date';
import CalendarTable from '../components/calendar/ca_table';
import IpContext from '../ipContext';


function Calendar() {

    const ip = useContext(IpContext);
    const [isUserid, setUserid] = useState(0)
    const [isTypeid, setTypeid] = useState(0)

    const [isUpdate, setUpdate] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.post("http://"+ ip +":5000/session", {
            token: token
        }, {crossdomain: true})
        .then(response => {
            if (response.data.user_id) {
                setUserid(response.data.user_id)
                setTypeid(response.data.type_id)
            } 
            else {
                localStorage.removeItem('token')
                window.location = '/login';
            }
        });
    }, []);

    return (
        <>
            {
                isTypeid === 1 || isTypeid === 2 ?  
                [<div className='box-content' key='1'><CalendarInfo data={[ip, isUpdate]}/></div>,
                <div className='box-content' key='2'><CalendarTable data={[ip, isUpdate, setUpdate]}/></div>]
                :
                <div className='box-content' key='3'><CalendarInfo data={[ip, isUpdate]}/></div>
            }
        </>
    );
};

export default Calendar;