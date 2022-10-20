import React, { useMemo } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { colors } from 'theme';

import { StripedTR, TD } from 'components/Table';
import Text from 'components/Text';
import Select from 'components/Select';

import animationMessages from 'containers/Sessions/components/QuestionSettings/Settings/Components/Blocks/messages';
import { NarratorAnimation } from 'models/Narrator';
import { MissingAnimationReplacement } from '../types';

type Props = {
  animation: MissingAnimationReplacement;
  updateAnimation: (
    newOutcomeAnimation: NarratorAnimation,
    index: number,
  ) => void;
  index: number;
};

const SingleAnimationRow = ({ animation, updateAnimation, index }: Props) => {
  const { formatMessage } = useIntl();

  const { selectOptions, selectedOption } = useMemo(() => {
    const options = animation.availableAnimations.map((singleAnimation) => ({
      value: singleAnimation,
      label: formatMessage(
        animationMessages[singleAnimation as keyof typeof animationMessages],
      ),
    }));
    const option = {
      value: animation.to,
      label: formatMessage(
        animationMessages[animation.to as keyof typeof animationMessages],
      ),
    };
    return { selectOptions: options, selectedOption: option };
  }, [animation]);

  const onSelectOptionChange = (option: any) => {
    updateAnimation(option.value, index);
  };

  return (
    <StripedTR height={32} stripesPlacement="odd" color={colors.linkWater}>
      <TD padding={8}>
        <Text fontWeight="bold">
          <FormattedMessage
            {...animationMessages[
              animation.from as keyof typeof animationMessages
            ]}
          />
        </Text>
      </TD>
      <TD padding={8}>
        <Select
          selectProps={{
            options: selectOptions,
            value: selectedOption,
            onChange: onSelectOptionChange,
          }}
        />
      </TD>
    </StripedTR>
  );
};

export default SingleAnimationRow;
