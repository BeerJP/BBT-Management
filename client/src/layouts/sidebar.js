import { React, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import menu from '../assets/icon/menu-burger.png';
import hm from '../assets/icon/home.png';
import so from '../assets/icon/sign-out-alt.png';
import em from '../assets/icon/users-alt.png';
import ut from '../assets/icon/user-time.png';
import ca from '../assets/icon/calendar.png';
import dc from '../assets/icon/document.png';
import sr from '../assets/icon/seo-report.png';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function SideBar(props) {

    const isTypeid = props.isTypeid;
    const [isLogout, setLogout] = useState(false);

    const logout = () => {
        localStorage.removeItem('token');
        window.location = '/login';
    };

    const isOpen = () => {
        const display = document.getElementById('menubox');
        if (display.style.display === '' || display.style.display === 'none') {
            display.style.display = 'block';
        } else if (display.style.display === 'block') {
            display.style.display = 'none';
        }
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        height: 180,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    if (isTypeid === 1) {
        return (
            <>
                <Modal
                open={isLogout}
                onClose={() => setLogout(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h5" component="h2" sx={{textAlign: 'center'}}>
                            ยืนยันการออกจากระบบ
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 8 , textAlign: 'center'}} >
                        <Button sx={{mr: 2, ml: 2}} variant="outlined" color="success" size="large" onClick={logout}>
                            ยืนยัน
                        </Button>
                        <Button sx={{mr: 2, ml: 2}} variant="outlined" color="error" size="large" onClick={() => setLogout(false)}>
                            ยกเลิก
                        </Button>
                    </Typography>
                    </Box>
                </Modal>
                <div className='side-menu'>
                    <div className='logo-box'>
                        <div className='menu' onClick={isOpen}>
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
                            <NavLink to="" 
                                className='menu-icon'>
                                <img src={so} alt=''/>
                                <p className='menu-text' onClick={() => setLogout(true)}>ออกจากระบบ</p>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </>
        )
    } else if (isTypeid === 2 || isTypeid === 3) {
        return (
            <>
                <Modal
                open={isLogout}
                onClose={() => setLogout(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h5" component="h2" sx={{textAlign: 'center'}}>
                            ยืนยันการออกจากระบบ
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 8 , textAlign: 'center'}} >
                        <Button sx={{mr: 2, ml: 2}} variant="outlined" color="success" size="large" onClick={logout}>
                            ยืนยัน
                        </Button>
                        <Button sx={{mr: 2, ml: 2}} variant="outlined" color="error" size="large" onClick={() => setLogout(false)}>
                            ยกเลิก
                        </Button>
                    </Typography>
                    </Box>
                </Modal>
                <div className='side-menu'>
                    <div className='logo-box'>
                        <div className='menu'>
                            <img src={menu} alt='' onClick={isOpen}></img>
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
                            <NavLink to="" 
                                className='menu-icon'>
                                <img src={so} alt=''/>
                                <p className='menu-text' onClick={() => setLogout(true)}>ออกจากระบบ</p>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </>
        )
    }
};

export default SideBar;