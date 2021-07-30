/**
 *
 * TeamDetails
 *
 */

import React, { memo, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Helmet } from 'react-helmet';
import { FormattedMessage, injectIntl, IntlShape } from 'react-intl';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';

import Spinner from 'components/Spinner';
import { colors, themeColors } from 'theme';
import ErrorAlert from 'components/ErrorAlert';
import {
  fetchSingleTeamRequest,
  TeamListReducer,
  teamListSaga,
  makeSelectTeamList,
  editSingleTeamRequest,
  inviteToTeamRequest,
} from 'global/reducers/teamList';

import { Col, Row } from 'react-grid-system';

import { Roles } from 'models/User/UserRoles';

import H1 from 'components/H1';
import H2 from 'components/H2';
import AppRow from 'components/Row';
import BackButton from 'components/BackButton';
import { StyledButton } from 'components/Button/StyledButton';
import Text from 'components/Text';
import Input from 'components/Input';
import UserList from 'containers/UserList';
import UserSelector from 'containers/UserSelector';
import { makeSelectUser } from 'global/reducers/auth';
import InviteResearcher from 'containers/InviteResearcher';
import TextButton from 'components/Button/TextButton';
import messages from './messages';
import { CardBox, StyledBox } from './styled';

export const TeamDetails = ({
  teamList: {
    singleTeam: team,
    loaders: { singleTeamLoading, singleTeamEditLoading },
    errors: { singleTeamFetchError },
  },
  fetchTeam,
  editTeam,
  inviteToTeam,
  match: {
    params: { id },
  },
  intl: { formatMessage },
  user: { roles },
}) => {
  useInjectReducer({ key: 'teamList', reducer: TeamListReducer });
  useInjectSaga({ key: 'teamList', saga: teamListSaga });

  const isAdmin = useMemo(() => roles.includes(Roles.admin), [roles]);

  const { teamAdmin, name } = team;

  const [teamName, setTeamName] = useState(name ?? '');
  const [selectedUser, setSelectedUser] = useState(teamAdmin);
  const [inviteModalVisible, setInviteModalVisible] = useState(false);

  const openInviteModal = () => setInviteModalVisible(true);
  const closeInviteModal = () => setInviteModalVisible(false);

  useEffect(() => {
    fetchTeam(id);
  }, [id]);

  useEffect(() => {
    if (name) setTeamName(name);
  }, [name]);

  useEffect(() => {
    setSelectedUser(teamAdmin);
  }, [teamAdmin]);

  const handleOnSave = () => {
    editTeam(id, teamName, selectedUser);
  };

  const handleChange = ({ target: { value } }) => {
    setTeamName(value);
  };

  const handleOnSelect = (user) => {
    setSelectedUser(user);
  };

  const handleSendInvite = (email) => {
    inviteToTeam(email, id);
    closeInviteModal();
  };

  const saveButtonDisabled =
    !teamName ||
    !selectedUser ||
    (name === teamName && teamAdmin === selectedUser);

  if (singleTeamLoading) {
    return <Spinner color={themeColors.secondary} />;
  }
  if (singleTeamFetchError) {
    return (
      <AppRow justify="center" mt={50}>
        <ErrorAlert errorText={singleTeamFetchError} />
      </AppRow>
    );
  }

  return (
    <>
      <Helmet>
        <title>{formatMessage(messages.pageTitle)}</title>
      </Helmet>
      {inviteModalVisible && (
        <InviteResearcher
          visible={inviteModalVisible}
          sendInvitation={handleSendInvite}
          deleteError={() => {}}
          onClose={closeInviteModal}
          inviteOnly
        />
      )}
      <StyledBox height="100%" width="100%">
        <BackButton to="/teams">
          <FormattedMessage {...messages.backButton} />
        </BackButton>
        <Row align="center">
          <Col xs="content">
            <H1 my={25}>
              <FormattedMessage {...messages.header} />
            </H1>
          </Col>
          <Col xs="content">
            <TextButton
              buttonProps={{
                color: themeColors.secondary,
                fontWeight: 'bold',
              }}
              onClick={openInviteModal}
            >
              <FormattedMessage {...messages.inviteToTeam} />
            </TextButton>
          </Col>
        </Row>
        <Row>
          <Col>
            <CardBox>
              <H2 mb={20}>
                <FormattedMessage {...messages.editSectionHeader} />
              </H2>
              <Row>
                <Col xs={12} lg={isAdmin ? 6 : 12}>
                  <Text mb={10} fontSize={14} mt={20}>
                    <FormattedMessage {...messages.nameSectionTitle} />
                  </Text>
                  <Input
                    disabled={singleTeamEditLoading}
                    maxWidth="none"
                    width="100%"
                    transparent={false}
                    bg={colors.white}
                    placeholder={formatMessage(messages.teamNameInput)}
                    value={teamName}
                    onChange={handleChange}
                  />
                </Col>
                {isAdmin && (
                  <Col xs={12} lg={6}>
                    <Text fontSize={14} mt={20}>
                      <FormattedMessage {...messages.researcherSectionTitle} />
                    </Text>
                    <UserSelector
                      disabled={singleTeamEditLoading}
                      selectedUserId={selectedUser?.id}
                      onSelect={handleOnSelect}
                      rolesToInclude={[Roles.researcher, Roles.teamAdmin]}
                      additionalUsers={[teamAdmin]}
                    />
                  </Col>
                )}
              </Row>
              <Row>
                <Col>
                  <StyledButton
                    mt={20}
                    width={200}
                    onClick={handleOnSave}
                    fontWeight="bold"
                    fontSize={14}
                    disabled={saveButtonDisabled}
                  >
                    <FormattedMessage {...messages.saveButton} />
                  </StyledButton>
                </Col>
              </Row>
            </CardBox>
          </Col>
        </Row>
        <Row style={{ marginTop: 75 }}>
          <Col>
            <UserList
              teamId={id}
              filterableRoles={[Roles.participant, Roles.researcher]}
              listOnly
            />
          </Col>
        </Row>
      </StyledBox>
    </>
  );
};

TeamDetails.propTypes = {
  teamList: PropTypes.object,
  match: PropTypes.object,
  fetchTeam: PropTypes.func,
  editTeam: PropTypes.func,
  inviteToTeam: PropTypes.func,
  intl: PropTypes.shape(IntlShape),
  user: PropTypes.shape({ roles: PropTypes.arrayOf(PropTypes.string) }),
};

const mapStateToProps = createStructuredSelector({
  teamList: makeSelectTeamList(),
  user: makeSelectUser(),
});

const mapDispatchToProps = {
  fetchTeam: fetchSingleTeamRequest,
  editTeam: editSingleTeamRequest,
  inviteToTeam: inviteToTeamRequest,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo, injectIntl)(TeamDetails);
