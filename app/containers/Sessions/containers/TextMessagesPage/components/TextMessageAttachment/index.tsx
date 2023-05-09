import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';

import Text from 'components/Text';
import ImageUpload from 'components/ImageUpload';

import messages from '../NoFormulaMessages/messages';

export type Props = {
  attachmentUrl: Nullable<string>;
  loading: boolean;
  onAdd: (file: File) => void;
  onDelete: () => void;
  editingPossible: boolean;
};

export const TextMessageAttachment: React.FC<Props> = ({
  attachmentUrl,
  loading,
  onAdd,
  onDelete,
  editingPossible,
}) => {
  const { formatMessage } = useIntl();

  const handleAddAttachment = useCallback(
    ({ image }: { image: File; imageUrl: string }) => {
      onAdd(image);
    },
    [onAdd],
  );

  return (
    <>
      <Text mb={10}>{formatMessage(messages.attachmentNoFormulaLabel)}</Text>
      <ImageUpload
        image={attachmentUrl}
        loading={loading}
        onAddImage={handleAddAttachment}
        onDeleteImage={onDelete}
        disabled={!editingPossible}
        acceptedFormats={['JPG', 'PNG', 'GIF']}
      />
    </>
  );
};
