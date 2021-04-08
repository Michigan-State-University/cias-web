/**
 *
 * SessionSchedule
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import values from 'lodash/values';
import find from 'lodash/find';

import { dateQuestion } from 'models/Session/QuestionTypes';

import {
  SCHEDULE_OPTIONS,
  changeSchedulingType,
  updateSchedulingDate,
  updateSchedulingPayload,
  changeCurrentSession,
  updateDaysAfterDateVariable,
} from 'global/reducers/intervention';
import {
  getQuestionGroupsRequest,
  makeSelectQuestionGroupsSessionId,
} from 'global/reducers/questionGroups';

import { colors, themeColors } from 'theme';

import VariableChooser from 'containers/BranchingLayout/VariableChooser';

import Text from 'components/Text';
import Column from 'components/Column';
import Selector from 'components/Selector';
import Row from 'components/Row';
import Box from 'components/Box';
import Badge from 'components/Badge';

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
  daysAfterDateVariableName,
  sessionId,
  disabled,
  session,
  changeSessionIndex,
  fetchQuestions,
  activeSessionId,
  updateDateVariable,
}) {
  const [variableChooserOpen, setVariableChooserOpen] = useState(false);

  const { position } = session ?? {};

  const scheduleOptions = {
    afterFill: {
      id: SCHEDULE_OPTIONS.afterFill,
      label: formatMessage(messages.afterFill),
    },
    daysAfter: {
      id: SCHEDULE_OPTIONS.daysAfter,
      label: formatMessage(messages.daysAfter),
    },
    daysAfterFill: {
      id: SCHEDULE_OPTIONS.daysAfterFill,
      label: formatMessage(messages.daysAfterFill),
    },
    daysAfterDate: {
      id: SCHEDULE_OPTIONS.daysAfterDate,
      label: formatMessage(messages.daysAfterDate),
    },
    exactDate: {
      id: SCHEDULE_OPTIONS.exactDate,
      label: formatMessage(messages.exactDate),
    },
  };

  const handleClickAddVariable = () => {
    if (sessionId !== activeSessionId) {
      changeSessionIndex(position - 1);
      fetchQuestions(sessionId);
    }

    setVariableChooserOpen(!variableChooserOpen);
  };

  const handleOnClickDateVariable = value => {
    updateDateVariable(value, sessionId);
    setVariableChooserOpen(false);
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
            scheduleOption={selectedScheduleOption}
          />
        );
      case scheduleOptions.daysAfterFill.id:
        return (
          <DaysAfterOption
            id={sessionId}
            value={schedulePayload}
            setValue={handleChangeDays}
            disabled={disabled}
            scheduleOption={selectedScheduleOption}
          />
        );
      case scheduleOptions.daysAfterDate.id:
        return (
          <Column>
            <Row align="center">
              <DaysAfterOption
                id={sessionId}
                value={schedulePayload}
                setValue={handleChangeDays}
                disabled={disabled}
                scheduleOption={selectedScheduleOption}
              />
            </Row>
            <Row mt={10} align="center">
              <Badge
                bg={themeColors.primary}
                color={colors.white}
                onClick={handleClickAddVariable}
                clickable
              >
                {daysAfterDateVariableName ??
                  formatMessage(messages.daysAfterDateVariableEmpty)}
              </Badge>
              <Text ml={5}>
                {formatMessage(messages.daysAfterDateVariableInfo)}
              </Text>
            </Row>
            <Box position="relative" mt={10}>
              <VariableChooser
                includeAllVariables
                includeNonDigitVariables
                visible={variableChooserOpen}
                setOpen={setVariableChooserOpen}
                onClick={handleOnClickDateVariable}
                questionTypeWhitelist={[dateQuestion.id]}
                style={{ left: '0px' }}
              />
            </Box>
          </Column>
        );
      case scheduleOptions.exactDate.id:
        return (
          <ExactDateOption
            disabled={disabled}
            value={scheduleAt}
            setValue={handleChangeDate}
          />
        );
      case scheduleOptions.afterFill.id:
        return <></>;
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
  daysAfterDateVariableName: PropTypes.string,
  changeType: PropTypes.func,
  updatePayload: PropTypes.func,
  updateDate: PropTypes.func,
  sessionId: PropTypes.string,
  disabled: PropTypes.bool,
  changeSessionIndex: PropTypes.func,
  updateDateVariable: PropTypes.func,
  fetchQuestions: PropTypes.func,
  session: PropTypes.object,
  activeSessionId: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  activeSessionId: makeSelectQuestionGroupsSessionId(),
});

const mapDispatchToProps = {
  changeType: changeSchedulingType,
  updatePayload: updateSchedulingPayload,
  updateDate: updateSchedulingDate,
  updateDateVariable: updateDaysAfterDateVariable,
  changeSessionIndex: changeCurrentSession,
  fetchQuestions: getQuestionGroupsRequest,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  injectIntl,
  withConnect,
)(SessionSchedule);
