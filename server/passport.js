import passport from 'passport';
import glob from 'glob';
import path from 'path';
import chalk from 'chalk';
import db from './sequelize';

export default function () {
  // serialize sessions
  passport.serializeUser((user, done) => {
    done(null, user.accountId);
  });

  // deserialize sessions
  passport.deserializeUser((accountId, done) => {
    db.User.findOne({
      where: { accountId }
    })
    .then((user) => {
      done(null, user);
    })
    .catch((err) => {
      done(err, null);
    });
  });

  // initialize strategies
  glob('./strategies/*.js', { cwd: path.resolve('./server') }, (err, strategies) => {
    if (err) {
      console.log(chalk.red('Error occured including strategies'));
      return;
    }

    strategies.forEach((strategyPath) => {
      require(strategyPath).default(); // eslint-disable-line
    });
    console.log(chalk.green(`included ${strategies.length} strategy files`));
  });
}
