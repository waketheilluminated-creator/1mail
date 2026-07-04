# 1Mail iPhone Prototype

Static iPhone-first interaction prototype for 1Mail.

- Radial home hub
- Thumb drag from the center control to a module
- Single-purpose mock pages for Today, Bills, Calendar, Security, Subscriptions, and Inbox
- Optional Gmail OAuth test connection for processing the latest week of messages locally
- Local finance classifier with promo exclusion checks for savings/deal emails
- Tap a generated listing to inspect sender, captured body text, and attachment names from the original email

Open `index.html` directly in a browser, or serve the folder with any static server.

## Privacy note

Email content is sensitive. The current prototype classifies Gmail test messages locally in JavaScript and does not call an outside AI provider. Before adding cloud AI parsing, follow the local-first, consent, redaction, and logging rules in [`docs/email-ai-privacy.md`](docs/email-ai-privacy.md).

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

The prototype starts with `https://www.googleapis.com/auth/gmail.readonly` so it can test read-only mailbox access. Gmail read/modify scopes are restricted by Google, so production release will need Google verification, and server-side storage or transmission of restricted Gmail data may require a security assessment.
