import { memo, useCallback } from 'react';

import { CharacterType } from 'models/Character';

import { Col, FullWidthContainer, Row } from 'components/ReactGridSystem';

import { CharacterRadio } from './CharacterRadio';

type Props = {
  setting: string;
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
    <FullWidthContainer>
      <Row>
        <Col>
          <CharacterRadio
            character={CharacterType.PEEDY}
            onChange={setCharacter(CharacterType.PEEDY)}
            checked={value === CharacterType.PEEDY}
            disabled={disabled}
          />
        </Col>

        <Col>
          <CharacterRadio
            character={CharacterType.FRIDA}
            onChange={setCharacter(CharacterType.FRIDA)}
            checked={value === CharacterType.FRIDA}
            disabled={disabled}
          />
        </Col>
      </Row>
    </FullWidthContainer>
  );
};

export const CharacterSelector = memo(Component);
