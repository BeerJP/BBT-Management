import { React, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/icon/time-management.png';
import menu from '../assets/icon/menu-burger.png';
import hm from '../assets/icon/home.png';
import so from '../assets/icon/sign-out-alt.png';
import em from '../assets/icon/users-alt.png';
import ut from '../assets/icon/user-time.png';
import ca from '../assets/icon/calendar.png';
import dc from '../assets/icon/document.png';


function SideBar(props) {

    const isTypeid = props.data[0]
    const isResponsive = props.data[1]

    const logout = () => {
        localStorage.removeItem('token');
        window.location = '/login';
    };


    return (
        <>  
            {   isTypeid === 0 ? '' 
                :
                isTypeid === 1 || isTypeid === 2 ?
                <div className='side-menu'>
                    <div className='logo-box'>
                        <img className='menu' 
                            src={menu} 
                            alt=''
                            style={isResponsive === 0 ? {display: 'none'} : 
                            {display: 'flex'}}></img>
                        <img className='logo' src={logo} alt=''></img>
                        <label className='home-menu'>BBTE Management</label>
                    </div>
                    <div className='menu-box'>
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
                            <NavLink to="" 
                                className='menu-icon'>
                                <img src={so} alt=''/>
                                <p className='menu-text'
                                onClick={logout}>ออกจากระบบ</p>
                            </NavLink>
                        </div>
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