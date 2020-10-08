/**
 *
 * InterventionSchedule
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import values from 'lodash/values';
import find from 'lodash/find';

import Text from 'components/Text';
import Column from 'components/Column';
import Selector from 'components/Selector';
import Row from 'components/Row';

import { colors } from 'theme';

import { connect } from 'react-redux';
import { compose } from 'redux';
import {
  SCHEDULE_OPTIONS,
  changeSchedulingType,
  updateSchedulingValue,
} from 'global/reducers/problem';
import ExactDateOption from './ExactDateOption';
import DaysAfterOption from './DaysAfterOption';
import messages from './messages';

function InterventionSchedule({
  intl: { formatMessage },
  selectedScheduleOption,
  scheduleAt,
  changeType,
  updateValue,
  interventionId,
  disabled,
}) {
  const scheduleOptions = {
    daysAfter: {
      id: SCHEDULE_OPTIONS.daysAfter,
      label: formatMessage(messages.daysAfter),
    },
    daysAfterFill: {
      id: SCHEDULE_OPTIONS.daysAfterFill,
      label: formatMessage(messages.daysAfterFill),
    },
    exactDate: {
      id: SCHEDULE_OPTIONS.exactDate,
      label: formatMessage(messages.exactDate),
    },
  };

  const handleChangeValue = value => updateValue(value, interventionId);

  const renderOption = () => {
    switch (selectedScheduleOption) {
      case scheduleOptions.daysAfter.id:
        return (
          <DaysAfterOption
            disabled={disabled}
            value={scheduleAt}
            setValue={handleChangeValue}
          />
        );
      case scheduleOptions.daysAfterFill.id:
        return (
          <DaysAfterOption
            disabled={disabled}
            value={scheduleAt}
            setValue={handleChangeValue}
            afterFill
          />
        );
      case scheduleOptions.exactDate.id:
        return (
          <ExactDateOption
            disabled={disabled}
            value={scheduleAt}
            setValue={handleChangeValue}
          />
        );
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
        disabled={disabled}
        selectOptionPlaceholder={formatMessage(messages.default)}
        options={values(scheduleOptions)}
        activeOption={find(
          scheduleOptions,
          elem => elem.id === selectedScheduleOption,
        )}
        rightPosition="315"
        setOption={id => changeType(id, interventionId)}
      />
      {selectedScheduleOption && (
        <Row mt={28} mb={17} align="center">
          {renderOption()}
        </Row>
      )}
    </Column>
  );
}

InterventionSchedule.propTypes = {
  intl: PropTypes.object,
  selectedScheduleOption: PropTypes.string,
  scheduleAt: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.string,
  ]),
  changeType: PropTypes.func,
  updateValue: PropTypes.func,
  interventionId: PropTypes.string,
  disabled: PropTypes.bool,
};

const mapDispatchToProps = {
  changeType: changeSchedulingType,
  updateValue: updateSchedulingValue,
};

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(
  injectIntl,
  withConnect,
)(InterventionSchedule);
