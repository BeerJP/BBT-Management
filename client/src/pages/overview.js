import { React, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import '../assets/style/overview.css';
import AdminContent1 from '../components/overview/ad_content1';
import AdminContent2 from '../components/overview/ad_content2';
import UserContent from '../components/overview/us_content';
import IpContext from '../ipContext';


function Overview() {

    const ip = useContext(IpContext);
    const [isUserid, setUserid] = useState(0)
    const [isTypeid, setTypeid] = useState(0)
    const [isDisabled, setDisabled] = useState(true)
    const [isUserdisa, setUserdisa] = useState(true)

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.post("http://"+ ip +":5000/session", {
            token: token
        }, {crossdomain: true})
        .then(response => {
            if (response.data.user_id) {
                setUserid(response.data.user_id)
                setTypeid(response.data.type_id)
                if (response.data.user_id === 1 || response.data.type_id === 2) {
                    setDisabled(false)
                    setUserdisa(true)
                } else {
                    setDisabled(true)
                    setUserdisa(false)
                }
            } 
            else {
                localStorage.removeItem('token')
                window.location.href ='/login'
            }
        });
    }, []);

    console.log(isDisabled)
    console.log(isUserdisa)

    return (
        <>
            {   
                isTypeid === 1 || isTypeid === 2 ?  
                [<div className='box-content' disabled={isDisabled} key='1'><AdminContent1 data={ip}/></div>,
                <div className='box-content' disabled={isDisabled} key='2'><AdminContent2 data={ip}/></div>] 
                :
                <div className='box-content' disabled={isUserdisa} key='3'><UserContent data={[ip, isUserid]}/></div>
            }
        </>
    );
};

export default Overview;