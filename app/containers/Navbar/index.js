/**
 *
 * Navbar
 *
 */

import React, { memo, useState, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage, injectIntl, IntlShape, useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { compose } from 'redux';

import NavigatorAvailabilityPanel from 'containers/NavigatorAvailabilityPanel';
import UserAvatar from 'components/UserAvatar';
import Box from 'components/Box';
import Row from 'components/Row';
import Img from 'components/Img';

import { NAVIGATION } from 'models/User/RolesManager/navbarNames';

import useOutsideClick from 'utils/useOutsideClick';
import useResizeObserver from 'utils/useResizeObserver';

import { makeSelectUser } from 'global/reducers/auth';
import { saveNavbarHeight } from 'global/reducers/globalState';

import {
  NavbarStyled,
  RightPanel,
  DropDownContainer,
  DropDownContent,
  StyledRow,
  StyledComment,
  NavbarContainer,
} from './styled';
import messages from './messages';
import { getUserNavbarElements } from './dropdownContent';
import NotificationsPanel from './NotificationsPanel';

import PreviewNavbar from './components/PreviewNavbar';
import DefaultNavbar from './components/DefaultNavbar';
import InterventionsNavbar from './components/InterventionsNavbar';
import { CollaborationPanel } from '../CollaborationPanel';

const renderNavbar = (navbarProps) => {
  const { navbarId, ...restProps } = navbarProps || {};
  if (navbarId === NAVIGATION.SESSIONS)
    return <InterventionsNavbar {...restProps} />;
  if (navbarId === NAVIGATION.PREVIEW) return <PreviewNavbar {...restProps} />;
  if (navbarId === NAVIGATION.DEFAULT) return <DefaultNavbar {...restProps} />;
  return null;
};

export function Navbar({
  user: { firstName, lastName, avatar, roles },
  navbarProps,
  match,
  location,
  intl,
}) {
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();

  const [menuVisible, setMenuVisible] = useState(false);
  const dropdownRef = useRef(null);
  useOutsideClick(dropdownRef, () => setMenuVisible(false), menuVisible);

  const isSessionsNavbar = navbarProps?.navbarId === NAVIGATION.SESSIONS;

  const navbarRef = useRef();
  useResizeObserver({
    targetRef: navbarRef,
    onResize: (_, height) => dispatch(saveNavbarHeight(height)),
  });

  const userNavbarElements = useMemo(
    () => getUserNavbarElements(roles),
    [roles],
  );

  const displayedName = useMemo(() => {
    if (!firstName && !lastName) {
      return formatMessage(messages.defaultDisplayedName);
    }
    return `${firstName ?? ''} ${lastName ?? ''}`;
  }, [firstName, lastName]);

  return (
    <NavbarContainer ref={navbarRef}>
      <NavbarStyled>
        {renderNavbar({
          ...navbarProps,
          match,
          location,
          intl,
        })}
        <RightPanel>
          <NavigatorAvailabilityPanel />
          <NotificationsPanel />
          <DropDownContainer
            onClick={() => !menuVisible && setMenuVisible(true)}
          >
            <div ref={dropdownRef}>
              {menuVisible && (
                <DropDownContent>
                  {userNavbarElements.map(
                    ({ url, messagesKey, icon }, index) => (
                      <StyledRow
                        key={index}
                        onClick={() => setMenuVisible(false)}
                      >
                        <Link to={url}>
                          <Row>
                            <Img mr={13} src={icon} />
                            <StyledComment>
                              <FormattedMessage
                                {...messages[messagesKey]}
                                title={intl.formatMessage(
                                  messages[messagesKey],
                                )}
                              />
                            </StyledComment>
                          </Row>
                        </Link>
                      </StyledRow>
                    ),
                  )}
                </DropDownContent>
              )}
            </div>
            <UserAvatar
              width={30}
              height={30}
              avatar={avatar}
              lastName={lastName}
              firstName={firstName}
            />
            <Box
              marginInlineStart={10}
              className="user-name-info"
              clickable
              data-private
            >
              {displayedName}
            </Box>
          </DropDownContainer>
        </RightPanel>
      </NavbarStyled>
      {isSessionsNavbar && <CollaborationPanel />}
    </NavbarContainer>
  );
}

Navbar.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    roles: PropTypes.arrayOf(PropTypes.string),
    avatar: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  }),
  navbarProps: PropTypes.shape({
    navbarId: PropTypes.string.isRequired,
    navbarName: PropTypes.node,
  }),
  match: PropTypes.object,
  location: PropTypes.object,
  intl: PropTypes.shape(IntlShape),
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
});

export default memo(compose(connect(mapStateToProps), injectIntl)(Navbar));
