import React, { Component } from "react";
import { HiMiniPlayPause } from "react-icons/hi2";
import { FaForwardFast } from "react-icons/fa6";
import { FaFastBackward } from "react-icons/fa";
import "../CSS/weel.css";

class Weel extends Component {
  render() {
    return (
      <div className="weel-container" id="weel-container">
        <div className="weel" id="weel">
          <div className="controll" id="menu">
            <div>MENU</div>
          </div>
          <div className="controll" id="forward">
            <FaForwardFast />
          </div>
          <div className="controll" id="play-puase">
            <HiMiniPlayPause />
          </div>
          <div className="controll" id="reverse">
            <FaFastBackward />
          </div>
        </div>
        <div className="blank" id="blank"></div>
      </div>
    );
  }
}

export default Weel;
