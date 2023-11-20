import { memo, useCallback } from 'react';

import { CharacterType } from 'models/Character';

import Column from 'components/Column';
import Row from 'components/Row';

import { CharacterRadio } from './CharacterRadio';

type Props = {
  value: CharacterType;
  disabled: boolean;
  onChange: (value: CharacterType) => void;
};

const Component = ({ value, disabled, onChange }: Props) => {
  const setCharacter = useCallback(
    (character: CharacterType) => () => {
      onChange(character);
    },
    [onChange],
  );

  return (
    <Row gap={16} width="100%">
      <Column flex={1}>
        <CharacterRadio
          character={CharacterType.PEEDY}
          onChange={setCharacter(CharacterType.PEEDY)}
          checked={value === CharacterType.PEEDY}
          disabled={disabled}
        />
      </Column>

      <Column flex={1}>
        <CharacterRadio
          character={CharacterType.EMMI}
          onChange={setCharacter(CharacterType.EMMI)}
          checked={value === CharacterType.EMMI}
          disabled={disabled}
        />
      </Column>
    </Row>
  );
};

export default memo(Component);
