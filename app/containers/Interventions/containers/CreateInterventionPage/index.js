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
import { themeColors } from 'theme/colors';
import {
  makeSelectIntervention,
  makeSelectQuestionTypeChooserVisiblity,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { toggleQuestionTypeChooser } from './actions';
import QuestionTypeChooser from '../../components/QuestionTypeChooser';
import QuestionListItem from '../../components/QuestionListItem';
import { PlusCircle } from './styled';

function CreateInterventionPage({
  intl: { formatMessage },
  intervention,
  chooserVisibility,
  toggleChooser,
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
          <Box padded>
            <Row mb={77}>
              <Img src={cross} mr={37} />
              <H1>{formatMessage(messages.pageTitle)}</H1>
            </Row>

            <Box width="100%" padded>
              <Row>
                {intervention.questions.map(question => (
                  <QuestionListItem
                    type={question.type}
                    title={question.title}
                  />
                ))}
              </Row>
              <Row>
                <Box position="relative">
                  <HoverableBox px={21} py={14}>
                    <Box onClick={toggleChooser}>
                      <Row align="center">
                        <PlusCircle mr={12} clickable />
                        <Text fontWeight="bold" color={themeColors.secondary}>
                          {formatMessage(messages.addScreen)}
                        </Text>
                      </Row>
                    </Box>
                  </HoverableBox>
                  <QuestionTypeChooser
                    onClick={() => console.log('text')}
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
};

const mapStateToProps = createStructuredSelector({
  intervention: makeSelectIntervention(),
  chooserVisibility: makeSelectQuestionTypeChooserVisiblity(),
});

const mapDispatchToProps = dispatch => ({
  toggleChooser: () => dispatch(toggleQuestionTypeChooser()),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default injectIntl(compose(withConnect)(CreateInterventionPage));
