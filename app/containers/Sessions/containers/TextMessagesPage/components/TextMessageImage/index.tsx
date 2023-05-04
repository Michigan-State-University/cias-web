import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';

import Text from 'components/Text';
import ImageUpload from 'components/ImageUpload';

import messages from '../NoFormulaMessages/messages';

export type Props = {
  imageUrl: Nullable<string>;
  loading: boolean;
  onAdd: (file: File) => void;
  onDelete: () => void;
  editingPossible: boolean;
};

export const TextMessageImage: React.FC<Props> = ({
  imageUrl,
  loading,
  onAdd,
  onDelete,
  editingPossible,
}) => {
  const { formatMessage } = useIntl();

  const handleAddImage = useCallback(
    ({ image }: { image: File; imageUrl: string }) => {
      onAdd(image);
    },
    [onAdd],
  );

  return (
    <>
      <Text mb={10}>{formatMessage(messages.imageNoFormulaLabel)}</Text>
      <ImageUpload
        image={imageUrl}
        loading={loading}
        onAddImage={handleAddImage}
        onDeleteImage={onDelete}
        disabled={!editingPossible}
        acceptedFormats={['JPG', 'PNG', 'GIF']}
      />
    </>
  );
};
