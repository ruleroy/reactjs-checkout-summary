import React, { Component } from "react";
import "./styles.css";

class Tooltip extends Component {
  constructor(props) {
    super(props);
    this.state = { hover: false };

    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  //event listeners for handling outside element clicking
  componentDidMount = () => {
    document.addEventListener("mousedown", this.handleClickOutside);
  };

  componentWillUnmount = () => {
    document.removeEventListener("mousedown", this.handleClickOutside);
  };

  //set ref for tooltip
  setWrapperRef = node => {
    this.wrapperRef = node;
  };

  //hide tooltip when clicking outside of element
  handleClickOutside = event => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({ hover: false });
    }
  };

  //show tooltip
  handleMouseDown = () => {
    this.setState({ hover: this.state.hover ? false : true });
  };

  render = () => {
    const tooltipStyle = {
      display: this.state.hover ? "block" : "none"
    };
    return (
      <div>
        <div>
          <div
            ref={this.setWrapperRef}
            onMouseDown={this.handleMouseDown.bind(this)}
          >
            <span className="link">{this.props.text}</span>
          </div>
          <div className="tooltip" style={tooltipStyle}>
            {this.props.tipText}
          </div>
        </div>
      </div>
    );
  };
}

export default Tooltip;
