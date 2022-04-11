import PropTypes from 'prop-types';
import React, { memo, useCallback } from 'react';
import { useIntl } from 'react-intl';

import { borders, colors, themeColors } from 'theme';

import BinIcon from 'assets/svg/bin-no-bg.svg';
import EditIcon from 'assets/svg/edit.svg';

import { FullWidthContainer } from 'containers/ReportingDashboardPage/styled';
import { Col, Container, Row } from 'components/ReactGridSystem';
import Box from 'components/Box';
import Icon from 'components/Icon';
import Text from 'components/Text';
import TextButton from 'components/Button/TextButton';
import StyledInput from 'components/Input/StyledInput';
import Comment from 'components/Text/Comment';

import messages from '../../../messages';

const TopPanelComponent = ({
  canDelete,
  header,
  icon,
  isDeleting,
  label,
  name,
  onDelete,
  onEdit,
  placeholder,
}) => {
  const { formatMessage } = useIntl();

  const onBlur = useCallback(
    (newName) => {
      onEdit({ name: newName });
    },
    [onEdit],
  );

  return (
    <FullWidthContainer>
      <Row justify="between" align="center">
        <Col xs={8}>
          <Box
            bg={colors.linkWater}
            borderRadius={borders.borderRadius}
            padding={8}
          >
            <Container>
              <Row align="center">
                <Icon src={icon} fill={colors.black} mr={8} />
                <Text fontWeight="bold">{header}</Text>
              </Row>
            </Container>
          </Box>
        </Col>

        <Col xs={4}>
          <TextButton
            buttonProps={{ width: '100%' }}
            loading={isDeleting}
            disabled={!canDelete}
            onClick={onDelete}
          >
            <Row align="center">
              <Icon src={BinIcon} fill={themeColors.warning} mr={8} />
              <Text fontWeight="bold" color={themeColors.warning}>
                {formatMessage(messages.deleteEntity)}
              </Text>
            </Row>
          </TextButton>
        </Col>
      </Row>

      <Row justify="between" align="center" mt={30}>
        <Col>
          <Row align="center" margin="0 !important">
            <Comment fontWeight="bold">{label}</Comment>
          </Row>
          <Row align="center" ml="-12px !important">
            <StyledInput
              placeholder={placeholder}
              type="singleline"
              value={name}
              onBlur={onBlur}
              fontSize={15}
              mr={8}
            />
            <Icon src={EditIcon} />
          </Row>
        </Col>
      </Row>
    </FullWidthContainer>
  );
};

TopPanelComponent.propTypes = {
  canDelete: PropTypes.bool,
  header: PropTypes.string,
  icon: PropTypes.string,
  isDeleting: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  placeholder: PropTypes.string,
};

TopPanelComponent.defaultProps = {
  canDelete: true,
};

export default memo(TopPanelComponent);
