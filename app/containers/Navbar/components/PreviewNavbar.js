import React from 'react';
import PropTypes from 'prop-types';

import Row from 'components/Row';
import Text from 'components/Text';
import CloseIcon from 'components/CloseIcon';
import messages from 'containers/Navbar/components/messages';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Box from 'components/Box';
import makeSelectAnswerInterventionPage from 'containers/AnswerInterventionPage/selectors';
import { resetIntervention } from 'containers/AnswerInterventionPage/actions';
import PreviewButton from 'components/PreviewButton';
import { injectIntl, intlShape } from 'react-intl';

const PreviewNavbar = ({
  intl: { formatMessage },
  intervention: { interventionId },
  navbarName,
  onResetIntervention,
}) => {
  const handleClose = () => {
    window.opener = null;
    window.open('', '_self');
    window.close();
  };

  return (
    <Row align="center" justify="start" width="100%">
      <CloseIcon onClick={handleClose} />
      <Text color="black" fontSize={23}>
        {navbarName}
      </Text>
      <Box mx={20}>
        <PreviewButton
          to={`/interventions/${interventionId}/preview`}
          handleClick={onResetIntervention}
          text={formatMessage(messages.previewStart)}
        />
      </Box>
    </Row>
  );
};

PreviewNavbar.propTypes = {
  intl: intlShape,
  intervention: PropTypes.shape({
    id: PropTypes.string,
  }),
  navbarName: PropTypes.object,
  onResetIntervention: PropTypes.func,
};

const mapDispatchToProps = {
  onResetIntervention: resetIntervention,
};

const mapStateToProps = createStructuredSelector({
  intervention: makeSelectAnswerInterventionPage(),
});

export const PreviewNavbarWithIntl = injectIntl(PreviewNavbar);

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(PreviewNavbarWithIntl);
