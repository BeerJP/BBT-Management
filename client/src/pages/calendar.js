import { React, useContext } from 'react';
import '../assets/style/calendar.css';
import CalendarInfo from '../components/calendar/ca_date';
import CalendarTable from '../components/calendar/ca_table';
import IpContext from '../ipContext';


function Calendar() {

    const ip = useContext(IpContext);

    return (
        <>
            <div className='box-content'>
                <CalendarInfo/>
            </div>
            <div className='box-content'>
                <CalendarTable data={ip}/>
            </div>
        </>
    );
};

export default Calendar;