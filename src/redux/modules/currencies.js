import { Schemas } from 'redux/middleware/clientMiddleware';

const LOAD_REQUEST = 'currencies/LOAD_REQUEST';
const LOAD_SUCCESS = 'currencies/LOAD_SUCCESS';
const LOAD_FAILURE = 'currencies/LOAD_FAILURE';

const ADD_REQUEST = 'currencies/ADD_REQUEST';
const ADD_SUCCESS = 'currencies/ADD_SUCCESS';
const ADD_FAILURE = 'currencies/ADD_FAILURE';

const { CURRENCY_ARRAY, CURRENCY } = Schemas;
const initialState = {};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_REQUEST:
    case ADD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: { ...state.data, ...action.result.currencies },
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result.currencies,
      };
    case LOAD_FAILURE:
    case ADD_FAILURE:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error,
      };
    default:
      return state;
  }
}

export function load() {
  return {
    types: [LOAD_REQUEST, LOAD_SUCCESS, LOAD_FAILURE],
    schema: CURRENCY_ARRAY,
    promise: api => api.get('/currencies'),
  };
}

export function add({ code, prymary }) {
  return {
    types: [ADD_REQUEST, ADD_SUCCESS, ADD_FAILURE],
    schema: CURRENCY,
    promise: api => api.post('/currencies', {
      data: { code, prymary },
    }),
  };
}
