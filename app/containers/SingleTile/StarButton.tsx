import React, { FC, MouseEventHandler } from 'react';
import { useIntl } from 'react-intl';

import StarIcon from 'assets/svg/star.svg';
import StarFilledIcon from 'assets/svg/star-filled.svg';

import TextButton from 'components/Button/TextButton';
import Icon from 'components/Icon';

import messages from './messages';

const ICON_SIZE = 20;

export type Props = {
  starred: boolean;
  onClick: (newChange: boolean) => void;
  loading?: boolean;
};

export const StarButton: FC<Props> = ({ starred, onClick, loading }) => {
  const { formatMessage } = useIntl();

  const handleClick: MouseEventHandler = (e) => {
    e.stopPropagation();
    e.preventDefault();
    onClick(!starred);
  };

  return (
    <TextButton
      onClick={handleClick}
      buttonProps={{
        padding: 0,
        title: formatMessage(
          messages[starred ? 'unstarIntervention' : 'starIntervention'],
        ),
      }}
      spinnerProps={{
        size: ICON_SIZE,
      }}
      loading={loading}
    >
      <Icon
        src={starred ? StarFilledIcon : StarIcon}
        width={ICON_SIZE}
        height={ICON_SIZE}
        alt={formatMessage(messages.starIconAlt)}
      />
    </TextButton>
  );
};
