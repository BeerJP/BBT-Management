import { React, useState, useEffect } from 'react';
import axios from 'axios';


function TimeSheetTable(props) {

    const ip = props.data[1];

    const [timeSheet, setTimesheet] = useState([]);
    
    useEffect(() => {
        axios.get("http://"+ ip +":5000/timecount", {crossdomain: true})
        .then(response => {
            setTimesheet(response.data);
        });
    }, [ip]);


    return (
        <>
             <div className='box-body em-body-2'>
                <div className='em-content-3'>
                    <div className='em-header-3'>
                        <p className='left'>รหัส</p>
                        <p>ชื่อ - สกุล</p>
                        <p className='center'>วันทำงาน</p>
                        <p className='center'>วันลางาน</p>
                    </div>
                    <div className='em-content-4'>
                        {
                            timeSheet.map((item, index) => (
                                <div className='em-content-emp' key={index} onClick={() => props.data[0](item.emp_id)}>
                                    <p className='left'>{item.emp_id}</p>
                                    <p>{item.emp_name + " " + item.emp_surname}</p>
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

export default TimeSheetTable;