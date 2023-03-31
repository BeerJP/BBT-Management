import { React, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import '../assets/style/timesheet.css';
import TimeSheetInfo from '../components/sheet/ta_info';
import TimeSheetTable from '../components/sheet/ta_table';
import IpContext from '../ipContext';



function TimeSheet() {

    const ip = useContext(IpContext);

    const [timeSheet, setTimesheet] = useState([]);
    const [isEmp, setEmp] = useState('');

    useEffect(() => {
        
        setTimesheet([])

        const getSelect = () => {
            axios.post("http://"+ ip +":5000/timesheet", { id: isEmp }, {crossdomain: true})
            .then(response => {
                setTimesheet(response.data);
            });
        };

        getSelect();

    }, [ip, isEmp]);

    return (
        <>
            <div className='box-content'>
                <TimeSheetInfo data={timeSheet}/>
            </div>
            <div className='box-content' >
                <TimeSheetTable data={[setEmp, ip]}/>
            </div>
        </>
    );
}

export default TimeSheet;