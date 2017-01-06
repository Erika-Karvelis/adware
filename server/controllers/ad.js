import errorHandler from '../util/errorHandler';
import BaseAPIController from './BaseAPIController';

export default class AdController extends BaseAPIController {
  /**
   * @method get
   * @param {Request} req
   * @param {Response} res
   */
  get = (req, res) => {
    res.json(req.ad);
  }

  /**
   * @method list
   * @param {Request} req
   * @param {Response} res
   */
  list = (req, res) => {
    const order = req.body.sorts || [];
    const offset = req.body.offset || 0;
    const limit = req.body.pageLimit || 10;
    this._db.Ad.findAndCountAll({
      order,
      offset,
      limit,
      where: {
        accountId: req.user.accountId
      }
    }).then((result) => {
      res.send(result);
    }).catch(err => res.status(400).send(errorHandler(err)));
  }

  getCounts = (req, res) => {
    const sequelize = this._db.sequelize;
    this._db.Ad.findAll({
      attributes: [
        'adId',
        'Name',
        [sequelize.fn('count', sequelize.col('Clicks.clickId')), 'clickCount'],
      ],
      include: [this._db.Click],
      group: [sequelize.col('Ad.adId')],
      where: {
        accountId: req.user.accountId
      }
    }).then((result) => {
      res.send(result.map((r) => {
        const { Clicks, ...values } = r.dataValues; // eslint-disable-line
        return { ...values };
      }));
    }).catch(err => res.status(400).send(errorHandler(err)));
  }

  /**
   * @method create
   * @param {Request} req
   * @param {Response} res
   */
  create = (req, res) => {
    const ad = this._db.Ad.build(Object.assign({ accountId: req.user.accountId }, req.body));

    ad.save()
    .then(() => {
      res.json(ad);
    })
    .catch(err => res.status(400).send(errorHandler(err)));
  }

  /**
   * @method update
   * @param {Request} req
   * @param {Response} res
   */
  update = (req, res) => {
    const user = req.ad;
    Object.assign(user, req.body);

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
    return this._db.Ad.findById(id).then((ad) => {
      if (!ad) {
        return next(new Error(`Failed to load ad ${id}`));
      }

      if (req.ad.accountId !== req.user.accountId) {
        return res.status(403).send({
          message: 'You are not authorized'
        });
      }

      req.ad = ad; // eslint-disable-line
      return next();
    }).catch(err => res.status(400).send(errorHandler(err)));
  }
}
