import { React, useState, useEffect } from 'react';
import SideBar from './sidebar';
import Login from '../pages/login';
import logo from '../assets/icon/time-management.png';


function NavBar({children}) {

    const [session, setSession] = useState([{
        emp_id: '',
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
    }]);

    return (
        <>
            <nav className='navbar'>
                <div className='nav-container'>
                    <div className='left-box'>
                        <img src={logo} alt=''></img>
                        <label className='home-menu'>BBTE Management</label>
                    </div>
                    <div className='right-box'>
                        <label>
                            <p>{session.emp_name} {session.emp_surname}</p>
                            <p>{session.type_name}</p>
                        </label>
                    </div>
                </div>
            </nav>
            <div className='container'>
            <div><SideBar data={[session, setSession]}/></div> 
                <div className='content'>
                    {/* {
                        session[0].emp_id === '' ? 
                        <Login data={setSession}/> : 
                        [<div><SideBar data={[session, setSession]}/></div>, <div className='main-content'>{children}</div>]
                    } */}
                    
                    <div className='main-content'>
                        {children}
                    </div>
                </div>
            </div>
            <footer></footer>
        </>
    );
};

export default NavBar;