import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Car3 from './car-3';
import Car3Detail from './car-3-detail';
import Car3Update from './car-3-update';
import Car3DeleteDialog from './car-3-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={Car3Update} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={Car3Update} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={Car3Detail} />
      <ErrorBoundaryRoute path={match.url} component={Car3} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={Car3DeleteDialog} />
  </>
);

export default Routes;
