import React, { memo, useState } from 'react';
import { useIntl } from 'react-intl';

import { Row } from 'components/ReactGridSystem/Row';
import Button from 'components/Button';
import H3 from 'components/H3';
import ApprovableInput from 'components/Input/ApprovableInput';
import Radio from 'components/Radio';
import BadgeInput from 'components/Input/BadgeInput';
import { variableNameValidator } from 'utils/validators';
import globalMessages from 'global/i18n/globalMessages';
import { colors } from 'theme/colors';
import messages from '../messages';
import ViewWrapper from './ViewWrapper';

interface Props {
  onClick: (linkType: string, url: string, variable: string) => void;
}

const ModalView = ({ onClick }: Props) => {
  const { formatMessage } = useIntl();

  const [videoCheckbox, setVideoCheckbox] = useState(false);
  const [websiteCheckbox, setWebsiteCheckbox] = useState(true);
  const [linkType, setLinkType] = useState('website');
  const [url, setUrl] = useState('');
  const [variable, setVariable] = useState('');

  return (
    <ViewWrapper>
      <Row justify="between" align="center" mb={8}>
        <H3>{formatMessage(messages.checkboxLabel)}</H3>
      </Row>
      <Row justify="between" align="center" mb={15}>
        <Radio
          checked={videoCheckbox}
          id="video-checkbox"
          onChange={() => {
            setVideoCheckbox(true);
            setWebsiteCheckbox(false);
            setLinkType('video');
          }}
        >
          {formatMessage(messages.videoCheckbox)}
        </Radio>
        <Radio
          checked={websiteCheckbox}
          id="website-checkbox"
          onChange={() => {
            setVideoCheckbox(false);
            setWebsiteCheckbox(true);
            setLinkType('website');
          }}
        >
          {formatMessage(messages.websiteCheckbox)}
        </Radio>
      </Row>
      <Row justify="between" align="center" mb={15}>
        <BadgeInput
          textAlign="center"
          validator={variableNameValidator}
          placeholder={formatMessage(globalMessages.variableNamePlaceholder)}
          color={colors.jungleGreen}
          onBlur={(value: string) => {
            setVariable(value);
          }}
          autoComplete="off"
        />
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
        <Button onClick={() => onClick(linkType, url, variable)}>
          {formatMessage(messages.saveButton)}
        </Button>
      </Row>
    </ViewWrapper>
  );
};

export default memo(ModalView);
