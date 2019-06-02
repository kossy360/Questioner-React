import {
  call, put, takeLatest
} from 'redux-saga/effects';
import { getComments, createComment } from '../api';
import * as actions from '../actions/actionTypes';
import {
  getCommentsSuccess, getCommentsFailed, createCommentSuccess, createCommentFailed
} from '../actions/commentsActions';

function* fetchMeetup({ id, token }) {
  try {
    const { data } = yield call(getComments, id, token);
    yield put(getCommentsSuccess(data.data, id));
  } catch (e) {
    yield put(getCommentsFailed());
  }
}

function* newComment({ body, token, user }) {
  try {
    const { data } = yield call(createComment, body, token);
    const comment = {
      ...data.data[0],
      user: user.id,
      username: user.username,
      displaypicture: user.displaypicture,
    };
    yield put(createCommentSuccess(comment, body.question));
  } catch (e) {
    yield put(createCommentFailed());
  }
}

function* rootSaga() {
  yield takeLatest(actions.FETCH_COMMENTS_STARTED, fetchMeetup);
  yield takeLatest(actions.CREATE_COMMENT_STARTED, newComment);
}

export default rootSaga;
