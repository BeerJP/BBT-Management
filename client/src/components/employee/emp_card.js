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
        </>
    );
};

export default EmployeeCard;