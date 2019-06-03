import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import React from 'react';
import { mount } from 'enzyme';
import * as api from '../src/api';
import {
  getQuestions, getQuestionsSuccess, getQuestionsFailed,
  createQuestion, createQuestionSuccess, createQuestionFailed
} from '../src/actions/questionsActions';
import questionsSaga from '../src/saga/questionsSaga';
import questionsReducer from '../src/reducers/quetionsReducer';
import QuestionInput from '../src/containers/QuestionInput';
import Questions from '../src/containers/Questions';

describe('Questions tests', () => {
  const questionData = {
    data: {
      token: 'token',
      data: [{
        id: 2,
        username: 'username',
      }]
    }
  };

  const error = new Error('error');

  it('get questions successfully', () => expectSaga(questionsSaga)
    .provide([
      [matchers.call.fn(api.getQuestions), questionData],
    ])
    .dispatch(getQuestions({}, 'token'))
    .put(getQuestionsSuccess(questionData.data.data))
    .run());

  it('create question successfully', () => expectSaga(questionsSaga)
    .provide([
      [matchers.call.fn(api.createQuestion), questionData],
    ])
    .dispatch(createQuestion({}, 'token', {
      username: 'username',
      displaypicture: 'displaypicture',
      id: 2,
    }))
    .put(createQuestionSuccess({
      id: 2,
      username: 'username',
      displaypicture: 'displaypicture',
      user: 2,
    }))
    .run());

  it('errors on get question failure', () => expectSaga(questionsSaga)
    .provide([
      [matchers.call.fn(api.getQuestions), throwError(error)],
    ])
    .dispatch(getQuestions({}, 'token'))
    .put(getQuestionsFailed())
    .run());

  it('errors on create question failure', () => expectSaga(questionsSaga)
    .provide([
      [matchers.call.fn(api.createQuestion), throwError(error)],
    ])
    .dispatch(createQuestion({}, 'token', {}))
    .put(createQuestionFailed())
    .run());
});

describe('Questions reducer', () => {
  const initialState = {
    questions: [],
    loading: false,
    error: false,
    createLoading: false,
    createError: false,
  };

  const question = {
    body: 'body'
  };

  it('fetch questions started', () => {
    expect(questionsReducer(initialState, getQuestions(4, 'token')))
      .toEqual({
        ...initialState,
        loading: true,
      });
  });

  it('fetch questions success', () => {
    expect(questionsReducer(initialState, getQuestionsSuccess([question])))
      .toEqual({
        ...initialState,
        questions: [question],
      });
  });

  it('fetch questions failed', () => {
    expect(questionsReducer(initialState, getQuestionsFailed()))
      .toEqual({
        ...initialState,
        error: true,
      });
  });

  it('create question started', () => {
    expect(questionsReducer(initialState, createQuestion()))
      .toEqual({
        ...initialState,
        createLoading: true,
      });
  });

  it('create question success', () => {
    expect(questionsReducer(initialState, createQuestionSuccess(question)))
      .toEqual({
        ...initialState,
        questions: [question],
      });
  });

  it('create question failed', () => {
    expect(questionsReducer(initialState, createQuestionFailed()))
      .toEqual({
        ...initialState,
        createError: true,
      });
  });

  it('does nothing', () => {
    expect(questionsReducer(initialState, { type: 'NOT_MY_BUSINESS' }))
      .toEqual({
        ...initialState,
      });
  });
});

jest.mock('react-redux', () => ({
  connect: () => params => params
}));

jest.mock('../src/containers/Comments', () => () => null);

describe('Questions components', () => {
  const questions = [
    {
      id: 16,
      user: 3,
      username: 'some',
      displaypicture: null,
      meetup: 1,
      body: 'check again',
      created: '2019-06-02T11:56:21.000Z',
      votes: 0,
      response: null
    },
    {
      id: 15,
      user: 3,
      username: 'some',
      displaypicture: null,
      meetup: 1,
      body: 'try again',
      created: '2019-06-02T11:54:27.000Z',
      votes: 0,
      response: null
    },
    {
      id: 14,
      user: 3,
      username: 'some',
      displaypicture: null,
      meetup: 1,
      body: 'another one',
      created: '2019-06-02T11:37:26.000Z',
      votes: 0,
      response: null
    },
    {
      id: 13,
      user: 3,
      username: 'some',
      displaypicture: null,
      meetup: 1,
      body: 'work now',
      created: '2019-06-02T11:34:58.000Z',
      votes: 0,
      response: null
    },
    {
      id: 12,
      user: 3,
      username: 'some',
      displaypicture: null,
      meetup: 1,
      body: 'another one',
      created: '2019-06-02T11:27:10.000Z',
      votes: 0,
      response: null
    }
  ];

  it('renders <QuestionContainer />', () => {
    const wrapper = mount(<Questions
      dispatch={() => 0}
      id={4}
      token="token"
      questions={questions}
    />);
    expect(wrapper.find(Questions).length).toEqual(1);
    wrapper.unmount();
  });

  it('renders <QuestionInput />', () => {
    const wrapper = mount(<QuestionInput
      dispatch={() => 0}
      meetup={4}
      user={{}}
      createError={false}
      createLoading={false}
    />);
    wrapper.find('#question-input').first().props().onChange({ target: { value: 'input' } });
    wrapper.find('#question-input-button').first().props().onClick();
    expect(wrapper.find(QuestionInput).length).toEqual(1);
    wrapper.unmount();
  });
});
