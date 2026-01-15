import React, { useEffect } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import isEqual from 'lodash/isEqual';
import map from 'lodash/map';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useIntl } from 'react-intl';

import { getNarratorPositionWhenBlockIsRemoved } from 'utils/getNarratorPosition';
import { reorder } from 'utils/reorder';
import blurDocument from 'utils/blurDocument';
import {
  makeSelectQuestions,
  makeSelectSelectedQuestionId,
} from 'global/reducers/questions';
import {
  setCharacterDraggable,
  setAnimationStopPosition,
  updatePreviewAnimation,
  makeSelectAnimationPosition,
  changeCurrentNarratorBlock,
  makeSelectCurrentNarratorBlockIndex,
} from 'global/reducers/localState';
import { makeSelectQuestionGroupsIds } from 'global/reducers/questionGroups';
import blockTypesMessages from 'global/i18n/blockTypesMessages';
import { Narrator, NarratorBlockTypes, Position } from 'models/Narrator';
import { Question } from 'models/Question';

import { ModalType, useModal } from 'components/Modal';
import Accordion from 'components/Accordion';

import { getBlockColor, renderBlock } from '../utils';
import { removeBlock, reorderNarratorBlocks } from '../../actions';
import messages from '../messages';
import ClearAnimationButton from '../Blocks/clearAnimationButton';

type NonReduxProps = {
  disabled: boolean;
  id: string;
  narrator: Narrator;
  isTlfbGroup: boolean;
  groupIds: string[];
};

type Props = {
  setDraggable: (isDraggable: boolean) => void;
  setOffset: (positionX: number, positionY: number) => void;
  animationPosition: Position;
  deleteBlock: (index: number, narratorBlockIndex: number) => void;
  updateNarratorPreviewAnimation: (animation: string) => void;
  reorderBlocks: (blocks: any) => void;
  changeNarratorBlockIndex: (index: number) => void;
  narratorBlockIndex: number;
  questions: Question[];
  questionId: string;
} & NonReduxProps;

const WrappedAccordion = ({
  id,
  narrator,
  setDraggable,
  setOffset,
  animationPosition,
  deleteBlock,
  updateNarratorPreviewAnimation,
  reorderBlocks,
  changeNarratorBlockIndex,
  narratorBlockIndex,
  questions,
  questionId,
  disabled,
  groupIds,
  isTlfbGroup,
}: Props) => {
  const { voice, animation, character } = narrator.settings;

  const { formatMessage } = useIntl();

  useEffect(() => {
    if (narrator.blocks.length !== 0) {
      changeNarratorBlockIndex(0);
    }
  }, []);

  useEffect(() => {
    if (narratorBlockIndex >= narrator.blocks.length) {
      changeNarratorBlockIndex(-1);
    }
  }, [narrator.blocks.length]);

  const hideAccordion = () => {
    setDraggable(false);
    const { endPosition } = narrator.blocks[0] || {};
    setOffset(endPosition.x, endPosition.y);
    updateNarratorPreviewAnimation('standStill');
    blurDocument();
  };

  const openAccordion = (index: number) => {
    setDraggable(true);
    const { endPosition } = narrator.blocks[index] || {};
    if (!isEqual(endPosition, animationPosition)) {
      setOffset(endPosition.x, endPosition.y);
    }
  };

  const handleDelete = (index: number) => {
    if (narratorBlockIndex !== -1 && index === narrator.blocks.length - 1)
      changeNarratorBlockIndex(index - 1);
    deleteBlock(index, narratorBlockIndex);
    const newQuestions = cloneDeep(questions);
    const questionIndex = questions.findIndex(
      ({ id: qId }) => qId === questionId,
    );
    newQuestions[questionIndex].narrator.blocks.splice(index, 1);

    const position = getNarratorPositionWhenBlockIsRemoved(
      newQuestions,
      questionIndex,
      index,
      narratorBlockIndex,
      groupIds,
    );
    setOffset(position.x, position.y);
  };

  const handleReorder = (previousIndex: number, nextIndex: number) => {
    const newList = reorder(narrator.blocks, previousIndex, nextIndex);
    reorderBlocks(newList);
  };

  const {
    openModal: openDeleteModal,
    Modal: DeleteModal,
    modalState: blockToDeleteIndex,
  } = useModal<number>({
    type: ModalType.ConfirmationModal,
    props: {
      description: formatMessage(messages.deleteBlockHeader),
      content: formatMessage(messages.deleteBlockMessage),
      confirmAction: () => handleDelete(blockToDeleteIndex as number),
    },
  });

  return (
    <>
      <DeleteModal />
      {narrator && !!narrator.blocks.length && (
        <Accordion
          data-cy="narrator-blocks"
          disabled={disabled}
          opened={narratorBlockIndex}
          setOpened={changeNarratorBlockIndex}
          onHide={hideAccordion}
          onOpen={openAccordion}
          onReorder={handleReorder}
          onDelete={openDeleteModal}
        >
          {map(narrator.blocks, (block, blockIndex) => {
            const accordionItemProps = {
              'data-cy': `narrator-block-${blockIndex}`,
              key: `${id}-narrator-block-${blockIndex}`,
              color: getBlockColor(block.type, { animation, voice }),
              deleteActive: block.type !== NarratorBlockTypes.FEEDBACK,
              label: `${blockIndex + 1}. ${formatMessage(
                blockTypesMessages[block.type],
              )}`,
            };

            return (
              <div {...accordionItemProps}>
                {!isTlfbGroup && (
                  <ClearAnimationButton
                    blockIndex={blockIndex}
                    disabled={disabled}
                  />
                )}
                {renderBlock(
                  block,
                  blockIndex,
                  id,
                  formatMessage,
                  disabled,
                  !animation,
                  isTlfbGroup,
                  character,
                )}
              </div>
            );
          })}
        </Accordion>
      )}
    </>
  );
};

const mapDispatchToProps = {
  deleteBlock: removeBlock,
  setDraggable: setCharacterDraggable,
  setOffset: setAnimationStopPosition,
  updateNarratorPreviewAnimation: updatePreviewAnimation,
  reorderBlocks: reorderNarratorBlocks,
  changeNarratorBlockIndex: changeCurrentNarratorBlock,
};

const mapStateToProps = createStructuredSelector({
  animationPosition: makeSelectAnimationPosition(),
  narratorBlockIndex: makeSelectCurrentNarratorBlockIndex(),
  questions: makeSelectQuestions(),
  questionId: makeSelectSelectedQuestionId(),
  groupIds: makeSelectQuestionGroupsIds(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(
  WrappedAccordion,
) as React.ComponentType<NonReduxProps>;
