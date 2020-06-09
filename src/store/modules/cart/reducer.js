import produce from 'immer';

const INITIAL_STATE = {
  cartProducts: [],
  totalSum: [],
  totalPages: 0,
  VenSitVen: 0,
};

export default function cart(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@cart/ADD_PRODUCT_TO_CART':
      return produce(state, draft => {
        draft.cartProducts.push(action.payload.product);
      });
    case '@cart/ADD_SAME_PRODUCT':
      return produce(state, draft => {
        draft.cartProducts = action.payload.product;
        draft.totalPages = action.payload.totalPages;
      });
    case '@cart/RESET_CART':
      return produce(state, draft => {
        draft.cartProducts = [];
      });
    case '@cart/REFRESH_CART':
      return produce(state, draft => {
        draft.cartProducts = action.payload.products;
      });
    case '@cart/SUM_TOTAL':
      return produce(state, draft => {
        draft.totalSum.push(action.payload.sum);
      });
    case '@cart/FINAL_TOTAL':
      return produce(state, draft => {
        draft.totalSum = action.payload.total;
      });
    case '@cart/ARRAY_TOTAL':
      return produce(state, draft => {
        draft.totalSum = action.payload.total;
      });
    case '@cart/CART_ACTIVE':
      return produce(state, draft => {
        draft.VenSitVen = action.payload.VenSitVen;
      });
    default:
      return state;
  }
}
