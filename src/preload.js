// Preload script: runs in isolated world before any web content executes
// - Injects adblocking hooks
// - Adds media key controls and simple API for play/pause/next/prev

const { contextBridge, ipcRenderer } = require('electron');

// Expose a minimal API for playback controls and debug
contextBridge.exposeInMainWorld('ytm', {
  play: () => ipcRenderer.send('media:play'),
  pause: () => ipcRenderer.send('media:pause'),
  toggle: () => ipcRenderer.send('media:playpause'),
  next: () => ipcRenderer.send('media:next'),
  prev: () => ipcRenderer.send('media:previous'),
  isReady: () => true
});

// Helper to run code in the page context after load
function onDomReady(cb){
  if (document.readyState === 'complete' || document.readyState === 'interactive') cb();
  else window.addEventListener('DOMContentLoaded', cb, { once: true });
}

// Attempt to keep audio playing in background by preventing page visibility-based pauses
(function ensureBackgroundAudio(){
  const noop = () => {};
  // Override visibility APIs
  Object.defineProperty(document, 'hidden', { get: () => false });
  Object.defineProperty(document, 'visibilityState', { get: () => 'visible' });
  document.addEventListener = new Proxy(document.addEventListener, {
    apply(target, thisArg, args) {
      const [type, listener, options] = args;
      if (type === 'visibilitychange') return undefined;
      return Reflect.apply(target, thisArg, args);
    }
  });
  // Mute focus/blur autoplay gating
  window.addEventListener = new Proxy(window.addEventListener, {
    apply(target, thisArg, args) {
      const [type] = args;
      if (type === 'blur' || type === 'pagehide') return undefined;
      return Reflect.apply(target, thisArg, args);
    }
  });
})();

// Map IPC media controls to the YTM player when available
onDomReady(() => {
  function findPlayer(){
    // Try native YTM player API
    const playerApi = document.querySelector('ytmusic-app')?.playerApi_ || window.yt?.player?.Application?.getInstance?.();
    return playerApi || null;
  }
  function act(fn){
    try { fn(); } catch { /* ignore */ }
  }
  ipcRenderer.on('media:play', () => act(() => findPlayer()?.playVideo?.()));
  ipcRenderer.on('media:pause', () => act(() => findPlayer()?.pauseVideo?.()));
  ipcRenderer.on('media:playpause', () => act(() => {
    const p = findPlayer();
    if (!p) return;
    const s = p.getPlayerState?.();
    if (s === 1) p.pauseVideo?.(); else p.playVideo?.();
  }));
  ipcRenderer.on('media:next', () => act(() => findPlayer()?.nextVideo?.()))
  ipcRenderer.on('media:previous', () => act(() => findPlayer()?.previousVideo?.()))
});

// Cosmetic filtering: hide upgrade banners and ad containers via CSS
const style = document.createElement('style');
style.textContent = `
/* Hide upgrade prompts and banners */
#guide[upgrades], ytmusic-promo-banner-renderer, .ytp-ad-module, .ytmusic-you-there-renderer,
#paid-memberships, ytmusic-upsell-dialog, #upsell-dialog, .ytmusic-premium-promo-renderer {
  display: none !important;
}
`;
(document.head || document.documentElement).appendChild(style);
