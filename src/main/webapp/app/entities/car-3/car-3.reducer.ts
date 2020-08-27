import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ICar3, defaultValue } from 'app/shared/model/car-3.model';

export const ACTION_TYPES = {
  FETCH_CAR3_LIST: 'car3/FETCH_CAR3_LIST',
  FETCH_CAR3: 'car3/FETCH_CAR3',
  CREATE_CAR3: 'car3/CREATE_CAR3',
  UPDATE_CAR3: 'car3/UPDATE_CAR3',
  DELETE_CAR3: 'car3/DELETE_CAR3',
  RESET: 'car3/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ICar3>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type Car3State = Readonly<typeof initialState>;

// Reducer

export default (state: Car3State = initialState, action): Car3State => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_CAR3_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CAR3):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_CAR3):
    case REQUEST(ACTION_TYPES.UPDATE_CAR3):
    case REQUEST(ACTION_TYPES.DELETE_CAR3):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_CAR3_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CAR3):
    case FAILURE(ACTION_TYPES.CREATE_CAR3):
    case FAILURE(ACTION_TYPES.UPDATE_CAR3):
    case FAILURE(ACTION_TYPES.DELETE_CAR3):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_CAR3_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_CAR3):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_CAR3):
    case SUCCESS(ACTION_TYPES.UPDATE_CAR3):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_CAR3):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/car-3-s';

// Actions

export const getEntities: ICrudGetAllAction<ICar3> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_CAR3_LIST,
  payload: axios.get<ICar3>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<ICar3> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CAR3,
    payload: axios.get<ICar3>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<ICar3> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CAR3,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ICar3> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CAR3,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ICar3> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CAR3,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
