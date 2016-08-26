import { Schemas } from 'redux/middleware/clientMiddleware';

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

const EDIT_VALUE   = 'currencies/EDIT_VALUE';
const CHANGE_VALUE = 'currencies/CHANGE_VALUE';

const { CURRENCY_ARRAY, CURRENCY } = Schemas;
const initialState = {
  currentEditableId: '',
  currentEditableValue: '',
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
    case UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: { ...state.data, ...action.result.currencies },
      };
    case REMOVE_SUCCESS: {
      const cloneDate = { ...state.data };
      delete cloneDate[action.result];

      return {
        ...state,
        loading: false,
        loaded: true,
        data: cloneDate,
      };
    }
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result.currencies,
      };
    case LOAD_FAILURE:
    case ADD_FAILURE:
    case UPDATE_FAILURE:
    case REMOVE_FAILURE:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error,
      };
    case EDIT_VALUE:
      return {
        ...state,
        currentEditableId: action.currentEditableId,
        currentEditableValue: action.currentEditableValue
      }
    case CHANGE_VALUE:
      return {
        ...state,
        currentEditableValue: action.currentEditableValue
      }
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

export function update({ currencyId, code }) {
  return {
    types: [UPDATE_REQUEST, UPDATE_SUCCESS, UPDATE_FAILURE],
    schema: CURRENCY,
    promise: api => api.put(`/currencies/${currencyId}`, {
      data: { code },
    }),
  };
}

export function remove({ currencyId }) {
  return {
    types: [REMOVE_REQUEST, REMOVE_SUCCESS, REMOVE_FAILURE],
    promise: api => api.del(`/currencies/${currencyId}`),
  };
}

export function edit({ currencyId, code }) {
  return {
    type: EDIT_VALUE,
    currentEditableId: currencyId,
    currentEditableValue: code,
  };
}

export function change({ code }) {
  return {
    type: CHANGE_VALUE,
    currentEditableValue: code,
  };
}
