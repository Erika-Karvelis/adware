import errorHandler from '../util/errorHandler';
import BaseAPIController from './BaseAPIController';

export default class UserController extends BaseAPIController {
  /**
   * @method get
   * @param {Request} req
   * @param {Response} res
   */
  get = (req, res) => {
    res.json(req.profile);
  }

  /**
   * @method update
   * @param {Request} req
   * @param {Response} res
   */
  update = (req, res) => {
    const user = req.profile;
    let password = user.password;
    if (req.body.password && req.body.password !== '') {
      password = this._db.User.encryptPassword(req.body.password);
    }

    Object.assign(user, req.body, { password });

    user.save().then(() => {
      res.json(user);
    }).catch(err => res.status(400).send(errorHandler(err)));
  }

  /**
   * Middleware to get user instance by id
   * @method getByID
   * @param {Request} req
   * @param {Response} res
   * @param {Function} next
   * @param {number} id
   */
  getByID = (req, res, next, id) => {
    return this._db.User.findById(id).then((user) => {
      if (!user) {
        return next(new Error(`Failed to load user ${id}`));
      }

      if (req.user.accountId !== user.accountId) {
        return res.status(403).send({
          message: 'You are not authorized'
        });
      }

      req.profile = user; // eslint-disable-line
      return next();
    }).catch(err => res.status(400).send(errorHandler(err)));
  }
}
