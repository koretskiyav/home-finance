import { CURRENCY_ARRAY, CURRENCY } from 'redux/schemas';

const LOAD_REQUEST = 'currencies/LOAD_REQUEST';
const LOAD_SUCCESS = 'currencies/LOAD_SUCCESS';
const LOAD_FAILURE = 'currencies/LOAD_FAILURE';

const ADD_REQUEST = 'currencies/ADD_REQUEST';
const ADD_SUCCESS = 'currencies/ADD_SUCCESS';
const ADD_FAILURE = 'currencies/ADD_FAILURE';

const UPDATE_REQUEST = 'currencies/UPDATE_REQUEST';
const UPDATE_SUCCESS = 'currencies/UPDATE_SUCCESS';
const UPDATE_FAILURE = 'currencies/UPDATE_FAILURE';

const REMOVE_REQUEST = 'currencies/REMOVE_REQUEST';
const REMOVE_SUCCESS = 'currencies/REMOVE_SUCCESS';
const REMOVE_FAILURE = 'currencies/REMOVE_FAILURE';

const START_EDIT = 'currencies/START_EDIT';
const CHANGE = 'currencies/CHANGE';

const initialState = {
  id: [],
  data: {},
  edited: {},
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_REQUEST:
    case ADD_REQUEST:
    case UPDATE_REQUEST:
    case REMOVE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_SUCCESS:
      return {
        ...state,
        loading: false,
        id: [...state.id, action.result],
        data: { ...state.data, ...action.entities.currencies },
      };
    case UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        edited: initialState.edited,
        data: { ...state.data, ...action.entities.currencies },
      };

    case REMOVE_SUCCESS:
      return {
        ...state,
        loading: false,
        id: state.id.filter(id => id !== action.result),
      };

    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.entities.currencies,
        id: action.result,
      };

    case LOAD_FAILURE:
    case ADD_FAILURE:
    case UPDATE_FAILURE:
    case REMOVE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case START_EDIT: {
      const { id, code } = action;
      return {
        ...state,
        edited: {
          id,
          code,
        },
      };
    }

    case CHANGE:
      return {
        ...state,
        edited: {
          ...state.edited,
          code: action.code,
        },
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

export function add(code, prymary = false) {
  return {
    types: [ADD_REQUEST, ADD_SUCCESS, ADD_FAILURE],
    schema: CURRENCY,
    promise: api => api.post('/currencies', {
      data: { code, prymary },
    }),
  };
}

export function update(id, code) {
  return {
    types: [UPDATE_REQUEST, UPDATE_SUCCESS, UPDATE_FAILURE],
    schema: CURRENCY,
    promise: api => api.put(`/currencies/${id}`, {
      data: { code },
    }),
  };
}

export function remove(id) {
  return {
    types: [REMOVE_REQUEST, REMOVE_SUCCESS, REMOVE_FAILURE],
    promise: api => api.del(`/currencies/${id}`),
  };
}

export function startEdit(id, code) {
  return {
    type: START_EDIT,
    id,
    code,
  };
}

export function change(code) {
  return {
    type: CHANGE,
    code,
  };
}
