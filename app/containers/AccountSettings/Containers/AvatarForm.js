import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import ConfirmationBox from 'components/ConfirmationBox';
import Row from 'components/Row';
import {
  makeSelectUser,
  addAvatarRequest,
  addAvatarSaga,
  deleteAvatarRequest,
  deleteAvatarSaga,
} from 'global/reducers/auth';
import { themeColors, colors } from 'theme';
import { useInjectSaga } from 'utils/injectSaga';

import messages from '../messages';
import {
  StyledUserAvatar,
  StyledButtonsRow,
  StyledDeleteButton,
  StyledUploadFileButton,
} from '../styled';

const AvatarForm = ({
  user: { avatar, firstName, lastName },
  addAvatar,
  deleteAvatar,
}) => {
  useInjectSaga({ key: 'addAvatar', saga: addAvatarSaga });
  useInjectSaga({ key: 'deleteAvatar', saga: deleteAvatarSaga });
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const openConfirmation = () => setConfirmationOpen(true);
  const closeConfirmation = () => setConfirmationOpen(false);

  const handleUpload = file => {
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
    <Fragment>
      <ConfirmationBox
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
              height="fit-content"
              onUpload={handleUpload}
            >
              <FormattedMessage
                {...messages[avatar ? 'changeAvatar' : 'addAvatar']}
              />
            </StyledUploadFileButton>
            {avatar && (
              <StyledDeleteButton
                color={colors.flamingo}
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
    </Fragment>
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

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
});

const mapDispatchToProps = {
  addAvatar: addAvatarRequest,
  deleteAvatar: deleteAvatarRequest,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  injectIntl,
)(AvatarForm);
