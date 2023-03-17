import { React } from 'react';
import ne from '../../assets/icon/note-edit.png';
import al from '../../assets/icon/angle-left.png';
import ar from '../../assets/icon/angle-right.png';


function TimeSheetInfo() {

    const emp = [

        {   date:"03/01/2566",
            timeIn:"8.38 น.",
            timeOut:"17.00 น."
        },

        {   date:"04/01/2566",
            timeIn:"8.29 น.",
            timeOut:"17.00 น."
        },

        {   date:"05/01/2566",
            timeIn:"8.31 น.",
            timeOut:"17.00 น."
        },

        {   date:"06/01/2566",
            timeIn:"8.36 น.",
            timeOut:"17.00 น."
        },

        {   date:"07/01/2566",
            timeIn:"8.25 น.",
            timeOut:"12.00 น."
        },

        {   date:"09/01/2566",
            timeIn:"8.34 น.",
            timeOut:"17.00 น."
        },

        {   date:"10/01/2566",
            timeIn:"8.31 น.",
            timeOut:"17.00 น."
        },

        {   date:"11/01/2566",
            timeIn:"8.34 น.",
            timeOut:"17.00 น."
        },

        {   date:"12/01/2566",
            timeIn:"8.37 น.",
            timeOut:"17.00 น."
        },

        {   date:"13/01/2566",
            timeIn:"8.34 น.",
            timeOut:"17.00 น."
        },

        {   date:"14/01/2566",
            timeIn:"8.31 น.",
            timeOut:"12.00 น."
        },

        {   date:"16/01/2566",
            timeIn:"8.40 น.",
            timeOut:"17.00 น."
        },

        {   date:"17/01/2566",
            timeIn:"8.32 น.",
            timeOut:"17.00 น."
        },

        {   date:"18/01/2566",
            timeIn:"8.32 น.",
            timeOut:"17.00 น."
        },

        {   date:"19/01/2566",
            timeIn:"8.33 น.",
            timeOut:"17.00 น."
        },

        {   date:"20/01/2566",
            timeIn:"8.34 น.",
            timeOut:"17.00 น."
        },

        {   date:"21/01/2566",
            timeIn:"-",
            timeOut:"-"
        },

        {   date:"23/01/2566",
            timeIn:"8.35 น.",
            timeOut:"17.00 น."
        },

        {   date:"24/01/2566",
            timeIn:"-",
            timeOut:"-"
        },

        {   date:"25/01/2566",
            timeIn:"8.33 น.",
            timeOut:"17.00 น."
        },

        {   date:"26/01/2566",
            timeIn:"8.37 น.",
            timeOut:"17.00 น."
        },

        {   date:"27/01/2566",
            timeIn:"8.35 น.",
            timeOut:"17.00 น."
        },

        {   date:"30/01/2566",
            timeIn:"8.45 น.",
            timeOut:"17.00 น."
        },

        {   date:"31/01/2566",
            timeIn:"8.36 น.",
            timeOut:"17.00 น."
        }

    ];

    return (
        <>
            <div className='box-body ov-header-combo ta-info'>
                <div><img src={al} alt=''/></div>
                <p className='ov-select-txt'>มกราคม - 2566</p>
                <div><img src={ar} alt=''/></div>
            </div>
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
                                    <p className="date">{item.date}</p>
                                    <p className="time">{item.timeIn}</p>
                                    <p className="time">{item.timeOut}</p>
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