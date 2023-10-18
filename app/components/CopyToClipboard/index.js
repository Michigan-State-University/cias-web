/**
 *
 * CopyToClipboard
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl, IntlShape } from 'react-intl';
import { CopyToClipboard as ReactCopyToClipboard } from 'react-copy-to-clipboard';

import Row from 'components/Row';
import Icon from 'components/Icon';
import Box from 'components/Box';
import Popup from 'components/Popup';
import Text from 'components/Text';
import { themeColors } from 'theme';

import Button from 'components/Button';
import messages from './messages';

const POPUP_TIMEOUT = 1000;

const CopyToClipboard = ({
  textToCopy,
  intl: { formatMessage },
  children,
  textProps,
  renderAsButton,
  renderAsCustomComponent,
  buttonDisabled,
  disabled,
  icon,
  iconAlt,
  popupVerticalPosition,
  popupHorizontalPosition,
  onClick,
  ...restProps
}) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setCopied(false);
  }, [textToCopy]);

  const onCopy = () => {
    if (onClick) onClick();
    if (buttonDisabled || disabled) return;
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, POPUP_TIMEOUT);
  };

  const renderCopyToClipboard = (content) => (
    <ReactCopyToClipboard text={textToCopy} onCopy={onCopy}>
      {content}
    </ReactCopyToClipboard>
  );

  if (renderAsButton) {
    return renderCopyToClipboard(
      <Button
        disabled={buttonDisabled || copied}
        color="primary"
        width={200}
        ml={10}
      >
        {!copied && <FormattedMessage {...messages.generateLink} />}
        {copied && <FormattedMessage {...messages.linkCopied} />}
      </Button>,
    );
  }

  return (
    <Box clickable disabled={disabled} {...restProps}>
      <Popup
        popupContent={formatMessage(messages.copied)}
        controlled
        visible={copied}
        verticalPosition={popupVerticalPosition}
        horizontalPosition={popupHorizontalPosition}
      >
        {renderCopyToClipboard(
          renderAsCustomComponent ? (
            children
          ) : (
            <Row align="center">
              {icon && (
                <Icon
                  src={icon}
                  alt={iconAlt}
                  mr={10}
                  fill={textProps[disabled ? 'disabledColor' : 'color']}
                />
              )}
              <Text disabled={disabled} {...textProps}>
                {children}
              </Text>
            </Row>
          ),
        )}
      </Popup>
    </Box>
  );
};

CopyToClipboard.propTypes = {
  textToCopy: PropTypes.string,
  intl: PropTypes.shape(IntlShape),
  children: PropTypes.node,
  textProps: PropTypes.object,
  buttonDisabled: PropTypes.bool,
  disabled: PropTypes.bool,
  renderAsButton: PropTypes.bool,
  renderAsCustomComponent: PropTypes.bool,
  icon: PropTypes.string,
  iconAlt: PropTypes.string,
  popupVerticalPosition: PropTypes.oneOf(['top', 'center', 'bottom']),
  popupHorizontalPosition: PropTypes.oneOf(['left', 'center', 'right']),
  onClick: PropTypes.func,
};

CopyToClipboard.defaultProps = {
  textProps: {
    color: themeColors.secondary,
    fontWeight: 'bold',
  },
  popupVerticalPosition: 'top',
  popupHorizontalPosition: 'center',
};

export default injectIntl(CopyToClipboard);
