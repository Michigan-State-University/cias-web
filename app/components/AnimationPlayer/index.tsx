import React, { forwardRef } from 'react';
import Lottie, { LottieProps } from 'react-lottie';

import { CharacterConfig } from 'models/Character';

import { AnimationBorder } from './styled';

type Props = {
  characterConfig: CharacterConfig;
} & LottieProps;

const AnimationPlayer = forwardRef<Lottie, Props>(
  ({ characterConfig, ...lottieProps }, ref) => {
    const { size, border, lottieStyles } = characterConfig;
    const { width, height } = size;

    return (
      <>
        {border && <AnimationBorder border={border} size={size} />}
        <Lottie
          ref={ref}
          height={height}
          width={width}
          style={{
            ...lottieStyles,
            borderRadius: border?.radius,
          }}
          {...lottieProps}
        />
      </>
    );
  },
);

export default AnimationPlayer;
