import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { compose } from 'redux';

import Button from 'components/Button';
import Column from 'components/Column';
import Row from 'components/Row';
import Text from 'components/Text';
import Tooltip from 'components/Tooltip';
import UploadFileButton from 'components/UploadFileButton';
import csvFile from 'assets/svg/csv-file.svg';
import { StyledInput } from 'components/Input/StyledInput';

import messages from '../messages';

const ParticipantInviter = ({ intl: { formatMessage } }) => {
  // mock input value
  // eslint-disable-next-line no-unused-vars
  const [value, setValue] = useState('');
  return (
    <Column>
      <Row mb={15} justify="between" align="center">
        <Row align="center">
          <Text fontWeight="bold">
            <FormattedMessage {...messages.inviteLabel} />
          </Text>
          <Tooltip ml={8} id="el-participant-inviter-tooltip">
            <FormattedMessage {...messages.tooltipInviterContent} />
          </Tooltip>
        </Row>
        <UploadFileButton icon={csvFile}>
          <FormattedMessage {...messages.uploadText} />
        </UploadFileButton>
      </Row>
      <Row align="center" justify="between">
        <StyledInput
          transparent={false}
          placeholder={formatMessage(messages.emailPlaceholder)}
          type="singleline"
          width="100%"
          maxWidth="none"
          value={value}
          onBlur={() => {}}
          height={46}
          mt={0}
        />
        <Button disabled={!value} heigh={25} width={140} ml={12} hoverable>
          <FormattedMessage {...messages.sendText} />
        </Button>
      </Row>
    </Column>
  );
};

ParticipantInviter.propTypes = {
  intl: intlShape,
};

export default compose(injectIntl)(ParticipantInviter);
