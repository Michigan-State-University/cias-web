import React from 'react';

import decideIfPassValue from 'utils/decideIfPassValue';

import Box from 'components/Box';
import Text from 'components/Text';
import Row from 'components/Row';
import Radio from 'components/Radio';
import H2 from 'components/H2';
import Tooltip from 'components/Tooltip';
import questionMark from 'assets/svg/grey-question-mark.svg';
import { OptionType } from '../types';

interface Props {
  onOptionHover?: (option: Nullable<OptionType>) => void;
  updateSetting: (value: string) => void;
  disabled: boolean;
  radioOptions: OptionType[];
  selectedValue: string;
  radioPanelTitle: JSX.Element;
  nameTooltip?: JSX.Element;
  disabledOptions?: string[];
}

const InterventionRadioPanel = ({
  onOptionHover,
  updateSetting,
  disabled,
  radioOptions,
  selectedValue,
  radioPanelTitle,
  nameTooltip,
  disabledOptions,
}: Props) => {
  const changeInfo = (option: Nullable<OptionType>) => () =>
    onOptionHover && onOptionHover(option);

  return (
    <Box mb={25}>
      <Box mb={25} display="flex" align="center">
        <H2>{radioPanelTitle}</H2>
        {nameTooltip && (
          // @ts-ignore
          <Tooltip
            id="intervention-type-tooltip"
            ml={8}
            icon={questionMark}
            content={nameTooltip}
          />
        )}
      </Box>
      {radioOptions.map((option, index) => {
        const isChecked = option.id === selectedValue;
        const optionDisabled =
          disabledOptions && disabledOptions.includes(option.id);
        return (
          <Row
            key={`el-option-radio-${index}`}
            mb={decideIfPassValue({
              index,
              arrayLength: radioOptions.length,
              value: 20,
            })}
            align="center"
            clickable
            onMouseEnter={!optionDisabled ? changeInfo(option) : undefined}
            onMouseLeave={!optionDisabled ? changeInfo(null) : undefined}
            width="fit-content"
          >
            <Radio
              id={`access-radio-${option.id}`}
              data-cy={isChecked && `access-${option.id}-radio`}
              checked={isChecked}
              disabled={optionDisabled || disabled}
              // @ts-ignore
              mr={12}
              onChange={() => updateSetting(option.id)}
            >
              <Text fontSize={15} fontWeight={isChecked ? 'bold' : 'regular'}>
                {option.label}
              </Text>
            </Radio>
          </Row>
        );
      })}
    </Box>
  );
};
export default InterventionRadioPanel;
