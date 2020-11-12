/**
 *
 * InterventionCreateButton
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import Row from 'components/Row';
import Img from 'components/Img';
import H3 from 'components/H3';

import addSign2 from 'assets/svg/addSign2.svg';
import { NewInterventionContainer } from './styled';
import messages from './messages';

function InterventionCreateButton({ handleClick }) {
  return (
    <NewInterventionContainer
      data-cy="create-intervention-button"
      onClick={handleClick}
    >
      <Row align="center">
        <Img src={addSign2} alt="add" mx={10} />
        <H3>
          <FormattedMessage {...messages.create} />
        </H3>
      </Row>
    </NewInterventionContainer>
  );
}

InterventionCreateButton.propTypes = {
  handleClick: PropTypes.func,
};

export default InterventionCreateButton;
