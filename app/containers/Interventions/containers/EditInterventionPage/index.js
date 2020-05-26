import React, { Fragment, useEffect } from 'react';
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
import cross from 'assets/svg/cross.svg';
import Question from 'models/Intervention/Question';
import { themeColors, colors } from 'theme/colors';
import { borders } from 'theme/general';
import {
  makeSelectIntervention,
  makeSelectQuestions,
  makeSelectSelectedQuestionIndex,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import {
  toggleQuestionTypeChooser,
  getInterventionRequest,
  createQuestionRequest,
} from './actions';
import QuestionTypeChooser from '../../components/QuestionTypeChooser';
import QuestionListItem from '../../components/QuestionListItem';
import { PlusCircle } from './styled';
import QuestionDetails from '../../components/QuestionDetails';

function EditInterventionPage({
  intl: { formatMessage },
  intervention,
  toggleChooser,
  questions,
  selectedQuestion,
  getIntervention,
  createQuestion,
  match: { params },
}) {
  useInjectReducer({ key: 'editInterventionPage', reducer });
  useInjectSaga({ key: 'editInterventionPage', saga });

  useEffect(() => {
    getIntervention(params.id);
  }, []);

  return (
    <Fragment>
      <Helmet>
        <title>{formatMessage(messages.pageTitle)}</title>
      </Helmet>
      <Row filled>
        <Column sm={5}>
          <Box
            height="100%"
            borderRight={`${borders.borderWidth} ${borders.borderStyle} ${
              colors.linkWater
            }`}
            padded
          >
            <Row mb={77}>
              <Img src={cross} mr={37} />
              <H1>{intervention.name}</H1>
            </Row>

            <Box width="100%" padded>
              {questions.map((question, index) => (
                <Row>
                  <QuestionListItem
                    index={index}
                    isSelected={selectedQuestion === index}
                    question={question}
                  />
                </Row>
              ))}
              <Row>
                <Box position="relative">
                  <HoverableBox px={21} py={14} onClick={toggleChooser}>
                    <Box>
                      <Row align="center">
                        <PlusCircle mr={12} />
                        <Text fontWeight="bold" color={themeColors.secondary}>
                          {formatMessage(messages.addScreen)}
                        </Text>
                      </Row>
                    </Box>
                  </HoverableBox>
                  <QuestionTypeChooser
                    onClick={type => createQuestion(type, params.id)}
                  />
                </Box>
              </Row>
              <Row />
            </Box>
          </Box>
        </Column>
        <Column sm={7}>
          <QuestionDetails />
        </Column>
      </Row>
    </Fragment>
  );
}

EditInterventionPage.propTypes = {
  intl: PropTypes.object,
  intervention: PropTypes.shape(Intervention),
  toggleChooser: PropTypes.func,
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

const mapDispatchToProps = dispatch => ({
  toggleChooser: () => dispatch(toggleQuestionTypeChooser()),
  getIntervention: id => dispatch(getInterventionRequest(id)),
  createQuestion: (type, id) => dispatch(createQuestionRequest(type, id)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default injectIntl(compose(withConnect)(EditInterventionPage));
