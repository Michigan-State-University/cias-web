import React, { useMemo, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';

import Box from 'components/Box';
import Row from 'components/Row';
import Text from 'components/Text';
import { ScrollFogBox } from 'components/Box/ScrollFog';
import globalMessages from 'global/i18n/globalMessages';
import {
  makeSelectNameQuestionExists,
  makeSelectParticipantReportQuestionExists,
  makeSelectPhoneQuestionExists,
  makeSelectHenryFordInitialScreenExists,
} from 'global/reducers/questions';
import { makeSelectInterventionHfhsAccess } from 'global/reducers/intervention';

import useOutsideClick from 'utils/useOutsideClick';
import {
  AddableQuestionTypes,
  nameQuestion,
  participantReport,
  phoneQuestion,
  henryFordInitialScreen,
} from 'models/Session/QuestionTypes';
import { AddableGroups } from 'models/QuestionGroup';

import { borders, boxShadows, colors, fontSizes } from 'theme';

import { useDropdownPositionHelper } from 'utils/useDropdownPositionHelper';
import { useChildSizeCalculator } from 'utils/useChildSizeCalculator';
import DefaultButtonComponent from './DefaultButtonComponent';
import messages from './messages';
import NewItem from './NewItem';

type Props = {
  onClick: (type: string) => void;
  ButtonComponent?: React.ReactNode;
};

const QuestionTypeChooser = ({
  onClick,
  ButtonComponent = DefaultButtonComponent,
}: Props) => {
  const nameQuestionExists = useSelector(makeSelectNameQuestionExists());
  const participantReportExists = useSelector(
    makeSelectParticipantReportQuestionExists(),
  );
  const phoneQuestionExists = useSelector(makeSelectPhoneQuestionExists());
  const henryFordInitialScreenExists = useSelector(
    makeSelectHenryFordInitialScreenExists(),
  );
  const hasHfhsAccess = useSelector(makeSelectInterventionHfhsAccess());

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
          !(phoneQuestionExists && id === phoneQuestion.id) &&
          !(
            (henryFordInitialScreenExists || !hasHfhsAccess) &&
            id === henryFordInitialScreen.id
          ),
      ),
    [
      AddableQuestionTypes,
      nameQuestionExists,
      participantReportExists,
      phoneQuestionExists,
      henryFordInitialScreenExists,
      hasHfhsAccess,
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

export default QuestionTypeChooser;
