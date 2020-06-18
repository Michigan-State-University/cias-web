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

import DefaultSettings from './DefaultSettings';
import messages from './messages';
import { makeSelectSelectedQuestionType } from './selectors';
import { makeSelectQuestionSettingsVisibility } from '../../containers/EditInterventionPage/selectors';
import { toggleQuestionSettings } from '../../containers/EditInterventionPage/actions';
import { SettingsBar, Container } from './styled';

const QuestionSettings = ({
  selectedQuestionType,
  settingsVisiblity,
  toggleSettings,
  intl: { formatMessage },
}) => {
  const onClose = () => toggleSettings(-1);
  return (
    <Container isVisible={settingsVisiblity}>
      <SettingsBar width="300px">
        <Box width="100%" height="100%" padded>
          <Row align="center" justify="between" mb={40}>
            <H2>{formatMessage(messages.header)}</H2>
            <Img src={close} alt="close" clickable onClick={onClose} />
          </Row>
          {renderSettings(selectedQuestionType)}
        </Box>
      </SettingsBar>
    </Container>
  );
};

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
  toggleSettings: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  selectedQuestionType: makeSelectSelectedQuestionType(),
  settingsVisiblity: makeSelectQuestionSettingsVisibility(),
});

const mapDispatchToProps = {
  toggleSettings: toggleQuestionSettings,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default injectIntl(compose(withConnect)(QuestionSettings));
