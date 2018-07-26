import React, { Component } from "react";
import Tooltip from "../Tooltip/Tooltip";
import CollapsibleButton from "../CollapsibleButton/CollapsibleButton";
import ItemDetailsButton from "../CollapsibleButton/ItemDetailsButton";
import PromoCodeButton from "../CollapsibleButton/PromoCodeButton";
import { connect } from "react-redux";
import "./styles.css";

class OrderSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //product set to a static object
      chair: {
        name:
          "OFM Essentials Racecar-Style Leather Gaming Chair, Multiple Colors",
        price: 99.11,
        subtotal: 102.96,
        tax: 8.92,
        pickupSavings: 3.85,
        qty: 1,
        color: "Red",
        img:
          "https://i5.walmartimages.com/asr/e73e1252-642c-4473-93ea-fd3b564a7027_1.3e81ea58fa3042452fe185129a4a865f.jpeg?odnHeight=100&odnWidth=100&odnBg=FFFFFF"
      }
    };
  }

  //calculate total price based on subtotal, pickup savings, and taxes
  calculateTotal = () => {
    var total =
      this.state.chair.subtotal -
      this.state.chair.pickupSavings +
      this.state.chair.tax;
    if (this.props.apply) {
      total = total - total * this.props.discount;
    }
    return total.toFixed(2);
  };

  //calculate amount discounted off from redux store
  calculateDiscount = () => {
    var totalDiscount =
      (this.state.chair.subtotal -
        this.state.chair.pickupSavings +
        this.state.chair.tax) *
      this.props.discount;
    return totalDiscount.toFixed(2);
  };

  render = () => {
    return (
      <div className="summary">
        <div className="purchaseSummary">
          <div className="purchaseSummary-subtotal">
            <span className="purchaseSummary-label">Subtotal</span>
            <span className="purchaseSummary-price">
              ${this.state.chair.subtotal}
            </span>
          </div>

          <div className="purchaseSummary-pickupSavings">
            <span className="purchaseSummary-label">
              <Tooltip
                text="Pickup savings"
                tipText="Picking up your order in the store helps cut costs, and we pass
              the savings on to you."
              />
            </span>
            <span className="purchaseSummary-price purchaseSummary-price-text">
              -${this.state.chair.pickupSavings}
            </span>
          </div>

          <div className="purchaseSummary-tax">
            <span className="purchaseSummary-label">Est.taxes & fees</span>
            <span className="purchaseSummary-price">
              ${this.state.chair.tax}
            </span>
            <div className="purchaseSummary-label">
              (Based on <u>94085</u>)
            </div>
          </div>

          {this.props.apply ? (
            <div className="purchaseSummary-discount">
              <span className="purchaseSummary-label">Promo code</span>
              <span className="purchaseSummary-price purchaseSummary-price-text">
                -${this.calculateDiscount()}
              </span>
              <div className="purchaseSummary-label">
                ({this.props.promoCode})
              </div>
            </div>
          ) : null}

          <div>
            <hr className="divider" aria-hidden="true" />
          </div>

          <div>
            <div className="purchaseSummary-total">
              <span className="purchaseSummary-label total">Est. total</span>
              <span className="purchaseSummary-price total-price">
                ${this.calculateTotal()}
              </span>
            </div>

            <div className="purchaseSummary-details">
              <ItemDetailsButton product={this.state.chair} />
            </div>

            <div>
              <hr className="divider" aria-hidden="true" />
            </div>

            <div className="purchaseSummary-promo">
              <PromoCodeButton />
            </div>
          </div>
        </div>
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

export default connect(mapStateToProps)(OrderSummary);
