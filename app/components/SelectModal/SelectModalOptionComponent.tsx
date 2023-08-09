import Icon from 'components/Icon';
import Text from 'components/Text';

import { SelectModalOption } from './types';
import { SelectModalButton } from './styled';
import { ICON_SIZE } from './constants';

export type Props = SelectModalOption & {
  onClick: (key: string) => void;
};

export const SelectModalOptionComponent = ({
  key,
  icon,
  title,
  description,
  onClick,
}: Props) => {
  const handleClick = () => onClick(key);

  return (
    <SelectModalButton onClick={handleClick}>
      <Icon src={icon} title={title} height={ICON_SIZE} width={ICON_SIZE} />
      <Text mt={12} fontSize={15} fontWeight="bold" lineHeight={1.5}>
        {title}
      </Text>
      <Text mt={8} lineHeight={1.3} opacity={0.8} maxWidth={250}>
        {description}
      </Text>
    </SelectModalButton>
  );
};
