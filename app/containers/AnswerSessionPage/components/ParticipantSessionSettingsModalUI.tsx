import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import isEqual from 'lodash/isEqual';

import CCIcon from 'assets/svg/closed-captions.svg';
import SpeakerIcon from 'assets/svg/speaker.svg';

import { themeColors } from 'theme';

import globalMessages from 'global/i18n/globalMessages';

import { ModalProps } from 'components/Modal';
import Divider from 'components/Divider';
import { Switch } from 'components/Switch';
import Text from 'components/Text';
import Icon from 'components/Icon';
import Row from 'components/Row';
import Button from 'components/Button';

import { ParticipantSessionSettings } from '../types';
import messages from '../messages';
import { setParticipantSessionSettings } from '../actions';

const ParticipantSessionSettingsModalUI: ModalProps<ParticipantSessionSettings>['modalContentRenderer'] =
  // eslint-disable-next-line react/prop-types
  ({ closeModal, modalState }) => {
    const { formatMessage } = useIntl();
    const dispatch = useDispatch();

    const [settings, setSettings] = useState<ParticipantSessionSettings>(
      typeof modalState === 'boolean' || !modalState
        ? {
            showTextTranscript: false,
            showTextReadingControls: false,
          }
        : modalState,
    );

    const save = () => {
      dispatch(setParticipantSessionSettings(settings));
      closeModal();
    };

    return (
      <>
        <Divider mt={6} mb={40} />
        <Switch
          id="participant-session-settings-text-reading-controls"
          checked={settings.showTextReadingControls}
          onToggle={(showTextReadingControls) =>
            setSettings((current) => ({
              ...current,
              showTextReadingControls,
            }))
          }
          labelOffset={24}
          width="auto"
        >
          <Text fontSize={18} lineHeight={1} fontWeight="bold">
            {formatMessage(messages.textReadingControls)}
          </Text>
        </Switch>
        <Text
          fontSize={14}
          lineHeight="24px"
          color={themeColors.text}
          textOpacity={0.7}
          mt={8}
          mb={40}
        >
          {formatMessage(messages.textReadingControlsDescription, {
            icon: (
              <Icon
                src={SpeakerIcon}
                alt={formatMessage(messages.speakerIconAlt)}
                mx={8}
                inline
              />
            ),
          })}
        </Text>
        <Switch
          id="participant-session-settings-cc"
          checked={settings.showTextTranscript}
          onToggle={(showTextTranscript) =>
            setSettings((current) => ({
              ...current,
              showTextTranscript,
            }))
          }
          labelOffset={24}
          width="auto"
        >
          <Text fontSize={18} lineHeight={1} fontWeight="bold">
            {formatMessage(messages.cc, {
              icon: (
                <Icon
                  src={CCIcon}
                  alt={formatMessage(messages.ccIconAlt)}
                  width={20}
                  height={20}
                  inline
                  ml={8}
                />
              ),
            })}
          </Text>
        </Switch>
        <Text
          fontSize={14}
          lineHeight="24px"
          color={themeColors.text}
          textOpacity={0.7}
          mt={8}
          mb={56}
        >
          {formatMessage(messages.ccDescription)}
        </Text>
        <Row gap={8}>
          <Button
            title={formatMessage(globalMessages.save)}
            onClick={save}
            disabled={isEqual(modalState, settings)}
          />
          <Button
            title={formatMessage(globalMessages.cancel)}
            light
            onClick={closeModal}
          />
        </Row>
      </>
    );
  };

export default ParticipantSessionSettingsModalUI;
