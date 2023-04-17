import { React, useState, useEffect, useContext, } from 'react';
import axios from 'axios';
import '../assets/style/overview.css';
import Content from '../components/overview/overview_content';
import UserContent from '../components/overview/user_content';
import IpContext from '../ipContext';


function Overview() {

    const ip = useContext(IpContext);
    const [isTypeid, setTypeid] = useState(3)
    const [isUserid, setUserid] = useState(1001)

    useEffect(() => {

        const token = localStorage.getItem('token');
        axios.post("http://"+ ip +":5000/session", {
            token: token
        }, {crossdomain: true})
        .then(response => {
            if (response.data.user_id) {
                setUserid(response.data.user_id)
                setTypeid(response.data.type_id)
            } else {
                // localStorage.removeItem('token')
                // window.location.href ='/login'
            }
        });

    }, [ip]);

    if (isTypeid === 1) {
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
                <div className='container'>
                    <UserContent ip={ip} user={isUserid}/>
                </div>
            </>
        )
    }
};

export default Overview;