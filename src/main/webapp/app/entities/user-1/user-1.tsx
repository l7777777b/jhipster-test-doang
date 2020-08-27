import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './user-1.reducer';
import { IUser1 } from 'app/shared/model/user-1.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IUser1Props extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const User1 = (props: IUser1Props) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { user1List, match, loading } = props;
  return (
    <div>
      <h2 id="user-1-heading">
        <Translate contentKey="jhipsterTestDoangApp.user1.home.title">User 1 S</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="jhipsterTestDoangApp.user1.home.createLabel">Create new User 1</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {user1List && user1List.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="jhipsterTestDoangApp.user1.taskMode">Task Mode</Translate>
                </th>
                <th>
                  <Translate contentKey="jhipsterTestDoangApp.user1.value">Value</Translate>
                </th>
                <th>
                  <Translate contentKey="jhipsterTestDoangApp.user1.referral">Referral</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {user1List.map((user1, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${user1.id}`} color="link" size="sm">
                      {user1.id}
                    </Button>
                  </td>
                  <td>
                    <Translate contentKey={`jhipsterTestDoangApp.TaskMode.${user1.taskMode}`} />
                  </td>
                  <td>{user1.value}</td>
                  <td>{user1.referralId ? <Link to={`user-1/${user1.referralId}`}>{user1.referralId}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${user1.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${user1.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${user1.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="jhipsterTestDoangApp.user1.home.notFound">No User 1 S found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ user1 }: IRootState) => ({
  user1List: user1.entities,
  loading: user1.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(User1);
