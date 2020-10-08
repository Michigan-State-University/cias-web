import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl, intlShape } from 'react-intl';

import Column from 'components/Column';
import Tabs from 'components/Tabs';
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
import { makeSelectProblemStatus } from 'global/reducers/problem';
import { canEdit } from 'models/Status/statusPermissions';

import BranchingTab from './Components/Tabs/BranchingTab';
import NarratorTab from './Components/Tabs/NarratorTab';
import SettingsTab from './Components/Tabs/SettingsTab';
import messages from './messages';

const Settings = ({
  selectedQuestion: { narrator, settings, id, formula, type } = {},
  intl: { formatMessage },
  tab,
  changeTab,
  setDraggable,
  problemStatus,
}) => {
  const handleChange = newTab => {
    changeTab({ tab: newTab });
    setDraggable(false);
  };

  const editingPossible = canEdit(problemStatus);

  return (
    <Column>
      <Tabs
        controlled
        controlledTabActive={tab}
        controlledSetTabActive={handleChange}
      >
        <div label={formatMessage(messages[settingsTabLabels.settings])}>
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
            formatMessage={formatMessage}
            disabled={!editingPossible}
            narrator={narrator}
            id={id}
          />
        </div>
        <div label={formatMessage(messages[settingsTabLabels.branching])}>
          <BranchingTab
            formatMessage={formatMessage}
            disabled={!editingPossible}
            formula={formula}
            id={id}
          />
        </div>
      </Tabs>
    </Column>
  );
};

Settings.propTypes = {
  intl: intlShape,
  selectedQuestion: PropTypes.shape({
    narrator: PropTypes.object,
    settings: PropTypes.object,
    id: PropTypes.string,
    formula: PropTypes.object,
    type: PropTypes.string,
  }),
  tab: PropTypes.string,
  changeTab: PropTypes.func,
  setDraggable: PropTypes.func,
  problemStatus: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  selectedQuestion: makeSelectSelectedQuestion(),
  questions: makeSelectQuestions(),
  tab: makeSelectQuestionSettingsTab(),
  problemStatus: makeSelectProblemStatus(),
});

const mapDispatchToProps = {
  changeTab: setQuestionSettings,
  setDraggable: setCharacterDraggable,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default injectIntl(compose(withConnect)(Settings));
