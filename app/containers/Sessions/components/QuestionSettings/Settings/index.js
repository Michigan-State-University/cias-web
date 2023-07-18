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

import Column from 'components/Column';
import Tabs from 'components/Tabs';

import BranchingTab from './Components/Tabs/BranchingTab';
import NarratorTab from './Components/Tabs/NarratorTab';
import SettingsTab from './Components/Tabs/SettingsTab';
import messages from './messages';
import {
  HIDE_BRANCHING_TAB_QUESTIONS,
  HIDE_SETTINGS_TAB_QUESTIONS,
} from '../constants';

const Settings = ({
  selectedQuestion: { narrator, settings, id, formulas, type } = {},
  intl: { formatMessage },
  tab,
  changeTab,
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

  const hideSettingsTab = HIDE_SETTINGS_TAB_QUESTIONS.includes(type);
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
          <SettingsTab
            formatMessage={formatMessage}
            disabled={!editingPossible}
            settings={settings}
            type={type}
            id={id}
          />
        </div>
        <div label={formatMessage(messages[settingsTabLabels.narrator])}>
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
