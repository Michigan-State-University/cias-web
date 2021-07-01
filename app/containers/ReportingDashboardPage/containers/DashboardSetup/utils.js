import { reorder } from 'utils/reorder';

const prepareOrderedList = (list, sourceIndex, destinationIndex) => {
  const newList = reorder(list, sourceIndex, destinationIndex);
  return newList.map((section, index) => ({
    ...section,
    position: index + 1,
  }));
};

export const orderDashboardSections = (list, activeId, overId) => {
  const oldIndex = list.findIndex(({ id: itemId }) => itemId === activeId);
  const newIndex = list.findIndex(({ id: itemId }) => itemId === overId);

  return prepareOrderedList(list, oldIndex, newIndex);
};

export const orderCharts = (charts, activeId, overId) => {
  const oldIndex = charts.findIndex(({ id: chartId }) => chartId === activeId);
  const newIndex = charts.findIndex(({ id: chartId }) => chartId === overId);
  return prepareOrderedList(charts, oldIndex, newIndex);
};
