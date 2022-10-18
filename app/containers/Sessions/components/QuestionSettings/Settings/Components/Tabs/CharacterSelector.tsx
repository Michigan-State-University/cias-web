import { memo, useCallback } from 'react';

import { CharacterType } from 'models/Character';

import { Col, FullWidthContainer, Row } from 'components/ReactGridSystem';

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
    <FullWidthContainer>
      <Row style={{ rowGap: '16px' }}>
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
            character={CharacterType.EMMI}
            onChange={setCharacter(CharacterType.EMMI)}
            checked={value === CharacterType.EMMI}
            disabled={disabled}
          />
        </Col>
      </Row>
    </FullWidthContainer>
  );
};

export const CharacterSelector = memo(Component);
