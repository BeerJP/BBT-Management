import { React, useState, useEffect } from 'react';
import axios from 'axios';


function AddCard(props) {

    const ip = props.data[2];

    const [deptInfo, setDeptinfo] = useState([{
        dept_id: ' ',
        dept_name: ' '
    }]);

    const [typeInfo, setTypeinfo] = useState([{
        type_id: ' ',
        type_name: ' '
    }]);

    const id = props.data[0];
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

    const setCardType = props.data[1];

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

    const insertEmployee = () => {
        axios.post("http://"+ ip +":5000/add_employee", { 
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
        .then(axios.post("http://"+ ip +":5000/add_user", { 
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
                            <input className='text-box' onChange={(event => {setName(event.target.value)})}></input>
                        </div>
                        <div>
                            <label className='lb-header'>นามสกุล</label>
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
                            <input className='text-box' type='date' max='2004-12-31' onSelect={(event => {setBirth(event.target.value)})}></input>
                        </div>
                        <div>
                            <label className='lb-header'>MAC Address 1</label>
                            <input className='text-box' onChange={(event => {setMac1(event.target.value)})}></input>
                        </div>
                    </div>
                    <div className='lb-box-long em-info'>
                        <div>
                            <label className='lb-header'>เลขบัตรประชาชน</label>
                            <input className='text-box' maxLength={13} onChange={(event => {setIdcard(event.target.value)})}></input>
                        </div>
                        <div>
                            <label className='lb-header'>MAC Address 2</label>
                            <input className='text-box' onChange={(event => {setMac2(event.target.value)})}></input>
                        </div>
                    </div>
                    <div className='lb-box-long em-info'>
                        <div>
                            <label className='lb-header'>วันเริ่มงาน</label>
                            <input className='text-box' type='date'onSelect={(event => {setStart(event.target.value)})}/>
                            {/* <input onChange={(event => {setStart(event.target.value)})}></input> */}
                        </div>
                    </div>
                    <div className='lb-box-long em-info'>
                        <div>
                            <label className='lb-header'>ที่อยู่</label>
                            <input className='text-box emp-address' onChange={(event => {setAddress(event.target.value)})}></input>
                        </div>
                    </div>
                    <div className='lb-box-long em-info'>
                        <div>
                            <label className='lb-header'>Username</label>
                            <input className='text-box' onChange={(event => {setUsername(event.target.value)})}></input>
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
                            <input className='text-box' onChange={(event => {setPassword(event.target.value)})}></input>
                        </div>
                        <div>
                            <button onClick={test}>บันทึก</button>
                            <button className='clear' onClick={test}>ล้างข้อมูล</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddCard;