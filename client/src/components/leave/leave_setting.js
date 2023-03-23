import { React, useState, useEffect } from 'react';
import axios from 'axios';


function LeaveTable() {

    const [workDay, setWorkday] = useState([{
        work_id: '',
        work_date: '',
        work_status: ''
    }]);
    const [leaveType, setLeavetype] = useState('กิจ');
    const [leaveName, setLeavename] = useState();
    const [leaveDate, setLeavedate] = useState();

    const getWorkday = async() => {
        await axios.get("http://localhost:5000/workday", {crossdomain: true})
        .then(response => {
            setWorkday(response.data);
        });
    };

    useEffect(() => {
        getWorkday();
    }, []);

    const emp = [];

    return (
        <>
            <div className='box-body le-body'>
                <div className='le-box-header'>
                    <label>ข้อมูลการลา</label>
                </div>
                <div className='le-box-header2'>
                    <label>ลากิจ : 1</label>
                    <label>ลาพักร้อน : 2</label>
                    <label>ลาป่วย : 3</label>
                </div>
                <div className='le-box-content'>
                    <div className='le-header'>
                        <p className='le-empl'>รูปแบบ</p>
                        <p className='le-date'>วันที่</p>
                        <p className='le-type'>ประเภท</p>
                        <p className='le-desc'>เหตุผลการลา</p>
                        <p className='le-sett'>สถานะ</p>
                    </div>
                    <div className='le-content'>
                        {
                            emp.map((item, index) => (
                                <div className='le-content-time' key={index}>
                                    <p className="empl">{item.emp}</p>
                                    <p className="date">{item.date}</p>
                                    <p className="type">{item.type}</p>
                                    <p className="desc">{item.des}</p>
                                    <p className="sett">รออนุมัติ</p>
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
                <div className='lb-box-long ca-sett'>
                    <div className='ca-sett-input'>
                        <label>ประเภท</label>
                        <select name="date" id="date" onChange={(event => {
                            setLeavetype(event.target.value)
                        })}>
                            <option value={"กิจ"}>ลากิจ</option>
                            <option value={"พักร้อน"}>ลาพักร้อน</option>
                            <option value={"ป่วย"}>ลาป่วย</option>
                        </select>
                    </div>
                    <div className='ca-sett-input'>
                        <label>เหตุผลการลา</label>
                        <input onChange={(event => {
                            setLeavename(event.target.value)
                        })}></input>
                    </div>
                </div>
                <div className='lb-box-long ca-sett'>
                    <div className='ca-sett-input'>
                        <label>วันที่</label>
                        <select name="date" id="date" onChange={(event => {
                            setLeavedate(event.target.value)
                        })}>
                            {
                                workDay.map((item, index) => (
                                    <option key={item.work_date} value={item.work_id}>{item.work_date}</option>
                                ))
                            }
                        </select>
                    </div>
                    {/* <div className='ca-sett-input'>
                        <label>วันที่สิ้นสุด</label>
                        <input></input>
                    </div> */}
                </div>
                <div className='lb-box-long ca-sett'>
                    <div className='ca-sett-submit'>
                        <button>บันทึก</button>
                        <button>ลบ</button>
                    </div>               
                </div>
            </div>
        </>
    );
};

export default LeaveTable;