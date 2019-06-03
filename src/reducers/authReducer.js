import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import * as actions from '../actions/actionTypes';

const authPersistConfig = {
  key: 'auth',
  storage,
};

const initialState = {
  token: '',
  user: {},
  error: false,
  loading: false,
};

const authLoading = state => ({
  ...state,
  error: false,
  loading: true,
});

const authSuccess = (state, action) => ({
  ...state,
  loading: false,
  error: false,
  token: action.payload.token,
  user: action.payload.user,
});

const authFail = (state, action) => ({
  ...state,
  error: true,
  loading: false,
});

const signOut = () => initialState;

export const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.AUTH_LOADING: return authLoading(state, action);
    case actions.AUTH_SUCCESS: return authSuccess(state, action);
    case actions.AUTH_FAILURE: return authFail(state, action);
    case actions.SIGN_OUT: return signOut();
    default:
      return state;
  }
};

export default persistReducer(authPersistConfig, AuthReducer);
