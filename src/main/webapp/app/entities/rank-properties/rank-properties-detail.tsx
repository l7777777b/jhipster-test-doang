import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './rank-properties.reducer';
import { IRankProperties } from 'app/shared/model/rank-properties.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IRankPropertiesDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const RankPropertiesDetail = (props: IRankPropertiesDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { rankPropertiesEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="jhipsterTestDoangApp.rankProperties.detail.title">RankProperties</Translate> [
          <b>{rankPropertiesEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="rank">
              <Translate contentKey="jhipsterTestDoangApp.rankProperties.rank">Rank</Translate>
            </span>
          </dt>
          <dd>{rankPropertiesEntity.rank}</dd>
          <dt>
            <span id="minExp">
              <Translate contentKey="jhipsterTestDoangApp.rankProperties.minExp">Min Exp</Translate>
            </span>
          </dt>
          <dd>{rankPropertiesEntity.minExp}</dd>
          <dt>
            <span id="maxExp">
              <Translate contentKey="jhipsterTestDoangApp.rankProperties.maxExp">Max Exp</Translate>
            </span>
          </dt>
          <dd>{rankPropertiesEntity.maxExp}</dd>
          <dt>
            <span id="maxStamina">
              <Translate contentKey="jhipsterTestDoangApp.rankProperties.maxStamina">Max Stamina</Translate>
            </span>
          </dt>
          <dd>{rankPropertiesEntity.maxStamina}</dd>
          <dt>
            <span id="maxAlly">
              <Translate contentKey="jhipsterTestDoangApp.rankProperties.maxAlly">Max Ally</Translate>
            </span>
          </dt>
          <dd>{rankPropertiesEntity.maxAlly}</dd>
          <dt>
            <span id="maxTeam">
              <Translate contentKey="jhipsterTestDoangApp.rankProperties.maxTeam">Max Team</Translate>
            </span>
          </dt>
          <dd>{rankPropertiesEntity.maxTeam}</dd>
        </dl>
        <Button tag={Link} to="/rank-properties" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/rank-properties/${rankPropertiesEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ rankProperties }: IRootState) => ({
  rankPropertiesEntity: rankProperties.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(RankPropertiesDetail);
