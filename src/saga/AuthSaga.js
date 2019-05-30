import {
  call, put, takeLatest
} from 'redux-saga/effects';
import * as api from '../api';
import * as actions from '../actions/actionTypes';
import { authFailed, authSuccess, authLoading } from '../actions/AuthActions';

function* signup({ type, payload, setSubmitting }) {
  yield put(authLoading());
  try {
    const { data: { message, data } } = yield type === actions.SIGNUP_STARTED
      ? call(api.signUp, payload) : call(api.signIn, payload);
    setSubmitting(false);
    if (data) {
      yield put(authSuccess(data[0]));
    } else { throw message; }
  } catch (e) {
    setSubmitting(false);
    yield put(authFailed());
  }
}

function* rootAuthSaga() {
  yield takeLatest([actions.SIGNUP_STARTED, actions.SIGNIN_STARTED], signup);
}

export default rootAuthSaga;
