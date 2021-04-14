import PropTypes from 'prop-types';
import React from 'react';

import { colors } from 'theme';

import webpage from 'assets/svg/webpage-mouseover.svg';

import { htmlToPlainText } from 'utils/htmlToPlainText';

import Row from 'components/Row';
import Text from 'components/Text';
import Img from 'components/Img';
import Badge from 'components/Badge';

export const VariableRow = ({ id, subtitle, isLast, onClick, variable }) => (
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
      <Text
        textOverflow="ellipsis"
        whiteSpace="pre"
        overflow="hidden"
        maxWidth={200}
        mr={20}
      >
        {htmlToPlainText(subtitle)}
      </Text>
    </Row>
    <Badge
      data-cy="question-variable-chooser"
      maxWidth={300}
      color={colors.jungleGreen}
      bgWithOpacity
    >
      {variable && variable.trim()}
    </Badge>
  </Row>
);

VariableRow.propTypes = {
  id: PropTypes.string,
  isLast: PropTypes.bool,
  onClick: PropTypes.func,
  subtitle: PropTypes.string,
  variable: PropTypes.string,
};
