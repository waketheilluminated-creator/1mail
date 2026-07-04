# Email AI Privacy Rules

1Mail handles mailbox content as sensitive data. Any AI feature that reads, classifies, summarizes, deletes, labels, or unsubscribes email must follow these rules.

## Current Prototype

- Gmail access is read-only and runs in the client prototype.
- The app processes the latest week of email by default.
- The current classifier runs locally in JavaScript. It does not call an outside AI provider.
- Prototype Gmail tokens and processed digests are stored in local browser/app storage for testing only.

## Data Handling Rules

1. Classify locally first.
   Use local rules, on-device models, or local embeddings when they are good enough for routing emails into sections.

2. Minimize what leaves the device.
   Do not send full raw email bodies, attachments, OAuth tokens, refresh tokens, or full mailbox dumps to external services by default.

3. Ask before remote AI processing.
   If a cloud AI model is needed, the app must show what will be sent and ask for explicit user consent before sending email content outside the device.

4. Redact before sending.
   Remove or mask email addresses, names, phone numbers, addresses, account numbers, confirmation codes, order numbers, and payment details unless that exact field is required for the requested task.

5. Prefer structured summaries.
   Send the smallest useful representation, such as:
   - sender domain
   - subject category
   - short redacted snippet
   - extracted dates or amounts
   - local classifier confidence

6. Never train by default.
   Mailbox content must not be used for model training or product analytics unless the user has clearly opted in.

7. Keep action approval separate.
   AI may suggest unsubscribe, delete, archive, label, or reminder actions, but the app must ask before changing the mailbox.

8. Avoid raw content logs.
   Logs should contain event IDs, classifier labels, confidence, and error codes. They should not contain full subject lines, body text, tokens, or attachments.

## Production Checklist

- Use the narrowest Gmail or Microsoft Graph scopes possible.
- Document every external destination that can receive email-derived data.
- Encrypt tokens and any stored mail-derived data at rest.
- Add retention limits for cached email summaries.
- Add a user-facing data deletion control.
- Add provider-specific legal/security review before enabling remote AI.
- Add test cases for false positives such as promotional savings emails being classified as bills.

## Classification Guardrails

- Treat marketing words such as sale, save, discount, deal, shop now, and up to as negative bill signals.
- Classify as a bill only when stronger evidence exists, such as invoice, receipt, amount due, paid invoice, order confirmation, renewal, billing cycle, or e-transfer wording.
- Classify as a meeting only when the email includes a real calendar invite signal, such as a `text/calendar` MIME part or `.ics` file from Google Calendar, Apple Calendar, or another calendar system.
- Keep the classifier reason local with the digest so the user can review why a message appeared in a tab.
- When a listing is shown, preserve a source message ID so the user can inspect the original sender, body text, and attachment names.
