import React from 'react';
import { IndexRoute, Route } from 'react-router';

import { AppLayout } from './modules/Layout';
import Home from './modules/Home';
import { Login } from './modules/Auth';
import { UserEdit } from './modules/Users';

const configureRoute = () => (
  <Route path="/" component={ AppLayout }>
    <IndexRoute component={ Home } />
    <Route path="login" component={ Login } />
    <Route path="users/edit/:userId" component={ UserEdit } />
  </Route>
);

export default configureRoute;
