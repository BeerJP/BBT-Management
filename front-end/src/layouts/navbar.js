import { React } from 'react';
import { NavLink } from 'react-router-dom';
import SideBar from './sidebar';


function NavBar({children}) {

    return (
        <>
        <nav className='navbar'>
            <div className='nav-container'>
                <div className='left-box'>
                    <NavLink to="/" className='home-menu'>BBTE Management</NavLink>
                </div>
                <div className='right-box'>
                    <label>
                        <p>Jakkapan Pupaput</p>
                        <p>Admin</p>
                    </label>
                </div>
            </div>
        </nav>
        <div className='container'>
            <div className='content'>
                <div>
                    <SideBar/>
                </div>
                <div className='main-content'>
                    {children}
                </div>
            </div>
        </div>
        </>
    );
};

export default NavBar;