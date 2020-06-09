import produce from 'immer';

const INITIAL_STATE = {
  product: [],
  products: [],
  totalPages: 0,
  InputState: false,
  errorTrue: false,
};

export default function products(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@products/DEFINE_PRODUCT':
      return produce(state, draft => {
        draft.product = action.payload.product;
      });
    case '@products/DEFINE_PRODUCTS':
      return produce(state, draft => {
        draft.products = action.payload.products;
        draft.totalPages = action.payload.totalPages;
      });
    case '@products/DEFINE_PAGE':
      return produce(state, draft => {
        draft.products.push(...action.payload.products);
      });
    case '@products/CHANGE_STATE':
      return produce(state, draft => {
        draft.InputState = action.payload.InputState;
      });
    case '@products/ERROR_VERIFY':
      return produce(state, draft => {
        draft.errorTrue = action.payload.errorTrue;
      });
    default:
      return state;
  }
}
