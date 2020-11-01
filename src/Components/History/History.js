import React from 'react';
import './History.css';

const Title = props => {
    return (
        <div className="historyTitle">
            {props.title}
        </div>
    )
}

const Log = props => {
    const logs = props.log;
    return (
        <div className="log">
            {logs.map((log, i) => {
                const data = JSON.parse(log);
                return (
                    <li key={i}>
                        User: {data.user} ,   Formula: {data.formula}
                    </li>
                )
            })}
        </div>
    )
}

const History = props => {
    return (
        <div className="history">
            <Title title="Most Recent Ten Results" />
            {
                props.log.length > 0 && (
                    <Log log={props.log}/>
                )
            }
        </div>
    )
}

export default History;