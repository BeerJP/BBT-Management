import { React } from 'react';
import '../assets/style/calendar.css';
import CalendarInfo from '../components/calendar/ca_date';
import CalendarTable from '../components/calendar/ca_table';


function Calendar() {

    return (
        <>
            <div className='box-content'>
                <CalendarInfo/>
            </div>
            <div className='box-content'>
                <CalendarTable/>
            </div>
        </>
    );
};

export default Calendar;