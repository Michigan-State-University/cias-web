import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import camelCase from 'lodash/camelCase';

import Chips from 'components/Chips';
import {
  bodyAnimationType,
  headAnimationType,
} from 'models/Narrator/BlockTypes';
import { colors } from 'theme';
import { updatePreviewAnimation } from 'containers/Interventions/containers/EditInterventionPage/actions';

import { bodyAnimations, headAnimations } from './animations';
import { updateNarratorAnimation } from '../../actions';

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
}) => {
  const onChipsClick = (index, value) => () => {
    const animName = camelCase(value.toLowerCase());
    if (block.animation === animName) {
      updateNarratorPreviewAnimation('standStill');
      updateAnimation(index, null, id);
    } else {
      updateNarratorPreviewAnimation(animName);
      updateAnimation(index, animName, id);
    }
  };

  return (
    <>
      {getPossibleAnimations(block.type, formatMessage).map(
        (anim, animIndex) => {
          const isActive = block.animation === camelCase(anim.toLowerCase());

          return (
            <Chips
              px={15}
              py={4}
              borderRadius={20}
              clickable
              bg={colors.azure}
              opacity={isActive ? null : 0.1}
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
