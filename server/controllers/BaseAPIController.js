import db from '../sequelize';

export default class BaseAPIController {
  constructor() {
    this._db = db;
  }
}
