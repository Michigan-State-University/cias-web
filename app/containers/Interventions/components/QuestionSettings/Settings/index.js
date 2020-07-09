import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl, intlShape } from 'react-intl';
import { toast } from 'react-toastify';

import { makeSelectAlert, clearAlert } from 'global/reducers/alerts';
import { ERROR_DUPLICATE_VARIABLE } from 'containers/Interventions/containers/EditInterventionPage/constants';

import Column from 'components/Column';
import Tabs from 'components/Tabs';
import messages from './messages';

import {
  makeSelectSelectedQuestion,
  makeSelectQuestions,
} from '../../../containers/EditInterventionPage/selectors';

import SettingsTab from './Components/Tabs/SettingsTab';
import NarratorTab from './Components/Tabs/NarratorTab';
import BranchingTab from './Components/Tabs/BranchingTab';

const Settings = ({
  selectedQuestion: { narrator, settings, id, formula, type } = {},
  intl: { formatMessage },
  alertVisible,
  afterAlertShow,
}) => {
  useEffect(() => {
    if (alertVisible) {
      toast.error(formatMessage(messages.errors.duplicateVariable));
      afterAlertShow();
    }
  }, [alertVisible]);

  return (
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
          <BranchingTab
            formatMessage={formatMessage}
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
  alertVisible: PropTypes.bool,
  afterAlertShow: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  selectedQuestion: makeSelectSelectedQuestion(),
  questions: makeSelectQuestions(),
  alertVisible: makeSelectAlert(ERROR_DUPLICATE_VARIABLE),
});

const mapDispatchToProps = {
  afterAlertShow: () => clearAlert(ERROR_DUPLICATE_VARIABLE),
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default injectIntl(compose(withConnect)(Settings));
