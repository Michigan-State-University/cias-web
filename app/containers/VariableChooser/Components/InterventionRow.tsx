import React, { memo } from 'react';
import { useIntl } from 'react-intl';

import { colors, themeColors } from 'theme';

import presentationProjector from 'assets/svg/presentation-projector.svg';
import presentationProjectorSelected from 'assets/svg/presentation-projector-selected.svg';

import Row from 'components/Row';

import Img from 'components/Img';
import Badge from 'components/Badge';
import EllipsisText from 'components/Text/EllipsisText';
import Box from 'components/Box';

import messages from '../messages';

type Props = {
  id: string;
  isInitialIntervention: boolean;
  isLast: boolean;
  name: string;
  onClick: (id: string) => void;
};

const InterventionRow = ({
  id,
  isInitialIntervention,
  isLast,
  name,
  onClick,
}: Props) => {
  const { formatMessage } = useIntl();

  return (
    <Row
      data-testid={`${id}-select-intervention`}
      mb={!isLast && 15}
      onClick={() => onClick(id)}
      align="center"
      clickable
    >
      <Img
        src={
          isInitialIntervention
            ? presentationProjectorSelected
            : presentationProjector
        }
        mr={10}
      />
      <Box mr={10} width="100%">
        {/* @ts-ignore */}
        <EllipsisText
          text={name}
          fontWeight={isInitialIntervention ? 'bold' : ''}
          fontSize={13}
        />
      </Box>
      {isInitialIntervention && (
        <Badge bg={themeColors.secondary} color={colors.white}>
          {formatMessage(messages.selectedInterventionBadge)}
        </Badge>
      )}
    </Row>
  );
};

export default memo(InterventionRow);
