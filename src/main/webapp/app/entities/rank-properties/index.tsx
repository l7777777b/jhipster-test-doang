import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import RankProperties from './rank-properties';
import RankPropertiesDetail from './rank-properties-detail';
import RankPropertiesUpdate from './rank-properties-update';
import RankPropertiesDeleteDialog from './rank-properties-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={RankPropertiesUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={RankPropertiesUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={RankPropertiesDetail} />
      <ErrorBoundaryRoute path={match.url} component={RankProperties} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={RankPropertiesDeleteDialog} />
  </>
);

export default Routes;
