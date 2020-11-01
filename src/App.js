import React, { Component } from 'react';

import './App.css';
import Header from './Components/Header/Header';
import HomePage from './Components/HomePage/HomePage';

const MAX_LOG_LENGTH = 10;

class App extends Component {
  state = {
    log: [],
  }
  client = new WebSocket('wss://sezzleserver.herokuapp.com');
  
  componentDidMount() {
    this.client.onopen = () => {};
    this.client.onmessage = (message) => {
      const data = message.data;
      let newLog = this.state.log;
      newLog.push(data);
      if(newLog.length > MAX_LOG_LENGTH) {
        newLog.shift();
      }
      this.setState({log: newLog});
    }
  }

  handleLog = (newLog) => {
    this.client.send(JSON.stringify({
      formula: newLog.formula,
      user: newLog.user
    }))
  }
  render() {
    const { log } = this.state;

    return (
      <div className="App">
        <Header />
        <HomePage log={log} handleLog={this.handleLog}/>
      </div>
    );
  }
}

export default App;
