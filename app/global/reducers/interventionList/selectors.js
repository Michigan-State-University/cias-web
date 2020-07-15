import { createSelector } from 'reselect';
import { initialState } from './reducer';

const interventionList = state => state.interventionList || initialState;

export const makeSelectInterventionList = () =>
  createSelector(
    interventionList,
    interventionListState => interventionListState,
  );

export const makeSelectInterventions = () =>
  createSelector(
    interventionList,
    interventionListState => interventionListState.interventions,
  );

export const makeSelectInterventionsLoader = () =>
  createSelector(
    interventionList,
    interventionListState => interventionListState.fetchInterventionLoading,
  );
