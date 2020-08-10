import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Box from 'components/Box';
import H2 from 'components/H2';
import Row from 'components/Row';
import Img from 'components/Img';
import close from 'assets/svg/cross.svg';

import Settings from './Settings';
import messages from './messages';
import {
  makeSelectQuestionSettingsVisibility,
  makeSelectQuestionsLength,
} from '../../containers/EditInterventionPage/selectors';
import { toggleQuestionSettings } from '../../containers/EditInterventionPage/actions';
import { SettingsBar, Container } from './styled';

const QuestionSettings = ({
  settingsVisiblity,
  toggleSettings,
  intl: { formatMessage },
  questionsLength,
}) => {
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
