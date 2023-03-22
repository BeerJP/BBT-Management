import { React } from 'react';
import axios from 'axios';
import moment from "moment";
// import ne from '../../assets/icon/note-edit.png';


function LeaveTable(props) {

    const leave_p = props.data[0];
    const leave_a = props.data[1];

    const getId = (e) => {
        const leaveId = e.target.id.split(" ");
        console.log(leaveId);
        axios.put("http://localhost:5000/update_leave", 
        {   id: leaveId[0],
            date: leaveId[1],
            state: leaveId[2]
        }).then(() => {
            console.log("Success");
        });
    }

    return (
        <>
            <div className='box-body le-body'>
                <div className='le-box-header'>
                    <label>รอการอนุมัติ</label>
                </div>
                <div className='le-box-content'>
                    <div className='le-header'>
                        <p className='le-empl'>พนักงาน</p>
                        <p className='le-date'>วันที่</p>
                        <p className='le-type'>รูปแบบ</p>
                        <p className='le-desc'>เหตุผลการลา</p>
                        <p className='le-sett'></p>
                    </div>
                    <div className='le-content'>
                        {
                            leave_p.map((item, index) => (
                                <div className='le-content-time' key={index}>
                                    <p className="empl">{item.emp_id}</p>
                                    {/* <p className="date">{moment(item.leave_date).utc().format('DD/MM/YYYY')}</p> */}
                                    <p className="date">{item.leave_date}</p>
                                    <p className="type">{item.leave_type}</p>
                                    <p className="desc">{item.leave_description}</p>
                                    <button className="sett" id={item.emp_id + " " + item.leave_date + " 1"} onClick={getId}>อนุมัติ</button>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className='box-body le-body'>
                <div className='le-box-header'>
                    <label>อนุมัติแล้ว</label>
                </div>
                <div className='le-box-content'>
                    <div className='le-header'>
                        <p className='le-empl'>พนักงาน</p>
                        <p className='le-date'>วันที่</p>
                        <p className='le-type'>รูปแบบ</p>
                        <p className='le-desc'>เหตุผลการลา</p>
                        <p className='le-sett'></p>
                    </div>
                    <div className='le-content'>
                        {
                         leave_a.map((item, index) => (
                            <div className='le-content-time' key={index}>
                                <p className="empl">{item.emp_id}</p>
                                <p className="date">{moment(item.leave_date).utc().format('DD/MM/YYYY')}</p>
                                <p className="type">{item.leave_type}</p>
                                <p className="desc">{item.leave_description}</p>
                                <button className="sett" id={item.emp_id + " " + item.leave_date + " 0"} onClick={getId}>ยกเลิก</button>
                            </div>
                        ))
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default LeaveTable;