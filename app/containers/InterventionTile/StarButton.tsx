import React, { FC, MouseEventHandler } from 'react';
import { useIntl } from 'react-intl';

import { colors } from 'theme';

import StarIcon from 'assets/svg/star.svg';

import TextButton from 'components/Button/TextButton';
import Icon from 'components/Icon';

import messages from './messages';

const ICON_SIZE = 20;
const ICON_PADDING = 12;

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
    <>
      <TextButton
        onClick={handleClick}
        buttonProps={{
          padding: ICON_PADDING,
          title: formatMessage(
            messages[starred ? 'unstarIntervention' : 'starIntervention'],
          ),
          hoverColor: colors.aliceBlue,
          stroke: starred ? colors.grandis : colors.manatee,
          fill: starred ? colors.grandis : 'inherit',
          hoverStroke: !starred && colors.bluewood,
          borderRadius: 8,
        }}
        spinnerProps={{
          size: ICON_SIZE,
        }}
        loading={loading}
      >
        <Icon
          src={StarIcon}
          width={ICON_SIZE}
          height={ICON_SIZE}
          alt={formatMessage(messages.starIconAlt)}
        />
      </TextButton>
    </>
  );
};
