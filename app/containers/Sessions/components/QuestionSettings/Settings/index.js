import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl, IntlShape } from 'react-intl';

import settingsTabLabels from 'utils/settingsTabsLabels';

import {
  makeSelectQuestionSettingsTab,
  setQuestionSettings,
  setCharacterDraggable,
} from 'global/reducers/localState';
import {
  makeSelectSelectedQuestion,
  makeSelectQuestions,
} from 'global/reducers/questions';
import { makeSelectEditingPossible } from 'global/reducers/intervention';
import { makeSelectInterventionType } from 'global/reducers/intervention/selectors';
import { makeSelectSelectedQuestionGroup } from 'global/reducers/questionGroups';

import { InterventionType } from 'models/Intervention/Intervention';
import { GroupType } from 'models/QuestionGroup';
import { SessionTypes } from 'models/Session';

import Column from 'components/Column';
import Tabs from 'components/Tabs';

import BranchingTab from './Components/Tabs/BranchingTab';
import NarratorTab from './Components/Tabs/NarratorTab';
import SettingsTab from './Components/Tabs/SettingsTab';
import SmsSettingsTab from './Components/Tabs/SmsSettingsTab';

import messages from './messages';
import {
  HIDE_BRANCHING_TAB_QUESTIONS,
  HIDE_NARRATOR_TAB_QUESTIONS,
  HIDE_SETTINGS_TAB_QUESTIONS,
} from '../constants';

const Settings = ({
  selectedQuestion: {
    narrator,
    settings,
    id,
    formulas,
    type,
    accepted_answers: acceptedAnswers,
    sms_reminders: smsReminders,
  } = {},
  intl: { formatMessage },
  tab,
  changeTab,
  sessionType,
  setDraggable,
  interventionType,
  questionGroup,
  editingPossible,
}) => {
  const handleChange = (newTab) => {
    changeTab({ tab: newTab });
    setDraggable(false);
  };

  const isTlfbGroup = questionGroup?.type === GroupType.TLFB;
  const isSmsSession = sessionType === SessionTypes.SMS_SESSION;

  const hideSettingsTab = HIDE_SETTINGS_TAB_QUESTIONS.includes(type);
  const hideNarratorTab = HIDE_NARRATOR_TAB_QUESTIONS.includes(type);
  const hideBranchingTab = HIDE_BRANCHING_TAB_QUESTIONS.includes(type);

  return (
    <Column>
      <Tabs
        controlled
        controlledTabActive={tab}
        controlledSetTabActive={handleChange}
        data-cy="settings-panel"
      >
        <div
          label={formatMessage(messages[settingsTabLabels.settings])}
          hidden={hideSettingsTab}
        >
          {isSmsSession ? (
            <SmsSettingsTab
              formatMessage={formatMessage}
              disabled={!editingPossible}
              acceptedAnswers={acceptedAnswers}
              smsReminders={smsReminders}
              type={type}
              id={id}
            />
          ) : (
            <SettingsTab
              formatMessage={formatMessage}
              disabled={!editingPossible}
              settings={settings}
              type={type}
              id={id}
            />
          )}
        </div>
        <div
          label={formatMessage(messages[settingsTabLabels.narrator])}
          hidden={hideNarratorTab}
        >
          <NarratorTab
            disabled={!editingPossible}
            narrator={narrator}
            questionType={type}
            isTlfbGroup={isTlfbGroup}
            id={id}
          />
        </div>
        <div
          label={formatMessage(messages[settingsTabLabels.branching])}
          hidden={hideBranchingTab}
        >
          <BranchingTab
            formatMessage={formatMessage}
            disabled={!editingPossible}
            formulas={formulas}
            id={id}
            disableBranchingToSession={
              interventionType !== InterventionType.DEFAULT
            }
          />
        </div>
      </Tabs>
    </Column>
  );
};

Settings.propTypes = {
  intl: PropTypes.shape(IntlShape),
  selectedQuestion: PropTypes.shape({
    narrator: PropTypes.object,
    settings: PropTypes.object,
    id: PropTypes.string,
    formulas: PropTypes.array,
    type: PropTypes.string,
  }),
  tab: PropTypes.string,
  changeTab: PropTypes.func,
  setDraggable: PropTypes.func,
  sessionType: PropTypes.string,
  interventionType: PropTypes.string,
  questionGroup: PropTypes.object,
  editingPossible: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  selectedQuestion: makeSelectSelectedQuestion(),
  questions: makeSelectQuestions(),
  tab: makeSelectQuestionSettingsTab(),
  interventionType: makeSelectInterventionType(),
  questionGroup: makeSelectSelectedQuestionGroup(),
  editingPossible: makeSelectEditingPossible(),
});

const mapDispatchToProps = {
  changeTab: setQuestionSettings,
  setDraggable: setCharacterDraggable,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default injectIntl(compose(withConnect)(Settings));
