import React from 'react';
import { FormattedMessage } from 'react-intl';

import { themeColors } from 'theme';
import { NarratorAnimation } from 'models/Narrator';

import { Table, TBody, TH, TR } from 'components/Table';
import Text from 'components/Text';
import Box from 'components/Box';

import messages from './messages';
import SingleAnimationRow from './SingleAnimationRow';
import { MissingAnimationReplacement } from './types';
import { AnimationTableHead } from './styled';

type Props = {
  tableAnimations: MissingAnimationReplacement[];
  updater: React.Dispatch<React.SetStateAction<MissingAnimationReplacement[]>>;
  updateAnimations: (
    updater: React.Dispatch<
      React.SetStateAction<MissingAnimationReplacement[]>
    >,
    sourceAnimation: NarratorAnimation,
    newOutcomeAnimation: NarratorAnimation,
  ) => void;
};

const AnimationsTable = ({
  tableAnimations,
  updateAnimations,
  updater,
}: Props) => {
  const onUpdateAnimation = (
    from: NarratorAnimation,
    to: NarratorAnimation,
  ) => {
    updateAnimations(updater, from, to);
  };

  return (
    <Box height={200} overflow="scroll">
      <Table width="100%">
        <AnimationTableHead>
          <TR height={46}>
            <TH padding={8}>
              <Text textAlign="left" textOpacity={0.7} color={themeColors.text}>
                <FormattedMessage {...messages.missingAnimationColumnHeader} />
              </Text>
            </TH>
            <TH padding={8}>
              <Text textAlign="left" textOpacity={0.7} color={themeColors.text}>
                <FormattedMessage
                  {...messages.replacementAnimationColumnHeader}
                />
              </Text>
            </TH>
          </TR>
        </AnimationTableHead>

        <TBody>
          {tableAnimations.map((animation, index) => (
            <SingleAnimationRow
              animation={animation}
              key={`${animation.from}-${index}`}
              updateAnimationByName={onUpdateAnimation}
              index={index}
            />
          ))}
        </TBody>
      </Table>
    </Box>
  );
};

export default AnimationsTable;
