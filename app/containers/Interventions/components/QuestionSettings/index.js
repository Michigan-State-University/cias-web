import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Box from 'components/Box';
import H2 from 'components/H2';

import DefaultSettings from './DefaultSettings';

import messages from './messages';
import { makeSelectSelectedQuestionType } from './selectors';
import { makeSelectQuestionSettingsVisibility } from '../../containers/EditInterventionPage/selectors';
import { StyledBox } from './styled';

const QuestionSettings = ({
  selectedQuestionType,
  settingsVisiblity,
  intl: { formatMessage },
}) => (
  <StyledBox width="20%" isVisible={settingsVisiblity}>
    <Box width="100%" height="100%" padded>
      <H2 mb={40}>{formatMessage(messages.header)}</H2>
      {renderSettings(selectedQuestionType)}
    </Box>
  </StyledBox>
);

// * There will be different settings for some of the questions/slides
const renderSettings = selectedQuestionType => {
  switch (selectedQuestionType) {
    default:
      return <DefaultSettings />;
  }
};

QuestionSettings.propTypes = {
  selectedQuestionType: PropTypes.string,
  intl: PropTypes.object.isRequired,
  settingsVisiblity: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  selectedQuestionType: makeSelectSelectedQuestionType(),
  settingsVisiblity: makeSelectQuestionSettingsVisibility(),
});

const withConnect = connect(mapStateToProps);

export default injectIntl(compose(withConnect)(QuestionSettings));
