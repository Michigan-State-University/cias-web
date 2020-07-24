import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import Column from 'components/Column';
import Row from 'components/Row';
import Img from 'components/Img';
import H2 from 'components/H2';
import Popup from 'components/Popup';
import share from 'assets/svg/share.svg';
import copy from 'assets/svg/copy.svg';
import { borders, themeColors } from 'theme';

import messages from './messages';
import { HiddenInput } from './styled';

const POPUP_TIMEOUT = 1000;

const GetLink = ({ formatMessage, slug, disabled }) => {
  const [copied, setCopied] = useState(false);

  const onCopy = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, POPUP_TIMEOUT);
  };

  const opacity = disabled ? 0.5 : 1;
  const border = `${borders.borderWidth} ${borders.borderStyle} ${
    themeColors.highlight
  }`;

  const link = `${process.env.WEB_URL}/interventions/${slug}/fill`;
  return (
    <Column>
      <Row>
        <Img src={share} mr={8} opacity={opacity} />
        <H2 opacity={opacity}>
          <FormattedMessage {...messages.getLink} />
        </H2>
      </Row>
      <Row />
      <Row>
        <Row
          border={border}
          padding={12}
          borderRadius={5}
          width="100%"
          justify="between"
          mt={20}
        >
          <HiddenInput
            value={link}
            disabled={disabled}
            opacity={opacity}
            spellCheck={false}
            readOnly
          />
          <Popup
            popupContent={formatMessage(messages.copied)}
            controlled
            visible={copied}
            top
          >
            <CopyToClipboard text={link} onCopy={onCopy}>
              <Img
                src={copy}
                ml={8}
                cursor={disabled ? 'not-allowed' : 'pointer'}
                opacity={opacity}
                pointerEvents={disabled ? 'none' : 'auto'}
              />
            </CopyToClipboard>
          </Popup>
        </Row>
      </Row>
    </Column>
  );
};

GetLink.propTypes = {
  formatMessage: PropTypes.func,
  slug: PropTypes.string,
  disabled: PropTypes.bool,
};

export default GetLink;
