import React, { useState } from 'react';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import snakeCase from 'lodash/snakeCase';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl, intlShape } from 'react-intl';

import Accordion from 'components/Accordion';
import Box from 'components/Box';
import Chips from 'components/Chips';
import Column from 'components/Column';
import H3 from 'components/H3';
import Row from 'components/Row';
import Switch from 'components/Switch';
import Tabs from 'components/Tabs';
import ApprovableInput from 'components/Input/ApprovableInput';
import { blockTypes } from 'models/Narrator/BlockTypes';
import { colors } from 'theme';
import { updatePreviewAnimation } from 'containers/Interventions/containers/EditInterventionPage/actions';

import messages from './messages';
import {
  updateSettings as updateQuestionSettings,
  addBlock,
  updateNarratorSettings,
  updateNarratorAnimation,
  updateFormula,
  addFormulaCase,
} from './actions';

import BlockTypeChooser from '../BlockTypeChooser';
import { DashedBox } from './styled';
import { bodyAnimations, facialAnimations } from './animations';
import { makeSelectSelectedQuestion } from '../../../containers/EditInterventionPage/selectors';

const getPossibleAnimations = (type, formatMessage) => {
  if (type === blockTypes[0]) return facialAnimations(formatMessage);
  if (type === blockTypes[1]) return bodyAnimations(formatMessage);
  return [];
};

const DefaultSettings = ({
  selectedQuestion: { narrator, settings, id, formula } = {},
  onQuestionToggle,
  onNarratorToggle,
  onCreate,
  updateAnimation,
  updateNarratorPreviewAnimation,
  onFormulaUpdate,
  onAddCase,
  intl: { formatMessage },
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
    <Column>
      <Tabs>
        <div label={formatMessage(messages.settings)}>
          {map(settings, (val, index) => (
            <Row
              key={`el-settings-${id}-${index}`}
              justify="between"
              align="center"
              mb={15}
            >
              <H3>{formatMessage(messages[`${index}`])}</H3>
              <Switch
                checked={val}
                onToggle={value => onQuestionToggle(`${index}`, value)}
              />
            </Row>
          ))}
        </div>
        <div label={formatMessage(messages.narrator)}>
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
              map(narrator.blocks, (step, blockIndex) => (
                <div
                  key={`${id}-narrator-block-${blockIndex}`}
                  type={step.type}
                >
                  {getPossibleAnimations(step.type, formatMessage).map(
                    (anim, animIndex) => {
                      const isActive = step.animation === anim;
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
            <DashedBox onClick={toggleTypeChooser}>
              {formatMessage(messages.newStep)}
            </DashedBox>
            <BlockTypeChooser
              visible={typeChooserOpen}
              onClick={onCreateBlock}
            />
          </Box>
        </div>
        <div label={formatMessage(messages.branching)}>
          <Column>
            {formatMessage(messages.formula)}
            {formula && (
              <Box bg={colors.linkWater} width="100%" mt={10} px={8} py={8}>
                <ApprovableInput
                  rows="5"
                  width="auto"
                  placeholder={formatMessage(messages.formulaPlaceholder)}
                  value={formula.payload}
                  onCheck={val => onFormulaUpdate(val, id)}
                />
              </Box>
            )}
            <DashedBox onClick={() => onAddCase(id)}>
              {formatMessage(messages.newCase)}
            </DashedBox>
          </Column>
        </div>
      </Tabs>
    </Column>
  );
};

DefaultSettings.propTypes = {
  intl: intlShape,
  onQuestionToggle: PropTypes.func.isRequired,
  onNarratorToggle: PropTypes.func.isRequired,
  selectedQuestion: PropTypes.object,
  onCreate: PropTypes.func,
  updateAnimation: PropTypes.func,
  updateNarratorPreviewAnimation: PropTypes.func,
  onFormulaUpdate: PropTypes.func,
  onAddCase: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  selectedQuestion: makeSelectSelectedQuestion(),
});

const mapDispatchToProps = {
  onQuestionToggle: updateQuestionSettings,
  onCreate: addBlock,
  onNarratorToggle: updateNarratorSettings,
  updateAnimation: updateNarratorAnimation,
  updateNarratorPreviewAnimation: updatePreviewAnimation,
  onFormulaUpdate: updateFormula,
  onAddCase: addFormulaCase,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default injectIntl(compose(withConnect)(DefaultSettings));
