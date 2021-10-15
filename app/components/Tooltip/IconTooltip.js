import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';

import Column from 'components/Column';
import Row from 'components/Row';
import { WarningIcon } from 'components/Icons';
import Text from 'components/Text';

import Tooltip from './Tooltip';
import { TooltipType } from './constants';
import messages from './messages';

export const IconTooltip = ({
  content,
  text,
  children,
  type,
  ...tooltipProps
}) => {
  const { formatMessage } = useIntl();

  const { icon, title } = useMemo(() => {
    switch (type) {
      case TooltipType.WARNING:
      default:
        return {
          icon: <WarningIcon />,
          title: formatMessage(messages.warningTitle),
        };
    }
  });

  return (
    <Tooltip
      {...tooltipProps}
      content={
        <Row>
          <Column width="min-content" mr={8}>
            {icon}
          </Column>

          <Column>
            <Text fontWeight="bold" mb={10}>
              {title}
            </Text>

            {text ?? content}
          </Column>
        </Row>
      }
    >
      {children}
    </Tooltip>
  );
};

IconTooltip.propTypes = {
  content: PropTypes.node,
  text: PropTypes.string,
  children: PropTypes.node,
  type: PropTypes.string,
};
