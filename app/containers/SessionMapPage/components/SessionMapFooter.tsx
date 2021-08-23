import React from 'react';
import { useIntl } from 'react-intl';

import zoomInIcon from 'assets/svg/zoom-in.svg';
import zoomOutIcon from 'assets/svg/zoom-out.svg';

import Comment from 'components/Text/Comment';
import Row from 'components/Row';
import ActionIcon from 'components/ActionIcon';

import messages from '../messages';

const zoomIconSize = 36;

type Props = {
  afterPreview?: boolean;
  zoomIn: () => void;
  zoomOut: () => void;
  zoomInDisabled: boolean;
  zoomOutDisabled: boolean;
};

const SessionMapFooter = ({
  afterPreview,
  zoomIn,
  zoomOut,
  zoomInDisabled,
  zoomOutDisabled,
}: Props): JSX.Element => {
  const { formatMessage } = useIntl();

  return (
    <Row justify="between" align="end" py={20}>
      <Row align="center" />
      <Row align="center">
        {afterPreview && (
          <Comment mr={60}>{formatMessage(messages.afterPreview)}</Comment>
        )}
        {
          // @ts-ignore
          <ActionIcon
            iconSrc={zoomInIcon}
            onClick={zoomIn}
            disabled={zoomInDisabled}
            height={zoomIconSize}
            width={zoomIconSize}
            mr={15}
          />
        }
        {
          // @ts-ignore
          <ActionIcon
            iconSrc={zoomOutIcon}
            onClick={zoomOut}
            disabled={zoomOutDisabled}
            height={zoomIconSize}
            width={zoomIconSize}
            mr={0}
          />
        }
      </Row>
    </Row>
  );
};

export default SessionMapFooter;
