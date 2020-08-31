/**
 *
 * BranchingLayout
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Column from 'components/Column';
import Row from 'components/Row';
import Box from 'components/Box';
import Text from 'components/Text';
import Img from 'components/Img';
import ArrowDropdown from 'components/ArrowDropdown';
import { StyledInput } from 'components/Input/StyledInput';

import binNoBg from 'assets/svg/bin-no-bg.svg';
import { colors, themeColors } from 'theme';
import { injectIntl } from 'react-intl';
import VariableChooser from './VariableChooser';
import { CaseInput, DashedBox } from './styled';

import TargetQuestionChooser from './TargetQuestionChooser';

import messages from './messages';

function BranchingLayout({
  formula,
  intl: { formatMessage },
  onFormulaUpdate,
  id,
  onUpdateCase,
  displayPatternTargetText,
  onRemoveCase,
  onAddCase,
  problemBranching,
}) {
  const [targetChooserOpen, setTargetChooserOpen] = useState(-1);
  const [variableChooserOpen, setVariableChooserOpen] = useState(false);
  return (
    <>
      <Column>
        <Row align="center" justify="between">
          {formatMessage(messages.formula)}
          <Box
            onClick={() => setVariableChooserOpen(!variableChooserOpen)}
            clickable
          >
            <Text
              fontWeight="bold"
              color={themeColors.secondary}
              hoverDecoration="underline"
            >
              {formatMessage(messages.addVariable)}
            </Text>
          </Box>
        </Row>
        {formula && (
          <>
            <Box
              bg={colors.linkWater}
              width="100%"
              mt={10}
              mb={20}
              px={8}
              py={8}
            >
              <StyledInput
                type="multiline"
                rows={problemBranching ? '1' : '5'}
                width="auto"
                placeholder={formatMessage(messages.formulaPlaceholder)}
                value={formula.payload}
                onBlur={val => onFormulaUpdate(val, id)}
              />
            </Box>
            {problemBranching && (
              <Box position="relative" top={-90}>
                <VariableChooser
                  visible={variableChooserOpen}
                  setOpen={setVariableChooserOpen}
                  onClick={value => {
                    setVariableChooserOpen(false);
                    onFormulaUpdate(`${formula.payload}${value}`, id);
                  }}
                />
              </Box>
            )}
            {!problemBranching && (
              <Box position="absolute" right={25} top={310}>
                <VariableChooser
                  visible={variableChooserOpen}
                  setOpen={setVariableChooserOpen}
                  onClick={value => {
                    setVariableChooserOpen(false);
                    onFormulaUpdate(`${formula.payload}${value}`, id);
                  }}
                />
              </Box>
            )}
            {formula.patterns.map((pattern, index) => {
              const isChooserOpened = index === targetChooserOpen;
              return (
                <Row
                  key={`${id}-settings-branching-case-${index}`}
                  align="center"
                  mb={8}
                >
                  <Text whiteSpace="pre">{formatMessage(messages.if)}</Text>
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
                    {formatMessage(messages.goTo)}
                  </Text>
                  <ArrowDropdown
                    width="100%"
                    positionFrom="right"
                    setOpen={value => setTargetChooserOpen(value ? index : -1)}
                    isOpened={isChooserOpened}
                    dropdownContent={
                      <Box maxWidth={140}>
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
                      isVisible={isChooserOpened}
                      pattern={pattern}
                      onClick={value => {
                        setTargetChooserOpen(false);
                        onUpdateCase(index, { ...pattern, target: value }, id);
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
              );
            })}
          </>
        )}
        <DashedBox mt={20} onClick={() => onAddCase(id)}>
          {formatMessage(messages.newCase)}
        </DashedBox>
      </Column>
    </>
  );
}

BranchingLayout.propTypes = {
  id: PropTypes.string,
  formula: PropTypes.object,
  onFormulaUpdate: PropTypes.func,
  onAddCase: PropTypes.func,
  onRemoveCase: PropTypes.func,
  onUpdateCase: PropTypes.func,
  intl: PropTypes.object,
  displayPatternTargetText: PropTypes.func,
  problemBranching: PropTypes.bool,
};

export default injectIntl(BranchingLayout);