/**
 *
 * BranchingLayout
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import VariableChooser from 'components/BranchingLayout/VariableChooser';
import Img from 'components/Img';
import Box from 'components/Box';
import Column from 'components/Column';
import Row from 'components/Row';
import Text from 'components/Text';
import { StyledInput } from 'components/Input/StyledInput';

import binNoBg from 'assets/svg/bin-no-bg.svg';

import { themeColors, colors } from 'theme';
import InequalityChooser from 'components/InequalityChooser';
import messages from '../messages';
import { CaseInput, DashedBox } from './styled';

const SpectrumVariableChooser = ({
  intl: { formatMessage },
  id,
  spectrum,
  onFormulaUpdate,
  onAddCase,
  onRemoveCase,
  onUpdateCase,
}) => {
  const [variableChooserOpen, setVariableChooserOpen] = useState(false);

  return (
    <Column>
      <Row mt={20} align="center" justify="between">
        <Text fontWeight="bold">{formatMessage(messages.spectrumHeader)}</Text>
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
      <Box position="relative">
        <VariableChooser
          visible={variableChooserOpen}
          setOpen={setVariableChooserOpen}
          onClick={value => {
            setVariableChooserOpen(false);
            onFormulaUpdate(`${spectrum.payload}${value}`, id);
          }}
        />
      </Box>
      <Box bg={colors.linkWater} width="100%" mt={10} mb={20} px={8} py={8}>
        <StyledInput
          type="multiline"
          rows="5"
          width="auto"
          placeholder={formatMessage(messages.formulaPlaceholder)}
          value={spectrum.payload}
          onBlur={value => onFormulaUpdate(value, id)}
        />
      </Box>
      {spectrum.patterns.map((pattern, index) => (
        <Row
          key={`${id}-settings-feedback-spectrum-case-${index}`}
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
            {formatMessage(messages.equalsTo)}
          </Text>
          <Box bg={colors.linkWater} mx={10}>
            <CaseInput
              px={0}
              py={12}
              textAlign="center"
              placeholder="..."
              value={pattern.target}
              onBlur={value =>
                onUpdateCase(index, { ...pattern, target: value }, id)
              }
            />
          </Box>
          <Img
            ml={10}
            src={binNoBg}
            onClick={() => onRemoveCase(index, id)}
            clickable
          />
        </Row>
      ))}
      <DashedBox mt={20} onClick={() => onAddCase(id)}>
        {formatMessage(messages.newCase)}
      </DashedBox>
    </Column>
  );
};

SpectrumVariableChooser.propTypes = {
  id: PropTypes.string,
  intl: PropTypes.object,
  spectrum: PropTypes.shape({
    payload: PropTypes.string,
    patterns: PropTypes.arrayOf(
      PropTypes.shape({ match: PropTypes.string, target: PropTypes.string }),
    ),
  }),
  onFormulaUpdate: PropTypes.func,
  onAddCase: PropTypes.func,
  onRemoveCase: PropTypes.func,
  onUpdateCase: PropTypes.func,
};

export default injectIntl(SpectrumVariableChooser);
