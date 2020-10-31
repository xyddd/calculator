import React, { useState } from 'react';
import './HomePage.css';
import Calculator from '../Calculator/Calculator';

const HomePage = (props) => {
    const [user, setUser] = useState("");

    return (
        <div className="main">
            <div className="leftPart">
                <div className="content">
                    <Calculator />
                </div>
            </div>

            <div className="rightPart">
                <div className="content">
                    gafgaed
                </div>
            </div>
        </div>
    )
}

export default HomePage;