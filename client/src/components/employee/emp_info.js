import { React } from 'react';
import ua from '../../assets/icon/user-add.png';
import ue from '../../assets/icon/edit.png';


function EmployeeInfo(props) {

    if (!props.data) {
        var emp = {

            emp_name: '-',
            emp_surname: '-',
            emp_idcard: '-',
            emp_gender: '-',
            emp_mac1: '-',
            emp_mac2: '-',
            emp_status: '-',
            emp_startdate: '-',
            emp_endtdate: '-',
            emp_address: '-',
            dept_id: '-'
        };
    } else {
        var emp = props.data;
    };

    return (
        <>
            <div className='em-header-2'>
                <div className="em-img-bx">
                    <img src={ue} alt=''/>
                    <span className="tooltiptext">แก้ไขข้อมูล</span>
                </div>
                <div className="em-img-bx">
                    <img src={ua} alt=''/>
                    <span className="tooltiptext">เพิ่มข้อมูล</span>
                </div>
            </div>
            <div className='box-body em-body-left'>
                <div className='box-body em-article'>
                    <div className='em-header'>
                        <label>ข้อมูลส่วนตัว</label>
                    </div>
                    <div className='lb-box-long em-info'>
                        <div>
                            <label>ชื่อ - นามสกุล</label>
                            <label>{emp['emp_name'] + " " + emp['emp_surname']}</label>
                        </div>
                        <div>
                            <label>แผนก</label>
                            <label>{emp['dept_id']}</label>
                        </div>
                    </div>
                    <div className='lb-box-long em-info'>
                        <div>
                            <label>เพศ</label>
                            <label>{emp['emp_gender']}</label>
                        </div>
                        <div>
                            <label>MAC Address 1</label>
                            <label>{emp['emp_mac1']}</label>
                        </div>
                    </div>
                    <div className='lb-box-long em-info'>
                        <div>
                            <label>อายุ</label>
                            <label>{emp['emp_birthdate']}</label>
                        </div>
                        <div>
                            <label>MAC Address 2</label>
                            <label>{emp['emp_mac2']}</label>
                        </div>
                    </div>
                    <div className='lb-box-long em-info'>
                        <div>
                            <label>เลขบัตรประชาชน</label>
                            <label>{emp['emp_idcard']}</label>
                        </div>
                        <div>
                            <label>สถานะ</label>
                            <label>{emp['emp_status']}</label>
                        </div>
                    </div>
                    <div className='lb-box-long em-info'>
                        <div>
                            <label>วันเริ่มงาน</label>
                            <label>{emp['emp_startdate']}</label>
                        </div>
                        <div>
                            <label>วันสิ้นสุดงาน</label>
                            <label>{emp['emp_enddate']}</label>
                        </div>
                    </div>
                    <div className='lb-box-long em-info'>
                        <div>
                            <label>ที่อยู่</label>
                            <label>{emp['emp_address']}</label>
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
                            <label>-</label>
                        </div>
                        <div>
                            <label>User Type</label>
                            <label>-</label>
                        </div>
                    </div>
                    <div className='lb-box-long em-info'>
                        <div>
                            <label>Password</label>
                            <label>-</label>
                        </div>
                        <div>
                            <label>Confirm Password</label>
                            <label>-</label>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EmployeeInfo;