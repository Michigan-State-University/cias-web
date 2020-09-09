import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';

import Box from 'components/Box';
import H2 from 'components/H2';
import Img from 'components/Img';
import Row from 'components/Row';
import close from 'assets/svg/cross.svg';
import { useInjectSaga } from 'utils/injectSaga';
import {
  makeSelectQuestionSettingsVisibility,
  toggleQuestionSettings,
} from 'global/reducers/localState';
import {
  makeSelectQuestionsLength,
  updateQuestionSettingsSaga,
} from 'global/reducers/questions';

import Settings from './Settings';
import messages from './messages';
import { SettingsBar, Container } from './styled';

const QuestionSettings = ({
  settingsVisiblity,
  toggleSettings,
  intl: { formatMessage },
  questionsLength,
}) => {
  useInjectSaga({
    key: 'updateQuestionSettings',
    saga: updateQuestionSettingsSaga,
  });
  const onClose = () => toggleSettings({ index: -1 });
  return (
    <Container isVisible={settingsVisiblity && questionsLength}>
      <SettingsBar width="400px" height="100%">
        <Box width="100%" height="100%" padded>
          <Row align="center" justify="between" mb={40}>
            <H2>{formatMessage(messages.header)}</H2>
            <Img src={close} alt="close" clickable onClick={onClose} />
          </Row>
          <Settings />
        </Box>
      </SettingsBar>
    </Container>
  );
};

QuestionSettings.propTypes = {
  intl: PropTypes.object.isRequired,
  settingsVisiblity: PropTypes.bool,
  toggleSettings: PropTypes.func,
  questionsLength: PropTypes.number,
};

const mapStateToProps = createStructuredSelector({
  settingsVisiblity: makeSelectQuestionSettingsVisibility(),
  questionsLength: makeSelectQuestionsLength(),
});

const mapDispatchToProps = {
  toggleSettings: toggleQuestionSettings,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default injectIntl(compose(withConnect)(QuestionSettings));
