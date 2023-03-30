import { React, useContext, useState } from 'react';
import '../assets/style/leave.css';
import LeaveTable from '../components/leave/leave_table';
import LeaveSetting from '../components/leave/leave_setting';
import IpContext from '../ipContext';


function Leave() {

    const ip = useContext(IpContext);
    const [upDate, setUpdate] = useState(false);

    return (
        <>
            <div className='box-content'>
                <LeaveTable data={[ip, upDate, setUpdate]}/>
            </div>
            <div className='box-content'>
                <LeaveSetting data={[ip, upDate, setUpdate]}/>
            </div>
        </>
    );
};

export default Leave;