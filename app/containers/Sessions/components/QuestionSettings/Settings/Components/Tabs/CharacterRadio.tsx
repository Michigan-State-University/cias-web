import { memo } from 'react';
import { useIntl } from 'react-intl';

import { CharacterType } from 'models/Character';

import { Col, FullWidthContainer, Row } from 'components/ReactGridSystem';
import Icon from 'components/Icon';
import Text from 'components/Text';

import { SelectCharacterRadio } from './styled';
import { characterToIconMap } from './constants';
import messages from '../messages';

type Props = {
  character: CharacterType;
  checked: boolean;
  disabled: boolean;
  onChange: (value: boolean) => void;
};

const Component = ({ character, checked, disabled, onChange }: Props) => {
  const { formatMessage } = useIntl();

  return (
    <SelectCharacterRadio
      id={`character-setting-${character}`}
      onChange={onChange}
      checked={checked}
      disabled={disabled}
    >
      <FullWidthContainer>
        <Row align="center">
          <Col xs={6}>
            <Text whiteSpace="nowrap">
              {formatMessage(messages[character])}
            </Text>
          </Col>

          <Col>
            <Icon src={characterToIconMap[character]} />
          </Col>
        </Row>
      </FullWidthContainer>
    </SelectCharacterRadio>
  );
};

export const CharacterRadio = memo(Component);
