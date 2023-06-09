import React, { memo } from 'react';
import { FormattedMessage } from 'react-intl';

import Box from 'components/Box';
import H2 from 'components/H2';
import H3 from 'components/H3';
import { ImageButton } from 'components/Button';
import { FileDisplayItem } from 'components/FileDisplayItem';

import trashBin from 'assets/svg/bin-no-bg.svg';

import { AppFile } from 'models/File';

import messages from './messages';
import { FileListItem, StyledFileList } from './styled';

interface Props {
  files: AppFile[];
  handleDelete: (fileInfo: AppFile) => void;
  disabled?: boolean;
}

const FileListComponent = ({ files, handleDelete, disabled }: Props) => (
  <Box mt={40}>
    <H2>
      <FormattedMessage {...messages.listHeader} />
    </H2>
    <Box overflow="auto" maxHeight={150} mt={10}>
      {files.length === 0 ? (
        <H3 justify="center">
          <FormattedMessage {...messages.noFiles} />
        </H3>
      ) : (
        <StyledFileList>
          {files.map((file) => (
            <FileListItem key={file.id}>
              <FileDisplayItem fileInfo={file} key={file.id} />
              <ImageButton
                src={trashBin}
                onClick={() => handleDelete(file)}
                title="delete file"
                disabled={disabled}
              />
            </FileListItem>
          ))}
        </StyledFileList>
      )}
    </Box>
  </Box>
);

export const FileList = memo(FileListComponent);
