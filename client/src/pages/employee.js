import { React, useState, useEffect } from 'react';
import axios from 'axios';
import '../assets/style/employee.css';
import EmployeeCard from '../components/employee/emp_card';
import EmployeeTable from '../components/employee/emp_table';


function Employee() {

    const [employee, setEmployee] = useState([]);
    const [selectEmp, setSelect] = useState(0);
    const [id, setId] = useState();

    const [cardType, setCardtype] = useState('infomation');

    const getSelect = (data) => {
        setSelect(data - 1000);
    };

    useEffect(() => {
        axios.get("http://localhost:5000/employee", {crossdomain: true})
        .then(response => {
            setEmployee(response.data);
            setId(response.data[response.data.length - 1].emp_id + 1)
        });
    }, []);

    return (
        <>
            <div className='box-content'>
                <EmployeeCard data={[employee[selectEmp - 1], id, cardType, setCardtype]}/>
            </div>
            <div className='box-content'>
                <EmployeeTable data={[employee, getSelect, setCardtype]}/>
            </div>
        </>
    );
};

export default Employee;