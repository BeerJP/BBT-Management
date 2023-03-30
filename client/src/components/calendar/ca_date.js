import { React } from 'react';
import { useState } from 'react';
import right from '../../assets/icon/angle-right.png';
import left from '../../assets/icon/angle-left.png';


function CalendarDate() {

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
    const dateId = year + '-' + (monthName.indexOf(month.substring(0, 3)) + 1);
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

    return (
        <>
            <div className='box-body ca-body-date'>
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
                                <li className="this-month" key={day} id={dateId + "-" + day}>{day}</li>   
                        ))}
                        {
                            next.map((nday) => (
                                <li key={nday}>{nday}</li>
                        ))}
                        </ul>
                    </div>
                </div>
            </div>
            {/* <div className='box-body ca-body-bottom'>
                <div className='ca-box-content'>
                    <div className='ca-header'>
                        <p className='ca-name'>วันหยุด</p>
                        <p className='ca-date'>วันที่</p>
                    </div>
                    <div className='ca-content'>
                        {
                            emp.map((item, index) => (
                                <div className='ca-content-info' key={index}>
                                    <p className="ca-name">{item.date}</p>
                                    <p className="ca-date">{item.timeIn}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div> */}
        </>
    );
};

export default CalendarDate;