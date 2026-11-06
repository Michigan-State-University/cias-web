import { createBrowserHistory } from 'history';

import { captureTestLinkTokenFromUrl } from 'utils/testLinkToken';

// Must run before `createBrowserHistory()`: `connected-react-router` snapshots `history.location` into the store.
captureTestLinkTokenFromUrl();

const history = createBrowserHistory();
export default history;
