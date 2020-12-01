/**
 *
 * SessionSchedule
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import values from 'lodash/values';
import find from 'lodash/find';

import Text from 'components/Text';
import Column from 'components/Column';
import Selector from 'components/Selector';
import Row from 'components/Row';

import { colors } from 'theme';

import {
  SCHEDULE_OPTIONS,
  changeSchedulingType,
  updateSchedulingDate,
  updateSchedulingPayload,
} from 'global/reducers/intervention';

import ExactDateOption from './ExactDateOption';
import DaysAfterOption from './DaysAfterOption';
import messages from './messages';

function SessionSchedule({
  intl: { formatMessage },
  selectedScheduleOption,
  scheduleAt,
  changeType,
  updatePayload,
  updateDate,
  schedulePayload,
  sessionId,
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

  const handleChangeDate = date => updateDate(date, sessionId);
  const handleChangeDays = days => updatePayload(days, sessionId);

  const renderOption = () => {
    switch (selectedScheduleOption) {
      case scheduleOptions.daysAfter.id:
        return (
          <DaysAfterOption
            id={sessionId}
            value={schedulePayload}
            setValue={handleChangeDays}
            disabled={disabled}
          />
        );
      case scheduleOptions.daysAfterFill.id:
        return (
          <DaysAfterOption
            id={sessionId}
            value={schedulePayload}
            setValue={handleChangeDays}
            disabled={disabled}
            afterFill
          />
        );
      case scheduleOptions.exactDate.id:
        return (
          <ExactDateOption
            disabled={disabled}
            value={scheduleAt}
            setValue={handleChangeDate}
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
        setOption={id => changeType(id, sessionId)}
      />
      {selectedScheduleOption && (
        <Row mt={28} mb={17} align="center">
          {renderOption()}
        </Row>
      )}
    </Column>
  );
}

SessionSchedule.propTypes = {
  intl: PropTypes.object,
  selectedScheduleOption: PropTypes.string,
  scheduleAt: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.string,
  ]),
  schedulePayload: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  changeType: PropTypes.func,
  updatePayload: PropTypes.func,
  updateDate: PropTypes.func,
  sessionId: PropTypes.string,
  disabled: PropTypes.bool,
};

const mapDispatchToProps = {
  changeType: changeSchedulingType,
  updatePayload: updateSchedulingPayload,
  updateDate: updateSchedulingDate,
};

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(
  injectIntl,
  withConnect,
)(SessionSchedule);
