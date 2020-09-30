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
import { FormattedMessage, injectIntl } from 'react-intl';
import EllipsisText from 'components/Text/EllipsisText';
import InequalityChooser from 'components/InequalityChooser';
import VariableChooser from './VariableChooser';
import { DashedBox } from './styled';

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
  onVariableChooserOpen,
}) {
  const [targetChooserOpen, setTargetChooserOpen] = useState(-1);
  const [variableChooserOpen, setVariableChooserOpen] = useState(false);

  const shouldDisplayElseStatement = formula.patterns.length !== 0;

  return (
    <>
      <Column>
        <Row align="center" justify="between">
          {formatMessage(messages.formula)}
          <Box
            onClick={() => {
              if (onVariableChooserOpen) onVariableChooserOpen();
              setVariableChooserOpen(!variableChooserOpen);
            }}
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
              <Box position="absolute" right={25} top={160} width="100%">
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
                  <InequalityChooser
                    onSuccessfulChange={value =>
                      onUpdateCase(index, { ...pattern, match: value }, id)
                    }
                    inequalityValue={pattern.match}
                  />
                  <Text whiteSpace="pre" mr={10}>
                    {formatMessage(messages.goTo)}
                  </Text>
                  <ArrowDropdown
                    width="100%"
                    positionFrom="right"
                    setOpen={value => setTargetChooserOpen(value ? index : -1)}
                    isOpened={isChooserOpened}
                    childWidthScope="child"
                    dropdownContent={
                      <Box maxWidth={140}>
                        <EllipsisText
                          text={displayPatternTargetText(pattern.target)}
                          fontSize={13}
                        />
                      </Box>
                    }
                  >
                    <TargetQuestionChooser
                      problemBranching={problemBranching}
                      isVisible={isChooserOpened}
                      pattern={pattern}
                      onClick={value => {
                        setTargetChooserOpen(-1);
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
            {shouldDisplayElseStatement && (
              // FormattedMessage needed for rich text to work
              <Text>
                <FormattedMessage
                  {...messages.else}
                  values={{
                    message: problemBranching
                      ? formatMessage(messages.nextSession)
                      : formatMessage(messages.nextScreen),
                  }}
                />
              </Text>
            )}
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
  onVariableChooserOpen: PropTypes.func,
};

export default injectIntl(BranchingLayout);
