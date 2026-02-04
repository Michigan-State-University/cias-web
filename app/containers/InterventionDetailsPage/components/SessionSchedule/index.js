/**
 *
 * SessionSchedule
 *
 */

import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import find from 'lodash/find';

import { dateQuestion } from 'models/Session/QuestionTypes';
import {
  SessionTypes,
  SessionSchedule as SessionScheduleEnum,
} from 'models/Session';
import { InterventionSharedTo } from 'models/Intervention';

import {
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
import { HelpIconTooltip } from 'components/HelpIconTooltip';

import ExactDateOption from './ExactDateOption';
import DaysAfterOption from './DaysAfterOption';
import messages from './messages';
import { SESSION_SCHEDULE_OPTIONS } from './contants';

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
  sharedTo,
}) {
  const { interventionId } = session ?? {};

  const scheduleOptions = useMemo(() => {
    switch (sharedTo) {
      case InterventionSharedTo.REGISTERED:
      case InterventionSharedTo.INVITED:
        return [
          SESSION_SCHEDULE_OPTIONS[SessionScheduleEnum.AFTER_FILL],
          SESSION_SCHEDULE_OPTIONS[SessionScheduleEnum.DAYS_AFTER],
          SESSION_SCHEDULE_OPTIONS[SessionScheduleEnum.DAYS_AFTER_FILL],
          SESSION_SCHEDULE_OPTIONS[SessionScheduleEnum.DAYS_AFTER_DATE],
          SESSION_SCHEDULE_OPTIONS[SessionScheduleEnum.EXACT_DATE],
          SESSION_SCHEDULE_OPTIONS[SessionScheduleEnum.IMMEDIATELY],
        ];
      case InterventionSharedTo.ANYONE:
        return [
          SESSION_SCHEDULE_OPTIONS[SessionScheduleEnum.AFTER_FILL],
          SESSION_SCHEDULE_OPTIONS[SessionScheduleEnum.IMMEDIATELY],
        ];
      default:
        return [];
    }
  }, [sharedTo]);

  const handleOnClickDateVariable = (value) =>
    updateDateVariable(value, sessionId);

  const handleChangeDate = (date) => updateDate(date, sessionId);
  const handleChangeDays = (days) => updatePayload(days, sessionId);

  const shouldRenderOption = () => {
    switch (selectedScheduleOption) {
      case SessionScheduleEnum.AFTER_FILL:
      case SessionScheduleEnum.IMMEDIATELY: {
        return false;
      }
      default: {
        return true;
      }
    }
  };

  const renderOption = () => {
    switch (selectedScheduleOption) {
      case SessionScheduleEnum.DAYS_AFTER:
        return (
          <DaysAfterOption
            id={sessionId}
            value={schedulePayload}
            setValue={handleChangeDays}
            disabled={disabled}
            scheduleOption={selectedScheduleOption}
          />
        );
      case SessionScheduleEnum.DAYS_AFTER_FILL:
        return (
          <DaysAfterOption
            id={sessionId}
            value={schedulePayload}
            setValue={handleChangeDays}
            disabled={disabled}
            scheduleOption={selectedScheduleOption}
          />
        );
      case SessionScheduleEnum.DAYS_AFTER_DATE:
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
      case SessionScheduleEnum.EXACT_DATE:
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
    <Column pb={24} data-cy="session-schedule">
      <Text mb={12} textOpacity={0.6} color={colors.bluewood} fontSize={13}>
        {formatMessage(messages.info)}
      </Text>
      <HelpIconTooltip
        id="session-scheduling-cdh"
        tooltipContent={formatMessage(messages.sessionSchedulingHelp)}
      >
        <Selector
          disabled={disabled}
          selectOptionPlaceholder={formatMessage(messages.default)}
          options={scheduleOptions}
          activeOption={find(
            scheduleOptions,
            (elem) => elem.id === selectedScheduleOption,
          )}
          rightPosition="315"
          setOption={(id) => changeType(id, sessionId)}
          data-cy="session-schedule-selector"
        />
      </HelpIconTooltip>
      {selectedScheduleOption && shouldRenderOption() && (
        <Row mt={24} align="center">
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
  sharedTo: PropTypes.string,
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
