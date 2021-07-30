import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';
import { toast } from 'react-toastify';

import ApprovableInput from 'components/Input/ApprovableInput';
import Box from 'components/Box';
import Column from 'components/Column';
import HoverableBox from 'components/Box/HoverableBox';
import Img from 'components/Img';
import PlusCircle from 'components/Circle/PlusCircle';
import Question from 'models/Session/Question';
import Row from 'components/Row';
import Text from 'components/Text';
import H3 from 'components/H3';

import bin from 'assets/svg/bin-red.svg';
import radio from 'assets/svg/radio-button.svg';

import {
  makeSelectSelectedQuestion,
  updateQuestionData,
} from 'global/reducers/questions';
import { canEdit } from 'models/Status/statusPermissions';
import { BadgeInput } from 'components/Input/BadgeInput';
import { emailValidator } from 'utils/validators';
import { themeColors, colors } from 'theme';

import answerPageMessages from 'containers/AnswerSessionPage/layouts/messages';
import ReportChooser from './ReportChooser';
import messages from './messages';
import { ADD, UPDATE_ANSWER, REMOVE } from './constants';

const ThirdPartyQuestion = ({
  selectedQuestion,
  addAnswer,
  updateAnswer,
  removeAnswer,
  isNarratorTab,
  interventionStatus,
  intl: { formatMessage },
}) => {
  const [hovered, setHovered] = useState(-1);

  const {
    body: { data },
  } = selectedQuestion;

  const editingPossible = canEdit(interventionStatus);
  const isNarratorTabOrEditNotPossible = isNarratorTab || !editingPossible;

  const handleMouseEnter = (index) => () => {
    if (!isNarratorTabOrEditNotPossible) setHovered(index);
  };

  const handleMouseLeave = () => setHovered(-1);

  const handleChangeVariable = (index, value, currentValue) => {
    const commaSeparatedEmails = currentValue.split(',');

    if (currentValue === '' || commaSeparatedEmails.every(emailValidator)) {
      updateAnswer(index, {
        ...value,
        value: currentValue,
      });
    } else toast.error(formatMessage(messages.emailError));
  };
  const handleChangeTitle = (newTitle, index, value) =>
    updateAnswer(index, { ...value, payload: newTitle });

  const handleChangeReportTemplateIds = (newReportTemplateIds, index, value) =>
    updateAnswer(index, {
      ...value,
      report_template_ids: newReportTemplateIds,
    });

  const handleRemove = (index) => removeAnswer(index);
  return (
    <Column>
      {data.map((value, index) => (
        <Row key={`question-${selectedQuestion.id}-el-${index}`} mb={12}>
          <HoverableBox
            hoverColor={isNarratorTabOrEditNotPossible ? null : undefined}
            px={21}
            py={14}
            width="100%"
            onMouseEnter={handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            clickable={false}
          >
            <Column>
              <Row
                align="center"
                justify="between"
                mb={isNarratorTabOrEditNotPossible ? 0 : 10}
              >
                <Column width="90%">
                  <Row>
                    <Img width="max-content" src={radio} mr={15} />
                    <ApprovableInput
                      fontSize={18}
                      type="singleline"
                      placeholder={
                        !isNarratorTab
                          ? formatMessage(messages.placeholder, {
                              index: index + 1,
                            })
                          : ''
                      }
                      value={value.payload}
                      onCheck={(newTitle) =>
                        handleChangeTitle(newTitle, index, value)
                      }
                      richText
                      disabled={isNarratorTabOrEditNotPossible}
                    />
                  </Row>
                  <Row mt={10} ml={40} align="center" hidden={isNarratorTab}>
                    <BadgeInput
                      data-cy={`score-${index}-input`}
                      disabled={!editingPossible}
                      textAlign="center"
                      placeholder={
                        !isNarratorTab
                          ? formatMessage(messages.emailPlaceholder)
                          : ''
                      }
                      value={value.value}
                      color={colors.azure}
                      onBlur={(currentValue) =>
                        handleChangeVariable(index, value, currentValue)
                      }
                      maxWidth="100%"
                    />
                  </Row>
                </Column>
                {data.length > 1 && (
                  <Row>
                    <Box
                      onClick={() => handleRemove(index)}
                      hidden={hovered !== index}
                      clickable
                    >
                      <Img src={bin} mr={16} />
                    </Box>
                  </Row>
                )}
              </Row>
            </Column>

            <ReportChooser
              formatMessage={formatMessage}
              value={value.report_template_ids}
              onChange={(reportTemplateIds) =>
                handleChangeReportTemplateIds(reportTemplateIds, index, value)
              }
              disabled={!editingPossible}
              isNarratorTab={isNarratorTab}
            />
          </HoverableBox>
        </Row>
      ))}
      <Row display="flex" hidden={isNarratorTabOrEditNotPossible}>
        <HoverableBox px={21} py={14} onClick={addAnswer}>
          <Box>
            <Row align="center">
              <PlusCircle mr={12} />
              <Text fontWeight="bold" color={themeColors.secondary}>
                {formatMessage(messages.addAnswer)}
              </Text>
            </Row>
          </Box>
        </HoverableBox>
      </Row>

      {isNarratorTab && (
        <H3 color={themeColors.warning} textAlign="center">
          {formatMessage(answerPageMessages.wcagThirdPartyWarning)}
        </H3>
      )}
    </Column>
  );
};

ThirdPartyQuestion.propTypes = {
  selectedQuestion: PropTypes.shape(Question).isRequired,
  intl: PropTypes.object.isRequired,
  addAnswer: PropTypes.func.isRequired,
  updateAnswer: PropTypes.func.isRequired,
  removeAnswer: PropTypes.func.isRequired,
  isNarratorTab: PropTypes.bool,
  interventionStatus: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  selectedQuestion: makeSelectSelectedQuestion(),
});

const mapDispatchToProps = {
  addAnswer: () => updateQuestionData({ type: ADD }),
  updateAnswer: (index, value) =>
    updateQuestionData({ type: UPDATE_ANSWER, data: { index, value } }),
  removeAnswer: (index) =>
    updateQuestionData({ type: REMOVE, data: { index } }),
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default injectIntl(compose(withConnect)(ThirdPartyQuestion));
