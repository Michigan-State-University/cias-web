import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { intlShape } from 'react-intl';

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
import { makeSelectPreviewMode } from 'containers/AnswerInterventionPage/selectors';
import { makeSelectProblemStatus } from 'global/reducers/intervention';
import {
  changePreviewMode as changePreviewModeAction,
  resetIntervention,
} from 'containers/AnswerInterventionPage/actions';

import { canPreview } from 'models/Status/statusPermissions';
import messages from './messages';

const PreviewNavbar = ({
  intl: { formatMessage },
  navbarName,
  onResetIntervention,
  previewMode,
  changePreviewMode,
  problemStatus,
  match: { params },
}) => {
  const { interventionId, sessionId } = params;
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

  const previewDisabled = !canPreview(problemStatus);

  return (
    <Row align="center" justify="between" width="100%">
      <Row>
        <ActionIcon onClick={handleClose} />
        <Text color="black" fontSize={23}>
          {navbarName}
        </Text>
        <Box mx={20}>
          <PreviewButton
            previewDisabled={previewDisabled}
            to={`/interventions/${interventionId}/sessions/${sessionId}/preview`}
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
  session: PropTypes.shape({
    id: PropTypes.string,
  }),
  onResetIntervention: PropTypes.func,
  intl: intlShape,
  match: PropTypes.object,
  problemStatus: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  previewMode: makeSelectPreviewMode(),
  problemStatus: makeSelectProblemStatus(),
});

const mapDispatchToProps = {
  changePreviewMode: changePreviewModeAction,
  onResetIntervention: resetIntervention,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(PreviewNavbar);
