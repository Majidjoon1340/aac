import { createHashHistory } from 'history';

// Use hash history for full compatibility across GitHub Pages,
// static local servers, PWA offline, and packaged mobile apps.
// This completely avoids 404 errors on subpaths (like /aac/).
const history = createHashHistory();
export default history;
