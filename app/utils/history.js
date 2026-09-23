import { createBrowserHistory } from 'history';

import { captureTestLinkTokenFromUrl } from 'utils/testLinkToken';

// Must run before `createBrowserHistory()`: this module is imported by `configureStore`, so the
// strip happens before `connected-react-router` snapshots `history.location` into the store and —
// imports being hoisted — before `Sentry.init` / `LogRocket.init` in `app.tsx`.
captureTestLinkTokenFromUrl();

const history = createBrowserHistory();
export default history;
