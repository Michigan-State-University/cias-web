import { colors } from 'theme/colors';
import { fontSizes } from 'theme/fonts';

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
  selago: `0px 4px 20px ${colors.selago};`,
};

const elements = {
  navbarHeight: 70,
  draggableContainerSize: 702,
  characterInitialYPosition: 600,
};

const visualAnalogScaleLabelStyles = {
  fontSize: fontSizes.regular,
  width: 'fit-content',
};

export {
  borders,
  paddings,
  boxShadows,
  elements,
  visualAnalogScaleLabelStyles,
};
