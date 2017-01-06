import BaseService from './BaseService';

export default class AuthService extends BaseService {
  signin(...args) {
    return this._post('/auth/signin', ...args);
  }

  signout(...args) {
    return this._get('/auth/signout', ...args);
  }

  signup(...args) {
    return this._post('/users', ...args);
  }
}
