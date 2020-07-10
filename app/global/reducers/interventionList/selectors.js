import { createSelector } from 'reselect';
import { initialState } from './reducer';

const interventionList = state => state.interventionList || initialState;

export const makeSelectInterventionList = () =>
  createSelector(
    interventionList,
    interventionListState => interventionListState,
  );
