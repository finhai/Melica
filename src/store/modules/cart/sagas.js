/* eslint-disable no-empty */
// chama funções assincronas com respostas
// select busca informações sobre o estado
import {call, put, all, takeLatest} from 'redux-saga/effects';
import AsyncStorage from '@react-native-community/async-storage';
// import AsyncStorage from '@react-native-community/async-storage';
// import {CommonActions, NavigationContext} from '@react-navigation/native';
// import {object} from 'prop-types';
import {
  commonLoadingActivity,
  commonSuccessAction,
  commonFailureAction,
} from '../common/actions';
import {finalTotal, addSameProduct} from './actions';
import {errorVerify} from '../../../utils';
import {savedNumber} from '../relatorio/actions';
import {dateTimeCountrySpecify} from '../../../utils/datetime';
import api from '../../../services/api';

function* totalValue({payload: {qtd, price, id, currentValue}}) {
  try {
    const newValue = currentValue.map(element => {
      const total = (qtd + element.defaultQuantity) * price;
      if (element.id === id) {
        return {
          ...element,
          newQuantity: qtd + element.defaultQuantity,
          newValue: price,
          Total: total,
        };
      }

      return element;
    });
    // yield put(addSameProduct(newValue));
    yield put(commonSuccessAction(''));
  } catch (error) {
    const message = errorVerify(error);
    yield put(commonFailureAction(message));
  }
}

function* arrayValue({payload: {total}}) {
  try {
    const sumArray = total.map(element => ({
      ...element,
    }));
    yield put(finalTotal(sumArray));
    yield put(commonSuccessAction(''));
  } catch (error) {
    const message = errorVerify(error);
    yield put(commonFailureAction(message));
  }
}

function* loadOrder({payload: {order, page, date, change}}) {
  yield put(commonLoadingActivity(''));
  const token = JSON.parse(
    yield call(AsyncStorage.getItem, 'Melica@Token_Key')
  );
  const dataString = date.toISOString();
  const currentDate = dateTimeCountrySpecify('-3');

  yield call(
    AsyncStorage.setItem,
    'Melica@Date_Key',
    JSON.stringify(
      `${dataString.substring(0, 12)}0${dataString.substring(
        13,
        dataString.length
      )}`
    )
  );
  yield call(AsyncStorage.setItem, 'Melica@Order_Key', JSON.stringify(order));
  try {
    const {
      data: {products, totalPages},
    } = yield call(
      api.post,
      `/saleItemReport`,
      {
        token,
        date: currentDate,
        page,
        onDate: `${dataString.substring(0, 12)}0${dataString.substring(
          13,
          dataString.length
        )}`,
        VenNro: order,
      },
      {timeout: 1000}
    );
    const newProducts = products.map(item => {
      const total = item.VenValUni * item.VenQtde;
      return {
        id: item.ProGrupo,
        title: item.VenGruDes,
        defaultValue: item.VenValUni,
        defaultQuantity: item.VenQtde,
        code: Number(item.VenProcod),
        grun: Number(item.VenCFOP),
        Total: total,
        color: true,
        newQuantity: item.VenQtde,
        newValue: item.VenValUni,
      };
    });
    const active = change === 0;
    yield put(savedNumber(order, false, active));
    yield put(addSameProduct(newProducts, totalPages));
    yield put(commonSuccessAction(''));
  } catch (error) {
    const message = errorVerify(error);
    yield put(commonFailureAction(message));
    // erro de typagem no código
  }
}

function* changeOrder({payload: {total, cart}}) {
  const currentDate = dateTimeCountrySpecify('-3');
  const token = JSON.parse(
    yield call(AsyncStorage.getItem, 'Melica@Token_Key')
  );
  const order = JSON.parse(
    yield call(AsyncStorage.getItem, 'Melica@Order_Key')
  );
  const savedDate = JSON.parse(
    yield call(AsyncStorage.getItem, 'Melica@Date_Key')
  );
  try {
    const data = cart.map(elements => {
      return {
        ProGrupo: elements.id.toString(),
        ProGrupoDE: elements.title,
        ProPreco: elements.newValue,
        VenQtde: elements.newQuantity,
        Procod: elements.code.toString(),
        ProGruN: elements.grun,
      };
    });
    yield call(api.post, '/changeItens', {
      token,
      date: currentDate,
      VenData: savedDate,
      VenNro: order,
      Ventot: total,
      data,
    });
    yield put(commonSuccessAction(''));
  } catch (error) {
    const message = errorVerify(error);
    yield put(commonFailureAction(message));
  }
}

function* resetCart() {
  try {
    yield put(savedNumber(0, false, false));
    yield put(commonSuccessAction(''));
  } catch (error) {
    const message = errorVerify(error);
    yield put(commonFailureAction(message));
  }
}

export default all([
  takeLatest('@cart/NEW_TOTAL', totalValue),
  takeLatest('@cart/ARRAY_TOTAL', arrayValue),
  takeLatest('@cart/LOAD_ORDER', loadOrder),
  takeLatest('@cart/CHANGE_ORDER', changeOrder),
  takeLatest('@cart/RESET_CART', resetCart),
]);
