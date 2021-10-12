import React, { useState } from 'react';

import { useIntl } from 'react-intl';

import { CatMhTest } from 'models/CatMh';

import { colors } from 'theme';

import Box from 'components/Box';
import Checkbox from 'components/Checkbox';
import Text, { Comment } from 'components/Text';
import Collapse from 'components/Collapse';
import Row from 'components/Row';
import Divider from 'components/Divider';
import { DoubleColoredChip } from 'components/ColoredChip';
import Tooltip from 'components/Tooltip';
import Circle from 'components/Circle';

import arrowDown from 'assets/svg/arrow-down-black.svg';
import arrowUp from 'assets/svg/arrow-up-black.svg';

import messages from './messages';

type Props = {
  test: CatMhTest;
  selected: boolean;
  onToggle: (id: number) => void;
  disabled: boolean;
};

const TestItem = ({
  test: { id, name, catMhTestAttributes },
  selected,
  onToggle,
  disabled,
}: Props): JSX.Element => {
  const { formatMessage } = useIntl();
  const [openCollapsible, setOpenCollapsible] = useState(false);
  const toggleCollapsible = () => setOpenCollapsible(!openCollapsible);

  return (
    <Box
      width="100%"
      bgOpacity={openCollapsible ? 1 : 0}
      bg={colors.whiteLilac}
    >
      <Collapse
        isOpened={openCollapsible}
        onToggle={toggleCollapsible}
        onHideImg={arrowDown}
        onShowImg={arrowUp}
        px={10}
        label={
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
        }
        bgOpacity={0}
        disabled
      >
        <Box mb={5} px={10} width="100%">
          <Row mb={20} mt={10}>
            <Divider />
          </Row>
          <Comment mb={10}>
            {formatMessage(messages.variablesAndScores)}
          </Comment>

          {catMhTestAttributes.map(
            ({ id: attributeId, name: attributeName, range }) => (
              <Box padding={3} key={attributeId} display="inline-flex">
                <DoubleColoredChip
                  leftChipColor={colors.jungleGreen}
                  leftChipContent={
                    <Box display="flex">
                      {attributeName}
                      {/* @ts-ignore */}
                      <Tooltip
                        id="Attribute-tooltip"
                        // @ts-ignore
                        content={formatMessage(messages[attributeName])}
                      >
                        <Circle
                          bg={colors.jungleGreen}
                          color={colors.white}
                          size="16px"
                          fontWeight="bold"
                          ml={5}
                          fontSize={11}
                          child="?"
                        />
                      </Tooltip>
                    </Box>
                  }
                  rightChipColor={colors.azure}
                  rightChipContent={range}
                />
              </Box>
            ),
          )}
        </Box>
      </Collapse>
    </Box>
  );
};

export default TestItem;
