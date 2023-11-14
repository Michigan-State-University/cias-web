import { useIntl } from 'react-intl';
import dayjs from 'dayjs';

import { themeColors } from 'theme';

import { FILE_GENERATION_TIME_FORMAT } from 'utils/dayjs';

import Column from 'components/Column';
import Text from 'components/Text';
import FileBox from 'components/FileBox';
import Row from 'components/Row';
import { Button } from 'components/Button';
import FileDownload from 'components/FileDownload';

import { ExportModalFile } from './types';
import messages from './messages';

export type Props = {
  file: Nullable<ExportModalFile>;
  onExport: () => void;
  loading: boolean;
};

export const ExportedFilePanel = ({ file, onExport, loading }: Props) => {
  const { formatMessage } = useIntl();

  if (!file) return null;

  const { generatedAt, filename, url } = file;

  return (
    <>
      <Column
        px={24}
        py={32}
        border={`1px solid ${themeColors.highlight}`}
        borderRadius={8}
      >
        <Text fontSize={15} fontWeight="medium">
          {formatMessage(messages.fileBoxLabel)}
        </Text>
        <FileBox
          name={filename}
          url={url}
          showDownloadIcon
          marginBlockStart={16}
        />
        <Text
          fontSize={12}
          opacity={0.6}
          lineHeight={1.3}
          marginBlockStart={16}
        >
          {formatMessage(messages.fileGeneratedAt, {
            date: dayjs(generatedAt).format(FILE_GENERATION_TIME_FORMAT),
          })}
        </Text>
        <Row marginBlockStart={40} gap={12} justify="center">
          <Button
            width="auto"
            inverted
            px={32}
            onClick={onExport}
            loading={loading}
          >
            {formatMessage(messages.updateFileButtonLabel)}
          </Button>
          <FileDownload url={url} fileName={filename}>
            <Button width="auto" px={32}>
              {formatMessage(messages.downloadFileButtonLabel)}
            </Button>
          </FileDownload>
        </Row>
      </Column>
    </>
  );
};
