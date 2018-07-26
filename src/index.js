import React from "react";
import ReactDOM from "react-dom";
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import discountReducer from "./redux/reducers/discounts";

//Main functional component
import OrderSummary from "./components/OrderSummary/OrderSummary.jsx";

import "./styles.css";

//Middleware to check if promo code is valid, else return PROMO_INVALID action
const logger = store => next => action => {
  console.log("action fired", action);
  if (action.promoCode.toUpperCase() === "DISCOUNT") {
    next(action);
  } else {
    console.log("Invalid promo code.");
    action.type = "PROMO_INVALID";
    next(action);
  }
};
const middleware = applyMiddleware(logger);

const store = createStore(discountReducer, undefined, middleware);

store.subscribe(() => {
  console.log("store changed", store.getState());
});

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <div className="flex-container">
          <OrderSummary />
        </div>
      </div>
    </Provider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
