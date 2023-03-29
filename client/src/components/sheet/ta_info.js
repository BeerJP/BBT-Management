import { React, useState } from 'react';
import moment from "moment";
import et from '../../assets/icon/edit-ta.png';
import al from '../../assets/icon/angle-left.png';
import ar from '../../assets/icon/angle-right.png';
import tc from '../../assets/icon/check.png';


function TimeSheetInfo(props) {

    const emp = props.data;

    const [timeEdit, setEdit] = useState(false);
    const edit = () => {
        setEdit(!timeEdit);
        const element = document.querySelectorAll("[id='input']");
        for (var i = 0; i < element.length; i++) {
            element[i].disabled = timeEdit;
        };
    };

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
                        <div>
                            <div className='ta-img-bx' onClick={edit}>
                                <img src={tc} alt=''/>
                            </div>
                        </div>
                    </div>
                    <div className='ta-content'>
                        {
                            // emp.map((item, index) => (
                            //     <div className='ta-content-time' key={index}>
                            //         <p className="center">{item.work_date}</p>
                            //         <p className="center">{item.time_in.substring(0, 5)}</p>
                            //         <p className="center">{item.time_out.substring(0, 5)}</p>
                            //         <div>
                            //             <div className='ta-img-bx' onClick={() => console.log(index)}>
                            //                 <img src={et} alt=''/>
                            //             </div>
                            //         </div>
                            //     </div>
                            // ))
                            emp.map((item, index) => (
                                <div className='ta-content-time' key={index}>
                                    <p className="center">{item.work_date}</p>
                                    <input className="center" id='input' defaultValue={item.time_in.substring(0, 5)} disabled></input>
                                    <input className="center" id='input' defaultValue={item.time_out.substring(0, 5)} disabled></input>
                                    <p className="center">-</p>
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