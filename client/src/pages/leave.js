import { React, useState, useEffect } from 'react';
import axios from 'axios';
import '../assets/style/leave.css';
import LeaveTable from '../components/leave/leave_table';
import LeaveSetting from '../components/leave/leave_setting';


function Leave() {

    const [leavepen, setLeavepen] = useState([]);
    const [leaveapp, setLeaveapp] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/leavepending", {crossdomain: true})
        .then(response => {
            setLeavepen(response.data);
        });

        axios.get("http://localhost:5000/leaveapprove", {crossdomain: true})
        .then(response => {
            setLeaveapp(response.data);
        });
    }, []);


    return (
        <>
            <div className='box-content'>
                <LeaveTable data={[leavepen, leaveapp]}/>
            </div>
            <div className='box-content'>
                <LeaveSetting/>
            </div>
        </>
    );
};

export default Leave;