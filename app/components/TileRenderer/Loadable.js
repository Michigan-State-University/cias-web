/**
 *
 * Asynchronously loads the component for TileRenderer
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
