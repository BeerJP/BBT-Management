import { React, useState, useEffect } from 'react';
import axios from 'axios';


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
                        <p className='left'>รหัส</p>
                        <p>ชื่อ - สกุล</p>
                        <p className='center'>วันเริ่มงาน</p>
                        <p className='center'>วันทำงาน</p>
                        <p className='center'>วันลางาน</p>
                    </div>
                    <div className='ov-content-4'>
                        {
                            timeSheet.map((item, index) => (
                                <div className='ov-content-emp' key={index}>
                                    <p className='left'>{item.emp_id}</p>
                                    <p>{item.emp_name + " " + item.emp_surname}</p>
                                    <p className="center">{item.emp_startdate}</p>
                                    <p className="center">{item.ta}</p>
                                    <p className="center">{item.ld}</p>
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