/**
 *
 * Sidebar
 *
 */

import React, { memo, useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, useIntl } from 'react-intl';
import { compose } from 'redux';
import uniqBy from 'lodash/uniqBy';
import flatten from 'lodash/flatten';

import { NAVIGATION } from 'models/User/RolesManager/navbarNames';
import navigationTabs from 'models/User/RolesManager/defaultNavbarTabs';
import { useRoleManager } from 'models/User/RolesManager';

import { useIsTouchScreen } from 'utils/useIsTouchScreen';

import menu from 'assets/svg/triangle-back-black.svg';

import Comment from 'components/Text/Comment';
import { RotateIcon } from 'components/Icon/RotateIcon';

import DefaultSidebar from './components/DefaultSidebar';

import { ShowSidebarButton, SidebarStyled } from './styled';
import messages from './messages';
import ReportingDashboardPanel from './containers/ReportingDashboardPanel';

export function Sidebar({ sidebarProps }) {
  const { formatMessage } = useIntl();

  const {
    canAccessOrganizations,
    canAddNewOrganization,
    canDisplayOrganizationSidebar,
    userRoles,
  } = useRoleManager();

  const { activeTab, activeSubTab, sidebarId } = sidebarProps || {};

  const sidebarTabs = useMemo(
    () =>
      uniqBy(
        flatten(
          userRoles?.reduce(
            (tabs, userRole) => [...tabs, navigationTabs[userRole]],
            [],
          ) || [],
        ),
        'id',
      ),
    [userRoles],
  );

  const renderSidebar = useCallback(() => {
    if (sidebarId === NAVIGATION.DEFAULT)
      return (
        <DefaultSidebar
          activeTab={activeTab}
          activeSubTab={activeSubTab}
          sidebarTabs={sidebarTabs}
        />
      );

    return null;
  }, [sidebarId, activeTab, activeSubTab, sidebarTabs]);

  const [showSidebar, setShowSidebar] = useState(false);
  const isTouchScreen = useIsTouchScreen();
  const sidebarInteractionProps = isTouchScreen
    ? {
        onClick: () => setShowSidebar(!showSidebar),
        onMouseLeave: () => setShowSidebar(false),
      }
    : {
        onMouseEnter: () => setShowSidebar(true),
        onMouseLeave: () => setShowSidebar(false),
        onClick: () => setShowSidebar(false),
      };

  if (!canDisplayOrganizationSidebar && !sidebarTabs.length) return null;

  return (
    <SidebarStyled isVisible={showSidebar} {...sidebarInteractionProps}>
      <ShowSidebarButton
        aria-label={formatMessage(messages.showSidebarButtonLabel)}
        title={formatMessage(messages.showSidebarButtonLabel)}
      >
        {/* @ts-ignore */}
        <RotateIcon
          src={menu}
          $rotate={!showSidebar}
          alt={formatMessage(messages.showSidebarIcon)}
        />
      </ShowSidebarButton>
      <Comment mb="8px !important">
        {formatMessage(messages.sidebarNavigationHeader)}
      </Comment>
      {renderSidebar()}
      {canDisplayOrganizationSidebar && (
        <ReportingDashboardPanel
          canAccessOrganizations={canAccessOrganizations}
          canAddNewOrganization={canAddNewOrganization}
        />
      )}
    </SidebarStyled>
  );
}

Sidebar.propTypes = {
  sidebarProps: PropTypes.shape({
    sidebarId: PropTypes.string.isRequired,
    activeTab: PropTypes.string,
  }),
};

export default memo(compose(injectIntl)(Sidebar));
