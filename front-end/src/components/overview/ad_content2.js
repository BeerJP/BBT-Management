import { React } from 'react';


function AdminContent2() {

    const emp = [

        {   name:"Tester1",
            time:"8.30น.",
            status:"ปกติ"
        },

        {   name:"Tester2",
            time:"8.30น.",
            status:"ปกติ"
        },

        {   name:"Tester3",
            time:"8.30น.",
            status:"ปกติ"
        },

        {   name:"Tester4",
            time:"8.30น.",
            status:"ปกติ"
        }
        
    ];

    const date = "วันอังคาร 03/01/2566";

    return (
        <>
            <div className='ov-header-2'>
                <p className='ov-lb-txt'>ใบบันทึกเวลา : {date}</p>
            </div>
            <div className='ov-body-2'>
                <div className='ov-content-3'>
                    <div className='ov-header-3'>
                        <p className='name'>ชื่อ - สกุล</p>
                        <p className='time'>เวลา</p>
                        <p className='stat'>สถานะ</p>
                    </div>
                    <div className='ov-content-4'>
                        {
                            emp.map((item, index) => (
                                <div className='ov-content-emp' key={index}>
                                    <p className="name">{item.name}</p>
                                    <p className="time">{item.time}</p>
                                    <p className="stat">{item.status}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminContent2;