import { React, useState, useEffect } from 'react';
import axios from 'axios';
import '../assets/style/employee.css';
import EmployeeInfo from '../components/employee/emp_info';
import EmployeeTable from '../components/employee/emp_table';


function Employee() {

    const [employee, setEmployee] = useState([]);
    const [department, setDepartment] = useState([]);
    const [selectEmp, setSelect] = useState();

    const getSelect = (data) => {
        setSelect(data - 1000);
    };

    useEffect(() => {
        axios.get("http://localhost:5000/employee", {crossdomain: true})
        .then(response => {
            setEmployee(response.data);
        });

        axios.get("http://localhost:5000/department", {crossdomain: true})
        .then(response => {
            setDepartment(response.data);
        });

    }, []);


    return (
        <>
            <div className='box-content'>
                <EmployeeInfo data={employee[selectEmp - 1]}/>
            </div>
            <div className='box-content'>
                <EmployeeTable data={[employee, department, getSelect]}/>
            </div>
        </>
    );
};

export default Employee;