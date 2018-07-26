import React, { Component } from "react";
import "./styles.css";

//Reusable component for collapsible button
class CollapsibleButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hidden: true
    };
  }

  setHidden = () => {
    this.setState({
      hidden: this.state.hidden ? false : true
    });
  };

  render = () => {
    return (
      <div>
        <button className="collapse-btn" onClick={this.setHidden.bind(this)}>
          {this.props.text}
        </button>
        {this.state.hidden ? null : <div>{this.props.content}</div>}
      </div>
    );
  };
}

export default CollapsibleButton;
