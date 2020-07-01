/**
 *
 * Navbar
 *
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import UserAvatar from 'components/UserAvatar';
import Row from 'components/Row';
import Img from 'components/Img';
import { StyledInput } from 'components/Input/StyledInput';
import cross from 'assets/svg/cross.svg';

import { logOut, makeSelectUser } from 'global/reducers/auth';
import { makeSelectIntervention } from 'containers/Interventions/containers/EditInterventionPage/selectors';
import { editInterventionRequest } from 'containers/Interventions/containers/EditInterventionPage/actions';

import {
  NavbarStyled,
  RightPanel,
  DropDownContainer,
  DropDownContent,
  CrossContainer,
} from './styled';
import messages from './messages';

function Navbar({
  user: { firstName, lastName },
  logOut: logOutCall,
  includeInterventionName,
  intervention: { name },
  updateInterventionName,
  intl: { formatMessage },
}) {
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <NavbarStyled>
      {includeInterventionName && (
        <Row align="center" width="100%">
          <CrossContainer onClick={() => {}}>
            <Img src={cross} alt="cross" />
          </CrossContainer>
          <StyledInput
            px={12}
            py={6}
            width="auto"
            value={name}
            fontSize={23}
            autoSize
            maxWidth={1000}
            averageLetterWidth={13}
            placeholder={formatMessage(messages.placeholder)}
            onBlur={val =>
              updateInterventionName({ field: 'name', value: val })
            }
          />
        </Row>
      )}
      <RightPanel>
        <DropDownContainer onClick={() => setMenuVisible(!menuVisible)}>
          <UserAvatar lastName={lastName} firstName={firstName} />
          {menuVisible && (
            <DropDownContent>
              <div onClick={() => {}}>
                <FormattedMessage {...messages.editAccount} />
              </div>
              <div onClick={logOutCall}>
                <FormattedMessage {...messages.logOut} />
              </div>
            </DropDownContent>
          )}
        </DropDownContainer>
        {`${firstName} ${lastName}`}
      </RightPanel>
    </NavbarStyled>
  );
}

Navbar.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
  }),
  intervention: PropTypes.shape({
    name: PropTypes.string,
  }),
  logOut: PropTypes.func,
  includeInterventionName: PropTypes.bool,
  updateInterventionName: PropTypes.func,
  intl: intlShape,
};

const mapStateToProps = createStructuredSelector({
  intervention: makeSelectIntervention(),
  user: makeSelectUser(),
});

const mapDispatchToProps = {
  logOut,
  updateInterventionName: editInterventionRequest,
};

export const NavbarWithIntl = injectIntl(Navbar);

export default memo(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(NavbarWithIntl),
);
