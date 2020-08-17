/**
 *
 * InterventionSchedule
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import values from 'lodash/values';

import Text from 'components/Text';
import Column from 'components/Column';
import Selector from 'components/Selector';
import Row from 'components/Row';

import { colors } from 'theme';
import messages from './messages';

import DaysAfterOption from './DaysAfterOption';
import ExactDateOption from './ExactDateOption';

function InterventionSchedule({ intl: { formatMessage } }) {
  const scheduleOptions = {
    daysAfter: {
      id: 'daysAfter',
      label: formatMessage(messages.daysAfter),
    },
    daysAfterFill: {
      id: 'daysAfterFill',
      label: formatMessage(messages.daysAfterFill),
    },
    exactDate: {
      id: 'exactDate',
      label: formatMessage(messages.exactDate),
    },
  };

  const [option, setOption] = useState(scheduleOptions.exactDate);

  const renderOption = () => {
    switch (option.id) {
      case scheduleOptions.daysAfter.id:
        return <DaysAfterOption />;
      case scheduleOptions.daysAfterFill.id:
        return <DaysAfterOption afterFill />;
      case scheduleOptions.exactDate.id:
        return <ExactDateOption />;
      default:
        break;
    }
  };

  return (
    <Column>
      <Text mb={12} textOpacity={0.6} color={colors.bluewood} fontSize={13}>
        {formatMessage(messages.info)}
      </Text>
      <Selector
        options={values(scheduleOptions)}
        activeOption={option}
        rightPosition="315"
        setOption={id => setOption(scheduleOptions[id])}
      />
      <Row mt={28} mb={17} align="center">
        <Text fontSize={15}>{formatMessage(messages.send)}</Text>
        {renderOption()}
      </Row>
    </Column>
  );
}

InterventionSchedule.propTypes = {
  intl: PropTypes.object,
};

export default injectIntl(InterventionSchedule);
