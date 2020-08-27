import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Driver2 from './driver-2';
import Driver2Detail from './driver-2-detail';
import Driver2Update from './driver-2-update';
import Driver2DeleteDialog from './driver-2-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={Driver2Update} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={Driver2Update} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={Driver2Detail} />
      <ErrorBoundaryRoute path={match.url} component={Driver2} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={Driver2DeleteDialog} />
  </>
);

export default Routes;
