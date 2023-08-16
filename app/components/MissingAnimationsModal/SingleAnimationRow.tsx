import React, { useMemo } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { colors } from 'theme';
import { NarratorAnimation } from 'models/Narrator';
import animationNames from 'global/i18n/animationNames';

import { StripedTR, TD } from 'components/Table';
import Text from 'components/Text';
import Select from 'components/Select';
import { SelectOption } from 'components/Select/types';

import { MissingAnimationReplacement } from './types';

type Props = {
  animation: MissingAnimationReplacement;
  updateAnimationByName?: (
    sourceAnimation: NarratorAnimation,
    newOutcomeAnimation: NarratorAnimation,
  ) => void;
  updateAnimationByIndex?: (
    newOutcomeAnimation: NarratorAnimation,
    index: number,
  ) => void;
  index: number;
};

const SingleAnimationRow = ({
  animation,
  updateAnimationByName,
  updateAnimationByIndex,
  index,
}: Props) => {
  const { formatMessage } = useIntl();

  const { selectOptions, selectedOption } = useMemo(() => {
    const options: SelectOption<NarratorAnimation>[] =
      animation.availableAnimations.map((singleAnimation) => ({
        value: singleAnimation,
        label: formatMessage(
          animationNames[singleAnimation as keyof typeof animationNames],
        ),
      }));
    const option: SelectOption<NarratorAnimation> = {
      value: animation.to,
      label: formatMessage(
        animationNames[animation.to as keyof typeof animationNames],
      ),
    };
    return { selectOptions: options, selectedOption: option };
  }, [animation]);

  const onSelectOptionChange = (option: SelectOption<NarratorAnimation>) => {
    if (updateAnimationByName)
      updateAnimationByName(animation.from, option.value);
    if (updateAnimationByIndex) updateAnimationByIndex(option.value, index);
  };

  return (
    <StripedTR
      height={53}
      stripesPlacement="odd"
      color={colors.aliceBlueSaturated}
      bg={colors.white}
      mb={4}
    >
      <TD py={8} px={16}>
        <Text fontWeight="bold">
          <FormattedMessage
            {...animationNames[animation.from as keyof typeof animationNames]}
          />
        </Text>
      </TD>
      <TD py={8} px={16}>
        <Select
          // @ts-ignore
          selectProps={{
            options: selectOptions,
            value: selectedOption,
            onChange: onSelectOptionChange,
            isDisabled: selectOptions.length === 1,
            height: '37px',
          }}
        />
      </TD>
    </StripedTR>
  );
};

export default SingleAnimationRow;
