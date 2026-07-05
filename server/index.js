const http = require("http");
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

loadDotEnv();

const PORT = Number(process.env.PORT || 8787);
const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";
const OPENROUTER_MODEL = process.env.OPENROUTER_MODEL || "openrouter/free";
const OPENROUTER_TIMEOUT_MS = Number(process.env.OPENROUTER_TIMEOUT_MS || 20_000);
const HISTORY_DB_PATH =
  process.env.CLASSIFICATION_HISTORY_PATH || path.join(process.cwd(), "server/data/classification-history.json");
const MAX_EMAILS_PER_BATCH = 30;
const MAX_TEXT_CHARS = 9000;

const classificationSchema = {
  type: "object",
  additionalProperties: false,
  required: ["classifications"],
  properties: {
    classifications: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: [
          "id",
          "primaryCategory",
          "confidence",
          "isPromo",
          "isCompletedTransaction",
          "amount",
          "currency",
          "merchant",
          "summary",
          "evidence",
          "negativeEvidence",
          "recommendedAction",
        ],
        properties: {
          id: { type: "string" },
          primaryCategory: {
            type: "string",
            enum: [
              "bill_recurring",
              "bill_one_time",
              "e_transfer",
              "event_appointment",
              "event_travel",
              "meeting",
              "subscription_promo",
              "subscription_newsletter",
              "subscription_social",
              "subscription_productivity",
              "login_confirmation",
              "security_risk",
              "ordinary",
              "unknown",
            ],
          },
          confidence: { type: "number", minimum: 0, maximum: 1 },
          isPromo: { type: "boolean" },
          isCompletedTransaction: { type: "boolean" },
          amount: { type: ["number", "null"] },
          currency: { type: ["string", "null"] },
          merchant: { type: ["string", "null"] },
          summary: { type: "string" },
          evidence: {
            type: "array",
            items: { type: "string" },
            maxItems: 5,
          },
          negativeEvidence: {
            type: "array",
            items: { type: "string" },
            maxItems: 5,
          },
          recommendedAction: {
            type: "string",
            enum: [
              "show_in_bills",
              "show_in_calendar",
              "show_in_meetings",
              "show_in_subscriptions",
              "show_in_logins",
              "show_in_security",
              "keep_in_inbox",
              "ignore",
            ],
          },
        },
      },
    },
  },
};

const classifierSystemPrompt = [
  "You are 1Mail's email classification engine.",
  "Classify the real user intent of each email from its text, not by keyword matching alone.",
  "Promo emails often mention dollars, sales, events, tickets, receipts, or discounts. Do not classify them as bills unless the email confirms a completed purchase, receipt, invoice, amount due, charge, renewal, or money transfer.",
  "Do not decide recurring from text alone. Prefer bill_one_time for a bill-like email; the backend history layer upgrades it to bill_recurring only when the same bill fingerprint and amount appeared last month.",
  "A meeting requires a calendar invite signal from the payload. If hasCalendarInvite is false, do not classify as meeting.",
  "Login confirmations are account access notices such as new device sign-in, security alert, verification code, or login confirmation. These should be login_confirmation unless they look like phishing.",
  "Never infer attachment contents; attachmentNames are only filenames.",
  "Use unknown or ordinary when evidence is weak. Prefer high precision over recall.",
].join(" ");

function loadDotEnv() {
  const envPath = path.join(process.cwd(), ".env");
  if (!fs.existsSync(envPath)) return;

  const content = fs.readFileSync(envPath, "utf8");
  content.split(/\r?\n/).forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) return;
    const separator = trimmed.indexOf("=");
    if (separator < 0) return;
    const key = trimmed.slice(0, separator).trim();
    let value = trimmed.slice(separator + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    if (key && process.env[key] === undefined) process.env[key] = value;
  });
}

const server = http.createServer(async (request, response) => {
  setCorsHeaders(response);

  if (request.method === "OPTIONS") {
    response.writeHead(204);
    response.end();
    return;
  }

  try {
    const url = new URL(request.url, `http://${request.headers.host}`);
    if (request.method === "GET" && url.pathname === "/api/health") {
      sendJson(response, 200, {
        ok: true,
        provider: "openrouter",
        model: OPENROUTER_MODEL,
        hasApiKey: Boolean(process.env.OPENROUTER_API_KEY),
      });
      return;
    }

    if (request.method === "POST" && url.pathname === "/api/classify-emails") {
      const payload = await readJsonBody(request);
      const emails = sanitizeEmailBatch(payload.emails || []);
      if (!emails.length) {
        sendJson(response, 400, { error: "Provide an emails array." });
        return;
      }
      if (!process.env.OPENROUTER_API_KEY) {
        sendJson(response, 503, { error: "OPENROUTER_API_KEY is not configured on the backend." });
        return;
      }

      const result = await classifyEmailsWithOpenRouter(emails);
      const classifications = applyHistoricalRecurringRules(result.classifications, emails);
      sendJson(response, 200, {
        provider: "openrouter",
        model: OPENROUTER_MODEL,
        ...result,
        classifications,
      });
      return;
    }

    sendJson(response, 404, { error: "Not found." });
  } catch (error) {
    sendJson(response, 500, { error: error.message || "Backend error." });
  }
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`1Mail parser backend listening on http://0.0.0.0:${PORT}`);
  console.log(`OpenRouter model: ${OPENROUTER_MODEL}`);
});

function setCorsHeaders(response) {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  response.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
}

function sendJson(response, statusCode, body) {
  response.writeHead(statusCode, { "Content-Type": "application/json; charset=utf-8" });
  response.end(JSON.stringify(body));
}

async function readJsonBody(request) {
  let body = "";
  for await (const chunk of request) {
    body += chunk;
    if (body.length > 2_000_000) throw new Error("Request body is too large.");
  }
  if (!body.trim()) return {};
  try {
    return JSON.parse(body);
  } catch {
    throw new Error("Request body must be valid JSON.");
  }
}

function sanitizeEmailBatch(emails) {
  return emails.slice(0, MAX_EMAILS_PER_BATCH).map((email) => ({
    id: String(email.id || ""),
    subject: redactSensitiveText(email.subject || "").slice(0, 320),
    senderName: redactSensitiveText(email.senderName || "").slice(0, 160),
    senderEmailDomain: String(email.senderDomain || email.senderEmailDomain || "").slice(0, 160),
    labels: Array.isArray(email.labels) ? email.labels.slice(0, 12).map(String) : [],
    date: String(email.date || ""),
    isUnread: Boolean(email.isUnread),
    hasListUnsubscribe: Boolean(email.hasListUnsubscribe),
    hasCalendarInvite: Boolean(email.hasCalendarInvite),
    attachmentNames: Array.isArray(email.attachmentNames)
      ? email.attachmentNames.slice(0, 12).map((name) => redactSensitiveText(name).slice(0, 180))
      : [],
    text: redactSensitiveText(email.text || "").slice(0, MAX_TEXT_CHARS),
  }));
}

function redactSensitiveText(value = "") {
  return String(value)
    .replace(/\b\d{6}\b/g, "[code]")
    .replace(/\b(?:\d[ -]*?){13,19}\b/g, "[card]")
    .replace(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi, "[email]")
    .replace(/\b\+?1?[-.\s(]*\d{3}[-.\s)]*\d{3}[-.\s]*\d{4}\b/g, "[phone]")
    .replace(/\b(order|invoice|transaction|tracking)\s*(#|id|number)?\s*[:#-]?\s*[A-Z0-9-]{6,}\b/gi, "$1 [id]");
}

async function classifyEmailsWithOpenRouter(emails) {
  const content = JSON.stringify({ emails });
  const requestBody = {
    model: OPENROUTER_MODEL,
    messages: [
      { role: "system", content: classifierSystemPrompt },
      { role: "user", content },
    ],
    temperature: 0,
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "email_classifications",
        strict: true,
        schema: classificationSchema,
      },
    },
  };

  try {
    return await callOpenRouter(requestBody, emails);
  } catch (structuredError) {
    const fallbackBody = {
      ...requestBody,
      messages: [
        { role: "system", content: `${classifierSystemPrompt} Return only valid JSON matching the requested schema.` },
        { role: "user", content: `${content}\n\nReturn JSON with this shape: ${JSON.stringify(classificationSchema)}` },
      ],
    };
    delete fallbackBody.response_format;
    const fallbackResult = await callOpenRouter(fallbackBody, emails);
    return {
      ...fallbackResult,
      warning: `Structured output retry was used: ${structuredError.message}`,
    };
  }
}

async function callOpenRouter(body, emails = []) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), OPENROUTER_TIMEOUT_MS);
  const response = await fetch(OPENROUTER_API_URL, {
    method: "POST",
    signal: controller.signal,
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": process.env.OPENROUTER_APP_URL || "http://127.0.0.1:4173",
      "X-OpenRouter-Title": process.env.OPENROUTER_APP_TITLE || "1Mail Prototype",
    },
    body: JSON.stringify(body),
  }).finally(() => clearTimeout(timeout));
  const rawBody = await response.text();
  let payload;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    payload = { rawBody };
  }
  if (!response.ok) {
    throw new Error(payload.error?.message || payload.message || rawBody || "OpenRouter request failed.");
  }

  const content = payload.choices?.[0]?.message?.content;
  const parsed = typeof content === "string" ? parseJsonFromModelContent(content) : content;
  const emailById = new Map(emails.map((email) => [email.id, email]));
  const classifications = normalizeClassifications(parsed?.classifications || [], emailById);
  if (!classifications.length) throw new Error("OpenRouter returned no classifications.");
  return {
    classifications,
    usage: payload.usage || null,
  };
}

function parseJsonFromModelContent(content = "") {
  try {
    return JSON.parse(content);
  } catch {
    const match = content.match(/\{[\s\S]*\}/);
    if (!match) throw new Error("Model response did not contain JSON.");
    return JSON.parse(match[0]);
  }
}

function normalizeClassifications(classifications, emailById = new Map()) {
  if (!Array.isArray(classifications)) return [];
  return classifications.map((item) => {
    const email = emailById.get(String(item.id || ""));
    const primaryCategory = repairPrimaryCategory(normalizePrimaryCategory(item.primaryCategory), email);
    const amount = item.amount === null || item.amount === undefined ? null : Number(item.amount) || null;
    return {
      id: String(item.id || ""),
      primaryCategory,
      confidence: clamp(Number(item.confidence), 0, 1, 0.4),
      isPromo: primaryCategory.startsWith("subscription_") || Boolean(item.isPromo),
      isCompletedTransaction:
        ["bill_one_time", "bill_recurring", "e_transfer"].includes(primaryCategory) || Boolean(item.isCompletedTransaction),
      amount,
      currency: item.currency ? String(item.currency).slice(0, 12) : null,
      merchant: item.merchant ? String(item.merchant).slice(0, 120) : null,
      summary: String(item.summary || "").slice(0, 240),
      evidence: Array.isArray(item.evidence) ? item.evidence.map(String).slice(0, 5) : [],
      negativeEvidence: Array.isArray(item.negativeEvidence) ? item.negativeEvidence.map(String).slice(0, 5) : [],
      recommendedAction: getRecommendedAction(primaryCategory),
    };
  });
}

function applyHistoricalRecurringRules(classifications, emails) {
  const history = loadClassificationHistory();
  const emailById = new Map(emails.map((email) => [email.id, email]));
  const nextClassifications = classifications.map((classification) => {
    if (!["bill_one_time", "bill_recurring"].includes(classification.primaryCategory)) return classification;

    const email = emailById.get(classification.id);
    const fingerprint = getBillFingerprint(classification, email);
    if (!fingerprint) {
      return {
        ...classification,
        primaryCategory: "bill_one_time",
        recommendedAction: "show_in_bills",
      };
    }

    const month = getMonthKey(email?.date);
    const hasLastMonthMatch = hasPreviousMonthOccurrence(history, fingerprint, month);
    const primaryCategory = hasLastMonthMatch ? "bill_recurring" : "bill_one_time";
    return {
      ...classification,
      evidence: hasLastMonthMatch
        ? [...classification.evidence, "Same bill fingerprint and amount found last month."].slice(0, 5)
        : classification.evidence,
      primaryCategory,
      recommendedAction: getRecommendedAction(primaryCategory),
    };
  });

  recordBillOccurrences(history, nextClassifications, emailById);
  saveClassificationHistory(history);
  return nextClassifications;
}

function loadClassificationHistory() {
  try {
    if (!fs.existsSync(HISTORY_DB_PATH)) return { version: 1, billOccurrences: {} };
    const parsed = JSON.parse(fs.readFileSync(HISTORY_DB_PATH, "utf8"));
    return {
      version: 1,
      billOccurrences: parsed.billOccurrences && typeof parsed.billOccurrences === "object" ? parsed.billOccurrences : {},
    };
  } catch {
    return { version: 1, billOccurrences: {} };
  }
}

function saveClassificationHistory(history) {
  fs.mkdirSync(path.dirname(HISTORY_DB_PATH), { recursive: true });
  fs.writeFileSync(HISTORY_DB_PATH, `${JSON.stringify(history, null, 2)}\n`);
}

function recordBillOccurrences(history, classifications, emailById) {
  classifications.forEach((classification) => {
    if (!["bill_one_time", "bill_recurring"].includes(classification.primaryCategory)) return;
    const email = emailById.get(classification.id);
    const fingerprint = getBillFingerprint(classification, email);
    if (!fingerprint) return;

    const occurrence = {
      amount: Number(classification.amount || 0),
      merchantHash: hashValue(classification.merchant || email?.senderEmailDomain || ""),
      messageHash: hashValue(classification.id),
      month: getMonthKey(email?.date),
      seenAt: new Date().toISOString(),
    };

    const existing = history.billOccurrences[fingerprint] || [];
    if (existing.some((item) => item.messageHash === occurrence.messageHash)) return;
    history.billOccurrences[fingerprint] = [...existing, occurrence].slice(-18);
  });
}

function hasPreviousMonthOccurrence(history, fingerprint, month) {
  const previousMonth = getPreviousMonthKey(month);
  return (history.billOccurrences[fingerprint] || []).some((occurrence) => occurrence.month === previousMonth);
}

function getBillFingerprint(classification, email = {}) {
  const amount = Number(classification.amount || 0);
  if (!Number.isFinite(amount) || amount <= 0) return "";

  const merchant = normalizeFingerprintPart(classification.merchant || email.senderEmailDomain || email.senderName || "merchant");
  const subject = normalizeBillSubject(email.subject || classification.summary || "bill");
  return hashValue(`${merchant}|${subject}|${amount.toFixed(2)}`);
}

function normalizeBillSubject(value = "") {
  return normalizeFingerprintPart(
    value
      .replace(/\b(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\b/gi, "")
      .replace(/\b\d{1,4}\b/g, "")
      .replace(/\b(order|invoice|transaction|receipt)\s*\[id\]/gi, "$1")
      .replace(/\$[0-9,.]+/g, ""),
  );
}

function normalizeFingerprintPart(value = "") {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getMonthKey(value) {
  const date = new Date(value || Date.now());
  if (Number.isNaN(date.getTime())) return getMonthKey(Date.now());
  return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}`;
}

function getPreviousMonthKey(month) {
  const [year, monthIndex] = String(month).split("-").map(Number);
  const date = new Date(Date.UTC(year || new Date().getUTCFullYear(), (monthIndex || 1) - 2, 1));
  return getMonthKey(date.toISOString());
}

function hashValue(value = "") {
  return crypto.createHash("sha256").update(String(value)).digest("hex").slice(0, 32);
}

function normalizePrimaryCategory(value) {
  const category = String(value || "unknown");
  return [
    "bill_recurring",
    "bill_one_time",
    "e_transfer",
    "event_appointment",
    "event_travel",
    "meeting",
    "subscription_promo",
    "subscription_newsletter",
    "subscription_social",
    "subscription_productivity",
    "login_confirmation",
    "security_risk",
    "ordinary",
    "unknown",
  ].includes(category)
    ? category
    : "unknown";
}

function repairPrimaryCategory(primaryCategory, email = {}) {
  const text = `${email.subject || ""} ${email.text || ""}`.toLowerCase();
  if (!text.trim()) return primaryCategory;

  const hasRecurringSignal = hasAny(text, [
    "subscription",
    "renewal",
    "renews",
    "monthly",
    "annual",
    "membership",
    "billing cycle",
    "auto-renew",
    "autorenew",
    "next billing date",
    "recurring",
  ]);
  const hasOneTimePurchaseSignal = hasAny(text, [
    "receipt",
    "order receipt",
    "purchase receipt",
    "order confirmation",
    "order details",
    "order summary",
    "order total",
    "thank you for shopping",
    "thank you for your purchase",
    "thank you for your order",
    "subtotal",
    "tax",
    "transaction id",
  ]);

  if (primaryCategory === "bill_recurring" && !hasRecurringSignal && hasOneTimePurchaseSignal) {
    return "bill_one_time";
  }
  if (primaryCategory === "meeting" && !email.hasCalendarInvite) {
    return "ordinary";
  }
  return primaryCategory;
}

function hasAny(value, keywords) {
  return keywords.some((keyword) => value.includes(keyword));
}

function getRecommendedAction(primaryCategory) {
  if (["bill_recurring", "bill_one_time", "e_transfer"].includes(primaryCategory)) return "show_in_bills";
  if (["event_appointment", "event_travel"].includes(primaryCategory)) return "show_in_calendar";
  if (primaryCategory === "meeting") return "show_in_meetings";
  if (primaryCategory.startsWith("subscription_")) return "show_in_subscriptions";
  if (primaryCategory === "login_confirmation") return "show_in_logins";
  if (primaryCategory === "security_risk") return "show_in_security";
  if (primaryCategory === "ordinary") return "keep_in_inbox";
  return "ignore";
}

function clamp(value, min, max, fallback) {
  if (!Number.isFinite(value)) return fallback;
  return Math.min(max, Math.max(min, value));
}
