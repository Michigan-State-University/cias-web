import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import Modal from 'components/Modal';
import Box from 'components/Box';
import Img from 'components/Img';
import Divider from 'components/Divider';
import Row from 'components/Row';
import Button from 'components/Button';
import { Table, THead, TBody, TR, TH, StripedTR, TD } from 'components/Table';
import Text from 'components/Text';

import animationMessages from 'containers/Sessions/components/QuestionSettings/Settings/Components/Blocks/messages';
import { colors, themeColors } from 'theme';
import questionMarkIcon from 'assets/svg/question-mark-square.svg';
import globalMessages from 'global/i18n/globalMessages';

import messages from './messages';
import { MissingAnimationReplacement } from '../types';

const MODAL_WIDTH = '480px';

type Props = {
  onClose: () => void;
  onChangeNarrator: () => void;
  visible: boolean;
  animations: MissingAnimationReplacement[];
};

export const MissingAnimationsModal = ({
  onClose,
  onChangeNarrator,
  visible,
  animations,
}: Props) => {
  const { formatMessage } = useIntl();
  return (
    <Modal
      title={formatMessage(messages.missingAnimationsModalTitle)}
      onClose={onClose}
      visible={visible}
      width={MODAL_WIDTH}
      maxWidth="100%"
      description={formatMessage(
        messages.missingAnimationsModalTitleDescription,
      )}
      titleIcon={
        <Img
          src={questionMarkIcon}
          alt={formatMessage(messages.modalIconAlt)}
        />
      }
      titleIconWidth={40}
    >
      <Box>
        <Divider mt={16} mb={32} color={colors.lightDivider} />
        <Table width="100%">
          <THead>
            <TR height={46}>
              <TH padding={8}>
                <Text
                  textAlign="left"
                  textOpacity={0.7}
                  color={themeColors.text}
                >
                  <FormattedMessage
                    {...messages.missingAnimationColumnHeader}
                  />
                </Text>
              </TH>
              <TH padding={8}>
                <Text
                  textAlign="left"
                  textOpacity={0.7}
                  color={themeColors.text}
                >
                  <FormattedMessage
                    {...messages.replacementAnimationColumnHeader}
                  />
                </Text>
              </TH>
            </TR>
          </THead>
          <TBody>
            {animations.map((animation, index) => (
              <StripedTR
                key={`${animation.from}-${index}`}
                height={32}
                stripesPlacement="odd"
                color={colors.linkWater}
              >
                <TD padding={8}>
                  <FormattedMessage
                    {...animationMessages[
                      animation.from as keyof typeof animationMessages
                    ]}
                  />
                </TD>
                <TD padding={8}>
                  <FormattedMessage
                    {...animationMessages[
                      animation.to as keyof typeof animationMessages
                    ]}
                  />
                </TD>
              </StripedTR>
            ))}
          </TBody>
        </Table>
        <Row gap={16} mt={56}>
          <Button
            // @ts-ignore
            px={30}
            width="auto"
            title={formatMessage(messages.changeNarratorButton)}
            onClick={onChangeNarrator}
          />
          <Button
            // @ts-ignore
            px={30}
            width="auto"
            light
            title={formatMessage(globalMessages.cancel)}
            onClick={onClose}
          />
        </Row>
      </Box>
    </Modal>
  );
};

export default MissingAnimationsModal;
