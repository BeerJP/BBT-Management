import { React, useState, useEffect } from 'react';
import axios from 'axios';


function EditCard(props) {

    if (!props.data) {
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
        emp = props.data;
    };

    const [deptInfo, setDeptinfo] = useState([{ dept_id: ' ', dept_name: ' ' }]);
    const [typeInfo, setTypeinfo] = useState([{ type_id: ' ', type_name: ' ' }]);

    const [id, setId] = useState(emp.emp_id);
    const [name, setName] = useState(emp.emp_name);
    const [surname, setSur] = useState(emp.emp_surname);
    const [dept, setDept] = useState(emp.dept_id);
    const [gender, setGender] = useState(emp.emp_enddate);
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
        await axios.get("http://localhost:5000/department", {crossdomain: true})
        .then(response => {
            setDeptinfo(response.data);
        });
    };

    const getType = async() => {
        await axios.get("http://localhost:5000/type", {crossdomain: true})
        .then(response => {
            setTypeinfo(response.data);
        });
    };

    const updateEmployee = () => {
        axios.put("http://localhost:5000/update_employee", { 
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
        .then(axios.put("http://localhost:5000/update_user", { 
            id: id,
            username: username,
            password: password,
            type: type 
        }, {crossdomain: true}))
    };

    useEffect(() => {
        getDepart();
        getType();
    }, []);

    return (
        <>
             <div className='box-body em-body-left'>
                <div className='box-body em-article'>
                    <div className='em-header'>
                        <label>ข้อมูลส่วนตัว</label>
                    </div>
                    <div className='lb-box-long em-info'>
                        <div>
                            <label>ชื่อ</label>
                            <input onChange={(event => {setName(event.target.value)})} id='name' defaultValue={emp.emp_name}></input>
                        </div>
                        <div>
                            <label>นามสกุล</label>
                            <input onChange={(event => {setSur(event.target.value)})} defaultValue={emp.emp_surname}></input>
                        </div>
                    </div>
                    <div className='lb-box-long em-info'>
                        <div>
                            <label>เพศ</label>
                            <select name="gender" id="gen" onChange={(event => {setGender(event.target.value)})}>
                                <option value={"ชาย"}>ชาย</option>
                                <option value={"หญิง"}>หญิง</option>
                                <option value={"อื่นๆ"}>อื่นๆ</option>
                            </select>
                        </div>
                        <div>
                            <label>แผนก</label>
                            <select name="department" id="dept" onChange={(event => {setDept(event.target.value)})}>
                                {
                                    deptInfo.map((item, index) => (
                                        <option key={item.dept_id} value={item.dept_id}>{item.dept_name}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>
                    <div className='lb-box-long em-info'>
                        <div>
                            <label>วันเกิด</label>
                            <input onChange={(event => {setBirth(event.target.value)})} defaultValue={emp.emp_birthdate}></input>
                        </div>
                        <div>
                            <label>MAC Address 1</label>
                            <input onChange={(event => {setMac1(event.target.value)})} defaultValue={emp.emp_mac1}></input>
                        </div>
                    </div>
                    <div className='lb-box-long em-info'>
                        <div>
                            <label>เลขบัตรประชาชน</label>
                            <input onChange={(event => {setIdcard(event.target.value)})} defaultValue={emp.emp_idcard}></input>
                        </div>
                        <div>
                            <label>MAC Address 2</label>
                            <input onChange={(event => {setMac2(event.target.value)})} defaultValue={emp.emp_mac2}></input>
                        </div>
                    </div>
                    <div className='lb-box-long em-info'>
                        <div>
                            <label>วันเริ่มงาน</label>
                            <input onChange={(event => {setStart(event.target.value)})} defaultValue={emp.emp_startdate}></input>
                        </div>
                        <div>
                            <label>วันสิ้นสุดงาน</label>
                            <input onChange={(event => {setEnd(event.target.value)})} defaultValue={emp.emp_enddate}></input>
                        </div>
                    </div>
                    <div className='lb-box-long em-info'>
                        <div>
                            <label>ที่อยู่</label>
                            <input onChange={(event => {setAddress(event.target.value)})} defaultValue={emp.emp_address}></input>
                        </div>
                    </div>
                </div>
                <div className='box-body em-article'>
                    <div className='em-header'>
                        <label>ข้อมูลสำหรับเข้าสู่ระบบ</label>
                    </div>
                    <div className='lb-box-long em-info'>
                        <div>
                            <label>Username</label>
                            <input onChange={(event => {setUsername(event.target.value)})} defaultValue={emp.user_name}></input>
                        </div>
                        <div>
                            <label>User Type</label>
                            <select name="usertype" id="type" onChange={(event => {setType(event.target.value)})}>
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
                            <label>Password</label>
                            <input onChange={(event => {setPassword(event.target.value)})} defaultValue={emp.user_password}></input>
                        </div>
                        <div>
                            <button onClick={updateEmployee}>บันทึก</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditCard;