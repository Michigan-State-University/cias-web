import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';
import { toast } from 'react-toastify';

import ReorderIcon from 'assets/svg/reorder-hand.svg';
import bin from 'assets/svg/bin-red.svg';
import radio from 'assets/svg/radio-button.svg';

import {
  makeSelectSelectedQuestion,
  updateQuestionData,
} from 'global/reducers/questions';
import globalMessages from 'global/i18n/globalMessages';
import { emailValidator, numericValidator } from 'utils/validators';
import { themeColors, colors } from 'theme';

import FlexibleWidthApprovableInput from 'components/Input/FlexibleWidthApprovableInput';
import Box from 'components/Box';
import Column from 'components/Column';
import HoverableBox from 'components/Box/HoverableBox';
import Img from 'components/Img';
import PlusCircle from 'components/Circle/PlusCircle';
import Row from 'components/Row';
import Text from 'components/Text';
import { BadgeInput } from 'components/Input/BadgeInput';
import OriginalTextHover from 'components/OriginalTextHover';
import { DndSortable } from 'components/DragAndDrop';

import ReportChooser from './ReportChooser';
import messages from './messages';
import { ADD, UPDATE_ANSWER, REMOVE } from './constants';
import { reorderAnswersAction } from './actions';

const ThirdPartyQuestion = ({
  selectedQuestion,
  addAnswer,
  updateAnswer,
  removeAnswer,
  reorderAnswers,
  isNarratorTab,
  editingPossible,
  intl: { formatMessage },
}) => {
  const [hovered, setHovered] = useState(-1);

  const {
    id,
    body: { data },
  } = selectedQuestion;

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

  const onDragEnd = (_, items, hasChanged) => {
    if (!hasChanged) return;

    reorderAnswers(items);
  };

  return (
    <Column mt={10}>
      <DndSortable onDragEnd={onDragEnd} items={data} selector={null}>
        {({ item, index, dragHandleProps }) => (
          <Row mb={12}>
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
                  <Row width="90%">
                    {!isNarratorTabOrEditNotPossible && (
                      <Img
                        alt={formatMessage(messages.reorderIconAlt, {
                          index,
                        })}
                        mr={10}
                        src={ReorderIcon}
                        disabled={false}
                        cursor="grab"
                        {...dragHandleProps}
                      />
                    )}
                    <Img width="max-content" src={radio} mr={15} />
                    <OriginalTextHover
                      id={`question-${id}-answer-${index}`}
                      text={item?.original_text}
                      hidden={isNarratorTab}
                    >
                      <FlexibleWidthApprovableInput
                        fontSize={18}
                        type="singleline"
                        placeholder={
                          !isNarratorTab
                            ? formatMessage(messages.placeholder, {
                                index: index + 1,
                              })
                            : ''
                        }
                        value={item.payload}
                        onCheck={(newTitle) =>
                          handleChangeTitle(newTitle, index, item)
                        }
                        richText
                        disabled={isNarratorTabOrEditNotPossible}
                        emptyWidth={110}
                      />
                    </OriginalTextHover>
                  </Row>
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
                <Row
                  mb={10}
                  ml={40}
                  align="center"
                  hidden={isNarratorTab}
                  gap={10}
                >
                  <BadgeInput
                    data-cy={`score-${index}-input`}
                    disabled={!editingPossible}
                    px={0}
                    py={12}
                    textAlign="center"
                    validator={numericValidator}
                    keyboard="tel"
                    placeholder={formatMessage(
                      // @ts-ignore
                      globalMessages.variables.variableScorePlaceholder,
                    )}
                    value={item.numeric_value}
                    color={colors.azure}
                    onBlur={(value) =>
                      updateAnswer(index, { ...item, numeric_value: value })
                    }
                  />
                  {/* TODO place score input above recipient list when merging https://htdevelopers.atlassian.net/browse/CIAS30-3498 */}
                  <BadgeInput
                    data-cy={`emails-${index}-input`}
                    disabled={!editingPossible}
                    textAlign="center"
                    placeholder={
                      !isNarratorTab
                        ? formatMessage(messages.emailPlaceholder)
                        : ''
                    }
                    value={item.value}
                    color={colors.kleinBlue}
                    bg={colors.titanWhite}
                    onBlur={(currentValue) =>
                      handleChangeVariable(index, item, currentValue)
                    }
                    maxWidth="100%"
                  />
                </Row>
              </Column>

              <ReportChooser
                formatMessage={formatMessage}
                value={item.report_template_ids}
                onChange={(reportTemplateIds) =>
                  handleChangeReportTemplateIds(reportTemplateIds, index, item)
                }
                disabled={!editingPossible}
                isNarratorTab={isNarratorTab}
              />
            </HoverableBox>
          </Row>
        )}
      </DndSortable>
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
    </Column>
  );
};

ThirdPartyQuestion.propTypes = {
  selectedQuestion: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired,
  addAnswer: PropTypes.func.isRequired,
  updateAnswer: PropTypes.func.isRequired,
  removeAnswer: PropTypes.func.isRequired,
  reorderAnswers: PropTypes.func.isRequired,
  isNarratorTab: PropTypes.bool,
  editingPossible: PropTypes.bool,
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
  reorderAnswers: reorderAnswersAction,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default injectIntl(compose(withConnect)(ThirdPartyQuestion));
