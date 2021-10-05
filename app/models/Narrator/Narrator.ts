import { NarratorBlockTypes } from './NarratorBlockTypes';

export interface Position {
  x: number;
  y: number;
}

export interface NarratorBlock {
  text?: Nullable<string[]>;
  type: NarratorBlockTypes;
  action?: string;
  sha256?: string[];
  animation: string;
  audio_urls?: string[];
  endPosition: Position;
  pause_duration?: number;
  original_text?: Nullable<string[]>;
}

export interface NarratorSettings {
  voice: boolean;
  animation: boolean;
}

export interface Narrator {
  blocks: NarratorBlock[];
  settings: NarratorSettings;
}
