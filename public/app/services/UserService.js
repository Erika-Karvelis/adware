import ResourceService from './ResourceService';

export default class UserService extends ResourceService {
  constructor(...args) {
    super(...args, 'users');
  }
}
