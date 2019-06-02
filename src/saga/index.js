import { spawn } from 'redux-saga/effects';
import AuthSaga from './AuthSaga';
import MeetupsSaga from './meetupsSaga';
import MeetupSaga from './meetupSaga';

function* rootSaga() {
  yield spawn(AuthSaga);
  yield spawn(MeetupsSaga);
  yield spawn(MeetupSaga);
}

export default rootSaga;
