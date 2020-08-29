import React from 'react';
import { Switch, Route } from 'react-router-dom';

import SignUp from '../pages/SignUp';
import SignIn from '../pages/SignIn';
import Main from '../pages/Main';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/signup" exact component={SignUp} />
    <Route path="/main" exact component={Main} />
  </Switch>
);

export default Routes;
