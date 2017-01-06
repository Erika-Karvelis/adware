import { createAction } from 'redux-actions';
import UserService from '../../../services/UserService';

// get
export const USER_GET_REQUEST = 'user/get/request';
export const USER_GET_SUCCESS = 'user/get/succes';
export const USER_GET_ERROR = 'user/get/error';

export const userGetRequest = createAction(USER_GET_REQUEST, (id) => {
  return (dispatch, getState) => {
    const userService = new UserService(dispatch, getState());
    return userService.read(id, {
      SUCCESS: USER_GET_SUCCESS,
      ERROR: USER_GET_ERROR
    });
  };
});

// edit
export const USER_EDIT_REQUEST = 'user/edit/request';
export const USER_EDIT_SUCCESS = 'user/edit/succes';
export const USER_EDIT_ERROR = 'user/edit/error';

export const userEditRequest = createAction(USER_EDIT_REQUEST, (id, userData) => {
  return (dispatch, getState) => {
    const userService = new UserService(dispatch, getState());
    return userService.update(id, userData, {
      SUCCESS: USER_EDIT_SUCCESS,
      ERROR: USER_EDIT_ERROR
    });
  };
});


export default {
  userGetRequest,
  userEditRequest,
};
