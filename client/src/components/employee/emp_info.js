import { React, useState, useEffect } from 'react';


function InfoCard(props) {

    const [isEmp, setEmp] = useState({
        emp_id: ' ',
        emp_name: ' ',
        emp_surname: ' ',
        emp_gender: ' ',
        emp_birthdate: ' ',
        emp_status: ' ',
        emp_startdate: ' ',
        emp_enddate: ' ',
        emp_mac1: ' ',
        emp_mac2: ' ',
        dept_id: ' ',
        dept_name: ' ',
        user_name: ' ',
        user_password: ' ',
        type_id: ' ',
        type_name: ' ',
        emp_age: ' '
    })

    useEffect(() => {
        if (props.data){
            const emp = props.data;
            setEmp(emp[0])
        } 
    }, [props.data])


    return (
        <>
            <div className='box-body em-body-left'>
                <div className='box-body em-article'>
                    <div className='lb-box-long em-info'>
                        <div>
                            <label className='lb-header'>ชื่อ - นามสกุล</label>
                            <label className='text-box'>{isEmp.emp_name + ' ' + isEmp.emp_surname}</label>
                        </div>
                        <div>
                            <label className='lb-header'>แผนก</label>
                            <label className='text-box'>{isEmp.dept_name}</label>
                        </div>
                    </div>
                    <div className='lb-box-long em-info'>
                        <div>
                            <label className='lb-header'>เพศ</label>
                            <label className='text-box'>{isEmp.emp_gender}</label>
                        </div>
                        <div>
                            <label className='lb-header'>MAC Address 1</label>
                            <label className='text-box'>{isEmp.emp_mac1}</label>
                        </div>
                    </div>
                    <div className='lb-box-long em-info'>
                        <div>
                            <label className='lb-header'>อายุ</label>
                            <label className='text-box'>{isEmp.emp_age}</label>
                        </div>
                        <div>
                            <label className='lb-header'>MAC Address 2</label>
                            <label className='text-box'>{isEmp.emp_mac2}</label>
                        </div>
                    </div>
                    <div className='lb-box-long em-info'>
                        <div>
                            <label className='lb-header'>สถานะ</label>
                            <label className='text-box'>{isEmp.emp_status}</label>
                        </div>
                    </div>
                    <div className='lb-box-long em-info'>
                        <div>
                            <label className='lb-header'>วันเริ่มงาน</label>
                            <label className='text-box'>{isEmp.emp_startdate}</label>
                        </div>
                        <div>
                            <label className='lb-header'>วันสิ้นสุดงาน</label>
                            <label className='text-box'>{isEmp.emp_enddate}</label>
                        </div>
                    </div>
                    <div className='lb-box-long em-info'></div>
                    <div className='lb-box-long em-info'>
                        <div>
                            <label className='lb-header'>Username</label>
                            <label className='text-box'>{isEmp.user_name}</label>
                        </div>
                        <div>
                            <label className='lb-header'>User Type</label>
                            <label className='text-box'>{isEmp.type_name}</label>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default InfoCard;