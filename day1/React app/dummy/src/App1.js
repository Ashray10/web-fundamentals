import React, { PureComponent } from 'react';
import AddButton from './AddButton';
import Counter from './Counter';
import './App.css';
import { useState } from 'react';

export default class App1 extends PureComponent {
    // const [open, setOpen] = useState("");
    constructor(){
        super();
        this.state={
            counter:0
        }
    }

    increment = ()=>{
        let newCounter = this.state.counter+1;
        this.setState({counter: newCounter});
    }

    render() {
        return (
        <div>
            <AddButton incrementCounter = {this.increment}/>
            <Counter counter={this.state.counter}/>
        </div>
        )
  }
}
