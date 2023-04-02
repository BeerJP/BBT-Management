import { React, useState, useEffect } from 'react';
import axios from 'axios';
import lp from '../../assets/icon/paper.png';
import tb from '../../assets/icon/trash-bin.png';


function CalendarTable(props) {

    const ip = props.data[0];
    const isUpdate = props.data[1];
    const setUpdate = props.data[2];

    const [isNotnull, setNotnull] = useState(true);
    const [isChecked, setChecked] = useState(true);

    const [workDay, setWorkday] = useState([{
        work_id: '',
        work_date: '',
        work_status: ''
    }]);
    
    const [holiDay, setHoliday] = useState([]);
    const [holiName, setHoliname] = useState('');
    const [holiDate, setHolidate] = useState('');
    const [isHoliday, setSelect] = useState([]);

    useEffect(() => {

        if (holiDate === '' || holiName.length === 0) {
            setNotnull(false);
        } else {
            setNotnull(true);
        }

    }, [holiName, holiDate]);

    useEffect(() => {

        const lc = document.querySelectorAll("[type='checkbox']");
        const el = [...lc].map(input => input.checked);

        if (el.includes(true)) {
            setChecked(true);
        } else {
            setChecked(false);
        }

    }, [isHoliday]);

    const insertHoliday = () => {
        axios.post("http://"+ ip +":5000/add_holiday", { 
            name: holiName, 
            date: holiDate 
        }, {crossdomain: true})
        .then(axios.put("http://"+ ip +":5000/update_work", {
            state: '0', 
            date: holiDate 
        }, {crossdomain: true}))

        setUpdate(!isUpdate);
        document.getElementById('date').options[0].selected=true;
        setHoliname('');
        setHolidate('');
    };

    const cancelHoliday = () => {
        for (let i = 0; i < isHoliday.length ; i++) {
            axios.post("http://"+ ip +":5000/cancel_holiday", { 
                date: isHoliday[i][0],
            }, {crossdomain: true})
            .then(axios.put("http://"+ ip +":5000/update_work", {
                state: '1', 
                date: isHoliday[i][0] 
            }, {crossdomain: true}))
        };

        setUpdate(!isUpdate);
        setChecked(false);
    };

    const setSelectHoliday = () => {
        const lc = document.querySelectorAll("[type='checkbox']");
        const el = [...lc].map(input => [input.value.split(" "), input.checked]);
        const array = []

        const leave = el.map(function(id) {
            if (id[1]) {
                array.push(id[0])
            }
        });
        setSelect(array);
    };

    useEffect(() => {

        const getHoliday = async() => {
            await axios.get("http://"+ ip +":5000/holiday", {crossdomain: true})
            .then(response => {
                setHoliday(response.data);
            });
        };
    
        const getWorkday = async() => {
            await axios.get("http://"+ ip +":5000/workday", {crossdomain: true})
            .then(response => {
                setWorkday(response.data);
            });
        };

        getWorkday();
        getHoliday();
    }, [ip, isUpdate, holiDate, holiDate]);


    return (
        <>
            <div className='box-body ca-body-bottom'>
                <div className='ca-box-content'>
                    <div className='ca-header'>
                        <p  className='left-butt' 
                            onClick={cancelHoliday}
                            style={isChecked ? {pointerEvents: 'auto'} : {pointerEvents: 'none'}}>
                            {
                                isChecked ? <img src={tb} alt=''/> : 'เลือก'
                            }
                        </p>
                        <p className='ca-name'>วันหยุด</p>
                        <p className='ca-date'>วันที่</p>
                    </div>
                    <div className='ca-content'>
                        {
                            holiDay.map((item, index) => (
                                <div className='ca-table-info' key={index}>
                                    <p className='left-butt'>
                                        <input type="checkbox" value={item.work_id} onClick={setSelectHoliday}></input>
                                    </p>
                                    <p className="ca-name">{item.holi_name}</p>
                                    <p className="ca-date">{item.th_date}</p>
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
                        จัดการวันหยุด
                    </label>
                </div>
                <br></br><br></br>
                <div className='lb-box-long em-info'>
                    <div>
                        <label className='lb-header'>วันหยุด<a>*</a></label>
                        <input className='text-box' placeholder={holiName} onChange={(event => {
                            setHoliname(event.target.value)
                        })}></input>
                    </div>
                    <div>
                        <label className='lb-header'>วันที่<a>*</a></label>
                        <select className='text-box select-box' name="date" id="date" onChange={(event => {
                            setHolidate(event.target.value)
                        })}>
                            <option value="" disabled selected>กรุณาเลือกวันที่</option>
                            {
                                workDay.map((item, index) => (
                                    <option key={item.work_date} value={item.work_id}>{item.th_date}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>
                <div className='lb-box-long em-info'>
                    <div>
                        <button className='add_leave' 
                                onClick={insertHoliday} 
                                style={isNotnull ? {pointerEvents: 'auto', background: '#1D8348'} : {pointerEvents: 'none'}}>
                                บันทึก
                        </button>
                    </div>               
                </div>
            </div>
        </>
    );
};

export default CalendarTable;