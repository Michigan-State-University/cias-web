/**
 *
 * Navbar
 *
 */

import React, { memo, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { Link } from 'react-router-dom';
import { compose } from 'redux';

import UserAvatar from 'components/UserAvatar';
import Box from 'components/Box';
import Row from 'components/Row';
import Img from 'components/Img';

import useOutsideClick from 'utils/useOutsideClick';
import { makeSelectUser } from 'global/reducers/auth';
import InterventionsNavbar from './components/InterventionsNavbar';

import {
  NavbarStyled,
  RightPanel,
  DropDownContainer,
  DropDownContent,
  StyledRow,
  StyledComment,
} from './styled';
import messages from './messages';
import content from './dropdownContent';

import PreviewNavbar from './components/PreviewNavbar';
import DefaultNavbar from './components/DefaultNavbar';

const renderNavbar = navbarProps => {
  const { navbarId, ...restProps } = navbarProps || {};
  if (navbarId === 'interventions')
    return <InterventionsNavbar {...restProps} />;
  if (navbarId === 'preview') return <PreviewNavbar {...restProps} />;
  if (navbarId === 'default') return <DefaultNavbar {...restProps} />;
  return null;
};

export function Navbar({
  user: { firstName, lastName, roles, avatar },
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
        userRole: roles[0],
      })}
      <RightPanel onClick={() => !menuVisible && setMenuVisible(true)}>
        <DropDownContainer>
          <UserAvatar
            mr={10}
            width={30}
            height={30}
            avatar={avatar}
            lastName={lastName}
            firstName={firstName}
          />
          <div ref={dropdownRef}>
            {menuVisible && (
              <DropDownContent>
                {content[roles[0]].map(({ url, messagesKey, icon }, index) => (
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
        </DropDownContainer>
        <Box clickable>{`${firstName} ${lastName}`}</Box>
      </RightPanel>
    </NavbarStyled>
  );
}

Navbar.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
  }),
  navbarProps: PropTypes.shape({
    navbarId: PropTypes.string.isRequired,
    navbarName: PropTypes.node,
  }),
  match: PropTypes.object,
  location: PropTypes.object,
  intl: intlShape,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
});

export default memo(
  compose(
    connect(mapStateToProps),
    injectIntl,
  )(Navbar),
);
