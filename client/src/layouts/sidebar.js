import { React, useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/icon/time-management.png';
import IpContext from '../ipContext';
import hm from '../assets/icon/home.png';
import em from '../assets/icon/users-alt.png';
import ut from '../assets/icon/user-time.png';
import ca from '../assets/icon/calendar.png';
import dc from '../assets/icon/document.png';


function SideBar(props) {

    const ip = useContext(IpContext);
    const [isTypeid, setTypeid] = useState(0)
    const [isUserName, setUsername] = useState('')
    const [isUsertype, setUsertype] = useState('')

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.post("http://"+ ip +":5000/session", {
            token: token
        })
        .then(response => {
            if (response.data.user_id) {
                setTypeid(response.data.type_id)
                setUsername(response.data.user_name)
                setUsertype(response.data.user_type)
            }
        });
    }, []);

    const logout = () => {
        localStorage.removeItem('token');
        window.location = '/login';
    };

    console.log(isTypeid)

    return (
        <>  
            {   isTypeid === 0 ? '' 
                :
                isTypeid === 1 || isTypeid === 2 ?
                <div className='side-menu'>
                    <div>
                        <NavLink to="/" 
                            className='menu-icon'>
                            <img src={hm} alt=''/>
                            <p className='menu-text'>หน้าหลัก</p>
                        </NavLink>
                        <NavLink to="/employee" 
                            className='menu-icon'>
                            <img src={em} alt=''/>
                            <p className='menu-text'>พนักงาน</p>
                        </NavLink>
                        <NavLink to="/timesheet" 
                            className='menu-icon'>
                            <img src={ut} alt=''/>
                            <p className='menu-text'>ใบบันทึกเวลา</p>
                        </NavLink>
                        <NavLink to="/calendar" 
                            className='menu-icon'>
                            <img src={ca} alt=''/>
                            <p className='menu-text'>ปฏิทิน</p>
                        </NavLink>
                        <NavLink to="/leave" 
                            className='menu-icon'>
                            <img src={dc} alt=''/>
                            <p className='menu-text'>จัดการใบลา</p>
                        </NavLink>
                    </div>
                    <div>
                        <button className='menu-icon' onClick={() => logout()}>Logout</button>
                    </div>
                </div>
                :
                <div className='side-menu'>
                    <div>
                        <NavLink to="/" 
                            className='menu-icon'>
                            <img src={hm} alt=''/>
                            <p className='menu-text'>หน้าหลัก</p>
                        </NavLink>
                        <NavLink to="/timesheet" 
                            className='menu-icon'>
                            <img src={ut} alt=''/>
                            <p className='menu-text'>ใบบันทึกเวลา</p>
                        </NavLink>
                        <NavLink to="/calendar" 
                            className='menu-icon'>
                            <img src={ca} alt=''/>
                            <p className='menu-text'>ปฏิทิน</p>
                        </NavLink>
                        <NavLink to="/leave" 
                            className='menu-icon'>
                            <img src={dc} alt=''/>
                            <p className='menu-text'>จัดการใบลา</p>
                        </NavLink>
                    </div>
                    <div>
                        <button className='menu-icon' onClick={() => logout()}>Logout</button>
                    </div>
                </div>
            }
            {/* <div className='side-menu'>
                <div>
                    <NavLink to="/" 
                        state={{id: user[0].emp_id, type: user[0].type_id}}
                        className='menu-icon'>
                        <img src={hm} alt=''/>
                        <p className='menu-text'>หน้าหลัก</p>
                    </NavLink>
                    <NavLink to="/employee" 
                        state={{id: user[0].emp_id, type: user[0].type_id}}
                        className='menu-icon'>
                        <img src={em} alt=''/>
                        <p className='menu-text'>พนักงาน</p>
                    </NavLink>
                    <NavLink to="/timesheet" 
                        state={{id: user[0].emp_id, type: user[0].type_id}}
                        className='menu-icon'>
                        <img src={ut} alt=''/>
                        <p className='menu-text'>ใบบันทึกเวลา</p>
                    </NavLink>
                    <NavLink to="/calendar" 
                        state={{id: user[0].emp_id, type: user[0].type_id}}
                        className='menu-icon'>
                        <img src={ca} alt=''/>
                        <p className='menu-text'>ปฏิทิน</p>
                    </NavLink>
                    <NavLink to="/leave" 
                        state={{id: user[0].emp_id, type: user[0].type_id}}
                        className='menu-icon'>
                        <img src={dc} alt=''/>
                        <p className='menu-text'>จัดการใบลา</p>
                    </NavLink>
                </div>
                <div>
                    <button className='menu-icon' onClick={() => logout(null)}>Logout</button>
                </div>
            </div> */}
        </>
    );
};

export default SideBar;