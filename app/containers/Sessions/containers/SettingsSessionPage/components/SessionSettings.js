import React, { useState } from 'react';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import some from 'lodash/some';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';

import { colors } from 'theme';
import { variableNameValidator } from 'utils/validators';
import lastKey from 'utils/getLastKey';

import { canEdit } from 'models/Status/statusPermissions';
import { getRemovedBlockForSetting } from 'models/Narrator/BlockTypes';

import { editSessionRequest, editSessionSaga } from 'global/reducers/session';
import { questionsReducer } from 'global/reducers/questions';
import {
  fetchInterventionSaga,
  makeSelectInterventionStatus,
  interventionReducer,
} from 'global/reducers/intervention';
import globalMessages from 'global/i18n/globalMessages';

import H3 from 'components/H3';
import { LI, UL } from 'components/List';
import { ConfirmationModal } from 'components/Modal';
import BadgeInput from 'components/Input/BadgeInput';
import Option from './Option';
import messages from './messages';
import PeedyVoiceSettings from './PeedyVoiceSettings';
import { Input, InputContainer } from './styled';

const SessionSettings = ({
  name,
  variable,
  narratorSettings,
  formatMessage,
  editSession,
  interventionStatus,
  googleTtsVoice,
}) => {
  useInjectReducer({ key: 'intervention', reducer: interventionReducer });
  useInjectReducer({ key: 'questions', reducer: questionsReducer });
  useInjectSaga({ key: 'editSession', saga: editSessionSaga });
  useInjectSaga({ key: 'fetchIntervention', saga: fetchInterventionSaga });

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

  const isNarratorActive = some(narratorSettings, (setting) => setting);

  const onToggle = (index) => (val) => {
    if (val) {
      editSession({ path: `settings.narrator.${index}`, value: val }, [
        'settings',
      ]);
    } else {
      setConfirmationOption(index);
    }
  };

  const onGlobalToggle = (val) => {
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
          {getRemovedBlockForSetting(confirmationOption).map((blockType) => (
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
      <ConfirmationModal
        visible={isConfirmationBoxVisible}
        onClose={dismissConfirmation}
        description={getConfirmationDescription()}
        content={getConfirmationContent()}
        confirmAction={onConfirm}
      />

      <InputContainer>
        <H3 mb={5} fontWeight="regular">
          {formatMessage(messages.nameLabel)}
        </H3>
        <Input
          disabled={!editingPossible}
          width="100%"
          placeholder={formatMessage(messages.placeholder)}
          value={name}
          onBlur={(val) => editSession({ path: 'name', value: val }, ['name'])}
        />
      </InputContainer>

      <InputContainer style={{ marginTop: 15 }}>
        <H3 mb={5} fontWeight="regular">
          {formatMessage(messages.variableLabel)}
        </H3>
        <BadgeInput
          disabled={!editingPossible}
          textAlign="center"
          validator={variableNameValidator}
          placeholder={formatMessage(
            globalMessages.variables.variableNamePlaceholder,
          )}
          value={variable}
          color={colors.jungleGreen}
          onBlur={(val) =>
            editSession({ path: 'variable', value: val }, ['variable'])
          }
          autoComplete="off"
        />
      </InputContainer>

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
      {googleTtsVoice && (
        <PeedyVoiceSettings
          googleTtsVoice={googleTtsVoice}
          editSession={editSession}
          formatMessage={formatMessage}
          editingPossible={editingPossible}
        />
      )}
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  interventionStatus: makeSelectInterventionStatus(),
});

const mapDispatchToProps = {
  editSession: editSessionRequest,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

SessionSettings.propTypes = {
  name: PropTypes.string,
  variable: PropTypes.string,
  narratorSettings: PropTypes.shape({
    voice: PropTypes.bool,
    narrator: PropTypes.bool,
  }),
  googleTtsVoice: PropTypes.object,
  formatMessage: PropTypes.func,
  editSession: PropTypes.func,
  interventionStatus: PropTypes.string,
};

export default compose(withConnect)(SessionSettings);
