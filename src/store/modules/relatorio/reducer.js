import produce from 'immer';

const INITIAL_STATE = {
  relatorio: [],
  totalPages: 0,
  today: false,
  VenNro: 0,
  showNumber: false,
  active: false,
  blankChange: false,
  blankVenNro: 0,
  changePage: false,
  errorTrue: false,
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

        draft.active = action.payload.active;
      });
    case '@report/DEFINE_PAGE':
      return produce(state, draft => {
        draft.relatorio.push(...action.payload.relatorio);
      });
    case '@report/SHOW_ACTION':
      return produce(state, draft => {
        draft.showNumber = action.payload.showNumber;
      });
    case '@report/BLANK_VARS':
      return produce(state, draft => {
        draft.blankVenNro = action.payload.blankVenNro;
        draft.blankChange = action.payload.blankChange;
      });
    case '@relatorio/ALLOW_PAGE':
      return produce(state, draft => {
        draft.changePage = action.payload.changePage;
      });
    case '@relatorio/FAIL_LOAD':
      return produce(state, draft => {
        draft.errorTrue = action.payload.errorTrue;
      });
    case '@relatorio/RESET_REPORT':
      return produce(state, draft => {
        draft.relatorio = action.payload.relatorio;
        draft.totalPages = action.payload.totalPages;
      });
    default:
      return state;
  }
}
