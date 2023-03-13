import { React } from 'react';
import '../assets/style/timesheet.css';
import TimeSheetInfo from '../components/sheet/ta_info';
import TimeSheetTable from '../components/sheet/ta_table';



function TimeSheet() {

    return (
        <>
            <div className='box-content'>
                <TimeSheetInfo/>
            </div>
            <div className='box-content'>
                <TimeSheetTable/>
            </div>
        </>
    );
};

export default TimeSheet;