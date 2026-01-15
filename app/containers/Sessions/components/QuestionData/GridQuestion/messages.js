import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Grid';

export default defineMessages({
  addColumn: {
    id: `${scope}.addColumn`,
    defaultMessage: 'Add new column',
  },
  addRow: {
    id: `${scope}.addRow`,
    defaultMessage: 'Add new row',
  },
  rowPlaceholder: {
    id: `${scope}.rowPlaceholder`,
    defaultMessage: 'Row {index}...',
  },
  columnPlaceholder: {
    id: `${scope}.columnPlaceholder`,
    defaultMessage: 'Column {index}...',
  },
  reorderIconAlt: {
    id: `${scope}.reorderIconAlt`,
    defaultMessage: 'Reorder icon {index}',
  },
  deleteColumn: {
    id: `${scope}.deleteColumn`,
    defaultMessage: 'Delete column {index}',
  },
  deleteRow: {
    id: `${scope}.deleteRow`,
    defaultMessage: 'Delete row {index}',
  },
});
