import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { useIntl } from 'react-intl';

import speaker from 'assets/svg/speaker.svg';

import { themeColors } from 'theme';

import { makeSelectAudioInstance } from 'global/reducers/globalState';
import {
  makeSelectAudioPreviewState,
  phoneticPreviewRequest,
  AudioPreviewReducer,
  allAudioPreviewSagas,
  resetPhoneticPreview,
} from 'global/reducers/audioPreview';

import {
  makeSelectUserSession,
  makeSelectIsAnimationOngoing,
  makeSelectShowTextReadingControls,
} from 'containers/AnswerSessionPage/selectors';

import { ImageButton } from 'components/Button';
import Box from 'components/Box';

import messages from './messages';

type Props = {
  text: string;
  previewKey: string;
  iconSize?: number;
};

const AudioTextPreview = ({ text, previewKey, iconSize = 18 }: Props) => {
  useInjectReducer({ key: 'audioPreview', reducer: AudioPreviewReducer });
  useInjectSaga({ key: 'audioPreview', saga: allAudioPreviewSagas });
  const dispatch = useDispatch();
  const {
    phoneticUrl,
    phoneticLoading,
    previewKey: statePreviewKey,
  } = useSelector(makeSelectAudioPreviewState());
  const userSession = useSelector(makeSelectUserSession());
  const audioInstance = useSelector(makeSelectAudioInstance());
  const isAnimationOngoing = useSelector(makeSelectIsAnimationOngoing());
  const showTextReadingControls = useSelector(
    makeSelectShowTextReadingControls(),
  );
  const { formatMessage } = useIntl();

  const isPlaying = !!statePreviewKey;
  const isPlayingThisText = isPlaying && previewKey === statePreviewKey;

  const onSpeechReady = () => audioInstance.start();
  const onFinish = () => {
    audioInstance.clean();
    audioInstance.stop();
    dispatch(resetPhoneticPreview());
  };

  useEffect(() => {
    dispatch(resetPhoneticPreview());
  }, []);

  useEffect(() => {
    if (isPlayingThisText && phoneticUrl !== null) {
      audioInstance.onEnded(onFinish);
      audioInstance.onError(onFinish);
      audioInstance.onLoaded(onSpeechReady);
      audioInstance.setSrc(phoneticUrl);
    }
  }, [phoneticUrl, isPlayingThisText]);

  const onAudioRequest = () => {
    dispatch(
      phoneticPreviewRequest(
        text,
        { user_session_id: userSession.id },
        previewKey,
      ),
    );
  };

  if (!showTextReadingControls) {
    return null;
  }

  if (isAnimationOngoing || (isPlaying && !isPlayingThisText)) {
    return <Box width={iconSize} height={iconSize} flexShrink={0} />;
  }

  return (
    <ImageButton
      src={speaker}
      onClick={onAudioRequest}
      title={formatMessage(messages.readText)}
      loading={phoneticLoading && isPlayingThisText}
      fill={isPlayingThisText ? themeColors.text : undefined}
      padding={0}
      spinnerProps={{ size: iconSize }}
      iconProps={{ width: iconSize, height: iconSize }}
    />
  );
};

export default AudioTextPreview;
