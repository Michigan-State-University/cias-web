import React from 'react';

import { CatMhTest } from 'global/types/catMh';

import Box from 'components/Box';
import Checkbox from 'components/Checkbox';
import Text from 'components/Text';

type Props = {
  test: CatMhTest;
  selected: boolean;
  onToggle: (id: number) => void;
  disabled: boolean;
};

const TestItem = ({
  test: { id, name },
  selected,
  onToggle,
  disabled,
}: Props): JSX.Element => (
  <Box display="flex" align="center">
    <Checkbox
      id={`cat-mh-test-type-${id.toString()}`}
      checked={selected}
      onChange={() => onToggle(id)}
      disabled={disabled}
    >
      <Text ml={5} fontSize={16}>
        {name}
      </Text>
    </Checkbox>
  </Box>
);

export default TestItem;
