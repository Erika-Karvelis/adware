import passport from 'passport';
import PassportLocal from 'passport-local';
import db from '../sequelize';

const LocalStrategy = PassportLocal.Strategy;

export default function () {
  passport.use(new LocalStrategy({
    usernameField: 'emailAddress',
    passwordField: 'password'
  }, (emailAddress, password, done) => {
    db.User.findOne({
      where: {
        emailAddress
      }
    }).then((user) => {
      if (!user) {
        return done(null, false, {
          message: 'Unknown user'
        });
      }
      if (!user.authenticate(password)) {
        return done(null, false, {
          message: 'Invalid password'
        });
      }

      console.log(user.toJSON());

      return done(null, user.toJSON());
    })
    .catch((err) => {
      done(err);
    });
  }));
}
