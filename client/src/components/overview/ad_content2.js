import { React, useState, useEffect } from 'react';
import axios from 'axios';
import moment from "moment";


function AdminContent2() {

    const [timeSheet, setTimesheet] = useState([]);
    
    useEffect(() => {
        axios.get("http://localhost:5000/timecount", {crossdomain: true})
        .then(response => {
            setTimesheet(response.data);
        });
    }, []);


    return (
        <>
            <div className='box-body ov-body-2'>
                <div className='ov-content-3'>
                    <div className='ov-header-3'>
                        <p className='name'>ชื่อ - สกุล</p>
                        <p className='time'>วันที่เริ่มงาน</p>
                        <p className='time'>ใบบันทึกเวลา</p>
                        <p className='stat'>จำนวนใบลา</p>
                    </div>
                    <div className='ov-content-4'>
                        {
                            timeSheet.map((item, index) => (
                                <div className='ov-content-emp' key={index}>
                                    <p className="name">{item.emp_name + " " + item.emp_surname}</p>
                                    <p className="time">{moment(item.emp_startdate).utc().format('DD/MM/YYYY')}</p>
                                    <p className="time">{item.ta}</p>
                                    <p className="stat">{item.ld}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminContent2;