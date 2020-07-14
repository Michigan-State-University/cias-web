import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import map from 'lodash/map';
import isEqual from 'lodash/isEqual';

import Accordion from 'components/Accordion';
import Box from 'components/Box';
import H3 from 'components/H3';
import Row from 'components/Row';
import Switch from 'components/Switch';
import lastKey from 'utils/getLastKey';
import {
  bodyAnimationType,
  speechType,
  blockTypeToColorMap,
} from 'models/Narrator/BlockTypes';
import { colors, borders } from 'theme';

import globalMessages from 'global/i18n/globalMessages';
import {
  setPeedyDraggable,
  setAnimationStopPosition,
} from 'containers/Interventions/containers/EditInterventionPage/actions';
import {
  makeSelectDraggable,
  makeSelectAnimationPosition,
} from 'containers/Interventions/components/QuestionNarrator/selectors';
import { Button } from 'components/Button';
import { createStructuredSelector } from 'reselect';
import { makeSelectSelectedQuestionIndex } from 'containers/Interventions/containers/EditInterventionPage/selectors';
import messages from '../messages';
import BlockTypeChooser from '../../../BlockTypeChooser';
import { DashedBox } from '../styled';
import {
  addBlock,
  updateNarratorSettings,
  saveNarratorMovement,
} from '../../actions';
import BodyAnimationBlock from '../Blocks/BodyAnimationBlock';
import SpeechBlock from '../Blocks/SpeechBlock';

const NarratorTab = ({
  formatMessage,
  narrator,
  onNarratorToggle,
  onCreate,
  id,
  draggable,
  setDraggable,
  setOffset,
  savePosition,
  animationPosition,
  currentQuestionIndex,
}) => {
  const [typeChooserOpen, setTypeChooserOpen] = useState(false);
  const toggleTypeChooser = () => setTypeChooserOpen(!typeChooserOpen);
  const { voice, animation } = narrator.settings;

  const onCreateBlock = type => {
    onCreate(type, id);
    toggleTypeChooser();
  };

  const renderBlock = (block, index) => {
    switch (block.type) {
      case bodyAnimationType:
        return (
          <BodyAnimationBlock
            formatMessage={formatMessage}
            block={block}
            blockIndex={index}
            id={id}
          />
        );
      case speechType:
        return (
          <SpeechBlock
            formatMessage={formatMessage}
            block={block}
            blockIndex={index}
            id={id}
          />
        );
      default:
        return null;
    }
  };

  const getBlockColor = type => {
    switch (type) {
      case bodyAnimationType:
        return animation ? blockTypeToColorMap[type] : colors.grey;
      case speechType:
        return voice ? blockTypeToColorMap[type] : colors.grey;
      default:
        return null;
    }
  };

  const cancelAction = index => {
    if (draggable) {
      const {
        position: { posFrom },
      } = narrator.blocks[index];
      setDraggable(false);
      savePosition(index, id, posFrom);
      setOffset(posFrom.x, posFrom.y);
    }
  };

  const moveAnimation = index => {
    const { position } = narrator.blocks[index];
    if (!isEqual(position.posTo, animationPosition)) {
      setOffset(position.posTo.x, position.posTo.y);
    }
  };

  const last = lastKey(narrator.settings);

  const getBorderBottom = index => {
    if (index === last) return null;
    return `${borders.borderWidth} ${borders.borderStyle} ${colors.linkWater}`;
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
              pb={15}
              mb={15}
              borderBottom={getBorderBottom(index)}
            >
              <H3>{formatMessage(messages[`${index}`])}</H3>
              <Switch
                checked={val}
                onToggle={value => onNarratorToggle(`${index}`, value)}
              />
            </Row>
          ))}
      </Box>
      <Accordion
        accordionParentKey={currentQuestionIndex}
        onHide={cancelAction}
        onOpen={moveAnimation}
      >
        {narrator &&
          map(narrator.blocks, (block, blockIndex) => (
            <div
              key={`${id}-narrator-block-${blockIndex}`}
              color={getBlockColor(block.type)}
              label={`${blockIndex + 1}. ${formatMessage(
                globalMessages.blockTypes[block.type],
              )}`}
            >
              {!draggable && (
                <Button
                  onClick={() => setDraggable(true)}
                  mt={15}
                  inverted
                  title={formatMessage(messages.replaceCharacter)}
                />
              )}
              {draggable && (
                <Row width="100%" mt={15}>
                  <Button
                    onClick={() => {
                      savePosition(blockIndex, id, animationPosition);
                      setDraggable(false);
                    }}
                    title={formatMessage(messages.save)}
                    mr={5}
                    width="50%"
                  />
                  <Button
                    onClick={() => cancelAction(blockIndex)}
                    ml={5}
                    inverted
                    width="50%"
                    title={formatMessage(messages.cancel)}
                  />
                </Row>
              )}

              {renderBlock(block, blockIndex)}
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
  id: PropTypes.string,
  narrator: PropTypes.object,
  animationPosition: PropTypes.object,
  onNarratorToggle: PropTypes.func.isRequired,
  onCreate: PropTypes.func,
  setDraggable: PropTypes.func,
  setOffset: PropTypes.func,
  savePosition: PropTypes.func,
  draggable: PropTypes.bool,
  currentQuestionIndex: PropTypes.number,
};

const mapDispatchToProps = {
  onCreate: addBlock,
  onNarratorToggle: updateNarratorSettings,
  setDraggable: setPeedyDraggable,
  setOffset: setAnimationStopPosition,
  savePosition: saveNarratorMovement,
};

const mapStateToProps = createStructuredSelector({
  draggable: makeSelectDraggable(),
  animationPosition: makeSelectAnimationPosition(),
  currentQuestionIndex: makeSelectSelectedQuestionIndex(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(NarratorTab);
