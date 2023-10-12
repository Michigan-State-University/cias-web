/**
 *
 * BackButton
 *
 */

import React, { FC, HTMLAttributes, useCallback } from 'react';

import triangleBack from 'assets/svg/triangle-back.svg';

import { themeColors } from 'theme';

import { LanguageDirection } from 'global/types/locale';

import Img from 'components/Img';
import Text from 'components/Text';
import { TextButton } from 'components/Button';

import { StyledLink } from './styled';

export type LinkProps = {
  link: true;
  to: string;
  onClick?: undefined;
  disabled?: undefined;
};

export type ButtonProps = {
  link?: false;
  to?: string;
  onClick: () => void;
  disabled?: boolean;
};

export type Props = (LinkProps | ButtonProps) &
  Pick<HTMLAttributes<HTMLParagraphElement>, 'className'> & {
    direction?: LanguageDirection;
  };

const BackButton: FC<Props> = ({
  className,
  children,
  link,
  to,
  onClick,
  disabled,
  direction,
  ...props
}) => {
  const renderContent = useCallback(
    () => (
      <>
        <Img
          src={triangleBack}
          alt="traingle"
          mr={8}
          mb={2}
          flipHorizontal={direction === LanguageDirection.RTL}
        />
        <Text
          className={className}
          color={themeColors.secondary}
          fontWeight="bold"
        >
          {children}
        </Text>
      </>
    ),
    [className, children],
  );

  if (link) {
    return (
      <StyledLink to={to} dir={direction} {...props}>
        {renderContent()}
      </StyledLink>
    );
  }

  return (
    <TextButton
      onClick={onClick}
      disabled={disabled}
      buttonProps={{
        display: 'flex',
        align: 'center',
        dir: direction,
        ...props,
      }}
    >
      {renderContent()}
    </TextButton>
  );
};

export default BackButton;
