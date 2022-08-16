import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { IntlShape } from 'react-intl';

import Box from 'components/Box';
import ActionIcon from 'components/ActionIcon';
import Icon from 'components/Icon';
import PreviewButton from 'components/PreviewButton';
import Row from 'components/Row';
import Text from 'components/Text';
import desktop from 'assets/svg/desktop.svg';
import mobile from 'assets/svg/mobile.svg';
import { I_PHONE_8_PLUS_MODE, DESKTOP_MODE } from 'utils/previewMode';
import { colors, themeColors } from 'theme';
import { makeSelectPreviewMode } from 'containers/AnswerSessionPage/selectors';
import { makeSelectInterventionStatus } from 'global/reducers/intervention';
import {
  changePreviewMode as changePreviewModeAction,
  resetSession,
} from 'containers/AnswerSessionPage/actions';

import { canPreview } from 'models/Status/statusPermissions';
import messages from './messages';

const PreviewNavbar = ({
  intl: { formatMessage },
  navbarName,
  onResetIntervention,
  previewMode,
  changePreviewMode,
  interventionStatus,
  match: { params },
}) => {
  const { sessionId } = params;

  const handleClose = () => {
    window.opener = null;
    window.open('', '_self');
    // Safari PLS https://twitter.com/gryzzly/status/177061204114685952
    setTimeout(window.close, 1);
  };

  const changeMode = (mode) => () => changePreviewMode(mode);

  const handleReset = () => onResetIntervention(sessionId);

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

  const previewDisabled = !canPreview(interventionStatus);

  return (
    <Row align="center" justify="between" width="100%">
      <Row>
        <ActionIcon
          onClick={handleClose}
          ariaText={formatMessage(messages.closePreviewText)}
        />
        <Text color="black" fontSize={23}>
          {navbarName}
        </Text>
        <Box mx={20}>
          <PreviewButton
            previewDisabled={previewDisabled}
            handleClick={handleReset}
            text={formatMessage(messages.previewStart)}
          />
        </Box>
      </Row>
      <Row justify="between" align="center">
        {previews.map((preview) => {
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
  session: PropTypes.shape({
    id: PropTypes.string,
  }),
  onResetIntervention: PropTypes.func,
  intl: PropTypes.shape(IntlShape),
  match: PropTypes.object,
  interventionStatus: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  previewMode: makeSelectPreviewMode(),
  interventionStatus: makeSelectInterventionStatus(),
});

const mapDispatchToProps = {
  changePreviewMode: changePreviewModeAction,
  onResetIntervention: resetSession,
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(
  PreviewNavbar,
);
