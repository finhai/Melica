import produce from 'immer';

const INITIAL_STATE = {
  singleProduct: {},
};

export default function qrdata(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@qr/DEFINE_SINGLE_PRODUCT':
      return produce(state, draft => {
        draft.singleProduct = action.payload.singleProduct;
      });
    default:
      return state;
  }
}
