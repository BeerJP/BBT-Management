import { React, useEffect, useState } from 'react';
import ui from '../../assets/icon/user-line.png';
import ua from '../../assets/icon/user-add.png';
import ue from '../../assets/icon/edit.png';
import InfoCard from './emp_info';
import AddCard from './emp_add';
import EditCard from './emp_update';


function EmployeeCard(props) {

    const emp = props.data[0];
    const cardType = props.data[2];
    const setCardType = props.data[3];

    const infoEmp = () => { setCardType('infomation'); };
    const addEmp = () => { setCardType('add'); };
    const editEmp = () => { setCardType('edit'); };

    return (
        <>
            <div className='em-header-2'>
                <div>
                    <label>
                        { cardType === 'infomation' ? 'แสดงข้อมูล' : cardType === 'add' ? 'เพิ่มข้อมูล' : 'แก้ไขข้อมูล' }
                    </label>
                </div>
                <div>
                    <div className="em-img-bx" onClick={infoEmp}>
                        <img src={ui} alt=''/>
                        <span className="tooltiptext">แสดงข้อมูล</span>
                    </div>
                    <div className="em-img-bx" onClick={editEmp}>
                        <img src={ue} alt=''/>
                        <span className="tooltiptext">แก้ไขข้อมูล</span>
                    </div>
                    <div className="em-img-bx" onClick={addEmp}>
                        <img src={ua} alt=''/>
                        <span className="tooltiptext">เพิ่มข้อมูล</span>
                    </div>
                </div>
            </div>
            {
                cardType === 'infomation' ? <InfoCard data={emp} /> : cardType === 'add' ? <AddCard data={props.data[1]} /> : <EditCard  data={emp} />
            }
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
                            <label>{emp.dept_name}</label>
                        </div>
                    </div>
                    <div className='lb-box-long em-info'>
                        <div>
                            <label>เพศ</label>
                            <label>{emp.emp_gender}</label>
                        </div>
                        <div>
                            <label>MAC Address 1</label>
                            <label>{emp.emp_mac1}</label>
                        </div>
                    </div>
                    <div className='lb-box-long em-info'>
                        <div>
                            <label>อายุ</label>
                            <label>{emp.emp_birthdate}</label>
                        </div>
                        <div>
                            <label>MAC Address 2</label>
                            <label>{emp.emp_mac2}</label>
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
                            <button>บันทึก</button>
                        </div>
                    </div>
                </div>
            </div> */}
        </>
    );
};

export default EmployeeCard;