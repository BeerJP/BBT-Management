import { React, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import '../assets/style/leave.css';
import LeaveTable from '../components/leave/leave_table';
import LeaveSetting from '../components/leave/leave_setting';
import IpContext from '../ipContext';


function Leave() {

    const ip = useContext(IpContext);
    const [isUserid, setUserid] = useState(0)
    const [isTypeid, setTypeid] = useState(0)

    const [isUpdate, setUpdate] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.post("http://"+ ip +":5000/session", {
            token: token
        }, {crossdomain: true})
        .then(response => {
            if (response.data.user_id) {
                setUserid(response.data.user_id)
                setTypeid(response.data.type_id)
            } 
            else {
                localStorage.removeItem('token')
                window.location = '/login';
            }
        });
    }, []);


    return (
        <>
            {
                isTypeid === 1 || isTypeid === 2 ?  
                [<div className='box-content' key='1'><LeaveTable data={[ip, isUpdate, setUpdate]}/></div>,
                <div className='box-content' key='2'><LeaveSetting data={[ip, isUpdate, setUpdate, isUserid]}/></div>] 
                :
                <div className='box-content' key='3'><LeaveSetting data={[ip, isUpdate, setUpdate, isUserid]}/></div>
            }

        </>
    );
};

export default Leave;