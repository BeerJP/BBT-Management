import { React } from 'react';


function LeaveTable() {

    const emp = [

        {   emp:"ปกติ",
            date:"05/01/2566",
            type:"กิจ",
            des:"ไปต่างจังหวัด"
        },

        {   emp:"ปกติ",
            date:"05/01/2566",
            type:"กิจ",
            des:"ไปต่างจังหวัด"
        },

        {   emp:"ปกติ",
            date:"05/01/2566",
            type:"กิจ",
            des:"ไปต่างจังหวัด"
        },
        
        {   emp:"ปกติ",
            date:"05/01/2566",
            type:"กิจ",
            des:"ไปต่างจังหวัด"
        }

    ];

    return (
        <>
            <div className='box-body le-body'>
                <div className='le-box-header'>
                    <label>ข้อมูลการลา</label>
                </div>
                <div className='le-box-header2'>
                    <label>ลากิจ : 1</label>
                    <label>ลาพักร้อน : 2</label>
                    <label>ลาป่วย : 3</label>
                </div>
                <div className='le-box-content'>
                    <div className='le-header'>
                        <p className='le-empl'>รูปแบบ</p>
                        <p className='le-date'>วันที่</p>
                        <p className='le-type'>ประเภท</p>
                        <p className='le-desc'>เหตุผลการลา</p>
                        <p className='le-sett'>สถานะ</p>
                    </div>
                    <div className='le-content'>
                        {
                            emp.map((item, index) => (
                                <div className='le-content-time' key={index}>
                                    <p className="empl">{item.emp}</p>
                                    <p className="date">{item.date}</p>
                                    <p className="type">{item.type}</p>
                                    <p className="desc">{item.des}</p>
                                    <p className="sett">รออนุมัติ</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className='box-body ca-box-set'>
                <div className='ca-header'>
                    <p>จัดการใบลา</p>
                </div>
                <div className='lb-box-long ca-sett'>
                    <div className='ca-sett-input'>
                        <label>ประเภท</label>
                        <input></input>
                    </div>
                    <div className='ca-sett-input'>
                        <label>เหตุผลการลา</label>
                        <input></input>
                    </div>
                </div>
                <div className='lb-box-long ca-sett'>
                    <div className='ca-sett-input'>
                        <label>วันที่เริ่ม</label>
                        <input></input>
                    </div>
                    <div className='ca-sett-input'>
                        <label>วันที่สิ้นสุด</label>
                        <input></input>
                    </div>
                </div>
                <div className='lb-box-long ca-sett'>
                    <div className='ca-sett-submit'>
                        <button>บันทึก</button>
                        <button>ลบ</button>
                    </div>               
                </div>
            </div>
        </>
    );
};

export default LeaveTable;