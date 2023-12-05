import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Row as GRow, Col as GCol, useScreenClass } from 'react-grid-system';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';

import { themeColors } from 'theme';
import { CatMhLicenseType, SensitiveDataState } from 'models/Intervention';
import { useRoleManager } from 'models/User/RolesManager';

import interventionStatusesMessages from 'global/i18n/interventionStatusesMessages';
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
import { Button } from 'components/Button';
import Column from 'components/Column';

import InterventionStatusButtons from './components/InterventionStatusButtons';
import { StatusLabel, InterventionOptions } from './styled';
import messages from './messages';
import { CAT_MH_TEST_COUNT_WARNING_THRESHOLD } from './constants';
import { ParticipantsInviter } from './containers/ParticipantInviter';

const Header = ({
  status,
  canCurrentUserMakeChanges,
  editingPossible,
  name,
  editName,
  handleChangeStatus,
  interventionId,
  options,
  organizationId,
  interventionType,
  userOrganizableId,
  hasCollaborators,
  sensitiveDataState,
  catMhAccess,
  catMhLicenseType,
  catMhPool,
  createdCatMhSessionCount,
  sessions,
  openExportCsvModal,
  canAccessParticipantsData,
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

  const isWrappedLayout = !['xl', 'xxl'].includes(screenClass);

  const interventionStatus = (
    <Row align="center" gap={12}>
      <Box>
        <StatusLabel status={status}>
          {status && formatMessage(interventionStatusesMessages[status])}
        </StatusLabel>
      </Box>
      {sensitiveDataState === SensitiveDataState.REMOVED && (
        <DataClearedIndicator opacity={1} showTooltip />
      )}
    </Row>
  );

  return (
    <GCol>
      <GRow xl={12}>
        <GCol>
          <Row justify="between" mt={24}>
            {renderBackButton}
          </Row>
        </GCol>
      </GRow>

      <Row
        columnGap={16}
        rowGap={8}
        direction={isWrappedLayout ? 'column' : 'row'}
        marginBlockStart={16}
      >
        <Column flex={1} gap={8}>
          <Row justify="end" align="center" gap={12}>
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
            <ParticipantsInviter
              interventionId={interventionId}
              interventionName={name}
              organizationId={organizationId}
              interventionStatus={status}
              interventionType={interventionType}
              sessions={sessions}
            />
          </Row>
          {!isWrappedLayout && interventionStatus}
        </Column>

        <Row
          justify="between"
          align="start"
          rowGap={8}
          columnGap={16}
          flexWrap="wrap"
        >
          {isWrappedLayout && interventionStatus}
          <Column width="auto" gap={8} flex={isWrappedLayout && 1}>
            <Row align="center" justify="end" width="100%" gap={16}>
              {canAccessParticipantsData && (
                <Button
                  px={32}
                  onClick={openExportCsvModal}
                  width="auto"
                  inverted
                >
                  {formatMessage(messages.exportCsvModalTitle)}
                </Button>
              )}
              <InterventionStatusButtons
                status={status}
                handleChangeStatus={handleChangeStatus}
                canCurrentUserMakeChanges={canCurrentUserMakeChanges}
              />
              <InterventionOptions>
                <Dropdown
                  id={`intervention-options-${interventionId}`}
                  options={options}
                  clickable
                />
              </InterventionOptions>
            </Row>
            {catMhAccess && catMhLicenseType && (
              <Row width="100%" justify="end" align="center" overflow="visible">
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
          </Column>
        </Row>
      </Row>
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
  interventionId: PropTypes.string,
  organizationId: PropTypes.string,
  options: PropTypes.array,
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
  openExportCsvModal: PropTypes.func,
  canAccessParticipantsData: PropTypes.bool,
};

export default Header;
