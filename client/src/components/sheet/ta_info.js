import { React, useEffect, useState } from 'react';
import moment from "moment";
import et from '../../assets/icon/edit-ta.png';
import al from '../../assets/icon/angle-left.png';
import ar from '../../assets/icon/angle-right.png';
import tc from '../../assets/icon/check.png';


function TimeSheetInfo(props) {

    const emp = props.data;

    const [timeEdit, setEdit] = useState(false);

    const edit = () => {
        
        setEdit(!timeEdit)
        const timeIn = document.querySelectorAll("[id='inputIn']");
        const timeOut = document.querySelectorAll("[id='inputOut']");
        for (var i = 0; i < timeIn.length; i++) {
            timeIn[i].disabled = timeEdit;
            timeOut[i].disabled = timeEdit;
        };

    };

    const editDis = () => {

        const timeIn = document.querySelectorAll("[id='inputIn']");
        const timeOut = document.querySelectorAll("[id='inputOut']");
        for (var i = 0; i < timeIn.length; i++) {
            timeIn[i].disabled = true;
            timeOut[i].disabled = true;
        };

    };

    // const update = () => {
        
    // }
    
    // console.log(
    //     emp.map((item, index) => [item.time_in.substring(0, 5), item.time_out.substring(0, 5)])
    // );

    useEffect(() => {
        editDis();
        (async() => {
            const set = await setEdit(false);
        })();
    },[props.data]);

    // const timeIn = document.querySelectorAll("[id='inputIn']");
    // const tIn = [...timeIn].map(input => input.value);

    // const timeOut = document.querySelectorAll("[id='inputOut']");
    // const tOut = [...timeOut].map(input => input.value);

    // console.log(
    //     tIn.map((array, item) => [array, tOut[item]])
    //   )

    // console.log(tIn);
    // console.log(tOut);

    // for (var i = 0 ; i < emp.length ; i++){
    //     if (emp[i] == emp[i]) {
    //         console.log(i);
    //     }
    // } ;

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
                            {
                                timeEdit == false ? 
                                <div className='ta-img-bx' style={emp[0] == null ? {pointerEvents: 'none'} : {pointerEvents: 'auto'} } onClick={edit}>
                                    <img src={tc} alt=''/>
                                </div> 
                                :
                                <div className='ta-img-bx' style={{background : 'red'}}onClick={edit}>
                                    <img src={tc} alt=''/>
                                </div>
                            }
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
                                    <input className="center" id='inputIn' type='time' defaultValue={item.time_in} disabled></input>
                                    <input className="center" id='inputOut' type='time' defaultValue={item.time_out} disabled></input>
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