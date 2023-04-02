import { React } from 'react';
import { NavLink } from 'react-router-dom';
import hm from '../assets/icon/home.png';
import em from '../assets/icon/users-alt.png';
import ut from '../assets/icon/user-time.png';
import ca from '../assets/icon/calendar.png';
import dc from '../assets/icon/document.png';


function SideBar(props) {

    // const user = props.data[0];
    const logout = props.data[1];

    const user = [{
        emp_id: 1001,
        type_id: 1
    }];

    return (
        <>  
            {
                user[0].type_id === 1 || user[0].type_id === 2 ?
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