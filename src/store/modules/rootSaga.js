import {all} from 'redux-saga/effects';

import common from './common/sagas';
import login from './login/sagas';
import menu from './menu/sagas';
import products from './products/sagas';
import cart from './cart/sagas';
import relatorio from './relatorio/sagas';
import qr from './qrdata/sagas';

export default function* rootSaga() {
  return yield all([
    common,
    login,
    menu,
    products,
    cart,
    relatorio,
    qr,
    // adicione mais sagas
  ]);
}
