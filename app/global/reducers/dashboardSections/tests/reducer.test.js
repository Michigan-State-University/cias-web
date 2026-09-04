import cloneDeep from 'lodash/cloneDeep';

import { dashboardSectionsReducer, initialState } from '../reducer';
import { editChartSuccess } from '../actions';

describe('dashboardSections reducer', () => {
  const chart = {
    id: 'chart-1',
    dashboardSectionId: 'section-1',
    name: 'PHQ-9',
    formula: {
      payload: 'S1.a+S1.b+S1.c',
      patterns: [],
      minAnsweredVariables: 0,
      positiveDespiteMissingData: false,
    },
    formulaVariableCount: 3,
    // client-only, never part of an API response
    chartData: { labels: [] },
  };

  const sections = [
    { id: 'section-1', name: 'Section', charts: [chart] },
    { id: 'section-2', name: 'Other section', charts: [] },
  ];

  const stateWithSections = {
    ...initialState,
    dashboardSections: cloneDeep(sections),
    cache: { ...initialState.cache, dashboardSections: cloneDeep(sections) },
  };

  const updatedChart = {
    id: 'chart-1',
    dashboardSectionId: 'section-1',
    name: 'PHQ-9',
    formula: {
      payload: 'S1.a+S1.b',
      patterns: [],
      minAnsweredVariables: 3,
      positiveDespiteMissingData: true,
    },
    formulaVariableCount: 2,
  };

  describe('EDIT_CHART_SUCCESS', () => {
    const nextState = dashboardSectionsReducer(
      stateWithSections,
      editChartSuccess(updatedChart),
    );

    const visibleChart = nextState.dashboardSections[0].charts[0];
    const cachedChart = nextState.cache.dashboardSections[0].charts[0];

    it('applies the response chart to the visible dashboardSections tree', () => {
      expect(visibleChart.formulaVariableCount).toBe(2);
      expect(visibleChart.formula.minAnsweredVariables).toBe(3);
      expect(visibleChart.formula.positiveDespiteMissingData).toBe(true);
    });

    it('still applies the response chart to the cache', () => {
      expect(cachedChart.formulaVariableCount).toBe(2);
      expect(cachedChart.formula.minAnsweredVariables).toBe(3);
      expect(cachedChart.formula.positiveDespiteMissingData).toBe(true);
    });

    it('keeps client-only keys through the merge', () => {
      expect(visibleChart.chartData).toEqual({ labels: [] });
    });

    it('leaves other sections untouched', () => {
      expect(nextState.dashboardSections[1]).toEqual(sections[1]);
    });

    it('clears the loader and the error', () => {
      expect(nextState.loaders.editChartLoader).toBe(false);
      expect(nextState.errors.editChartError).toBeNull();
    });
  });
});
