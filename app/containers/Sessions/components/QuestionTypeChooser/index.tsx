import React, { useMemo, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';

import Box from 'components/Box';
import Row from 'components/Row';
import Text from 'components/Text';
import { ScrollFogBox } from 'components/Box/ScrollFog';

import questionTypesMessages from 'global/i18n/questionTypesMessages';
import questionGroupTypeMessages from 'global/i18n/questionGroupTypeMessages';
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
  henryFordQuestion,
} from 'models/Session/QuestionTypes';
import { AddableGroups } from 'models/QuestionGroup';
import { Question } from 'models/Question';

import { borders, boxShadows, colors, fontSizes } from 'theme';

import { useDropdownPositionHelper } from 'utils/useDropdownPositionHelper';
import { useChildSizeCalculator } from 'utils/useChildSizeCalculator';

import DefaultButtonComponent from './DefaultButtonComponent';
import messages from './messages';
import NewItem from './NewItem';
import { ConditionalAppearanceConfig } from './types';

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

  const conditionalAppearanceConfigs: Record<
    Question['id'],
    ConditionalAppearanceConfig
  > = useMemo(
    () => ({
      [nameQuestion.id]: {
        disabled: nameQuestionExists,
        disabledMessage: messages.questionAvailableOncePerSession,
      },
      [participantReport.id]: {
        disabled: participantReportExists,
        disabledMessage: messages.questionAvailableOncePerSession,
      },
      [phoneQuestion.id]: {
        disabled: phoneQuestionExists,
        disabledMessage: messages.questionAvailableOncePerSession,
      },
      [henryFordInitialScreen.id]: {
        hidden: !hasHfhsAccess,
        disabled: henryFordInitialScreenExists,
        disabledMessage: messages.questionAvailableOncePerSession,
      },
      [henryFordQuestion.id]: {
        hidden: !hasHfhsAccess,
        disabled: !henryFordInitialScreenExists,
        disabledMessage: messages.hfhsInitialScreenRequired,
      },
    }),
    [
      nameQuestionExists,
      participantReportExists,
      phoneQuestionExists,
      henryFordInitialScreenExists,
      hasHfhsAccess,
    ],
  );

  // @ts-ignore
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
              {AddableQuestionTypes.map(({ color, id }) => (
                <NewItem
                  key={id}
                  color={color}
                  handleClick={() => handleClick(id)}
                  title={formatMessage(questionTypesMessages[id])}
                  conditionalAppearanceConfig={conditionalAppearanceConfigs[id]}
                />
              ))}
              {AddableGroups.map(({ color, id }) => (
                <NewItem
                  key={id}
                  color={color}
                  handleClick={() => handleClick(id)}
                  title={formatMessage(questionGroupTypeMessages[id])}
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
