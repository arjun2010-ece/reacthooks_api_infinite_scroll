import React, { Component } from 'react'
import Lists from "./components/Lists";

class App extends Component {
  constructor(props){
    super(props);
   // detect page refressh
    window.onbeforeunload = function () {
        window.scrollTo(0, 0);
    }    
  }
  render() {
    return (
      <div>
        <h3>This is a lists App.</h3>
        <Lists />
      </div>
    )
  }
}

export default App;