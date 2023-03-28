import { React, useState, useEffect } from 'react';
import axios from 'axios';
// import ne from '../../assets/icon/note-edit.png';


function LeaveTable() {

    const [leavepen, setLeavepen] = useState([]);
    const [leaveapp, setLeaveapp] = useState([]);

    const getApi = async() => {
        await axios.get("http://localhost:5000/leavepending", {crossdomain: true})
        .then(response => {
            setLeavepen(response.data);
        });

        await axios.get("http://localhost:5000/leaveapprove", {crossdomain: true})
        .then(response => {
            setLeaveapp(response.data);
        });
    };

    useEffect(() => {
        getApi();
    }, []);

    const getId = async(event) => {
        const leaveId = event.target.id.split(" ");
        await axios.put("http://localhost:5000/update_leave", 
        {   id: leaveId[0],
            date: leaveId[1],
            state: leaveId[2]
        }).then(
            await getApi()
        );
    };

    return (
        <>
            <div className='box-body le-body'>
                <div className='le-box-header'>
                    <label>รอการอนุมัติ</label>
                </div>
                <div className='le-box-content'>
                    <div className='le-header'>
                        <p className='left'>พนักงาน</p>
                        <p className='center'>วันที่</p>
                        <p className='center'>รูปแบบ</p>
                        <p>เหตุผลการลา</p>
                        <p className='center'></p>
                    </div>
                    <div className='le-content'>
                        {
                            leavepen.map((item, index) => (
                                <div className='le-content-time' key={index}>
                                    <p className="left">{item.emp_id}</p>
                                    <p className="center">{item.leave_date}</p>
                                    <p className="center">{item.leave_type}</p>
                                    <p>{item.leave_description}</p>
                                    <button className="center" id={item.emp_id + " " + item.leave_date + " 1"} onClick={getId}>อนุมัติ</button>
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
                        <p className='left'>พนักงาน</p>
                        <p className='center'>วันที่</p>
                        <p className='center'>รูปแบบ</p>
                        <p>เหตุผลการลา</p>
                        <p className='center'></p>
                    </div>
                    <div className='le-content'>
                        {
                         leaveapp.map((item, index) => (
                            <div className='le-content-time' key={index}>
                                <p className="left">{item.emp_id}</p>
                                <p className="center">{item.leave_date}</p>
                                <p className="center">{item.leave_type}</p>
                                <p>{item.leave_description}</p>
                                <button className="center" id={item.emp_id + " " + item.leave_date + " 0"} onClick={getId}>ยกเลิก</button>
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