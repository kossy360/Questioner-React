import * as actions from '../actions/actionTypes';

const initialState = {
  questions: [],
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
  questions: action.payload,
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
  questions: [action.payload, ...state.questions],
  createLoading: false,
});

const createFailed = state => ({
  ...state,
  createLoading: false,
  createError: true,
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.FETCH_QUESTIONS_STARTED: return fetchStarted(state);
    case actions.FETCH_QUESTIONS_SUCCESSFUL: return fetchSuccess(state, action);
    case actions.FETCH_QUESTIONS_FAILED: return fetchFailed(state);
    case actions.CREATE_QUESTION_STARTED: return createStarted(state);
    case actions.CREATE_QUESTION_SUCCESSFUL: return createSuccess(state, action);
    case actions.CREATE_QUESTION_FAILED: return createFailed(state);
    default:
      return state;
  }
};

export default reducer;
