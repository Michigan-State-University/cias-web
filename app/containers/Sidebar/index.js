/**
 *
 * Sidebar
 *
 */

import React, { memo, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl, useIntl } from 'react-intl';
import { compose } from 'redux';

import { makeSelectUser } from 'global/reducers/auth';
import { NAVIGATION } from 'utils/navbarNames';

import Comment from 'components/Text/Comment';

import { RolePermissions } from 'models/User/RolePermissions';
import DefaultSidebar from './components/DefaultSidebar';

import { SidebarStyled } from './styled';
import messages from './messages';
import ReportingDashboardPanel from './containers/ReportingDashboardPanel';

export function Sidebar({ user: { roles }, sidebarProps }) {
  const { formatMessage } = useIntl();

  const rolePermissions = useMemo(() => RolePermissions(roles), [roles]);

  const { activeTab, sidebarId } = sidebarProps || {};

  const renderSidebar = useCallback(() => {
    if (sidebarId === NAVIGATION.DEFAULT)
      return <DefaultSidebar activeTab={activeTab} userRole={roles[0]} />;

    return null;
  }, [sidebarId, activeTab, roles]);

  return (
    <SidebarStyled>
      <Comment mb="8px !important">
        {formatMessage(messages.sidebarNavigationHeader)}
      </Comment>
      {renderSidebar()}
      {rolePermissions.canDisplayOrganizationSidebar && (
        <ReportingDashboardPanel
          canAccessOrganizations={rolePermissions.canAccessOrganizations}
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

export default memo(
  compose(
    connect(mapStateToProps),
    injectIntl,
  )(Sidebar),
);
