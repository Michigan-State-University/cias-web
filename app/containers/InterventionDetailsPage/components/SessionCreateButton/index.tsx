/**
 *
 * SessionCreateButton
 *
 */

import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import Row from 'components/Row';
import Img from 'components/Img';
import H3 from 'components/H3';
import Modal from 'components/Modal';
import addSign2 from 'assets/svg/addSign2.svg';

import { SessionTypes } from 'models/Session/SessionDto';
import { NewInterventionContainer } from './styled';
import messages from './messages';
import SessionTypeChooser from './SessionTypeChooser';

type Props = {
  handleSessionCreation: (sessionType: string) => void;
  canCreateCatSession?: boolean;
};

const SessionCreateButton = ({
  handleSessionCreation,
  canCreateCatSession,
}: Props): JSX.Element => {
  const [modalVisible, setModalVisible] = useState(false);
  const { formatMessage } = useIntl();

  const handleClose = () => setModalVisible(false);

  const clickWrapper = () => {
    if (!canCreateCatSession) {
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
        <SessionTypeChooser onCreateSession={handleSessionWithTypeCreation} />
      </Modal>
      <NewInterventionContainer
        data-cy="create-session-button"
        onClick={clickWrapper}
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

export default SessionCreateButton;
