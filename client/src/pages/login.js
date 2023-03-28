import { React, useState } from 'react';
import axios from 'axios';
import user from '../assets/icon/users.png';
import lock from '../assets/icon/lock.png';
import '../assets/style/login.css';


function Login(props) {

    const login = props.data;

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const getLogin = () => {
        axios.post("http://localhost:5000/login", {
            username: username,
            password: password
        }, 
        {crossdomain: true})
        .then(response => {
            login(response.data);
            console.log(response.data);
            console.log(response);
        });
    };

    return (
        <>
            <div className="login-container">
                <div className="loginBx">
                    <div className="login-form">
                        <div className="login-titleBx">
                            <div className="login-title-styleBx"></div>
                            <span>Login</span>
                            <div className="login-title-styleBx"></div>
                        </div>
                        <div className="login-inputBx">
                            <img src={user} alt=""/>
                            <input type="text" onChange={(event => {setUsername(event.target.value)})} placeholder="Username"/ >
                        </div>
                        <div className="login-inputBx">
                            <img src={lock} alt=""/>
                            <input type="password" onChange={(event => {setPassword(event.target.value)})} placeholder="Password"/>
                        </div>
                        <div className="login-inputBx">
                            <input type="submit" value="Login" onClick={getLogin}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
