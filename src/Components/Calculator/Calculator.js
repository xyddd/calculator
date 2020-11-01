import React, { Component, Fragment }  from 'react';

import { isDigit } from '../../utilities/utils';
import './Calculator.css';

const MAX_DIGITS = 35;

const Display = (props) => {
    const { formula } = props;
    return (
        <div className="dispaly">
            {typeof formula === 'number' ? formula : formula.join('')}
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
        <div className="error">{props.content}</div>
    )
}

class Calculator extends Component {
    state = {
        formula: [],
        isDecimal: false,
        showFormulaError: false,
        showLengthError: false,
    }

    showErrorMessgae = (errorType) => {
        this.setState({[errorType]: true});
        setTimeout(() => {this.setState({[errorType]: false})}, 2000);
    }

    clear = () => {
        this.setState({
            formula: [],
            isDecimal: false,
        });
    }

    back = () => {
        let formula = this.state.formula;
        if(typeof formula === 'number') {
            return;
        }
        if(formula.length > 0) {
            formula.pop();
            this.setState(formula);
        }
    }

    getResult = () => {
        let { formula } = this.state;
        if(typeof formula === 'number') {
            return;
        }
        let num = 0;
        let prevNum = 0;
        let prevSign = '+';
        let res = 0;
        formula.push('+');
        for(let i=0; i<formula.length; ++i) {
            const c  = formula[i];
            if(isDigit(c)) {
                num = + num * 10 + c;
            }
            else if(c === '.') {
                i++;
                let l = 10;
                let d = 0;
                while(i < formula.length && isDigit(formula[i])) {
                    d += formula[i] / l;
                    l *= 10;
                    i++;
                }
                i--;
                num += d;
            }
            else {
                if(prevSign === '+') {
                    res += prevNum;
                    prevNum = num;
                }
                else if(prevSign === '-') {
                    res += prevNum;
                    prevNum = -num;
                }
                else if(prevSign === '×') {
                    prevNum *= num;
                }
                else {
                    prevNum /= num;
                }
                num = 0;
                prevSign = c;
            }
        }
        res += prevNum;
        formula.pop();
        formula.push(" = ");
        formula.push(res);
        this.props.getFormula(formula.join(''));
        this.setState({formula: res, isDecimal: false,});
    }

    addDecimal = key => {
        let { formula, isDecimal } = this.state;
        if(formula.length === MAX_DIGITS) {
            this.showErrorMessgae("showLengthError");
            return;
        }

        if(isDecimal || this.state.formula.length === 0) {
            this.showErrorMessgae("showFormulaError");
        }
        else {
            formula.push(key);
            this.setState({formula: formula, isDecimal: true})
        }
    }

    addNewDigit = key => {
        let { formula } = this.state;
        if(typeof formula === 'number') {
            formula = [];
        }
        if(formula.length === MAX_DIGITS) {
            this.showErrorMessgae("showLengthError");
            return;
        }

        if(isDigit(key)) {
            formula.push(+key);
        }
        else if(formula.length === 0) {
            if(key === '-' || key === '+') {
                formula.push(key);
            }
            else {
                this.showErrorMessgae("showFormulaError");
                return;
            }
        }
        else {
            const lastChar = formula[formula.length - 1];
            if(isDigit(lastChar)) {
                formula.push(key);
                this.setState({isDecimal: false})
            }
            else {
                this.showErrorMessgae("showFormulaError");
            }
        }
        
        this.setState({formula: formula});
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
                this.addNewDigit(key);
        }
    }
    
    render() {
        const { formula, showFormulaError, showLengthError } = this.state;
        return (
            <Fragment>
                <Display formula={formula} />
                <Key clickKey={this.clickKey} />
                {showFormulaError && <ErrorMessage content="Formula Error Found" />}
                {showLengthError && <ErrorMessage content="Reach Max Formula Length" />}
            </Fragment>
        )
    }
    
}

export default Calculator;