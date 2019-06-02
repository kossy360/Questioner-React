import {
  call, put, takeLatest
} from 'redux-saga/effects';
import { getSingleMeetup } from '../api';
import * as actions from '../actions/actionTypes';
import { getMeetupSuccess, getMeetupFailed } from '../actions/singleMeetupActions';

function* fetchMeetup({ id, token }) {
  try {
    const { data } = yield call(getSingleMeetup, id, token);
    yield put(getMeetupSuccess(data.data[0]));
  } catch (e) {
    yield put(getMeetupFailed());
  }
}

function* rootSaga() {
  yield takeLatest(actions.GET_SINGLE_MEETUP_STARTED, fetchMeetup);
}

export default rootSaga;
