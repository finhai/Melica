/* eslint-disable no-unused-vars */
// chama funções assincronas com respostas
// select busca informações sobre o estado
import {call, put, all, takeLatest} from 'redux-saga/effects';
import AsyncStorage from '@react-native-community/async-storage';
import {
  commonLoadingActivity,
  commonSuccessAction,
  commonFailureAction,
} from '../common/actions';
import api from '../../../services/api';

// import AsyncStorage from '@react-native-community/async-storage';
// import {CommonActions, NavigationContext} from '@react-navigation/native';
// import {object} from 'prop-types';
import {
  setReport,
  savedNumber,
  definePage,
  showAction,
  allowPage,
  failLoad,
} from './actions';
import {dateTimeCountrySpecify} from '../../../utils/datetime';

import {errorVerify} from '../../../utils';

function* Relatorio({payload: {total, cart}}) {
  yield put(commonLoadingActivity('carregando...'));
  const date = new Date();
  const name = JSON.parse(yield call(AsyncStorage.getItem, 'Melica@User_Key'));
  const token = JSON.parse(
    yield call(AsyncStorage.getItem, 'Melica@Token_Key')
  );
  const VendCod = JSON.parse(
    yield call(AsyncStorage.getItem, 'Melica@Vendedor_Key')
  );

  const totalAmount = Number(total).toFixed(2);

  try {
    const data = cart.map(element => ({
      ProGrupo: element.id,
      ProGrupoDe: element.title.substring(0, 30),
      ProPreco: Number(element.newValue),
      quantity: Number(element.newQuantity),
      ProGruN: element.grun,
      Procod: element.code,
    }));

    const {
      data: {VenNro},
    } = yield call(api.post, `/sale`, {
      token,
      date,
      VendCod,
      name,
      totalAmount: Number(totalAmount),
      data,
    });

    yield put(savedNumber(VenNro, false));
    yield put(showAction(true));

    yield put(commonSuccessAction(''));
  } catch (error) {
    const message = errorVerify(error);
    yield put(savedNumber(message, false));
    yield put(showAction(true));

    yield put(commonFailureAction(message));
  }
}

function* refreshRelatorio({payload: {page, date}}) {
  yield put(commonLoadingActivity('carregando...'));
  const newDate = dateTimeCountrySpecify('');
  const token = JSON.parse(
    yield call(AsyncStorage.getItem, 'Melica@Token_Key')
  );
  // const dateFormat = date.setHours(0, 0, 0, 0);
  // const dateFormatString = date.toISOString()
  const dataString = date.toISOString();
  // console.tron.log(
  //   `${dataString.substring(0, 12)}0${dataString.substring(
  //     13,
  //     dataString.length
  //   )}`
  // );
  // const dateFormatString = new Date(date.setHours(0, 0, 0, 0));
  // console.tron.log(dateFormatString);
  try {
    // const products = [
    //   {
    //     VenData: '2020-05-12T00:00:00.000Z',
    //     VenNro: 1,
    //     VenCod: 2,
    //     VenTot: 26.9,
    //     VenHora: '11:31:50',
    //     VenSitVen: 0,
    //   },
    // ];
    const {
      data: {totalPages, order},
    } = yield call(api.post, `saleReport`, {
      token,
      date: newDate,
      page,
      onDate: `${dataString.substring(0, 12)}0${dataString.substring(
        13,
        dataString.length
      )}`,
    });
    const products = order.sort((a, b) => a.VenSitVen - b.VenSitVen);
    const newList = products.map((item, indexItem) => {
      if (item.VenSitVen !== 0) {
        return {
          ...item,
          color: false,
        };
      }
      return {
        ...item,
        color: true,
      };
    });

    yield put(
      setReport(
        totalPages,
        // 1,
        newList
      )
    );
    // console.tron.log(totalProducts, totalPages, order);
    yield put(commonSuccessAction(''));
  } catch (error) {
    const message = errorVerify(error);
    yield put(failLoad(true));
    yield put(commonFailureAction(message));
  }
}

function* orderToday({payload: {page, date}}) {
  yield put(commonLoadingActivity('carregando...'));

  const newDate = dateTimeCountrySpecify('');
  const token = JSON.parse(
    yield call(AsyncStorage.getItem, 'Melica@Token_Key')
  );
  // const dateFormat = date.setHours(0, 0, 0, 0);
  // const dateFormatString = date.toISOString()
  const dataString = date.toISOString();
  // console.tron.log(
  //   `${dataString.substring(0, 12)}0${dataString.substring(
  //     13,
  //     dataString.length
  //   )}`
  // );
  // const dateFormatString = new Date(date.setHours(0, 0, 0, 0));
  // console.tron.log(dateFormatString);
  try {
    // const Filter = [
    //   {
    //     VenData: '2020-05-12T00:00:00.000Z',
    //     VenNro: 1,
    //     VenCod: 2,
    //     VenTot: 26.9,
    //     VenHora: '11:31:50',
    //     VenSitVen: 0,
    //   },
    // ];
    const {
      data: {totalPages, order},
    } = yield call(api.post, `saleReport`, {
      token,
      date: newDate,
      page,
      onDate: `${dataString.substring(0, 12)}0${dataString.substring(
        13,
        dataString.length
      )}`,
    });
    const Filter = order.filter(item => item.VenSitVen === 0);
    const newList = Filter.map((item, indexItem) => {
      if (item.VenSitVen !== 0) {
        return {
          ...item,
          color: false,
        };
      }
      return {
        ...item,
        color: true,
      };
    });
    yield put(
      setReport(
        totalPages,
        // 1,
        newList
      )
    );
    // console.tron.log(totalProducts, totalPages, order);
    yield put(commonSuccessAction(''));
  } catch (error) {
    const message = errorVerify(error);
    yield put(failLoad(true));

    yield put(commonFailureAction(message));
  }
}

function* addReportPage({payload: {page, onDate}}) {
  yield put(commonLoadingActivity('carregando...'));

  const token = JSON.parse(
    yield call(AsyncStorage.getItem, 'Melica@Token_Key')
  );
  const date = dateTimeCountrySpecify('');
  const dataString = date.toISOString();
  try {
    const {
      data: {order},
    } = yield call(api.post, `saleReport`, {
      token,
      date,
      page,
      onDate: `${dataString.substring(0, 12)}0${dataString.substring(
        13,
        dataString.length
      )}`,
    });
    const Filter = order.filter(item => item.VenSitVen === 0);
    // console.tron.log(products, totalPages);

    // const dataList = Object.values(products)
    //   .map(item => ({
    //     ...item,
    //     lowerCaseName: item.ProGrupoDe.toLowerCase(),
    //   }))
    //   .sort((a, b) => a.ProGrupoDe > b.ProGrupoDe);

    yield put(definePage(Filter));
    yield put(commonSuccessAction(''));
    // }
  } catch (error) {
    const message = errorVerify(error);
    yield put(failLoad(true));

    yield put(commonFailureAction(message));
    // erro de typagem no código
  }
}

function* FullCart({payload: {total, cart, changePage}}) {
  yield put(commonLoadingActivity('carregando...'));

  const date = new Date();
  const name = JSON.parse(yield call(AsyncStorage.getItem, 'Melica@User_Key'));
  const token = JSON.parse(
    yield call(AsyncStorage.getItem, 'Melica@Token_Key')
  );
  const VendCod = JSON.parse(
    yield call(AsyncStorage.getItem, 'Melica@Vendedor_Key')
  );

  const totalAmount = Number(total).toFixed(2);

  try {
    const data = cart.map(element => ({
      ProGrupo: element.id,
      ProGrupoDe: element.title.substring(0, 30),
      ProPreco: Number(element.newValue),
      quantity: Number(element.newQuantity),
      ProGruN: element.grun,
      Procod: element.code,
    }));

    const {
      data: {VenNro},
    } = yield call(api.post, `/sale`, {
      token,
      date,
      VendCod,
      name,
      totalAmount: Number(totalAmount),
      data,
    });

    yield put(savedNumber(VenNro, false));
    yield put(showAction(true));
    yield put(allowPage(true));

    yield put(commonSuccessAction(''));
  } catch (error) {
    const message = errorVerify(error);
    yield put(savedNumber(message, false));
    yield put(showAction(true));

    yield put(commonFailureAction(message));
  }
}

export default all([
  takeLatest('@relatorio/REQUEST_RELATORIO', Relatorio),
  takeLatest('@report/REFRESH_REPORT', refreshRelatorio),
  takeLatest('@report/ORDERS_TODAY', orderToday),
  takeLatest('@report/ADD_PAGE', addReportPage),
  takeLatest('@relatorio/CART_FULL', FullCart),
]);
