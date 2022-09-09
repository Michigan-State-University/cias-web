import React, { useState } from 'react';
import { createStructuredSelector } from 'reselect';
import map from 'lodash/map';
import { FormattedMessage, useIntl } from 'react-intl';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Markup } from 'interweave';

import lastKey from 'utils/getLastKey';
import { colors, borders, fontSizes, themeColors } from 'theme';

import { Narrator, NarratorBlockTypes } from 'models/Narrator';
import { getRemovedBlockForSetting } from 'models/Narrator/BlockTypes';
import { DISABLED_NARRATOR_SETTINGS_BY_QUESTION_TYPE } from 'models/Session/utils';
import {
  makeSelectCurrentNarratorBlockIndex,
  changeCurrentNarratorBlock,
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

import BlockTypeChooser from '../BlockTypeChooser';
import WrappedAccordion from '../WrappedAcoordion';
import messages from '../messages';
import { addBlock, updateNarratorSettings } from '../../actions';
import { NarratorSetting } from './NarratorSetting';

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
}: Props) => {
  const [confirmationOption, setConfirmationOption] = useState('');
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

  const toggleAction = (index: string) => (value: boolean | string) => {
    if (value) onNarratorToggle(`${index}`, value);
    else setConfirmationOption(index);
  };

  const readQuestionBlockTypePresent = Boolean(
    narrator.blocks.find(
      ({ type }) => type === NarratorBlockTypes.READ_QUESTION,
    ),
  );

  const showSpectrumBlockTypePresent = Boolean(
    narrator.blocks.find(({ type }) => type === NarratorBlockTypes.FEEDBACK),
  );

  const last = lastKey(narrator.settings);

  const getBorderBottom = (index: string) => {
    if (index === last) return null;
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
      <Box mb={20}>
        {!isTlfbGroup && (
          <InfoBox mb={30}>
            <Text fontSize={fontSizes.medium}>
              {formatMessage(messages.warningMessage)}
            </Text>
          </InfoBox>
        )}
        {narrator &&
          map(narrator.settings, (val, index) => (
            <Row
              key={`${id}-settings-narrator-${index}`}
              justify="between"
              align="center"
              pb={15}
              mb={15}
              borderBottom={getBorderBottom(index)}
            >
              <NarratorSetting
                setting={index}
                disabled={
                  disabled ||
                  // @ts-ignore
                  DISABLED_NARRATOR_SETTINGS_BY_QUESTION_TYPE[index]?.includes(
                    questionType,
                  )
                }
                value={val}
                onChange={toggleAction(index)}
              />
            </Row>
          ))}
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
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(
  NarratorTab,
) as React.ComponentType<NonReduxProps>;
