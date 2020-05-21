/**
 *
 * CreateInterventionPage
 *
 */

import React, { Fragment } from 'react';
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
  makeSelectQuestionTypeChooserVisiblity,
  makeSelectQuestions,
  makeSelectSelectedQuestion,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { toggleQuestionTypeChooser, addQuestionRequest } from './actions';
import QuestionTypeChooser from '../../components/QuestionTypeChooser';
import QuestionListItem from '../../components/QuestionListItem';
import { PlusCircle } from './styled';

function CreateInterventionPage({
  intl: { formatMessage },
  intervention,
  chooserVisibility,
  toggleChooser,
  addQuestion,
  questions,
  selectedQuestion,
}) {
  useInjectReducer({ key: 'createInterventionPage', reducer });
  useInjectSaga({ key: 'createInterventionPage', saga });

  return (
    <Fragment>
      <Helmet>
        <title>{formatMessage(messages.pageTitle)}</title>
      </Helmet>
      <Row>
        <Column sm={5}>
          <Box
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
                    type={question.type}
                    title={question.title}
                  />
                </Row>
              ))}
              <Row>
                <Box position="relative">
                  <HoverableBox px={21} py={14} onClick={toggleChooser}>
                    <Box>
                      <Row align="center">
                        <PlusCircle mr={12} clickable />
                        <Text fontWeight="bold" color={themeColors.secondary}>
                          {formatMessage(messages.addScreen)}
                        </Text>
                      </Row>
                    </Box>
                  </HoverableBox>
                  <QuestionTypeChooser
                    onClick={addQuestion}
                    visible={chooserVisibility}
                  />
                </Box>
              </Row>
              <Row />
            </Box>
          </Box>
        </Column>
        <Column sm={7}>col2</Column>
      </Row>
    </Fragment>
  );
}

CreateInterventionPage.propTypes = {
  intl: PropTypes.object,
  intervention: PropTypes.shape(Intervention),
  chooserVisibility: PropTypes.bool,
  toggleChooser: PropTypes.func,
  addQuestion: PropTypes.func,
  questions: PropTypes.arrayOf(PropTypes.shape(Question)),
  selectedQuestion: PropTypes.number.isRequired,
};

const mapStateToProps = createStructuredSelector({
  intervention: makeSelectIntervention(),
  chooserVisibility: makeSelectQuestionTypeChooserVisiblity(),
  questions: makeSelectQuestions(),
  selectedQuestion: makeSelectSelectedQuestion(),
});

const mapDispatchToProps = dispatch => ({
  toggleChooser: () => dispatch(toggleQuestionTypeChooser()),
  addQuestion: type => dispatch(addQuestionRequest(type)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default injectIntl(compose(withConnect)(CreateInterventionPage));
