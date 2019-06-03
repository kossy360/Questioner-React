import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import React from 'react';
import { shallow, mount } from 'enzyme';
import * as api from '../src/api';
import {
  authFailed, authSuccess, authLoading, signinStarted, signupStarted, signoutUser
} from '../src/actions/AuthActions';
import authSaga from '../src/saga/AuthSaga';
import { AuthReducer } from '../src/reducers/authReducer';
import AuthComponent from '../src/components/Authentication';
import SigninForm from '../src/components/Authentication/SigninForm';
import { Authentication as AuthContainer } from '../src/containers/Authentication';

describe('Authentication tests', () => {
  const userData = {
    data: {
      token: 'token',
      data: [{
        firstname: 'firstname',
        username: 'lastname',
      }]
    }
  };

  const error = new Error('error');

  it('signs in successfully', () => expectSaga(authSaga)
    .provide([
      [matchers.call.fn(api.signIn), userData],
    ])
    .dispatch(signinStarted({}, () => 0))
    .put(authLoading())
    .put(authSuccess(userData.data.data[0]))
    .run());

  it('signs in successfully', () => expectSaga(authSaga)
    .provide([
      [matchers.call.fn(api.signUp), userData],
    ])
    .dispatch(signupStarted({}, () => 0))
    .put(authLoading())
    .put(authSuccess(userData.data.data[0]))
    .run());

  it('errors on auth failure', () => expectSaga(authSaga)
    .provide([
      [matchers.call.fn(api.signUp), throwError(error)],
    ])
    .dispatch(signupStarted({}, () => 0))
    .put(authLoading())
    .put(authFailed())
    .run());

  it('errors on soft auth failure', () => expectSaga(authSaga)
    .provide([
      [matchers.call.fn(api.signUp), { data: { message: 'failed' } }],
    ])
    .dispatch(signupStarted({}, () => 0))
    .put(authLoading())
    .put(authFailed())
    .run());
});

describe('Authentication reducer', () => {
  const initialState = {
    token: '',
    user: {},
    error: false,
    loading: false,
  };

  const userData = {
    user: {
      firstname: 'firstname',
      username: 'lastname',
    },
    token: 'token'
  };

  it('auth success', () => {
    expect(AuthReducer(initialState, authSuccess(userData)))
      .toEqual({
        ...initialState,
        loading: false,
        error: false,
        token: userData.token,
        user: userData.user,
      });
  });

  it('auth loading', () => {
    expect(AuthReducer(initialState, authLoading()))
      .toEqual({
        ...initialState,
        loading: true,
      });
  });

  it('auth failure', () => {
    expect(AuthReducer(initialState, authFailed()))
      .toEqual({
        ...initialState,
        error: true,
      });
  });

  it('signout', () => {
    expect(AuthReducer(initialState, signoutUser()))
      .toEqual({
        ...initialState,
      });
  });

  it('does nothing', () => {
    expect(AuthReducer(initialState, { type: 'NOT_MY_BUSINESS' }))
      .toEqual({
        ...initialState,
      });
  });
});

describe('Authentication components', () => {
  it('renders <AuthComponent />', () => {
    const wrapper = mount(<AuthComponent
      signin={() => 0}
      signup={() => 0}
      loading={false}
      error={false}
    />);
    wrapper.find('form').first().simulate('submit');
    expect(wrapper.find(AuthComponent).length).toEqual(1);
    expect(wrapper.find(SigninForm).length).toEqual(1);
    wrapper.find(SigninForm).props().handleSubmit({ name: 'name', 'Confirm password': 'ddd' }, { setSubmitting: () => 0 });
    wrapper.find('#signinTabBtn').first().simulate('click');
    wrapper.find('#signupTabBtn').first().simulate('click');
    wrapper.unmount();
  });

  it('renders <AuthContainer />', () => {
    const wrapper = shallow(<AuthContainer
      signin={() => 0}
      signup={() => 0}
      loading={false}
      error={false}
    />);
    expect(wrapper.find(AuthComponent).length).toEqual(1);
    wrapper.unmount();
  });
});
