import PF from 'pathfinding';
import { Options } from './types';

export const DEFAULT_OPTIONS: Options = {
  matrixScale: 1,
  finder: new PF.BestFirstFinder(),
};
