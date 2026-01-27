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

- **Bring Your Own Data:** your content stays where it already lives (GitHub,
  S3, your server, etc.)
- **privacy:** no server-side storage of your content or visited URLs
- **Portable:** configuration lives in your browser and can be exported/imported
  as a JSON file

## How it works

### Core philosophy: BYOD + privacy-first

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

## Self-hosting

`readonly.page` is a static Single Page Application (SPA). You can host it
anywhere that can serve static files. There is no backend and no database.

### Run locally (development)

```bash
git clone git@github.com:hanlogy/web.readonly.page.git
cd web.readonly.page
npm install
npm run dev
```

### Build for production

```bash
npm run build
```

Deploy the generated static files in `dist/` to your web server.

### Self-host with Docker / Docker Compose

This repo includes `Dockerfile`, `docker-compose.yml`, and Nginx config.

**Start:**

```bash
docker compose up -d

# Rebuild and start:
# docker compose up -d --build
```

Open: `http://localhost:8080`

**Stop:**

```bash
docker compose down
```

## A simple server to self-host your documents

If you want to self-host your docs and files, here is a simple Docker-based file
server: \
https://github.com/hanlogy/file-server.readonly.page
