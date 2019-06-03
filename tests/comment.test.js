import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import React from 'react';
import { mount } from 'enzyme';
import * as api from '../src/api';
import {
  getComments, getCommentsSuccess, getCommentsFailed,
  createComment, createCommentSuccess, createCommentFailed
} from '../src/actions/commentsActions';
import commentsSaga from '../src/saga/commentsSaga';
import commentsReducer from '../src/reducers/commentsReducer';
import CommentInput from '../src/containers/CommentInput';
import Comments from '../src/containers/Comments';

describe('Comments tests', () => {
  const commentData = {
    data: {
      data: [{
        id: 2,
        username: 'username',
      }]
    }
  };

  const error = new Error('error');

  it('get comments successfully', () => expectSaga(commentsSaga)
    .provide([
      [matchers.call.fn(api.getComments), commentData],
    ])
    .dispatch(getComments({}, 'token'))
    .put(getCommentsSuccess(commentData.data.data, {}))
    .run());

  it('create comment successfully', () => expectSaga(commentsSaga)
    .provide([
      [matchers.call.fn(api.createComment), commentData],
    ])
    .dispatch(createComment({}, 'token', {
      username: 'username',
      displaypicture: 'displaypicture',
      id: 2,
    }))
    .put(createCommentSuccess({
      id: 2,
      username: 'username',
      displaypicture: 'displaypicture',
      user: 2,
    }))
    .run());

  it('errors on get comment failure', () => expectSaga(commentsSaga)
    .provide([
      [matchers.call.fn(api.getComments), throwError(error)],
    ])
    .dispatch(getComments({}, 'token'))
    .put(getCommentsFailed())
    .run());

  it('errors on create comment failure', () => expectSaga(commentsSaga)
    .provide([
      [matchers.call.fn(api.createComment), throwError(error)],
    ])
    .dispatch(createComment({}, 'token', {}))
    .put(createCommentFailed())
    .run());
});

describe('Comments reducer', () => {
  const initialState = {
    comments: [],
    loading: false,
    error: false,
    createLoading: false,
    createError: false,
  };

  const comment = {
    body: 'body'
  };

  it('fetch comments started', () => {
    expect(commentsReducer(initialState, getComments(4, 'token')))
      .toEqual({
        ...initialState,
        loading: true,
      });
  });

  it('fetch comments success', () => {
    expect(commentsReducer(initialState, getCommentsSuccess([comment], 3)))
      .toEqual({
        ...initialState,
        comments: {
          3: [comment]
        },
      });
  });

  it('fetch comments failed', () => {
    expect(commentsReducer(initialState, getCommentsFailed()))
      .toEqual({
        ...initialState,
        error: true,
      });
  });

  it('create comment started', () => {
    expect(commentsReducer(initialState, createComment()))
      .toEqual({
        ...initialState,
        createLoading: true,
      });
  });

  it('create comment success', () => {
    expect(commentsReducer({
      ...initialState,
      comments: {
        3: [],
      },
    }, createCommentSuccess(comment, 3)))
      .toEqual({
        ...initialState,
        comments: {
          3: [comment]
        },
      });
  });

  it('create comment failed', () => {
    expect(commentsReducer(initialState, createCommentFailed()))
      .toEqual({
        ...initialState,
        createError: true,
      });
  });

  it('does nothing', () => {
    expect(commentsReducer(initialState, { type: 'NOT_MY_BUSINESS' }))
      .toEqual({
        ...initialState,
      });
  });
});

jest.mock('react-redux', () => ({
  connect: () => params => params
}));

describe('Comments components', () => {
  const comments = {
    16: [
      {
        id: 10,
        user: 3,
        question: 16,
        username: 'some',
        displaypicture: null,
        comment: 'react comment',
        created: '2019-06-02T21:32:41.000Z'
      },
      {
        id: 11,
        user: 3,
        question: 16,
        username: 'some',
        displaypicture: null,
        comment: 'another one',
        created: '2019-06-02T21:33:05.000Z'
      }
    ]
  };

  it('renders <CommentContainer />', () => {
    const wrapper = mount(<Comments
      dispatch={() => 0}
      questionId={16}
      token="token"
      comments={comments[16]}
      showing
    />);
    expect(wrapper.find(Comments).length).toEqual(1);
    wrapper.unmount();
  });


  it('renders <CommentInput />', () => {
    const wrapper = mount(<CommentInput
      dispatch={() => 0}
      question={4}
      user={{}}
      token="token"
      createError={false}
      createLoading={false}
    />);
    wrapper.find('#add-comment-input').first().props().onChange({ target: { value: 'input' } });
    wrapper.find('#add-comment-button').first().props().onClick();
    expect(wrapper.find(CommentInput).length).toEqual(1);
    wrapper.unmount();
  });
});
