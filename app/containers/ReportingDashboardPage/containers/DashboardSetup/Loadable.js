/**
 *
 * Asynchronously loads the component for DashboardSetup
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
