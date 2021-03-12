import React, { useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Column from 'components/Column';
import Row from 'components/Row';
import Box from 'components/Box';
import Text from 'components/Text';
import Img from 'components/Img';
import Badge from 'components/Badge';
import Loader from 'components/Loader';
import webpage from 'assets/svg/webpage-mouseover.svg';
import {
  makeSelectFilteredQuestions,
  makeSelectSelectedQuestion,
} from 'global/reducers/questions';

import { colors, boxShadows } from 'theme';
import Question from 'models/Session/Question';
import {
  getBranchingVariables,
  getPreviousQuestions,
} from 'models/Session/utils';
import NoContent from 'components/NoContent';
import { htmlToPlainText } from 'utils/htmlToPlainText';
import useOutsideClick from 'utils/useOutsideClick';
import {
  makeSelectGetQuestionGroupLoader,
  makeSelectQuestionGroups,
} from 'global/reducers/questionGroups';
import { nameQuestion } from 'models/Session/QuestionTypes';
import messages from './messages';

const VariableChooser = ({
  intl: { formatMessage },
  onClick,
  questions,
  groups,
  selectedQuestion = {},
  visible,
  setOpen,
  loading,
  includeAllVariables,
  topPosition,
}) => {
  const { id } = selectedQuestion;
  const previousQuestions = useMemo(
    () =>
      includeAllVariables
        ? questions
        : getPreviousQuestions(selectedQuestion, questions, groups),
    [selectedQuestion, questions, groups],
  );

  const variables = getBranchingVariables(previousQuestions, {
    structure: 'flat',
    include: ['id', 'subtitle'],
  });

  const variableChooser = useRef(null);
  useOutsideClick(variableChooser, () => setOpen(false), visible);

  const displayContent = () => {
    const filteredVariables = variables?.length
      ? variables.filter(
          ({ variable }) => variable !== nameQuestion.reservedVariable,
        )
      : undefined;
    if (filteredVariables && filteredVariables.length)
      return filteredVariables.map((variable, index) => (
        <Row
          data-testid={`${id}-select-variable`}
          key={`${id}-select-variable-${index}`}
          mb={index !== variables.length - 1 && 15}
          onClick={() => onClick(variable.variable)}
          justify="between"
          align="center"
          clickable
        >
          <Row align="center">
            <Img src={webpage} mr={15} />
            <Text
              textOverflow="ellipsis"
              whiteSpace="pre"
              overflow="hidden"
              maxWidth={200}
              mr={20}
            >
              {htmlToPlainText(variable.subtitle)}
            </Text>
          </Row>
          <Badge
            data-cy="question-variable-chooser"
            maxWidth={300}
            color={colors.jungleGreen}
            bgWithOpacity
          >
            {variable.variable && variable.variable.trim()}
          </Badge>
        </Row>
      ));

    return (
      <Box padding={30}>
        <NoContent text={formatMessage(messages.noVariables)} />
      </Box>
    );
  };

  return (
    <Box
      ref={variableChooser}
      bg={colors.white}
      borderRadius={10}
      shadow={boxShadows.black}
      position="absolute"
      width="auto"
      right="0px"
      top={topPosition}
      {...(visible ? { zIndex: 1 } : { display: 'none' })}
    >
      <Row>
        <Box padding={8} filled>
          {loading && <Loader type="inline" />}
          {!loading && <Column>{displayContent()}</Column>}
        </Box>
      </Row>
    </Box>
  );
};

VariableChooser.propTypes = {
  intl: PropTypes.object,
  onClick: PropTypes.func.isRequired,
  questions: PropTypes.arrayOf(PropTypes.shape(Question)),
  groups: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.string, position: PropTypes.number }),
  ),
  selectedQuestion: PropTypes.shape(Question),
  visible: PropTypes.bool,
  loading: PropTypes.bool,
  includeAllVariables: PropTypes.bool,
  setOpen: PropTypes.func,
  topPosition: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  questions: makeSelectFilteredQuestions(),
  groups: makeSelectQuestionGroups(),
  selectedQuestion: makeSelectSelectedQuestion(),
  loading: makeSelectGetQuestionGroupLoader(),
});

const withConnect = connect(mapStateToProps);

export default injectIntl(compose(withConnect)(VariableChooser));
