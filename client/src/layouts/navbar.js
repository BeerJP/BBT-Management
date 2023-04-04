import { React, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import SideBar from './sidebar';
import logo from '../assets/icon/time-management.png';
import IpContext from '../ipContext';


function NavBar() {

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

    return (
        <>  
            {
                isTypeid === 0 ? '' :
            [<nav className='navbar'>
                <div className='nav-container'>
                    <div className='left-box'>
                        <img src={logo} alt=''></img>
                        <label className='home-menu'>BBTE Management</label>
                    </div>
                    <div className='right-box'>
                        <label>
                            <p>{isUserName}</p>
                            <p>{isUsertype}</p>
                        </label>
                    </div>
                </div>
            </nav>,
            <SideBar isTypeid={isTypeid}/>]
            }

            {/* <div className='container'>
            {
                isTypeid === 0 ? 
                '' :
                <div><SideBar isTypeid={isTypeid}/></div> 
            }
                <div className='content'>
                    <div className='main-content' key=''>{children}</div>
                </div>
            </div>
            <footer></footer> */}
        </>
    );
};

export default NavBar;