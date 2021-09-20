import { ApiData } from 'global/types/api';
import { Voice, VoiceDTO } from 'global/types/voice';
import { jsonApiToArray } from 'utils/jsonApiMapper';

type VoiceComparator = (voiceA: Voice, voiceB: Voice) => number;

const parseAndSort = (data: ApiData<VoiceDTO>, comparator: VoiceComparator) => {
  const parsedVoices = jsonApiToArray(data, 'voice') as Voice[];
  return parsedVoices.sort(comparator);
};

export const voiceDataParser = (data: ApiData<VoiceDTO>): Voice[] =>
  parseAndSort(data, (voiceA, voiceB) => {
    if (voiceA.voiceLabel > voiceB.voiceLabel) return 1;
    if (voiceA.voiceLabel < voiceB.voiceLabel) return -1;
    return voiceA.languageCode >= voiceB.languageCode ? 1 : -1;
  });

export const catMhVoiceDataParser = (data: ApiData<VoiceDTO>): Voice[] =>
  parseAndSort(data, (voiceA, voiceB) => {
    if (voiceA.languageCode > voiceB.languageCode) return 1;
    if (voiceA.languageCode < voiceB.languageCode) return -1;
    return voiceA.voiceLabel >= voiceB.voiceLabel ? 1 : -1;
  });
