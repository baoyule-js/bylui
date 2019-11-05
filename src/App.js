// src/App.js

import React, { Component } from 'react';
import { Button,Draggable } from './components';
class App extends Component {
  constructor(props){
    super(props);
    this.state={
      value:1
    };
    this.changeValue=this.changeValue.bind(this);
  }
  changeValue = function(val){
    console.log(val)
    this.setState({
      value:val
    })
  };
  render() {
    return (
      <div className="App">
        <Button text={'hhhasdasdh'}></Button>
        <Draggable 
        value={[ <Button text={'1'}/>,<Button text={'2'}/>,<Button text={'3'}/>,<Button text={'4'}/>]}
        onChange={this.changeValue}
        render={(a)=>a}
        />
      </div>
    );
  }
}

export default App;

