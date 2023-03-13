import { React } from 'react';
import user from '../assets/icon/users.png';
import lock from '../assets/icon/lock.png';
import '../assets/style/login.css';


function Login() {
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
                        <form>
                            <div className="login-inputBx">
                                <img src={user} alt=""/>
                                <input type="text" placeholder="Username"/>
                            </div>
                            <div className="login-inputBx">
                                <img src={lock} alt=""/>
                                <input type="password" placeholder="Password"/>
                            </div>
                            <div className="login-inputBx">
                                <input type="submit" value="Login"/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
