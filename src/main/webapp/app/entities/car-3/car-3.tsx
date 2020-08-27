import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './car-3.reducer';
import { ICar3 } from 'app/shared/model/car-3.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICar3Props extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Car3 = (props: ICar3Props) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { car3List, match, loading } = props;
  return (
    <div>
      <h2 id="car-3-heading">
        <Translate contentKey="jhipsterTestDoangApp.car3.home.title">Car 3 S</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="jhipsterTestDoangApp.car3.home.createLabel">Create new Car 3</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {car3List && car3List.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="jhipsterTestDoangApp.car3.driver">Driver</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {car3List.map((car3, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${car3.id}`} color="link" size="sm">
                      {car3.id}
                    </Button>
                  </td>
                  <td>
                    {car3.drivers
                      ? car3.drivers.map((val, j) => (
                          <span key={j}>
                            <Link to={`driver-2/${val.id}`}>{val.id}</Link>
                            {j === car3.drivers.length - 1 ? '' : ', '}
                          </span>
                        ))
                      : null}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${car3.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${car3.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${car3.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="jhipsterTestDoangApp.car3.home.notFound">No Car 3 S found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ car3 }: IRootState) => ({
  car3List: car3.entities,
  loading: car3.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Car3);
