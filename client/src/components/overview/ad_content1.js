import { React } from 'react';
// import al from '../../assets/icon/angle-left.png';
// import ar from '../../assets/icon/angle-right.png';


function AdminContent1(props) {

    const ov = props.data;

    const work_percen = (ov[0].wd / (ov[0].wd + ov[0].hd) * 100).toFixed(0);
    const holi_percen = (ov[0].hd / (ov[0].wd + ov[0].hd) * 100).toFixed(0);

    const nta_percen = (ov[0].nta / ov[0].ta * 100).toFixed(0);
    const lta_percen = (ov[0].lta / ov[0].ta * 100).toFixed(0);

    const bld_percen = (ov[0].bld / ov[0].ld * 100).toFixed(0);
    const hld_percen = (ov[0].hld / ov[0].ld * 100).toFixed(0);
    const sld_percen = (ov[0].sld / ov[0].ld * 100).toFixed(0);

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
            <div className='box-body ov-header-left1'>
                <div className='lb-box ov-emp-bx'>
                    <p className='ov-emp-num'>{ov[0].emp}</p>
                    <p className='ov-emp-txt'>พนักงาน</p>
                </div>
                <div className='lb-box ov-tim-bx'>
                    <p className='ov-emp-num'>{ov[0].ta}</p>
                    <p className='ov-emp-txt'>ใบบันทึกเวลา</p>
                </div>
                <div className='lb-box ov-lea-bx'>
                    <p className='ov-emp-num'>{ov[0].ld}</p>
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
                        <p className='ov-date-num'>{ov[0].wd} วัน ({work_percen}%)</p>
                        <div className='ov-date-percen' style={styles.work}></div>
                    </div>
                    <div className='lb-box ov-holi-bx'>
                        <p className='ov-date-txt'>วันหยุดนักขัตฤกษ์ / หยุดพิเศษ</p>
                        <p className='ov-date-num'>{ov[0].hd} วัน ({holi_percen}%)</p>
                        <div className='ov-date-percen' style={styles.holi}></div>
                    </div>
                </div>
                <div className='slash-holi-1'></div>
                <div className='box-body ov-article-left'>
                    <div className='lb-box top-bx'>
                        <p className='ov-ta-txt'>จำนวนการบันทึกเวลา</p>
                        <p className='ov-ta-num'>{ov[0].ta}</p>
                    </div>
                    <div className='lb-stat-bx'>
                        <div>
                            <label><p>ปกติ</p><p>{ov[0].nta} ({nta_percen}%)</p></label>
                            <div className='ov-ta-percen' style={styles.nta}></div>
                        </div>
                        <div>
                            <label><p>สาย</p><p>{ov[0].lta} ({lta_percen}%)</p></label>
                            <div className='ov-ta-percen' style={styles.lta}></div>
                        </div>
                    </div>
                </div>
                <div className='box-body ov-article-left'>
                    <div className='lb-box bot-bx'>
                        <p className='ov-ta-txt'>จำนวนการลา</p>
                        <p className='ov-ta-num'>{ov[0].ld}</p>
                    </div>
                    <div className='lb-stat-bx'>
                        <div>
                            <label><p>ลากิจ</p><p>{ov[0].bld} ({bld_percen}%)</p></label>
                            <div className='ov-ta-percen' style={styles.bld}></div>
                        </div>
                        <div>
                            <label><p>ลาพักร้อน</p><p>{ov[0].hld} ({hld_percen}%)</p></label>
                            <div className='ov-ta-percen' style={styles.hld}></div>
                        </div>
                        <div>
                            <label><p>ลาป่วย</p><p>{ov[0].sld} ({sld_percen}%)</p></label>
                            <div className='ov-ta-percen' style={styles.sld}></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminContent1;