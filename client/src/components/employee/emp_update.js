import { React } from 'react';


function EditCard(props) {

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
            type_name: ' ',
            emp_age: ' '
        };
    } else {
        emp = props.data;
    };

    return (
        <>
           {/* <div className='box-body em-body-left'>
                <div className='box-body em-article'>
                    <div className='em-header'>
                        <label>ข้อมูลส่วนตัว</label>
                    </div>
                    <div className='lb-box-long em-info'>
                        <div>
                            <label>ชื่อ - นามสกุล</label>
                            <label>{emp.emp_name + " " + emp.emp_surname}</label>
                        </div>
                        <div>
                            <label>แผนก</label>
                            <input value={emp.dept_name}></input>
                        </div>
                    </div>
                    <div className='lb-box-long em-info'>
                        <div>
                            <label>เพศ</label>
                            <label>{emp.emp_gender}</label>
                        </div>
                        <div>
                            <label>MAC Address 1</label>
                            <input value={emp.emp_mac1}></input>
                        </div>
                    </div>
                    <div className='lb-box-long em-info'>
                        <div>
                            <label>วันเกิด</label>
                            <label>{emp.emp_birthdate}</label>
                        </div>
                        <div>
                            <label>MAC Address 2</label>
                            <input value={emp.emp_mac1}></input>
                        </div>
                    </div>
                    <div className='lb-box-long em-info'>
                        <div>
                            <label>เลขบัตรประชาชน</label>
                            <label>{emp.emp_idcard}</label>
                        </div>
                        <div>
                            <label>สถานะ</label>
                            <label>{emp.emp_status}</label>
                        </div>
                    </div>
                    <div className='lb-box-long em-info'>
                        <div>
                            <label>วันเริ่มงาน</label>
                            <label>{emp.emp_startdate}</label>
                        </div>
                        <div>
                            <label>วันสิ้นสุดงาน</label>
                            <label>{emp.emp_enddate}</label>
                        </div>
                    </div>
                    <div className='lb-box-long em-info'>
                        <div>
                            <label>ที่อยู่</label>
                            <label>{emp.emp_address}</label>
                        </div>
                    </div>
                </div>
                <div className='box-body em-article'>
                    <div className='em-header'>
                        <label>ข้อมูลสำหรับเข้าสู่ระบบ</label>
                    </div>
                    <div className='lb-box-long em-info'>
                        <div>
                            <label>Username</label>
                            <label>{emp.user_name}</label>
                        </div>
                        <div>
                            <label>User Type</label>
                            <label>{emp.type_name}</label>
                        </div>
                    </div>
                    <div className='lb-box-long em-info'>
                        <div>
                            <label>Password</label>
                            <label></label>
                        </div>
                        <div>
                            <button>บันทึก</button>
                        </div>
                    </div>
                </div>
            </div> */}
        </>
    );
};

export default EditCard;