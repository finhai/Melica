// chama funções assincronas com respostas
// select busca informações sobre o estado
import AsyncStorage from '@react-native-community/async-storage';
import {call, put, all, takeLatest} from 'redux-saga/effects';

// import {CommonActions, NavigationContext} from '@react-navigation/native';

import {replace, navigate} from '../../../services/navigation';
import api from '../../../services/api';
import {
  commonLoadingActivity,
  commonSuccessAction,
  commonFailureAction,
} from '../common/actions';
import {defineSingleProduct} from './actions';
import {errorVerify} from '../../../utils';

// eslint-disable-next-line no-unused-vars

function* getProduct({payload: {Id}}) {
  yield put(commonLoadingActivity('carregando...'));
  const token = JSON.parse(
    yield call(AsyncStorage.getItem, 'Melica@Token_Key')
  );
  const date = new Date();
  try {
    const {data: product} = yield call(api.post, `/eanID`, {
      token,
      date,
      id: parseInt(Id),
    });
    yield put(defineSingleProduct(product));
    yield put(commonSuccessAction(''));
  } catch (error) {
    // erro de typagem no código
    const message = errorVerify(error);
    yield put(commonFailureAction(message));
  }
}

export default all([takeLatest('@qr/DEFINE_PRODUCT_INFO', getProduct)]);
