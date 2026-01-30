# readonly.page

[`readonly.page`](http://readonly.page) is a simple viewer for documents stored
on the web.

You give it a URL to a Markdown file (more formats will be supported later).
Your browser fetch the file and shows it as a readable page.

It can read docs organized in two ways:

1. **Single file:** one document from one URL
2. **Collection**: a folder of documents that includes a `_sidebar.md` for
   navigation

## Why use it

- **Bring Your Own Data:** keep files where they already are (GitHub, S3, your
  own server, and so on)
- **privacy:** no server-side storage, and the server does not see which URLs
  you read
- **Portable:** your setup is saved in your browser and can be exported/imported
  as a JSON file

## How it works

- **Runs in the browser:** rendering happens on your device
- **Direct fetching:** the browser loads files straight from your URLs (no
  proxy)
- **URL privacy:** the target URL is stored after `#` in the page address, so it
  is not sent to the server.
- **Local storage only:** settings and state are saved in your browser (e.g.
  `localStorage`, `IndexedDB`)

## Tech Stack

- React 19
- Tailwind CSS 4

## Development

```bash
git clone git@github.com:hanlogy/web.readonly.page.git
cd web.readonly.page
npm install
npm run dev
```

## Self-hosting

`readonly.page` is a static Single Page Application (SPA). You can host it
anywhere that can serve static files. There is no backend and no database.

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
