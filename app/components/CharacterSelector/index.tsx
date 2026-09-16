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
    <Column flex={1} gap={8}>
      <Row gap={16} width="100%">
        <Column flex={1}>
          <CharacterRadio
            character={CharacterType.PEEDY}
            onChange={setCharacter(CharacterType.PEEDY)}
            checked={value === CharacterType.PEEDY}
            disabled={disabled}
          />
        </Column>
      </Row>
      <Row gap={16} width="100%">
        <Column flex={1}>
          <CharacterRadio
            character={CharacterType.EMMI}
            onChange={setCharacter(CharacterType.EMMI)}
            checked={value === CharacterType.EMMI}
            disabled={disabled}
          />
        </Column>
      </Row>
      <Row gap={16} width="100%">
        <Column flex={1}>
          <CharacterRadio
            character={CharacterType.CRYSTAL}
            onChange={setCharacter(CharacterType.CRYSTAL)}
            checked={value === CharacterType.CRYSTAL}
            disabled={disabled}
          />
        </Column>
      </Row>
    </Column>
  );
};

export default memo(Component);
