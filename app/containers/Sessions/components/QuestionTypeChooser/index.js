import React, { useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import Box from 'components/Box';
import HoverableBox from 'components/Box/HoverableBox';
import Row from 'components/Row';
import Text from 'components/Text';
import { ScrollFogBox } from 'components/Box/ScrollFog';
import decideIfPassValue from 'utils/decideIfPassValue';
import globalMessages from 'global/i18n/globalMessages';
import { makeSelectNameQuestionExists } from 'global/reducers/questions';
import useOutsideClick from 'utils/useOutsideClick';
import {
  finishQuestion,
  QuestionTypes,
  nameQuestion,
  participantReport,
  thirdPartyQuestion,
} from 'models/Session/QuestionTypes';
import {
  makeSelectParticipantReportQuestionExists,
  makeSelectThirdPartyReportQuestionExists,
} from 'global/reducers/questions/selectors';
import { borders, boxShadows, colors, fontSizes } from 'theme';

import { useDropdownPositionHelper } from 'utils/useDropdownPositionHelper';
import { useChildSizeCalculator } from 'utils/useChildSizeCalculator';
import DefaultButtonComponent from './DefaultButtonComponent';
import messages from './messages';
import { DotCircle } from './styled';

const QuestionTypeChooser = ({
  intl: { formatMessage },
  onClick,
  ButtonComponent,
  nameQuestionExists,
  participantReportExists,
  thirdPartyReportExists,
}) => {
  const buttonRef = useRef(null);
  const containerRef = useRef(null);
  const chooserBoxRef = useRef(null);

  const [typeChooserOpen, setTypeChooserOpen] = useState(false);

  const {
    ref,
    callbackRef,
    positionData: { visible, top, bottom, maxHeight },
  } = useDropdownPositionHelper(buttonRef);

  const { height } = useChildSizeCalculator(ref, containerRef);

  useOutsideClick(
    chooserBoxRef,
    () => setTypeChooserOpen(false),
    typeChooserOpen,
  );

  const toggleTypeChooser = () => setTypeChooserOpen(!typeChooserOpen);

  const handleClick = type => {
    onClick(type);
    toggleTypeChooser();
  };

  const isVisible = visible && height;

  const filteredQuestions = useMemo(
    () =>
      QuestionTypes.filter(
        ({ id }) =>
          id !== finishQuestion.id &&
          !(nameQuestionExists && id === nameQuestion.id) &&
          !(participantReportExists && id === participantReport.id) &&
          !(thirdPartyReportExists && id === thirdPartyQuestion.id),
      ),
    [QuestionTypes, nameQuestionExists, thirdPartyReportExists],
  );

  return (
    <Row data-cy="question-type-chooser">
      <Box position="relative" width="100%" ref={chooserBoxRef}>
        <ButtonComponent onClick={toggleTypeChooser} ref={buttonRef} />
        {typeChooserOpen && (
          <Box
            mt={15}
            bg={colors.white}
            borderRadius={10}
            shadow={boxShadows.black}
            position="absolute"
            width="100%"
            ref={callbackRef}
            top={top}
            bottom={bottom}
            maxHeight={maxHeight}
            visibility={isVisible ? 'visible' : 'hidden'}
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
            <ScrollFogBox
              padding={8}
              width="100%"
              overflow="scroll"
              height={height}
              ref={containerRef}
              horizontalFogVisible={false}
            >
              {filteredQuestions.map((questionType, i) => (
                <HoverableBox
                  key={questionType.id}
                  onClick={() => handleClick(questionType.id)}
                  padding={8}
                  mb={decideIfPassValue({
                    index: i,
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
            </ScrollFogBox>
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
  nameQuestionExists: PropTypes.bool,
  participantReportExists: PropTypes.bool,
  thirdPartyReportExists: PropTypes.bool,
};

QuestionTypeChooser.defaultProps = {
  ButtonComponent: DefaultButtonComponent,
};

const mapStateToProps = createStructuredSelector({
  nameQuestionExists: makeSelectNameQuestionExists(),
  participantReportExists: makeSelectParticipantReportQuestionExists(),
  thirdPartyReportExists: makeSelectThirdPartyReportQuestionExists(),
});

const withConnect = connect(
  mapStateToProps,
  null,
);

export default compose(
  withConnect,
  injectIntl,
)(QuestionTypeChooser);
