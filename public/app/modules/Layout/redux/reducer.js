import { handleActions } from 'redux-actions';
import {
  NOTIFICATION_SHOW,
  NOTIFICATION_HIDE,
} from './actions';

export const initialState = {
  notification: {},
};

export default handleActions({
  [NOTIFICATION_SHOW]: (state, action) => ({
    ...state,
    notification: Object.assign({}, action.payload)
  }),
  [NOTIFICATION_HIDE]: (state) => ({
    ...state,
    notification: {}
  }),
}, initialState);
