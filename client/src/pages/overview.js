import { React, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import '../assets/style/overview.css';
import AdminContent1 from '../components/overview/ad_content1';
import AdminContent2 from '../components/overview/ad_content2';
import UserContent from '../components/overview/us_content';
import IpContext from '../ipContext';


function Overview() {

    const [isUserid, setUserid] = useState(1001)
    const [isUsertype, setUsertype] = useState(1)

    // useEffect(() => {

    //     setUserid(location.state.id);
    //     setUsertype(location.state.type);

    // }, [location]);

    const ip = useContext(IpContext);

    const [overview, setOverview] = useState([{
        emp:0,
        ta:0,
        nta:0,
        lta:0,
        ld:0,
        bld:0,
        hld:0,
        sld:0,
        wd:0,
        hd:0
    }]);

    useEffect(() => {
        axios.get("http://"+ ip +":5000/overview", {crossdomain: true})
        .then(response => {
            setOverview(response.data);
        });
    }, [ip]);


    return (
        <>
            {   
                isUsertype === null ? '' :
                isUsertype === 1 || isUsertype === 2 ?  
                [<div className='box-content'><AdminContent1 data={overview}/></div>,
                <div className='box-content'><AdminContent2 data={ip}/></div>] 
                :
                <div className='box-content'><UserContent data={[ip, isUserid]}/></div>
            }
        </>
    );
};

export default Overview;