import { React, useState, useEffect } from 'react';
import axios from 'axios';
import lp from '../../assets/icon/paper.png';
import d1 from '../../assets/icon/document1.png';
import d2 from '../../assets/icon/document2.png';
import d3 from '../../assets/icon/document3.png';
import tb from '../../assets/icon/trash-bin.png';


function LeaveSetting(props) {

    const ip = props.data[0];
    const id = props.data[3];
    const isUpdate = props.data[1];
    const setUpdate = props.data[2];;

    const [isNotnull, setNotnull] = useState(true);
    const [isChecked, setChecked] = useState(true);


    const [workDay, setWorkday] = useState([{
        work_id: '',
        work_date: '',
        work_status: '',
        th_date: ''
    }]);
    
    const [leaveType, setLeavetype] = useState('');
    const [leaveName, setLeavename] = useState('');
    const [leaveDate, setLeavedate] = useState('');
    const [isEmpleave, setLeave] = useState([]);


    useEffect(() => {

        if (leaveType === '' || leaveName.length === 0 || leaveDate === '') {
            setNotnull(false)
        } else {
            setNotnull(true)
        }

    }, [leaveType, leaveName, leaveDate]);

    useEffect(() => {

        const lc = document.querySelectorAll("[type='checkbox']");
        const el = [...lc].map(input => input.checked);

        if (el.includes(true)) {
            setChecked(true)
        } else {
            setChecked(false)
        }

    }, [isEmpleave]);

    const [leaveSum, setLeavesum] = useState({
        ld:0,
        bld:0,
        hld:0,
        sld:0
    });

    const [leaveEmp, setLeaveemp] = useState([{
        leave_type: '',
        leave_date: '',
        leave_description: '',
        leave_appove: '',
        th_date: ''
    }]);

    const insertLeave = () => {
        axios.post("http://"+ ip +":5000/add_leave", { 
            type: leaveType,
            date: leaveDate,
            description: leaveName,
            id: id,
        }, {crossdomain: true})
        setUpdate(!isUpdate)
        document.getElementById('type').options[0].selected=true;
        document.getElementById('date').options[0].selected=true;
        document.getElementById('desc').value = '';
        setLeavetype('');
        setLeavename('');
        setLeavedate('');
    };

    const setEmpleave = () => {
        const lc = document.querySelectorAll("[type='checkbox']");
        const el = [...lc].map(input => [input.value.split(" "), input.checked]);
        const array = []

        const leave = el.map(function(id) {
            if (id[1]) {
                array.push(id[0])
            }
        })
        setLeave(array);
    }

    const deleteLeave = () => {
        for (let i = 0; i < isEmpleave.length ; i++) {
            axios.post("http://"+ ip +":5000/cancel_leave", { 
                id: isEmpleave[i][0],
                date: isEmpleave[i][1],
            }, {crossdomain: true})
        };

        setUpdate(!isUpdate);
        setChecked(false);
    };

    useEffect(() => {

        const getWorkday = async() => {
            await axios.post("http://"+ ip +":5000/workday_emp", {
                id: id,
            }, {crossdomain: true})
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

        getWorkday();
        getLeavesum();
        getLeaveemp();
    }, [id, ip, isUpdate]);


    return (
        <>
            <div className='box-body le-body'>
                <div className='le-box-header'>
                    <img src={lp} alt=''/>
                    <label>ข้อมูลการลา</label>
                </div>
                <div className='le-box-header2'>
                    <label><img src={d1} alt=''/>ลากิจ : {leaveSum.bld}</label>
                    <label><img src={d3} alt=''/>ลาพักร้อน : {leaveSum.hld}</label>
                    <label><img src={d2} alt=''/>ลาป่วย : {leaveSum.sld}</label>
                </div>
                <div className='le-box-content'>
                    <div className='le-header'>
                        <p  className='left-butt' 
                            onClick={deleteLeave}
                            style={isChecked ? {pointerEvents: 'auto'} : {pointerEvents: 'none'}}>
                            {
                                isChecked ? <img src={tb} alt=''/> : 'เลือก'
                            }
                        </p>
                        <p className='center'>วันที่</p>
                        <p className='center'>ประเภท</p>
                        <p className="long-center">เหตุผลการลา</p>
                        <p className='center'>สถานะ</p>
                    </div>
                    <div className='le-content'>
                        {
                            leaveEmp.map((item, index) => (
                                <div className='le-content-time' key={index}>
                                    <p className='left-butt'>
                                        <input type="checkbox" value={item.emp_id + ' ' + item.leave_date} onClick={setEmpleave}></input>
                                    </p>
                                    <p className="center">{item.th_date}</p>
                                    <p className="center">{item.leave_type}</p>
                                    <p className="long-center">{item.leave_description}</p>
                                    <p className="center">{item.leave_appove}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className='box-body ca-box-set'>
                <div className='le-box-header'>
                    <img src={lp} alt=''/>
                    <label>
                        การจัดการใบลา
                    </label>
                </div>
                <br></br><br></br>
                <div className='lb-box-long em-info'>
                    <div>
                        <label className='lb-header'>ประเภท<a>*</a></label>
                        <select className='text-box select-box' id="type" onChange={(event => {
                            setLeavetype(event.target.value)
                        })}>
                            <option value="" disabled selected>กรุณาเลือกประเภทวันลา</option>
                            <option value={"ลากิจ"}>ลากิจ</option>
                            <option value={"ลาพักร้อน"}>ลาพักร้อน</option>
                            <option value={"ลาป่วย"}>ลาป่วย</option>
                        </select>
                    </div>
                    <div className='ca-sett-input'>
                        <label className='lb-header'>เหตุผลการลา<a>*</a></label>
                        <input className='text-box' id="desc" onChange={(event => {
                            setLeavename(event.target.value)
                        })}></input>
                    </div>
                </div>
                <div className='lb-box-long em-info'>
                    <div>
                        <label className='lb-header'>วันที่<a>*</a></label>
                        <select className='text-box select-box' id='date' onChange={(event => {
                            setLeavedate(event.target.value)
                        })}>
                            <option value="" disabled selected>กรุณาเลือกวันที่</option>
                            {
                                workDay.map((item, index) => (
                                    <option key={index} value={item.work_date}>{item.th_date}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div>
                        <button className='add_leave' 
                                onClick={insertLeave} 
                                style={isNotnull ? {pointerEvents: 'auto', background: '#1D8348'} : {pointerEvents: 'none'}}>
                                บันทึก
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LeaveSetting;