/**
 *
 * Sidebar
 *
 */

import React, { memo, useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl, useIntl } from 'react-intl';
import { compose } from 'redux';

import { makeSelectUser } from 'global/reducers/auth';

import { NAVIGATION } from 'utils/navbarNames';
import { useIsTouchScreen } from 'utils/useIsTouchScreen';

import menu from 'assets/svg/triangle-back-black.svg';

import { RolePermissions } from 'models/User/RolePermissions';

import Comment from 'components/Text/Comment';
import { RotateIcon } from 'components/Icon/RotateIcon';

import DefaultSidebar from './components/DefaultSidebar';

import { ShowSidebarButton, SidebarStyled } from './styled';
import messages from './messages';
import ReportingDashboardPanel from './containers/ReportingDashboardPanel';

export function Sidebar({ user: { roles }, sidebarProps }) {
  const { formatMessage } = useIntl();

  const rolePermissions = useMemo(() => RolePermissions(roles), [roles]);

  const { activeTab, sidebarId } = sidebarProps || {};

  const renderSidebar = useCallback(() => {
    if (sidebarId === NAVIGATION.DEFAULT)
      return <DefaultSidebar activeTab={activeTab} userRoles={roles} />;

    return null;
  }, [sidebarId, activeTab, roles]);

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
      {rolePermissions.canDisplayOrganizationSidebar && (
        <ReportingDashboardPanel
          canAccessOrganizations={rolePermissions.canAccessOrganizations}
          canAddNewOrganization={rolePermissions.canAddNewOrganization}
        />
      )}
    </SidebarStyled>
  );
}

Sidebar.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    roles: PropTypes.arrayOf(PropTypes.string),
    avatar: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  }),
  sidebarProps: PropTypes.shape({
    sidebarId: PropTypes.string.isRequired,
    activeTab: PropTypes.string,
  }),
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
});

export default memo(compose(connect(mapStateToProps), injectIntl)(Sidebar));
