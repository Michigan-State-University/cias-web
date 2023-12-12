import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useIntl } from 'react-intl';

import { RESOURCES_URL, RoutePath } from 'global/constants';

import ExternalLinkIcon from 'assets/svg/external-link.svg';

import { themeColors } from 'theme';

import { useRoleManager } from 'models/User/RolesManager';

import { CIASLogo, MSULogo } from 'components/Logo';
import Row from 'components/Row';
import { Button } from 'components/Button';
import Icon from 'components/Icon';
import { AnchorNoUnderline } from 'components/AnchorNoUnderline';

import useOutsideClick from 'utils/useOutsideClick';

import { StyledLogos } from './styled';
import { MSULogoContainer } from '../styled';
import { LOGO_MAX_HEIGHT } from '../constants';
import messages from './messages';

const DefaultNavbar = () => {
  const { formatMessage } = useIntl();

  const dropdownRef = useRef(null);
  const [menuVisible, setMenuVisible] = useState(false);
  useOutsideClick(dropdownRef, () => setMenuVisible(false), menuVisible);

  const { canDisplayResources } = useRoleManager();

  return (
    <Row width="100%" justify="between" align="center" gap={16}>
      <StyledLogos>
        <Link to={RoutePath.DASHBOARD}>
          <CIASLogo maxHeight={LOGO_MAX_HEIGHT} width="100%" />
        </Link>
        <MSULogoContainer>
          <MSULogo maxHeight={LOGO_MAX_HEIGHT} width="100%" />
        </MSULogoContainer>
      </StyledLogos>
      {canDisplayResources && (
        <AnchorNoUnderline href={RESOURCES_URL} target="_blank" flexShrink={0}>
          <Button
            light
            px={20}
            width="auto"
            display="flex"
            gap={10}
            align="center"
          >
            <Icon src={ExternalLinkIcon} stroke={themeColors.primary} />
            {formatMessage(messages.resourcesLinkTitle)}
          </Button>
        </AnchorNoUnderline>
      )}
    </Row>
  );
};

export default DefaultNavbar;
