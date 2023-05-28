import { React, useState } from 'react';
import { NavLink } from 'react-router-dom';
import menu from '../assets/icon/menu-burger.png';
import hm from '../assets/icon/home.png';
import so from '../assets/icon/sign-out-alt.png';
import em from '../assets/icon/users-alt.png';
import ut from '../assets/icon/user-time.png';
import ca from '../assets/icon/calendar.png';
import dc from '../assets/icon/document.png';
import sr from '../assets/icon/seo-report.png';


function SideBar(props) {

    const isTypeid = props.isTypeid;
    const setOpen = props.open;

    const isOpenmenu = () => {
        const display = document.getElementById('menubox');
        if (display.style.display === '' || display.style.display === 'none') {
            display.style.display = 'block';
        } else if (display.style.display === 'block') {
            display.style.display = 'none';
        }
    }

    if (isTypeid === 1) {
        return (
            <>
                <div className='side-menu'>
                    <div className='logo-box'>
                        <div className='menu' onClick={isOpenmenu}>
                            <img src={menu} alt=''></img>
                        </div>
                        <label className='home-menu'>BBTE Management</label>
                    </div>
                    <div className='menu-box' id='menubox'>
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
                            <NavLink to="/report" 
                                className='menu-icon'>
                                <img src={sr} alt=''/>
                                <p className='menu-text'>รายงาน</p>
                            </NavLink>
                            <NavLink
                                className='menu-icon'>
                                <img src={so} alt=''/>
                                <p className='menu-text'
                                onClick={() => setOpen(true)}>ออกจากระบบ</p>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </>
        )
    } else if (isTypeid === 2) {
        return (
            <>
                <div className='side-menu'>
                    <div className='logo-box'>
                        <div className='menu'>
                            <img src={menu} alt='' onClick={isOpenmenu}></img>
                        </div>
                        <label className='home-menu'>BBTE Management</label>
                    </div>
                    <div className='menu-box' id='menubox'>
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
                            <NavLink to="/leave" 
                                className='menu-icon'>
                                <img src={dc} alt=''/>
                                <p className='menu-text'>จัดการใบลา</p>
                            </NavLink>
                            <NavLink 
                                className='menu-icon'>
                                <img src={so} alt=''/>
                                <p className='menu-text'
                                onClick={() => setOpen(true)}>ออกจากระบบ</p>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </>
        )
    } else if (isTypeid === 3) {
        return (
            <>
                <div className='side-menu'>
                    <div className='logo-box'>
                        <div className='menu'>
                            <img src={menu} alt='' onClick={isOpenmenu}></img>
                        </div>
                        <label className='home-menu'>BBTE Management</label>
                    </div>
                    <div className='menu-box' id='menubox'>
                        <div>
                            <NavLink to="/" 
                                className='menu-icon'>
                                <img src={hm} alt=''/>
                                <p className='menu-text'>หน้าหลัก</p>
                            </NavLink>
                            <NavLink
                                className='menu-icon'>
                                <img src={so} alt=''/>
                                <p className='menu-text'
                                onClick={() => setOpen(true)}>ออกจากระบบ</p>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </>
        )
    }
};

export default SideBar;