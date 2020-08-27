import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './rank-properties.reducer';
import { IRankProperties } from 'app/shared/model/rank-properties.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IRankPropertiesUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const RankPropertiesUpdate = (props: IRankPropertiesUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { rankPropertiesEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/rank-properties');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...rankPropertiesEntity,
        ...values,
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="jhipsterTestDoangApp.rankProperties.home.createOrEditLabel">
            <Translate contentKey="jhipsterTestDoangApp.rankProperties.home.createOrEditLabel">Create or edit a RankProperties</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : rankPropertiesEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="rank-properties-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="rank-properties-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="rankLabel" for="rank-properties-rank">
                  <Translate contentKey="jhipsterTestDoangApp.rankProperties.rank">Rank</Translate>
                </Label>
                <AvField
                  id="rank-properties-rank"
                  type="string"
                  className="form-control"
                  name="rank"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    number: { value: true, errorMessage: translate('entity.validation.number') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="minExpLabel" for="rank-properties-minExp">
                  <Translate contentKey="jhipsterTestDoangApp.rankProperties.minExp">Min Exp</Translate>
                </Label>
                <AvField
                  id="rank-properties-minExp"
                  type="string"
                  className="form-control"
                  name="minExp"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    number: { value: true, errorMessage: translate('entity.validation.number') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="maxExpLabel" for="rank-properties-maxExp">
                  <Translate contentKey="jhipsterTestDoangApp.rankProperties.maxExp">Max Exp</Translate>
                </Label>
                <AvField
                  id="rank-properties-maxExp"
                  type="string"
                  className="form-control"
                  name="maxExp"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    number: { value: true, errorMessage: translate('entity.validation.number') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="maxStaminaLabel" for="rank-properties-maxStamina">
                  <Translate contentKey="jhipsterTestDoangApp.rankProperties.maxStamina">Max Stamina</Translate>
                </Label>
                <AvField
                  id="rank-properties-maxStamina"
                  type="string"
                  className="form-control"
                  name="maxStamina"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    number: { value: true, errorMessage: translate('entity.validation.number') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="maxAllyLabel" for="rank-properties-maxAlly">
                  <Translate contentKey="jhipsterTestDoangApp.rankProperties.maxAlly">Max Ally</Translate>
                </Label>
                <AvField
                  id="rank-properties-maxAlly"
                  type="string"
                  className="form-control"
                  name="maxAlly"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    number: { value: true, errorMessage: translate('entity.validation.number') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="maxTeamLabel" for="rank-properties-maxTeam">
                  <Translate contentKey="jhipsterTestDoangApp.rankProperties.maxTeam">Max Team</Translate>
                </Label>
                <AvField
                  id="rank-properties-maxTeam"
                  type="string"
                  className="form-control"
                  name="maxTeam"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    number: { value: true, errorMessage: translate('entity.validation.number') },
                  }}
                />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/rank-properties" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  rankPropertiesEntity: storeState.rankProperties.entity,
  loading: storeState.rankProperties.loading,
  updating: storeState.rankProperties.updating,
  updateSuccess: storeState.rankProperties.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(RankPropertiesUpdate);
