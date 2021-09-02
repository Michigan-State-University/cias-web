import { ApiData } from 'global/types/api';
import { Voice, VoiceDTO } from 'global/types/voice';
import { jsonApiToArray } from 'utils/jsonApiMapper';

export const voiceDataParser = (data: ApiData<VoiceDTO>): Voice[] => {
  const parsedVoices = jsonApiToArray(data, 'voice') as Voice[];
  return parsedVoices.sort((voiceA, voiceB) => {
    if (voiceA.voiceLabel > voiceB.voiceLabel) return 1;
    if (voiceA.voiceLabel < voiceB.voiceLabel) return -1;
    return voiceA.languageCode >= voiceB.languageCode ? 1 : -1;
  });
};
