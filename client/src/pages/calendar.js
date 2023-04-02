import { React, useContext, useState, useEffect } from 'react';
import '../assets/style/calendar.css';
import CalendarInfo from '../components/calendar/ca_date';
import CalendarTable from '../components/calendar/ca_table';
import IpContext from '../ipContext';


function Calendar() {

    const [isUsertype, setUsertype] = useState(1)

    const ip = useContext(IpContext);
    const [isUpdate, setUpdate] = useState(false);

    return (
        <>
            {
                isUsertype === 1 || isUsertype === 2 ?  
                [<div className='box-content'><CalendarInfo data={[ip, isUpdate]}/></div>,
                <div className='box-content'><CalendarTable data={[ip, isUpdate, setUpdate]}/></div>]
                :
                <div className='box-content'><CalendarInfo data={[ip, isUpdate]}/></div>
            }
        </>
    );
};

export default Calendar;