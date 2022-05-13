import React, { memo } from 'react';
import { useIntl } from 'react-intl';

import CrossIcon from 'assets/svg/cross.svg';

import { ImageButton } from 'components/Button';

import messages from './messages';

type Props = {
  onClick: () => void;
};

const Component = ({ onClick }: Props): JSX.Element => {
  const { formatMessage } = useIntl();

  return (
    <ImageButton
      src={CrossIcon}
      onClick={onClick}
      title={formatMessage(messages.clearFiltersLabel)}
    />
  );
};

export const ClearFiltersButton = memo(Component);
