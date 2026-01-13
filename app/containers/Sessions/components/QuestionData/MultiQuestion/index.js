import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';
import { useInjectSaga } from 'redux-injectors';
import { MdOutlineHideImage } from 'react-icons/md';
import { LuImage } from 'react-icons/lu';

import ReorderIcon from 'assets/svg/reorder-hand.svg';
import bin from 'assets/svg/bin-red.svg';
import checkbox from 'assets/svg/checkbox.svg';
import {
  makeSelectSelectedQuestion,
  updateQuestionData,
  deleteAnswerImageRequest,
  updateAnswerImageRequest,
  questionImageSaga,
} from 'global/reducers/questions';
import globalMessages from 'global/i18n/globalMessages';
import { numericValidator, variableNameValidator } from 'utils/validators';
import { themeColors, colors } from 'theme';

import FlexibleWidthApprovableInput from 'components/Input/FlexibleWidthApprovableInput';
import ApprovableInput from 'components/Input/ApprovableInput';
import Box from 'components/Box';
import Column from 'components/Column';
import HoverableBox from 'components/Box/HoverableBox';
import Img from 'components/Img';
import PlusCircle from 'components/Circle/PlusCircle';
import Row from 'components/Row';
import Text from 'components/Text';
import OriginalTextHover from 'components/OriginalTextHover';
import { BadgeInput } from 'components/Input/BadgeInput';
import { DndSortable } from 'components/DragAndDrop';
import { ModalType, useModal } from 'components/Modal';
import { getAnswerImageSize } from 'utils/getAnswerImageSize';

import AnswerImageUploadModal from '../AnswerImageUpload';
import questionImageMessages from '../../QuestionImage/messages';
import messages from './messages';
import { ADD, UPDATE, REMOVE } from './constants';
import { reorderAnswersAction } from './actions';

const CHECKBOX_MARGIN = 16;
const INPUT_PADDING = 15;

const MultiQuestion = ({
  selectedQuestion,
  addAnswer,
  updateAnswer,
  removeAnswer,
  reorderAnswers,
  deleteAnswerImage,
  updateAnswerImage,
  isNarratorTab,
  editingPossible,
  intl: { formatMessage },
  dynamicElementsDirection,
}) => {
  useInjectSaga({ key: 'questionImage', saga: questionImageSaga });

  const checkboxButtonRef = useRef(null);

  const [hovered, setHovered] = useState(-1);
  const [leftMargin, setLeftMargin] = useState(0);
  const [selectedAnswerId, setSelectedAnswerId] = useState(null);

  const answerImageModalRenderer = (props) => (
    <AnswerImageUploadModal {...props} answerId={selectedAnswerId} />
  );

  const { openModal: openImageModal, Modal: ImageModal } = useModal({
    type: ModalType.Modal,
    modalContentRenderer: answerImageModalRenderer,
    props: {
      title: formatMessage(messages.uploadAnswerImage),
      width: 520,
    },
  });

  useEffect(() => {
    if (checkboxButtonRef.current)
      setLeftMargin(
        checkboxButtonRef.current.width + CHECKBOX_MARGIN + INPUT_PADDING,
      );
  }, [checkboxButtonRef.current]);

  const { answer_images: answerImages = [], original_text: originalText } =
    selectedQuestion;

  const isNarratorTabOrEditNotPossible = isNarratorTab || !editingPossible;

  const handleMouseEnter = (index) => () => {
    if (!isNarratorTabOrEditNotPossible) setHovered(index);
  };

  const hasAnswerImage = (answerId) =>
    answerImages.some((img) => img.answer_id === answerId);

  const getOriginalAnswerImageText = (answerId) => {
    if (!originalText || typeof originalText !== 'object') {
      return undefined;
    }

    const answerImagesArray =
      originalText.answer_images || originalText.answerImages;

    if (!Array.isArray(answerImagesArray) || answerImagesArray.length === 0) {
      return undefined;
    }

    const matchingEntry = answerImagesArray.find(
      (entry) =>
        entry && typeof entry === 'object' && entry.answer_id === answerId,
    );

    if (!matchingEntry) return undefined;

    const text = matchingEntry.description;

    return text && typeof text === 'string' && text.trim() !== ''
      ? text
      : undefined;
  };

  const onDragEnd = (_, items, hasChanged) => {
    if (!hasChanged) return;

    reorderAnswers(items);
  };

  return (
    <Column mt={10}>
      <DndSortable
        onDragEnd={onDragEnd}
        items={selectedQuestion.body.data}
        selector={null}
      >
        {({ item, index, dragHandleProps }) => (
          <Row dir={dynamicElementsDirection}>
            <HoverableBox
              hoverColor={isNarratorTabOrEditNotPossible ? null : undefined}
              paddingInline={21}
              paddingBlock={14}
              width="100%"
              onMouseEnter={handleMouseEnter(index)}
              onMouseLeave={() => setHovered(-1)}
              clickable={false}
            >
              <Column>
                <Row
                  align="center"
                  justify="between"
                  marginBlockEnd={isNarratorTabOrEditNotPossible ? 0 : 10}
                >
                  <Row width="90%">
                    {!isNarratorTabOrEditNotPossible && (
                      <Img
                        alt={formatMessage(messages.reorderIconAlt, {
                          index,
                        })}
                        marginInlineEnd={10}
                        src={ReorderIcon}
                        disabled={false}
                        cursor="grab"
                        {...dragHandleProps}
                      />
                    )}

                    <Img
                      ref={checkboxButtonRef}
                      src={checkbox}
                      marginInlineEnd={CHECKBOX_MARGIN}
                    />
                    <Column width="100%">
                      {hasAnswerImage(item.id) && (
                        <Box marginBlockEnd={8}>
                          <Img
                            src={
                              answerImages.find(
                                (img) => img.answer_id === item.id,
                              )?.url
                            }
                            maxWidth={getAnswerImageSize(
                              selectedQuestion.settings?.answer_image_size ||
                                'medium',
                            )}
                            height="auto"
                            borderRadius={4}
                          />
                          <Box
                            mt={8}
                            bg={colors.linkWaterDark}
                            position="relative"
                          >
                            <OriginalTextHover
                              id={`question-${selectedQuestion.id}-answer-${index}-image`}
                              text={getOriginalAnswerImageText(item.id)}
                              hidden={isNarratorTab}
                              iconProps={{
                                position: 'absolute',
                                right: 8,
                                bottom: 8,
                              }}
                            >
                              <ApprovableInput
                                type="multiline"
                                value={
                                  answerImages.find(
                                    (img) => img.answer_id === item.id,
                                  )?.alt ?? ''
                                }
                                onCheck={(description) =>
                                  updateAnswerImage(
                                    selectedQuestion.id,
                                    item.id,
                                    description,
                                  )
                                }
                                placeholder={formatMessage(
                                  questionImageMessages.logoDescriptionPlaceholder,
                                )}
                                rows="2"
                                disabled={isNarratorTabOrEditNotPossible}
                              />
                            </OriginalTextHover>
                          </Box>
                        </Box>
                      )}
                      <OriginalTextHover
                        id={`question-${selectedQuestion.id}-answer-${index}`}
                        text={item?.original_text}
                        hidden={isNarratorTab}
                      >
                        <FlexibleWidthApprovableInput
                          fontSize={18}
                          type="singleline"
                          placeholder={formatMessage(messages.placeholder, {
                            index: index + 1,
                          })}
                          value={item.payload}
                          onCheck={(newTitle) =>
                            updateAnswer(index, { ...item, payload: newTitle })
                          }
                          richText
                          disabled={isNarratorTabOrEditNotPossible}
                          emptyWidth={105}
                        />
                      </OriginalTextHover>
                    </Column>
                  </Row>
                  <Row>
                    {!hasAnswerImage(item.id) &&
                      item.id &&
                      !isNarratorTabOrEditNotPossible && (
                        <Box
                          onClick={() => {
                            setSelectedAnswerId(item.id);
                            openImageModal();
                          }}
                          clickable
                          marginInlineEnd={8}
                          bg={colors.jungleGreen}
                          borderRadius="5px"
                          width="35px"
                          height="35px"
                          display="flex"
                          align="center"
                          justify="center"
                          hidden={hovered !== index}
                        >
                          <LuImage
                            size={20}
                            color="white"
                            alt={formatMessage(messages.addImageIconAlt, {
                              index: index + 1,
                            })}
                          />
                        </Box>
                      )}
                    {hasAnswerImage(item.id) &&
                      item.id &&
                      !isNarratorTabOrEditNotPossible && (
                        <Box
                          onClick={() => {
                            deleteAnswerImage(selectedQuestion.id, item.id);
                          }}
                          clickable
                          marginInlineEnd={8}
                          bg={colors.burntSienna}
                          borderRadius="5px"
                          width="35px"
                          height="35px"
                          display="flex"
                          align="center"
                          justify="center"
                          hidden={hovered !== index}
                        >
                          <MdOutlineHideImage
                            size={20}
                            color="white"
                            alt={formatMessage(messages.deleteImageIconAlt, {
                              index: index + 1,
                            })}
                          />
                        </Box>
                      )}
                    <Box
                      onClick={() => removeAnswer(index)}
                      hidden={hovered !== index}
                      clickable
                    >
                      <Img src={bin} marginInlineEnd={16} />
                    </Box>
                  </Row>
                </Row>
                <Row align="center" display="flex" hidden={isNarratorTab}>
                  <Row marginInlineStart={`${leftMargin}px`} gap={10}>
                    <BadgeInput
                      disabled={!editingPossible}
                      paddingInline={0}
                      paddingBlock={12}
                      textAlign="center"
                      validator={variableNameValidator}
                      placeholder={formatMessage(
                        globalMessages.variableNamePlaceholder,
                      )}
                      value={item.variable.name}
                      color={colors.jungleGreen}
                      onBlur={(val) =>
                        updateAnswer(index, {
                          ...item,
                          variable: { ...item.variable, name: val },
                        })
                      }
                      autoComplete="off"
                    />
                    <BadgeInput
                      disabled={!editingPossible}
                      paddingInline={0}
                      paddingBlock={12}
                      textAlign="center"
                      validator={numericValidator}
                      keyboard="tel"
                      placeholder={formatMessage(
                        globalMessages.variableScorePlaceholder,
                      )}
                      value={item.variable.value}
                      color={colors.azure}
                      onBlur={(val) =>
                        updateAnswer(index, {
                          ...item,
                          variable: { ...item.variable, value: val },
                        })
                      }
                    />
                  </Row>
                </Row>
              </Column>
            </HoverableBox>
          </Row>
        )}
      </DndSortable>
      <Row display="flex" hidden={isNarratorTabOrEditNotPossible}>
        <HoverableBox paddingInline={21} paddingBlock={14} onClick={addAnswer}>
          <Box>
            <Row align="center">
              <PlusCircle marginInlineEnd={12} />
              <Text fontWeight="bold" color={themeColors.secondary}>
                {formatMessage(messages.addAnswer)}
              </Text>
            </Row>
          </Box>
        </HoverableBox>
      </Row>
      <ImageModal />
    </Column>
  );
};

MultiQuestion.propTypes = {
  selectedQuestion: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired,
  addAnswer: PropTypes.func.isRequired,
  updateAnswer: PropTypes.func.isRequired,
  removeAnswer: PropTypes.func.isRequired,
  reorderAnswers: PropTypes.func.isRequired,
  deleteAnswerImage: PropTypes.func.isRequired,
  updateAnswerImage: PropTypes.func.isRequired,
  isNarratorTab: PropTypes.bool,
  editingPossible: PropTypes.bool,
  dynamicElementsDirection: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  selectedQuestion: makeSelectSelectedQuestion(),
});

const mapDispatchToProps = (dispatch) => ({
  addAnswer: () => dispatch(updateQuestionData({ type: ADD })),
  updateAnswer: (index, value) =>
    dispatch(updateQuestionData({ type: UPDATE, data: { index, value } })),
  removeAnswer: (index) =>
    dispatch(updateQuestionData({ type: REMOVE, data: { index } })),
  reorderAnswers: (items) => dispatch(reorderAnswersAction(items)),
  deleteAnswerImage: (questionId, answerId) =>
    dispatch(deleteAnswerImageRequest({ questionId, answerId })),
  updateAnswerImage: (questionId, answerId, description) =>
    dispatch(updateAnswerImageRequest(questionId, answerId, description)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default injectIntl(compose(withConnect)(MultiQuestion));
