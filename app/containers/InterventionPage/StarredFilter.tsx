import React, { FC } from 'react';
import { useIntl } from 'react-intl';

import Checkbox from 'components/Checkbox';
import Text from 'components/Text';
import { Col } from 'components/ReactGridSystem';

import messages from './messages';

export type Props = {
  value: boolean;
  onChange: (value: boolean) => void;
};

export const SharedFilter: FC<Props> = ({ value, onChange }) => {
  const { formatMessage } = useIntl();

  return (
    <Col>
      <Checkbox
        id="intervetions-starred-filter"
        onChange={onChange}
        checked={value}
      >
        <Text fontWeight="bold">
          {formatMessage(messages.starredFilterLabel)}
        </Text>
      </Checkbox>
    </Col>
  );
};
