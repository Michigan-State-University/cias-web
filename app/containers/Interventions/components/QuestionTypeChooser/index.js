import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import Column from 'components/Column';
import Row from 'components/Row';
import Box from 'components/Box';
import Text from 'components/Text';
import HoverableBox from 'components/Box/HoverableBox';
import decideIfPassValue from 'utils/decideIfPassValue';
import useOutsideClick from 'utils/useOutsideClick';

import { QuestionTypes } from 'models/Intervention/QuestionTypes';
import { colors, boxShadows, borders, fontSizes } from 'theme';
import globalMessages from 'global/i18n/globalMessages';
import messages from './messages';
import { DotCircle } from './styled';

import DefaultButtonComponent from './DefaultButtonComponent';

const QuestionTypeChooser = ({
  intl: { formatMessage },
  onClick,
  ButtonComponent,
}) => {
  const dropdownRef = useRef(null);

  const [typeChooserOpen, setTypeChooserOpen] = useState(false);

  const toggleTypeChooser = () => setTypeChooserOpen(!typeChooserOpen);

  useOutsideClick(
    dropdownRef,
    () => setTypeChooserOpen(false),
    typeChooserOpen,
  );

  const handleClick = type => {
    onClick(type);
    toggleTypeChooser();
  };

  return (
    <Row ref={dropdownRef}>
      <Box position="relative" width="100%">
        <ButtonComponent onClick={toggleTypeChooser} />
        {typeChooserOpen && (
          <Box
            borderRadius={10}
            shadow={boxShadows.black}
            position="absolute"
            width="100%"
            mt={15}
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
              <Box padding={8} width="100%">
                <Column>
                  {QuestionTypes.map((questionType, i) => (
                    <HoverableBox
                      key={questionType.id}
                      onClick={() => handleClick(questionType.id)}
                      padding={8}
                      mb={decideIfPassValue({
                        inedx: i,
                        arrayLength: QuestionTypes.length,
                        value: 4,
                      })}
                    >
                      <Row align="center">
                        <DotCircle mr={18} bg={questionType.color} />
                        <Text fontWeight="medium">
                          {formatMessage(
                            globalMessages.questionTypes[questionType.id],
                          )}
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
    </Row>
  );
};

QuestionTypeChooser.propTypes = {
  intl: PropTypes.object,
  onClick: PropTypes.func.isRequired,
  ButtonComponent: PropTypes.elementType,
};

QuestionTypeChooser.defaultProps = {
  ButtonComponent: DefaultButtonComponent,
};

export default injectIntl(QuestionTypeChooser);
