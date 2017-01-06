import { handleActions } from 'redux-actions';
import { REHYDRATE } from 'redux-persist/constants';

/**
 * This reducer is used to determine when to draw the app.
 * App should be rendered after loading all info from localforage.
 */
export default handleActions({
  [REHYDRATE]: (state) => ({
    ...state,
    loaded: true
  }),
}, { loaded: false });
