import { React, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import '../assets/style/leave.css';
import LeaveTable from '../components/leave/leave_table';
import LeaveSetting from '../components/leave/leave_setting';
import Content from '../components/leave/leave_content';
import IpContext from '../ipContext';



function Leave() {

    const ip = useContext(IpContext);
    const [isUserid, setUserid] = useState(0)
    const [isTypeid, setTypeid] = useState(1)

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.post("http://"+ ip +":5000/session", {
            token: token
        }, {crossdomain: true})
        .then(response => {
            if (response.data.user_id) {
                setTypeid(response.data.type_id)
            } 
            else {
                // localStorage.removeItem('token')
                // window.location = '/login';
            }
        });
    }, [ip]);

    if (isTypeid === 1 || isTypeid === 2) {
        return (
            <>
                <div className='container'>
                    <Content ip={ip}/>
                </div>
            </>
        )
    } else if (isTypeid === 3) {
        return (
            <>
            </>
        )
    }
};

export default Leave;