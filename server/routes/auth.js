import AuthController from '../controllers/auth';

export default function (app) {
  const auth = new AuthController();
  app.route('/auth/signin').post(auth.signin);
  app.route('/auth/signout').get(auth.signout);
}
