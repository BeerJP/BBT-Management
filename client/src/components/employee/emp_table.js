import { React, useState, useEffect } from 'react';
import axios from 'axios';


function EmployeeTable(props) {

    const ip = props.data[0];
    const getSelect = props.data[1];
    const setCard = props.data[2];
    const [isEmptable, setEmptable] = useState();

    useEffect(() => {
        axios.get("http://"+ ip +":5000/employee_table", {crossdomain: true})
       .then(response => {
           setEmptable(response.data);
       })
    }, [ip]);

    const select = (id) => {
        getSelect(id);
        setCard('infomation');
    };

    return (
        <>
            <div className='box-body em-body-2'>
                <div className='em-content-3'>
                    <div className='em-header-3'>
                        <p className='left'>รหัส</p>
                        <p>ชื่อ - สกุล</p>
                        <p className='center'>วันเริ่มงาน</p>
                        <p className='center'>แผนก</p>
                    </div>
                    <div className='em-content-4'>
                        {
                            isEmptable == null ? '' :
                            isEmptable.map((item, index) => (
                                <div className='em-content-emp' key={index} onClick={() => select(item.emp_id)}>
                                    <p className="left">{item.emp_id}</p>
                                    <p>{item.emp_name + " " + item.emp_surname}</p>
                                    <p className="center">{item.emp_startdate}</p>
                                    <p className="center">{item.dept_name}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default EmployeeTable;