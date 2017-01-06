import authActions from '../modules/Auth/redux/actions';
import layoutActions from '../modules/Layout/redux/actions';
import userActions from '../modules/Users/redux/actions';

export default {
  ...authActions,
  ...layoutActions,
  ...userActions,
};
