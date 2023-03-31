import { React, useEffect, useState } from 'react';
import axios from 'axios';
import et from '../../assets/icon/edit-ta.png';
import al from '../../assets/icon/angle-left.png';
import ar from '../../assets/icon/angle-right.png';
import tc from '../../assets/icon/check.png';


function TimeSheetInfo(props) {

    const isSheet = props.data[0];
    const ip = props.data[1];

    const [isEdit, setEdit] = useState(false);
    const [isOrigin, setOrigin] = useState([]);
    const [isUpdate, setUpdate] = useState([]);

    const edit = () => {
        
        setEdit(!isEdit)
        const timeIn = document.querySelectorAll("[id='inputIn']");
        const timeOut = document.querySelectorAll("[id='inputOut']");
        for (var i = 0; i < timeIn.length; i++) {
            timeIn[i].disabled = isEdit;
            timeOut[i].disabled = isEdit;
        };

    };

    // const editDis = () => {

    //     const timeIn = document.querySelectorAll("[id='inputIn']");
    //     const timeOut = document.querySelectorAll("[id='inputOut']");
    //     for (var i = 0; i < timeIn.length; i++) {
    //         timeIn[i].disabled = true;
    //         timeOut[i].disabled = true;
    //     };

    // };

    useEffect(() => {

        if (isEdit) {
            const timeIn = document.querySelectorAll("[id='inputIn']");
            const tIn = [...timeIn].map(input => input.value);
            const timeOut = document.querySelectorAll("[id='inputOut']");
            const tOut = [...timeOut].map(input => input.value);

            const timeOrigin = tIn.map((array, item) => [array, tOut[item]]);
            setOrigin(timeOrigin);
        }
        // } else {
        //     const timeIn = document.querySelectorAll("[id='inputIn']");
        //     const tIn = [...timeIn].map(input => input.value);
        //     const timeOut = document.querySelectorAll("[id='inputOut']");
        //     const tOut = [...timeOut].map(input => input.value);

        //     const timeUpdate = tIn.map((array, item) => [array, tOut[item]]);
        //     setUpdate(timeUpdate);
        // };
        console.log(isOrigin);

    }, [isEdit]);

    const test = async() => {
        // await edit();

        const timeIn = document.querySelectorAll("[id='inputIn']");
        const tIn = [...timeIn].map(input => input.value);
        const timeOut = document.querySelectorAll("[id='inputOut']");
        const tOut = [...timeOut].map(input => input.value);

        const timeUpdate = tIn.map((array, item) => [array, tOut[item]]);
        setUpdate(timeUpdate);
        
        // for (let i = 0; i < isOrigin.length ; i++) {
        //     console.log(isOrigin[i], isUpdate[i]);
        // };
        // axios.post("http://"+ ip +":5000/add_holiday", { 
        //     name: holiName, 
        //     date: holiDate 
        // }, {crossdomain: true})
        // getTime();
        // console.log(isOrigin.length);
        console.log(isUpdate);
    }

    // console.log('Original');
    // console.log(isOrigin);
    // console.log('Update');
    // console.log(isUpdate);

    // useEffect(() => {
    //     editDis();
    //     (async() => {
    //         const set = await setEdit(false);
    //     })();
    // },[props.data]);

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
                                isEdit == false ? 
                                <div className='ta-img-bx' 
                                    style={isSheet[0] == null ? {pointerEvents: 'none'} 
                                    : {pointerEvents: 'auto'} } 
                                    onClick={edit}>
                                    <img src={tc} alt=''/>
                                </div> 
                                :
                                <div className='ta-img-bx' style={{background : 'red'}}onClick={test}>
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
                                    <p className="center">{item.th_date}</p>
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