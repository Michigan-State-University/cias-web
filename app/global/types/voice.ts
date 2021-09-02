export interface VoiceDTO {
  google_tts_language_id: number;
  language_code: string;
  voice_label: string;
  voice_type: string;
}

export interface Voice {
  id: string;
  googleTtsLanguageId: number;
  languageCode: string;
  voiceLabel: string;
  voiceType: string;
}
