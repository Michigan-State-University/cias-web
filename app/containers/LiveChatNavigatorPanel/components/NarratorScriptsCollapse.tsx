import React from 'react';

import { themeColors } from 'theme';

import { NavigatorScriptsGroup } from 'models/NavigatorSetup';

import Collapse from 'components/Collapse';
import { EllipsisText } from 'components/Text';
import Column from 'components/Column';

import arrowDown from 'assets/svg/arrow-down-black.svg';
import arrowUp from 'assets/svg/arrow-up-black.svg';

import NavigatorScriptsListItem from './NavigatorScriptsListItem';

type Props = {
  scriptsGroup: NavigatorScriptsGroup;
  opened: boolean;
  onToggle: () => void;
};

const NarratorScriptsCollapse = ({ scriptsGroup, opened, onToggle }: Props) => {
  const { header, sampleMessages } = scriptsGroup;

  return (
    <Collapse
      isOpened={opened}
      onToggle={onToggle}
      onHideImg={arrowDown}
      onShowImg={arrowUp}
      px={16}
      py={10}
      height="auto"
      label={<EllipsisText text={header} fontWeight="medium" />}
      color={themeColors.highlight}
      dragHandleProps={{
        borderRadius: '8px',
      }}
    >
      <Column gap={16} mt={16} mb={8}>
        {sampleMessages.map((sampleMessage, index) => (
          <NavigatorScriptsListItem
            key={`${header}-${index}`}
            sampleMessage={sampleMessage}
          />
        ))}
      </Column>
    </Collapse>
  );
};

export default NarratorScriptsCollapse;
