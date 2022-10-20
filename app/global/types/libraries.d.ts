import '@testing-library/jest-dom';
import 'jest-extended';
import type { AnimationItem } from 'lottie-web';

declare module 'react-lottie' {
  export interface LottieRef {
    props: {
      width: number;
      height: number;
    };
    anim: AnimationItem;
  }
}
