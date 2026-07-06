# 1Mail Test Plan

This plan covers the current iPhone-first 1Mail prototype, including Gmail ingestion, AI classification, mobile UI behavior, privacy controls, and backend parser reliability.

Priority: P0 blocker, P1 high-value regression, P2 hardening or polish.

## Email Classification And Gmail Sections

| Test | Setup / Input | Steps | Expected Result | Priority |
|---|---|---|---|---|
| No-AI fallback smoke | Disable AI parser; digest has receipt, promo, e-transfer | Process latest week | Digest builds without runtime error and local rules populate sections | P0 |
| Promo with price is not bill | Promo email with `$10/mo`, sale/deal copy, List-Unsubscribe, `CATEGORY_PROMOTIONS` | Classify/process | Appears in Subscriptions > Promos, absent from Bills | P0 |
| Subscription plan ad is not recurring bill | "Upgrade to Pro, monthly plan $8", no receipt/paid/due wording | Classify/process | Subscription tab only | P0 |
| Renewal receipt is bill | "Subscription renewed", "charged $10", "receipt" | Classify first month | Bills > One-time, not Subscriptions | P0 |
| Receipt with unsubscribe footer stays bill | Store order receipt with List-Unsubscribe footer | Classify/process | Completed transaction overrides subscription signal | P0 |
| Invoice amount due | Subject/body includes invoice, amount due, due date, `$123.45` | Classify/process | Bills > One-time with `$123.45` | P0 |
| Attachment filename only | Attachment named `invoice.pdf`, no invoice/payment text | Classify/process | Does not infer attachment contents; not bill unless body supports it | P1 |
| Multiple money amounts | Receipt has discount, tax, subtotal, grand total | Classify/process | Uses grand/order/total paid amount, not discount/tax | P1 |
| AI recurring without history | Backend history empty; model returns `bill_recurring` | POST classify | Backend downgrades to `bill_one_time` | P0 |
| Prior-month recurring upgrade | History has same fingerprint and amount from previous month | POST same bill this month | Backend returns `bill_recurring` with prior-month evidence | P0 |
| Different amount not recurring | Prior month same merchant/subject, different amount | Classify current bill | Remains `bill_one_time` | P0 |
| Duplicate current-month processing | Process same bill twice in same month | POST twice | No duplicate history record; second pass does not become recurring | P1 |
| Steam purchase receipt | Steam Support purchase email with order/payment evidence | Process | Bills > One-time | P0 |
| Uniqlo purchase receipt | Uniqlo order/purchase email with total/order evidence | Process | Bills > One-time | P0 |
| E-transfer completed | Interac/bank email showing money sent/received and amount | Process | Bills > E-transfer with receiver and amount | P0 |
| Transfer marketing | Bank promo: "Send money instantly", no completed transfer | Process | Promo/ordinary, absent from E-transfer | P1 |
| Login tab exclusivity | New device, generic sign-in, verification code samples | Process; open Logins tabs | Each email appears in exactly one tab; count is correct | P0 |
| Phishing beats login | Suspicious verify-account email or unsafe sender | Process | Security section only, not Logins | P0 |
| Meeting requires invite | Email says "meeting/Zoom" without calendar part or `.ics` | Process | Not Today > Meetings | P0 |
| Valid meeting invite | Calendar invite or `.ics` plus meeting/conference signal | Process | Today > Meetings | P0 |
| Appointment not meeting | Dentist/booking appointment with invite, no meeting signal | Process | Calendar > Appointments, not Meetings | P1 |
| Travel confirmation | Flight/hotel/rental confirmation | Process | Calendar > Travel and next time is derived | P0 |
| Ticket sale promo | Ticket/concert sale without order/receipt | Process | Subscriptions > Promos, not Bills or Calendar | P1 |
| Security risk | Urgent wire/gift-card/account-locked unsafe link email | Process | Security item appears and risk score increases | P0 |
| Safe receipt not security | Legit store receipt | Process | Bills > One-time, not Security | P1 |
| One-click unsubscribe | Subscription with `List-Unsubscribe-Post: One-Click` | Tap stop, confirm | Sender is marked unsubscribed; existing emails are not trashed | P0 |
| Web unsubscribe fallback | URL List-Unsubscribe without one-click | Tap stop | Shows unsubscribe URL; no fake success | P1 |
| Subscription delete to Trash | Gmail token has `gmail.modify`; mock trash succeeds | Tap trash icon | Calls Gmail Trash, removes item from digest/section | P0 |
| Delete without modify scope | Token lacks `gmail.modify` | Tap login/subscription trash | Shows reconnect error, no Gmail mutation | P0 |
| Original email details | Card has message ID, body text, sender, attachments | Click/Enter card | Modal shows sender, formatted text, links, attachment names | P0 |
| Nested action isolation | Cards contain unsubscribe/delete/reminder buttons | Tap nested buttons and row body | Buttons do not open detail; row body opens detail | P0 |

## Mobile UI And Interaction

| Test | Device / Viewport | Steps | Expected Result | Priority |
|---|---|---|---|---|
| Home shell fit | iPhone SE, iPhone 14, Pro Max | Load home | No horizontal scroll or clipping; wheel/bookmark/header fit safe areas | P0 |
| Wheel geometry | 320x568, 390x844, 430x932 | Inspect all six segments | Icons are evenly spaced, upright, centered, and highlights align | P0 |
| Wheel tap routing | iPhone 14 viewport | Tap every module icon/segment | Opens the correct page; Back returns home | P0 |
| Center tap behavior | iPhone 14 viewport | Tap center control | Opens 1Mail AI conversation, not Today | P0 |
| Center drag/swipe | Small and normal iPhone viewports | Short drag; long drag toward each module | Short drag resets; long drag highlights nearest module and routes once | P0 |
| Gesture conflict | iPhone viewport | Swipe wheel, then scroll pages | Wheel gestures do not break page scrolling | P0 |
| Center title/subtitle wrapping | Small iPhone viewport | Hover/drag over long labels | Title and hint fit inside the center circle without overlap | P0 |
| Page header fit | All pages, small viewport | Visit all pages | Title/subtitle avoid back button/notch and truncate or wrap cleanly | P0 |
| Tabs responsiveness | Today, Bills, Subscriptions, Logins | Tap all tabs | Labels fit, underline follows selection, content changes correctly | P0 |
| Four subscription tabs | 320x568 | Tap Promos, Newsletter, Social, Productivity | All tabs are readable and tappable | P0 |
| Expanded subscription cards | Small and normal iPhone viewports | Expand stop flow on several cards, scroll | Expanded content stays inside cards; links wrap; page scroll works | P0 |
| Subscription nested controls | iPhone viewport | Tap stop, one-click, trash | Controls perform their action only and keep layout stable | P0 |
| Bookmark cat tap | iPhone viewport | Tap cat handle | Opens normal Inbox reliably | P0 |
| Bookmark cat pull | iPhone viewport | Pull slightly, release; pull past threshold | Small pull resets; threshold pull opens Inbox; no stuck drawer | P0 |
| Bookmark copy fit | Small viewport | Test quiet/busy/hot prompts | Copy does not overlap cat and stays readable | P1 |
| Inbox scrolling | Small and normal viewports | Open Inbox and scroll | Items stay readable and clear the home indicator | P1 |
| Mail detail modal readability | Small and normal viewports | Open long email with URL/attachments | Modal fits max height, body scrolls, links wrap, close path works | P0 |
| Icon alignment | All pages | Inspect stop, trash, bell, profile, back, send | Icons are centered, not cropped, and optically consistent | P1 |
| Tap targets | iPhone Safari/PWA | Try tabs, center, wheel, cat, close, trash | Primary targets are about 44x44 CSS px or have equivalent hit areas | P0 |
| Keyboard and VoiceOver basics | Desktop keyboard + iPhone VoiceOver sanity | Navigate with Tab/Enter/Space and rotor | Focus order is logical, buttons are labeled, dialogs announce | P1 |
| Text size stress | iOS larger text or browser 150-200% | Recheck home, pages, modal | Layout remains usable; scrolling is available where needed | P1 |
| Safe area / PWA mode | Notch/Dynamic Island iPhone | Test Safari and installed shell | Top and bottom content clear device safe areas | P0 |
| Empty/error states | Empty digest or failed actions | Visit sections and trigger failures | No blank screen; messages are readable and useful | P1 |

## Backend, Privacy, And Security

| Test | Setup | Steps | Expected Result | Priority |
|---|---|---|---|---|
| Health endpoint secret safety | Backend with real/fake OpenRouter key | `GET /api/health` | Returns status/model/key-present only; never returns key | P0 |
| Missing OpenRouter key | Run without `.env` key | POST classify | `503` JSON error; client falls back to local rules | P0 |
| Parser input validation | Invalid JSON, empty/non-array emails, oversized text | POST classify | Controlled JSON error; no crash or body reflection | P0 |
| Parser batch cap | Send 35 emails | Capture outbound OpenRouter body | Only first 30 are sent | P1 |
| Backend redaction | Mock OpenRouter capture | Send emails with email, phone, code, card, order IDs | Outbound payload contains `[email]`, `[phone]`, `[code]`, `[card]`, `order [id]` | P0 |
| Client redaction before backend | Browser fetch interceptor | Process Gmail sample with sensitive values | Request to parser is redacted and contains no Gmail tokens | P0 |
| Attachment minimization | Message with many sensitive filenames | Process AI payload | Max 12 filenames, no attachment bytes/content | P0 |
| OpenRouter failure fallback | Mock 429/500/timeout/malformed response | Process Gmail | Digest still builds using local rules | P0 |
| History stores hashes only | Temp history DB path | Classify bill with raw subject/body/sender | DB stores hashes, amount, month, seenAt; no raw body/subject/email/message ID | P0 |
| History corruption resilience | Corrupt or missing history file | Classify bill | Backend recovers with empty history and saves valid JSON | P1 |
| `.env` not bundled | Build/sync app | Search committed files and app bundle | API key is absent; `.env` remains ignored | P0 |
| OAuth scope exactness | Inspect generated Google auth URL | Start Gmail OAuth | Scope is only Gmail modify; PKCE S256/state/offline access present | P0 |
| OAuth state protection | Simulate callback with wrong state | Handle redirect | No token exchange, no token stored | P0 |
| Token refresh privacy | Expired token with refresh token | Process Gmail | Refresh goes only to Google; parser never receives Gmail tokens | P0 |
| Trash not permanent delete | Gmail fetch spy | Tap trash button | Calls `/messages/{id}/trash`, never delete endpoint | P0 |
| Trash failure non-destructive | Mock Gmail trash 403/404/500 | Tap trash | Error displayed; item remains in digest | P0 |
| No automatic mailbox mutation | Fresh sync with login notices | Observe Gmail calls | No trash/archive/delete/label calls during scan | P0 |
| No attachment content fetch | Gmail fetch spy | Process messages with `attachmentId` parts | Never calls `/attachments/{attachmentId}` | P0 |
| Body extraction excludes attachments | Payload with text and PDF/image attachment | Normalize message | Text comes from text/plain or text/html only | P0 |
| LAN backend reachability | Backend on Mac, iPhone same Wi-Fi | Open `http://<Mac LAN IP>:8787/api/health` | Reachable via LAN IP; `127.0.0.1` is not used for iPhone | P0 |
| Backend unreachable fallback | Wrong parser endpoint | Process Gmail | App completes with local classifier and status message | P0 |
| CORS prototype behavior | Browser preflight and POST | `OPTIONS`, then POST | Prototype allows request; no credentials or secrets exposed | P0 |
| CORS LAN risk gate | Another LAN browser/site posts to backend | Attempt classify | Current wildcard is documented as production blocker | P0 |
| ATS prototype behavior | iPhone app with HTTP LAN endpoint | Run against Mac parser | Works in prototype; production must replace arbitrary loads with HTTPS/narrow exception | P0 |
