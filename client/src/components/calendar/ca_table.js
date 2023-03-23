import { React, useState, useEffect } from 'react';
import axios from 'axios';


function CalendarTable() {

    const ca = new Date();
    const dd = String(ca.getDate()).padStart(2, '0');
    const mm = String(ca.getMonth() + 1).padStart(2, '0');
    const yyyy = ca.getFullYear() + 543;
    const tomorrow = yyyy + mm + (parseInt(dd) + 1);

    const [workDay, setWorkday] = useState([{
        work_id: '',
        work_date: '',
        work_status: ''
    }]);
    const [holiDay, setHoliday] = useState([]);
    const [holiName, setHoliname] = useState();
    const [holiDate, setHolidate] = useState(tomorrow);

    const getHoliday = async() => {
        await axios.get("http://localhost:5000/holiday", {crossdomain: true})
        .then(response => {
            setHoliday(response.data);
        });
    };

    const getWorkday = async() => {
        await axios.get("http://localhost:5000/workday", {crossdomain: true})
        .then(response => {
            setWorkday(response.data);
        });
    };

    const insertHoliday = () => {
        axios.post("http://localhost:5000/add_holiday", { name: holiName, date: holiDate }, {crossdomain: true})
        .then(axios.put("http://localhost:5000/update_work", { date: holiDate }, {crossdomain: true}))
    };

    useEffect(() => {
        getWorkday();
        getHoliday();
    }, []);

    // const ca = new Date();
    // const monthName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    // const year = new Date(ca.getFullYear(), ca.getMonth() + 0).getFullYear() + 543;
    // const month = new Date(ca.getFullYear(), ca.getMonth() + 0).toLocaleString('en-US', {month:'long'});
    // const dayInMonth = new Date(ca.getFullYear(), ca.getMonth() + 1, 0).getDate();
    // const dayNextMonth = new Date(ca.getFullYear(), ca.getMonth() + 2, 0).getDate();
    // const dateId = year + "-" + (monthName.indexOf(month.substring(0, 3)) + 1);
    // const ndateId = year + "-" + (monthName.indexOf(month.substring(0, 3)) + 2);

    // const inMonth =[], next = [];

    // for (var d = 0; d < dayInMonth; d++){
    //     inMonth[d] = moment(dateId + "-" + (d + 1), 'YYYY-MM-DD').format('YYYY-MM-DD');
    // };

    // for (var n = 0; n < dayNextMonth; n++){
    //     next[n] = moment(ndateId + "-" + (n + 1), 'YYYY-MM-DD').format('YYYY-MM-DD');
    // };

    // const comboboxDate = [...inMonth, ...next]

    return (
        <>
            <div className='box-body ca-body-bottom'>
                <div className='ca-box-content'>
                    <div className='ca-header'>
                        <p className='ca-name'>วันหยุด</p>
                        <p className='ca-date'>วันที่</p>
                    </div>
                    <div className='ca-content'>
                        {
                            holiDay.map((item, index) => (
                                <div className='ca-table-info' key={index}>
                                    <p className="ca-name">{item.holi_name}</p>
                                    <p className="ca-date">{item.work_date}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className='box-body ca-box-set'>
                <div className='ca-header'>
                    <p>จัดการวันหยุด</p>
                </div>
                <div className='lb-box-long ca-sett'>
                    <div className='ca-sett-input'>
                        <label>วันหยุด</label>
                        <input onChange={(event => {
                            setHoliname(event.target.value)
                        })}></input>
                    </div>
                </div>
                <div className='lb-box-long ca-sett'>
                    <div className='ca-sett-input'>
                        <label>วันที่</label>
                        <select name="date" id="date" onChange={(event => {
                            setHolidate(event.target.value)
                        })}>
                            {
                                workDay.map((item, index) => (
                                    <option key={item.work_date} value={item.work_id}>{item.work_date}</option>
                                ))
                            }
                        </select>
                    </div>
                    {/* <div className='ca-sett-input'>
                        <label>วันที่สิ้นสุด</label>
                        <select name="date" id="date" onChange={(event => {
                            setEnd(event.target.value)
                        })}>
                            {
                              comboboxDate.map((item, index) => (
                                    <option key={item} value={item}>{item}</option>
                                ))
                            }
                        </select>
                    </div> */}
                </div>
                <div className='lb-box-long ca-sett'>
                    <div className='ca-sett-submit'>
                        <button onClick={insertHoliday}>บันทึก</button>
                        <button>ลบ</button>
                    </div>               
                </div>
            </div>
        </>
    );
};

export default CalendarTable;