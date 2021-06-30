import React, { memo } from 'react';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { Markup } from 'interweave';

import { Col, FullWidthContainer, Row } from 'components/ReactGridSystem';
import Text from 'components/Text';

import messages from '../../../messages';

const DeleteEntityModal = ({ name, type }) => {
  const { formatMessage } = useIntl();

  return (
    <FullWidthContainer>
      <Row align="center">
        <Col>
          <Text textAlign="center">
            <Markup
              content={formatMessage(messages.deleteEntityModalHeader, {
                name,
                type,
              })}
              noWrap
            />
          </Text>
        </Col>
      </Row>
    </FullWidthContainer>
  );
};

DeleteEntityModal.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
};

export default memo(DeleteEntityModal);
