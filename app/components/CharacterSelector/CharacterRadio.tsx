import { memo } from 'react';
import { useIntl } from 'react-intl';

import { CharacterType } from 'models/Character';

import Icon from 'components/Icon';
import Text from 'components/Text';
import Row from 'components/Row';
import Box from 'components/Box';

import { SelectCharacterRadio } from './styled';
import { characterToIconMap } from './constants';
import messages from './messages';

const characterIconSize = 40;

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
      <Row align="center" justify="between">
        <Box>
          <Text whiteSpace="nowrap">{formatMessage(messages[character])}</Text>
        </Box>

        <Box>
          <Icon
            src={characterToIconMap[character]}
            // @ts-ignore
            height={characterIconSize}
            width={characterIconSize}
          />
        </Box>
      </Row>
    </SelectCharacterRadio>
  );
};

export const CharacterRadio = memo(Component);
