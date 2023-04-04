import { React, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import '../assets/style/employee.css';
import EmployeeCard from '../components/employee/emp_card';
import EmployeeTable from '../components/employee/emp_table';
import IpContext from '../ipContext';


function Employee() {

    const ip = useContext(IpContext);

    const [isCard, setCard] = useState('infomation');
    const [selectEmp, setSelect] = useState();

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.post("http://"+ ip +":5000/session", {
            token: token
        }, {crossdomain: true})
        .then(response => {
            if (response.data.user_id) {
                
            } 
            else {
                localStorage.removeItem('token')
                window.location = '/login';
            }
        });
    }, [ip]);

    return (
        <>
            <div className='box-content'>
                <EmployeeCard data={[ip, selectEmp, isCard, setCard]}/>
            </div>
            <div className='box-content'>
                <EmployeeTable data={[ip, setSelect, setCard]}/>
            </div>
        </>
    );
};

export default Employee;