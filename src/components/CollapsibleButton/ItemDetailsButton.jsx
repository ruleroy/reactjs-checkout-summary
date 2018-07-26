import React, { Component } from "react";
import "./styles.css";

class ItemDetailsButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hidden: true,
      promo: this.props.promo,
      product: this.props.product,
      text: "See item details"
    };
  }

  //function to show and hide details
  setHidden = () => {
    this.setState({
      hidden: this.state.hidden ? false : true,
      text: this.state.hidden ? "Hide item details" : "See item details"
    });
  };

  render = () => {
    const iconStyle = {
      marginLeft: "10px"
    };
    return (
      <div>
        <button className="collapse-btn" onClick={this.setHidden.bind(this)}>
          {this.state.text}
          {this.state.hidden ? (
            <i
              style={iconStyle}
              className="fa fa-plus-square-o"
              aria-hidden="true"
            />
          ) : (
            <i
              style={iconStyle}
              className="fa fa-minus-square-o"
              aria-hidden="true"
            />
          )}
        </button>
        {this.state.hidden ? null : (
          <div className="item-details-product">
            <div className="item-details-thumbnail">
              <img src={this.props.product.img} alt={this.props.product.name} />
            </div>
            <div className="item-details-name">{this.props.product.name}</div>
            <div className="item-details-price">
              ${this.props.product.price}
            </div>
            <div className="item-details-qty">
              Qty: {this.props.product.qty}
            </div>
            <div className="item-details-subtotal">
              ${this.props.product.subtotal}
            </div>
            <div className="item-details-color">
              Actual color: {this.props.product.color}
            </div>
          </div>
        )}
      </div>
    );
  };
}

export default ItemDetailsButton;
