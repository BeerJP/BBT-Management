import { React, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import '../assets/style/timesheet.css';
import TimeSheetInfo from '../components/sheet/ta_info';
import TimeSheetTable from '../components/sheet/ta_table';
import UserTimeSheet from '../components/sheet/us_timesheet';
import IpContext from '../ipContext';


function TimeSheet() {

    const ip = useContext(IpContext);
    const [isUserid, setUserid] = useState(0)
    const [isTypeid, setTypeid] = useState(0)

    const [timeSheet, setTimesheet] = useState([]);
    const [isEmp, setEmp] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.post("http://"+ ip +":5000/session", {
            token: token
        }, {crossdomain: true})
        .then(response => {
            if (response.data.user_id) {
                setUserid(response.data.user_id)
                setTypeid(response.data.type_id)
            } 
            else {
                localStorage.removeItem('token')
                window.location = '/login';
            }
        });
    }, []);

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
            {
                isTypeid === 1 || isTypeid === 2 ?  
                [<div className='box-content' key='1'><TimeSheetInfo data={[timeSheet, ip, isEmp]}/></div>,
                <div className='box-content' key='2'><TimeSheetTable data={[setEmp, ip]}/></div>]
                :
                <div className='box-content' key='3'><UserTimeSheet data={[ip, isUserid]}/></div>
            }
            {/* <div className='box-content'>
                <TimeSheetInfo data={[timeSheet, ip, isEmp]}/>
            </div>
            <div className='box-content' >
                <TimeSheetTable data={[setEmp, ip]}/>
            </div> */}
        </>
    );
}

export default TimeSheet;