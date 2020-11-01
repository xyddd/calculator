import React, { useState, Fragment }  from 'react';
import './Login.css';

const Login = (props) => {
    const [user, setUser] = useState("");

    const onChange = (e) => {
        setUser(e.target.value);
    };

    const onSumbit = (e) => {
        if(user.length > 0) {
            props.login(user);
        }
    }

    return (
        <Fragment>
            <div className="login">&nbsp;</div>
            <div className="login">
                <div className="loginTitle">
                    LOG IN
                </div>
                <div className="loginText">
                    <span><input className="loginInput" type="text" placeholder="Enter Your Name..." onChange={onChange} value={user}/></span>
                    <span><button className="loginSubmit" type="loginSubmit" onClick={onSumbit}>Submit</button></span>
                </div>
            </div>
            <div className="login"></div>
        </Fragment>
    )
}

export default Login;