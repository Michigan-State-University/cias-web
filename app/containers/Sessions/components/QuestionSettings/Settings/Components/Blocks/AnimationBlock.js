import React from 'react';
import PropTypes from 'prop-types';
import camelCase from 'lodash/camelCase';
import { compose } from 'redux';
import { connect } from 'react-redux';

import Chips from 'components/Chips';
import { colors } from 'theme';
import { updatePreviewAnimation } from 'global/reducers/localState';
import {
  bodyAnimationType,
  headAnimationType,
} from 'models/Narrator/BlockTypes';

import { bodyAnimations, headAnimations } from './animations';
import { updateNarratorAnimation } from '../../actions';
import ClearAnimationButton from './clearAnimationButton';

const getPossibleAnimations = (type, formatMessage) => {
  if (type === headAnimationType) return headAnimations(formatMessage);
  if (type === bodyAnimationType) return bodyAnimations(formatMessage);
  return [];
};

const AnimationBlock = ({
  formatMessage,
  block,
  updateAnimation,
  updateNarratorPreviewAnimation,
  blockIndex,
  id,
  disabled,
}) => {
  const onChipsClick = (index, value) => () => {
    const animName = camelCase(value.toLowerCase());
    if (block.animation !== animName) {
      updateNarratorPreviewAnimation(animName);
      updateAnimation(index, animName, id);
    }
  };

  return (
    <>
      <ClearAnimationButton blockIndex={blockIndex} disabled={disabled} />
      {getPossibleAnimations(block.type, formatMessage).map(
        (anim, animIndex) => {
          const isActive = block.animation === camelCase(anim.toLowerCase());
          return (
            <Chips
              disabled={disabled}
              px={15}
              py={4}
              borderRadius={20}
              clickable
              bg={colors.azure}
              bgOpacity={isActive ? null : 0.1}
              onClick={onChipsClick(blockIndex, anim)}
              isActive={isActive}
              key={`el-chips-${animIndex}`}
            >
              {anim}
            </Chips>
          );
        },
      )}
    </>
  );
};

AnimationBlock.propTypes = {
  formatMessage: PropTypes.func.isRequired,
  block: PropTypes.shape({
    type: PropTypes.string,
    animation: PropTypes.string,
  }),
  id: PropTypes.string,
  blockIndex: PropTypes.number,
  updateAnimation: PropTypes.func,
  updateNarratorPreviewAnimation: PropTypes.func,
  disabled: PropTypes.bool,
};

const mapDispatchToProps = {
  updateAnimation: updateNarratorAnimation,
  updateNarratorPreviewAnimation: updatePreviewAnimation,
};

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(AnimationBlock);
