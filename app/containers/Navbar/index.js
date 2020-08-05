/**
 *
 * Navbar
 *
 */

import React, { memo, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import UserAvatar from 'components/UserAvatar';
import Box from 'components/Box';
import Row from 'components/Row';
import Img from 'components/Img';

import { outsideClickHandler } from 'utils/outsideClickHandler';
import { makeSelectUser } from 'global/reducers/auth';
import LogoNavbar from 'containers/Navbar/components/LogoNavbar';
import InterventionsNavbar from './components/InterventionsNavbar';

import {
  NavbarStyled,
  RightPanel,
  DropDownContainer,
  DropDownContent,
} from './styled';
import messages from './messages';
import content from './dropdownContent';

import PreviewNavbar from './components/PreviewNavbar';
import DefaultNavbar from './components/DefaultNavbar';

const renderNavbar = navbarProps => {
  const { navbarId, ...restProps } = navbarProps || {};
  if (navbarId === 'interventions') return <InterventionsNavbar />;
  if (navbarId === 'preview') return <PreviewNavbar {...restProps} />;
  if (navbarId === 'default') return <DefaultNavbar {...restProps} />;
  if (navbarId === 'logo') return <LogoNavbar {...restProps} />;
  return null;
};

export function Navbar({ user: { firstName, lastName, roles }, navbarProps }) {
  const [menuVisible, setMenuVisible] = useState(false);
  const dropdownRef = useRef(null);
  useEffect(() => {
    if (menuVisible) {
      const cleanUp = outsideClickHandler(dropdownRef, () =>
        setMenuVisible(false),
      );

      return cleanUp;
    }
  }, [menuVisible]);
  return (
    <NavbarStyled>
      {renderNavbar(navbarProps)}
      <RightPanel onClick={() => !menuVisible && setMenuVisible(true)}>
        <DropDownContainer>
          <UserAvatar lastName={lastName} firstName={firstName} />
          {menuVisible && (
            <DropDownContent ref={dropdownRef}>
              {content[roles[0]].map(({ url, messagesKey, icon }, index) => (
                <div key={index} onClick={() => setMenuVisible(false)}>
                  <Link to={url}>
                    <Row>
                      <Img mr={13} src={icon} />
                      <FormattedMessage {...messages[messagesKey]} />
                    </Row>
                  </Link>
                </div>
              ))}
            </DropDownContent>
          )}
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
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
});

export default memo(connect(mapStateToProps)(Navbar));
