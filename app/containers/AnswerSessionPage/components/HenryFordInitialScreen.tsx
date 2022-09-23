import React from 'react';

import { HenryFordInitialScreenDTO } from 'models/Question';

import HenryFordInitialScreenLayout from '../layouts/HenryFordInitialScreenLayout';

import { SharedProps } from './sharedProps';

const HenryFordInitialScreen = ({
  isMobilePreview,
  saveAnswer,
}: SharedProps<HenryFordInitialScreenDTO>) => (
  <HenryFordInitialScreenLayout
    forceMobile={isMobilePreview}
    saveAnswer={saveAnswer}
  />
);

export default HenryFordInitialScreen;
