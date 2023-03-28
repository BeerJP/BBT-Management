import { React } from 'react';
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
                        ข้อมูลส่วนตัว & ข้อมูลสำหรับเข้าสู่ระบบ
                    </label>
                </div>
                <div>
                    <div className="em-img-bx" style={cardType === 'infomation' ? {background: '#34C2DB'} : {}} onClick={infoEmp}>
                        <img src={ui} alt=''/>
                        <span className="tooltiptext">แสดงข้อมูล</span>
                    </div>
                    <div className="em-img-bx" style={emp == null ? {'pointer-events': 'none'} : 
                    cardType === 'edit' ? {background: '#F4D03F'} : {'pointer-events': 'auto'}} onClick={editEmp}>
                        <img src={ue} alt=''/>
                        <span className="tooltiptext">แก้ไขข้อมูล</span>
                    </div>
                    <div className="em-img-bx" style={cardType === 'add' ? {background: '#58D68D'} : {}} onClick={addEmp}>
                        <img src={ua} alt=''/>
                        <span className="tooltiptext">เพิ่มข้อมูล</span>
                    </div>
                </div>
            </div>
            {
                cardType === 'infomation' ? <InfoCard data={emp} /> : 
                cardType === 'add' ? <AddCard data={[props.data[1], setCardType]} /> : <EditCard  data={[emp, setCardType]} />
            }
        </>
    );
};

export default EmployeeCard;