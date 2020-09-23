/**
 *
 * Asynchronously loads the component for UserDetails
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
