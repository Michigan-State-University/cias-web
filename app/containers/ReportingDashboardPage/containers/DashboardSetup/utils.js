import { reorder } from 'utils/reorder';

const prepareOrderedList = (list, sourceIndex, destinationIndex) => {
  const newList = reorder(list, sourceIndex, destinationIndex);
  return newList.map((section, index) => ({
    ...section,
    position: index + 1,
  }));
};

export const orderDashboardSections = (result, dashboardSections) => {
  const {
    destination: { index: destinationIndex },
    source: { index: sourceIndex },
  } = result;

  return prepareOrderedList(dashboardSections, sourceIndex, destinationIndex);
};

export const orderCharts = (charts, activeId, overId) => {
  const oldIndex = charts.findIndex(({ id: chartId }) => chartId === activeId);
  const newIndex = charts.findIndex(({ id: chartId }) => chartId === overId);
  return prepareOrderedList(charts, oldIndex, newIndex);
};
