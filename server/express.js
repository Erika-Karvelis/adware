import http from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import glob from 'glob';
import chalk from 'chalk';
import consolidate from 'consolidate';
import passport from 'passport';
import jwt from 'express-jwt';
import morgan from 'morgan';

import config from './config';

const initRoutes = (app) => {
  // including all routes
  glob('./routes/*.js', { cwd: path.resolve('./server') }, (err, routes) => {
    if (err) {
      console.log(chalk.red('Error occured including routes'));
      return;
    }
    routes.forEach((routePath) => {
      require(routePath).default(app); // eslint-disable-line
    });
    console.log(chalk.green(`included ${routes.length} route files`));
  });
};

const initMiddlewares = (app) => {
  // 3rd party middleware
  app.use(cors({
    exposedHeaders: ['Link']
  }));
  app.use(bodyParser.json({
    limit: '100kb'
  }));
};

const initTemplateEngine = (app) => {
  app.engine('html', consolidate.swig);
  app.set('views', path.resolve('./server/views'));
  app.set('view engine', 'html');
};

const initPassport = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());
};

const app = express();
const port = process.env.PORT || config.port;

app.server = http.createServer(app);

// add logging with morgan
app.use(morgan('combined'));

initMiddlewares(app);
initTemplateEngine(app);
initRoutes(app);

app.use(jwt({
  secret: config.jwt.secret,
  credentialsRequired: false,
  getToken: (req) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      return req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.token) {
      return req.query.token;
    }
    return null;
  }
}));

initPassport(app);

// start listening
app.server.listen(port);
console.log(chalk.green(`Express started on port ${app.server.address().port}`));

// public
app.use('/public', express.static(`${__dirname}/public`));

export default app;
