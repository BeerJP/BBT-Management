import { React, useEffect, useState } from 'react';
import axios from 'axios';


function TimeSheetInfo(props) {

    const [isIp, setIp] = useState(props.data[0]);
    const [isId, setId] = useState(props.data[1]);
    const [isSheet, setSheet] = useState([]);

    useEffect(() => {

        setIp(props.data[0]);
        setId(props.data[1]);

    }, [props.data]);

    useEffect(() => {
        axios.post("http://"+ isIp +":5000/timesheet", { id: isId }, {crossdomain: true})
        .then(response => {
            setSheet(response.data);
        });
    }, [isIp, isId])



    return (
        <>            
            <div className='box-body ta-body'>
                <div className='ta-box-content'>
                    <div className='ta-header'>
                        <p className='center'>วันที่</p>
                        <p className='center'>เวลาเข้า</p>
                        <p className='center'>เวลาออก</p>
                    </div>
                </div>
                <div className='ta-box-content'>
                    <div className='ta-content'>
                        {
                            isSheet.map((item, index) => (
                                <div className='ta-content-time-user' key={index}>
                                    <p className="center">{item.th_date}</p>
                                    <div className="center">
                                        <input id='inputIn' type='time' defaultValue={item.time_in} disabled></input>
                                    </div>
                                    <div className="center">
                                        <input id='inputOut' type='time' defaultValue={item.time_out} disabled></input>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default TimeSheetInfo;