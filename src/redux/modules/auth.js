const REGISTER_REQUEST = 'auth/REGISTER_REQUEST';
const REGISTER_SUCCESS = 'auth/REGISTER_SUCCESS';
const REGISTER_FAILURE = 'auth/REGISTER_FAILURE';

const LOGIN_REQUEST = 'auth/LOGIN_REQUEST';
const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
const LOGIN_FAILURE = 'auth/LOGIN_FAILURE';

const initialState = {};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        user: action.result,
      };
    case REGISTER_FAILURE:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error,
      };
    case LOGIN_REQUEST:
      return {
        ...state,
        loggingIn: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggingIn: false,
        user: action.result,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loggingIn: false,
        loginError: action.error,
      };
    default:
      return state;
  }
}

export function register({ email, password, confirm }) {
  return {
    types: [REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE],
    promise: api => api.post('/users', {
      params: { email, password, confirm },
    }),
  };
}

export function login({ email, password }) {
  return {
    types: [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE],
    promise: api => api.post('/sessions', {
      params: { email, password },
    }),
  };
}
