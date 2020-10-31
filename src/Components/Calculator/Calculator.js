import React, { Component, Fragment }  from 'react';

import './Calculator.css';

const MAX_DIGITS = 35;

const Display = (props) => {
    const { formula } = props;
    return (
        <div className="dispaly">
            {formula.join('')}
        </div>
    )
}

const Key = (props) => {
    const { clickKey } = props;
    return (
        <Fragment>
            <button className="largeKey" name="CLEAR" onClick={clickKey}>CLEAR</button>
            <button className="largeKey" name="BACKSPACE" onClick={clickKey}>BACKSPACE</button>

            <button className="key" name="7" onClick={clickKey}>7</button>
            <button className="key" name="8" onClick={clickKey}>8</button>
            <button className="key" name="9" onClick={clickKey}>9</button>
            <button className="key" name="+" onClick={clickKey}>+</button>

            <button className="key" name="4" onClick={clickKey}>4</button>
            <button className="key" name="5" onClick={clickKey}>5</button>
            <button className="key" name="6" onClick={clickKey}>6</button>
            <button className="key" name="-" onClick={clickKey}>-</button>

            <button className="key" name="1" onClick={clickKey}>1</button>
            <button className="key" name="2" onClick={clickKey}>2</button>
            <button className="key" name="3" onClick={clickKey}>3</button>
            <button className="key" name="×" onClick={clickKey}>×</button>

            <button className="key" name="." onClick={clickKey}>●</button>
            <button className="key" name="0" onClick={clickKey}>0</button>
            <button className="key" name="=" onClick={clickKey}>=</button>
            <button className="key" name="÷" onClick={clickKey}>÷</button>
        </Fragment>
    )
}

const ErrorMessage = (props) => {
    return (
        <div className="error">Formula Error Found</div>
    )
}

class Calculator extends Component {
    state = {
        formula: [],
        result: 0,
        isDecimal: false,
    }

    isDigit = c => {
        return '0' <= c && c <= '9';
    }

    clearErrorMessgae = () => {
        setTimeout(() => {this.setState({showError: false});}, 2000);
    }

    showErrorMessgae = () => {
        this.setState({showError: true});
        clearTimeout(this.clearErrorMessgae);
        this.clearErrorMessgae();
    }

    clear = () => {
        this.setState({
            formula: [],
            result: 0,
            isDecimal: false,
        });
    }

    back = () => {
        let formula = this.state.formula;
        if(formula.length > 0) {
            formula.pop();
            this.setState(formula);
        }
    }

    getResult = () => {
        const formula = this.state.formula;
    }

    addDecimal = key => {
        let { formula, isDecimal } = this.state;
        if(isDecimal) {
            this.showErrorMessgae();
        }
        else {
            formula.push(key);
            this.setState({formula: formula, isDecimal: true})
        }
    }

    addNewElement = key => {
        let formula = this.state.formula;
        if(this.isDigit(key)) {
            formula.push(key);
        }
        else if(formula.length === 0) {
            this.showErrorMessgae();
            return;
        }
        else {
            const lastChar = formula[formula.length - 1];
            if(this.isDigit(lastChar)) {
                formula.push(key);
                this.setState({isDecimal: false})
            }
            else {
                this.showErrorMessgae();
            }
        }
        
        this.setState(formula);
    }

    clickKey = e => {
        const key = e.target.name;
        switch(key) {
            case "CLEAR":
                this.clear();
                break;
            case "BACKSPACE":
                this.back();
                break;
            case "=":
                this.getResult();
                break;
            case ".":
                this.addDecimal(key);
                break;
            default:
                this.addNewElement(key);
        }
    }
    
    render() {
        const { formula, showError } = this.state;
        return (
            <Fragment>
                <Display formula={formula} />
                <Key clickKey={this.clickKey} />
                {showError && <ErrorMessage />}
            </Fragment>
        )
    }
    
}

export default Calculator;