import React, { Component } from "react";
import { connect } from "react-redux";
import "./styles.css";

class PromoCodeButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hidden: true,
      promo: "",
      product: this.props.product,
      text: "Apply promo code",
      labelText: "Promo code",
      clicked: false
    };

    this.applyPromoCode = this.applyPromoCode.bind(this);
  }

  //send dispatch to middleware to check for valid promo before applying to store
  applyPromoCode = () => {
    const that = this;
    this.setState({ clicked: true });
    this.props.dispatch({ type: "PROMO_APPLIED", promoCode: that.state.promo });
  };

  ////function to show and hide details
  setHidden = () => {
    this.setState({
      hidden: this.state.hidden ? false : true,
      text: this.state.hidden ? "Hide promo code" : "Apply promo code"
    });
  };

  //update promo code input value on change
  updateInputValue = e => {
    this.setState({
      promo: e.target.value
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
          <div>
            <div className="promo-code-box">
              {!this.props.apply && this.state.clicked ? (
                <span className="promo-code-box-label failed-text">
                  <i className="fa fa-exclamation-circle" aria-hidden="true" />{" "}
                  Sorry, this code is not applicable.
                </span>
              ) : (
                <span className="promo-code-box-label">Promo code</span>
              )}
              <div className="promo-code-box-validate">
                <button
                  onClick={this.applyPromoCode}
                  className="promo-code-box-btn"
                >
                  Apply
                </button>
                <span className="promo-code-box-span">
                  {!this.props.apply && this.state.clicked ? (
                    <input
                      onChange={this.updateInputValue}
                      className="promo-code-box-input failed"
                      type="text"
                      name="promo-code"
                    />
                  ) : (
                    <input
                      onChange={this.updateInputValue}
                      className="promo-code-box-input"
                      type="text"
                      name="promo-code"
                    />
                  )}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };
}

const mapStateToProps = store => {
  return {
    promoCode: store.promoCode,
    discount: store.discount,
    apply: store.apply
  };
};

export default connect(mapStateToProps)(PromoCodeButton);
