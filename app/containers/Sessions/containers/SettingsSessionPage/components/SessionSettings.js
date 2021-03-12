import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import some from 'lodash/some';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import H3 from 'components/H3';
import lastKey from 'utils/getLastKey';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';

import { editSessionRequest, editSessionSaga } from 'global/reducers/session';
import { questionsReducer } from 'global/reducers/questions';
import {
  fetchInterventionSaga,
  makeSelectInterventionStatus,
  interventionReducer,
} from 'global/reducers/intervention';
import globalMessages from 'global/i18n/globalMessages';

import { canEdit } from 'models/Status/statusPermissions';
import { FormattedMessage } from 'react-intl';

import { LI, UL } from 'components/List';
import { getRemovedBlockForSetting } from 'models/Narrator/BlockTypes';
import ConfirmationBox from 'components/ConfirmationBox';
import Option from './Option';
import messages from './messages';
import { Input, NameContainer } from './styled';

const SessionSettings = ({
  name,
  narratorSettings,
  formatMessage,
  editSession,
  interventionStatus,
}) => {
  const [confirmationOption, setConfirmationOption] = useState('');
  const dismissConfirmation = () => setConfirmationOption('');
  const isConfirmationBoxVisible = confirmationOption !== '';
  const isAllSettingsConfirmation = confirmationOption === 'all';

  const onConfirm = () => {
    if (isAllSettingsConfirmation) {
      editSession(
        {
          path: `settings.narrator`,
          value: {
            voice: false,
            animation: false,
          },
        },
        ['settings'],
      );
    } else {
      editSession(
        {
          path: `settings.narrator.${confirmationOption}`,
          value: false,
        },
        ['settings'],
      );
    }
    dismissConfirmation();
  };
  useInjectReducer({ key: 'intervention', reducer: interventionReducer });
  useInjectReducer({ key: 'questions', reducer: questionsReducer });
  useInjectSaga({ key: 'editSession', saga: editSessionSaga });
  useInjectSaga({ key: 'fetchIntervention', saga: fetchInterventionSaga });

  const isNarratorActive = some(narratorSettings, setting => setting);

  const onToggle = index => val => {
    if (val) {
      editSession({ path: `settings.narrator.${index}`, value: val }, [
        'settings',
      ]);
    } else {
      setConfirmationOption(index);
    }
  };

  const onGlobalToggle = val => {
    if (val) {
      editSession(
        {
          path: `settings.narrator`,
          value: {
            voice: val,
            animation: val,
          },
        },
        ['settings'],
      );
    } else {
      setConfirmationOption('all');
    }
  };

  const editingPossible = canEdit(interventionStatus);

  const getConfirmationDescription = () => {
    if (!isConfirmationBoxVisible) return null;
    if (isAllSettingsConfirmation)
      return (
        <FormattedMessage {...messages.globalSettingRemovalConfirmation} />
      );
    return (
      <FormattedMessage
        {...messages.blockRemovalConfirmation}
        values={{
          setting: formatMessage(
            globalMessages.animationSettings[confirmationOption],
          ),
        }}
      />
    );
  };

  const getConfirmationContent = () => {
    if (!isConfirmationBoxVisible) return null;
    return (
      <>
        <FormattedMessage {...messages.blockRemovalConfirmationDescription} />
        <UL>
          {getRemovedBlockForSetting(confirmationOption).map(blockType => (
            <LI key={blockType}>
              <FormattedMessage {...globalMessages.blockTypes[blockType]} />
            </LI>
          ))}
        </UL>
      </>
    );
  };

  return (
    <>
      <ConfirmationBox
        visible={isConfirmationBoxVisible}
        onClose={dismissConfirmation}
        description={getConfirmationDescription()}
        content={getConfirmationContent()}
        confirmAction={onConfirm}
      />
      <NameContainer>
        <H3 mb={5} fontWeight="regular">
          {formatMessage(messages.nameLabel)}
        </H3>
        <Input
          disabled={!editingPossible}
          width="100%"
          placeholder={formatMessage(messages.placeholder)}
          value={name}
          onBlur={val => editSession({ path: 'name', value: val }, ['name'])}
        />
      </NameContainer>
      <H3 mt={30} mb={20}>
        {formatMessage(messages.narratorSettings)}
      </H3>
      {narratorSettings && (
        <Option
          disabled={!editingPossible}
          label={formatMessage(messages.narratorActive)}
          withBorder={isNarratorActive}
          value={isNarratorActive}
          action={onGlobalToggle}
          fontWeight="bold"
        />
      )}
      {isNarratorActive &&
        map(narratorSettings, (option, index) => (
          <Option
            disabled={!editingPossible}
            key={`el-option-${index}`}
            withBorder={index !== lastKey(narratorSettings)}
            label={formatMessage(messages[index])}
            value={option}
            action={onToggle(index)}
          />
        ))}
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  interventionStatus: makeSelectInterventionStatus(),
});

const mapDispatchToProps = {
  editSession: editSessionRequest,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

SessionSettings.propTypes = {
  name: PropTypes.string,
  narratorSettings: PropTypes.shape({
    voice: PropTypes.bool,
    narrator: PropTypes.bool,
  }),
  formatMessage: PropTypes.func,
  editSession: PropTypes.func,
  interventionStatus: PropTypes.string,
};

export default compose(withConnect)(SessionSettings);
