import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import TextButton from 'components/Button/TextButton';
import ConfirmationBox from 'components/ConfirmationBox';
import Row from 'components/Row';
import UploadFileButton from 'components/UploadFileButton';
import { makeSelectUser, editUserRequest } from 'global/reducers/auth';
import { themeColors, colors } from 'theme';

import messages from '../messages';
import { StyledUserAvatar } from '../styled';

const AvatarForm = ({ user: { avatar, firstName, lastName } }) => {
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const openConfirmation = () => setConfirmationOpen(true);
  const closeConfirmation = () => setConfirmationOpen(false);

  return (
    <Fragment>
      <ConfirmationBox
        visible={confirmationOpen}
        onClose={closeConfirmation}
        description={<FormattedMessage {...messages.removeConfirmation} />}
      />
      <Row align="center">
        <StyledUserAvatar
          avatar={avatar}
          firstName={firstName}
          lastName={lastName}
        />
        <UploadFileButton
          ml={20}
          textProps={{
            color: themeColors.secondary,
            fontWeight: 'bold',
            fontSize: 14,
          }}
          height="fit-content"
        >
          <FormattedMessage
            {...messages[avatar ? 'changeAvatar' : 'addAvatar']}
          />
        </UploadFileButton>
        {avatar && (
          <TextButton
            ml={30}
            color={colors.flamingo}
            fontWeight="bold"
            fontSize={14}
            onClick={openConfirmation}
          >
            <FormattedMessage {...messages.removeAvatar} />
          </TextButton>
        )}
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
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
});

const mapDispatchToProps = {
  editUser: editUserRequest,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  injectIntl,
)(AvatarForm);
