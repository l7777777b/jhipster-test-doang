import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './car-3.reducer';
import { ICar3 } from 'app/shared/model/car-3.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICar3DetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const Car3Detail = (props: ICar3DetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { car3Entity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="jhipsterTestDoangApp.car3.detail.title">Car3</Translate> [<b>{car3Entity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <Translate contentKey="jhipsterTestDoangApp.car3.driver">Driver</Translate>
          </dt>
          <dd>
            {car3Entity.drivers
              ? car3Entity.drivers.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.id}</a>
                    {car3Entity.drivers && i === car3Entity.drivers.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/car-3" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/car-3/${car3Entity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ car3 }: IRootState) => ({
  car3Entity: car3.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Car3Detail);
