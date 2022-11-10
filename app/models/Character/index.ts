import { LottieProps } from 'react-lottie';

export enum CharacterType {
  EMMI = 'emmi',
  PEEDY = 'peedy',
}

export type CharacterSize = {
  height: number;
  width: number;
};

export type CharacterBorder = {
  width: number;
  radius: number;
};

export enum ActiveIndicatorType {
  CIRCLE = 'circle',
  RECTANGLE = 'rectangle',
}

export type CharacterConfig = {
  name: CharacterType;
  size: CharacterSize;
  border?: CharacterBorder;
  activeIndicatorType: ActiveIndicatorType;
  lottieStyles?: LottieProps['style'];
};

export const CHARACTER_CONFIGS: Record<CharacterType, CharacterConfig> = {
  [CharacterType.PEEDY]: {
    name: CharacterType.PEEDY,
    size: {
      width: 100,
      height: 100,
    },
    activeIndicatorType: ActiveIndicatorType.CIRCLE,
    lottieStyles: {
      margin: 'none',
    },
  },
  [CharacterType.EMMI]: {
    name: CharacterType.EMMI,
    size: {
      width: 168,
      height: 100.8,
    },
    border: {
      width: 2,
      radius: 8,
    },
    activeIndicatorType: ActiveIndicatorType.RECTANGLE,
  },
};
