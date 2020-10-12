import React, { useRef, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import Box from 'components/Box';
import Column from 'components/Column';
import HoverableBox from 'components/Box/HoverableBox';
import Row from 'components/Row';
import Text from 'components/Text';
import decideIfPassValue from 'utils/decideIfPassValue';
import globalMessages from 'global/i18n/globalMessages';
import { feedbackQuestion } from 'models/Intervention/QuestionTypes';
import useOutsideClick from 'utils/useOutsideClick';
import { colors, boxShadows, borders, fontSizes } from 'theme';
import {
  blockTypes,
  blockTypeToColorMap,
  readQuestionBlockType,
  feedbackBlockType,
} from 'models/Narrator/BlockTypes';

import messages from './messages';
import { DotCircle, DashedBox } from './styled';

const BlockTypeChooser = ({
  intl: { formatMessage },
  onClick,
  disableReadQuestionBlockType,
  disableFeedbackBlock,
  questionType,
  disabled,
}) => {
  const [typeChooserOpen, setTypeChooserOpen] = useState(false);
  const toggleTypeChooser = () => setTypeChooserOpen(!typeChooserOpen);
  const chooser = useRef(null);

  useOutsideClick(chooser, () => toggleTypeChooser(false), typeChooserOpen);

  const handleClick = type => {
    onClick(type);
    toggleTypeChooser();
  };
  const isFeedbackScreen = questionType === feedbackQuestion.id;

  const visibleBlockTypes = useMemo(() => {
    let filteredBlockTypes = blockTypes;

    if (disableReadQuestionBlockType)
      filteredBlockTypes = blockTypes.filter(
        type => type !== readQuestionBlockType,
      );

    if (disableFeedbackBlock)
      filteredBlockTypes = filteredBlockTypes.filter(
        type => type !== feedbackBlockType,
      );

    if (!isFeedbackScreen)
      filteredBlockTypes = filteredBlockTypes.filter(
        type => type !== feedbackBlockType,
      );

    return filteredBlockTypes;
  }, [disableReadQuestionBlockType, disableFeedbackBlock, isFeedbackScreen]);

  return (
    <Box position="relative" ref={chooser}>
      <DashedBox
        disabled={disabled}
        active={typeChooserOpen}
        mt={14}
        onClick={() => !disabled && toggleTypeChooser()}
      >
        {formatMessage(messages.newStep)}
      </DashedBox>
      {typeChooserOpen && (
        <Box
          borderRadius={10}
          shadow={boxShadows.black}
          position="absolute"
          width="100%"
        >
          <Box
            borderBottom={`${borders.borderWidth} ${borders.borderStyle} ${
              colors.linkWater
            }`}
            padded
          >
            <Text fontWeight="bold" fontSize={fontSizes.regular}>
              {formatMessage(messages.header)}
            </Text>
          </Box>
          <Row>
            <Box padding={8} filled>
              <Column>
                {visibleBlockTypes.map((stepType, i) => (
                  <HoverableBox
                    clickable
                    key={`narrator-block-types-${i}`}
                    onClick={() => handleClick(stepType)}
                    padding={8}
                    mb={decideIfPassValue({
                      index: i,
                      arrayLength: visibleBlockTypes.length,
                      value: 4,
                    })}
                  >
                    <Row align="center">
                      <DotCircle mr={18} bg={blockTypeToColorMap[stepType]} />
                      <Text fontWeight="medium">
                        {formatMessage(globalMessages.blockTypes[stepType])}
                      </Text>
                    </Row>
                  </HoverableBox>
                ))}
              </Column>
            </Box>
          </Row>
        </Box>
      )}
    </Box>
  );
};

BlockTypeChooser.propTypes = {
  intl: PropTypes.object,
  onClick: PropTypes.func.isRequired,
  disableReadQuestionBlockType: PropTypes.bool,
  disableFeedbackBlock: PropTypes.bool,
  questionType: PropTypes.string,
  disabled: PropTypes.bool,
};

export default injectIntl(BlockTypeChooser);
