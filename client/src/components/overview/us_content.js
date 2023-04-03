import { React, useState, useEffect } from 'react';
import axios from 'axios';
import ts from '../../assets/icon/timesheet.png';
import ld from '../../assets/icon/leave.png';
// import al from '../../assets/icon/angle-left.png';
// import ar from '../../assets/icon/angle-right.png';


function AdminContent1(props) {

    const ip = props.data[0];
    const isUserid = props.data[1];
    const [isOverview, setOverview] = useState([{
        emp: 0,
        ta: 0,
        nta: 0,
        lta: 0,
        ld: 0,
        bld: 0,
        hld: 0,
        sld: 0,
        wd: 0,
        hd: 0,
    }]);

    useEffect(() => {
        axios.post("http://"+ ip +":5000/overview_user", {
            id: isUserid
        }, {crossdomain: true})
        .then(response => {
            setOverview(response.data);
            console.log(response.data)
        });
    }, [isUserid]);

    const work_percen = Math.round(isOverview[0].wd / (isOverview[0].wd + isOverview[0].hd) * 100);
    const holi_percen = Math.round(isOverview[0].hd / (isOverview[0].wd + isOverview[0].hd) * 100);

    const nta_percen = Math.round(isOverview[0].nta / isOverview[0].ta * 100);
    const lta_percen = Math.round(isOverview[0].lta / isOverview[0].ta * 100);

    const bld_percen = Math.round(isOverview[0].bld / isOverview[0].ld * 100);
    const hld_percen = Math.round(isOverview[0].hld / isOverview[0].ld * 100);
    const sld_percen = Math.round(isOverview[0].sld / isOverview[0].ld * 100);

    const styles = {
        work:{
            background: "linear-gradient(to Right, blue "+ work_percen +"%, white 0%)"
        },

        holi:{
            background: "linear-gradient(to Right, gold "+ holi_percen +"%, white 0%)"
        },

        nta:{
            background: "linear-gradient(to Right, deepskyblue "+ nta_percen +"%, white 0%)"
        },

        lta:{
            background: "linear-gradient(to Right, deepskyblue "+ lta_percen +"%, white 0%)"
        },

        bld:{
            background: "linear-gradient(to Right, orange "+ bld_percen +"%, white 0%)"
        },

        hld:{
            background: "linear-gradient(to Right, orange "+ hld_percen +"%, white 0%)"
        },

        sld:{
            background: "linear-gradient(to Right, orange "+ sld_percen +"%, white 0%)"
        }
    };

    return (
        <>
            <div className='box-body ov-header-left1-user'>
                <div className='lb-box ov-tim-bx'>
                    <p className='ov-emp-num'>{isOverview[0].ta}</p>
                    <p className='ov-emp-txt'>ใบบันทึกเวลา</p>
                </div>
                <div className='lb-box ov-lea-bx'>
                    <p className='ov-emp-num'>{isOverview[0].ld}</p>
                    <p className='ov-emp-txt'>ใบลา</p>
                </div>
            </div>
            <div className='box-body ov-body-left'>
                {/* <div className='box-boy ov-header-combo'>
                    <div><img src={al} alt=''/></div>
                    <p className='ov-select-txt'>มกราคม - 2566</p>
                    <div><img src={ar} alt=''/></div>
                </div> */}
                <div className='box-body ov-header-left2'>
                    <div className='lb-box ov-work-bx'>
                        <p className='ov-date-txt'>วันทำงาน</p>
                        <p className='ov-date-num'>{isOverview[0].wd} วัน ({work_percen}%)</p>
                        <div className='ov-date-percen' style={styles.work}></div>
                    </div>
                    <div className='lb-box ov-holi-bx'>
                        <p className='ov-date-txt'>วันหยุดนักขัตฤกษ์</p>
                        <p className='ov-date-num'>{isOverview[0].hd} วัน ({holi_percen}%)</p>
                        <div className='ov-date-percen' style={styles.holi}></div>
                    </div>
                </div>
                <div className='slash-holi-1'></div>
                <div className='box-body ov-article-left'>
                    <div className='lb-box top-bx'>
                        <p className='ov-ta-txt'>จำนวนการบันทึกเวลา</p>
                        <img src={ts} alt=''></img>
                    </div>
                    <div className='lb-stat-bx'>
                        <div>
                            <label><p>ปกติ</p><p>{isOverview[0].nta} ({nta_percen}%)</p></label>
                            <div className='ov-ta-percen' style={styles.nta}></div>
                        </div>
                        <div>
                            <label><p>สาย</p><p>{isOverview[0].lta} ({lta_percen}%)</p></label>
                            <div className='ov-ta-percen' style={styles.lta}></div>
                        </div>
                    </div>
                </div>
                <div className='box-body ov-article-left'>
                    <div className='lb-box bot-bx'>
                        <p className='ov-ta-txt'>จำนวนการลา</p>
                        <img src={ld} alt=''></img>
                    </div>
                    <div className='lb-stat-bx'>
                        <div>
                            <label><p>ลากิจ</p><p>{isOverview[0].bld} ({bld_percen}%)</p></label>
                            <div className='ov-ta-percen' style={styles.bld}></div>
                        </div>
                        <div>
                            <label><p>ลาพักร้อน</p><p>{isOverview[0].hld} ({hld_percen}%)</p></label>
                            <div className='ov-ta-percen' style={styles.hld}></div>
                        </div>
                        <div>
                            <label><p>ลาป่วย</p><p>{isOverview[0].sld} ({sld_percen}%)</p></label>
                            <div className='ov-ta-percen' style={styles.sld}></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminContent1;