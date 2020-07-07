import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { map } from 'lodash';

import Accordion from 'components/Accordion';
import Box from 'components/Box';

import H3 from 'components/H3';
import Row from 'components/Row';
import Switch from 'components/Switch';
import { bodyAnimationType, speechType } from 'models/Narrator/BlockTypes';

import messages from '../messages';
import BlockTypeChooser from '../../../BlockTypeChooser';
import { DashedBox } from '../styled';
import { addBlock, updateNarratorSettings } from '../../actions';
import BodyAnimationBlock from '../Blocks/BodyAnimationBlock';

const NarratorTab = ({
  formatMessage,
  narrator,
  onNarratorToggle,
  onCreate,
  id,
}) => {
  const [typeChooserOpen, setTypeChooserOpen] = useState(false);
  const toggleTypeChooser = () => setTypeChooserOpen(!typeChooserOpen);

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
      default:
        return null;
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
  narrator: PropTypes.object,
  id: PropTypes.string,
  onNarratorToggle: PropTypes.func.isRequired,
  onCreate: PropTypes.func,
};

const mapDispatchToProps = {
  onCreate: addBlock,
  onNarratorToggle: updateNarratorSettings,
};

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(NarratorTab);
