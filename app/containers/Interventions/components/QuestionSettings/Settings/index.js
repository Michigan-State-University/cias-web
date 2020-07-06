import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl, intlShape } from 'react-intl';

import Column from 'components/Column';
import Tabs from 'components/Tabs';
import messages from './messages';

import {
  makeSelectSelectedQuestion,
  makeSelectQuestions,
} from '../../../containers/EditInterventionPage/selectors';

import SettingsTab from './Components/SettingsTab';
import NarratorTab from './Components/NarratorTab';
import BranchingTab from './Components/BranchingTab';

const Settings = ({
  selectedQuestion: { narrator, settings, id, formula, type } = {},
  intl: { formatMessage },
}) => (
  <Column>
    <Tabs>
      <div label={formatMessage(messages.settings)}>
        <SettingsTab
          formatMessage={formatMessage}
          settings={settings}
          type={type}
          id={id}
        />
      </div>
      <div label={formatMessage(messages.narrator)}>
        <NarratorTab
          formatMessage={formatMessage}
          narrator={narrator}
          id={id}
        />
      </div>
      <div label={formatMessage(messages.branching)}>
        <BranchingTab formatMessage={formatMessage} formula={formula} id={id} />
      </div>
    </Tabs>
  </Column>
);

Settings.propTypes = {
  intl: intlShape,
  selectedQuestion: PropTypes.shape({
    narrator: PropTypes.object,
    settings: PropTypes.object,
    id: PropTypes.string,
    formula: PropTypes.object,
    type: PropTypes.string,
  }),
};

const mapStateToProps = createStructuredSelector({
  selectedQuestion: makeSelectSelectedQuestion(),
  questions: makeSelectQuestions(),
});

const withConnect = connect(mapStateToProps);

export default injectIntl(compose(withConnect)(Settings));
