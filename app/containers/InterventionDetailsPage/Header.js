import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Row as GRow, Col as GCol, useScreenClass } from 'react-grid-system';
import { FormattedMessage, IntlShape, injectIntl } from 'react-intl';

import { themeColors } from 'theme';
import { InterventionType } from 'models/Intervention';
import { useRoleManager } from 'models/User/RolesManager';

import globalMessages from 'global/i18n/globalMessages';

import MailIcon from 'assets/svg/pink-mail.svg';

import Row from 'components/Row';
import BackButton from 'components/BackButton';
import Box from 'components/Box';
import Dropdown from 'components/Dropdown';
import { StyledInput } from 'components/Input/StyledInput';
import { selectInputText } from 'components/Input/utils';
import { TextButton } from 'components/Button';
import Icon from 'components/Icon';

import InterventionStatusButtons from './components/InterventionStatusButtons';
import { StatusLabel, InterventionOptions } from './styled';
import messages from './messages';

const Header = ({
  intl: { formatMessage },
  status,
  canCurrentUserMakeChanges,
  editingPossible,
  name,
  editName,
  handleChangeStatus,
  handleSendCsv,
  csvLink,
  csvGeneratedAt,
  options,
  organizationId,
  canAccessCsv,
  openInterventionInviteModal,
  interventionType,
  sharingPossible,
  userOrganizableId,
}) => {
  const screenClass = useScreenClass();
  const { isAdmin } = useRoleManager();

  const isModuleIntervention = interventionType !== InterventionType.DEFAULT;

  const renderBackButton = useMemo(() => {
    if (organizationId && (isAdmin || organizationId === userOrganizableId)) {
      return (
        <BackButton link to={`/organization/${organizationId}/dashboard-setup`}>
          <FormattedMessage {...messages.backToOrganization} />
        </BackButton>
      );
    }
    return (
      <BackButton link to="/">
        <FormattedMessage {...messages.back} />
      </BackButton>
    );
  }, [organizationId]);

  return (
    <GCol>
      <GRow xl={12}>
        <GCol>
          <Row justify="between" mt={24}>
            {renderBackButton}
          </Row>
        </GCol>
      </GRow>

      <GRow>
        <GCol xl={7} lg={12}>
          <Row justify="end" align="center" mt={16}>
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
              autoComplete="off"
            />
            {isModuleIntervention && (
              <TextButton
                onClick={openInterventionInviteModal}
                buttonProps={{
                  color: themeColors.secondary,
                  minWidth: 180,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                disabled={!sharingPossible}
              >
                {formatMessage(messages.inviteToIntervention)}
                <Icon ml={5} src={MailIcon} />
              </TextButton>
            )}
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
                canAccessCsv={canAccessCsv}
                canCurrentUserMakeChanges={canCurrentUserMakeChanges}
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
  intl: PropTypes.shape(IntlShape),
  status: PropTypes.string,
  canCurrentUserMakeChanges: PropTypes.bool,
  editingPossible: PropTypes.bool,
  name: PropTypes.string,
  editName: PropTypes.func,
  handleChangeStatus: PropTypes.func,
  handleSendCsv: PropTypes.func,
  csvLink: PropTypes.string,
  csvGeneratedAt: PropTypes.string,
  organizationId: PropTypes.string,
  options: PropTypes.array,
  canAccessCsv: PropTypes.bool,
  openInterventionInviteModal: PropTypes.func,
  interventionType: PropTypes.string,
  sharingPossible: PropTypes.bool,
  userOrganizableId: PropTypes.string,
};

export default injectIntl(Header);
