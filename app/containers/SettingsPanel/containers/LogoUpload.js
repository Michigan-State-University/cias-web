import React, { memo, useContext } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';

import { colors } from 'theme';

import Column from 'components/Column';
import H2 from 'components/H2';
import Text from 'components/Text';
import ImageUpload from 'components/ImageUpload';
import ApprovableInput from 'components/Input/ApprovableInput';
import Box from 'components/Box';

import { InterventionDetailsPageContext } from 'containers/InterventionDetailsPage/utils';

import messages from '../messages';

const LogoUpload = ({
  logo,
  addImage,
  deleteImage,
  updateDescription,
  logoLoading,
}) => {
  const { formatMessage } = useIntl();
  const { canEdit } = useContext(InterventionDetailsPageContext);

  const { url, alt } = logo ?? {};

  return (
    <Column>
      <H2 mb={10}>{formatMessage(messages.logoHeader)}</H2>

      <Text mb={10}>{formatMessage(messages.logoText)}</Text>

      <ImageUpload
        image={url}
        loading={logoLoading}
        disabled={!canEdit}
        onAddImage={addImage}
        onDeleteImage={deleteImage}
        acceptedFormats={['JPG', 'PNG']}
      />

      {url && (
        <Box mt={30} bg={colors.linkWater}>
          <ApprovableInput
            type="multiline"
            value={alt ?? ''}
            onCheck={updateDescription}
            placeholder={formatMessage(messages.logoDescriptionPlaceholder)}
            rows="4"
            disabled={!canEdit}
          />
        </Box>
      )}
    </Column>
  );
};

LogoUpload.propTypes = {
  logo: PropTypes.object,
  addImage: PropTypes.func,
  deleteImage: PropTypes.func,
  updateDescription: PropTypes.func,
  logoLoading: PropTypes.bool,
};

export default memo(LogoUpload);
