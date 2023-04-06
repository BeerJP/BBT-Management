import { React, useState, useEffect, useContext, } from 'react';
import axios from 'axios';
import '../assets/style/overview.css';
// import AdminContent1 from '../components/overview/ad_content1';
// import AdminContent2 from '../components/overview/ad_content2';
import Content from '../components/overview/overview_content';
import IpContext from '../ipContext';


function Overview() {

    const ip = useContext(IpContext);
    const [isTypeid, setTypeid] = useState(0)

    useEffect(() => {

        const token = localStorage.getItem('token');
        axios.post("http://"+ ip +":5000/session", {
            token: token
        }, {crossdomain: true})
        .then(response => {
            if (response.data.user_id) {
                setTypeid(response.data.type_id)
            } else {
                localStorage.removeItem('token')
                window.location.href ='/login'
            }
        });

    }, [ip]);

    if (isTypeid === 1 || isTypeid === 2) {
        return (
            <>
                <div className='container'>
                    <Content ip={ip}/>
                    {/* <div className='box-content' key='1'><AdminContent1 data={ip}/></div>
                    <div className='box-content' key='2'><AdminContent2 data={ip}/></div>  */}
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

export default Overview;