import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { map, snakeCase } from 'lodash';
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
import Img from 'components/Img';
import ArrowDropdown from 'components/ArrowDropdown';
import Text from 'components/Text';

import binNoBg from 'assets/svg/bin-no-bg.svg';

import { blockTypes } from 'models/Narrator/BlockTypes';
import { colors } from 'theme';
import { updatePreviewAnimation } from 'containers/Interventions/containers/EditInterventionPage/actions';

import globalMessages from 'global/i18n/globalMessages';
import Question from 'models/Intervention/Question';
import { findQuestionIndex } from 'containers/Interventions/containers/EditInterventionPage/utils';
import messages from './messages';
import {
  updateSettings as updateQuestionSettings,
  addBlock,
  updateNarratorSettings,
  updateNarratorAnimation,
  updateFormula,
  addFormulaCase,
  removeFormulaCase,
  updateFormulaCase,
} from './actions';

import BlockTypeChooser from '../BlockTypeChooser';
import { DashedBox, CaseInput } from './styled';
import { bodyAnimations, facialAnimations } from './animations';
import {
  makeSelectSelectedQuestion,
  makeSelectQuestions,
} from '../../../containers/EditInterventionPage/selectors';
import TargetQuestionChooser from '../TargetQuestionChooser';

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
  onRemoveCase,
  onUpdateCase,
  questions,
  intl: { formatMessage },
}) => {
  const [typeChooserOpen, setTypeChooserOpen] = useState(false);
  const [targetChooserOpen, setTargetChooserOpen] = useState(-1);

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

  const displayPatternTargetText = questionId => {
    const selectedIndex = findQuestionIndex(questions, id);
    const targetIndex = findQuestionIndex(questions, questionId);

    if (selectedIndex === targetIndex - 1)
      return formatMessage(globalMessages.general.nextScreen);

    if (targetIndex !== -1) return questions[targetIndex].title;

    return formatMessage(messages.selectQuestion);
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
            <DashedBox mt={14} onClick={toggleTypeChooser}>
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
            {formatMessage(globalMessages.general.formula)}
            {formula && (
              <Fragment>
                <Box
                  bg={colors.linkWater}
                  width="100%"
                  mt={10}
                  mb={20}
                  px={8}
                  py={8}
                >
                  <ApprovableInput
                    rows="5"
                    width="auto"
                    placeholder={formatMessage(messages.formulaPlaceholder)}
                    value={formula.payload}
                    onCheck={val => onFormulaUpdate(val, id)}
                  />
                </Box>
                {formula.patterns.map((pattern, index) => (
                  <Row
                    key={`${id}-settings-branching-case-${index}`}
                    align="center"
                    mb={8}
                  >
                    <Text whiteSpace="pre">
                      {formatMessage(globalMessages.general.if)}
                    </Text>
                    <Box bg={colors.linkWater} mx={10}>
                      <CaseInput
                        px={0}
                        py={12}
                        textAlign="center"
                        placeholder="..."
                        value={pattern.match}
                        onBlur={value =>
                          onUpdateCase(index, { ...pattern, match: value }, id)
                        }
                      />
                    </Box>
                    <Text whiteSpace="pre" mr={10}>
                      {formatMessage(globalMessages.general.goTo)}
                    </Text>
                    <ArrowDropdown
                      width="100%"
                      positionFrom="right"
                      setOpen={value =>
                        setTargetChooserOpen(value ? index : -1)
                      }
                      isOpened={index === targetChooserOpen}
                      dropdownContent={
                        <Box maxWidth={70}>
                          <Text
                            textOverflow="ellipsis"
                            whiteSpace="pre"
                            overflow="hidden"
                          >
                            {displayPatternTargetText(pattern.target)}
                          </Text>
                        </Box>
                      }
                    >
                      <TargetQuestionChooser
                        pattern={pattern}
                        onClick={value => {
                          setTargetChooserOpen(false);
                          onUpdateCase(
                            index,
                            { ...pattern, target: value },
                            id,
                          );
                        }}
                      />
                    </ArrowDropdown>
                    <Img
                      ml={10}
                      src={binNoBg}
                      onClick={() => onRemoveCase(index, id)}
                      clickable
                    />
                  </Row>
                ))}
              </Fragment>
            )}
            <DashedBox mt={20} onClick={() => onAddCase(id)}>
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
  onRemoveCase: PropTypes.func,
  onUpdateCase: PropTypes.func,
  questions: PropTypes.arrayOf(PropTypes.shape(Question)),
};

const mapStateToProps = createStructuredSelector({
  selectedQuestion: makeSelectSelectedQuestion(),
  questions: makeSelectQuestions(),
});

const mapDispatchToProps = {
  onQuestionToggle: updateQuestionSettings,
  onCreate: addBlock,
  onNarratorToggle: updateNarratorSettings,
  updateAnimation: updateNarratorAnimation,
  updateNarratorPreviewAnimation: updatePreviewAnimation,
  onFormulaUpdate: updateFormula,
  onAddCase: addFormulaCase,
  onRemoveCase: removeFormulaCase,
  onUpdateCase: updateFormulaCase,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default injectIntl(compose(withConnect)(DefaultSettings));
