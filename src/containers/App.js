import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Authentication from './Authentication';
import Home from './Home';
import NotFound from '../components/NotFound';

const app = () => (
  <Router>
    <Switch>
      <Route path="/index" component={Authentication} />
      <Route path="/" exact component={Home} />
      <Route path="/:page" exact component={Home} />
      <Route path="/meetups/:meetupId" exact component={Home} />
      <Route component={NotFound} />
    </Switch>
  </Router>
);

export default app;
