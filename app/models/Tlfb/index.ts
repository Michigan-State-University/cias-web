import { EventData } from './Event';
import { SubstanceData, SubstanceBody } from './Substance';

type DayData = {
  events?: EventData[];
  substance?: SubstanceData;
};

export type { DayData, EventData, SubstanceData, SubstanceBody };
