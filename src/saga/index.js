import { spawn } from 'redux-saga/effects';
import AuthSaga from './AuthSaga';
import MeetupsSaga from './meetupsSaga';

function* rootSaga() {
  yield spawn(AuthSaga);
  yield spawn(MeetupsSaga);
}

export default rootSaga;
