import {combineReducers} from 'redux';

import login from './login/reducer';
import cart from './cart/reducer';
import menu from './menu/reducer';
import common from './common/reducer';
import products from './products/reducer';
import relatorio from './relatorio/reducer';
import qr from './qrdata/reducer';

export default combineReducers({
  common,
  login,
  menu,
  products,
  cart,
  relatorio,
  qr,
});
