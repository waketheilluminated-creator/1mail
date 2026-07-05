# 1Mail iPhone Prototype

Static iPhone-first interaction prototype for 1Mail.

- Radial home hub
- Thumb drag from the center control to a module
- Single-purpose mock pages for Today, Bills, Calendar, Security, Subscriptions, and Inbox
- Optional Gmail OAuth test connection for processing the latest week of messages locally
- Optional OpenRouter-backed cloud AI parser with local fallback rules
- Local finance classifier with promo exclusion checks for savings/deal emails
- Tap a generated listing to inspect sender, captured body text, and attachment names from the original email

Open `index.html` directly in a browser, or serve the folder with any static server.

## Privacy note

Email content is sensitive. Cloud AI parsing is optional and sends redacted email text only, not attachment contents. Attachment filenames may be sent for classification context. Follow the local-first, consent, redaction, and logging rules in [`docs/email-ai-privacy.md`](docs/email-ai-privacy.md).

The bills classifier now requires finance-specific evidence such as invoice, receipt, amount due, paid, order confirmation, renewal, or e-transfer language. Promotional wording such as save, discount, sale, deal, shop now, and up to is treated as an exclusion signal unless a stronger transaction signal is present.

## iPhone test build

This prototype now has a Capacitor iOS wrapper.

1. Install dependencies:
   `npm install`
2. Build and open the iOS project:
   `npm run ios:open`
3. In Xcode, select the `App` target, choose your signing team, connect your iPhone, then run.

The current bundle ID is:
`com.onemail.prototype`

## Cloud AI parser with OpenRouter

The iPhone app must not contain your OpenRouter key. Run the parser backend on your Mac or a hosted server, and let the app call that backend.

1. Create a local env file:
   `cp .env.example .env`
2. Add your OpenRouter key to `.env`:
   `OPENROUTER_API_KEY=...`
3. Optional: choose a model. The default is:
   `OPENROUTER_MODEL=openrouter/free`
4. Start the backend:
   `npm run server`
5. In another terminal, serve the app as usual.

The browser endpoint defaults to:
`http://127.0.0.1:8787/api/classify-emails`

For iPhone testing, `127.0.0.1` means the iPhone itself, not your Mac. Use your Mac LAN IP in `oauth-config.js`, for example:
`http://192.168.1.23:8787/api/classify-emails`

OpenRouter's free models have low rate limits and are best for prototype testing. The parser batches up to 30 recent emails and falls back to local rules if the cloud parser is unavailable.

Recurring bills are not decided from text alone. The backend stores a local, ignored JSON history at `server/data/classification-history.json`. A bill is classified as recurring only when the same hashed bill fingerprint and amount were seen in the previous month. Without historical evidence, bill-like emails stay in One-time.

## Gmail OAuth test setup

1. In Google Cloud, enable the Gmail API.
2. Configure the OAuth consent screen in testing mode and add your Gmail address as a test user.
3. Create an OAuth client of type `iOS`.
4. Use this bundle ID for the client:
   `com.onemail.prototype`
5. Copy the iOS client ID into `oauth-config.js`.
6. Set the redirect URI in `oauth-config.js` to:
   `com.googleusercontent.apps.YOUR_CLIENT_ID_PREFIX:/oauth2redirect`
7. Run:
   `npm run ios:sync`
8. Open the app on iPhone, go to Settings, and tap `Connect Gmail`.

The prototype now uses `https://www.googleapis.com/auth/gmail.modify` so login-notice cleanup can move emails to Trash. Gmail read/modify scopes are restricted by Google, so production release will need Google verification, and server-side storage or transmission of restricted Gmail data may require a security assessment.
