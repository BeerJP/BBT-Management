import { React } from 'react';


function InfoCard(props) {

    if (!props.data) {
        var emp = {
            emp_id: ' ',
            emp_name: ' ',
            emp_surname: ' ',
            emp_idcard: ' ',
            emp_gender: ' ',
            emp_birthdate: ' ',
            emp_address: ' ',
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
        };
    } else {
        emp = props.data;
    };

    return (
        <>
            <div className='box-body em-body-left'>
                <div className='box-body em-article'>
                    {/* <div className='em-header'>
                        <label>ข้อมูลส่วนตัว & ข้อมูลสำหรับเข้าสู่ระบบ</label>
                    </div> */}
                    <div className='lb-box-long em-info'>
                        <div>
                            <label className='lb-header'>ชื่อ - นามสกุล</label>
                            <label className='text-box'>{emp.emp_name + " " + emp.emp_surname}</label>
                        </div>
                        <div>
                            <label className='lb-header'>แผนก</label>
                            <label className='text-box'>{emp.dept_name}</label>
                        </div>
                    </div>
                    <div className='lb-box-long em-info'>
                        <div>
                            <label className='lb-header'>เพศ</label>
                            <label className='text-box'>{emp.emp_gender}</label>
                        </div>
                        <div>
                            <label className='lb-header'>MAC Address 1</label>
                            <label className='text-box'>{emp.emp_mac1}</label>
                        </div>
                    </div>
                    <div className='lb-box-long em-info'>
                        <div>
                            <label className='lb-header'>อายุ</label>
                            <label className='text-box'>{emp.emp_age}</label>
                        </div>
                        <div>
                            <label className='lb-header'>MAC Address 2</label>
                            <label className='text-box'>{emp.emp_mac2}</label>
                        </div>
                    </div>
                    <div className='lb-box-long em-info'>
                        <div>
                            <label className='lb-header'>เลขบัตรประชาชน</label>
                            <label className='text-box'>{emp.emp_idcard}</label>
                        </div>
                        <div>
                            <label className='lb-header'>สถานะ</label>
                            <label className='text-box'>{emp.emp_status}</label>
                        </div>
                    </div>
                    <div className='lb-box-long em-info'>
                        <div>
                            <label className='lb-header'>วันเริ่มงาน</label>
                            <label className='text-box'>{emp.emp_startdate}</label>
                        </div>
                        <div>
                            <label className='lb-header'>วันสิ้นสุดงาน</label>
                            <label className='text-box'>{emp.emp_enddate}</label>
                        </div>
                    </div>
                    <div className='lb-box-long em-info'>
                        <div>
                            <label className='lb-header'>ที่อยู่</label>
                            <label className='text-box emp-address'>{emp.emp_address}</label>
                        </div>
                    </div>
                    <div className='lb-box-long em-info'>
                        <div>
                            <label className='lb-header'>Username</label>
                            <label className='text-box'>{emp.user_name}</label>
                        </div>
                        <div>
                            <label className='lb-header'>User Type</label>
                            <label className='text-box'>{emp.type_name}</label>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default InfoCard;