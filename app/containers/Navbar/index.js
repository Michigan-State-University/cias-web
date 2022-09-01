/**
 *
 * Navbar
 *
 */

import React, { memo, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage, injectIntl, IntlShape } from 'react-intl';
import { Link } from 'react-router-dom';
import { compose } from 'redux';

import UserAvatar from 'components/UserAvatar';
import Box from 'components/Box';
import Row from 'components/Row';
import Img from 'components/Img';

import useOutsideClick from 'utils/useOutsideClick';
import { NAVIGATION } from 'models/User/RolesManager/navbarNames';
import { makeSelectUser } from 'global/reducers/auth';

import {
  NavbarStyled,
  RightPanel,
  DropDownContainer,
  DropDownContent,
  StyledRow,
  StyledComment,
} from './styled';
import messages from './messages';
import { navbarElements } from './dropdownContent';
import NotificationsPanel from './NotificationsPanel';

import PreviewNavbar from './components/PreviewNavbar';
import DefaultNavbar from './components/DefaultNavbar';
import InterventionsNavbar from './components/InterventionsNavbar';

const renderNavbar = (navbarProps) => {
  const { navbarId, ...restProps } = navbarProps || {};
  if (navbarId === NAVIGATION.SESSIONS)
    return <InterventionsNavbar {...restProps} />;
  if (navbarId === NAVIGATION.PREVIEW) return <PreviewNavbar {...restProps} />;
  if (navbarId === NAVIGATION.DEFAULT) return <DefaultNavbar {...restProps} />;
  return null;
};

export function Navbar({
  user: { firstName, lastName, avatar },
  navbarProps,
  match,
  location,
  intl,
}) {
  const [menuVisible, setMenuVisible] = useState(false);
  const dropdownRef = useRef(null);
  useOutsideClick(dropdownRef, () => setMenuVisible(false), menuVisible);
  return (
    <NavbarStyled>
      {renderNavbar({
        ...navbarProps,
        match,
        location,
        intl,
      })}
      <RightPanel>
        <NotificationsPanel />
        <DropDownContainer onClick={() => !menuVisible && setMenuVisible(true)}>
          <div ref={dropdownRef}>
            {menuVisible && (
              <DropDownContent>
                {navbarElements.map(({ url, messagesKey, icon }, index) => (
                  <StyledRow key={index} onClick={() => setMenuVisible(false)}>
                    <Link to={url}>
                      <Row>
                        <Img mr={13} src={icon} />
                        <StyledComment>
                          <FormattedMessage
                            {...messages[messagesKey]}
                            title={intl.formatMessage(messages[messagesKey])}
                          />
                        </StyledComment>
                      </Row>
                    </Link>
                  </StyledRow>
                ))}
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
            className="user-name-info"
            clickable
            data-private
          >{`${firstName} ${lastName}`}</Box>
        </DropDownContainer>
      </RightPanel>
    </NavbarStyled>
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
