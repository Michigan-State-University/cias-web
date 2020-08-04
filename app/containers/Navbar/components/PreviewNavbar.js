import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl, intlShape } from 'react-intl';

import Icon from 'components/Icon';
import Row from 'components/Row';
import Text from 'components/Text';
import desktop from 'assets/svg/desktop.svg';
import mobile from 'assets/svg/mobile.svg';
import { colors, themeColors } from 'theme';
import makeSelectAnswerInterventionPage, {
  makeSelectPreviewMode,
} from 'containers/AnswerInterventionPage/selectors';
import {
  changePreviewMode as changePreviewModeAction,
  resetIntervention,
} from 'containers/AnswerInterventionPage/actions';
import { I_PHONE_8_PLUS_MODE, DESKTOP_MODE } from 'utils/previewMode';

import CloseIcon from 'components/CloseIcon';
import messages from 'containers/Navbar/components/messages';

import Box from 'components/Box';
import PreviewButton from 'components/PreviewButton';

const PreviewNavbar = ({
  intl: { formatMessage },
  intervention: { interventionId },
  navbarName,
  onResetIntervention,
  previewMode,
  changePreviewMode,
}) => {
  const handleClose = () => {
    window.opener = null;
    window.open('', '_self');
    window.close();
  };

  const changeMode = mode => () => changePreviewMode(mode);

  const previews = [
    {
      id: DESKTOP_MODE,
      src: desktop,
      alt: 'desktop',
      onClick: changeMode(DESKTOP_MODE),
      mr: 40,
    },
    {
      id: I_PHONE_8_PLUS_MODE,
      src: mobile,
      alt: 'mobile',
      onClick: changeMode(I_PHONE_8_PLUS_MODE),
    },
  ];

  const fillActive = themeColors.secondary;
  const fillInactive = colors.casper;

  return (
    <Row align="center" justify="between" width="100%">
      <Row>
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
      <Row justify="between" align="center">
        {previews.map(preview => {
          const fill = preview.id === previewMode ? fillActive : fillInactive;
          return (
            <Icon
              key={`el-preview-${preview.id}`}
              cursor="pointer"
              fill={fill}
              {...preview}
            />
          );
        })}
      </Row>
      <div />
    </Row>
  );
};

PreviewNavbar.propTypes = {
  navbarName: PropTypes.node,
  previewMode: PropTypes.string,
  changePreviewMode: PropTypes.func,
  intervention: PropTypes.shape({
    id: PropTypes.string,
  }),
  onResetIntervention: PropTypes.func,
  intl: intlShape,
};

const mapStateToProps = createStructuredSelector({
  previewMode: makeSelectPreviewMode(),
  intervention: makeSelectAnswerInterventionPage(),
});

const mapDispatchToProps = {
  changePreviewMode: changePreviewModeAction,
  onResetIntervention: resetIntervention,
};

export const PreviewNavbarWithIntl = injectIntl(PreviewNavbar);

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(PreviewNavbarWithIntl);
