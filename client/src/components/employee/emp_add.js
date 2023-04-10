import { React, useState, useEffect } from 'react';
import axios from 'axios';
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";


function AddCard(props) {

    const ip = props.data[0];
    const setCardType = props.data[1];
    const selectEmp = props.data[3];

    const [isNotnull, setNotnull] = useState(true);
    const [isUservalid, setUservalid] = useState(true);
    const [isPassvalid, setPassvalid] = useState(true);
    const [isId, setId] = useState();
    const [deptInfo, setDeptinfo] = useState([{ label: ' ', id: ' ' }]);
    const [typeInfo, setTypeinfo] = useState([{ label: ' ', id: ' ' }]);

    const [name, setName] = useState('');
    const [surname, setSur] = useState('');
    const [dept, setDept] = useState(1);
    const [gender, setGender] = useState('ชาย');
    const [birth, setBirth] = useState('');
    const [mac1, setMac1] = useState('');
    const [mac2, setMac2] = useState('');
    const [start, setStart] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [type, setType] = useState('');

    const insertEmployee = () => {
        axios.post("http://"+ ip +":5000/add_employee", { 
            id: isId,
            name: name, 
            surname: surname,
            dept: dept,
            gender: gender,
            birth: birth,
            mac1: mac1,
            mac2: mac2,
            start: start,
        }, {crossdomain: true})
        .then(axios.post("http://"+ ip +":5000/add_user", { 
            id: isId,
            username: username,
            password: password,
            type: type
        }, {crossdomain: true}))
        .then(
            setCardType('infomation'), props.data[2](true), selectEmp(isId)
        );
    };

    useEffect(() => {
        const getId = async() => {
            await axios.get("http://"+ ip +":5000/emp_id", {crossdomain: true})
            .then(response => {
                setId(response.data);
            });
        };

        const getDepart = async() => {
            await axios.get("http://"+ ip +":5000/department", {crossdomain: true})
            .then(response => {
                setDeptinfo(response.data);
            });
        };
    
        const getType = async() => {
            await axios.get("http://"+ ip +":5000/type", {crossdomain: true})
            .then(response => {
                setTypeinfo(response.data);
            });
        };
        getId();
        getDepart();
        getType();
    }, [ip]);


    function Mac1Colon(input) {

        var value = input.value
        if (value.length === 12) {
            value = value.slice(0,   2) + ":" + 
                    value.slice(2,   4) + ":" + 
                    value.slice(4,   6) + ":" + 
                    value.slice(6,   8) + ":" + 
                    value.slice(8,  10) + ":" + 
                    value.slice(10, 12)
        };
        setMac1(value)
        input.value = value;
    };

    function Mac2Colon(input) {

        var value = input.value
        if (value.length === 12) {
            value = value.slice(0,   2) + ":" + 
                    value.slice(2,   4) + ":" + 
                    value.slice(4,   6) + ":" + 
                    value.slice(6,   8) + ":" + 
                    value.slice(8,  10) + ":" + 
                    value.slice(10, 12)
        };
        setMac2(value)
        input.value = value;
    };


    useEffect(() => {

        if (name.length === 0 || surname.length === 0 || birth === '' || start === '' || mac1.length !== 17 ||
            username.length < 4 || password.length < 4 || type === '' || isUservalid  || isPassvalid) {
            setNotnull(false);
        } else {
            setNotnull(true); 
        }

    }, [birth, isPassvalid, isUservalid, mac1, name, password, start, surname, type, username]);

    useEffect(() => {

        if (/^[a-zA-Z]+$/.test(username)) {
            setUservalid(false)
        } else {
            setUservalid(true)
        }

        if (/^[0-9]+$/.test(password)) {
            setPassvalid(false)
        } else {
            setPassvalid(true)
        }

    }, [password, username]);

    return (
        <>
            <div className='em-body-left'>
                <div className='em-article'>
                    <div className='lb-box-long em-info'>
                        <div>
                            <label className='lb-header'>ชื่อ<a>*</a></label>
                            <input className='text-box' onChange={(event => {setName(event.target.value)})}></input>
                        </div>
                        <div>
                            <label className='lb-header'>นามสกุล<a>*</a></label>
                            <input className='text-box' onChange={(event => {setSur(event.target.value)})}></input>
                        </div>
                    </div>
                    <div className='lb-box-long em-info'>
                        <div>
                            <label className='lb-header'>เพศ</label>
                            <select className='text-box select-box' name="gender" id="gen" onClick={(event => {setGender(event.target.value)})}>
                                <option value={"ชาย"}>ชาย</option>
                                <option value={"หญิง"}>หญิง</option>
                                <option value={"อื่นๆ"}>อื่นๆ</option>
                            </select>
                        </div>
                        <div>
                            <label className='lb-header'>แผนก</label>
                            <select className='text-box select-box' name="department" id="dept" onClick={(event => {setDept(event.target.value)})}>
                                {
                                    deptInfo.map((item) => (
                                        <option key={item.id} value={item.id}>{item.label}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>
                    <div className='lb-box-long em-info'>
                        <div>
                            <label className='lb-header'>วันเกิด<a>*</a></label>
                            <input className='text-box' type='date' max='2004-12-31' onSelect={(event => {setBirth(event.target.value)})}></input>
                        </div>
                        <div>
                            <label className='lb-header'>MAC Address 1<a>*</a></label>
                            <input className='text-box' maxLength='12' onKeyUp={(e => Mac1Colon(e.target))} onChange={(event => {setMac1(event.target.value)})}></input>
                        </div>
                    </div>
                    <div className='lb-box-long em-info'>
                        <div>
                            <label className='lb-header'>วันเริ่มงาน<a>*</a></label>
                            <input className='text-box' type='date' onSelect={(event => {setStart(event.target.value)})}/>
                        </div>
                        <div>
                            <label className='lb-header'>MAC Address 2</label>
                            <input className='text-box' maxLength='12' onKeyUp={(e => Mac2Colon(e.target))} onChange={(event => {setMac2(event.target.value)})}></input>
                        </div>
                    </div>
                    <AppBar position="static">
                        <Toolbar>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                ข้อมูลสำหรับเข้าสู่ระบบ
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <div className='lb-box-long em-info'></div>
                    <div className='lb-box-long em-info'>
                        <div>
                            <label className='lb-header'>Username<a>*</a></label>
                            <input className='text-box'
                            maxLength='8'
                            onChange={(event => {setUsername(event.target.value)})}></input>
                        </div>
                        <div>
                            <label className='lb-header'>User Type<a>*</a></label>
                            <select className='text-box select-box' name="usertype" id="type" onClick={(event => {setType(event.target.value)})}>
                                <option disabled selected>กรุณาเลือกประเภทของผู้ใช้</option>
                                {
                                    typeInfo.map((item) => (
                                        <option key={item.id} value={item.id}>{item.label}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>
                    <div className='lb-box-long em-info'>
                        <div>
                            <label className='lb-header'>Password<a>*</a></label>
                            <input className='text-box'
                            maxLength='8'
                            onChange={(event => {setPassword(event.target.value)})}
                            on></input>
                        </div>
                        <div>
                            <button onClick={insertEmployee} 
                                    style={isNotnull ? {pointerEvents: 'auto', background: '#1D8348'} : {pointerEvents: 'none'}}>
                                    บันทึก
                            </button>
                            <button className='clear' onClick={() => setCardType('infomation')}>ล้างข้อมูล</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddCard;