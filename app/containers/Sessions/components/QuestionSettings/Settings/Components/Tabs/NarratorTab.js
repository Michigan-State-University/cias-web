import React, { useState } from 'react';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Markup } from 'interweave';

import Box from 'components/Box';
import H3 from 'components/H3';
import Row from 'components/Row';
import { FullWidthSwitch } from 'components/Switch';
import Text from 'components/Text';
import lastKey from 'utils/getLastKey';
import { colors, borders, fontSizes, themeColors } from 'theme';
import {
  readQuestionBlockType,
  feedbackBlockType,
  getRemovedBlockForSetting,
} from 'models/Narrator/BlockTypes';
import { DISABLED_NARRATOR_SETTINGS_BY_QUESTION_TYPE } from 'models/Session/utils';
import {
  makeSelectCurrentNarratorBlockIndex,
  changeCurrentNarratorBlock,
} from 'global/reducers/localState';
import { makeSelectSelectedQuestionType } from 'global/reducers/questions';
import { makeSelectQuestionGroupsIds } from 'global/reducers/questionGroups';

import bulb from 'assets/svg/bulb.svg';

import { ConfirmationModal } from 'components/Modal';
import InfoBox from 'components/Box/InfoBox';
import Img from 'components/Img';
import { LI, UL } from 'components/List';
import globalMessages from 'global/i18n/globalMessages';
import BlockTypeChooser from '../BlockTypeChooser';
import WrappedAccordion from '../WrappedAcoordion';
import messages from '../messages';
import { addBlock, updateNarratorSettings } from '../../actions';

const NarratorTab = ({
  formatMessage,
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
}) => {
  const [confirmationOption, setConfirmationOption] = useState('');

  const dismissConfirmation = () => setConfirmationOption('');
  const onConfirm = () => {
    onNarratorToggle(`${confirmationOption}`, false);
    dismissConfirmation();
  };

  if (!narrator) {
    return <></>;
  }

  const onCreateBlock = (type) => {
    onCreate(type, id, groupIds);
    const blocks = narrator?.blocks?.length ?? 0;
    changeNarratorBlockIndex(blocks);
  };

  const toggleAction = (index) => (value) => {
    if (value) onNarratorToggle(`${index}`, value);
    else setConfirmationOption(index);
  };

  const readQuestionBlockTypePresent = Boolean(
    narrator.blocks.find(({ type }) => type === readQuestionBlockType),
  );

  const showSpectrumBlockTypePresent = Boolean(
    narrator.blocks.find(({ type }) => type === feedbackBlockType),
  );

  const last = lastKey(narrator.settings);
  const getBorderBottom = (index) => {
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
              <FormattedMessage {...globalMessages.blockTypes[blockType]} />
            </LI>
          ))}
        </UL>
      </>
    );
  };

  return (
    <>
      <ConfirmationModal
        visible={isConfirmationBoxVisible}
        onClose={dismissConfirmation}
        description={getConfirmationDescription()}
        content={getConfirmationContent()}
        confirmAction={onConfirm}
      />
      <Box mb={20}>
        <InfoBox mb={30}>
          <Text fontSize={fontSizes.medium}>
            <Markup content={formatMessage(messages.warningMessage)} noWrap />
          </Text>
        </InfoBox>
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
              <FullWidthSwitch
                id={index}
                disabled={
                  disabled ||
                  DISABLED_NARRATOR_SETTINGS_BY_QUESTION_TYPE[index]?.includes(
                    questionType,
                  )
                }
                checked={val}
                onToggle={toggleAction(index)}
              >
                <H3>{formatMessage(messages[`${index}`])}</H3>
              </FullWidthSwitch>
            </Row>
          ))}
      </Box>
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
      <WrappedAccordion
        disabled={disabled}
        id={id}
        formatMessage={formatMessage}
        narrator={narrator}
      />
      <BlockTypeChooser
        disabled={disabled}
        questionType={currentQuestionType}
        disableReadQuestionBlockType={readQuestionBlockTypePresent}
        disableFeedbackBlock={showSpectrumBlockTypePresent}
        onClick={onCreateBlock}
      />
    </>
  );
};

NarratorTab.propTypes = {
  formatMessage: PropTypes.func.isRequired,
  id: PropTypes.string,
  narrator: PropTypes.object,
  onNarratorToggle: PropTypes.func.isRequired,
  onCreate: PropTypes.func,
  currentBlockIndex: PropTypes.number,
  currentQuestionType: PropTypes.string,
  disabled: PropTypes.bool,
  groupIds: PropTypes.array,
  questionType: PropTypes.string,
  changeNarratorBlockIndex: PropTypes.func,
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

export default compose(withConnect)(NarratorTab);
