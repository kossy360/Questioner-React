import {
  call, put, takeLatest
} from 'redux-saga/effects';
import { getAllMeetups } from '../api';
import * as actions from '../actions/actionTypes';
import { getMeetupsSuccess, getMeetupsFailed } from '../actions/meetupsActions';

function* fetchMeetups({ token }) {
  try {
    const { data } = yield call(getAllMeetups, token);
    yield put(getMeetupsSuccess(data.data));
  } catch (e) {
    yield put(getMeetupsFailed());
  }
}

function* rootSaga() {
  yield takeLatest(actions.FETCH_MEETUPS_STARTED, fetchMeetups);
}

export default rootSaga;
