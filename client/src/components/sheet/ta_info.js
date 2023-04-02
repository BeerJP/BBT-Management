import { React, useEffect, useState } from 'react';
import axios from 'axios';
// import et from '../../assets/icon/edit-ta.png';
// import al from '../../assets/icon/angle-left.png';
// import ar from '../../assets/icon/angle-right.png';
import tc from '../../assets/icon/check.png';


function TimeSheetInfo(props) {


    const [isSheet, setSheet] = useState(props.data[0]);
    const [isIp, setIp] = useState(props.data[1]);
    const [isId, setId] = useState(props.data[2]);

    useEffect(() => {

        setSheet(props.data[0]);
        setIp(props.data[1]);
        setId(props.data[2]);

    }, [props.data]);


    const [isEdit, setEdit] = useState(false);
    const [isOrigin, setOrigin] = useState([]);
    const [isUpdate, setUpdate] = useState([]);
    const [isTime, setTime] = useState([]);

    const edit = () => {
        
        setEdit(!isEdit)
        const timeIn = document.querySelectorAll("[id='inputIn']");
        const timeOut = document.querySelectorAll("[id='inputOut']");
        for (var i = 0; i < timeIn.length; i++) {
            timeIn[i].disabled = isEdit;
            timeOut[i].disabled = isEdit;
        };

    };


    useEffect(() => {

        if (isEdit) {
            const date = document.querySelectorAll("[id='inputDate']");
            const day = [...date].map(input => input.value);
            const timeIn = document.querySelectorAll("[id='inputIn']");
            const tIn = [...timeIn].map(input => input.value);
            const timeOut = document.querySelectorAll("[id='inputOut']");
            const tOut = [...timeOut].map(input => input.value);

            const timeOrigin = day.map((array, item) => [array, tIn[item], tOut[item]]);
            setOrigin(timeOrigin);
        } else {
            const date = document.querySelectorAll("[id='inputDate']");
            const day = [...date].map(input => input.value);
            const timeIn = document.querySelectorAll("[id='inputIn']");
            const tIn = [...timeIn].map(input => input.value);
            const timeOut = document.querySelectorAll("[id='inputOut']");
            const tOut = [...timeOut].map(input => input.value);

            const timeUpdate = day.map((array, item) => [array, tIn[item], tOut[item]]);
            setUpdate(timeUpdate);
        };

    }, [isEdit]);


    useEffect(() => {

        const time = isOrigin.map((array, item) => {
            if (JSON.stringify(array) !== JSON.stringify(isUpdate[item])){
                return isUpdate[item]
            }
        }).filter(notUndefined => notUndefined !== undefined);
        setTime(time);

    }, [isUpdate]);


    useEffect(() => {

        if (isTime.length > 0){
            setClose(false)
        }

    }, [isTime]);


    const updateTime = () => {

        for (let i = 0; i < isTime.length ; i++) {
            axios.put("http://"+ isIp +":5000/update_time", { 
                date: isTime[i][0],
                in: isTime[i][1],
                out: isTime[i][2],
                id: isId,
            }, {crossdomain: true})
        };
        setTime([])
        setClose(true)

    };


    const [isClose, setClose] = useState(true);


    return (
        <>
            {/* <div className='box-body ov-header-combo ta-info'>
                <div><img src={al} alt=''/></div>
                <p className='ov-select-txt'>มกราคม - 2566</p>
                <div><img src={ar} alt=''/></div>
            </div> */}

            <div id="myModal" className="modal" style={isClose ? {display: 'none'} : {display: 'block'}}>
                <div className="modal-content">
                    <label>มีรายการแก้ไขจำนวน {isTime.length} รายการ</label>
                    <div>
                        <button onClick={updateTime}>ยืนยัน</button>
                        <button onClick={() => setClose(true)}>ยกเลิก</button>
                    </div>
                </div>
            </div>
            
            <div className='box-body ta-body'>
                <div className='ta-box-content'>
                    <div className='ta-header'>
                        <p className='center'>วันที่</p>
                        <p className='center'>เวลาเข้า</p>
                        <p className='center'>เวลาออก</p>
                        <div>
                            {
                                isEdit == false ? 
                                <div className='ta-img-bx' 
                                    style={isSheet[0] == null ? {pointerEvents: 'none'} 
                                    : {pointerEvents: 'auto'} } 
                                    onClick={edit}>
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
                            isSheet.map((item, index) => (
                                <div className='ta-content-time' key={index}>
                                    <li className="center" id='inputDate' value={item.work_id}>{item.th_date}</li>
                                    <div className="center">
                                        <input id='inputIn' type='time' defaultValue={item.time_in} disabled></input>
                                    </div>
                                    <div className="center">
                                        <input id='inputOut' type='time' defaultValue={item.time_out} disabled></input>
                                    </div>
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