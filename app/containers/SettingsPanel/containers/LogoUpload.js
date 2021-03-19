import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';

import Column from 'components/Column';
import H2 from 'components/H2';
import Text from 'components/Text';
import ImageUpload from 'components/ImageUpload';

import { InterventionDetailsPageContext } from 'containers/InterventionDetailsPage/utils';

import messages from '../messages';

const LogoUpload = ({
  intl: { formatMessage },
  intervention: { logo_url: logoUrl },
  addImage,
  deleteImage,
  logoLoading,
}) => {
  const { canEdit } = useContext(InterventionDetailsPageContext);

  return (
    <Column>
      <H2 mb={10}>{formatMessage(messages.logoHeader)}</H2>
      <Text mb={10}>{formatMessage(messages.logoText)}</Text>
      <ImageUpload
        image={logoUrl}
        loading={logoLoading}
        disabled={!canEdit}
        onAddImage={addImage}
        onDeleteImage={deleteImage}
      />
    </Column>
  );
};

LogoUpload.propTypes = {
  intl: intlShape,
  intervention: PropTypes.object,
  addImage: PropTypes.func,
  deleteImage: PropTypes.func,
  logoLoading: PropTypes.bool,
};

export default injectIntl(LogoUpload);
