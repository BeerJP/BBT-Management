import { React, useContext, useState } from 'react';
import '../assets/style/leave.css';
import LeaveTable from '../components/leave/leave_table';
import LeaveSetting from '../components/leave/leave_setting';
import IpContext from '../ipContext';


function Leave() {

    const [isUserid, setUserid] = useState(1001)
    const [isUsertype, setUsertype] = useState(1)

    const ip = useContext(IpContext);
    const [isUpdate, setUpdate] = useState(false);


    return (
        <>
            {
                isUsertype === 1 || isUsertype === 2 ?  
                [<div className='box-content'><LeaveTable data={[ip, isUpdate, setUpdate]}/></div>,
                <div className='box-content'><LeaveSetting data={[ip, isUpdate, setUpdate, isUserid]}/></div>] 
                :
                <div className='box-content'><LeaveSetting data={[ip, isUpdate, setUpdate, isUserid]}/></div>
            }

        </>
    );
};

export default Leave;