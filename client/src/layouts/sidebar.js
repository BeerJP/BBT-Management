import { React } from 'react';
import { NavLink } from 'react-router-dom';
import hm from '../assets/icon/home.png';
import em from '../assets/icon/users-alt.png';
import ut from '../assets/icon/user-time.png';
import ca from '../assets/icon/calendar.png';
import dc from '../assets/icon/document.png';


function SideBar() {

    return (
        <>  <div className='side-menu'>
                <div>
                    <NavLink to="/" className='menu-icon'>
                        <img src={hm} alt=''/>
                        <p>หน้าหลัก</p>
                    </NavLink>
                    <NavLink to="/employee" className='menu-icon'>
                        <img src={em} alt=''/>
                        <p>พนักงาน</p>
                    </NavLink>
                    <NavLink to="/timesheet" className='menu-icon'>
                        <img src={ut} alt=''/>
                        <p>ใบบันทึกเวลา</p>
                    </NavLink>
                    <NavLink to="/calendar" className='menu-icon'>
                        <img src={ca} alt=''/>
                        <p>ปฏิทิน</p>
                    </NavLink>
                    <NavLink to="/leave" className='menu-icon'>
                        <img src={dc} alt=''/>
                        <p>จัดการใบลา</p>
                    </NavLink>
                </div>
            </div>
        </>
    );
};

export default SideBar;