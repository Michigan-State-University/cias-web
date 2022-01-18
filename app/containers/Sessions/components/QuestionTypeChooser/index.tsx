import React, { useMemo, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import Box from 'components/Box';
import Row from 'components/Row';
import Text from 'components/Text';
import { ScrollFogBox } from 'components/Box/ScrollFog';
import globalMessages from 'global/i18n/globalMessages';
import {
  makeSelectNameQuestionExists,
  makeSelectParticipantReportQuestionExists,
  makeSelectPhoneQuestionExists,
} from 'global/reducers/questions';
import useOutsideClick from 'utils/useOutsideClick';
import {
  AddableQuestionTypes,
  nameQuestion,
  participantReport,
  phoneQuestion,
} from 'models/Session/QuestionTypes';
import { AddableGroups } from 'models/QuestionGroup';

import { borders, boxShadows, colors, fontSizes } from 'theme';

import { useDropdownPositionHelper } from 'utils/useDropdownPositionHelper';
import { useChildSizeCalculator } from 'utils/useChildSizeCalculator';
import DefaultButtonComponent from './DefaultButtonComponent';
import messages from './messages';
import NewItem from './NewItem';

type NonReduxProps = {
  onClick: (type: string) => void;
  ButtonComponent?: React.ReactNode;
};

type Props = {
  nameQuestionExists: boolean;
  participantReportExists: boolean;
  phoneQuestionExists: boolean;
} & NonReduxProps;

const QuestionTypeChooser = ({
  onClick,
  ButtonComponent = DefaultButtonComponent,
  nameQuestionExists,
  participantReportExists,
  phoneQuestionExists,
}: Props) => {
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

  const { formatMessage } = useIntl();

  const toggleTypeChooser = () => setTypeChooserOpen(!typeChooserOpen);

  const handleClick = (type: string) => {
    onClick(type);
    toggleTypeChooser();
  };

  const isVisible = visible && height;

  const filteredQuestions = useMemo(
    () =>
      AddableQuestionTypes.filter(
        ({ id }) =>
          !(nameQuestionExists && id === nameQuestion.id) &&
          !(participantReportExists && id === participantReport.id) &&
          !(phoneQuestionExists && id === phoneQuestion.id),
      ),
    [
      AddableQuestionTypes,
      nameQuestionExists,
      participantReportExists,
      phoneQuestionExists,
    ],
  );

  return (
    <Row data-cy="question-type-chooser">
      <Box position="relative" width="100%" ref={chooserBoxRef}>
        {/* @ts-ignore */}
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
              borderBottom={`${borders.borderWidth} ${borders.borderStyle} ${colors.linkWater}`}
              padded
            >
              <Text fontWeight="bold" fontSize={fontSizes.regular}>
                {formatMessage(messages.header)}
              </Text>
            </Box>
            {/* @ts-ignore */}
            <ScrollFogBox
              padding={8}
              width="100%"
              overflow="scroll"
              height={height}
              ref={containerRef}
              horizontalFogVisible={false}
            >
              {filteredQuestions.map(({ color, id }) => (
                <NewItem
                  key={id}
                  color={color}
                  handleClick={() => handleClick(id)}
                  // @ts-ignore
                  title={formatMessage(globalMessages.questionTypes[id])}
                />
              ))}
              {AddableGroups.map(({ color, id }) => (
                <NewItem
                  key={id}
                  color={color}
                  handleClick={() => handleClick(id)}
                  // @ts-ignore
                  title={formatMessage(globalMessages.questionGroupType[id])}
                  isGroup
                />
              ))}
            </ScrollFogBox>
          </Box>
        )}
      </Box>
    </Row>
  );
};

const mapStateToProps = createStructuredSelector({
  nameQuestionExists: makeSelectNameQuestionExists(),
  participantReportExists: makeSelectParticipantReportQuestionExists(),
  phoneQuestionExists: makeSelectPhoneQuestionExists(),
});

const withConnect = connect(mapStateToProps, null);

export default compose(withConnect)(
  QuestionTypeChooser,
) as any as React.ComponentType<NonReduxProps>;
