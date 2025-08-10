# YT Music (Ad-Free) - Electron

A lightweight desktop wrapper for <https://music.youtube.com/> with adblocking and media key support. No scraping or unofficial YouTube APIs used.

## Features

- Loads the official YouTube Music web player
- Blocks ads and tracking via AdGuard filter engine (@adguard/tsurlfilter)
- Background audio playback while minimized
- Media keys (Play/Pause, Next, Previous)
- Preload script for small DOM tweaks and playback API

## Dev Setup

1. Install Node.js 18+.
2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the app:

    ```bash
    npm start
    ```

## Notes

- Filters are fetched from public CDNs at startup. You can swap to local list files if desired.
- Login and account features work normally via the embedded web session (persisted partition).
- This app injects only CSS/JS to hide promos and keep playback alive. It does not use private APIs.
