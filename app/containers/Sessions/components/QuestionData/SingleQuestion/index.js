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
import radio from 'assets/svg/radio-button.svg';
import bin from 'assets/svg/bin-red.svg';

import {
  makeSelectSelectedQuestion,
  updateQuestionData,
  deleteAnswerImageRequest,
  updateAnswerImageRequest,
  questionImageSaga,
} from 'global/reducers/questions';
import globalMessages from 'global/i18n/globalMessages';
import { numericValidator } from 'utils/validators';
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
import {
  hasAnswerImage as checkHasAnswerImage,
  getOriginalAnswerImageText as getOriginalAnswerImageTextHelper,
} from '../answerImageHelpers';
import messages from './messages';
import { ADD, UPDATE_ANSWER, REMOVE } from './constants';
import { reorderAnswersAction } from './actions';

const RADIO_MARGIN = 16;
const INPUT_PADDING = 15;

const SingleQuestion = ({
  selectedQuestion,
  addAnswer,
  updateAnswer,
  removeAnswer,
  reorderAnswers,
  deleteAnswerImage,
  updateAnswerImage,
  isNarratorTab,
  intl: { formatMessage },
  editingPossible,
  dynamicElementsDirection,
}) => {
  useInjectSaga({ key: 'questionImage', saga: questionImageSaga });

  const radioButtonRef = useRef(null);

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
    if (radioButtonRef.current)
      setLeftMargin(
        radioButtonRef.current.width + RADIO_MARGIN + INPUT_PADDING,
      );
  }, [radioButtonRef.current]);

  const { data } = selectedQuestion.body;
  const { answer_images: answerImages = [], original_text: originalText } =
    selectedQuestion;

  const isNarratorTabOrEditNotPossible = isNarratorTab || !editingPossible;

  const handleMouseEnter = (index) => () => {
    if (!isNarratorTabOrEditNotPossible) setHovered(index);
  };

  const hasAnswerImage = (answerId) =>
    checkHasAnswerImage(answerImages, answerId);

  const getOriginalAnswerImageText = (answerId) =>
    getOriginalAnswerImageTextHelper(originalText, answerId);

  const onDragEnd = (_, items, hasChanged) => {
    if (!hasChanged) return;

    reorderAnswers(items);
  };

  return (
    <Column marginBlockStart={10}>
      <DndSortable onDragEnd={onDragEnd} items={data} selector={null}>
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
                      ref={radioButtonRef}
                      src={radio}
                      marginInlineEnd={RADIO_MARGIN}
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
                            {...getAnswerImageSize(
                              selectedQuestion.settings?.answer_image_size ||
                                'medium',
                              false,
                            )}
                            width="auto"
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
                          data-cy={`answer-input-${index}`}
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
                <Row align="center" hidden={isNarratorTab}>
                  <Row marginInlineStart={`${leftMargin}px`}>
                    <BadgeInput
                      data-cy={`score-${index}-input`}
                      disabled={!editingPossible}
                      paddingInline={0}
                      paddingBlock={12}
                      textAlign="center"
                      validator={numericValidator}
                      keyboard="tel"
                      placeholder={
                        !isNarratorTab
                          ? formatMessage(
                              globalMessages.variableScorePlaceholder,
                            )
                          : ''
                      }
                      value={item.value}
                      color={colors.azure}
                      onBlur={(val) =>
                        updateAnswer(index, {
                          ...item,
                          value: val,
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
      <Row hidden={isNarratorTabOrEditNotPossible}>
        <HoverableBox
          paddingInline={21}
          paddingBlock={14}
          onClick={addAnswer}
          data-cy="add-answer-button"
        >
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

SingleQuestion.propTypes = {
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

const mapDispatchToProps = {
  addAnswer: () => updateQuestionData({ type: ADD }),
  updateAnswer: (index, value) =>
    updateQuestionData({ type: UPDATE_ANSWER, data: { index, value } }),
  removeAnswer: (index) =>
    updateQuestionData({ type: REMOVE, data: { index } }),
  reorderAnswers: reorderAnswersAction,
  deleteAnswerImage: (questionId, answerId) =>
    deleteAnswerImageRequest({ questionId, answerId }),
  updateAnswerImage: (questionId, answerId, description) =>
    updateAnswerImageRequest(questionId, answerId, description),
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default injectIntl(compose(withConnect)(SingleQuestion));
