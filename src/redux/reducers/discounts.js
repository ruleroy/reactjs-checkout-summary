const initialState = {
  apply: false,
  discount: 0,
  promoCode: null
};

const discountReducer = (state = initialState, action) => {
  switch (action.type) {
    case "PROMO_INVALID":
      const nextState = {
        ...state,
        discount: 0,
        apply: false,
        promoCode: null
      };
      return nextState;
    //IF VALID PROMO, SET DISCOUNT TO 10%
    case "PROMO_APPLIED":
      const nextState2 = {
        ...state,
        promoCode: action.promoCode,
        discount: 0.1,
        apply: true
      };
      return nextState2;
    default:
      return state;
  }
};

export default discountReducer;
