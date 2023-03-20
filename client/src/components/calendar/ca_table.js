import { React } from 'react';


function CalendarTable() {

    const emp = [

        {   date:"วันขึ้นปีใหม่",
            timeIn:"02-01-2566",
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
            <div className='box-body ca-body-bottom'>
                <div className='ca-box-content'>
                    <div className='ca-header'>
                        <p className='ca-name'>วันหยุด</p>
                        <p className='ca-date'>วันที่</p>
                    </div>
                    <div className='ca-content'>
                        {
                            emp.map((item, index) => (
                                <div className='ca-table-info' key={index}>
                                    <p className="ca-name">{item.date}</p>
                                    <p className="ca-date">{item.timeIn}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className='box-body ca-box-set'>
                <div className='ca-header'>
                    <p>จัดการวันหยุด</p>
                </div>
                <div className='lb-box-long ca-sett'>
                    <div className='ca-sett-input'>
                        <label>วันหยุด</label>
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

export default CalendarTable;