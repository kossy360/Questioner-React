import * as actions from '../actions/actionTypes';

const initialState = {
  comments: {},
  loading: false,
  error: false,
  createLoading: false,
  createError: false,
};

const fetchStarted = state => ({
  ...state,
  loading: true,
});

const fetchSuccess = (state, action) => ({
  ...state,
  comments: {
    ...state.comments,
    [action.question]: action.payload,
  },
  loading: false,
});

const fetchFailed = state => ({
  ...state,
  loading: false,
  error: true,
});

const createStarted = state => ({
  ...state,
  createLoading: true,
});

const createSuccess = (state, action) => ({
  ...state,
  comments: {
    ...state.comments,
    [action.question]: [action.payload, ...state.comments[action.question]],
  },
  createLoading: false,
});

const createFailed = state => ({
  ...state,
  createLoading: false,
  createError: true,
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.FETCH_COMMENTS_STARTED: return fetchStarted(state);
    case actions.FETCH_COMMENTS_SUCCESSFUL: return fetchSuccess(state, action);
    case actions.FETCH_COMMENTS_FAILED: return fetchFailed(state);
    case actions.CREATE_COMMENT_STARTED: return createStarted(state);
    case actions.CREATE_COMMENT_SUCCESSFUL: return createSuccess(state, action);
    case actions.CREATE_COMMENT_FAILED: return createFailed(state);
    default:
      return state;
  }
};

export default reducer;
