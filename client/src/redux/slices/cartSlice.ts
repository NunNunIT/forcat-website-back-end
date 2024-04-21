const initialState = {
  changedItems: [],
  deletedItems: [],
  buyItems: [],
};

export default function cartReducers(state = initialState, action) {
  switch (action.type) {
    case "updateChangedItems": {
      // Check if the item already exists in the array
      const duplicatedIndex = state.changedItems.findIndex(
        (item) => item.product_id === action.payload.product_id
      );

      // If the item already exists, update it, otherwise add it to the array
      const updatedItems =
        duplicatedIndex !== -1
          ? [
              ...state.changedItems.slice(0, duplicatedIndex),
              action.payload,
              ...state.changedItems.slice(duplicatedIndex + 1),
            ]
          : [...state.changedItems, action.payload];

      return {
        ...state,
        changedItems: updatedItems,
      };
    }

    case "updateDeletedItems": {
      // Check if the item already exists in the array
      const duplicatedIndex = state.deletedItems.findIndex(
        (item) => item.variant_id === action.payload.variant_id
      );

      // If the item already exists, do nothing, otherwise add it to the array
      const updatedItems =
        duplicatedIndex !== -1
          ? state.deletedItems
          : [...state.deletedItems, action.payload];

      return { ...state, deletedItems: updatedItems };
    }

    case "addBuyItems": {
      return { ...state, buyItems: action.payload };
    }

    default:
      return state;
  }
}
