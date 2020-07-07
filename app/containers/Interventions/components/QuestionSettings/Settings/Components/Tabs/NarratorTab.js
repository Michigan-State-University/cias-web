import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { map, snakeCase } from 'lodash';

import Accordion from 'components/Accordion';
import Box from 'components/Box';
import Chips from 'components/Chips';
import H3 from 'components/H3';
import Row from 'components/Row';
import Switch from 'components/Switch';
import { blockTypes } from 'models/Narrator/BlockTypes';
import { colors } from 'theme';
import { updatePreviewAnimation } from 'containers/Interventions/containers/EditInterventionPage/actions';

import messages from '../messages';
import BlockTypeChooser from '../../../BlockTypeChooser';
import { DashedBox } from '../styled';
import { bodyAnimations, facialAnimations } from '../animations';
import {
  addBlock,
  updateNarratorSettings,
  updateNarratorAnimation,
} from '../../actions';

const getPossibleAnimations = (type, formatMessage) => {
  if (type === blockTypes[0]) return facialAnimations(formatMessage);
  if (type === blockTypes[1]) return bodyAnimations(formatMessage);
  return [];
};

const NarratorTab = ({
  formatMessage,
  narrator,
  onNarratorToggle,
  onCreate,
  updateAnimation,
  updateNarratorPreviewAnimation,
  id,
}) => {
  const [typeChooserOpen, setTypeChooserOpen] = useState(false);
  const toggleTypeChooser = () => setTypeChooserOpen(!typeChooserOpen);

  const onCreateBlock = type => {
    onCreate(type, id);
    toggleTypeChooser();
  };

  const onChipsClick = (index, value) => () => {
    if (narrator.blocks[index].animation === value) {
      updateNarratorPreviewAnimation('');
      updateAnimation(index, null, id);
    } else {
      updateNarratorPreviewAnimation(snakeCase(value.toLowerCase()));
      updateAnimation(index, value, id);
    }
  };
  return (
    <Fragment>
      <Box mb={30}>
        {narrator &&
          map(narrator.settings, (val, index) => (
            <Row
              key={`${id}-settings-narrator-${index}`}
              justify="between"
              align="center"
              mb={15}
            >
              <H3>{formatMessage(messages[`${index}`])}</H3>
              <Switch
                checked={val}
                onToggle={value => onNarratorToggle(`${index}`, value)}
              />
            </Row>
          ))}
      </Box>
      <Accordion>
        {narrator &&
          map(narrator.blocks, (block, blockIndex) => (
            <div key={`${id}-narrator-block-${blockIndex}`} type={block.type}>
              {getPossibleAnimations(block.type, formatMessage).map(
                (anim, animIndex) => {
                  const isActive = block.animation === anim;
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
            </div>
          ))}
      </Accordion>
      <Box position="relative">
        <DashedBox mt={14} onClick={toggleTypeChooser}>
          {formatMessage(messages.newStep)}
        </DashedBox>
        <BlockTypeChooser visible={typeChooserOpen} onClick={onCreateBlock} />
      </Box>
    </Fragment>
  );
};

NarratorTab.propTypes = {
  formatMessage: PropTypes.func.isRequired,
  narrator: PropTypes.object,
  id: PropTypes.string,
  onNarratorToggle: PropTypes.func.isRequired,
  onCreate: PropTypes.func,
  updateAnimation: PropTypes.func,
  updateNarratorPreviewAnimation: PropTypes.func,
};

const mapDispatchToProps = {
  onCreate: addBlock,
  onNarratorToggle: updateNarratorSettings,
  updateAnimation: updateNarratorAnimation,
  updateNarratorPreviewAnimation: updatePreviewAnimation,
};

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(NarratorTab);
