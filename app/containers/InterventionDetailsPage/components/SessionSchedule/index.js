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
import { createStructuredSelector } from 'reselect';
import values from 'lodash/values';
import find from 'lodash/find';

import { dateQuestion } from 'models/Session/QuestionTypes';
import { SessionTypes } from 'models/Session';

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

import VariableChooser from 'containers/VariableChooser';

import Text from 'components/Text';
import Column from 'components/Column';
import Selector from 'components/Selector';
import Row from 'components/Row';
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
  updateDateVariable,
}) {
  const { interventionId } = session ?? {};

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

  const handleOnClickDateVariable = (value) =>
    updateDateVariable(value, sessionId);

  const handleChangeDate = (date) => updateDate(date, sessionId);
  const handleChangeDays = (days) => updatePayload(days, sessionId);

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
              <VariableChooser
                disabled={disabled}
                currentInterventionId={interventionId}
                onClick={handleOnClickDateVariable}
                placement="left"
                questionTypeWhitelist={[dateQuestion.id]}
                currentSessionId={sessionId}
                includeAllVariables
                includeCurrentSession={false}
                includeNonDigitVariables
                isMultiSession
                sessionTypesWhiteList={[SessionTypes.CLASSIC_SESSION]}
              >
                <Badge bg={themeColors.primary} color={colors.white}>
                  {daysAfterDateVariableName ??
                    formatMessage(messages.daysAfterDateVariableEmpty)}
                </Badge>
              </VariableChooser>
              <Text ml={5}>
                {formatMessage(messages.daysAfterDateVariableInfo)}
              </Text>
            </Row>
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
          (elem) => elem.id === selectedScheduleOption,
        )}
        rightPosition="315"
        setOption={(id) => changeType(id, sessionId)}
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
  updateDateVariable: PropTypes.func,
  session: PropTypes.object,
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

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(injectIntl, withConnect)(SessionSchedule);
