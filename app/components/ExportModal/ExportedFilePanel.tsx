import { useIntl } from 'react-intl';
import dayjs from 'dayjs';

import { FILE_GENERATION_TIME_FORMAT } from 'utils/dayjs';

import Divider from 'components/Divider';
import Column from 'components/Column';
import Text from 'components/Text';

import { ExportModalFile } from './types';
import messages from './messages';
import FileBox from '../FileBox';

export type Props = {
  file: Nullable<ExportModalFile>;
};

export const ExportedFilePanel = ({ file }: Props) => {
  const { formatMessage } = useIntl();

  if (!file) return null;

  const { generatedAt, filename, url } = file;

  return (
    <>
      <Column>
        <Divider marginBlock={24} />
        <Text>{formatMessage(messages.fileBoxLabel)}</Text>
        <FileBox
          name={filename}
          url={url}
          showDownloadIcon
          marginBlockStart={12}
        />
        <Text
          fontSize={12}
          opacity={0.6}
          lineHeight={1.3}
          marginBlockStart={12}
        >
          {formatMessage(messages.fileGeneratedAt, {
            date: dayjs(generatedAt).format(FILE_GENERATION_TIME_FORMAT),
          })}
        </Text>
      </Column>
    </>
  );
};
