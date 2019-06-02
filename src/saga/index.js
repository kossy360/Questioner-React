import { spawn } from 'redux-saga/effects';
import AuthSaga from './AuthSaga';
import MeetupsSaga from './meetupsSaga';
import MeetupSaga from './meetupSaga';
import QuestionsSaga from './questionsSaga';
import CommentsSaga from './commentsSaga';

function* rootSaga() {
  yield spawn(AuthSaga);
  yield spawn(MeetupsSaga);
  yield spawn(MeetupSaga);
  yield spawn(QuestionsSaga);
  yield spawn(CommentsSaga);
}

export default rootSaga;
