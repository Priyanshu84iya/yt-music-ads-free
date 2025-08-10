// Ad blocking using @cliqz/adblocker-electron applied to Electron session
// We fetch public filter lists (AdGuard/EasyList compatible) and enable blocking in the session.

const { ElectronBlocker } = require('@cliqz/adblocker-electron');

async function initAdblock(sess, lists) {
  const blocker = await ElectronBlocker.fromLists(global.fetch, lists, {
    loadNetworkFilters: true,
    enableCompression: true,
  });
  blocker.enableBlockingInSession(sess);
  return blocker;
}

module.exports = { initAdblock };
