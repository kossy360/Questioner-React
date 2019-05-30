import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Authentication from './Authentication';
import Home from './Home';

const app = () => (
  <Router>
    <Switch>
      <Route path="/index" component={Authentication} />
      <Route path="/" component={Home} />
    </Switch>
  </Router>
);

export default app;
