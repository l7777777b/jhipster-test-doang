import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IRankProperties, defaultValue } from 'app/shared/model/rank-properties.model';

export const ACTION_TYPES = {
  FETCH_RANKPROPERTIES_LIST: 'rankProperties/FETCH_RANKPROPERTIES_LIST',
  FETCH_RANKPROPERTIES: 'rankProperties/FETCH_RANKPROPERTIES',
  CREATE_RANKPROPERTIES: 'rankProperties/CREATE_RANKPROPERTIES',
  UPDATE_RANKPROPERTIES: 'rankProperties/UPDATE_RANKPROPERTIES',
  DELETE_RANKPROPERTIES: 'rankProperties/DELETE_RANKPROPERTIES',
  RESET: 'rankProperties/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IRankProperties>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type RankPropertiesState = Readonly<typeof initialState>;

// Reducer

export default (state: RankPropertiesState = initialState, action): RankPropertiesState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_RANKPROPERTIES_LIST):
    case REQUEST(ACTION_TYPES.FETCH_RANKPROPERTIES):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_RANKPROPERTIES):
    case REQUEST(ACTION_TYPES.UPDATE_RANKPROPERTIES):
    case REQUEST(ACTION_TYPES.DELETE_RANKPROPERTIES):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_RANKPROPERTIES_LIST):
    case FAILURE(ACTION_TYPES.FETCH_RANKPROPERTIES):
    case FAILURE(ACTION_TYPES.CREATE_RANKPROPERTIES):
    case FAILURE(ACTION_TYPES.UPDATE_RANKPROPERTIES):
    case FAILURE(ACTION_TYPES.DELETE_RANKPROPERTIES):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_RANKPROPERTIES_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_RANKPROPERTIES):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_RANKPROPERTIES):
    case SUCCESS(ACTION_TYPES.UPDATE_RANKPROPERTIES):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_RANKPROPERTIES):
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

const apiUrl = 'api/rank-properties';

// Actions

export const getEntities: ICrudGetAllAction<IRankProperties> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_RANKPROPERTIES_LIST,
  payload: axios.get<IRankProperties>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IRankProperties> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_RANKPROPERTIES,
    payload: axios.get<IRankProperties>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IRankProperties> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_RANKPROPERTIES,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IRankProperties> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_RANKPROPERTIES,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IRankProperties> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_RANKPROPERTIES,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
