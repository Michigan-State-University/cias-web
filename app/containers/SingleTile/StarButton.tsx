import React, { FC, MouseEventHandler } from 'react';
import { useIntl } from 'react-intl';

import StarIcon from 'assets/svg/star.svg';

import TextButton from 'components/Button/TextButton';
import Icon from 'components/Icon';

import messages from './messages';

const ICON_SIZE = 20;

export type Props = {
  starred: boolean;
  onClick: (newChange: boolean) => void;
};

export const StarButton: FC<Props> = ({ starred, onClick }) => {
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
        title: formatMessage(messages.starIntervention),
      }}
    >
      <Icon
        src={StarIcon}
        width={ICON_SIZE}
        height={ICON_SIZE}
        alt={formatMessage(messages.starIconAlt)}
      />
    </TextButton>
  );
};
