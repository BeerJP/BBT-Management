import { React } from 'react';


function TimeSheetTable() {

    const emp = [

        {   name:"1001",
            time:"น้อยหน่อย โจโจ๊ะ",
            status:"เจ้าหน้าที่ขนส่ง"
        },

        {   name:"1002",
            time:"จักรพันธ์ ภูพาพุทธ",
            status:"เจ้าหน้าที่ขนส่ง"
        },

        {   name:"1003",
            time:"test test",
            status:"เจ้าหน้าที่ขนส่ง"
        },

        {   name:"1004",
            time:"test test",
            status:"เจ้าหน้าที่ขนส่ง"
        }

    ];

    return (
        <>
            <div className='box-body em-body-2'>
                <div className='em-content-3'>
                    <div className='em-header-3'>
                        <p className='numb'>รหัส</p>
                        <p className='name'>ชื่อ - สกุล</p>
                        <p className='dept'>แผนก</p>
                    </div>
                    <div className='em-content-4'>
                        {
                            emp.map((item, index) => (
                                <div className='em-content-emp' key={index}>
                                    <p className="numb">{item.name}</p>
                                    <p className="name">{item.time}</p>
                                    <p className="dept">{item.status}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default TimeSheetTable;