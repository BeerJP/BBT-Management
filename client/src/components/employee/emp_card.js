import { React, useState, useEffect } from 'react';
import axios from 'axios';
import ui from '../../assets/icon/user-line.png';
import ua from '../../assets/icon/user-add.png';
import ue from '../../assets/icon/edit.png';
import InfoCard from './emp_info';
import AddCard from './emp_add';
import EditCard from './emp_update';

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Tooltip from '@mui/material/Tooltip';

import Collapse from '@mui/material/Collapse';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';



function EmployeeCard(props) {

    const ip = props.ip;
    const selectEmp = props.select[0];
    const isUpdate = props.isUpdate[0]
    const setUpdate = props.isUpdate[1]

    const [isOpen, setOpen] = useState(false);
    const [isCard, setCard] =useState('infomation')
    const [employee, setEmployee] = useState();
    const infoEmp = () => { setCard('infomation'); };
    const addEmp = () => { setCard('add'); };
    const editEmp = () => { setCard('edit'); };

    useEffect(() => {
        if (selectEmp){
            axios.post("http://"+ ip +":5000/employee_info", {
                id: selectEmp
            },
             {crossdomain: true})
            .then(response => {
                setEmployee(response.data);
            });
        }
        infoEmp()
    }, [ip, selectEmp, isUpdate]);

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        ข้อมูลพนักงาน
                    </Typography>
                    <Tooltip title="ข้อมูลส่วนตัว" placement="bottom">
                        <div className="em-img-bx" style={isCard === 'infomation' ? {background: '#34C2DB'} : {}} onClick={infoEmp}>
                            <img src={ui} alt=''/>
                        </div>
                    </Tooltip>
                    <Tooltip title="แก้ไขข้อมูล" placement="bottom">
                        <div className="em-img-bx" style={selectEmp === '' ? {pointerEvents: 'none'} : 
                            isCard === 'edit' ? {background: '#F4D03F'} : {pointerEvents: 'auto'}} onClick={editEmp}>
                            <img src={ue} alt=''/>
                        </div>
                    </Tooltip>
                    <Tooltip title="เพิ่มข้อมูล" placement="bottom">
                        <div className="em-img-bx" style={isCard === 'add' ? {background: '#58D68D'} : {}} onClick={addEmp}>
                            <img src={ua} alt=''/>
                        </div>
                    </Tooltip>
                </Toolbar>
            </AppBar>
            <Collapse in={isOpen}>
                <Alert action={
                    <IconButton aria-label="close" color="inherit" size="small" onClick={() => { setOpen(false); }}>
                        <CloseIcon fontSize="inherit" />
                    </IconButton>  
                }   sx={{ mb: 2 }}
                > บันทึกข้อมูลเรียบร้อยแล้ว
                </Alert>
            </Collapse>
            {
                isCard === 'infomation' ? <InfoCard key='1' data={employee} /> : 
                isCard === 'add' ? <AddCard key='2' data={[ip, setCard, setOpen, props.select[1]]} isUpdate={[isUpdate, setUpdate]} /> : 
                <EditCard key='3'  data={[ip, selectEmp, employee, setCard, setOpen]} isUpdate={[isUpdate, setUpdate]} />
            }
        </>
    );
};

export default EmployeeCard;