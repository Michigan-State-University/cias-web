import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import some from 'lodash/some';
import set from 'lodash/set';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';

import { colors, themeColors } from 'theme';

import { variableNameValidator } from 'utils/validators';
import lastKey from 'utils/getLastKey';

import { getRemovedBlockForSetting } from 'models/Narrator/BlockTypes';
import { SessionTypes } from 'models/Session';

import {
  bulkEditSessionRequest,
  editSessionRequest,
  editSessionSaga,
  bulkEditSession,
} from 'global/reducers/session';
import { questionsReducer } from 'global/reducers/questions';
import {
  fetchInterventionSaga,
  makeSelectInterventionStatus,
  interventionReducer,
  makeSelectEditingPossible,
} from 'global/reducers/intervention';
import globalMessages from 'global/i18n/globalMessages';
import blockTypesMessages from 'global/i18n/blockTypesMessages';
import narratorSettingsMessages from 'global/i18n/narratorSettingsMessages';

import H3 from 'components/H3';
import { LI, UL } from 'components/List';
import { ConfirmationModal } from 'components/Modal';
import BadgeInput from 'components/Input/BadgeInput';
import CharacterSelector from 'components/CharacterSelector';
import { GlobalReplacementModal } from 'components/MissingAnimationsModal';
import { Row as GridRow } from 'components/ReactGridSystem';
import Column from 'components/Column';
import Row from 'components/Row';
import { TextButton } from 'components/Button';

import Option from './Option';
import messages from './messages';
import PeedyVoiceSettings from './PeedyVoiceSettings';
import { Input, InputContainer } from './styled';
import { SessionSettingsForm } from './SessionSettingsForm';
import { getRandomString } from './utils';

import { SessionSettingsColumn, SessionSettingsContainer } from '../styled';

const SessionSettings = ({
  name,
  variable,
  narratorSettings,
  formatMessage,
  editSessionSettings,
  googleTtsVoice,
  currentNarrator,
  editSession,
  multipleFill,
  autofinishEnabled,
  autofinishDelay,
  autocloseEnabled,
  autocloseAt,
  editingPossible,
  type,
  smsCodesAttributes,
  welcomeMessage,
  defaultResponse,
}) => {
  useInjectReducer({ key: 'intervention', reducer: interventionReducer });
  useInjectReducer({ key: 'questions', reducer: questionsReducer });
  useInjectSaga({ key: 'editSession', saga: editSessionSaga });
  useInjectSaga({ key: 'fetchIntervention', saga: fetchInterventionSaga });
  useInjectSaga({ saga: bulkEditSession, key: 'bulkEditSession' });

  const [confirmationOption, setConfirmationOption] = useState('');
  const [newNarrator, setNewNarrator] = useState(null);
  const dismissConfirmation = () => setConfirmationOption('');
  const isConfirmationBoxVisible = confirmationOption !== '';
  const isAllSettingsConfirmation = confirmationOption === 'all';

  const onConfirm = () => {
    if (isAllSettingsConfirmation) {
      editSessionSettings(
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
      editSessionSettings(
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
      editSessionSettings({ path: `settings.narrator.${index}`, value: val }, [
        'settings',
      ]);
    } else {
      setConfirmationOption(index);
    }
  };

  const onGlobalToggle = (val) => {
    if (val) {
      editSessionSettings(
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

  const onNarratorChange = (replacementAnimations) => {
    editSession({ currentNarrator: newNarrator }, { replacementAnimations });
    setNewNarrator(null);
  };

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
          setting: formatMessage(narratorSettingsMessages[confirmationOption]),
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
            <LI key={blockType} inside>
              <FormattedMessage {...blockTypesMessages[blockType]} />
            </LI>
          ))}
        </UL>
      </>
    );
  };

  const updateSmsCode = (val, index) => {
    const updatedAttributes = set(smsCodesAttributes, `${index}.smsCode`, val);
    editSession({
      smsCodesAttributes: updatedAttributes,
    });
  };

  const shouldTriggerModal = (selectedNarrator) => {
    if (currentNarrator === 'peedy' && selectedNarrator !== null) return true;
    if (
      (currentNarrator === 'emmi' || currentNarrator === 'crystal') &&
      selectedNarrator === 'peedy'
    ) {
      return true;
    }
    if (selectedNarrator === null || currentNarrator === undefined)
      return false;
    return false;
  };

  useEffect(() => {
    if (!shouldTriggerModal(newNarrator) && newNarrator !== null) {
      onNarratorChange({
        HeadAnimation: {},
        BodyAnimation: {},
        SpeechAnimation: {},
      });
    }
  }, [newNarrator]);

  return (
    <>
      <ConfirmationModal
        visible={isConfirmationBoxVisible}
        onClose={dismissConfirmation}
        description={getConfirmationDescription()}
        content={getConfirmationContent()}
        confirmAction={onConfirm}
      />

      <GlobalReplacementModal
        sourceNarrator={currentNarrator}
        destinationNarrator={newNarrator}
        visible={shouldTriggerModal(newNarrator)}
        onClose={() => setNewNarrator(null)}
        onChangeNarrator={onNarratorChange}
      />

      <SessionSettingsContainer fluid>
        <GridRow>
          <SessionSettingsColumn
            xs={12}
            md={type === SessionTypes.SMS_SESSION ? 12 : 6}
          >
            <Column>
              <InputContainer>
                <H3 mb={5} fontWeight="regular">
                  {formatMessage(messages.nameLabel)}
                </H3>
                <Input
                  disabled={!editingPossible}
                  width="100%"
                  placeholder={formatMessage(messages.placeholder)}
                  value={name}
                  onBlur={(val) => editSession({ name: val })}
                  px={12}
                />
              </InputContainer>

              {type === SessionTypes.SMS_SESSION && (
                <>
                  <InputContainer mt={15}>
                    {smsCodesAttributes.map(
                      (
                        { smsCode, id, clinic: { name: clinicName } },
                        index,
                      ) => {
                        const properMessage = clinicName
                          ? messages.smsCodeForClinic
                          : messages.smsCode;
                        return (
                          <div key={id}>
                            <Row justify="between" align="center">
                              <Row justify="between" align="center">
                                <H3 fontWeight="regular">
                                  {formatMessage(properMessage, { clinicName })}
                                </H3>
                              </Row>
                              <TextButton
                                fontWeight="bold"
                                hoverDecoration="underline"
                                clickable
                                disabled={!editingPossible}
                                buttonProps={{
                                  color: themeColors.secondary,
                                }}
                                onClick={() =>
                                  updateSmsCode(getRandomString(7), index)
                                }
                              >
                                {formatMessage(messages.smsCodeRandomize)}
                              </TextButton>
                            </Row>
                            <Row>
                              <Input
                                disabled={!editingPossible}
                                width="100%"
                                placeholder={formatMessage(messages.smsCode)}
                                value={smsCode}
                                onBlur={(val) => updateSmsCode(val, index)}
                                px={12}
                              />
                            </Row>
                          </div>
                        );
                      },
                    )}
                  </InputContainer>
                  <InputContainer mt={15}>
                    <H3 mb={5} fontWeight="regular">
                      {formatMessage(messages.welcomeMessageLabel)}
                    </H3>
                    <Input
                      disabled={!editingPossible}
                      width="100%"
                      value={welcomeMessage}
                      onBlur={(val) => editSession({ welcomeMessage: val })}
                      px={12}
                    />
                  </InputContainer>
                  <InputContainer mt={15}>
                    <H3 mb={5} fontWeight="regular">
                      {formatMessage(messages.defaultResponseLabel)}
                    </H3>
                    <Input
                      disabled={!editingPossible}
                      width="100%"
                      value={defaultResponse}
                      onBlur={(val) => editSession({ defaultResponse: val })}
                      px={12}
                    />
                  </InputContainer>
                </>
              )}

              <InputContainer my={15}>
                <H3 mb={5} fontWeight="regular">
                  {formatMessage(messages.variableLabel)}
                </H3>
                <BadgeInput
                  disabled={!editingPossible}
                  textAlign="center"
                  validator={variableNameValidator}
                  placeholder={formatMessage(
                    globalMessages.variableNamePlaceholder,
                  )}
                  value={variable}
                  color={colors.jungleGreen}
                  onBlur={(val) => editSession({ variable: val })}
                  autoComplete="off"
                />
              </InputContainer>

              {type !== SessionTypes.SMS_SESSION && (
                <Option
                  disabled={!editingPossible}
                  label={formatMessage(messages.multipleFill)}
                  tooltipText={formatMessage(messages.multipleFillTooltip)}
                  value={multipleFill}
                  action={(val) => editSession({ multipleFill: val })}
                />
              )}
              <SessionSettingsForm
                disabled={!editingPossible}
                autofinishEnabled={autofinishEnabled}
                autofinishDelay={autofinishDelay}
                autocloseEnabled={autocloseEnabled}
                autocloseAt={autocloseAt}
                onSubmit={editSession}
                type={type}
              />
            </Column>
          </SessionSettingsColumn>

          {type !== SessionTypes.SMS_SESSION && (
            <SessionSettingsColumn xs={12} md={6}>
              <Column>
                <H3 mb={20}>{formatMessage(messages.narratorSettings)}</H3>

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
                    editSession={editSessionSettings}
                    formatMessage={formatMessage}
                    editingPossible={editingPossible}
                  />
                )}

                <H3 mt={30} mb={20}>
                  {formatMessage(messages.defaultNarrator)}
                </H3>
                <Row>
                  <CharacterSelector
                    disabled={!editingPossible}
                    onChange={setNewNarrator}
                    value={currentNarrator}
                  />
                </Row>
              </Column>
            </SessionSettingsColumn>
          )}
        </GridRow>
      </SessionSettingsContainer>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  interventionStatus: makeSelectInterventionStatus(),
  editingPossible: makeSelectEditingPossible(),
});

const mapDispatchToProps = {
  editSessionSettings: editSessionRequest,
  editSession: bulkEditSessionRequest,
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
  editSessionSettings: PropTypes.func,
  interventionStatus: PropTypes.string,
  currentNarrator: PropTypes.string,
  editSession: PropTypes.func,
  multipleFill: PropTypes.bool,
  autofinishEnabled: PropTypes.bool,
  autofinishDelay: PropTypes.number,
  autocloseEnabled: PropTypes.bool,
  autocloseAt: PropTypes.string,
  editingPossible: PropTypes.bool,
  type: PropTypes.string,
  smsCodesAttributes: PropTypes.array,
  welcomeMessage: PropTypes.string,
  defaultResponse: PropTypes.string,
};

export default compose(withConnect)(SessionSettings);
