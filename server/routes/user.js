import AuthController from '../controllers/auth';
import UserController from '../controllers/user';

export default function (app) {
  const auth = new AuthController();
  const user = new UserController();

  app.route('/users/:userId')
    .get(auth.requiresLogin, user.get)
    .put(auth.requiresLogin, user.update);

  app.param('userId', user.getByID);
}
