import { React, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import '../assets/style/timesheet.css';
import TimeSheetInfo from '../components/sheet/ta_info';
import TimeSheetTable from '../components/sheet/ta_table';
import IpContext from '../ipContext';



function TimeSheet() {

    const ip = useContext(IpContext);

    // const [employee, setEmployee] = useState([]);
    const [timeSheet, setTimesheet] = useState([]);

    const getSelect = (data) => {
        axios.post("http://"+ ip +":5000/timesheet", { id: data }, {crossdomain: true})
        .then(response => {
            setTimesheet(response.data);
        });
    };

    // useEffect(() => {
    //     axios.get("http://"+ ip +":5000/employee", {crossdomain: true})
    //     .then(response => {
    //         setEmployee(response.data);
    //     });
    // }, []);

    return (
        <>
            <div className='box-content'>
                <TimeSheetInfo data={timeSheet}/>
            </div>
            <div className='box-content' >
                <TimeSheetTable data={[getSelect, ip]}/>
            </div>
        </>
    );
}

export default TimeSheet;