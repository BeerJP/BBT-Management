import { React, useState, useEffect } from 'react';
import axios from 'axios';


function EditCard(props) {

    const ip = props.data[0];
    const id = props.data[1];
    const setCardType = props.data[3];

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
    const [deptInfo, setDeptinfo] = useState([{
        dept_id: ' ',
        dept_name: ' '
    }]);
    const [typeInfo, setTypeinfo] = useState([{
        type_id: ' ',
        type_name: ' '
    }]);

    const [isName, setName] = useState(isEmp.emp_name);
    const [isSurname, setSurname] = useState(isEmp.emp_surname);
    const [isDept, setDept] = useState(isEmp.dept_id);
    const [isGender, setGender] = useState(isEmp.emp_gender);
    const [isBirth, setBirth] = useState(isEmp.emp_birthdate);
    const [isMac1, setMac1] = useState(isEmp.emp_mac1);
    const [isMac2, setMac2] = useState(isEmp.emp_mac2);
    const [isEnd, setEnd] = useState(isEmp.emp_enddate);
    const [isUsername, setUsername] = useState(isEmp.user_name);
    const [isPassword, setPassword] = useState(isEmp.user_password);
    const [isType, setType] = useState(isEmp.type_id);

    useEffect(() => {
        setName(isEmp.emp_name)
        setSurname(isEmp.emp_surname)
        setDept(isEmp.dept_id)
        setGender(isEmp.emp_gender)
        setBirth(isEmp.emp_birthdate)
        setMac1(isEmp.emp_mac1)
        setMac2(isEmp.emp_mac2)
        setEnd(isEmp.emp_enddate)
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
            end: isEnd,
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



    return (
        <>
             <div className='box-body em-body-left'>
                <div className='box-body em-article'>
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
                            <input className='text-box' type='date' onSelect={(event => {setBirth(event.target.value)})} 
                            id='date' defaultValue={isEmp.emp_birthdate}></input>
                        </div>
                        <div>
                            <label className='lb-header'>MAC Address 1</label>
                            <input className='text-box' key={isEmp.emp_mac1} onChange={(event => {setMac1(event.target.value)})} 
                            id='mac' defaultValue={isEmp.emp_mac1}></input>
                        </div>
                    </div>
                    <div className='lb-box-long em-info'>
                        <div>
                            <label className='lb-header'>วันสิ้นสุดงาน</label>
                            <input className='text-box' type='date' onChange={(event => {setEnd(event.target.value)})} 
                            id='end' defaultValue={isEmp.emp_enddate}></input>
                        </div>
                        <div>
                            <label className='lb-header'>MAC Address 2</label>
                            <input className='text-box' key={isEmp.emp_mac2} onChange={(event => {setMac2(event.target.value)})} 
                            id='mac' defaultValue={isEmp.emp_mac2}></input>
                        </div>
                    </div>
                    <div className='lb-box-long em-info'></div>
                    <div className='lb-box-long em-info'></div>
                    <div className='lb-box-long em-info'>
                        <div>
                            <label className='lb-header'>Username</label>
                            <input className='text-box' key={isEmp.user_name} onChange={(event => {setUsername(event.target.value)})} 
                            id='user' defaultValue={isEmp.user_name}></input>
                        </div>
                        <div>
                            <label className='lb-header'>User Type</label>
                            <select className='text-box select-box' name="usertype" 
                            id="type" onClick={(event => {setType(event.target.value)})}>
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
                            <input className='text-box' id='pass' onChange={(event => {setPassword(event.target.value)})}></input>
                        </div>
                        <div>
                            <button className='update' onClick={updateEmployee}>บันทึก</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditCard;