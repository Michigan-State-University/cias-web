import ScreenType from './ScreenType';

export const singleQuestion = new ScreenType(
  'single-question',
  'Single answer question',
);

export const multiQuestion = new ScreenType(
  'multi-question',
  'Multi answer question',
);

export const ScreenTypes = [singleQuestion, multiQuestion];
