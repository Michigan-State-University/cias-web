import React from 'react';

import { colors } from 'theme';

import webpage from 'assets/svg/webpage-mouseover.svg';

import { htmlToPlainText } from 'utils/htmlToPlainText';

import Row from 'components/Row';
import { EllipsisText } from 'components/Text';
import Img from 'components/Img';
import Badge from 'components/Badge';
import Box from 'components/Box';

interface Props {
  id: string;
  subtitle: string;
  isLast: boolean;
  onClick: (variable: string) => void;
  variable: string;
}

const VariableRow = ({ id, subtitle, isLast, onClick, variable }: Props) => (
  <Row
    data-testid={`${id}-select-variable`}
    mb={!isLast && 15}
    onClick={() => onClick(variable)}
    justify="between"
    align="center"
    clickable
  >
    <Row align="center">
      <Img src={webpage} mr={15} />

      <Box width={170} mr={20}>
        <EllipsisText text={htmlToPlainText(subtitle)} />
      </Box>
    </Row>
    <Badge
      data-cy="question-variable-chooser"
      width={100}
      color={colors.jungleGreen}
      bgWithOpacity
    >
      <EllipsisText
        color={colors.jungleGreen}
        text={variable && variable.trim()}
      />
    </Badge>
  </Row>
);

export default VariableRow;
