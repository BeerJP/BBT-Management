import { React, useState, useEffect } from 'react';
import axios from 'axios';


function AddCard(props) {

    const [deptInfo, setDeptinfo] = useState([{
        dept_id: ' ',
        dept_name: ' '
    }]);

    const [typeInfo, setTypeinfo] = useState([{
        type_id: ' ',
        type_name: ' '
    }]);

    const id = props.data;
    const [name, setName] = useState(' ');
    const [surname, setSur] = useState(' ');
    const [dept, setDept] = useState(1);
    const [gender, setGender] = useState('ชาย');
    const [birth, setBirth] = useState(' ');
    const [idcard, setIdcard] = useState(' ');
    const [mac1, setMac1] = useState(' ');
    const [mac2, setMac2] = useState(' ');
    const [start, setStart] = useState(' ');
    const [address, setAddress] = useState(' ');
    const [username, setUsername] = useState(' ');
    const [password, setPassword] = useState(' ');
    const [type, setType] = useState(1);


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

    const insertEmployee = () => {
        axios.post("http://localhost:5000/add_employee", { 
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
            address: address
        }, {crossdomain: true})
        .then(axios.post("http://localhost:5000/add_user", { 
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


    // const test = () => {
    //     console.log(id);
    //     console.log(name);
    //     console.log(surname);
    //     console.log(dept);
    //     console.log(gender);
    //     console.log(mac1);
    //     console.log(mac2);
    //     console.log(idcard);
    //     console.log(address);
    //     console.log(username);
    //     console.log(password);
    //     console.log(type);
    // }

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
                            <input onChange={(event => {setName(event.target.value)})}></input>
                        </div>
                        <div>
                            <label>นามสกุล</label>
                            <input onChange={(event => {setSur(event.target.value)})}></input>
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
                            <input onChange={(event => {setBirth(event.target.value)})}></input>
                        </div>
                        <div>
                            <label>MAC Address 1</label>
                            <input onChange={(event => {setMac1(event.target.value)})}></input>
                        </div>
                    </div>
                    <div className='lb-box-long em-info'>
                        <div>
                            <label>เลขบัตรประชาชน</label>
                            <input onChange={(event => {setIdcard(event.target.value)})}></input>
                        </div>
                        <div>
                            <label>MAC Address 2</label>
                            <input onChange={(event => {setMac2(event.target.value)})}></input>
                        </div>
                    </div>
                    <div className='lb-box-long em-info'>
                        <div>
                            <label>วันเริ่มงาน</label>
                            <input onChange={(event => {setStart(event.target.value)})}></input>
                        </div>
                    </div>
                    <div className='lb-box-long em-info'>
                        <div>
                            <label>ที่อยู่</label>
                            <input onChange={(event => {setAddress(event.target.value)})}></input>
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
                            <input onChange={(event => {setUsername(event.target.value)})}></input>
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
                            <input onChange={(event => {setPassword(event.target.value)})}></input>
                        </div>
                        <div>
                            <button onClick={insertEmployee}>บันทึก</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddCard;