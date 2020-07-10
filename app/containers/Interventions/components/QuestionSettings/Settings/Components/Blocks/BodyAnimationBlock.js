import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import kebabCase from 'lodash/kebabCase';

import Chips from 'components/Chips';
import { blockTypes } from 'models/Narrator/BlockTypes';
import { colors } from 'theme';
import { updatePreviewAnimation } from 'containers/Interventions/containers/EditInterventionPage/actions';

import { bodyAnimations, facialAnimations } from '../animations';
import { updateNarratorAnimation } from '../../actions';

const getPossibleAnimations = (type, formatMessage) => {
  if (type === blockTypes[0]) return facialAnimations(formatMessage);
  if (type === blockTypes[1]) return bodyAnimations(formatMessage);
  return [];
};

const BodyAnimationBlock = ({
  formatMessage,
  block,
  updateAnimation,
  updateNarratorPreviewAnimation,
  blockIndex,
  id,
}) => {
  const onChipsClick = (index, value) => () => {
    const animName = kebabCase(value.toLowerCase());
    if (block.animation === animName) {
      updateNarratorPreviewAnimation('stand-still');
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
          const isActive = block.animation === kebabCase(anim.toLowerCase());

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

BodyAnimationBlock.propTypes = {
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

export default compose(withConnect)(BodyAnimationBlock);
