import React from 'react';
import { useIntl } from 'react-intl';

import { AppFile } from 'models/File';

import Text from 'components/Text';
import Column from 'components/Column';
import FileBox from 'components/FileBox';

import messages from '../messages';

export type Props = {
  navigatorFiles: AppFile[];
};

const NavigatorFilesList = ({ navigatorFiles }: Props) => {
  const { formatMessage } = useIntl();

  return (
    <div>
      <Text mb={8} fontWeight="bold" lineHeight="22px">
        {formatMessage(messages.filesToDownload)}
      </Text>
      <Column gap={8}>
        {navigatorFiles.map(({ id, name, url }) => (
          <FileBox
            name={name}
            url={url}
            key={id}
            maxHeight={44}
            minHeight={44}
          />
        ))}
      </Column>
    </div>
  );
};

export default NavigatorFilesList;
