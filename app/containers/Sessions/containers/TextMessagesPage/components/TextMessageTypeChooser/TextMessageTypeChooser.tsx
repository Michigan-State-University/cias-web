import React, { memo } from 'react';
import { useIntl } from 'react-intl';
import { Markup } from 'interweave';

import { TextMessageType } from 'models/TextMessage';

import { colors } from 'theme';

import { Tooltip } from 'components/Tooltip';
import Circle from 'components/Circle';
import Radio from 'components/Radio';
import { Col } from 'components/ReactGridSystem';
import Row from 'components/Row';
import Text from 'components/Text';

import messages from './messages';
import {
  ALERT_FOR_THIRD_PARTY_LABEL_ID,
  INFORMATION_FOR_PARTICIPANT_LABEL_ID,
  SMS_TYPE_TOOLTIP_ID,
} from './constants';

export type Props = {
  type: TextMessageType;
  onTypeChange: (newType: TextMessageType) => void;
  disabled: boolean;
};

const TextMessageTypeChooserComponent = ({
  type,
  onTypeChange,
  disabled,
}: Props): JSX.Element => {
  const { formatMessage } = useIntl();

  const onInformationForParticipantChange = () =>
    onTypeChange(TextMessageType.NORMAL);

  const onAlertForThirdPartyChange = () => onTypeChange(TextMessageType.ALERT);

  return (
    <>
      <Row align="center" gap={24} mb={24}>
        <Text fontSize={18} fontWeight="bold">
          {formatMessage(messages.typeOfTheSMS)}
        </Text>
        {/* @ts-ignore */}
        <Tooltip
          id={SMS_TYPE_TOOLTIP_ID}
          content={
            <Markup content={formatMessage(messages.typeOfTheSMSTooltip)} />
          }
        >
          <Circle
            bg={colors.grey}
            color={colors.white}
            size="18px"
            fontWeight="bold"
            fontSize={13}
            child="?"
          />
        </Tooltip>
      </Row>
      <Row mb={16}>
        <Col>
          <Radio
            id={INFORMATION_FOR_PARTICIPANT_LABEL_ID}
            onChange={onInformationForParticipantChange}
            checked={type === TextMessageType.NORMAL}
            disabled={disabled}
          >
            <Text>
              {formatMessage(messages.informationForParticipantLabel)}
            </Text>
          </Radio>
        </Col>

        <Col>
          <Radio
            id={ALERT_FOR_THIRD_PARTY_LABEL_ID}
            onChange={onAlertForThirdPartyChange}
            checked={type === TextMessageType.ALERT}
            disabled={disabled}
          >
            <Text>{formatMessage(messages.alertForThirdPartyLabel)}</Text>
          </Radio>
        </Col>
      </Row>
    </>
  );
};

export const TextMessageTypeChooser = memo(TextMessageTypeChooserComponent);
