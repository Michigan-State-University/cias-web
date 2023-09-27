import Icon from 'components/Icon';
import Text from 'components/Text';

import { SelectModalOption } from './types';
import { SelectModalButton } from './styled';
import { ICON_SIZE } from './constants';

export type Props<Id extends string | number> = SelectModalOption<Id> & {
  onClick: (id: Id) => void;
};

export const SelectModalOptionComponent = <Id extends string | number>({
  id,
  icon,
  iconFill,
  title,
  description,
  disabled,
  onClick,
}: Props<Id>) => {
  const handleClick = () => onClick(id);

  return (
    <SelectModalButton onClick={handleClick} disabled={disabled}>
      <Icon
        src={icon}
        title={title}
        height={ICON_SIZE}
        width={ICON_SIZE}
        fill={iconFill}
      />
      <Text mt={12} fontSize={15} fontWeight="bold" lineHeight={1.5}>
        {title}
      </Text>
      <Text mt={8} lineHeight={1.3} opacity={0.8} maxWidth={250}>
        {description}
      </Text>
    </SelectModalButton>
  );
};
