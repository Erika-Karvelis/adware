import ResourceService from './ResourceService';

export default class AdService extends ResourceService {
  constructor(...args) {
    super(...args, 'ads');
  }

  list(...args) {
    return this._post('/ads/list', ...args);
  }

  analytics(...args) {
    return this._get('/ads/analytics', ...args);
  }
}
