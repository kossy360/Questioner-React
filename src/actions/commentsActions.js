import * as actions from './actionTypes';

export const getComments = (id, token) => ({
  type: actions.FETCH_COMMENTS_STARTED,
  token,
  id,
});

export const getCommentsSuccess = (payload, question) => ({
  type: actions.FETCH_COMMENTS_SUCCESSFUL,
  payload,
  question,
});

export const getCommentsFailed = () => ({
  type: actions.FETCH_COMMENTS_FAILED,
});

export const createComment = (body, token, user) => ({
  type: actions.CREATE_COMMENT_STARTED,
  body,
  token,
  user,
});

export const createCommentSuccess = (payload, question) => ({
  type: actions.CREATE_COMMENT_SUCCESSFUL,
  payload,
  question,
});

export const createCommentFailed = () => ({
  type: actions.CREATE_COMMENT_FAILED,
});
