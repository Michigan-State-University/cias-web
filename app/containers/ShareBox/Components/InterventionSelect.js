/**
 *
 * ShareBox
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import Tooltip from 'components/Tooltip';
import Column from 'components/Column';
import Row from 'components/Row';
import Text from 'components/Text';
import Select from 'components/Select';

import messages from '../messages';

const mockSelectOptions = [
  {
    value: '1',
    label: 'I1',
  },
  {
    value: '2',
    label: 'I2',
  },
  {
    value: '2',
    label: 'I3',
  },
];

const InterventionSelect = ({ sessions = mockSelectOptions }) => (
  <Column>
    <Row mb={15} align="center">
      <Text fontWeight="bold">
        <FormattedMessage {...messages.selectLabel} />
      </Text>
      <Tooltip ml={8} id="el-intervention-select-tooltip">
        <FormattedMessage {...messages.tooltipSelectContent} />
      </Tooltip>
    </Row>
    <Select
      selectProps={{
        options: sessions,
        value: sessions[0],
        onChange: () => {},
      }}
    />
  </Column>
);

InterventionSelect.propTypes = {
  sessions: PropTypes.array,
};

export default InterventionSelect;
