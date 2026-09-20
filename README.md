# ZERO-TO-INFINITY DBMS + SQL

A hands-on SQL learning workshop with a browser-based isolated SQLite sandbox, mission evaluation, learner progress, and a separate admin view.

## Run locally

1. Copy the required administrator environment variables into `.env` (this file is intentionally ignored by Git).
2. Run `node server.js`.
3. Open `http://localhost:3000`.

## Deploy

This repository includes a `Dockerfile` and `render.yaml` for a server-capable deployment. In Render, create a new Blueprint from the GitHub repository, then set the two administrator environment variables in the service settings. Do not commit credentials to the repository.

GitHub Pages is not suitable for this application because it cannot run the Node API or the isolated SQLite SQL sandbox.
