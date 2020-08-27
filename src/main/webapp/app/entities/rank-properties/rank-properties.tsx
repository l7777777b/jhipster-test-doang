import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './rank-properties.reducer';
import { IRankProperties } from 'app/shared/model/rank-properties.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IRankPropertiesProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const RankProperties = (props: IRankPropertiesProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { rankPropertiesList, match, loading } = props;
  return (
    <div>
      <h2 id="rank-properties-heading">
        <Translate contentKey="jhipsterTestDoangApp.rankProperties.home.title">Rank Properties</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="jhipsterTestDoangApp.rankProperties.home.createLabel">Create new Rank Properties</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {rankPropertiesList && rankPropertiesList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="jhipsterTestDoangApp.rankProperties.rank">Rank</Translate>
                </th>
                <th>
                  <Translate contentKey="jhipsterTestDoangApp.rankProperties.minExp">Min Exp</Translate>
                </th>
                <th>
                  <Translate contentKey="jhipsterTestDoangApp.rankProperties.maxExp">Max Exp</Translate>
                </th>
                <th>
                  <Translate contentKey="jhipsterTestDoangApp.rankProperties.maxStamina">Max Stamina</Translate>
                </th>
                <th>
                  <Translate contentKey="jhipsterTestDoangApp.rankProperties.maxAlly">Max Ally</Translate>
                </th>
                <th>
                  <Translate contentKey="jhipsterTestDoangApp.rankProperties.maxTeam">Max Team</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {rankPropertiesList.map((rankProperties, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${rankProperties.id}`} color="link" size="sm">
                      {rankProperties.id}
                    </Button>
                  </td>
                  <td>{rankProperties.rank}</td>
                  <td>{rankProperties.minExp}</td>
                  <td>{rankProperties.maxExp}</td>
                  <td>{rankProperties.maxStamina}</td>
                  <td>{rankProperties.maxAlly}</td>
                  <td>{rankProperties.maxTeam}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${rankProperties.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${rankProperties.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${rankProperties.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="jhipsterTestDoangApp.rankProperties.home.notFound">No Rank Properties found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ rankProperties }: IRootState) => ({
  rankPropertiesList: rankProperties.entities,
  loading: rankProperties.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(RankProperties);
