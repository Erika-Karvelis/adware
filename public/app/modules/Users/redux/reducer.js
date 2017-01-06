import { handleActions } from 'redux-actions';
import {
  USER_GET_REQUEST,
  USER_GET_SUCCESS,
  USER_GET_ERROR,
  USER_EDIT_REQUEST,
  USER_EDIT_SUCCESS,
  USER_EDIT_ERROR,
} from './actions';

export const initialState = {
  user: null,
  editing: false,
  loading: false
};

export default handleActions({
  [USER_GET_REQUEST]: (state) => ({
    ...state,
    user: null,
    loading: true
  }),
  [USER_GET_SUCCESS]: (state, action) => ({
    ...state,
    user: action.payload,
    loading: false
  }),
  [USER_GET_ERROR]: (state) => ({
    ...state,
    loading: false
  }),
  [USER_EDIT_REQUEST]: (state) => ({
    ...state,
    editing: true
  }),
  [USER_EDIT_SUCCESS]: (state, action) => ({
    ...state,
    user: action.payload,
    editing: false
  }),
  [USER_EDIT_ERROR]: (state) => ({
    ...state,
    editing: false
  }),
}, initialState);
