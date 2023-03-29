import { React, useState, useEffect } from 'react';
import axios from 'axios';


function LeaveSetting(props) {

    const ip = props.data[0];
    const update = props.data[1];

    console.log(update);


    const id = '1001';

    const [workDay, setWorkday] = useState([{
        work_id: '',
        work_date: '',
        work_status: ''
    }]);
    
    const [leaveType, setLeavetype] = useState('กิจ');
    const [leaveName, setLeavename] = useState();
    const [leaveDate, setLeavedate] = useState();

    const [leaveSum, setLeavesum] = useState([{
        ld:0,
        bld:0,
        hld:0,
        sld:0
    }]);

    const [leaveEmp, setLeaveemp] = useState([{
        leave_type: '',
        leave_date: '',
        leave_description: '',
        leave_appove: ''
    }]);

    const getWorkday = async() => {
        await axios.get("http://"+ ip +":5000/workday", {crossdomain: true})
        .then(response => {
            setWorkday(response.data);
        });
    };

    const getLeavesum = () => {
        axios.post("http://"+ ip +":5000/leave_emp_sum", { 
            id: id,
        }, {crossdomain: true})
        .then(response => {
            setLeavesum(response.data);
        });
    };

    const getLeaveemp = () => {
        axios.post("http://"+ ip +":5000/leave_emp", { 
            id: id,
        }, {crossdomain: true})
        .then(response => {
            setLeaveemp(response.data);
        });
    };

    useEffect(() => {
        getWorkday();
        getLeavesum();
        getLeaveemp();
    }, [update]);

    return (
        <>
            <div className='box-body le-body'>
                <div className='le-box-header'>
                    <label>ข้อมูลการลา</label>
                </div>
                <div className='le-box-header2'>
                    <label>ลากิจ : {leaveSum[0].bld}</label>
                    <label>ลาพักร้อน : {leaveSum[0].hld}</label>
                    <label>ลาป่วย : {leaveSum[0].sld}</label>
                </div>
                <div className='le-box-content'>
                    <div className='le-header'>
                        <p className='left'>วันที่</p>
                        <p className='center'>ประเภท</p>
                        <p>เหตุผลการลา</p>
                        <p className='center'>สถานะ</p>
                    </div>
                    <div className='le-content'>
                        {
                            leaveEmp.map((item, index) => (
                                <div className='le-content-time' key={index}>
                                    <p className="left">{item.leave_date}</p>
                                    <p className="center">{item.leave_type}</p>
                                    <p>{item.leave_description}</p>
                                    <p className="center">{item.leave_appove}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className='box-body ca-box-set'>
                <div className='ca-header'>
                    <p>จัดการใบลา</p>
                </div>
                <br></br><br></br>
                <div className='lb-box-long em-info'>
                    <div>
                        <label className='lb-header'>ประเภท</label>
                        <select className='text-box select-box' name="date" id="date" onChange={(event => {
                            setLeavetype(event.target.value)
                        })}>
                            <option value={"กิจ"}>ลากิจ</option>
                            <option value={"พักร้อน"}>ลาพักร้อน</option>
                            <option value={"ป่วย"}>ลาป่วย</option>
                        </select>
                    </div>
                    <div className='ca-sett-input'>
                        <label className='lb-header'>เหตุผลการลา</label>
                        <input className='text-box' onChange={(event => {
                            setLeavename(event.target.value)
                        })}></input>
                    </div>
                </div>
                <div className='lb-box-long em-info'>
                    <div>
                        <label className='lb-header'>วันที่</label>
                        <select className='text-box select-box' name="date" id="date" onChange={(event => {
                            setLeavedate(event.target.value)
                        })}>
                            {
                                workDay.map((item, index) => (
                                    <option key={item.work_date} value={item.work_id}>{item.work_date}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div>
                        <button>บันทึก</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LeaveSetting;