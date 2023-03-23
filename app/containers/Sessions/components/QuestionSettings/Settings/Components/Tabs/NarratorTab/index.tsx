import React, { useState } from 'react';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage, useIntl } from 'react-intl';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Markup } from 'interweave';
import isEqual from 'lodash/isEqual';

import lastKey from 'utils/getLastKey';
import {
  getAvailableBlockAnimations,
  getDefaultBlockAnimation,
} from 'utils/animations/animationsNames';

import { borders, colors, fontSizes, themeColors } from 'theme';

import { CHARACTER_CONFIGS, CharacterType } from 'models/Character';
import {
  CONFIRMED_OFF_SETTINGS,
  Narrator,
  NarratorBlock,
  NarratorBlockTypes,
  NarratorSettingsKey,
  narratorSettingsToSortedEntries,
} from 'models/Narrator';
import { getRemovedBlockForSetting } from 'models/Narrator/BlockTypes';
import { DISABLED_NARRATOR_SETTINGS_BY_QUESTION_TYPE } from 'models/Session/utils';
import {
  changeCurrentNarratorBlock,
  makeSelectCurrentNarratorBlockIndex,
  setAnimationStopPosition,
} from 'global/reducers/localState';
import { makeSelectSelectedQuestionType } from 'global/reducers/questions';
import { makeSelectQuestionGroupsIds } from 'global/reducers/questionGroups';
import globalMessages from 'global/i18n/globalMessages';

import bulb from 'assets/svg/bulb.svg';

import Box from 'components/Box';
import Row from 'components/Row';
import Text from 'components/Text';
import { ConfirmationModal } from 'components/Modal';
import InfoBox from 'components/Box/InfoBox';
import Img from 'components/Img';
import { LI, UL } from 'components/List';
import {
  MissingAnimationModalData,
  MissingAnimationReplacement,
  MissingAnimationsModal,
} from 'components/MissingAnimationsModal/';

import BlockTypeChooser from '../../BlockTypeChooser';
import WrappedAccordion from '../../WrappedAcoordion';
import messages from '../../messages';
import {
  addBlock,
  updateEntireNarrator,
  updateNarratorSettings,
} from '../../../actions';
import { NarratorSetting } from '../NarratorSetting';
import { getBlocksFittingDraggableContainer } from './utils';

type NonReduxProps = {
  disabled: boolean;
  narrator: Narrator;
  questionType: string;
  isTlfbGroup: boolean;
  id: string;
};

type Props = {
  id: string;
  onNarratorToggle: (property: string, value: boolean | string) => void;
  onCreate: (type: NarratorBlockTypes, id: string, groupIds: string[]) => void;
  currentBlockIndex: number;
  currentQuestionType: NarratorBlockTypes;
  disabled: boolean;
  groupIds: string[];
  changeNarratorBlockIndex: (index: number) => void;
  updateNarrator: (newNarrator: Narrator) => void;
  setOffset: (x: number, y: number) => void;
} & NonReduxProps;

const NarratorTab = ({
  narrator,
  onNarratorToggle,
  onCreate,
  id,
  currentBlockIndex,
  currentQuestionType,
  disabled,
  groupIds,
  questionType,
  changeNarratorBlockIndex,
  isTlfbGroup,
  updateNarrator,
  setOffset,
}: Props) => {
  const [confirmationOption, setConfirmationOption] = useState('');
  const [missingAnimationModalState, setMissingAnimationModalState] =
    useState<Nullable<MissingAnimationModalData & { newSize: boolean }>>(null);
  const { formatMessage } = useIntl();

  const dismissConfirmation = () => setConfirmationOption('');

  const onConfirm = () => {
    onNarratorToggle(`${confirmationOption}`, false);
    dismissConfirmation();
  };

  if (!narrator) {
    return <></>;
  }

  const onCreateBlock = (type: NarratorBlockTypes) => {
    onCreate(type, id, groupIds);
    const blocks = narrator?.blocks?.length ?? 0;
    changeNarratorBlockIndex(blocks);
  };

  const getMissingAnimationsList = (
    character: CharacterType,
  ): MissingAnimationModalData => {
    const missingAnimations: MissingAnimationReplacement[] = [];
    const newBlocks =
      narrator.blocks?.map((block) => {
        const { type, animation } = block;
        const newNarratorAnimations =
          getAvailableBlockAnimations(character, type) || [];
        if (
          newNarratorAnimations?.length &&
          !newNarratorAnimations?.includes(animation)
        ) {
          const outcomeAnimation = getDefaultBlockAnimation(character, type);
          missingAnimations.push({
            from: animation,
            to: outcomeAnimation,
            availableAnimations: newNarratorAnimations,
          });
          return { ...block, animation: outcomeAnimation };
        }
        return block;
      }) || [];

    return {
      missingAnimations,
      newNarrator: {
        blocks: newBlocks as NarratorBlock[],
        settings: { ...narrator.settings, character },
      },
    };
  };

  const moveNarratorPreview = (blocks: NarratorBlock[]) => {
    if (currentBlockIndex === -1) return;
    const { x, y } = blocks[currentBlockIndex].endPosition;
    setOffset(x, y);
  };

  const mapNewAnimationReplacements = (
    newNarrator: Narrator,
    replacementAnimations: MissingAnimationReplacement[],
  ) => {
    if (
      isEqual(
        replacementAnimations,
        missingAnimationModalState?.missingAnimations,
      )
    )
      return newNarrator;

    const newBlocks = narrator.blocks.map((block) => {
      const replacement = replacementAnimations.find(
        ({ from }) => from === block.animation,
      );

      if (replacement)
        return {
          ...block,
          animation: replacement.to,
        };
      return block;
    });

    return { ...newNarrator, blocks: newBlocks as NarratorBlock[] };
  };

  const onNarratorChangeConfirm = (
    newAnimationState: MissingAnimationReplacement[],
  ) => {
    if (missingAnimationModalState) {
      const { newNarrator, newSize } = missingAnimationModalState;
      updateNarrator(
        mapNewAnimationReplacements(newNarrator, newAnimationState),
      );
      if (newSize) {
        moveNarratorPreview(newNarrator.blocks);
      }
      setMissingAnimationModalState(null);
    }
  };

  const toggleAction =
    (settingKey: NarratorSettingsKey) => (value: boolean | string) => {
      if (settingKey === NarratorSettingsKey.CHARACTER) {
        const { newNarrator, missingAnimations } = getMissingAnimationsList(
          value as CharacterType,
        );

        const oldCharacterSize =
          CHARACTER_CONFIGS[narrator.settings.character].size;
        const newCharacterSize = CHARACTER_CONFIGS[value as CharacterType].size;

        const hasNewCharacterDifferentSize = !isEqual(
          oldCharacterSize,
          newCharacterSize,
        );

        if (hasNewCharacterDifferentSize) {
          newNarrator.blocks = getBlocksFittingDraggableContainer(
            newNarrator.blocks,
            newCharacterSize,
          );
        }

        if (missingAnimations.length > 0) {
          setMissingAnimationModalState({
            newNarrator,
            missingAnimations,
            newSize: hasNewCharacterDifferentSize,
          });
          return;
        }

        if (hasNewCharacterDifferentSize) {
          updateNarrator(newNarrator);
          moveNarratorPreview(newNarrator.blocks);
          return;
        }
      }
      if (value || !CONFIRMED_OFF_SETTINGS.includes(settingKey))
        onNarratorToggle(`${settingKey}`, value);
      else setConfirmationOption(settingKey);
    };

  const readQuestionBlockTypePresent = Boolean(
    narrator.blocks.find(
      ({ type }) => type === NarratorBlockTypes.READ_QUESTION,
    ),
  );

  const showSpectrumBlockTypePresent = Boolean(
    narrator.blocks.find(({ type }) => type === NarratorBlockTypes.FEEDBACK),
  );

  const lastSettingKey = lastKey(narrator.settings);

  const getBorderBottom = (settingKey: NarratorSettingsKey) => {
    if (settingKey === lastSettingKey) return null;
    return `${borders.borderWidth} ${borders.borderStyle} ${colors.linkWater}`;
  };

  const isCharacterMovable = currentBlockIndex !== -1;
  const isConfirmationBoxVisible = confirmationOption !== '';

  const getConfirmationDescription = () => {
    if (!isConfirmationBoxVisible) return null;
    return (
      <FormattedMessage
        {...messages.blockRemovalConfirmation}
        values={{
          setting: formatMessage(
            // @ts-ignore
            globalMessages.animationSettings[confirmationOption],
          ),
        }}
      />
    );
  };

  const getConfirmationContent = () => {
    if (!isConfirmationBoxVisible) return null;
    return (
      <>
        <FormattedMessage {...messages.blockRemovalConfirmationDescription} />
        <UL>
          {getRemovedBlockForSetting(confirmationOption).map((blockType) => (
            <LI key={blockType}>
              {/* @ts-ignore */}
              <FormattedMessage {...globalMessages.blockTypes[blockType]} />
            </LI>
          ))}
        </UL>
      </>
    );
  };

  return (
    <>
      {/* @ts-ignore */}
      <ConfirmationModal
        visible={isConfirmationBoxVisible}
        onClose={dismissConfirmation}
        description={getConfirmationDescription()}
        content={getConfirmationContent()}
        confirmAction={onConfirm}
      />
      <MissingAnimationsModal
        animations={missingAnimationModalState?.missingAnimations || []}
        visible={missingAnimationModalState !== null}
        onClose={() => setMissingAnimationModalState(null)}
        onChangeNarrator={onNarratorChangeConfirm}
      />
      <Box mb={20}>
        {!isTlfbGroup && (
          <InfoBox mb={30}>
            <Text fontSize={fontSizes.medium}>
              {formatMessage(messages.warningMessage)}
            </Text>
          </InfoBox>
        )}
        {narrator &&
          narratorSettingsToSortedEntries(narrator.settings).map(
            ([settingKey, settingValue]) => (
              <Row
                key={`${id}-settings-narrator-${settingKey}`}
                justify="between"
                align="center"
                pb={15}
                mb={15}
                borderBottom={getBorderBottom(settingKey)}
              >
                <NarratorSetting
                  setting={settingKey}
                  disabled={
                    disabled ||
                    // @ts-ignore
                    DISABLED_NARRATOR_SETTINGS_BY_QUESTION_TYPE[
                      settingKey
                    ]?.includes(questionType)
                  }
                  value={settingValue}
                  onChange={toggleAction(settingKey)}
                />
              </Row>
            ),
          )}
      </Box>
      {!isTlfbGroup && (
        <InfoBox mb={15}>
          <Row>
            <Img src={bulb} mr={10} />
            <Text
              fontSize={fontSizes.medium}
              color={
                isCharacterMovable && !disabled
                  ? colors.jungleGreen
                  : themeColors.warning
              }
            >
              <Markup
                content={
                  disabled
                    ? formatMessage(messages.characterMoveDisabled)
                    : formatMessage(messages.characterBlocked)
                }
                noWrap
              />
            </Text>
          </Row>
        </InfoBox>
      )}
      <WrappedAccordion
        disabled={disabled}
        id={id}
        narrator={narrator}
        isTlfbGroup={isTlfbGroup}
        groupIds={groupIds}
      />
      <BlockTypeChooser
        // @ts-ignore
        disabled={disabled}
        questionType={currentQuestionType}
        disableReadQuestionBlockType={readQuestionBlockTypePresent}
        disableFeedbackBlock={showSpectrumBlockTypePresent}
        onClick={onCreateBlock}
      />
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  currentBlockIndex: makeSelectCurrentNarratorBlockIndex(),
  currentQuestionType: makeSelectSelectedQuestionType(),
  groupIds: makeSelectQuestionGroupsIds(),
});

const mapDispatchToProps = {
  onCreate: addBlock,
  onNarratorToggle: updateNarratorSettings,
  changeNarratorBlockIndex: changeCurrentNarratorBlock,
  updateNarrator: updateEntireNarrator,
  setOffset: setAnimationStopPosition,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(
  NarratorTab,
) as React.ComponentType<NonReduxProps>;
