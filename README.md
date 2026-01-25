# readonly.page

[`readonly.page`](http://readonly.page) is a Single Page Application (SPA) that
fetches content directly from URLs you provide and renders it in your browser.
The server only serves the app code (HTML/JS/CSS) — it never sees your
documents.

Currently it supports **Markdown**. More formats are planned.

It supports two target types:

1. **Single document**
2. **Collection** (a directory that contains a `_sidebar.md`)

## Why

- **Bring Your Own Data (BYOD):** your content stays where it already lives
  (GitHub, S3, your server, etc.)
- **Zero-knowledge by design:** no server-side storage of your content or
  visited URLs
- **Portable setup:** configuration lives in your browser and can be
  exported/imported as a JSON file

## How it works

### Core philosophy: BYOD + zero-knowledge

- **Client-side SPA:** everything runs in the browser
- **No proxying:** the browser fetches content directly from your URLs
- **URL privacy:** target URLs are stored in the URL hash (`#...`), so they are
  not sent to the server in normal requests
- **No backend database:** all state is stored locally in the browser (e.g.
  `localStorage`, `IndexedDB`)

### UX flow

1. **Initial load:** a clean “Get Started” screen.
2. **Add pages:** add target URLs (single files or collections).
3. **Persistent:** reopen the site later and it restores from local browser
   storage.
4. **Portable:** export config to JSON and import it elsewhere.

## Tech Stack

- React 19
- Tailwind CSS 4
