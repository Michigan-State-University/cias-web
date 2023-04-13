import '@testing-library/jest-dom';
import 'jest-extended';
import type { AnimationItem } from 'lottie-web';

import { LanguageDirection } from 'global/types/locale';

declare module 'react-lottie' {
  export interface LottieRef {
    props: {
      width: number;
      height: number;
    };
    anim: AnimationItem;
  }
}

declare module 'rtl-detect' {
  const getLangDir: (strLocale: string) => LanguageDirection;
}
