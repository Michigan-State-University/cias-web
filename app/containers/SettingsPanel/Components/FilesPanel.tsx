import React from 'react';
import { useIntl } from 'react-intl';

import FileUpload, { FileUploadProps } from 'components/FileUpload';
import H2 from 'components/H2';

import messages from '../messages';

export type Props = {
  title?: string;
} & Pick<
  FileUploadProps,
  | 'value'
  | 'onUpload'
  | 'multiple'
  | 'onRemoveFile'
  | 'loading'
  | 'acceptedFormats'
  | 'label'
  | 'tooltipContent'
  | 'error'
  | 'disabled'
>;

export const FilesPanel = ({ title, label, ...props }: Props) => {
  const { formatMessage } = useIntl();

  return (
    <div>
      {title && (
        <H2 fontSize={16} lineHeight="24px" mb={24}>
          {title}
        </H2>
      )}
      {/* @ts-ignore */}
      <FileUpload
        label={label ?? formatMessage(messages.importFile)}
        {...props}
      />
    </div>
  );
};

export default FilesPanel;
