import {
  call, put, takeLatest
} from 'redux-saga/effects';
import { getQuestions, createQuestion } from '../api';
import * as actions from '../actions/actionTypes';
import {
  getQuestionsSuccess, getQuestionsFailed, createQuestionSuccess, createQuestionFailed
} from '../actions/questionsActions';

function* fetchMeetup({ id, token }) {
  try {
    const { data } = yield call(getQuestions, id, token);
    yield put(getQuestionsSuccess(data.data));
  } catch (e) {
    yield put(getQuestionsFailed());
  }
}

function* newQuestion({ body, token, user }) {
  try {
    const { data } = yield call(createQuestion, body, token);
    const question = {
      ...data.data[0],
      user: user.id,
      username: user.username,
      displaypicture: user.displaypicture,
    };
    yield put(createQuestionSuccess(question));
  } catch (e) {
    yield put(createQuestionFailed());
  }
}

function* rootSaga() {
  yield takeLatest(actions.FETCH_QUESTIONS_STARTED, fetchMeetup);
  yield takeLatest(actions.CREATE_QUESTION_STARTED, newQuestion);
}

export default rootSaga;
