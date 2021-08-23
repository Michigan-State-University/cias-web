import React from 'react';

import { CatMhTestDto } from 'models/CatMhTest/CatMhTestDto';
import Box from 'components/Box';
import Checkbox from 'components/Checkbox';
import Text from 'components/Text';

type Props = {
  test: CatMhTestDto;
  selected: boolean;
  onToggle: (id: number) => void;
};

const TestItem = ({
  test: { id, name },
  selected,
  onToggle,
}: Props): JSX.Element => (
  <Box display="flex" align="center">
    <Checkbox
      mr={10}
      checked={selected}
      stroke={null}
      onClick={() => onToggle(id)}
    />
    <Text fontSize={16}>{name}</Text>
  </Box>
);

export default TestItem;
