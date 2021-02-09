import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Button from 'components/Button';
import Column from 'components/Column';
import ErrorAlert from 'components/ErrorAlert';
import Modal from 'components/Modal';
import { emailValidator } from 'utils/validators/emailValidator';
import { injectReducer, injectSaga } from 'redux-injectors';

import InvitationList from './Containers/InvitationList';
import InviteForm from './Containers/InviteForm';
import inviteResearcherReducer from './reducer';
import messages from './messages';
import { inviteResearcherSaga } from './sagas';
import { makeSelectInviteState } from './selectors';
import { changeEmailInput } from './actions';

const InviteResearcher = ({
  visible,
  onClose,
  intl: { formatMessage },
  sendInvitation,
  changeInput,
  deleteError,
  inviteOnly,
  inviteState: { email, loading, error: apiError },
}) => {
  const handleClose = () => {
    deleteError('invite', null);
    onClose();
  };

  const onSendClick = valid => () => {
    if (valid) {
      sendInvitation(email);
      changeInput('');
    }
  };

  const handleKeyDown = event => {
    if (event.keyCode === 13) {
      sendInvitation(email);
    }
  };

  const isValid = emailValidator(email);
  return (
    <Modal
      visible={visible}
      onClose={handleClose}
      title={formatMessage(messages.modalTitle)}
      minWidth={450}
    >
      <Column>
        <InviteForm
          isValid={isValid}
          email={email}
          formatMessage={formatMessage}
          handleKeyDown={handleKeyDown}
        />
        {!inviteOnly && <InvitationList />}
        <Button
          width={260}
          alignSelf="center"
          mt={45}
          mb={5}
          loading={loading}
          onClick={onSendClick(isValid)}
          disabled={!email}
        >
          <FormattedMessage {...messages.buttonText} />
        </Button>
        {apiError && <ErrorAlert errorText={apiError} mt={25} />}
      </Column>
    </Modal>
  );
};

InviteResearcher.propTypes = {
  intl: intlShape,
  visible: PropTypes.bool,
  onClose: PropTypes.func,
  inviteState: PropTypes.shape({
    email: PropTypes.string,
    loading: PropTypes.bool,
    error: PropTypes.string,
  }),
  onInputChange: PropTypes.func,
  deleteError: PropTypes.func,
  sendInvitation: PropTypes.func,
  changeInput: PropTypes.func,
  inviteOnly: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  inviteState: makeSelectInviteState(),
});

const mapDispatchToProps = {
  changeInput: changeEmailInput,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  injectReducer({
    key: 'invitations',
    reducer: inviteResearcherReducer,
  }),
  injectSaga({ key: 'inviteResearcher', saga: inviteResearcherSaga }),
  withConnect,
  injectIntl,
  memo,
)(InviteResearcher);
