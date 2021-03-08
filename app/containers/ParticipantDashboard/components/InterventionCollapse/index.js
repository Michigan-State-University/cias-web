import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Col, Row as GRow } from 'react-grid-system';

import Collapse from 'components/Collapse';
import Row from 'components/Row';
import Text from 'components/Text';
import Column from 'components/Column';

import arrowDown from 'assets/svg/arrow-down-select.svg';
import arrowUp from 'assets/svg/arrow-up-collapse.svg';
import { colors, boxShadows, themeColors } from 'theme';
import Checkbox from 'components/Checkbox';
import { toggleNotificationsRequest } from 'global/reducers/generatedReports';

import messages from './messages';
import { SessionTile } from '../SessionTile';
import { NotificationColumn, SessionDivider, StyledBox } from './styled';

function InterventionCollapse({
  id,
  title,
  sessions,
  itemIndex,
  emailNotifications,
  toggleNotifications,
}) {
  const [openCollapsable, setOpenCollapsable] = useState(itemIndex === 0);
  const toggleCollapsable = () => setOpenCollapsable(!openCollapsable);
  const handleClickNotification = e => {
    e.stopPropagation();
    toggleNotifications(id);
  };
  const sessionsLength = sessions.length;
  if (sessionsLength === 0) return <></>;
  return (
    <Column
      bg={colors.white}
      borderRadius={5}
      width="100%"
      shadow={boxShadows.selago}
      my={15}
    >
      <Collapse
        animatedImg
        disabled
        isOpened={openCollapsable}
        onToggle={toggleCollapsable}
        height="auto"
        px={24}
        onHideImg={arrowDown}
        onShowImg={arrowUp}
        color={colors.white}
        label={
          <GRow
            justify="between"
            align="center"
            height={60}
            style={{ width: '100%' }}
          >
            <Col sm={8}>
              <Text fontSize={18} fontWeight="bold">
                {title}
              </Text>
            </Col>
            <Col sm={4}>
              <Row>
                <NotificationColumn align="end" mr={25}>
                  <Row mb={5} align="center">
                    <Text color={themeColors.secondary} textAlign="right">
                      <FormattedMessage {...messages.notifications} />
                    </Text>
                    <Checkbox
                      onClick={handleClickNotification}
                      ml={5}
                      height={17}
                      checked={emailNotifications}
                    />
                  </Row>
                  <Text>
                    {sessionsLength}{' '}
                    <FormattedMessage
                      {...(sessionsLength > 1
                        ? messages.sessions
                        : messages.session)}
                    />
                  </Text>
                </NotificationColumn>
              </Row>
            </Col>
          </GRow>
        }
      >
        {sessions.map((sessionProps, sessionIndex) => (
          <Column key={`Session-Collapse-${sessionProps.id}`} widh="100%">
            <SessionDivider width={sessionIndex === 0 ? '100%' : '97%'} />
            <StyledBox px={26}>
              <SessionTile {...sessionProps} />
            </StyledBox>
          </Column>
        ))}
      </Collapse>
    </Column>
  );
}

InterventionCollapse.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  sessions: PropTypes.array,
  itemIndex: PropTypes.number,
  emailNotifications: PropTypes.bool,
  toggleNotifications: PropTypes.func,
};

const mapDispatchToProps = {
  toggleNotifications: toggleNotificationsRequest,
};

export default connect(
  null,
  mapDispatchToProps,
)(InterventionCollapse);
