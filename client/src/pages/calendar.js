import { React } from 'react';
import '../assets/style/calendar.css';
import CalendarInfo from '../components/calendar/ca_date';


function Calendar() {

    return (
        <>
            <div className='box-content'>
                <CalendarInfo/>
            </div>
            <div className='box-content'>

            </div>
        </>
    );
};

export default Calendar;