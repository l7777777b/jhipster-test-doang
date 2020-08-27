import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, translate } from 'react-jhipster';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  <NavDropdown
    icon="th-list"
    name={translate('global.menu.entities.main')}
    id="entity-menu"
    style={{ maxHeight: '80vh', overflow: 'auto' }}
  >
    <MenuItem icon="asterisk" to="/driver-2">
      <Translate contentKey="global.menu.entities.driver2" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/car-3">
      <Translate contentKey="global.menu.entities.car3" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/rank-properties">
      <Translate contentKey="global.menu.entities.rankProperties" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/user-1">
      <Translate contentKey="global.menu.entities.user1" />
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
