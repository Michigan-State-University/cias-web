import { createContext } from 'react';

import { elements } from 'theme';

export const TilesContext = createContext({ NewInterventionButton: null });

export const ROW_GUTTER = 10;
export const ROW_HEIGHT = elements.interventionTileHeight + ROW_GUTTER;
