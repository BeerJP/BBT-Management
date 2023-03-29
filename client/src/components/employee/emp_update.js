import { React, useState, useEffect } from 'react';
import axios from 'axios';


function EditCard(props) {

    const ip = props.data[2];

    if (props.data[0] == null) {
        var emp = {
            emp_id: ' ',
            emp_name: ' ',
            emp_surname: ' ',
            emp_idcard: ' ',
            emp_gender: ' ',
            emp_birthdate: ' ',
            emp_address: ' ',
            emp_status: ' ',
            emp_startdate: ' ',
            emp_enddate: ' ',
            emp_mac1: ' ',
            emp_mac2: ' ',
            dept_id: ' ',
            dept_name: ' ',
            user_name: ' ',
            user_password: ' ',
            type_id: ' ',
            type_name: ' ',
            emp_age: ' '
        };
    } else {
        emp = props.data[0];
    };

    const setCardType = props.data[1];

    const [deptInfo, setDeptinfo] = useState([{ dept_id: ' ', dept_name: ' ' }]);
    const [typeInfo, setTypeinfo] = useState([{ type_id: ' ', type_name: ' ' }]);

    const id = emp.emp_id;
    const [name, setName] = useState(emp.emp_name);
    const [surname, setSur] = useState(emp.emp_surname);
    const [dept, setDept] = useState(emp.dept_id);
    const [gender, setGender] = useState(emp.emp_gender);
    const [birth, setBirth] = useState(emp.emp_birthdate);
    const [idcard, setIdcard] = useState(emp.emp_idcard);
    const [mac1, setMac1] = useState(emp.emp_mac1);
    const [mac2, setMac2] = useState(emp.emp_mac2);
    const [start, setStart] = useState(emp.emp_startdate);
    const [end, setEnd] = useState(emp.emp_enddate);
    const [address, setAddress] = useState(emp.emp_address);
    const [username, setUsername] = useState(emp.user_name);
    const [password, setPassword] = useState(emp.user_password);
    const [type, setType] = useState(emp.type_id);

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

    const updateEmployee = () => {
        axios.put("http://"+ ip +":5000/update_employee", { 
            id: id,
            name: name, 
            surname: surname,
            dept: dept,
            gender: gender,
            birth: birth,
            idcard: idcard,
            mac1: mac1,
            mac2: mac2,
            start: start,
            end: end,
            address: address
        }, {crossdomain: true})
        .then(axios.put("http://"+ ip +":5000/update_user", { 
            id: id,
            username: username,
            password: password,
            type: type 
        }, {crossdomain: true}))
        .then(
            setCardType('infomation')
        );
    };

    useEffect(() => {
        getDepart();
        getType();
    }, []);

    const test = () => {
        console.log(id);
        console.log(name);
        console.log(surname);
        console.log(dept);
        console.log(gender);
        console.log(mac1);
        console.log(mac2);
        console.log(birth);
        console.log(start);
        console.log(idcard);
        console.log(address);
        console.log(username);
        console.log(password);
        console.log(type);
        setCardType('infomation');
    }

    return (
        <>
             <div className='box-body em-body-left'>
                <div className='box-body em-article'>
                    <div className='lb-box-long em-info'>
                        <div>
                            <label className='lb-header'>ชื่อ</label>
                            <input className='text-box' onChange={(event => {setName(event.target.value)})} id='name' defaultValue={emp.emp_name}></input>
                        </div>
                        <div>
                            <label className='lb-header'>นามสกุล</label>
                            <input className='text-box' onChange={(event => {setSur(event.target.value)})} defaultValue={emp.emp_surname}></input>
                        </div>
                    </div>
                    <div className='lb-box-long em-info'>
                        <div>
                            <label className='lb-header'>เพศ</label>
                            <select className='text-box select-box' name='gender' id='gen' onClick={(event => {setGender(event.target.value)})}>
                                <option value={'ชาย'}>ชาย</option>
                                <option value={'หญิง'}>หญิง</option>
                                <option value={'อื่นๆ'}>อื่นๆ</option>
                            </select>
                        </div>
                        <div>
                            <label className='lb-header'>แผนก</label>
                            <select className='text-box select-box' name='department' id='dept' onClick={(event => {setDept(event.target.value)})}>
                                {
                                    deptInfo.map((item, index) => (
                                        <option key={index} value={item.dept_id}>{item.dept_name}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>
                    <div className='lb-box-long em-info'>
                        <div>
                            <label className='lb-header'>วันเกิด</label>
                            <input className='text-box' type='date' onSelect={(event => {setBirth(event.target.value)})} defaultValue={emp.emp_birthdate}></input>
                        </div>
                        <div>
                            <label className='lb-header'>MAC Address 1</label>
                            <input className='text-box' onChange={(event => {setMac1(event.target.value)})} defaultValue={emp.emp_mac1}></input>
                        </div>
                    </div>
                    <div className='lb-box-long em-info'>
                        <div>
                            <label className='lb-header'>เลขบัตรประชาชน</label>
                            <input className='text-box' onChange={(event => {setIdcard(event.target.value)})} defaultValue={emp.emp_idcard}></input>
                        </div>
                        <div>
                            <label className='lb-header'>MAC Address 2</label>
                            <input className='text-box' onChange={(event => {setMac2(event.target.value)})} defaultValue={emp.emp_mac2}></input>
                        </div>
                    </div>
                    <div className='lb-box-long em-info'>
                        <div>
                            <label className='lb-header'>วันเริ่มงาน</label>
                            <input className='text-box' type='date' onChange={(event => {setStart(event.target.value)})} defaultValue={emp.emp_startdate}></input>
                        </div>
                        <div>
                            <label className='lb-header'>วันสิ้นสุดงาน</label>
                            <input className='text-box' type='date' onChange={(event => {setEnd(event.target.value)})} defaultValue={emp.emp_enddate}></input>
                        </div>
                    </div>
                    <div className='lb-box-long em-info'>
                        <div>
                            <label className='lb-header'>ที่อยู่</label>
                            <input className='text-box emp-address' onChange={(event => {setAddress(event.target.value)})} defaultValue={emp.emp_address}></input>
                        </div>
                    </div>
                    <div className='lb-box-long em-info'>
                        <div>
                            <label className='lb-header'>Username</label>
                            <input className='text-box' onChange={(event => {setUsername(event.target.value)})} defaultValue={emp.user_name}></input>
                        </div>
                        <div>
                            <label className='lb-header'>User Type</label>
                            <select className='text-box select-box' name="usertype" id="type" onClick={(event => {setType(event.target.value)})}>
                                {
                                    typeInfo.map((item, index) => (
                                        <option key={item.type_id} value={item.type_id}>{item.type_name}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>
                    <div className='lb-box-long em-info'>
                        <div>
                            <label className='lb-header'>Password</label>
                            <input className='text-box' onChange={(event => {setPassword(event.target.value)})} defaultValue={emp.user_password}></input>
                        </div>
                        <div>
                            <button onClick={test}>บันทึก</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditCard;