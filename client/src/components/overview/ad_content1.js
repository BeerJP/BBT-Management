import { React, useState, useEffect } from 'react';
import axios from 'axios';
// import al from '../../assets/icon/angle-left.png';
// import ar from '../../assets/icon/angle-right.png';


function AdminContent1() {

    const [overview, setOverview] = useState();

    useEffect(() => {
        async function getOverview() {

            await axios.get("http://localhost:5000/overview", {crossdomain: true})
            .then(response => {
                setOverview(response.data);
            });

        };

        if (!overview) {
            getOverview();
        }
        // axios.get("http://localhost:5000/overview", {crossdomain: true})
        // .then(response => {
        //     setOverview(response.data);
        // });
    }, []);


    console.log(overview);

    const sum_em = 15;
    const sum_ta = 15;
    const sum_le = 15;
    const percen = 60;

    const styles = {
        work:{
            background: "linear-gradient(to Right, blue "+ percen +"%, white 0%)"
        },

        holi:{
            background: "linear-gradient(to Right, gold "+ percen +"%, white 0%)"
        },

        time:{
            background: "linear-gradient(to Right, deepskyblue "+ percen +"%, white 0%)"
        },

        leav:{
            background: "linear-gradient(to Right, orange "+ percen +"%, white 0%)"
        }
    };

    return (
        <>
            <div className='box-body ov-header-left'>
                <div className='lb-box ov-emp-bx'>
                    <p className='ov-emp-num'>{sum_em}</p>
                    <p className='ov-emp-txt'>พนักงาน</p>
                </div>
                <div className='lb-box ov-tim-bx'>
                    <p className='ov-emp-num'>{sum_em}</p>
                    <p className='ov-emp-txt'>ใบบันทึกเวลา</p>
                </div>
                <div className='lb-box ov-lea-bx'>
                    <p className='ov-emp-num'>{sum_em}</p>
                    <p className='ov-emp-txt'>ใบลา</p>
                </div>
            </div>
            <div className='box-body ov-body-left'>
                {/* <div className='box-boy ov-header-combo'>
                    <div><img src={al} alt=''/></div>
                    <p className='ov-select-txt'>มกราคม - 2566</p>
                    <div><img src={ar} alt=''/></div>
                </div> */}
                <div className='box-body ov-header-left'>
                    <div className='lb-box ov-work-bx'>
                        <p className='ov-date-txt'>วันทำงาน</p>
                        <p className='ov-date-num'>{sum_em} วัน ({percen}%)</p>
                        <div className='ov-date-percen' style={styles.work}></div>
                    </div>
                    <div className='lb-box ov-holi-bx'>
                        <p className='ov-date-txt'>วันหยุดนักขัตฤกษ์ / หยุดพิเศษ</p>
                        <p className='ov-date-num'>{sum_em} วัน ({percen}%)</p>
                        <div className='ov-date-percen' style={styles.holi}></div>
                    </div>
                </div>
                <div className='slash-holi-1'></div>
                <div className='box-body ov-article-left'>
                    <div className='lb-box top-bx'>
                        <p className='ov-ta-txt'>จำนวนการบันทึกเวลา</p>
                        <p className='ov-ta-num'>{sum_ta}</p>
                    </div>
                    <div className='lb-stat-bx'>
                        <div>
                            <label><p>ปกติ</p><p>{sum_em} ({percen}%)</p></label>
                            <div className='ov-ta-percen' style={styles.time}></div>
                        </div>
                        <div>
                            <label><p>สาย</p><p>{sum_em} ({percen}%)</p></label>
                            <div className='ov-ta-percen' style={styles.time}></div>
                        </div>
                    </div>
                </div>
                <div className='box-body ov-article-left'>
                    <div className='lb-box bot-bx'>
                        <p className='ov-ta-txt'>จำนวนการลา</p>
                        <p className='ov-ta-num'>{sum_le}</p>
                    </div>
                    <div className='lb-stat-bx'>
                        <div>
                            <label><p>ลากิจ</p><p>{sum_em} ({percen}%)</p></label>
                            <div className='ov-ta-percen' style={styles.leav}></div>
                        </div>
                        <div>
                            <label><p>ลาพักร้อน</p><p>{sum_em} ({percen}%)</p></label>
                            <div className='ov-ta-percen' style={styles.leav}></div>
                        </div>
                        <div>
                            <label><p>ลาป่วย</p><p>{sum_em} ({percen}%)</p></label>
                            <div className='ov-ta-percen' style={styles.leav}></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminContent1;