import request from 'superagent';
import { showNotification } from '../modules/Layout/redux/actions';

export default class BaseService {
  constructor(dispatch) {
    this.dispatch = dispatch;
  }

  setHeaders(req) {
    if (this.headers) {
      Object.keys(this.headers).forEach((key) => {
        req.set(key, this.headers[key]);
      });
    }
  }

  _checkError(err) {
    const {
      response: {
        body,
        // @TODO implmeent 401, 403 error handling. perhaps need to dispatch logout?
        status // eslint-disable-line
      }
    } = err;
    this.dispatch(showNotification('error', body.error || body.message || 'Unknown Error'));
    // @TODO show notification by dispatching notificaiton action
  }

  _call(req, actionTypes = {}, additionalParams = {}) {
    const { SUCCESS, ERROR } = actionTypes;
    return new Promise((resolve, reject) => {
      req.then((resp) => {
        if (SUCCESS) {
          this.dispatch({
            type: SUCCESS,
            payload: resp.body
          });
        }
        if (additionalParams.successMessage) {
          this.dispatch(showNotification('success', additionalParams.successMessage));
        }
        resolve(resp.body);
      }).catch((err) => {
        this._checkError(err);
        if (ERROR) {
          this.dispatch({
            type: ERROR,
            payload: err && err.body ? err.body : err
          });
        }
        reject(err && err.body ? err.body : err);
      });
    });
  }

  _get(url, actionTypes, additionalParams) {
    const req = request.get(url);
    this.setHeaders(req);
    return this._call(req, actionTypes, additionalParams);
  }

  _post(url, data, actionTypes, additionalParams) {
    const req = request.post(url);
    this.setHeaders(req);
    req.send(data);
    return this._call(req, actionTypes, additionalParams);
  }

  _put(url, data, actionTypes, additionalParams) {
    const req = request.put(url);
    this.setHeaders(req);
    req.send(data);
    return this._call(req, actionTypes, additionalParams);
  }

  _delete(url, actionTypes, additionalParams) {
    const req = request.delete(url);
    this.setHeaders(req);
    return this._call(req, actionTypes, additionalParams);
  }
}
