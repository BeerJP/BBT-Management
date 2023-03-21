import { React } from 'react';
import '../assets/style/leave.css';
import LeaveTable from '../components/leave/leave_table';
import LeaveSetting from '../components/leave/leave_setting';


function Leave() {

    return (
        <>
            <div className='box-content'>
                <LeaveTable/>
            </div>
            <div className='box-content'>
                <LeaveSetting/>
            </div>
        </>
    );
};

export default Leave;