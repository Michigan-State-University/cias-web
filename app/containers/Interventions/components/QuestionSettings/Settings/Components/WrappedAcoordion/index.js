import React from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import map from 'lodash/map';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reorder } from 'react-reorder';

import Accordion from 'components/Accordion';

import globalMessages from 'global/i18n/globalMessages';
import {
  setPeedyDraggable,
  setAnimationStopPosition,
  updatePreviewAnimation,
} from 'containers/Interventions/containers/EditInterventionPage/actions';
import { createStructuredSelector } from 'reselect';
import {
  changeCurrentNarratorBlock,
  makeSelectCurrentNarratorBlockIndex,
} from 'global/reducers/localState';
import { makeSelectAnimationPosition } from 'containers/Interventions/components/QuestionNarrator/selectors';

import { getBlockColor, renderBlock } from '../utils';
import { removeBlock, reorderNarratorBlocks } from '../../actions';

const WrappedAccordion = ({
  id,
  narrator,
  formatMessage,
  setDraggable,
  setOffset,
  animationPosition,
  deleteBlock,
  updateNarratorPreviewAnimation,
  reorderBlocks,
  changeNarratorBlockIndex,
  narratorBlockIndex,
}) => {
  const { voice, animation } = narrator.settings;

  const hideAccordion = () => {
    setDraggable(false);
    const { endPosition } = narrator.blocks[0] || {};
    setOffset(endPosition.x, endPosition.y);
    updateNarratorPreviewAnimation('standStill');
  };

  const openAccordion = index => {
    setDraggable(true);
    const { endPosition } = narrator.blocks[index] || {};
    if (!isEqual(endPosition, animationPosition)) {
      setOffset(endPosition.x, endPosition.y);
    }
  };

  const handleDelete = index => {
    if (narratorBlockIndex !== -1 && index === narrator.blocks.length - 1)
      changeNarratorBlockIndex(index - 1);
    deleteBlock(index, narratorBlockIndex);
  };

  const handleReorder = (event, previousIndex, nextIndex) => {
    const newList = reorder(narrator.blocks, previousIndex, nextIndex);
    reorderBlocks(newList);
  };

  return (
    <Accordion
      opened={narratorBlockIndex}
      setOpened={changeNarratorBlockIndex}
      onHide={hideAccordion}
      onOpen={openAccordion}
      onReorder={handleReorder}
      onDelete={handleDelete}
    >
      {narrator &&
        map(narrator.blocks, (block, blockIndex) => (
          <div
            key={`${id}-narrator-block-${blockIndex}`}
            color={getBlockColor(block.type, { animation, voice })}
            label={`${blockIndex + 1}. ${formatMessage(
              globalMessages.blockTypes[block.type],
            )}`}
          >
            {renderBlock(block, blockIndex, id, formatMessage)}
          </div>
        ))}
    </Accordion>
  );
};

WrappedAccordion.propTypes = {
  formatMessage: PropTypes.func.isRequired,
  id: PropTypes.string,
  narrator: PropTypes.object,
  setDraggable: PropTypes.func,
  setOffset: PropTypes.func,
  deleteBlock: PropTypes.func,
  updateNarratorPreviewAnimation: PropTypes.func,
  reorderBlocks: PropTypes.func,
  animationPosition: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }),
  changeNarratorBlockIndex: PropTypes.func,
  narratorBlockIndex: PropTypes.number,
};

const mapDispatchToProps = {
  deleteBlock: removeBlock,
  setDraggable: setPeedyDraggable,
  setOffset: setAnimationStopPosition,
  updateNarratorPreviewAnimation: updatePreviewAnimation,
  reorderBlocks: reorderNarratorBlocks,
  changeNarratorBlockIndex: changeCurrentNarratorBlock,
};

const mapStateToProps = createStructuredSelector({
  animationPosition: makeSelectAnimationPosition(),
  narratorBlockIndex: makeSelectCurrentNarratorBlockIndex(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(WrappedAccordion);