import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

import auth from '../modules/Auth/redux/reducer';
import layout from '../modules/Layout/redux/reducer';
import user from '../modules/Users/redux/reducer';
import ad from '../modules/Ad/redux/reducer';
import persist from './persistReducer';

const reducer = combineReducers({
  auth,
  layout,
  user,
  ad,
  form: formReducer,
  routing: routerReducer,
  persist
});

export default reducer;
