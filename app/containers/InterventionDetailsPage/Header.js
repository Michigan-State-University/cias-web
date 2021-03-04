import React from 'react';
import PropTypes from 'prop-types';
import { Row as GRow, Col as GCol, useScreenClass } from 'react-grid-system';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';

import Row from 'components/Row';
import BackButton from 'components/BackButton';
import messages from 'containers/InterventionDetailsPage/messages';
import Box from 'components/Box';
import Dropdown from 'components/Dropdown';
import { StyledInput } from 'components/Input/StyledInput';
import { selectInputText } from 'components/Input/utils';

import globalMessages from 'global/i18n/globalMessages';

import { StatusLabel, InterventionOptions } from './styled';
import InterventionStatusButtons from './components/InterventionStatusButtons';

const Header = ({
  intl: { formatMessage },
  status,
  editingPossible,
  name,
  editName,
  handleChangeStatus,
  handleSendCsv,
  csvLink,
  csvGeneratedAt,
  options,
}) => {
  const screenClass = useScreenClass();
  return (
    <GCol>
      <GRow xl={12}>
        <GCol>
          <Row justify="between" mt={50}>
            <BackButton to="/">
              <FormattedMessage {...messages.back} />
            </BackButton>
          </Row>
        </GCol>
      </GRow>

      <GRow>
        <GCol xxl={6} xl={5} lg={12}>
          <Row justify="end" align="center" mt={18}>
            <Box mr={15}>
              <StatusLabel status={status}>
                {status && formatMessage(globalMessages.statuses[status])}
              </StatusLabel>
            </Box>
            <StyledInput
              disabled={!editingPossible}
              ml={-12}
              px={12}
              py={6}
              width="100%"
              value={name}
              fontSize={23}
              placeholder={formatMessage(messages.placeholder)}
              onBlur={editName}
              onFocus={selectInputText}
              maxWidth="none"
            />
          </Row>
        </GCol>
        <GCol>
          <Row
            mt={18}
            align="center"
            width="100%"
            justify={['sm', 'xs'].includes(screenClass) ? 'between' : 'end'}
          >
            <Row
              width={['sm', 'xs'].includes(screenClass) ? '200px' : '100%'}
              align="center"
              justify="end"
              mr={20}
              flexWrap="wrap"
            >
              <InterventionStatusButtons
                status={status}
                handleChangeStatus={handleChangeStatus}
                handleSendCsv={handleSendCsv}
                csvLink={csvLink}
                csvGeneratedAt={csvGeneratedAt}
              />
            </Row>
            <InterventionOptions>
              <Dropdown options={options} clickable />
            </InterventionOptions>
          </Row>
        </GCol>
      </GRow>
    </GCol>
  );
};

Header.propTypes = {
  intl: intlShape,
  status: PropTypes.string,
  editingPossible: PropTypes.bool,
  name: PropTypes.string,
  editName: PropTypes.func,
  handleChangeStatus: PropTypes.func,
  handleSendCsv: PropTypes.func,
  csvLink: PropTypes.string,
  csvGeneratedAt: PropTypes.string,
  options: PropTypes.array,
};

export default injectIntl(Header);
