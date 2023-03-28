import { React } from 'react';


function EmployeeTable(props) {

    const emp = props.data[0];

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
                            emp.map((item, index) => (
                                <div className='em-content-emp' key={index} onClick={() => {props.data[1](item.emp_id); props.data[2]('infomation');}}>
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