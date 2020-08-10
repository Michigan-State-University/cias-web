/**
 *
 * CopyToClipboard
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { CopyToClipboard as ReactCopyToClipboard } from 'react-copy-to-clipboard';

import Row from 'components/Row';
import Icon from 'components/Icon';
import Box from 'components/Box';
import Popup from 'components/Popup';
import share from 'assets/svg/share.svg';
import Text from 'components/Text';
import { themeColors } from 'theme';

import messages from './messages';

const POPUP_TIMEOUT = 1000;

const CopyToClipboard = ({
  textToCopy,
  intl: { formatMessage },
  children,
  textProps,
  ...restProps
}) => {
  const [copied, setCopied] = useState(false);

  const onCopy = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, POPUP_TIMEOUT);
  };
  return (
    <Box clickable {...restProps}>
      <Popup
        popupContent={formatMessage(messages.copied)}
        controlled
        visible={copied}
        top
        center
      >
        <ReactCopyToClipboard text={textToCopy} onCopy={onCopy}>
          <Row align="center">
            <Icon
              src={share}
              ml={8}
              mr={10}
              alt="share"
              fill={textProps.color}
            />
            <Text {...textProps}>{children}</Text>
          </Row>
        </ReactCopyToClipboard>
      </Popup>
    </Box>
  );
};

CopyToClipboard.propTypes = {
  textToCopy: PropTypes.string,
  intl: intlShape,
  children: PropTypes.node,
  textProps: PropTypes.object,
};

CopyToClipboard.defaultProps = {
  textProps: {
    color: themeColors.secondary,
    fontWeight: 'bold',
  },
};

export default injectIntl(CopyToClipboard);
