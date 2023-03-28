import { React } from 'react';
import moment from "moment";
import et from '../../assets/icon/edit-ta.png';
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
                        <p className='center'>วันที่</p>
                        <p className='center'>เวลาเข้า</p>
                        <p className='center'>เวลาออก</p>
                        <p className='center'>แก้ไข</p>
                    </div>
                    <div className='ta-content'>
                        {
                            emp.map((item, index) => (
                                <div className='ta-content-time' key={index}>
                                    <p className="center">{moment(item.work_date).utc().format('DD/MM/YYYY')}</p>
                                    <p className="center">{item.time_in.substring(0, 5)}</p>
                                    <p className="center">{item.time_out.substring(0, 5)}</p>
                                    <div>
                                        <div className='ta-img-bx'>
                                            <img src={et} alt=''/>
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