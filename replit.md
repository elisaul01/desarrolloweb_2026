# Running the project

This is the imported Node.js 20 / Express API. Its existing structure and endpoints are unchanged.

- Click **Run** to start the **Start application** workflow.
- The workflow runs `PORT=5000 npm start` and serves the API in Replit Preview.
- Outside the workflow, `npm start` uses port 3000 by default, or the supplied `PORT`.
- No secrets, database, or external services are required.
- Install dependencies with `npm install` when setting up a fresh checkout.

## Existing endpoints

- `GET /` — plain text: `Desde server smq`.
- `GET /api/grettings` — greeting JSON (spelling retained from the import).
- `GET /api/servers` — hardcoded server offerings.
- `POST /api/contact` — accepts JSON with `name`, `email`, and `message`; logs it and returns `{"status":"ok"}`. It does not store or send messages.

There is no frontend. Preview shows the plain-text root response.
The imported `npm test` script is a placeholder that exits with an error; there is no automated test suite yet.
