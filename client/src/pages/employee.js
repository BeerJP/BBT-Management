import { React } from 'react';
import '../assets/style/employee.css';
import EmployeeInfo from '../components/employee/emp_info';
import EmployeeTable from '../components/employee/emp_table';


function Employee() {

    return (
        <>
            <div className='box-content'>
                <EmployeeInfo/>
            </div>
            <div className='box-content'>
                <EmployeeTable/>
            </div>
        </>
    );
};

export default Employee;