import produce from 'immer';

const INITIAL_STATE = {
  relatorio: [],
  totalPages: 0,
  today: false,
  VenNro: 0,
  showNumber: false,
  active: false,
};

export default function products(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@report/SET_REPORT':
      return produce(state, draft => {
        draft.relatorio = action.payload.products;
        draft.totalPages = action.payload.page;
      });
    case '@report/REPORT_DAY':
      return produce(state, draft => {
        draft.today = action.payload.today;
      });
    case '@report/REPORT_NR':
      return produce(state, draft => {
        draft.VenNro = action.payload.VenNro;
        draft.showNumber = action.payload.showNumber;
        draft.active = action.payload.active;
      });
    case '@report/DEFINE_PAGE':
      return produce(state, draft => {
        draft.relatorio.push(...action.payload.relatorio);
      });
    default:
      return state;
  }
}
