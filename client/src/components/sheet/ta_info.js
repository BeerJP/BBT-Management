import { React } from 'react';
import ne from '../../assets/icon/note-edit.png';


function TimeSheetInfo() {

    const emp = [

        {   date:"20/01/2566",
            timeIn:"8.45 น.",
            timeOut:"17.00 น."
        },

        {   date:"20/01/2566",
            timeIn:"8.45 น.",
            timeOut:"17.00 น."
        },

        {   date:"20/01/2566",
            timeIn:"8.45 น.",
            timeOut:"17.00 น."
        },

        {   date:"20/01/2566",
            timeIn:"8.45 น.",
            timeOut:"17.00 น."
        }

    ];

    return (
        <>
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
                                <div className='ta-content-emp' key={index}>
                                    <p className="ta-date">{item.date}</p>
                                    <p className="ta-time">{item.timeIn}</p>
                                    <p className="ta-time">{item.timeOut}</p>
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