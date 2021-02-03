/**
 *
 * TeamDetails
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Helmet } from 'react-helmet';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
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
} from 'global/reducers/teamList';

import { Col, Row } from 'react-grid-system';

import { Roles } from 'models/User/UserRoles';

import H1 from 'components/H1';
import H2 from 'components/H2';
import BackButton from 'components/BackButton';
import { StyledButton } from 'components/Button/StyledButton';
import Text from 'components/Text';
import Input from 'components/Input';
import UserList from 'containers/UserList';
import UserSelector from 'containers/UserSelector';
import messages from './messages';
import { CardBox, StyledBox } from './styled';

export const TeamDetails = ({
  teamList: {
    singleTeam: team,
    loaders: { singleTeamLoading },
    errors: { singleTeamFetchError },
  },
  fetchTeam,
  editTeam,
  match: {
    params: { id },
  },
  intl: { formatMessage },
}) => {
  useInjectReducer({ key: 'teamList', reducer: TeamListReducer });
  useInjectSaga({ key: 'teamList', saga: teamListSaga });

  const { teamAdmin, name } = team;

  const [teamName, setTeamName] = useState(name ?? '');
  const [selectedUser, setSelectedUser] = useState(teamAdmin);

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

  const handleOnSelect = user => {
    setSelectedUser(user);
  };

  const saveButtonDisabled =
    !teamName ||
    !selectedUser ||
    (name === teamName && teamAdmin === selectedUser);

  if (singleTeamLoading) {
    return <Spinner color={themeColors.secondary} />;
  }
  if (singleTeamFetchError) {
    return <ErrorAlert errorText={singleTeamFetchError} />;
  }

  return (
    <>
      <Helmet>
        <title>{formatMessage(messages.pageTitle)}</title>
      </Helmet>
      <StyledBox height="100%" width="100%">
        <BackButton to="/teams">
          <FormattedMessage {...messages.backButton} />
        </BackButton>
        <H1 my={25}>
          <FormattedMessage {...messages.header} />
        </H1>
        <Row>
          <Col>
            <CardBox>
              <H2 mb={20}>
                <FormattedMessage {...messages.editSectionHeader} />
              </H2>
              <Row>
                <Col xs={6}>
                  <Text mb={10} fontSize={14}>
                    <FormattedMessage {...messages.nameSectionTitle} />
                  </Text>
                  <Input
                    maxWidth="none"
                    width="100%"
                    transparent={false}
                    bg={colors.white}
                    placeholder={formatMessage(messages.teamNameInput)}
                    value={teamName}
                    onChange={handleChange}
                  />
                </Col>
                <Col xs={6}>
                  <Text fontSize={14}>
                    <FormattedMessage {...messages.researcherSectionTitle} />
                  </Text>
                  <UserSelector
                    selectedUserId={selectedUser?.id}
                    onSelect={handleOnSelect}
                    rolesToInclude={[Roles.researcher]}
                    additionalUsers={[teamAdmin]}
                  />
                </Col>
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
            <UserList teamId={id} listOnly />
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
  intl: intlShape,
};

const mapStateToProps = createStructuredSelector({
  teamList: makeSelectTeamList(),
});

const mapDispatchToProps = {
  fetchTeam: fetchSingleTeamRequest,
  editTeam: editSingleTeamRequest,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
  injectIntl,
)(TeamDetails);
