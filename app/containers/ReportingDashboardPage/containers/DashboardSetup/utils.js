import { reorder } from 'utils/reorder';

export const orderDashboardSections = (result, dashboardSections) => {
  const {
    destination: { index: destinationIndex },
    source: { index: sourceIndex },
  } = result;

  const newList = reorder(dashboardSections, sourceIndex, destinationIndex);
  return newList.map((section, index) => ({
    ...section,
    position: index + 1,
  }));
};
