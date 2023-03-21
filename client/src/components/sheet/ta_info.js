import { React } from 'react';
import moment from "moment";
import ne from '../../assets/icon/note-edit.png';
import al from '../../assets/icon/angle-left.png';
import ar from '../../assets/icon/angle-right.png';


function TimeSheetInfo(props) {

    const emp = props.data;

    return (
        <>
            {/* <div className='box-body ov-header-combo ta-info'>
                <div><img src={al} alt=''/></div>
                <p className='ov-select-txt'>มกราคม - 2566</p>
                <div><img src={ar} alt=''/></div>
            </div> */}
            <div className='box-body ta-body'>
                <div className='ta-box-content'>
                    <div className='ta-header'>
                        <p className='ta-date'>วันที่</p>
                        <p className='ta-time'>เวลาเข้า</p>
                        <p className='ta-time'>เวลาออก</p>
                        <p className='ta-time'>แก้ไข</p>
                    </div>
                    <div className='ta-content'>
                        {
                            emp.map((item, index) => (
                                <div className='ta-content-time' key={index}>
                                    <p className="date">{moment(item.work_date).utc().format('DD/MM/YYYY')}</p>
                                    <p className="time">{item.time_in.substring(0, 5)}</p>
                                    <p className="time">{item.time_out.substring(0, 5)}</p>
                                    <div>
                                        <div className='ta-img-bx'>
                                            <img src={ne} alt=''/>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default TimeSheetInfo;