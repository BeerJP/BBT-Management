import { React } from 'react';
import ne from '../../assets/icon/note-edit.png';


function LeaveTable() {

    const emp = [

        {   emp:"1001",
            date:"05/01/2566",
            type:"กิจ",
            des:"ไปต่างจังหวัด"
        },

        {   emp:"1001",
            date:"05/01/2566",
            type:"กิจ",
            des:"ไปต่างจังหวัด"
        },

        {   emp:"1001",
            date:"05/01/2566",
            type:"กิจ",
            des:"ไปต่างจังหวัด"
        },
        
        {   emp:"1001",
            date:"05/01/2566",
            type:"กิจ",
            des:"ไปต่างจังหวัด"
        },

        {   emp:"1001",
            date:"05/01/2566",
            type:"กิจ",
            des:"ไปต่างจังหวัด"
        },

        {   emp:"1001",
            date:"05/01/2566",
            type:"กิจ",
            des:"ไปต่างจังหวัด"
        },

        {   emp:"1001",
            date:"05/01/2566",
            type:"กิจ",
            des:"ไปต่างจังหวัด"
        },
        
        {   emp:"1001",
            date:"05/01/2566",
            type:"กิจ",
            des:"ไปต่างจังหวัด"
        },

        {   emp:"1001",
            date:"05/01/2566",
            type:"กิจ",
            des:"ไปต่างจังหวัด"
        },

        {   emp:"1001",
            date:"05/01/2566",
            type:"กิจ",
            des:"ไปต่างจังหวัด"
        },
        
        {   emp:"1001",
            date:"05/01/2566",
            type:"กิจ",
            des:"ไปต่างจังหวัด"
        },

        {   emp:"1001",
            date:"05/01/2566",
            type:"กิจ",
            des:"ไปต่างจังหวัด"
        },

        {   emp:"1001",
            date:"05/01/2566",
            type:"กิจ",
            des:"ไปต่างจังหวัด"
        },

        {   emp:"1001",
            date:"05/01/2566",
            type:"กิจ",
            des:"ไปต่างจังหวัด"
        },
        
        {   emp:"1001",
            date:"05/01/2566",
            type:"กิจ",
            des:"ไปต่างจังหวัด"
        }

    ];

    return (
        <>
            <div className='box-body le-body'>
                <div className='le-box-header'>
                    <label>รอการอนุมัติ</label>
                </div>
                <div className='le-box-content'>
                    <div className='le-header'>
                        <p className='le-empl'>พนักงาน</p>
                        <p className='le-date'>วันที่</p>
                        <p className='le-type'>ประเภท</p>
                        <p className='le-type'>รูปแบบ</p>
                        <p className='le-desc'>เหตุผลการลา</p>
                        <p className='le-sett'></p>
                    </div>
                    <div className='le-content'>
                        {
                            emp.map((item, index) => (
                                <div className='le-content-time' key={index}>
                                    <p className="empl">{item.emp}</p>
                                    <p className="date">{item.date}</p>
                                    <p className="type">{item.type}</p>
                                    <p className="type">{item.type}</p>
                                    <p className="desc">{item.des}</p>
                                    <p className="sett">อนุมัติ</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className='box-body le-body'>
                <div className='le-box-header'>
                    <label>อนุมัติแล้ว</label>
                </div>
                <div className='le-box-content'>
                    <div className='le-header'>
                        <p className='le-empl'>พนักงาน</p>
                        <p className='le-date'>วันที่</p>
                        <p className='le-type'>ประเภท</p>
                        <p className='le-type'>รูปแบบ</p>
                        <p className='le-desc'>เหตุผลการลา</p>
                        <p className='le-sett'></p>
                    </div>
                    <div className='le-content'>
                        {
                            emp.map((item, index) => (
                                <div className='le-content-time' key={index}>
                                    <p className="empl">{item.emp}</p>
                                    <p className="date">{item.date}</p>
                                    <p className="type">{item.type}</p>
                                    <p className="type">{item.type}</p>
                                    <p className="desc">{item.des}</p>
                                    <p className="sett">ยกเลิก</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default LeaveTable;