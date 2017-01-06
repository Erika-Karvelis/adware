import CoreController from '../controllers/core';

const core = new CoreController();

export default (app) => {
  app.route('/').get(core.index);
};
