import React, { memo, useState } from 'react';
import { useIntl } from 'react-intl';

import Checkbox from 'components/Checkbox';
import { Row } from 'components/ReactGridSystem/Row';
import Button from 'components/Button';
import H3 from 'components/H3';
import ApprovableInput from 'components/Input/ApprovableInput';
import ViewWrapper from './ViewWrapper';
import messages from '../messages';

interface Props {
  onClick: (linkType: string, url: string) => void;
}

const ModalView = ({ onClick }: Props) => {
  const { formatMessage } = useIntl();

  const [videoCheckbox, setVideoCheckbox] = useState(false);
  const [websiteCheckbox, setWebsiteCheckbox] = useState(true);
  const [linkType, setLinkType] = useState('website');
  const [url, setUrl] = useState('');

  return (
    <ViewWrapper>
      <Row justify="between" align="center" mb={8}>
        <H3>{formatMessage(messages.checkboxLabel)}</H3>
      </Row>
      <Row justify="between" align="center" mb={15}>
        <Checkbox
          checked={videoCheckbox}
          id="video-checkbox"
          onChange={() => {
            setVideoCheckbox(true);
            setWebsiteCheckbox(false);
            setLinkType('video');
          }}
        >
          {formatMessage(messages.videoCheckbox)}
        </Checkbox>
        <Checkbox
          checked={websiteCheckbox}
          id="website-checkbox"
          onChange={() => {
            setVideoCheckbox(false);
            setWebsiteCheckbox(true);
            setLinkType('website');
          }}
        >
          {formatMessage(messages.websiteCheckbox)}
        </Checkbox>
      </Row>
      <Row justify="between" align="center" mb={8}>
        <H3>{formatMessage(messages.urlLabel)}</H3>
      </Row>
      <Row justify="between" align="center" mb={15}>
        <ApprovableInput
          placeholder={formatMessage(messages.urlPlaceholder)}
          id="modal-view-url"
          transparent={false}
          onValueChange={(value) => {
            setUrl(value);
          }}
          autoSize
        />
      </Row>
      <Row justify="between" align="center" mb={8}>
        <Button onClick={() => onClick(linkType, url)}>
          {formatMessage(messages.saveButton)}
        </Button>
      </Row>
    </ViewWrapper>
  );
};

export default memo(ModalView);
