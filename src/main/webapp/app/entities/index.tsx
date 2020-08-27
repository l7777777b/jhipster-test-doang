import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Driver2 from './driver-2';
import Car3 from './car-3';
import RankProperties from './rank-properties';
import User1 from './user-1';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}driver-2`} component={Driver2} />
      <ErrorBoundaryRoute path={`${match.url}car-3`} component={Car3} />
      <ErrorBoundaryRoute path={`${match.url}rank-properties`} component={RankProperties} />
      <ErrorBoundaryRoute path={`${match.url}user-1`} component={User1} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
