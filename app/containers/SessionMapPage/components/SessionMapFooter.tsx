import React, { useState } from 'react';
import { useIntl } from 'react-intl';

import zoomInIcon from 'assets/svg/zoom-in.svg';
import zoomOutIcon from 'assets/svg/zoom-out.svg';

import Comment from 'components/Text/Comment';
import Row from 'components/Row';
import ActionIcon from 'components/ActionIcon';
import Button from 'components/Button';
import Loader from 'components/Loader';
import Checkbox from 'components/Checkbox';

import messages from '../messages';
import { useDownloadSessionMap } from './SessionMap/useDownloadMap';

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
  const { isGenerating, downloadAsync } = useDownloadSessionMap();
  const [withBackground, setWithBackground] = useState(false);

  const handleDownload = () => downloadAsync(withBackground);

  return (
    <Row justify="between" align="end" pt={20}>
      {/* @ts-ignore */}
      {isGenerating && <Loader />}

      <Row align="center" gap={10}>
        {/* @ts-ignore */}
        <Button onClick={handleDownload} loading={isGenerating} px={30}>
          {formatMessage(messages.downloadSessionMap)}
        </Button>

        <Checkbox
          id="with-background"
          checked={withBackground}
          onChange={setWithBackground}
        >
          {formatMessage(messages.withBackgroundCheckbox)}
        </Checkbox>
      </Row>

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
            ariaText={formatMessage(messages.zoomInLabel)}
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
            ariaText={formatMessage(messages.zoomOutLabel)}
            mr={0}
          />
        }
      </Row>
    </Row>
  );
};

export default SessionMapFooter;
