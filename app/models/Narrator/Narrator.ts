import { CamelToSnake } from 'global/types/camelToSnake';

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
  audioUrls?: string[];
  endPosition: Position;
  pauseDuration?: number;
  originalText?: Nullable<string[]>;
}

export interface NarratorSettings {
  voice: boolean;
  animation: boolean;
}

export interface Narrator {
  blocks: NarratorBlock[];
  settings: NarratorSettings;
}

export type NarratorDTO = CamelToSnake<Narrator>;
