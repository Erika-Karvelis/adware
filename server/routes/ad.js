import AuthController from '../controllers/auth';
import AdController from '../controllers/ad';

export default function (app) {
  const auth = new AuthController();
  const ad = new AdController();
  app.route('/ads')
    .post(auth.requiresLogin, ad.create);

  app.route('/ads/list')
    .post(auth.requiresLogin, ad.list);

  app.route('/ads/analytics')
    .get(auth.requiresLogin, ad.getCounts);

  app.route('/ads/:adId')
    .get(auth.requiresLogin, ad.get)
    .put(auth.requiresLogin, ad.update);

  app.param('adId', ad.getByID);
}
