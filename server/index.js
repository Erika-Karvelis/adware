import app from './express'; // eslint-disable-line
import db from './sequelize'; // eslint-disable-line
import initPassport from './passport';

process.env.NODE_ENV = process.env.NODE_ENV || 'local';

initPassport();
