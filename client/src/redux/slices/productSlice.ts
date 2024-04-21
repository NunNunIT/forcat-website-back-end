const initialState = {
  cartItem: {},
};

export default function productReducers(state = initialState, action) {
  switch (action.type) {
    case "addCartItem": {
      return { ...state, cartItem: action.payload };
    }

    default:
      return state;
  }
}
