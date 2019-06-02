import * as actions from './actionTypes';

export const getQuestions = (id, token) => ({
  type: actions.FETCH_QUESTIONS_STARTED,
  token,
  id,
});

export const getQuestionsSuccess = payload => ({
  type: actions.FETCH_QUESTIONS_SUCCESSFUL,
  payload,
});

export const getQuestionsFailed = () => ({
  type: actions.FETCH_QUESTIONS_FAILED,
});

export const createQuestion = (body, token, user) => ({
  type: actions.CREATE_QUESTION_STARTED,
  body,
  token,
  user,
});

export const createQuestionSuccess = payload => ({
  type: actions.CREATE_QUESTION_SUCCESSFUL,
  payload,
});

export const createQuestionFailed = () => ({
  type: actions.CREATE_QUESTION_FAILED,
});
