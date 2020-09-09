import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import Box from 'components/Box';
import Column from 'components/Column';
import HoverableBox from 'components/Box/HoverableBox';
import Row from 'components/Row';
import Text from 'components/Text';
import decideIfPassValue from 'utils/decideIfPassValue';
import globalMessages from 'global/i18n/globalMessages';
import useOutsideClick from 'utils/useOutsideClick';
import { colors, boxShadows, borders, fontSizes } from 'theme';
import {
  blockTypes,
  blockTypeToColorMap,
  readQuestionBlockType,
} from 'models/Narrator/BlockTypes';

import messages from './messages';
import { DotCircle, DashedBox } from './styled';

const BlockTypeChooser = ({
  intl: { formatMessage },
  onClick,
  disableReadQuestionBlockType,
}) => {
  const [typeChooserOpen, setTypeChooserOpen] = useState(false);
  const toggleTypeChooser = () => setTypeChooserOpen(!typeChooserOpen);
  const chooser = useRef(null);

  useOutsideClick(chooser, () => toggleTypeChooser(false), typeChooserOpen);

  const handleClick = type => {
    onClick(type);
    toggleTypeChooser();
  };
  const visibleBlockTypes = disableReadQuestionBlockType
    ? blockTypes.filter(type => type !== readQuestionBlockType)
    : blockTypes;
  return (
    <Box position="relative" ref={chooser}>
      <DashedBox mt={14} onClick={toggleTypeChooser}>
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
};

export default injectIntl(BlockTypeChooser);
