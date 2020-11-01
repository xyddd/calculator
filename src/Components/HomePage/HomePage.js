import React, { useState, Fragment } from 'react';
import './HomePage.css';
import Calculator from '../Calculator/Calculator';
import History from '../History/History';
import Login from '../Login/Login';

const HomePage = (props) => {
    const [user, setUser] = useState("");

    const login = (user) => {
        setUser(user);
    }

    const getFormula = formula => {
        const messgae = {
            formula: formula,
            user: user
        }
        props.handleLog(messgae);
    }
    
    return (
        <div className="main">
            {
            user.length > 0 
            ?   <Fragment>
                    <div className="leftPart">
                        <div className="content">
                            <Calculator getFormula={getFormula}/>
                        </div>
                    </div>

                    <div className="rightPart">
                        <div className="content">
                            <History log={props.log} />
                        </div>
                    </div>
                </Fragment>
            :   <Login login={login}/>
            }
        </div>
    )
}

export default HomePage;