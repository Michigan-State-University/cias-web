import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { injectIntl } from 'react-intl';
import { Helmet } from 'react-helmet';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import Intervention from 'models/Intervention/Intervention';
import Box from 'components/Box';
import Column from 'components/Column';
import Row from 'components/Row';
import Img from 'components/Img';
import H1 from 'components/H1';
import HoverableBox from 'components/Box/HoverableBox';
import Text from 'components/Text';
import Question from 'models/Intervention/Question';
import cross from 'assets/svg/cross.svg';

import {
  gridQuestion,
  visualAnalogueScaleQuestion,
} from 'models/Intervention/QuestionTypes';

import { borders, themeColors, colors } from 'theme';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import {
  makeSelectIntervention,
  makeSelectQuestions,
  makeSelectSelectedQuestionIndex,
} from './selectors';
import { getInterventionRequest, createQuestionRequest } from './actions';

import QuestionTypeChooser from '../../components/QuestionTypeChooser';
import QuestionListItem from '../../components/QuestionListItem';
import QuestionDetails from '../../components/QuestionDetails';
import QuestionSettings from '../../components/QuestionSettings';

const instantiateEmptyQuestion = (message, type) => {
  switch (type) {
    case gridQuestion.id:
      return new Question(message, type, {
        data: [
          {
            payload: {
              rows: [
                { variable: { name: '' }, payload: '' },
                { variable: { name: '' }, payload: '' },
              ],
              columns: [
                { variable: { value: '1' }, payload: '' },
                { variable: { value: '1' }, payload: '' },
              ],
            },
          },
        ],
      });

    case visualAnalogueScaleQuestion.id:
      return new Question(message, type, {
        data: [
          {
            variable: { name: '', value: '1' },
            payload: { start_value: '', end_value: '' },
          },
        ],
      });

    default:
      return new Question(message, type, {
        data: [{ variable: { name: '', value: '1' }, payload: '' }],
      });
  }
};

function EditInterventionPage({
  intl: { formatMessage },
  intervention,
  questions,
  selectedQuestion,
  getIntervention,
  createQuestion,
  match: { params },
}) {
  const [typeChooserOpen, setTypeChooserOpen] = useState(false);
  useInjectReducer({ key: 'editInterventionPage', reducer });
  useInjectSaga({ key: 'editInterventionPage', saga });

  useEffect(() => {
    getIntervention(params.id);
  }, []);

  const toggleTypeChooser = () => setTypeChooserOpen(!typeChooserOpen);

  const onCreateQuestion = type => {
    createQuestion(
      instantiateEmptyQuestion(
        formatMessage(messages.newQuestionMessage),
        type,
      ),
      params.id,
    );
    toggleTypeChooser();
  };
  return (
    <Fragment>
      <Helmet>
        <title>{formatMessage(messages.pageTitle)}</title>
      </Helmet>
      <Row height="100vh" filled>
        <Column sm={4}>
          <Box
            height="100%"
            borderRight={`${borders.borderWidth} ${borders.borderStyle} ${
              colors.linkWater
            }`}
            overflow="scroll"
            padded
          >
            <Row mb={77}>
              <Img src={cross} mr={37} />
              <H1>{intervention.name}</H1>
            </Row>

            <Box width="100%" padded>
              {questions.map((question, index) => (
                <Row key={question.id}>
                  <QuestionListItem
                    index={index}
                    isSelected={selectedQuestion === index}
                    question={question}
                  />
                </Row>
              ))}
              <Row>
                <Box position="relative" width="100%">
                  <HoverableBox
                    px={21}
                    py={14}
                    onClick={toggleTypeChooser}
                    display="flex"
                    justify="center"
                    align="center"
                    border={`${borders.borderWidth} dashed ${
                      colors.greyishBlue
                    }`}
                    borderRadius={5}
                    height={80}
                    width="100%"
                  >
                    <Row align="center">
                      <Text fontWeight="bold" color={themeColors.secondary}>
                        {formatMessage(messages.addScreen)}
                      </Text>
                    </Row>
                  </HoverableBox>
                  <QuestionTypeChooser
                    visible={typeChooserOpen}
                    onClick={onCreateQuestion}
                  />
                </Box>
              </Row>
              <Row />
            </Box>
          </Box>
        </Column>
        <Column sm={8}>
          <Row overflow="hidden" filled>
            <QuestionDetails />
            <QuestionSettings />
          </Row>
        </Column>
      </Row>
    </Fragment>
  );
}

EditInterventionPage.propTypes = {
  intl: PropTypes.object,
  intervention: PropTypes.shape(Intervention),
  questions: PropTypes.arrayOf(PropTypes.shape(Question)),
  selectedQuestion: PropTypes.number.isRequired,
  match: PropTypes.object,
  getIntervention: PropTypes.func,
  createQuestion: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  intervention: makeSelectIntervention(),
  questions: makeSelectQuestions(),
  selectedQuestion: makeSelectSelectedQuestionIndex(),
});

const mapDispatchToProps = {
  getIntervention: id => getInterventionRequest(id),
  createQuestion: (type, id) => createQuestionRequest(type, id),
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default injectIntl(compose(withConnect)(EditInterventionPage));
