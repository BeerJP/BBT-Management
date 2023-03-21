import { React, useState, useEffect } from 'react';
import axios from 'axios';
import '../assets/style/timesheet.css';
import TimeSheetInfo from '../components/sheet/ta_info';
import TimeSheetTable from '../components/sheet/ta_table';



function TimeSheet() {

    const [employee, setEmployee] = useState([]);
    const [timeSheet, setTimesheet] = useState([]);

    const getSelect = (data) => {
        axios.post("http://localhost:5000/timesheet", { id: data })
        .then(response => {
            setTimesheet(response.data);
        });
    };



    useEffect(() => {
        axios.get("http://localhost:5000/employee", {crossdomain: true})
        .then(response => {
            setEmployee(response.data);
        });
    }, []);

    return (
        <>
            <div className='box-content'>
                <TimeSheetInfo data={timeSheet}/>
            </div>
            <div className='box-content' >
                <TimeSheetTable data={[employee, getSelect]}/>
            </div>
        </>
    );
}

export default TimeSheet;