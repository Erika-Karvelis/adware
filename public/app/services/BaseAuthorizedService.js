import BaseService from './BaseService';

export default class BaseAuthorizedService extends BaseService {
  constructor(dispatch, state) {
    super(dispatch, state);

    if (state && state.auth && state.auth.user && state.auth.user.token) {
      this.headers = Object.assign({}, this.headers, {
        Authorization: `Bearer ${state.auth.user.token}`
      });
    }
  }
}
