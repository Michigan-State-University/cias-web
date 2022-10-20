import React, { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import Modal from 'components/Modal';
import Box from 'components/Box';
import Img from 'components/Img';
import Divider from 'components/Divider';
import Row from 'components/Row';
import Button from 'components/Button';
import { Table, THead, TBody, TR, TH } from 'components/Table';
import Text from 'components/Text';

import { colors, themeColors } from 'theme';
import questionMarkIcon from 'assets/svg/question-mark-square.svg';
import globalMessages from 'global/i18n/globalMessages';

import { NarratorAnimation } from 'models/Narrator';
import messages from './messages';
import { MissingAnimationReplacement } from '../types';
import SingleAnimationRow from './SingleAnimationRow';

const MODAL_WIDTH = '480px';

type Props = {
  onClose: () => void;
  onChangeNarrator: (
    animationReplacement: MissingAnimationReplacement[],
  ) => void;
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
  const [newAnimationState, setNewAnimationState] = useState(animations);

  useEffect(() => {
    setNewAnimationState(animations);
  }, [animations]);

  const updateNewAnimationState = (
    newOutcomeAnimation: NarratorAnimation,
    indexToChange: number,
  ) => {
    setNewAnimationState((currentState) =>
      currentState.map((stateAnimation, index) => {
        if (indexToChange !== index) return stateAnimation;
        return { ...stateAnimation, to: newOutcomeAnimation };
      }),
    );
  };

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
            {newAnimationState.map((animation, index) => (
              <SingleAnimationRow
                animation={animation}
                key={`${animation.from}-${index}`}
                updateAnimation={updateNewAnimationState}
                index={index}
              />
            ))}
          </TBody>
        </Table>
        <Row gap={16} mt={56}>
          <Button
            // @ts-ignore
            px={30}
            width="auto"
            title={formatMessage(messages.changeNarratorButton)}
            onClick={() => onChangeNarrator(newAnimationState)}
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
