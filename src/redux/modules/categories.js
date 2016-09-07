import { CATEGORY_ARRAY, CATEGORY } from 'redux/schemas';

const LOAD_REQUEST = 'categories/LOAD_REQUEST';
const LOAD_SUCCESS = 'categories/LOAD_SUCCESS';
const LOAD_FAILURE = 'categories/LOAD_FAILURE';

const ADD_REQUEST = 'categories/ADD_REQUEST';
const ADD_SUCCESS = 'categories/ADD_SUCCESS';
const ADD_FAILURE = 'categories/ADD_FAILURE';

const initialState = {
  id: [],
  data: {},
  edited: {},
};

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
        id: [...state.id, action.result],
        data: { ...state.data, ...action.entities.categories },
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.entities.categories,
        id: action.result,
      };

    case LOAD_FAILURE:
    case ADD_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
}

export function load() {
  return {
    types: [LOAD_REQUEST, LOAD_SUCCESS, LOAD_FAILURE],
    schema: CATEGORY_ARRAY,
    promise: api => api.get('/categories'),
  };
}

export function add(code, prymary = false) {
  return {
    types: [ADD_REQUEST, ADD_SUCCESS, ADD_FAILURE],
    schema: CATEGORY,
    promise: api => api.post('/categories', {
      data: { code, prymary },
    }),
  };
}
