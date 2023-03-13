import { React } from 'react';
import ua from '../../assets/icon/user-add.png';
import ue from '../../assets/icon/edit.png';


function EmployeeInfo() {

    return (
        <>
            <div className='em-header-2'>
                <div class="em-img-bx">
                    <img src={ue} alt=''/>
                    <span class="tooltiptext">แก้ไขข้อมูล</span>
                </div>
                <div class="em-img-bx">
                    <img src={ua} alt=''/>
                    <span class="tooltiptext">เพิ่มข้อมูล</span>
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
                            <label>-</label>
                        </div>
                        <div>
                            <label>แผนก</label>
                            <label>-</label>
                        </div>
                    </div>
                    <div className='lb-box-long em-info'>
                        <div>
                            <label>เพศ</label>
                            <label>-</label>
                        </div>
                        <div>
                            <label>MAC Address 1</label>
                            <label>-</label>
                        </div>
                    </div>
                    <div className='lb-box-long em-info'>
                        <div>
                            <label>อายุ</label>
                            <label>-</label>
                        </div>
                        <div>
                            <label>MAC Address 2</label>
                            <label>-</label>
                        </div>
                    </div>
                    <div className='lb-box-long em-info'>
                        <div>
                            <label>เลขบัตรประชาชน</label>
                            <label>-</label>
                        </div>
                        <div>
                            <label>สถานะ</label>
                            <label>-</label>
                        </div>
                    </div>
                    <div className='lb-box-long em-info'>
                        <div>
                            <label>วันเริ่มงาน</label>
                            <label>-</label>
                        </div>
                        <div>
                            <label>วันสิ้นสุดงาน</label>
                            <label>-</label>
                        </div>
                    </div>
                    <div className='lb-box-long em-info'>
                        <div>
                            <label>ที่อยู่</label>
                            <label>-</label>
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