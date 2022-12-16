import { memo } from 'react';
import { useIntl } from 'react-intl';

import { CharacterType } from 'models/Character';

import { FullWidthSwitch } from 'components/Switch';
import H3 from 'components/H3';

import CharacterSelector from 'components/CharacterSelector';
import messages from '../messages';

type Props<T extends boolean | string> = {
  setting: string;
  value: T;
  disabled: boolean;
  onChange: (value: T) => void;
};

const Component = <T extends boolean | string>({
  setting,
  value,
  disabled,
  onChange,
}: Props<T>) => {
  const { formatMessage } = useIntl();
  switch (typeof value) {
    case 'string': {
      if (setting === 'character')
        return (
          <CharacterSelector
            value={value as CharacterType}
            disabled={disabled}
            // @ts-ignore type narrowing not working correctly
            onChange={onChange}
          />
        );

      return <></>;
    }
    case 'boolean': {
      return (
        <FullWidthSwitch
          id={setting}
          disabled={disabled}
          checked={value}
          // @ts-ignore type narrowing not working correctly
          onToggle={onChange}
        >
          {/* @ts-ignore */}
          <H3>{formatMessage(messages[setting])}</H3>
        </FullWidthSwitch>
      );
    }
    default:
      return <></>;
  }
};

export const NarratorSetting = memo(Component);