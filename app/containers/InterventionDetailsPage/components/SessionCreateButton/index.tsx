/**
 *
 * SessionCreateButton
 *
 */

import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { includes } from 'lodash';

import { makeSelectUser } from 'global/reducers/auth';

import { SessionTypes } from 'models/Session';
import { User } from 'models/User';
import Row from 'components/Row';
import Img from 'components/Img';
import H3 from 'components/H3';
import Modal from 'components/Modal';
import addSign2 from 'assets/svg/addSign2.svg';

import { NewInterventionContainer } from './styled';
import messages from './messages';
import SessionTypeChooser from './SessionTypeChooser';

type Props = {
  handleSessionCreation: (sessionType: string) => void;
  canCreateCatSession: boolean;
  disabled: boolean;
  user: User;
};

const SessionCreateButton = ({
  handleSessionCreation,
  canCreateCatSession,
  disabled,
  user,
}: Props): JSX.Element => {
  const [modalVisible, setModalVisible] = useState(false);
  const { formatMessage } = useIntl();

  const handleClose = () => setModalVisible(false);

  const canCreateSmsSession = () => {
    if (process.env.DISABLED_SMS_CAMPAIGN === 'true') {
      return includes(
        process.env.ALLOWED_USERS_FOR_SMS_CAMPAIGNS?.split(', '),
        user.id,
      );
    }
    return true;
  };

  const clickWrapper = () => {
    if (!canCreateCatSession && !canCreateSmsSession()) {
      handleSessionCreation(SessionTypes.CLASSIC_SESSION);
    } else {
      setModalVisible(true);
    }
  };

  const handleSessionWithTypeCreation = (sessionType: string) => {
    handleClose();
    handleSessionCreation(sessionType);
  };

  return (
    <>
      {/* @ts-ignore */}
      <Modal
        visible={modalVisible}
        title={formatMessage(messages.createNewSession)}
        onClose={handleClose}
        maxWidth={500}
      >
        <SessionTypeChooser
          onCreateSession={handleSessionWithTypeCreation}
          canCreateCatSession={canCreateCatSession}
          canCreateSmsSession={canCreateSmsSession()}
        />
      </Modal>
      <NewInterventionContainer
        data-cy="create-session-button"
        onClick={clickWrapper}
        disabled={disabled}
        clickable
      >
        <Row align="center">
          <Img src={addSign2} alt="add" mx={10} />
          <H3>
            <FormattedMessage {...messages.createNewSession} />
          </H3>
        </Row>
      </NewInterventionContainer>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
});

const withConnect = connect(mapStateToProps, null);

export default compose(withConnect)(SessionCreateButton);
