import React from 'react';
import { useIntl } from 'react-intl';

import FileUpload, { FileUploadProps } from 'components/FileUpload';
import H2 from 'components/H2';
import Column from 'components/Column';
import { ImageButton } from 'components/Button';
import Loader from 'components/Loader';
import FileBox from 'components/FileBox';

import binNoBg from 'assets/svg/bin-no-bg.svg';

import messages from '../messages';

type CommonProps = {
  title?: string;
  label?: string;
  uploadingFile: boolean;
  acceptedFormats?: string;
  labelTooltipContent?: JSX.Element;
} & Pick<FileUploadProps, 'value' | 'onUpload'>;

type MultipleFilesProps = CommonProps & {
  multiple: true;
  removeFile: (fileId: string) => void;
};

type SingleFileProps = CommonProps & {
  multiple: false;
  removeFile: () => void;
};

type Props = MultipleFilesProps | SingleFileProps;

export const FilesPanel = ({
  title,
  label,
  value,
  uploadingFile,
  removeFile,
  acceptedFormats,
  onUpload,
  multiple,
  labelTooltipContent,
}: Props) => {
  const { formatMessage } = useIntl();

  const deleteIcon = (index: string, deleting?: boolean) =>
    deleting ? (
      <Loader type="inline" size={18} />
    ) : (
      <ImageButton
        src={binNoBg}
        onClick={(e: React.MouseEvent) => {
          e.stopPropagation();
          e.preventDefault();
          removeFile(index);
        }}
        title={formatMessage(messages.deleteFile)}
        disabled={false}
        iconProps={{
          width: 16,
          height: 16,
        }}
        showHoverEffect
      />
    );

  return (
    <div>
      {title && (
        <H2 fontSize={16} lineHeight="24px" mb={24}>
          {title}
        </H2>
      )}
      {/* @ts-ignore */}
      <FileUpload
        onUpload={onUpload}
        loading={uploadingFile}
        label={label ?? formatMessage(messages.importFile)}
        acceptedFormats={acceptedFormats}
        value={value}
        multiple={multiple}
        onRemoveFile={multiple ? undefined : removeFile}
        tooltipContent={labelTooltipContent}
      />
      {multiple && (
        <Column
          width="calc(100% + 16px)"
          maxHeight={110}
          overflow="auto"
          pr={16}
          mt={16}
          gap={8}
        >
          {/* @ts-ignore */}
          {value.map(({ url, name, id, deleting }) => (
            <FileBox
              name={name}
              url={url}
              key={id}
              extraIcons={[deleteIcon(id, deleting)]}
              maxHeight={44}
              minHeight={44}
            />
          ))}
        </Column>
      )}
    </div>
  );
};

export default FilesPanel;
