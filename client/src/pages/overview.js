import { React, useState, useEffect } from 'react';
import axios from 'axios';
import '../assets/style/overview.css';
import AdminContent1 from '../components/overview/ad_content1';
import AdminContent2 from '../components/overview/ad_content2';


function Overview() {

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
        axios.get("http://localhost:5000/overview", {crossdomain: true})
        .then(response => {
            setOverview(response.data);
        });
    }, []);


    return (
        <>
            <div className='box-content'>
                <AdminContent1 data={overview}/>
            </div>
            <div className='box-content'>
                <AdminContent2/>
            </div>
        </>
    );
};

export default Overview;