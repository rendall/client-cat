import React, { Component } from "react";

interface ToggleProps {}
interface ToggleState {
  toggle:boolean;
}

export class Toggle extends Component<ToggleProps,ToggleState>{

  onToggleClick = () => this.setState({ toggle:!this.state.toggle })
  getClassName = () => `panel-toggle ${ this.state && this.state.toggle? "is-toggled":""  }`
  componentWillMount = () => this.setState({toggle:false})

  render() {
    return (
      <button className={this.getClassName()} onClick={this.onToggleClick}>
      </button>
    );
  }
}
