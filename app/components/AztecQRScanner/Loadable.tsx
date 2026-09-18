/**
 * Asynchronously loads the component for AztecQRScanner
 *
 * The scanner pulls in @zxing/library and react-webcam, neither of which is
 * needed unless somebody opens the QR tab, so it is kept out of the main bundle.
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
