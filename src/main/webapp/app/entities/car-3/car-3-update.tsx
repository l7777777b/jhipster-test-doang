import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IDriver2 } from 'app/shared/model/driver-2.model';
import { getEntities as getDriver2S } from 'app/entities/driver-2/driver-2.reducer';
import { getEntity, updateEntity, createEntity, reset } from './car-3.reducer';
import { ICar3 } from 'app/shared/model/car-3.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICar3UpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const Car3Update = (props: ICar3UpdateProps) => {
  const [idsdriver, setIdsdriver] = useState([]);
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { car3Entity, driver2s, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/car-3');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getDriver2S();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...car3Entity,
        ...values,
        drivers: mapIdList(values.drivers),
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
          <h2 id="jhipsterTestDoangApp.car3.home.createOrEditLabel">
            <Translate contentKey="jhipsterTestDoangApp.car3.home.createOrEditLabel">Create or edit a Car3</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : car3Entity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="car-3-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="car-3-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label for="car-3-driver">
                  <Translate contentKey="jhipsterTestDoangApp.car3.driver">Driver</Translate>
                </Label>
                <AvInput
                  id="car-3-driver"
                  type="select"
                  multiple
                  className="form-control"
                  name="drivers"
                  value={car3Entity.drivers && car3Entity.drivers.map(e => e.id)}
                >
                  <option value="" key="0" />
                  {driver2s
                    ? driver2s.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/car-3" replace color="info">
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
  driver2s: storeState.driver2.entities,
  car3Entity: storeState.car3.entity,
  loading: storeState.car3.loading,
  updating: storeState.car3.updating,
  updateSuccess: storeState.car3.updateSuccess,
});

const mapDispatchToProps = {
  getDriver2S,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Car3Update);
