import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';

import Box from 'components/Box';
import H2 from 'components/H2';
import Row from 'components/Row';
import Icon from 'components/Icon';
import gear from 'assets/svg/gear-white-background.svg';
import cross from 'assets/svg/cross-white-small.svg';
import { useInjectSaga } from 'redux-injectors';
import {
  makeSelectQuestionSettingsVisibility,
  setQuestionSettings,
  toggleQuestionSettings,
} from 'global/reducers/localState';
import {
  makeSelectQuestionsLength,
  updateQuestionSettingsSaga,
} from 'global/reducers/questions';

import Settings from './Settings';
import messages from './messages';
import { SettingsBar, Container, OpenButton } from './styled';

const QuestionSettings = ({
  settingsVisibility,
  toggleSettings,
  intl: { formatMessage },
  questionsLength,
}) => {
  useInjectSaga({
    key: 'updateQuestionSettings',
    saga: updateQuestionSettingsSaga,
  });

  const isVisible = settingsVisibility && questionsLength;

  return (
    <Container isVisible={isVisible}>
      <SettingsBar isVisible={isVisible} height="100%">
        <Box width={400} height="100%" padded>
          <Row align="center" justify="between" mb={40}>
            <H2>{formatMessage(messages.header)}</H2>
          </Row>
          <Settings />
        </Box>
      </SettingsBar>
      <OpenButton onClick={toggleSettings}>
        <Icon src={isVisible ? cross : gear} alt="show-settings" />
      </OpenButton>
    </Container>
  );
};

QuestionSettings.propTypes = {
  intl: PropTypes.object.isRequired,
  settingsVisibility: PropTypes.bool,
  toggleSettings: PropTypes.func,
  questionsLength: PropTypes.number,
};

const mapStateToProps = createStructuredSelector({
  settingsVisibility: makeSelectQuestionSettingsVisibility(),
  questionsLength: makeSelectQuestionsLength(),
});

const mapDispatchToProps = {
  setSettings: setQuestionSettings,
  toggleSettings: toggleQuestionSettings,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default injectIntl(compose(withConnect)(QuestionSettings));
