import { React, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import '../assets/style/employee.css';
import EmployeeCard from '../components/employee/emp_card';
import EmployeeTable from '../components/employee/emp_table';
import IpContext from '../ipContext';


function Employee() {

    const ip = useContext(IpContext);

    const [employee, setEmployee] = useState([]);
    const [selectEmp, setSelect] = useState(0);
    const [id, setId] = useState();

    const [cardType, setCardtype] = useState('infomation');

    const getSelect = (data) => {
        setSelect(data - 1000);
    };

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
    }, []);

    useEffect(() => {
        axios.get("http://"+ ip +":5000/employee", {crossdomain: true})
        .then(response => {
            setEmployee(response.data);
            setId(response.data[response.data.length - 1].emp_id + 1)
        });
    }, [ip, cardType]);
    

    return (
        <>
            <div className='box-content'>
                <EmployeeCard data={[employee[selectEmp - 1], id, cardType, setCardtype, ip]}/>
            </div>
            <div className='box-content'>
                <EmployeeTable data={[employee, getSelect, setCardtype]}/>
            </div>
        </>
    );
};

export default Employee;