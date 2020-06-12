// chama funções assincronas com respostas
// select busca informações sobre o estado
import {call, put, all, takeLatest} from 'redux-saga/effects';

import AsyncStorage from '@react-native-community/async-storage';
// import {CommonActions, NavigationContext} from '@react-navigation/native';

import {replace, navigate} from '../../../services/navigation';
import api from '../../../services/api';
import {dateTimeCountrySpecify} from '../../../utils/datetime';
import {
  commonLoadingActivity,
  commonSuccessAction,
  commonFailureAction,
} from '../common/actions';
import {setLogin, setUser, checkConnection} from './actions';
import {errorVerify} from '../../../utils';

// eslint-disable-next-line no-unused-vars
function* loginRequest({payload: {username, password}}) {
  yield put(commonLoadingActivity('carregando...'));
  const date = dateTimeCountrySpecify('');

  try {
    // yield put(commonSuccessAction(''));
    // yield put(setUser('smth', 'super', 2));
    // replace('Menu');
    const {
      data: {Token: token, Name, VenCod},
    } = yield call(api.post, `/login`, {
      usermkt: username,
      password,
      date,
    });

    yield put(commonSuccessAction(''));
    yield put(setUser(token, Name, VenCod));

    yield call(AsyncStorage.setItem, 'Melica@User_Key', JSON.stringify(Name));
    yield call(AsyncStorage.setItem, 'Melica@Token_Key', JSON.stringify(token));
    yield call(
      AsyncStorage.setItem,
      'Melica@Vendedor_Key',
      JSON.stringify(VenCod)
    ); // eu nao sei como
    replace('Menu');
  } catch (error) {
    // erro de typagem no código
    const message = errorVerify(error);
    yield put(commonFailureAction(message));
  }
}

function* userExist() {
  yield put(commonLoadingActivity(''));
  const name = JSON.parse(yield call(AsyncStorage.getItem, 'Melica@User_Key'));
  const token = JSON.parse(
    yield call(AsyncStorage.getItem, 'Melica@Token_Key')
  );
  const venCod = JSON.parse(
    yield call(AsyncStorage.getItem, 'Melica@Vendedor_Key')
  );
  const datenow = dateTimeCountrySpecify('');
  const dateDay = datenow.getDate().toString();
  const dateYear = datenow.getFullYear().toString();
  const dateMonth = datenow.getMonth().toString();
  const pad = '00';
  const resultDay = (pad + dateDay).slice(-pad.length);
  const resultMonth = (pad + dateMonth).slice(-pad.length);
  const onDate = `${dateYear}-${resultMonth}-${resultDay}`;

  try {
    if (token !== null && name !== null && venCod !== null && onDate !== null) {
      const {data} = yield call(api.post, '/requestDate', {
        token,
        name,
        venCod,
        onDate,
      });
      if (onDate >= data[0].UserHoraI || onDate <= data[0].UserHoraF) {
        yield put(setUser(token, name, venCod));
        replace('Menu');
        yield put(commonSuccessAction(''));
      }
    } else {
      yield put(commonFailureAction(''));
    }
  } catch (error) {
    // erro de typagem no código
    const message = errorVerify(error);
    yield put(commonFailureAction(message));
  }
}

function* logout() {
  yield put(commonLoadingActivity(''));
  try {
    yield call(AsyncStorage.removeItem, 'Melica@Token_Key');
    yield call(AsyncStorage.removeItem, 'Melica@User_Key');
    yield call(AsyncStorage.removeItem, 'Melica@Vendedor_Key');

    navigate('Login');
    yield put(commonSuccessAction(''));
  } catch (error) {
    // erro de typagem no código
    const message = errorVerify(error);
    yield put(commonFailureAction(message));
  }
}

function* firstTime() {
  const didlogin = JSON.parse(
    yield call(AsyncStorage.getItem, 'Melica@Login_Key')
  );
  try {
    if (didlogin === null) {
      yield call(
        AsyncStorage.setItem,
        'Melica@Login_Key',
        JSON.stringify(true)
      );
      yield put(checkConnection(false));
      yield put(commonSuccessAction(''));
    } else if (didlogin) {
    }
  } catch (error) {
    const message = errorVerify(error);
    yield put(commonFailureAction(message));
  }
}

export default all([
  takeLatest('@login/LOGIN_REQUEST', loginRequest),
  takeLatest('@login/REQUEST_USER_EXIST', userExist),
  takeLatest('@login/LOGOUT_USER', logout),
  takeLatest('@login/FIRST_TIME', firstTime),
]);
