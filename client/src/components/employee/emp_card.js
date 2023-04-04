import { React, useState, useEffect } from 'react';
import axios from 'axios';
import ui from '../../assets/icon/user-line.png';
import ua from '../../assets/icon/user-add.png';
import ue from '../../assets/icon/edit.png';
import InfoCard from './emp_info';
import AddCard from './emp_add';
import EditCard from './emp_update';


function EmployeeCard(props) {

    const ip = props.data[0];
    const selectEmp = props.data[1];
    const isCard = props.data[2]
    const setCard = props.data[3]

    const [employee, setEmployee] = useState();
    const infoEmp = () => { setCard('infomation'); };
    const addEmp = () => { setCard('add'); };
    const editEmp = () => { setCard('edit'); };

    useEffect(() => {
        if (selectEmp){
            axios.post("http://"+ ip +":5000/employee_info", {
                id: selectEmp
            },
             {crossdomain: true})
            .then(response => {
                setEmployee(response.data);
            });
        }
    }, [ip, selectEmp]);

    return (
        <>
            <div className='em-header-2'>
                <div>
                    <label>
                        ข้อมูลส่วนตัว & ข้อมูลสำหรับเข้าสู่ระบบ
                    </label>
                </div>
                <div>
                    <div className="em-img-bx" style={isCard === 'infomation' ? {background: '#34C2DB'} : {}} onClick={infoEmp}>
                        <img src={ui} alt=''/>
                        <span className="tooltiptext">แสดงข้อมูล</span>
                    </div>
                    <div className="em-img-bx" style={selectEmp == null ? {pointerEvents: 'none'} : 
                        isCard === 'edit' ? {background: '#F4D03F'} : {pointerEvents: 'auto'}} onClick={editEmp}>
                        <img src={ue} alt=''/>
                        <span className="tooltiptext">แก้ไขข้อมูล</span>
                    </div>
                    <div className="em-img-bx" style={isCard === 'add' ? {background: '#58D68D'} : {}} onClick={addEmp}>
                        <img src={ua} alt=''/>
                        <span className="tooltiptext">เพิ่มข้อมูล</span>
                    </div>
                </div>
            </div>
            {
                isCard === 'infomation' ? <InfoCard data={employee} /> : 
                isCard === 'add' ? <AddCard data={[ip, setCard]} /> : <EditCard  data={[ip, selectEmp, employee, setCard]} />
            }
        </>
    );
};

export default EmployeeCard;