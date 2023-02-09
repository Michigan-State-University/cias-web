import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import difference from 'lodash/difference';

import { colors, themeColors } from 'theme';
import questionMarkIcon from 'assets/svg/question-mark-square.svg';
import globalMessages from 'global/i18n/globalMessages';
import {
  characterToSpeechAnimationsMap,
  getBodyAnimations,
  getDefaultBlockAnimation,
  getHeadAnimations,
} from 'utils/animations';
import { CharacterType } from 'models/Character';
import { NarratorAnimation, NarratorBlockTypes } from 'models/Narrator';

import Modal from 'components/Modal';
import Box from 'components/Box';
import Img from 'components/Img';
import Divider from 'components/Divider';
import Row from 'components/Row';
import Button from 'components/Button';
import BoxCollapse from 'components/BoxCollapse';

import messages from './messages';
import { MissingAnimationReplacement } from './types';
import AnimationsTable from './AnimationsTable';
import { getAnimationReplacement } from './utils';

const MODAL_WIDTH = '480px';

type Props = {
  onClose: () => void;
  onChangeNarrator: (
    animationReplacement: Record<
      string,
      Record<NarratorAnimation, NarratorAnimation>
    >,
  ) => void;
  visible: boolean;
  sourceNarrator: CharacterType;
  destinationNarrator: CharacterType;
};

export const GlobalReplacementModal = ({
  onClose,
  onChangeNarrator,
  visible,
  sourceNarrator,
  destinationNarrator,
}: Props) => {
  const { formatMessage } = useIntl();

  const mapMissingAnimations = (
    oldNarratorAnimations: NarratorAnimation[],
    newNarratorAnimations: NarratorAnimation[],
    defaultAnimation: NarratorAnimation,
  ) => {
    const missingAnimations = difference(
      oldNarratorAnimations,
      newNarratorAnimations,
    );
    return missingAnimations.map((animation) => ({
      from: animation,
      to: defaultAnimation,
      availableAnimations: newNarratorAnimations,
    }));
  };

  const getNarratorsHeadAnimations = (
    fromNarrator: CharacterType,
    toNarrator: CharacterType,
  ) => {
    const otherNarratorAnimations = getHeadAnimations(toNarrator);
    const narratorAnimations = getHeadAnimations(fromNarrator);
    const defaultAnimation = getDefaultBlockAnimation(
      toNarrator,
      NarratorBlockTypes.HEAD_ANIMATION,
    );
    return mapMissingAnimations(
      narratorAnimations,
      otherNarratorAnimations,
      defaultAnimation,
    );
  };

  const getNarratorBodyAnimations = (
    fromNarrator: CharacterType,
    toNarrator: CharacterType,
  ) => {
    const otherNarratorAnimations = getBodyAnimations(toNarrator);
    const narratorAnimations = getBodyAnimations(fromNarrator);
    const defaultAnimation = getDefaultBlockAnimation(
      toNarrator,
      NarratorBlockTypes.BODY_ANIMATION,
    );
    return mapMissingAnimations(
      narratorAnimations,
      otherNarratorAnimations,
      defaultAnimation,
    );
  };

  const getNarratorSpeechAnimations = (
    fromNarrator: CharacterType,
    toNarrator: CharacterType,
  ) => {
    const otherNarratorAnimations = characterToSpeechAnimationsMap[toNarrator];
    const narratorAnimations = characterToSpeechAnimationsMap[fromNarrator];
    const defaultAnimation = getDefaultBlockAnimation(
      toNarrator,
      NarratorBlockTypes.SPEECH,
    );
    return mapMissingAnimations(
      narratorAnimations,
      otherNarratorAnimations,
      defaultAnimation,
    );
  };

  const [headAnimationsState, setHeadAnimationsState] = useState<
    MissingAnimationReplacement[]
  >([]);
  const [bodyAnimationsState, setBodyAnimationState] = useState<
    MissingAnimationReplacement[]
  >([]);
  const [speechAnimationsState, setSpeechAnimationState] = useState<
    MissingAnimationReplacement[]
  >([]);

  const updateNarrator = () => {
    const headAnimationReplacement =
      getAnimationReplacement(headAnimationsState);
    const bodyAnimationReplacement =
      getAnimationReplacement(bodyAnimationsState);
    const speechAnimationReplacement = getAnimationReplacement(
      speechAnimationsState,
    );

    onChangeNarrator({
      HeadAnimation: headAnimationReplacement,
      BodyAnimation: bodyAnimationReplacement,
      SpeechAnimation: speechAnimationReplacement,
    });
    onClose();
  };

  useEffect(() => {
    if (!sourceNarrator || !destinationNarrator) return;
    setHeadAnimationsState(
      getNarratorsHeadAnimations(sourceNarrator, destinationNarrator),
    );
    setBodyAnimationState(
      getNarratorBodyAnimations(sourceNarrator, destinationNarrator),
    );
    setSpeechAnimationState(
      getNarratorSpeechAnimations(sourceNarrator, destinationNarrator),
    );
  }, [sourceNarrator, destinationNarrator]);

  const updateNewAnimationState = (
    updater: React.Dispatch<
      React.SetStateAction<MissingAnimationReplacement[]>
    >,
    sourceAnimation: NarratorAnimation,
    newOutcomeAnimation: NarratorAnimation,
  ) => {
    updater((currentState) =>
      currentState.map((stateAnimation) => {
        if (sourceAnimation !== stateAnimation.from) return stateAnimation;
        return { ...stateAnimation, to: newOutcomeAnimation };
      }),
    );
  };

  const wrapWithBoxCollapse = (children: React.ReactNode, label: string) => (
    <BoxCollapse
      arrowColor={themeColors.secondary}
      mb={8}
      label={label}
      bg={colors.white}
      labelOpenBgColor={colors.linkWaterDark}
      labelPadding={8}
    >
      {children}
    </BoxCollapse>
  );

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
        {headAnimationsState.length !== 0 &&
          wrapWithBoxCollapse(
            <AnimationsTable
              updater={setHeadAnimationsState}
              updateAnimations={updateNewAnimationState}
              tableAnimations={headAnimationsState}
            />,
            formatMessage(messages.headAnimation),
          )}
        {bodyAnimationsState.length !== 0 &&
          wrapWithBoxCollapse(
            <AnimationsTable
              updater={setBodyAnimationState}
              updateAnimations={updateNewAnimationState}
              tableAnimations={bodyAnimationsState}
            />,
            formatMessage(messages.bodyAnimation),
          )}
        {speechAnimationsState.length !== 0 &&
          wrapWithBoxCollapse(
            <AnimationsTable
              updater={setSpeechAnimationState}
              updateAnimations={updateNewAnimationState}
              tableAnimations={speechAnimationsState}
            />,
            formatMessage(messages.speechAnimations),
          )}
        <Row gap={16} mt={56}>
          <Button
            // @ts-ignore
            px={30}
            width="auto"
            title={formatMessage(messages.changeNarratorButton)}
            onClick={updateNarrator}
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

export default GlobalReplacementModal;
