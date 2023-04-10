import { React, useState, useEffect } from 'react';
import axios from 'axios';
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";


function EditCard(props) {

    const ip = props.data[0];
    const id = props.data[1];
    const setCardType = props.data[3];

    const [isNotnull, setNotnull] = useState(true);
    const [isUservalid, setUservalid] = useState(true);
    const [isPassvalid, setPassvalid] = useState(true);

    const [isEmp, setEmp] = useState({
        emp_id: ' ',
        emp_name: ' ',
        emp_surname: ' ',
        emp_gender: ' ',
        emp_birthdate: '',
        emp_status: ' ',
        emp_startdate: '',
        emp_enddate: '',
        emp_mac1: ' ',
        emp_mac2: ' ',
        dept_id: ' ',
        dept_name: ' ',
        user_name: ' ',
        user_password: ' ',
        type_id: ' ',
        type_name: ' ',
        emp_age: ' '
    })
    const [deptInfo, setDeptinfo] = useState([{ label: ' ', id: ' ' }]);
    const [typeInfo, setTypeinfo] = useState([{ label: ' ', id: ' ' }]);

    const [isName, setName] = useState(isEmp.emp_name);
    const [isSurname, setSurname] = useState(isEmp.emp_surname);
    const [isDept, setDept] = useState(isEmp.dept_id);
    const [isGender, setGender] = useState(isEmp.emp_gender);
    const [isBirth, setBirth] = useState(isEmp.emp_birthdate);
    const [isStart, setStart] = useState(isEmp.emp_mac1);
    const [isMac1, setMac1] = useState(isEmp.emp_mac1);
    const [isMac2, setMac2] = useState(isEmp.emp_mac2);
    const [isUsername, setUsername] = useState(isEmp.user_name);
    const [isPassword, setPassword] = useState(isEmp.user_password);
    const [isType, setType] = useState(isEmp.type_id);

    useEffect(() => {
        setName(isEmp.emp_name)
        setSurname(isEmp.emp_surname)
        setDept(isEmp.dept_id)
        setGender(isEmp.emp_gender)
        setBirth(isEmp.emp_birthdate)
        setStart(isEmp.emp_startdate)
        setMac1(isEmp.emp_mac1)
        setMac2(isEmp.emp_mac2)
        setUsername(isEmp.user_name)
        setPassword(isEmp.user_password)
        setType(isEmp.type_id)
    }, [isEmp])

    useEffect(() => {
        if (props.data[1]){
            const emp = props.data[2];
            setEmp(emp[0])
        } 

        const getDepart = async() => {
            await axios.get("http://"+ ip +":5000/department", {crossdomain: true})
            .then(response => {
                setDeptinfo(response.data);
        })};
    
        const getType = async() => {
            await axios.get("http://"+ ip +":5000/type", {crossdomain: true})
            .then(response => {
                setTypeinfo(response.data);
        })};

        getDepart();
        getType();
    }, [ip, props.data]);

    const updateEmployee = () => {
        axios.put("http://"+ ip +":5000/update_employee", { 
            id: id,
            name: isName, 
            surname: isSurname,
            dept: isDept,
            gender: isGender,
            birth: isBirth,
            mac1: isMac1,
            mac2: isMac2,
            start: isStart,
        }, {crossdomain: true})
        .then(axios.put("http://"+ ip +":5000/update_user", { 
            id: id,
            username: isUsername,
            password: isPassword,
            type: isType 
        }, {crossdomain: true}))
        .then(
            setCardType('infomation'), props.data[4](true)
        )
    };

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

        if (/^[a-zA-Z]+$/.test(isUsername)) {
            setUservalid(false)
        } else {
            setUservalid(true)
        }

        if (/^[0-9]+$/.test(isPassword)) {
            setPassvalid(false)
        } else {
            setPassvalid(true)
        }

    }, [isPassword, isUsername]);

    useEffect(() => {

        if (isName.length === 0 || isSurname.length === 0 || isBirth === '' || isMac1.length !== 17 ||
            isUsername.length < 4 || isPassword.length < 4 || isType === '' || isUservalid  || isPassvalid) {
            setNotnull(false);
        } else {
            setNotnull(true); 
        }

    }, [isBirth, isMac1, isName, isPassvalid, isPassword, isSurname, isType, isUsername, isUservalid]);

    return (
        <>
             <div className='em-body-left'>
                <div className='em-article'>
                    <div className='lb-box-long em-info'>
                        <div>
                            <label className='lb-header'>ชื่อ</label>
                            <input className='text-box' key={isEmp.emp_name} onChange={(event => {setName(event.target.value)})} 
                            id='name' defaultValue={isEmp.emp_name}></input>
                        </div>
                        <div>
                            <label className='lb-header'>นามสกุล</label>
                            <input className='text-box' key={isEmp.emp_surname} onChange={(event => {setSurname(event.target.value)})} 
                            id='surname' defaultValue={isEmp.emp_surname}></input>
                        </div>
                    </div>
                    <div className='lb-box-long em-info'>
                        <div>
                            <label className='lb-header'>เพศ</label>
                            <select className='text-box select-box' name='gender' 
                            id='gen' onClick={(event => {setGender(event.target.value)})}>
                                <option value={'ชาย'}>ชาย</option>
                                <option value={'หญิง'}>หญิง</option>
                                <option value={'อื่นๆ'}>อื่นๆ</option>
                            </select>
                        </div>
                        <div>
                            <label className='lb-header'>แผนก</label>
                            <select className='text-box select-box' name='department' 
                            id='dept' onClick={(event => {setDept(event.target.value)})}>
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
                            <label className='lb-header'>วันเกิด</label>
                            <input className='text-box' type='date' onSelect={(event => {setBirth(event.target.value)})} 
                            id='date' defaultValue={isEmp.emp_birthdate}></input>
                        </div>
                        <div>
                            <label className='lb-header'>MAC Address 1</label>
                            <input className='text-box' maxLength='12' key={isEmp.emp_mac1} onKeyUp={(e => Mac1Colon(e.target))} onChange={(event => {setMac1(event.target.value)})} 
                            id='mac' defaultValue={isEmp.emp_mac1}></input>
                        </div>
                    </div>
                    <div className='lb-box-long em-info'>
                        <div>
                            <label className='lb-header'>วันเริ่มงาน</label>
                            <label className='text-box'>{isEmp.emp_startdate}</label>
                        </div>
                        <div>
                            <label className='lb-header'>MAC Address 2</label>
                            <input className='text-box' maxLength='12' key={isEmp.emp_mac2} onKeyUp={(e => Mac2Colon(e.target))} onChange={(event => {setMac2(event.target.value)})} 
                            id='mac' defaultValue={isEmp.emp_mac2}></input>
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
                            <label className='lb-header'>Username</label>
                            <input className='text-box'
                            maxLength='8'
                            key={isEmp.user_name} onChange={(event => {setUsername(event.target.value)})} 
                            id='user' defaultValue={isEmp.user_name}></input>
                        </div>
                        <div>
                            <label className='lb-header'>User Type</label>
                            <select className='text-box select-box' name="usertype" 
                            id="type" onClick={(event => {setType(event.target.value)})}>
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
                            <label className='lb-header'>Password</label>
                            <input className='text-box'
                            maxLength='8'
                            onChange={(event => {setPassword(event.target.value)})}></input>
                        </div>
                        <div>
                            <button onClick={updateEmployee}
                                style={isNotnull ? {pointerEvents: 'auto', background: '#1D8348'} : {pointerEvents: 'none'}}>
                                บันทึก
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditCard;