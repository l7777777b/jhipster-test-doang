import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntities as getUser1S } from 'app/entities/user-1/user-1.reducer';
import { getEntity, updateEntity, createEntity, reset } from './user-1.reducer';
import { IUser1 } from 'app/shared/model/user-1.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IUser1UpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const User1Update = (props: IUser1UpdateProps) => {
  const [referralId, setReferralId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { user1Entity, user1s, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/user-1');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getUser1S();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...user1Entity,
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
          <h2 id="jhipsterTestDoangApp.user1.home.createOrEditLabel">
            <Translate contentKey="jhipsterTestDoangApp.user1.home.createOrEditLabel">Create or edit a User1</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : user1Entity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="user-1-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="user-1-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="taskModeLabel" for="user-1-taskMode">
                  <Translate contentKey="jhipsterTestDoangApp.user1.taskMode">Task Mode</Translate>
                </Label>
                <AvInput
                  id="user-1-taskMode"
                  type="select"
                  className="form-control"
                  name="taskMode"
                  value={(!isNew && user1Entity.taskMode) || 'NO_CONTINUE_STAGE_COUNT'}
                >
                  <option value="NO_CONTINUE_STAGE_COUNT">{translate('jhipsterTestDoangApp.TaskMode.NO_CONTINUE_STAGE_COUNT')}</option>
                  <option value="STAGE_COUNT">{translate('jhipsterTestDoangApp.TaskMode.STAGE_COUNT')}</option>
                  <option value="STAGE_ID">{translate('jhipsterTestDoangApp.TaskMode.STAGE_ID')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="valueLabel" for="user-1-value">
                  <Translate contentKey="jhipsterTestDoangApp.user1.value">Value</Translate>
                </Label>
                <AvField
                  id="user-1-value"
                  type="string"
                  className="form-control"
                  name="value"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    number: { value: true, errorMessage: translate('entity.validation.number') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label for="user-1-referral">
                  <Translate contentKey="jhipsterTestDoangApp.user1.referral">Referral</Translate>
                </Label>
                <AvInput id="user-1-referral" type="select" className="form-control" name="referralId">
                  <option value="" key="0" />
                  {user1s
                    ? user1s.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/user-1" replace color="info">
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
  user1s: storeState.user1.entities,
  user1Entity: storeState.user1.entity,
  loading: storeState.user1.loading,
  updating: storeState.user1.updating,
  updateSuccess: storeState.user1.updateSuccess,
});

const mapDispatchToProps = {
  getUser1S,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(User1Update);
