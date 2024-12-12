import React, { Component } from "react";
import Weel from "./component/Weel";
import Display from "./component/Display";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 0,
    };
  }

  render() {
    return (
      <div>
        <Display />
        <Weel />
      </div>
    );
  }
}

export default App;
