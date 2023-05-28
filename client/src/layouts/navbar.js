import { React, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import SideBar from './sidebar';
import logo from '../assets/icon/time-management.png';
import IpContext from '../ipContext';

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';


function NavBar() {

    const ip = useContext(IpContext);

    const [isOpen, setOpen] = useState(false);

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
                setTypeid(response.data.type_id);
                setUsername(response.data.user_name);
                setUsertype(response.data.user_type);
            } else {
                setTypeid(0);
            }
        });
    }, [ip]);

    const logout = () => {
        window.location = '/login';
        localStorage.removeItem('token');
    };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 300,
        height: 150,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    if (isTypeid !== 0) {
        return (
            <>
                <Modal
                open={isOpen}
                onClose={() => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <CloseIcon onClick={() => setOpen(false)} sx={{position: 'absolute', top: 0.5, right: 0.5}}/>
                        <Typography id="modal-modal-description" sx={{ mt: 2 , textAlign: 'center'}} >
                            <h4>ยืนยันการออกจากระบบ</h4>
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 5 , textAlign: 'center'}} >
                            <Button variant="outlined" color="success"size="large" sx={{mr: 1}} onClick={() => logout()}>ยืนยัน</Button>
                            <Button variant="outlined" color="error"size="large" sx={{ml: 1}} onClick={() => setOpen(false)}>ยกเลิก</Button>
                        </Typography>
                    </Box>
                </Modal>
                <nav className='navbar' key='1'>
                    <div className='nav-container'>
                        <div className='left-box'>
                        </div>
                        <div className='right-box'>
                            <label>
                                <p>{isUserName}</p>
                                <p>{isUsertype}</p>
                            </label>
                        </div>
                    </div>
                </nav>
                <SideBar isTypeid={isTypeid} open={setOpen}/>
            </>
        )
    }
};

export default NavBar;