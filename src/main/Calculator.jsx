import React, { Component } from 'react'
import './calculator.css'

import Button from '../components/Button'
import Display from '../components/Display'

const initialState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0,0],
    current: 0
}

export default class Calculator extends Component{
    
    state = {...initialState}

    constructor(props){
        super(props)

        this.clearMemory = this.clearMemory.bind(this)
        this.addDigit = this.addDigit.bind(this)
        this.setOperation = this.setOperation.bind(this)
    }


    clearMemory(){
        this.setState({...initialState})
    }

    addDigit(n){
        if(this.state.values[0] >= 1000000000){
            return
        }
        if(n === '.' && this.state.displayValue.includes('.')){
            return
        }

        const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay
        const currentValue = clearDisplay ? '' : this.state.displayValue
        const displayValue = currentValue + n
        this.setState({displayValue, clearDisplay: false})

        if(n !== '.'){
            const i = this.state.current
            const newValue = parseFloat(displayValue)
            const values = [...this.state.values]
            values[i] = newValue
            this.setState({values})
            //console.log(values)
        }

        console.log(this.state.values)
    }

    setOperation(op){
        if(this.state.current === 0){
            this.setState({ operation: op, current: 1, clearDisplay: true})
        } else {
            const equals = op === '='
            const currentOperation =  this.state.operation
            const values = [...this.state.values]

            switch(currentOperation) {
                case '+':
                    values[0] = values[0] + values[1]
                    break
                case '-':
                    values[0] = values[0] - values[1]
                    break
                case '*':
                    values[0] = values[0] * values[1]
                    break
                case '/':
                    values[0] = values[0] / values[1]
                    break
            }
            values[1] = 0

            var strValue = values[0].toString()
            if(strValue.length > 10){
                strValue = strValue.substr(0,10)
                console.log(strValue)
                values[0] = parseFloat(strValue)
            }

            this.setState({
                displayValue: values[0],
                operation: equals ? null : op,
                current: equals ? 0 : 1,
                clearDisplay: !equals,
                values
            })

        }
    }




    render(){
        return(
            <div className="calculator">
                <Display value={this.state.displayValue}></Display>
                
                <Button label="AC" click={this.clearMemory} triple="true"></Button>
                <Button label="/" click={this.setOperation} operation="true"></Button>
                <Button label="7" click={this.addDigit}></Button>
                <Button label="8" click={this.addDigit}></Button>
                <Button label="9" click={this.addDigit}></Button>
                <Button label="*" click={this.setOperation} operation="true"></Button>
                <Button label="4" click={this.addDigit}></Button>
                <Button label="5" click={this.addDigit}></Button>
                <Button label="6" click={this.addDigit}></Button>
                <Button label="-" click={this.setOperation} operation="true"></Button>
                <Button label="1" click={this.addDigit}></Button>
                <Button label="2" click={this.addDigit}></Button>
                <Button label="3" click={this.addDigit}></Button>
                <Button label="+" click={this.setOperation} operation="true"></Button>
                <Button label="0" click={this.addDigit} double="true"></Button>
                <Button label="." click={this.addDigit}></Button>
                <Button label="=" click={this.setOperation} operation="true"></Button>
            </div>
        )
    }

}