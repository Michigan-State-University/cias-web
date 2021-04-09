import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl, IntlShape } from 'react-intl';
import { compose } from 'redux';
import { connect } from 'react-redux';

import Button from 'components/Button';
import Column from 'components/Column';
import Modal from 'components/Modal';
import Text from 'components/Text';
import Input from 'components/Input';
import UserSelector from 'containers/UserSelector';

import { Roles } from 'models/User/UserRoles';
import { createTeamRequest } from 'global/reducers/teamList';
import { createStructuredSelector } from 'reselect';

import { colors } from 'theme';
import { makeSelectTeamListLoaders } from 'global/reducers/teamList/selectors';
import messages from '../messages';

const CreateTeam = ({
  visible,
  onClose,
  intl: { formatMessage },
  createTeam,
  loaders: { teamCreateLoading },
}) => {
  const [teamName, setTeamName] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);

  const handleChange = ({ target: { value } }) => {
    setTeamName(value);
  };

  const onSelectUser = user => {
    setSelectedUser(user?.id);
  };

  const handleClose = () => {
    onClose();
  };

  const onCreateClick = () => {
    createTeam(teamName, selectedUser);
    handleClose();
    setTeamName('');
    setSelectedUser(null);
  };

  const createButtonDisabled = !(teamName && selectedUser);

  return (
    <Modal
      visible={visible}
      onClose={handleClose}
      title={formatMessage(messages.modalTitle)}
      minWidth={450}
    >
      <Column>
        <Column width="100%" mb={35}>
          <Text mb={10} fontSize={14}>
            <FormattedMessage {...messages.nameSectionTitle} />
          </Text>
          <Input
            maxWidth="none"
            width="100%"
            transparent={false}
            bg={colors.white}
            placeholder={formatMessage(messages.createTeamNameInput)}
            value={teamName}
            onChange={handleChange}
          />
        </Column>
        <Text mb={10} fontSize={14}>
          <FormattedMessage {...messages.researcherSectionTitle} />
        </Text>
        <UserSelector
          selectedUserId={selectedUser}
          onSelect={onSelectUser}
          rolesToInclude={[Roles.researcher, Roles.teamAdmin]}
        />
        <Button
          width={260}
          alignSelf="center"
          mt={45}
          mb={5}
          loading={teamCreateLoading}
          onClick={onCreateClick}
          disabled={createButtonDisabled}
        >
          <FormattedMessage {...messages.createTeamButtonText} />
        </Button>
      </Column>
    </Modal>
  );
};

CreateTeam.propTypes = {
  intl: PropTypes.shape(IntlShape),
  visible: PropTypes.bool,
  onClose: PropTypes.func,
  onInputChange: PropTypes.func,
  createTeam: PropTypes.func,
  loaders: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  loaders: makeSelectTeamListLoaders(),
});

const mapDispatchToProps = {
  createTeam: createTeamRequest,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  injectIntl,
)(CreateTeam);
