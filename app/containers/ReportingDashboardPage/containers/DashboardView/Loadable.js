/**
 *
 * Asynchronously loads the component for DashboardView
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
