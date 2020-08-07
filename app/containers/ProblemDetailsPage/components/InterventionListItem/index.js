/**
 *
 * InterventionListItem
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import Row from 'components/Row';
import Column from 'components/Column';
import H2 from 'components/H2';
import Dropdown from 'components/Dropdown';

import { InterventionIndex, StyledLink, ToggleableBox } from './styled';

function InterventionListItem({ intervention, index, isSelected }) {
  const { id, name, problem_id: problemId } = intervention || {};

  const options = [];
  return (
    <ToggleableBox isSelected={isSelected}>
      <Row py={18} px={20} align="center">
        <Column xs={1}>
          <InterventionIndex>{index + 1}</InterventionIndex>
        </Column>
        <Column xs={10} mx={18}>
          <StyledLink to={`/interventions/${problemId}/sessions/${id}/edit`}>
            <H2>{name}</H2>
          </StyledLink>
        </Column>
        <Column xs={1}>
          <Dropdown options={options} id={id} />
        </Column>
      </Row>
    </ToggleableBox>
  );
}

InterventionListItem.propTypes = {
  intervention: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  isSelected: PropTypes.bool,
};

export default InterventionListItem;
