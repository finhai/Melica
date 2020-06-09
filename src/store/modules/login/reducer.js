import produce from 'immer';

const INITIAL_STATE = {
  token: '',
  username: '',
  password: '',
  users: [],
  VendCod: 0,
};

export default function login(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@login/SET_USERNAME':
      return produce(state, draft => {
        draft.username = action.payload.username;
        draft.password = action.payload.password;
      });
    case '@login/LOGIN_SUCCESS':
      return produce(state, draft => {
        draft.users = action.payload.users;
      });
    case '@login/SET_USER':
      return produce(state, draft => {
        draft.token = action.payload.token;
        draft.username = action.payload.username;
        draft.VendCod = action.payload.VendCod;
      });
    default:
      return state;
  }
}
