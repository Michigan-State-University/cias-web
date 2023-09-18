import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Row as GRow, Col as GCol, useScreenClass } from 'react-grid-system';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';

import { themeColors } from 'theme';
import { CatMhLicenseType, SensitiveDataState } from 'models/Intervention';
import { useRoleManager } from 'models/User/RolesManager';

import globalMessages from 'global/i18n/globalMessages';
import { RoutePath } from 'global/constants';

import { parametrizeRoutePath } from 'utils/router';

import Row from 'components/Row';
import BackButton from 'components/BackButton';
import Box from 'components/Box';
import Dropdown from 'components/Dropdown';
import { StyledInput } from 'components/Input/StyledInput';
import { selectInputText } from 'components/Input/utils';
import { CollaboratingIndicator } from 'components/CollaboratingIndicator';
import { DataClearedIndicator } from 'components/DataClearedIndicator';
import { HelpIconTooltip } from 'components/HelpIconTooltip';

import InterventionStatusButtons from './components/InterventionStatusButtons';
import { StatusLabel, InterventionOptions } from './styled';
import messages from './messages';
import { CAT_MH_TEST_COUNT_WARNING_THRESHOLD } from './constants';
import { InviteParticipantsButton } from './containers/InviteParticipantsButton';

const Header = ({
  status,
  canCurrentUserMakeChanges,
  editingPossible,
  name,
  editName,
  handleChangeStatus,
  handleSendCsv,
  csvGeneratedAt,
  csvFilename,
  interventionId,
  options,
  organizationId,
  canAccessCsv,
  interventionType,
  userOrganizableId,
  hasCollaborators,
  sensitiveDataState,
  catMhAccess,
  catMhLicenseType,
  catMhPool,
  createdCatMhSessionCount,
  sessions,
}) => {
  const { formatMessage } = useIntl();
  const screenClass = useScreenClass();
  const { isAdmin } = useRoleManager();

  const testsLeft = catMhPool - createdCatMhSessionCount;
  const hasSmallNumberOfCatMhSessionsRemaining =
    catMhLicenseType !== CatMhLicenseType.UNLIMITED &&
    (!catMhPool ||
      testsLeft / catMhPool <= CAT_MH_TEST_COUNT_WARNING_THRESHOLD);

  const renderBackButton = useMemo(() => {
    if (organizationId && (isAdmin || organizationId === userOrganizableId)) {
      return (
        <BackButton
          link
          to={parametrizeRoutePath(RoutePath.DASHBOARD_SETUP, {
            organizationId,
          })}
        >
          <FormattedMessage {...messages.backToOrganization} />
        </BackButton>
      );
    }
    return (
      <BackButton link to={RoutePath.DASHBOARD}>
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
          <Row justify="end" align="center" mt={16} gap={12}>
            {hasCollaborators && <CollaboratingIndicator iconSize={20} />}
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
            <InviteParticipantsButton
              interventionId={interventionId}
              organizationId={organizationId}
              interventionStatus={status}
              interventionType={interventionType}
              sessions={sessions}
            />
          </Row>
          <Row align="center" mt={8} gap={12}>
            <Box>
              <StatusLabel status={status}>
                {status && formatMessage(globalMessages.statuses[status])}
              </StatusLabel>
            </Box>
            {sensitiveDataState === SensitiveDataState.REMOVED && (
              <DataClearedIndicator opacity={1} showTooltip />
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
                csvGeneratedAt={csvGeneratedAt}
                csvFilename={csvFilename}
                interventionId={interventionId}
                canAccessCsv={canAccessCsv}
                canCurrentUserMakeChanges={canCurrentUserMakeChanges}
              />
            </Row>
            <InterventionOptions>
              <Dropdown options={options} clickable />
            </InterventionOptions>
          </Row>
          {catMhAccess && (
            <Row width="100%" justify="end" align="center" mt={8}>
              <HelpIconTooltip
                id="cat-mh-tests-limit-tooltip"
                tooltipContent={formatMessage(messages.catMhCountInfo)}
              >
                {formatMessage(messages.catMhCounter, {
                  catMhLicenseType,
                  current: testsLeft ?? 0,
                  initial: catMhPool ?? 0,
                  used: createdCatMhSessionCount,
                  counter: (chunks) => (
                    <span
                      style={{
                        color: hasSmallNumberOfCatMhSessionsRemaining
                          ? themeColors.warning
                          : themeColors.success,
                      }}
                    >
                      {chunks}
                    </span>
                  ),
                })}
              </HelpIconTooltip>
            </Row>
          )}
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
  csvGeneratedAt: PropTypes.string,
  csvFilename: PropTypes.string,
  interventionId: PropTypes.string,
  organizationId: PropTypes.string,
  options: PropTypes.array,
  canAccessCsv: PropTypes.bool,
  interventionType: PropTypes.string,
  sharingPossible: PropTypes.bool,
  userOrganizableId: PropTypes.string,
  hasCollaborators: PropTypes.bool,
  sensitiveDataState: PropTypes.string,
  catMhAccess: PropTypes.bool,
  catMhLicenseType: PropTypes.string,
  catMhPool: PropTypes.number,
  createdCatMhSessionCount: PropTypes.number,
  sessions: PropTypes.array,
};

export default Header;
