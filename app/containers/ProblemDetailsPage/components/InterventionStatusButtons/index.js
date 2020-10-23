/**
 *
 * InterventionStatusButtons
 *
 */
import React, { useState } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import get from 'lodash/get';

import { colors, themeColors } from 'theme';

import ConfirmationBox from 'components/ConfirmationBox';
import { LI, UL } from 'components/List';
import Column from 'components/Column';
import Divider from 'components/Divider';
import Row from 'components/Row';
import Text from 'components/Text';

import messages from './messages';
import { ShareButton } from './styled';

function InterventionStatusButtons({
  intl: { formatMessage },
  status,
  handleChangeStatus,
  handleSendCsv,
}) {
  const CsvButton = () => (
    <ShareButton mr={10} width={200} outlined onClick={handleSendCsv}>
      <FormattedMessage {...messages.csv} />
    </ShareButton>
  );

  const CloseButton = () => (
    <ShareButton
      width={200}
      bg={colors.burntSienna}
      onClick={handleChangeStatus}
    >
      <FormattedMessage {...messages.close} />
    </ShareButton>
  );

  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const openConfirmation = () => setConfirmationOpen(true);
  const closeConfirmation = () => setConfirmationOpen(false);
  const handlePublish = () => {
    handleChangeStatus();
    closeConfirmation();
  };

  const publishConfirmationDesc = () => (
    <>
      <Text mt={10} fontSize={18} color={colors.flamingo} textAlign="center">
        {formatMessage(messages.irreversibleInfo)}
      </Text>
      <Row justify="center" mt={10}>
        <Column ml={18} mr={5}>
          <UL fontSize={12} color={themeColors.primary}>
            <LI>{formatMessage(messages.dataCollectedInfo)}</LI>
            <LI>{formatMessage(messages.editParticipantsInfo)}</LI>
            <LI>{formatMessage(messages.duplicateInfo)}</LI>
          </UL>
        </Column>
        <Column width="1px">
          <Divider />
        </Column>
        <Column ml={25}>
          <UL fontSize={12}>
            <LI>{formatMessage(messages.dataDeletedInfo)}</LI>
            <LI>{formatMessage(messages.editInfo)}</LI>
          </UL>
        </Column>
      </Row>
    </>
  );

  const PublishButton = () => (
    <>
      <ConfirmationBox
        visible={confirmationOpen}
        onClose={closeConfirmation}
        description={<FormattedMessage {...messages.confirmationTile} />}
        confirmAction={handlePublish}
        confirmationButtonColor="primary"
        content={publishConfirmationDesc()}
        contentStyles={{
          padding: '0px',
        }}
        contentContainerStyles={{
          px: 20,
          my: 20,
        }}
      />
      <ShareButton width={200} onClick={openConfirmation}>
        <FormattedMessage {...messages.publish} />
      </ShareButton>
    </>
  );

  const statuses = {
    draft: <PublishButton />,
    published: (
      <>
        <CsvButton />
        <CloseButton />
      </>
    ),
    closed: <CsvButton />,
  };

  const renderButtons = () => get(statuses, status, <></>);

  return renderButtons();
}

InterventionStatusButtons.propTypes = {
  intl: PropTypes.object,
  status: PropTypes.string,
  handleChangeStatus: PropTypes.func,
  handleSendCsv: PropTypes.func,
};

export default injectIntl(InterventionStatusButtons);
