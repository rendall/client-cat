import React, { Component } from "react";
import "./Spinner.css";

export class Spinner extends Component {
  render() {
    return (
      <div className="Spinner">
        <div className="dot1" />
        <div className="dot2" />
      </div>
    );
  }
}
