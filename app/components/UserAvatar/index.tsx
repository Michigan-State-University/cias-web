/**
 *
 * UserAvatar
 *
 */

import React, { memo } from 'react';

import Img from 'components/Img';
import { colors } from 'theme/colors';

import { AvatarStyled } from './styled';

type Props = {
  avatar?: string;
  firstName: string;
  lastName: string;
  backgroundColor?: string;
} & Record<string, unknown>;

function UserAvatar({
  avatar,
  firstName,
  lastName,
  backgroundColor = colors.jungleGreen,
  ...styleProps
}: Props) {
  if (avatar)
    return <Img src={avatar} alt="avatar" {...styleProps} borderRadius="50%" />;

  const nameShort = `${firstName?.trim()[0] || ''}${
    lastName?.trim()[0] || ''
  }`.toUpperCase();
  return (
    <AvatarStyled
      data-private
      color={colors.white}
      backgroundColor={backgroundColor}
      {...styleProps}
    >
      <div>{nameShort || '?'}</div>
    </AvatarStyled>
  );
}

export default memo(UserAvatar);
