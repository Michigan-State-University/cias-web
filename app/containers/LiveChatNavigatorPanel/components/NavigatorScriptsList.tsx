import React, { useCallback, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';

import { AppFile } from 'models/File';
import {
  ParsedNavigatorScriptsFileRow,
  navigatorScriptHeaders,
} from 'models/NavigatorSetup';

import { useParseCSV } from 'utils/useParseCSV';

import Text from 'components/Text';
import Loader from 'components/Loader';
import Column from 'components/Column';

import messages from '../messages';
import { groupNavigatorScripts } from '../utils';
import NarratorScriptsCollapse from './NarratorScriptsCollapse';

export type Props = {
  scriptsFile: AppFile;
  disabled: boolean;
};

const NavigatorScriptsList = ({ scriptsFile, disabled }: Props) => {
  const { formatMessage } = useIntl();

  const [openedGroupIndex, setOpenedGroupIndex] = useState<Nullable<number>>(0);

  const { parsing, parsedData } = useParseCSV<ParsedNavigatorScriptsFileRow>(
    scriptsFile.url,
    navigatorScriptHeaders,
  );

  const scriptsGroups = useMemo(() => {
    if (!parsedData) return null;
    return groupNavigatorScripts(parsedData);
  }, [parsedData]);

  const onCollapseToggle = useCallback(
    (index: number) => {
      if (openedGroupIndex === index) {
        setOpenedGroupIndex(null);
      } else {
        setOpenedGroupIndex(index);
      }
    },
    [openedGroupIndex],
  );

  return (
    <div>
      <Text mb={16} fontWeight="bold" lineHeight="22px">
        {formatMessage(messages.scriptsFromResearcher)}
      </Text>
      {parsing && <Loader type="inline" />}
      {!parsing && scriptsGroups && (
        <Column gap={8}>
          {scriptsGroups.map((group, index) => (
            <NarratorScriptsCollapse
              key={group.header}
              opened={openedGroupIndex === index}
              onToggle={() => onCollapseToggle(index)}
              scriptsGroup={group}
              disabled={disabled}
            />
          ))}
        </Column>
      )}
    </div>
  );
};

export default NavigatorScriptsList;
