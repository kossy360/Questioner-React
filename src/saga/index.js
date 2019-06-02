import { spawn } from 'redux-saga/effects';
import AuthSaga from './AuthSaga';
import MeetupsSaga from './meetupsSaga';
import MeetupSaga from './meetupSaga';
import QuestionsSaga from './questionsSaga';

function* rootSaga() {
  yield spawn(AuthSaga);
  yield spawn(MeetupsSaga);
  yield spawn(MeetupSaga);
  yield spawn(QuestionsSaga);
}

export default rootSaga;
