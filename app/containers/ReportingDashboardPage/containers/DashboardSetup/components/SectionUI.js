import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';

import { Col, Row } from 'components/ReactGridSystem';
import LabelledInput from 'components/Input/LabelledInput';
import StyledInput from 'components/Input/StyledInput';
import Divider from 'components/Divider';

import Text from 'components/Text';
import { FullWidthContainer } from '../../../styled';
import messages from '../messages';

const SectionUI = ({
  description,
  name,
  onDescriptionChange,
  onNameChange,
  showDivider,
  fromDashboardView,
  draggableHandler,
}) => {
  const { formatMessage } = useIntl();

  return (
    <FullWidthContainer>
      {showDivider && (
        <Row mb={10}>
          <Col>
            <Divider />
          </Col>
        </Row>
      )}

      <Row>
        <Col>
          {!fromDashboardView && (
            <Row>
              <LabelledInput
                placeholder={formatMessage(
                  messages.inputSectionNamePlaceholder,
                )}
                onBlur={onNameChange}
                value={name}
              />
              {draggableHandler}
            </Row>
          )}
          {fromDashboardView && (
            <Text mb={30} fontSize={15} fontWeight="bold">
              {name}
            </Text>
          )}
        </Col>
      </Row>

      <Row mb={15}>
        <Col>
          {!fromDashboardView && (
            <StyledInput
              ml={-12}
              maxWidth={300}
              type="multiline"
              placeholder={formatMessage(
                messages.inputSectionDescriptionPlaceholder,
              )}
              onBlur={onDescriptionChange}
              value={description ?? ''}
            />
          )}
          {fromDashboardView && <Text> {description}</Text>}
        </Col>
      </Row>
    </FullWidthContainer>
  );
};

SectionUI.propTypes = {
  description: PropTypes.string,
  name: PropTypes.string,
  onDescriptionChange: PropTypes.func,
  onNameChange: PropTypes.func,
  showDivider: PropTypes.bool,
  fromDashboardView: PropTypes.bool,
  draggableHandler: PropTypes.node,
};

export default memo(SectionUI);
