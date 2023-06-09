import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { ConfirmationModal } from 'components/Modal';
import Row from 'components/Row';
import { themeColors } from 'theme';

import messages from './messages';
import {
  StyledUserAvatar,
  StyledButtonsRow,
  StyledDeleteButton,
  StyledUploadFileButton,
} from './styled';

const AvatarForm = ({
  user: { avatar, firstName, lastName },
  addAvatar,
  deleteAvatar,
}) => {
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const openConfirmation = () => setConfirmationOpen(true);
  const closeConfirmation = () => setConfirmationOpen(false);

  const handleUpload = (file) => {
    addAvatar({
      image: file,
      imageUrl: window.URL.createObjectURL(file),
    });
  };

  const handleRemoval = () => {
    deleteAvatar();
    closeConfirmation();
  };

  return (
    <>
      <ConfirmationModal
        visible={confirmationOpen}
        onClose={closeConfirmation}
        description={<FormattedMessage {...messages.removeConfirmation} />}
        confirmAction={handleRemoval}
      />
      <Row align="center" width="100%">
        <StyledUserAvatar
          avatar={avatar}
          firstName={firstName}
          lastName={lastName}
        />
        <Row filled>
          <StyledButtonsRow>
            <StyledUploadFileButton
              textProps={{
                color: themeColors.secondary,
                fontWeight: 'bold',
                fontSize: 14,
              }}
              accept="image/jpg, image/png, image/jpeg"
              height="fit-content"
              onUpload={handleUpload}
            >
              <FormattedMessage
                {...messages[avatar ? 'changeAvatar' : 'addAvatar']}
              />
            </StyledUploadFileButton>
            {avatar && (
              <StyledDeleteButton
                data-testid="open-modal"
                color={themeColors.warning}
                fontWeight="bold"
                fontSize={14}
                onClick={openConfirmation}
              >
                <FormattedMessage {...messages.removeAvatar} />
              </StyledDeleteButton>
            )}
          </StyledButtonsRow>
        </Row>
      </Row>
    </>
  );
};

AvatarForm.propTypes = {
  user: PropTypes.shape({
    avatar: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
  }),
  addAvatar: PropTypes.func,
  deleteAvatar: PropTypes.func,
};

export default AvatarForm;
