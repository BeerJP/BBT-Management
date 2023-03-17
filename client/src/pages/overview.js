import { React } from 'react';
import '../assets/style/overview.css';
import AdminContent1 from '../components/overview/ad_content1';
import AdminContent2 from '../components/overview/ad_content2';


function Overview() {

    return (
        <>
            <div className='box-content'>
                <AdminContent1/>
            </div>
            <div className='box-content'>
                <AdminContent2/>
            </div>
        </>
    );
};

export default Overview;