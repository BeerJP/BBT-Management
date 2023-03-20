import { React } from 'react';
import '../assets/style/leave.css';
import LeaveTable from '../components/leave/leave_table';


function Leave() {

    return (
        <>
            <div className='box-content'>
                <LeaveTable/>
            </div>
            <div className='box-content'>
                <LeaveTable/>
            </div>
        </>
    );
};

export default Leave;