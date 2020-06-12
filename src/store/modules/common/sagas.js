import {call, put, all, takeLatest} from 'redux-saga/effects';

import {
  commonLoadingActivity,
  commonSuccessAction,
  commonFailureAction,
} from './actions';

import {errorVerify} from '../../../utils';

function* resetValues() {
  yield put(commonLoadingActivity(''));
  try {
    yield put(commonSuccessAction(''));
  } catch (error) {
    const message = errorVerify(error);
    yield put(commonFailureAction(message));
  }
}

export default all([takeLatest('@common/RESET_ACTIVITY', resetValues)]);
