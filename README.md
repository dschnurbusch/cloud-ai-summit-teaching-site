# Cloud AI Summit Teaching Site

A static teaching/take-home resource for Dan Schnurbusch's Cloud AI Summit sessions.

## What is inside

- Tabbed teaching walkthrough
- Workshop modules
- Hackathon build ideas
- Scoring rubric
- Copy/paste prompts
- Take-home implementation checklist
- Downloadable PDF versions of the materials in `downloads/`

## Run locally

Open `index.html` directly, or run a tiny local server:

```bash
python3 -m http.server 4173
```

Then visit `http://localhost:4173`.

## Regenerate PDFs

The source files are in `pdf-src/`. Run:

```bash
./scripts/build-pdfs.sh
```

This uses local Chrome/Chromium headless printing and writes PDFs into `downloads/`.
