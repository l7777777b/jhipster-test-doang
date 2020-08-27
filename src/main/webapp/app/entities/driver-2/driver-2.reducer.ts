import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IDriver2, defaultValue } from 'app/shared/model/driver-2.model';

export const ACTION_TYPES = {
  FETCH_DRIVER2_LIST: 'driver2/FETCH_DRIVER2_LIST',
  FETCH_DRIVER2: 'driver2/FETCH_DRIVER2',
  CREATE_DRIVER2: 'driver2/CREATE_DRIVER2',
  UPDATE_DRIVER2: 'driver2/UPDATE_DRIVER2',
  DELETE_DRIVER2: 'driver2/DELETE_DRIVER2',
  RESET: 'driver2/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IDriver2>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type Driver2State = Readonly<typeof initialState>;

// Reducer

export default (state: Driver2State = initialState, action): Driver2State => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_DRIVER2_LIST):
    case REQUEST(ACTION_TYPES.FETCH_DRIVER2):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_DRIVER2):
    case REQUEST(ACTION_TYPES.UPDATE_DRIVER2):
    case REQUEST(ACTION_TYPES.DELETE_DRIVER2):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_DRIVER2_LIST):
    case FAILURE(ACTION_TYPES.FETCH_DRIVER2):
    case FAILURE(ACTION_TYPES.CREATE_DRIVER2):
    case FAILURE(ACTION_TYPES.UPDATE_DRIVER2):
    case FAILURE(ACTION_TYPES.DELETE_DRIVER2):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_DRIVER2_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_DRIVER2):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_DRIVER2):
    case SUCCESS(ACTION_TYPES.UPDATE_DRIVER2):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_DRIVER2):
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

const apiUrl = 'api/driver-2-s';

// Actions

export const getEntities: ICrudGetAllAction<IDriver2> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_DRIVER2_LIST,
  payload: axios.get<IDriver2>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IDriver2> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_DRIVER2,
    payload: axios.get<IDriver2>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IDriver2> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_DRIVER2,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IDriver2> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_DRIVER2,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IDriver2> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_DRIVER2,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
