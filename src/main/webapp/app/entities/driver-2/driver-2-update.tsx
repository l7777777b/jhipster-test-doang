import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ICar3 } from 'app/shared/model/car-3.model';
import { getEntities as getCar3S } from 'app/entities/car-3/car-3.reducer';
import { getEntity, updateEntity, createEntity, reset } from './driver-2.reducer';
import { IDriver2 } from 'app/shared/model/driver-2.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IDriver2UpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const Driver2Update = (props: IDriver2UpdateProps) => {
  const [carId, setCarId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { driver2Entity, car3s, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/driver-2');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getCar3S();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...driver2Entity,
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
          <h2 id="jhipsterTestDoangApp.driver2.home.createOrEditLabel">
            <Translate contentKey="jhipsterTestDoangApp.driver2.home.createOrEditLabel">Create or edit a Driver2</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : driver2Entity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="driver-2-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="driver-2-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <Button tag={Link} id="cancel-save" to="/driver-2" replace color="info">
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
  car3s: storeState.car3.entities,
  driver2Entity: storeState.driver2.entity,
  loading: storeState.driver2.loading,
  updating: storeState.driver2.updating,
  updateSuccess: storeState.driver2.updateSuccess,
});

const mapDispatchToProps = {
  getCar3S,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Driver2Update);
