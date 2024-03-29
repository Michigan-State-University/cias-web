import { colors } from 'theme/colors';
import { fontSizes } from 'theme/fonts';
import { characterInitialPosition } from 'utils/characterConstants';

const borders = {
  borderRadius: '5px',
  borderStyle: 'solid',
  borderWidth: '1px',
};

const paddings = {
  small: '12px',
  regular: '16px',
};

const boxShadows = {
  black: '0px 0px 50px rgba(0, 0, 0, 0.08)',
  selago: `0px 4px 20px ${colors.selago}`,
};

const elements = {
  navbarHeight: 70,
  sidebarWidth: 280,
  draggableContainerSize: 702,
  answerSessionPageFooterHeight: 96,
  characterInitialPosition,
  grid: { firstColWidth: 300, colWidth: 80, leftPadding: 40 },
  treeRowHeight: 80,
  chartTileWidth: 500,
  chartTileHeight: 350,
  interventionTileHeight: 160,
  interventionLogoSize: {
    width: 100,
    height: 50,
  },
  userInterventionTileHeight: 160,
  userSessionWithoutMultipleFillTileHeight: 160,
  userSessionWithMultipleFillTileHeight: 200,
  screenSettingsWidth: 400,
  continueButtonWidth: 120,
};

const visualAnalogScaleLabelStyles = {
  fontSize: fontSizes.regular,
  width: 'fit-content',
};

const visualAnalogScaleBoldLabelStyles = {
  fontSize: fontSizes.regular,
  width: 'fit-content',
  fontWeight: 700,
  color: colors.bluewood,
};

export {
  borders,
  paddings,
  boxShadows,
  elements,
  visualAnalogScaleLabelStyles,
  visualAnalogScaleBoldLabelStyles,
};
