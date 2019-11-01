// src/App.js

import React, { Component } from 'react';
import { Button,Draggable } from './components';
class App extends Component {
  render() {
    return (
      <div className="App">
        <Button text={'hhhasdasdh'}></Button>
        <Draggable 
        value={[ {key:1, sort_key:1 ,code_key:1 ,node:<Button text={'1'}/>} ,{text:'2',key:2, sort_key:2 ,code_key:2,node:<Button text={'2'}/>},{text:'3',key:3, sort_key:3 ,code_key:3,node:<Button text={'3'}/>},{text:'4',key:4, sort_key:4 ,code_key:4,node:<Button text={'4'}/>},{text:'5',key:5, sort_key:5,code_key:5},{text:'6',key:6, sort_key:6,code_key:6},{text:'7',key:7, sort_key:7 ,code_key:7}]}
        sortKey={'sort_key'}
        codeKey={'code_key'}
        render={(a)=>a}
        />
      </div>
    );
  }
}

export default App;

