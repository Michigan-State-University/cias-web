import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { useIntl } from 'react-intl';

import speaker from 'assets/svg/speaker.svg';
import { makeSelectAudioInstance } from 'global/reducers/globalState';
import {
  makeSelectUserSession,
  makeSelectIsAnimationOngoing,
} from 'containers/AnswerSessionPage/selectors';
import {
  makeSelectAudioPreviewState,
  phoneticPreviewRequest,
  AudioPreviewReducer,
  allAudioPreviewSagas,
  resetPhoneticPreview,
} from 'global/reducers/audioPreview';

import { ImageButton } from 'components/Button';

import messages from './messages';

type Props = {
  text: string;
  previewKey: string;
};

const AudioTextPreview = ({ text, previewKey }: Props) => {
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
  const { formatMessage } = useIntl();
  const isCurrentPreview = previewKey === statePreviewKey;

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
    if (isCurrentPreview && phoneticUrl !== null) {
      audioInstance.onEnded(onFinish);
      audioInstance.onError(onFinish);
      audioInstance.onLoaded(onSpeechReady);
      audioInstance.setSrc(phoneticUrl);
    }
  }, [phoneticUrl, isCurrentPreview]);

  const onAudioRequest = () => {
    dispatch(
      phoneticPreviewRequest(
        text,
        { user_session_id: userSession.id },
        previewKey,
      ),
    );
  };
  return (
    <ImageButton
      src={speaker}
      onClick={onAudioRequest}
      title={formatMessage(messages.readText)}
      loading={phoneticLoading && isCurrentPreview}
      disabled={isAnimationOngoing || statePreviewKey !== null}
    />
  );
};

export default AudioTextPreview;
