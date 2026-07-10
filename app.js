const app = document.querySelector("#app");
const USER_AGREEMENT_STORAGE_KEY = "oneMailUserAgreementAccepted";
const USER_AGREEMENT_VERSION = "2026-07-09-v1";

const icons = {
  arrowLeft:
    '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>',
  settings:
    '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M9.7 4.1 11 2h2l1.3 2.1 2.4.8.9 1.8-1.1 2.2 1.1 2.2-.9 1.8-2.4.8L13 16h-2l-1.3-2.3-2.4-.8-.9-1.8 1.1-2.2-1.1-2.2.9-1.8 2.4-.8Z"/><circle cx="12" cy="9" r="2.4"/></svg>',
  menu:
    '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6.5h18"/><path d="M3 12h18"/><path d="M3 17.5h18"/></svg>',
  user:
    '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>',
  bookmark:
    '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1Z"/></svg>',
  card:
    '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18"/><path d="M7 15h3"/></svg>',
  message:
    '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z"/></svg>',
  sliders:
    '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h10"/><path d="M18 6h2"/><circle cx="16" cy="6" r="2"/><path d="M4 12h4"/><path d="M12 12h8"/><circle cx="10" cy="12" r="2"/><path d="M4 18h11"/><path d="M19 18h1"/><circle cx="17" cy="18" r="2"/></svg>',
  receipt:
    '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1-2-1Z"/><path d="M8 7h8"/><path d="M8 11h8"/><path d="M8 15h5"/></svg>',
  calendar:
    '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 2v4"/><path d="M16 2v4"/><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M3 10h18"/></svg>',
  shield:
    '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 13c0 5-3.5 7.5-8 9-4.5-1.5-8-4-8-9V5l8-3 8 3v8Z"/><path d="m9.5 12 1.8 1.8 3.6-4"/></svg>',
  repeat:
    '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m17 2 4 4-4 4"/><path d="M3 11V9a3 3 0 0 1 3-3h15"/><path d="m7 22-4-4 4-4"/><path d="M21 13v2a3 3 0 0 1-3 3H3"/></svg>',
  stopHand:
    '<img class="stop-hand-icon" src="./assets/stop-unsubscribe.png" alt="" aria-hidden="true" />',
  inbox:
    '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="m5.5 5.1-3.2 7.4A2 2 0 0 0 4.1 15H20a2 2 0 0 0 1.8-2.8l-3.3-7.1A2 2 0 0 0 16.7 4H7.3a2 2 0 0 0-1.8 1.1Z"/></svg>',
  mail:
    '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-10 6L2 7"/></svg>',
  lock:
    '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
  footprint:
    '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.6 3.8c1.2.2 2 1.6 1.7 3.1-.3 1.5-1.5 2.6-2.7 2.4-1.2-.2-2-1.6-1.7-3.1.3-1.5 1.5-2.6 2.7-2.4Z"/><path d="M7.3 12.6c1.4.2 2.3 1.7 2 3.3-.3 1.7-1.7 2.8-3 2.6-1.4-.2-2.3-1.7-2-3.3.3-1.7 1.7-2.8 3-2.6Z"/><path d="M16.4 5.4c1.1-.4 2.4.6 2.9 2.1.5 1.5.1 3-1 3.3-1.1.4-2.4-.6-2.9-2.1-.5-1.5-.1-3 1-3.3Z"/><path d="M17.2 14.3c1.3-.4 2.7.5 3.2 2.1.5 1.6-.1 3.2-1.4 3.6-1.3.4-2.7-.5-3.2-2.1-.5-1.6.1-3.2 1.4-3.6Z"/></svg>',
  plane:
    '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M21 16v-2L13 9V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5Z"/></svg>',
  alert:
    '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>',
  bell:
    '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M10.3 21a2 2 0 0 0 3.4 0"/><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/></svg>',
  archive:
    '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><rect width="20" height="5" x="2" y="3" rx="1"/><path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"/><path d="M10 12h4"/></svg>',
  ban:
    '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="m4.9 4.9 14.2 14.2"/></svg>',
  check:
    '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>',
  plus:
    '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14"/><path d="M12 5v14"/></svg>',
  send:
    '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>',
  eye:
    '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>',
  trash:
    '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="M19 6l-1 15H6L5 6"/></svg>',
  star:
    '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m12 2.6 2.9 5.9 6.5.9-4.7 4.6 1.1 6.5-5.8-3.1-5.8 3.1 1.1-6.5-4.7-4.6 6.5-.9Z"/></svg>',
};

const modules = [
  {
    id: "today",
    label: "Today",
    icon: "mail",
    accent: "#171717",
    wheelColor: "#6f5bb5",
    activeWheelColor: "#8069cf",
    iconColor: "#c9bbff",
    wheelDescription: "Hey what's up, my master?",
  },
  {
    id: "calendar",
    label: "Calendar",
    icon: "calendar",
    accent: "#2458ff",
    wheelColor: "#2f6377",
    activeWheelColor: "#397892",
    iconColor: "#80d2f4",
    wheelDescription: "Meeting reminders and travel bookings",
  },
  {
    id: "security",
    label: "Security",
    icon: "shield",
    accent: "#d64242",
    wheelColor: "#28725a",
    activeWheelColor: "#318b6e",
    iconColor: "#7ee2b8",
    wheelDescription: "Spoofed senders and unsafe links",
  },
  {
    id: "logins",
    label: "Logins",
    icon: "lock",
    accent: "#343a40",
    wheelColor: "#805b38",
    activeWheelColor: "#9a6d43",
    iconColor: "#e5b36e",
    wheelDescription: "New device sign-ins and login confirmations",
  },
  {
    id: "starred",
    label: "Starred",
    icon: "star",
    accent: "#efbd38",
    wheelColor: "#755f31",
    activeWheelColor: "#92763d",
    iconColor: "#f4c44c",
    wheelDescription: "Important mail you marked",
  },
  {
    id: "subscriptions",
    label: "Subscriptions",
    icon: "repeat",
    accent: "#6b4be8",
    wheelColor: "#835067",
    activeWheelColor: "#9b5f79",
    iconColor: "#f2a0ba",
    wheelDescription: "Sender emails and source websites",
  },
  {
    id: "bills",
    label: "Bills",
    icon: "receipt",
    accent: "#0d8a61",
    wheelColor: "#2d7772",
    activeWheelColor: "#36908a",
    iconColor: "#62e4d7",
    wheelDescription: "Due payments, renewals, receipts",
  },
];

const homeModules = modules.filter((module) => module.id !== "today");

const wheel = {
  size: 350,
  center: 175,
  innerRadius: 72,
  outerRadius: 158,
  iconRadius: 112,
  cornerRadius: 11,
  segmentGapDegrees: 8.2,
};

const pages = {
  today: {
    eyebrow: "Today",
    title: "Today summary",
    subtitle: "Time and recurring bills",
    metric: "5",
    copy: "Let's start with a birdseye's view.",
    pills: ["Summary", "Events", "Meetings"],
    actions: [
      ["Calendar", "calendar", "secondary", "calendar"],
      ["Bills", "receipt", "secondary", "bills"],
      ["Inbox", "inbox", "", "inbox"],
    ],
    items: [
      ["mail", "Today summary", "1 event and 2 recurring bills", "Now", "#343a40"],
      ["calendar", "Dentist appointment", "Tomorrow 3:00 PM", "Event", "#2458ff"],
      ["repeat", "Notion Plus", "Renews Jul 2", "$10", "#6b4be8"],
    ],
    tabViews: [
      {
        summary: [
          "5 unread emails need a first look.",
          "2 events may need reminders.",
          "3 unread meeting invites are waiting for a decision.",
        ],
      },
      {
        reminderItems: [
          ["Dentist appointment", "Tomorrow 3:00 PM", "Appointment", "#2458ff"],
          ["Flight check-in window", "Jul 6, 7:45 AM", "Travel", "#0d8a61"],
          ["Rental car pickup", "Jul 8, 10:00 AM", "Reservation", "#b87506"],
        ],
      },
      {
        meetingItems: [
          ["maya@northstar.studio", "Fri Jun 30, 9:30 AM", "#2458ff"],
          ["design.team@luma-labs.ai", "Mon Jul 3, 11:00 AM", "#2458ff"],
          ["sam@foundry.ventures", "Tue Jul 4, 2:00 PM", "#2458ff"],
        ],
      },
    ],
  },
  bills: {
    eyebrow: "Bills",
    title: "Bills",
    subtitle: "Recurring, one-time, and e-transfer",
    metric: "$10.00",
    copy: "Let's untangle your finances.",
    pills: ["Recurring", "One-time", "E-transfer"],
    actions: [
      ["Remind", "bell", "", null],
      ["Archive", "archive", "secondary", null],
      ["Done", "check", "secondary", null],
    ],
    items: [
      ["stopHand", "Notion Plus", "Renews Jul 2", "$10.00", "#d64242"],
      ["stopHand", "iCloud+", "Renews Jul 5", "$2.99", "#d64242"],
      ["stopHand", "ChatGPT Plus", "Renews Jul 11", "$20.00", "#d64242"],
    ],
    tabViews: [
      {
        items: [
          ["stopHand", "Notion Plus", "Renews Jul 2", "$10.00", "#d64242"],
          ["stopHand", "iCloud+", "Renews Jul 5", "$2.99", "#d64242"],
          ["stopHand", "ChatGPT Plus", "Renews Jul 11", "$20.00", "#d64242"],
        ],
      },
      {
        items: [
          [
            "receipt",
            "Summer concert tickets",
            "From Ticketmaster receipt",
            "$86.50",
            "#0d8a61",
            "Email text: 2 tickets, July 18, doors 7:00 PM, mobile entry required.",
          ],
          [
            "calendar",
            "Comedy night booking",
            "From Eventbrite confirmation",
            "$32.00",
            "#2458ff",
            "Email text: Seat B12, show starts 8:30 PM, receipt attached.",
          ],
          [
            "receipt",
            "Indie theater show",
            "From box office email",
            "$24.00",
            "#b87506",
            "Email text: One-time purchase, order #1842, no recurring charge detected.",
          ],
        ],
      },
      {
        items: [
          ["letter:M", "Maya Chen", "maya.chen", "$240.00", "#d64242"],
          ["letter:J", "Jordan Lee", "jordan.lee", "$68.50", "#d64242"],
          ["letter:A", "Alex Morgan", "alex.morgan", "$125.00", "#d64242"],
        ],
      },
    ],
  },
  calendar: {
    eyebrow: "Calendar",
    title: "Next appointment",
    subtitle: "Pulled from email",
    metric: "3:00",
    copy: "Let time arrive with less friction.",
    pills: ["Appointments", "Travel"],
    actions: [
      ["Add", "plus", "", null],
      ["Remind", "bell", "secondary", null],
      ["Done", "check", "secondary", null],
    ],
    timeline: [
      ["Tomorrow 3:00 PM", "Dentist appointment", "Downtown Dental"],
      ["Friday 9:30 AM", "Design review", "Calendar invite"],
      ["Jun 30", "Amex bill due", "From statement email"],
    ],
    tabViews: [
      {
        timeline: [
          ["Tomorrow 3:00 PM", "Dentist appointment", "Confirmation email"],
          ["Friday 9:30 AM", "Design review", "Meeting invite"],
          ["Monday 11:00 AM", "Property viewing", "Appointment reminder"],
        ],
      },
      {
        timeline: [
          ["Jul 6 7:45 AM", "Flight to New York", "Delta confirmation"],
          ["Jul 6 3:00 PM", "Hotel check-in", "The Standard booking"],
          ["Jul 8 10:00 AM", "Rental car pickup", "Hertz reservation"],
        ],
      },
    ],
  },
  starred: {
    eyebrow: "Starred",
    title: "Starred",
    subtitle: "Marked email",
    metric: "3",
    copy: "Keep what matters within reach.",
    pills: ["Starred"],
    actions: [
      ["Preview", "eye", "secondary", null],
      ["Archive", "archive", "secondary", null],
      ["Done", "check", "", null],
    ],
    items: [
      ["star", "Investor update", "maya@northstar.studio", "", "#efbd38"],
      ["star", "Steam purchase receipt", "Steam Support", "", "#efbd38"],
      ["star", "Travel confirmation", "Air Canada", "", "#efbd38"],
    ],
    tabViews: [
      {
        items: [
          ["star", "Investor update", "maya@northstar.studio", "", "#efbd38"],
          ["star", "Steam purchase receipt", "Steam Support", "", "#efbd38"],
          ["star", "Travel confirmation", "Air Canada", "", "#efbd38"],
        ],
      },
    ],
  },
  security: {
    eyebrow: "Security",
    title: "Risk check",
    subtitle: "One suspicious email",
    metric: "74",
    copy: "Keep the door closed to what feels wrong.",
    pills: ["Domain mismatch", "Urgent payment", "Risky link"],
    actions: [
      ["Preview", "eye", "secondary", null],
      ["Block", "ban", "", null],
      ["Report", "alert", "secondary", null],
    ],
    items: [
      ["alert", "PayPal account notice", "paypal-billing-secure.co", "High", "#d64242"],
      ["shield", "Amazon receipt", "Authenticated sender", "Safe", "#0d8a61"],
    ],
  },
  logins: {
    eyebrow: "Access",
    title: "Login notices",
    subtitle: "New devices and sign-ins",
    metric: "2",
    copy: "Review the door, then clear the hallway.",
    pills: ["New device", "Sign-in", "Verification"],
    actions: [
      ["Delete", "trash", "", null],
      ["Preview", "eye", "secondary", null],
      ["Done", "check", "secondary", null],
    ],
    items: [
      ["lock", "New Google sign-in", "Remote device confirmation", "Delete", "#343a40"],
      ["shield", "Apple ID verification", "Sign-in confirmation", "Delete", "#343a40"],
    ],
    tabViews: [
      {
        items: [["lock", "New Google sign-in", "Remote device confirmation", "Delete", "#343a40"]],
      },
      {
        items: [["shield", "GitHub sign-in", "Recent account access", "Delete", "#343a40"]],
      },
      {
        items: [["shield", "Apple ID verification", "Verification code", "Delete", "#343a40"]],
      },
    ],
  },
  subscriptions: {
    eyebrow: "Subscriptions",
    title: "Subscription categories",
    subtitle: "Email addresses and websites",
    metric: "26",
    copy: "Let's cut down the noise.",
    pills: ["Promos", "Newsletter", "Social", "Productivity"],
    actions: [
      ["Keep", "check", "secondary", null],
      ["Block", "ban", "secondary", null],
      ["Unsub", "trash", "", null],
    ],
    items: [
      ["stopHand", "offers@airbnb.com", "airbnb.com", "Promo", "#d64242", "web", "https://www.airbnb.com/account-settings/notifications"],
      ["stopHand", "deals@spotify.com", "spotify.com", "Promo", "#d64242", "web", "https://www.spotify.com/account/notifications/"],
      ["stopHand", "sale@uniqlo.com", "uniqlo.com", "Promo", "#d64242", "web", "https://www.uniqlo.com/newsletter/unsubscribe"],
    ],
    tabViews: [
      {
        items: [
          ["stopHand", "offers@airbnb.com", "airbnb.com", "Promo", "#d64242", "web", "https://www.airbnb.com/account-settings/notifications"],
          ["stopHand", "deals@spotify.com", "spotify.com", "Promo", "#d64242", "web", "https://www.spotify.com/account/notifications/"],
          ["stopHand", "sale@uniqlo.com", "uniqlo.com", "Promo", "#d64242", "web", "https://www.uniqlo.com/newsletter/unsubscribe"],
        ],
      },
      {
        items: [
          ["stopHand", "news@medium.com", "medium.com", "Daily", "#d64242", "one-click", ""],
          ["stopHand", "hello@producthunt.com", "producthunt.com", "Weekly", "#d64242", "one-click", ""],
          ["stopHand", "digest@substack.com", "substack.com", "Digest", "#d64242", "web", "https://substack.com/settings/notifications"],
        ],
      },
      {
        items: [
          ["stopHand", "notifications@linkedin.com", "linkedin.com", "Updates", "#d64242", "web", "https://www.linkedin.com/psettings/email"],
          ["stopHand", "notify@instagram.com", "instagram.com", "Social", "#d64242", "web", "https://www.instagram.com/emails/settings/"],
          ["stopHand", "team@discord.com", "discord.com", "Community", "#d64242", "web", "https://discord.com/channels/@me"],
        ],
      },
      {
        items: [
          ["stopHand", "updates@notion.so", "notion.so", "Workspace", "#d64242", "one-click", ""],
          ["stopHand", "tips@figma.com", "figma.com", "Product", "#d64242", "web", "https://www.figma.com/settings"],
          ["stopHand", "hello@linear.app", "linear.app", "Workflow", "#d64242", "one-click", ""],
        ],
      },
    ],
  },
  inbox: {
    eyebrow: "Inbox",
    title: "Needs action",
    subtitle: "Only unresolved mail",
    metric: "5",
    copy: "Only the messages that ask for you.",
    pills: ["Reply", "Review", "Waiting"],
    actions: [
      ["Archive", "archive", "secondary", null],
      ["Remind", "bell", "secondary", null],
      ["Done", "check", "", null],
    ],
    items: [
      ["mail", "Client follow-up", "Question about launch date", "Reply", "#343a40"],
      ["receipt", "Quote approval", "Expires this Friday", "Review", "#0d8a61"],
      ["calendar", "Meeting change", "New proposed time", "Check", "#2458ff"],
    ],
  },
};

const billCancelGuides = {
  notion: {
    name: "Notion Plus",
    steps: [
      "Open Notion on desktop or web.",
      "Go to Settings, then Billing.",
      "Choose Change plan and follow the downgrade or cancel flow.",
      "Your paid features stay active until the current billing cycle ends.",
    ],
    sourceLabel: "Official Notion guide",
    sourceUrl: "https://www.notion.com/help/upgrade-or-downgrade-your-plan",
  },
  icloud: {
    name: "iCloud+",
    steps: [
      "On iPhone, open Settings.",
      "Tap your name, then Subscriptions.",
      "Choose iCloud+ under Active.",
      "Tap Cancel Subscription. Storage changes after the current billing period.",
    ],
    sourceLabel: "Official Apple guide",
    sourceUrl: "https://support.apple.com/en-us/108318",
  },
  chatgpt: {
    name: "ChatGPT Plus",
    steps: [
      "Log in to ChatGPT on the web.",
      "Open your profile menu, then Settings.",
      "Go to Billing and choose Cancel plan.",
      "Cancel at least 24 hours before the next billing date.",
    ],
    sourceLabel: "Official OpenAI guide",
    sourceUrl: "https://help.openai.com/en/articles/7232927-how-do-i-cancel-my-chatgpt-plus-subscription",
  },
};

const EMAIL_LOOKBACK_STORAGE_KEY = "oneMailEmailLookbackDays";
const DEFAULT_EMAIL_LOOKBACK_DAYS = 7;
const GMAIL_SYNC_BATCH_SIZE = 100;
const GMAIL_SYNC_MAX_MESSAGES = 200;
const GMAIL_BODY_TEXT_LIMIT = 50000;

let route = "home";
let dragState = null;
let centerPressState = null;
let idleVideoCleanup = null;
let suppressCenterClick = false;
const activePageTabs = {};
const SUBSCRIPTION_UNSUBSCRIBED_STORAGE_KEY = "oneMailUnsubscribedSenders";
const unsubscribedSubscriptionKeys = loadUnsubscribedSubscriptionKeys();
const CENTER_LONG_PRESS_MS = 320;
const CENTER_DRAG_START_DISTANCE = 18;

const aiSuggestions = [
  "Unsubscribe Product Hunt",
  "Trash Airbnb promo emails",
  "Label my travel bookings",
];

let aiMailbox = [
  {
    id: "ph-1",
    sender: "hello@producthunt.com",
    site: "producthunt.com",
    title: "Top launches this week",
    date: "Today",
    category: "newsletter",
    labels: ["Subscriptions"],
    unsubscribe: "one-click",
  },
  {
    id: "ph-2",
    sender: "hello@producthunt.com",
    site: "producthunt.com",
    title: "Your saved products",
    date: "Yesterday",
    category: "newsletter",
    labels: ["Subscriptions"],
    unsubscribe: "one-click",
  },
  {
    id: "ab-1",
    sender: "offers@airbnb.com",
    site: "airbnb.com",
    title: "Weekend stays near you",
    date: "Today",
    category: "promo",
    labels: ["Subscriptions"],
    unsubscribe: "web",
  },
  {
    id: "ab-2",
    sender: "offers@airbnb.com",
    site: "airbnb.com",
    title: "Last-minute city escapes",
    date: "Jun 26",
    category: "promo",
    labels: ["Subscriptions"],
    unsubscribe: "web",
  },
  {
    id: "delta-1",
    sender: "receipts@delta.com",
    site: "delta.com",
    title: "Flight to New York confirmed",
    date: "Jul 6",
    category: "travel",
    labels: [],
    unsubscribe: null,
  },
  {
    id: "hotel-1",
    sender: "bookings@standardhotels.com",
    site: "standardhotels.com",
    title: "Hotel check-in details",
    date: "Jul 6",
    category: "travel",
    labels: [],
    unsubscribe: null,
  },
  {
    id: "hertz-1",
    sender: "reservations@hertz.com",
    site: "hertz.com",
    title: "Rental car pickup reservation",
    date: "Jul 8",
    category: "travel",
    labels: [],
    unsubscribe: null,
  },
  {
    id: "client-1",
    sender: "maya@northstar.studio",
    site: "northstar.studio",
    title: "Question about launch date",
    date: "Today",
    category: "reply",
    labels: ["Needs Reply"],
    unsubscribe: null,
  },
];

let bookmarkInboxItems = [
  {
    sender: "Maya",
    title: "Question about launch date",
    time: "2m",
    tone: "Needs reply",
  },
  {
    sender: "Delta",
    title: "Flight to New York confirmed",
    time: "18m",
    tone: "Travel",
  },
  {
    sender: "Product Hunt",
    title: "Top launches this week",
    time: "1h",
    tone: "Newsletter",
  },
  {
    sender: "Airbnb",
    title: "Weekend stays near you",
    time: "3h",
    tone: "Promo",
  },
];

const settingsGroups = [
  {
    title: "Account",
    items: [
      ["user", "User information", "Name, email, timezone", "Alex"],
      ["user", "Profile", "Default identity and signature", "Personal"],
      ["mail", "Connected mailboxes", "Gmail and Outlook access", "2 active"],
    ],
  },
  {
    title: "Mail controls",
    items: [
      ["calendar", "Email lookback window", "How many days of email 1Mail processes", "7 days"],
    ],
  },
  {
    title: "Plan",
    items: [
      ["card", "Billing and subscription", "Plan, invoices, payment method", "1Mail Plus"],
    ],
  },
];

const settingsOptionDetails = {
  "User information": {
    summary: "Review the identity 1Mail uses for mailbox context, timezone, and account-level display.",
    statusLabel: "Profile owner",
    controls: ["Display name", "Primary email", "Timezone"],
    action: "Review info",
  },
  Profile: {
    summary: "Choose the default writing identity, signature style, and how formal 1Mail should sound when helping draft replies.",
    statusLabel: "Default profile",
    controls: ["Personal identity", "Reply signature", "Tone preference"],
    action: "Edit profile",
  },
  "Connected mailboxes": {
    summary: "Manage Gmail and Outlook access. Connected accounts can be processed for summaries, classifications, and requested actions.",
    statusLabel: "Mailbox access",
    controls: ["Gmail", "Outlook", "Latest-week sync"],
    action: "Manage access",
  },
  "Email lookback window": {
    summary: "Choose how far back 1Mail should read email text when syncing and classifying your mailbox. Shorter windows are faster and quieter.",
    statusLabel: "Current range",
    controls: ["7 days", "14 days", "30 days", "90 days"],
    action: "Save range",
  },
  "Billing and subscription": {
    summary: "Manage the 1Mail plan, invoices, payment method, and usage limits for AI-powered mailbox parsing.",
    statusLabel: "Current plan",
    controls: ["1Mail Plus", "Invoices", "Payment method"],
    action: "Manage plan",
  },
};

function getEmailLookbackDays() {
  const value = Number(localStorage.getItem(EMAIL_LOOKBACK_STORAGE_KEY));
  return [7, 14, 30, 90].includes(value) ? value : DEFAULT_EMAIL_LOOKBACK_DAYS;
}

function setEmailLookbackDays(days) {
  const normalized = [7, 14, 30, 90].includes(Number(days)) ? Number(days) : DEFAULT_EMAIL_LOOKBACK_DAYS;
  localStorage.setItem(EMAIL_LOOKBACK_STORAGE_KEY, String(normalized));
  return normalized;
}

function getEmailLookbackLabel() {
  return `${getEmailLookbackDays()} days`;
}

function getGmailSyncQuery() {
  return `newer_than:${getEmailLookbackDays()}d`;
}

let nextAiActionId = 1;
const pendingAiActions = {};
let inboxBookmarkDrag = null;
let suppressInboxBookmarkClick = false;
let gmailConnectStatus = "";
let gmailSyncInFlight = false;
const makeSectionIds = new Set(["calendar", "starred", "bills", "security", "subscriptions", "logins"]);
const makeExpandedCards = {};
const makeDeletedCards = new Set();
let makeUnsubscribeModal = null;

const makeSectionMeta = {
  calendar: {
    title: "APPOINTMENT",
    subtitle: "Let time arrive with less friction.",
    metricColor: "#22c88b",
    tabs: ["Appointments", "Travel"],
    empty: "No appointment emails matched this tab.",
  },
  starred: {
    title: "STARRED",
    subtitle: "Important email, kept close.",
    metricColor: "#efbd38",
    tabs: ["Starred"],
    empty: "No starred emails matched this time frame.",
  },
  bills: {
    title: "BILLS",
    subtitle: "Let's untangle your finances.",
    metricColor: "#22c88b",
    tabs: ["Recurring", "One-time", "E-transfer"],
    empty: "No money emails matched this bill tab.",
  },
  security: {
    title: "SECURITY",
    subtitle: "Keep the door closed to what feels wrong.",
    metricColor: "#fb454f",
    tabs: ["Domain mismatch", "Urgent payment", "Risky link"],
    empty: "No suspicious emails matched this view.",
  },
  subscriptions: {
    title: "SUBSCRIPTION",
    subtitle: "Let's cut down the noise.",
    metricColor: "#22c88b",
    tabs: ["Promos", "Newsletter", "Social", "Productivity"],
    empty: "No subscription senders matched this category.",
  },
  logins: {
    title: "TRACES",
    subtitle: "Let's hide our footsteps",
    metricColor: "#22c88b",
    tabs: [],
    empty: "No login confirmation traces matched the latest week.",
  },
};

const makeItemDetails = {
  bills: {
    "Notion Plus": {
      body:
        "Your Notion Plus workspace renews on Jul 2. The current billing cycle includes team workspace access, AI add-ons, and monthly storage.",
      attachments: ["notion-invoice-jul.pdf"],
    },
    "iCloud+": {
      body: "Apple confirms your iCloud+ storage plan renews on Jul 5. This charge keeps additional iCloud storage active for the account.",
      attachments: ["No attachments"],
    },
    "ChatGPT Plus": {
      body: "Your ChatGPT Plus plan renews on Jul 11. The billing email includes the monthly subscription amount and account plan details.",
      attachments: ["No attachments"],
    },
    "Summer concert tickets": {
      body:
        "Ticketmaster confirmed your summer concert ticket purchase. Mobile entry is required and doors open at 7:00 PM.",
      attachments: ["ticketmaster-order.pdf", "mobile-entry.pkpass"],
    },
    "Comedy night booking": {
      body: "Eventbrite confirmed your comedy night booking. Seat B12 is reserved and the show starts at 8:30 PM.",
      attachments: ["eventbrite-receipt.pdf"],
    },
    "Indie theater show": {
      body: "The box office receipt confirms a one-time ticket purchase. No recurring charge was detected in the email.",
      attachments: ["No attachments"],
    },
  },
  calendar: {
    "Dentist appointment": {
      body:
        "Your appointment reminder from Downtown Dental confirms tomorrow at 3:00 PM. Arrive 10 minutes early for registration.",
      attachments: ["appointment.ics"],
    },
    "Design review": {
      body: "The design review invite is scheduled for Friday at 9:30 AM. The email includes calendar invite details.",
      attachments: ["design-review.ics"],
    },
    "Eye exam": {
      body: "The clinic reminder confirms your eye exam on Jul 9 at 2:00 PM.",
      attachments: ["appointment.ics"],
    },
    "Flight to New York": {
      body: "Delta confirms your flight to New York. Check-in opens before departure and the booking reference is in the email.",
      attachments: ["boarding-pass.pdf"],
    },
    "Hotel check-in": {
      body: "The hotel booking email confirms check-in time and reservation details for your stay.",
      attachments: ["hotel-confirmation.pdf"],
    },
    "Rental car pickup": {
      body: "Hertz confirms your rental car pickup time and reservation location.",
      attachments: ["rental-confirmation.pdf"],
    },
  },
  security: {
    "PayPal account notice": {
      body:
        "This message claims account action is required, but the sender domain does not match PayPal. Avoid clicking links until verified.",
      attachments: ["No attachments"],
    },
    "Amazon receipt": {
      body: "The sender passed the basic authentication checks and does not show obvious spoofing signs.",
      attachments: ["No attachments"],
    },
  },
  logins: {
    "New Google sign-in": {
      body:
        "Google reported a new sign-in from a remote device. If this was not you, review account security immediately.",
      attachments: ["No attachments"],
    },
    "Apple ID verification": {
      body: "Apple sent a two-factor confirmation notice. If you did not request it, review your Apple ID sign-in activity.",
      attachments: ["No attachments"],
    },
    "GitHub recovery code": {
      body: "GitHub sent a one-time access notice related to account recovery or sign-in verification.",
      attachments: ["No attachments"],
    },
  },
};

function render() {
  if (route !== "home") cleanupIdleBackgroundVideo();
  if (route === "home") {
    renderHome();
    showUserAgreementIfNeeded();
    return;
  }
  if (route === "ai") {
    renderAiPage();
    showUserAgreementIfNeeded();
    return;
  }
  if (route === "settings") {
    renderSettingsPage();
    showUserAgreementIfNeeded();
    return;
  }
  renderPage(route);
  showUserAgreementIfNeeded();
}

function renderHome() {
  app.classList.remove("is-page-view", "is-make-section-view");
  app.classList.add("is-home-view");
  const sliceAngle = 360 / homeModules.length;
  const mailboxAvatar = getMailboxAvatar();
  app.innerHTML = `
    <div class="view home-view">
      <header class="topbar">
        <div class="brand-lockup">
          <h1 class="title">1MAIL</h1>
          <button class="title-menu-button" type="button" data-open="settings" aria-label="Open app settings">
            <span class="title-menu-lines" aria-hidden="true"><span></span><span></span><span></span></span>
            <span class="sr-only">App settings</span>
          </button>
        </div>
        <button
          class="mailbox-profile-button"
          type="button"
          data-open="settings"
          aria-label="Current mailbox: ${escapeAttribute(mailboxAvatar.email)}. Open settings."
          title="${escapeAttribute(mailboxAvatar.email)}"
          style="--mailbox-color: ${mailboxAvatar.color}"
        >
          ${icons.user}
        </button>
      </header>

      <div class="hub-stage" id="hubStage">
        <div class="idle-vortex idle-media-layer" aria-hidden="true">
          <video class="idle-media-video" autoplay muted loop playsinline preload="metadata">
            <source src="./assets/mainpage-bh-animation.mp4" type="video/mp4" />
          </video>
        </div>
        <div class="wheel-ring" id="wheelRing">
          ${renderWheelSurface(sliceAngle, homeModules)}
          <div class="unlock-line" id="unlockLine" aria-hidden="true"></div>
          ${homeModules
            .map(
              (module) => `
                <button
                  class="module-node"
                  type="button"
                  data-module="${module.id}"
                  data-label="${module.label}"
                  style="--angle: ${getModuleAngle(module.id)}deg; --counter-angle: -${getModuleAngle(module.id)}deg; --accent: ${module.accent}; --icon-color: ${module.iconColor}"
                  aria-label="${module.label}"
                >
                  <span class="node-icon">${icons[module.icon]}</span>
                </button>
              `,
            )
            .join("")}
          <button class="center-control" id="centerControl" type="button" aria-label="1Mail AI">
            <span class="center-mark">
              <strong id="centerLabel">1Mail</strong>
              <span id="centerHint" class="center-hint">Ask Anything</span>
            </span>
          </button>
        </div>
      </div>

      ${renderInboxBookmark()}
    </div>
  `;

  const center = document.querySelector("#centerControl");
  const stage = document.querySelector("#hubStage");
  const line = document.querySelector("#unlockLine");
  const wheelRing = document.querySelector("#wheelRing");
  const idleVideo = document.querySelector(".idle-media-video");
  setupInboxBookmark();
  setupIdleBackgroundVideo(idleVideo);

  center.addEventListener("pointerdown", (event) => startCenterPress(event, center, stage, line));
  center.addEventListener("click", () => {
    if (suppressCenterClick) {
      suppressCenterClick = false;
      return;
    }
    if (center.dataset.pointerHandled === "true") {
      center.dataset.pointerHandled = "false";
      return;
    }
    openRoute("ai");
  });
  center.addEventListener("pointerenter", () => {
    if (!dragState) setWheelFocus(null);
  });
  center.addEventListener("focus", () => {
    if (!dragState) setWheelFocus(null);
  });

  document.querySelectorAll("[data-module]").forEach((node) => {
    node.addEventListener("pointerenter", () => {
      if (isHomeWheelExpanded()) setWheelFocus(node.dataset.module, "hover");
    });
    node.addEventListener("pointerleave", () => {
      if (!dragState) setWheelFocus(null);
    });
    node.addEventListener("focus", () => {
      if (isHomeWheelExpanded()) setWheelFocus(node.dataset.module, "hover");
    });
    node.addEventListener("blur", () => {
      if (!dragState) setWheelFocus(null);
    });
    node.addEventListener("click", () => {
      if (isHomeWheelExpanded()) openRoute(node.dataset.module);
    });
  });

  wheelRing.addEventListener("pointermove", (event) => {
    if (dragState) return;
    if (!isHomeWheelExpanded()) {
      setWheelFocus(null);
      return;
    }
    const module = getModuleFromPoint(event.clientX, event.clientY);
    setWheelFocus(module?.id || null, module ? "hover" : "idle");
  });
  wheelRing.addEventListener("pointerleave", () => {
    if (!dragState) setWheelFocus(null);
  });
  wheelRing.addEventListener("click", (event) => {
    if (event.target.closest("#centerControl, .module-node")) return;
    if (!isHomeWheelExpanded()) return;
    const module = getModuleFromPoint(event.clientX, event.clientY);
    if (module) openRoute(module.id);
  });

  document.querySelectorAll("[data-wheel-module]").forEach((segment) => {
    segment.addEventListener("pointerenter", () => {
      if (isHomeWheelExpanded()) setWheelFocus(segment.dataset.wheelModule, "hover");
    });
    segment.addEventListener("pointerleave", () => {
      if (!dragState) setWheelFocus(null);
    });
    segment.addEventListener("click", (event) => {
      event.stopPropagation();
      if (!isHomeWheelExpanded()) return;
      openRoute(segment.dataset.wheelModule);
    });
  });

  document.querySelectorAll("[data-open]").forEach((button) => {
    button.addEventListener("click", () => openRoute(button.dataset.open));
  });
  fitOneLineText();
}

function isHomeWheelExpanded() {
  return Boolean(document.querySelector("#hubStage")?.classList.contains("is-wheel-expanded"));
}

function setupIdleBackgroundVideo(video) {
  cleanupIdleBackgroundVideo();
  if (!video) return;

  const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const syncPlayback = () => {
    if (document.hidden || motionQuery.matches) {
      video.pause();
      return;
    }
    video.play().catch(() => {
      video.pause();
    });
  };

  document.addEventListener("visibilitychange", syncPlayback);
  motionQuery.addEventListener?.("change", syncPlayback);
  idleVideoCleanup = () => {
    document.removeEventListener("visibilitychange", syncPlayback);
    motionQuery.removeEventListener?.("change", syncPlayback);
  };
  syncPlayback();
}

function cleanupIdleBackgroundVideo() {
  if (!idleVideoCleanup) return;
  idleVideoCleanup();
  idleVideoCleanup = null;
}

function renderInboxBookmark() {
  const bookmarkPrompt = getInboxBookmarkPrompt();
  return `
    <footer class="home-footer">
      <section class="inbox-bookmark" id="inboxBookmark">
        <div class="bookmark-copy">
          <strong>${bookmarkPrompt}</strong>
        </div>
        <button class="cat-peek-handle" id="catInboxHandle" type="button" aria-label="Pull up normal inbox">
          <span class="cat-peek" aria-hidden="true">
            <span class="cat-eye cat-eye-left"></span>
            <span class="cat-eye cat-eye-right"></span>
            <span class="cat-whisker cat-whisker-left top"></span>
            <span class="cat-whisker cat-whisker-left bottom"></span>
            <span class="cat-whisker cat-whisker-right top"></span>
            <span class="cat-whisker cat-whisker-right bottom"></span>
          </span>
        </button>
      </section>
    </footer>
  `;
}

function getMailboxAvatar() {
  const profile = getStoredGmailProfile();
  const email = profile?.emailAddress || "alex@example.com";
  return {
    color: getMailboxColor(email),
    email,
    initial: getMailboxInitial(email),
  };
}

function getMailboxInitial(email = "") {
  const localPart = email.split("@")[0] || email;
  const firstLetter = localPart.match(/[a-z0-9]/i)?.[0] || "1";
  return firstLetter.toUpperCase();
}

function getMailboxColor(email = "") {
  const palette = ["#2458ff", "#0d8a61", "#d64242", "#6b4be8", "#b87506", "#28725a"];
  let hash = 0;
  for (const character of email) {
    hash = (hash * 31 + character.charCodeAt(0)) % palette.length;
  }
  return palette[hash];
}

function getInboxBookmarkPrompt() {
  const unreadCount = Number(pages.today.metric) || 0;
  if (unreadCount < 5) return "Inbox is quiet, time for some snacks, meow~";
  if (unreadCount <= 15) return "Inbox is busy, time for a shower, meow~";
  return "Inbox is hot, time for some attention, meow~";
}

function setupInboxBookmark() {
  const bookmark = document.querySelector("#inboxBookmark");
  const handle = document.querySelector("#catInboxHandle");
  if (!bookmark || !handle) return;

  handle.addEventListener("click", () => {
    if (suppressInboxBookmarkClick) {
      suppressInboxBookmarkClick = false;
      return;
    }
    openRoute("inbox");
  });
  bookmark.addEventListener("wheel", (event) => {
    if (event.deltaY < -8) {
      openRoute("inbox");
    }
  });
  if (window.PointerEvent) {
    bookmark.addEventListener("pointerdown", (event) => startInboxBookmarkPull(event, bookmark, "pointer"));
  } else {
    bookmark.addEventListener("mousedown", (event) => startInboxBookmarkPull(event, bookmark, "mouse"));
    bookmark.addEventListener("touchstart", (event) => startInboxBookmarkPull(event, bookmark, "touch"), {
      passive: false,
    });
  }
}

function startInboxBookmarkPull(event, bookmark, inputType) {
  if (inboxBookmarkDrag) return;
  event.preventDefault();
  const point = getEventPoint(event);
  inboxBookmarkDrag = {
    inputType,
    pointerId: event.pointerId ?? null,
    startY: point.y,
    bookmark,
  };

  if (inputType === "pointer") {
    bookmark.setPointerCapture(event.pointerId);
    bookmark.addEventListener("pointerup", endInboxBookmarkPull, { once: true });
    bookmark.addEventListener("pointercancel", cancelInboxBookmarkPull, { once: true });
    window.addEventListener("pointermove", updateInboxBookmarkPull);
    window.addEventListener("pointerup", endInboxBookmarkPull, { once: true });
  } else if (inputType === "mouse") {
    window.addEventListener("mousemove", updateInboxBookmarkPull);
    window.addEventListener("mouseup", endInboxBookmarkPull, { once: true });
  } else {
    window.addEventListener("touchmove", updateInboxBookmarkPull, { passive: false });
    window.addEventListener("touchend", endInboxBookmarkPull, { once: true });
    window.addEventListener("touchcancel", cancelInboxBookmarkPull, { once: true });
  }
}

function updateInboxBookmarkPull(event) {
  if (!inboxBookmarkDrag) return;
  if (inboxBookmarkDrag.inputType === "pointer" && event.pointerId !== inboxBookmarkDrag.pointerId) return;
  if (event.cancelable) event.preventDefault();
  const point = getEventPoint(event);
  const deltaY = Math.min(0, point.y - inboxBookmarkDrag.startY);
  inboxBookmarkDrag.bookmark.style.setProperty("--pull-distance", `${Math.max(deltaY, -112)}px`);
  inboxBookmarkDrag.bookmark.classList.toggle("is-pulling", deltaY < -6);
}

function endInboxBookmarkPull(event) {
  if (!inboxBookmarkDrag) return;
  if (inboxBookmarkDrag.inputType === "pointer" && event.pointerId !== inboxBookmarkDrag.pointerId) return;
  if (event.cancelable) event.preventDefault();
  const point = getEventPoint(event);
  const deltaY = point.y - inboxBookmarkDrag.startY;
  resetInboxBookmarkPull();
  if (deltaY < -24) {
    suppressInboxBookmarkClick = true;
    openRoute("inbox");
    window.setTimeout(() => {
      suppressInboxBookmarkClick = false;
    }, 350);
  }
}

function cancelInboxBookmarkPull() {
  resetInboxBookmarkPull();
}

function resetInboxBookmarkPull() {
  if (!inboxBookmarkDrag) return;
  inboxBookmarkDrag.bookmark.style.removeProperty("--pull-distance");
  inboxBookmarkDrag.bookmark.classList.remove("is-pulling");
  window.removeEventListener("pointermove", updateInboxBookmarkPull);
  window.removeEventListener("pointerup", endInboxBookmarkPull);
  window.removeEventListener("mousemove", updateInboxBookmarkPull);
  window.removeEventListener("mouseup", endInboxBookmarkPull);
  window.removeEventListener("touchmove", updateInboxBookmarkPull);
  window.removeEventListener("touchend", endInboxBookmarkPull);
  window.removeEventListener("touchcancel", cancelInboxBookmarkPull);
  inboxBookmarkDrag = null;
}

function renderWheelSurface(sliceAngle, items = homeModules) {
  return `
    <svg class="wheel-surface" viewBox="0 0 ${wheel.size} ${wheel.size}" aria-hidden="true">
      <defs>
        <radialGradient id="homeSegmentGradient" gradientUnits="userSpaceOnUse" cx="${wheel.center}" cy="${wheel.center}" r="${wheel.outerRadius}">
          <stop offset="0%" stop-color="#05040c" stop-opacity="1"></stop>
          <stop offset="34%" stop-color="#05040c" stop-opacity="0.98"></stop>
          <stop offset="43%" stop-color="#151020" stop-opacity="0.84"></stop>
          <stop offset="58%" stop-color="#7a684f" stop-opacity="0.42"></stop>
          <stop offset="100%" stop-color="#f6dfaa" stop-opacity="0.56"></stop>
        </radialGradient>
        <radialGradient id="homeSegmentActiveGradient" gradientUnits="userSpaceOnUse" cx="${wheel.center}" cy="${wheel.center}" r="${wheel.outerRadius}">
          <stop offset="0%" stop-color="#05040c" stop-opacity="1"></stop>
          <stop offset="34%" stop-color="#05040c" stop-opacity="0.98"></stop>
          <stop offset="43%" stop-color="#18111d" stop-opacity="0.82"></stop>
          <stop offset="58%" stop-color="#a67f35" stop-opacity="0.54"></stop>
          <stop offset="100%" stop-color="#f4bf45" stop-opacity="0.82"></stop>
        </radialGradient>
      </defs>
      ${items
        .map((module) => {
          const angle = getModuleAngle(module.id);
          const start = angle - sliceAngle / 2 + wheel.segmentGapDegrees / 2;
          const end = angle + sliceAngle / 2 - wheel.segmentGapDegrees / 2;
          const segmentPath = describeSegment(start, end);
          return `
            <path class="wheel-segment" data-wheel-module="${module.id}" d="${segmentPath}" style="--fill: ${module.wheelColor}; --active-fill: ${module.activeWheelColor}; --icon-color: ${module.iconColor}"></path>
            <path class="wheel-segment-border" data-wheel-module="${module.id}" d="${segmentPath}"></path>
            <path class="wheel-segment-highlight" d="${segmentPath}"></path>
          `;
        })
        .join("")}
    </svg>
  `;
}

function getModuleAngle(moduleId) {
  const index = homeModules.findIndex((module) => module.id === moduleId);
  return index < 0 ? 0 : index * (360 / homeModules.length);
}

function describeSegment(startAngle, endAngle) {
  const sliceSpan = endAngle - startAngle;
  const cornerDegrees = Math.min((wheel.cornerRadius / wheel.outerRadius) * (180 / Math.PI), sliceSpan / 5);
  const outerStartEdge = polarPoint(wheel.outerRadius - wheel.cornerRadius, startAngle);
  const outerStartControl = polarPoint(wheel.outerRadius, startAngle);
  const outerStartRounded = polarPoint(wheel.outerRadius, startAngle + cornerDegrees);
  const outerEndRounded = polarPoint(wheel.outerRadius, endAngle - cornerDegrees);
  const outerEndControl = polarPoint(wheel.outerRadius, endAngle);
  const outerEndEdge = polarPoint(wheel.outerRadius - wheel.cornerRadius, endAngle);
  const innerEnd = polarPoint(wheel.innerRadius, endAngle);
  const innerStart = polarPoint(wheel.innerRadius, startAngle);
  const largeArc = sliceSpan > 180 ? 1 : 0;

  return [
    `M ${innerStart.x} ${innerStart.y}`,
    `L ${outerStartEdge.x} ${outerStartEdge.y}`,
    `Q ${outerStartControl.x} ${outerStartControl.y} ${outerStartRounded.x} ${outerStartRounded.y}`,
    `A ${wheel.outerRadius} ${wheel.outerRadius} 0 ${largeArc} 1 ${outerEndRounded.x} ${outerEndRounded.y}`,
    `Q ${outerEndControl.x} ${outerEndControl.y} ${outerEndEdge.x} ${outerEndEdge.y}`,
    `L ${innerEnd.x} ${innerEnd.y}`,
    `A ${wheel.innerRadius} ${wheel.innerRadius} 0 ${largeArc} 0 ${innerStart.x} ${innerStart.y}`,
    "Z",
  ].join(" ");
}

function polarPoint(radius, angle) {
  const radians = ((angle - 90) * Math.PI) / 180;
  return {
    x: round(wheel.center + radius * Math.cos(radians)),
    y: round(wheel.center + radius * Math.sin(radians)),
  };
}

function round(value) {
  return Math.round(value * 1000) / 1000;
}

function startCenterPress(event, center, stage, line) {
  if (dragState || centerPressState) return;
  if (event.pointerType === "mouse" && event.button !== 0) return;
  event.preventDefault();
  const centerRect = center.getBoundingClientRect();
  const origin = {
    x: centerRect.left + centerRect.width / 2,
    y: centerRect.top + centerRect.height / 2,
  };
  const point = getEventPoint(event);

  centerPressState = {
    pointerId: event.pointerId,
    origin,
    maxDistance: 0,
    center,
    stage,
    line,
    latestPoint: point,
    longPressStarted: false,
    timer: window.setTimeout(() => startCenterLongPress(), CENTER_LONG_PRESS_MS),
  };

  center.setPointerCapture?.(event.pointerId);
  center.addEventListener("pointermove", updateCenterPress);
  center.addEventListener("pointerup", endCenterPress, { once: true });
  center.addEventListener("pointercancel", cancelCenterPress, { once: true });
  window.addEventListener("pointermove", updateCenterPress);
  window.addEventListener("pointerup", endCenterPress, { once: true });
  window.addEventListener("pointercancel", cancelCenterPress, { once: true });
}

function updateCenterPress(event) {
  if (!centerPressState || event.pointerId !== centerPressState.pointerId) return;
  if (event.cancelable) event.preventDefault();
  const point = getEventPoint(event);
  const dx = point.x - centerPressState.origin.x;
  const dy = point.y - centerPressState.origin.y;
  const distance = Math.hypot(dx, dy);

  centerPressState.latestPoint = point;
  centerPressState.maxDistance = Math.max(centerPressState.maxDistance, distance);

  if (!centerPressState.longPressStarted && distance > CENTER_DRAG_START_DISTANCE) {
    startCenterLongPress(point);
  }
  if (centerPressState.longPressStarted) {
    updateDragFromPoint(point.x, point.y);
  }
}

function startCenterLongPress(point = centerPressState?.latestPoint) {
  if (!centerPressState || centerPressState.longPressStarted || dragState) return;
  window.clearTimeout(centerPressState.timer);
  centerPressState.longPressStarted = true;
  centerPressState.stage.classList.add("is-wheel-expanded");
  vibrate(8);

  dragState = {
    pointerId: centerPressState.pointerId,
    inputType: "pointer",
    origin: centerPressState.origin,
    maxDistance: centerPressState.maxDistance,
    target: null,
    center: centerPressState.center,
    stage: centerPressState.stage,
    line: centerPressState.line,
  };

  dragState.center.classList.add("is-dragging");
  dragState.line.classList.add("is-visible");
  if (point) {
    updateDragFromPoint(point.x, point.y);
  }
}

function endCenterPress(event) {
  if (!centerPressState || event.pointerId !== centerPressState.pointerId) return;
  if (event.cancelable) event.preventDefault();

  const wasLongPress = centerPressState.longPressStarted;
  const center = centerPressState.center;
  center.dataset.pointerHandled = "true";

  cleanupCenterPress();

  if (wasLongPress) {
    endDrag(event);
    return;
  }

  openRoute("ai");
}

function cancelCenterPress(event) {
  if (centerPressState && event?.pointerId !== undefined && event.pointerId !== centerPressState.pointerId) return;
  const wasLongPress = centerPressState?.longPressStarted;
  cleanupCenterPress();
  if (wasLongPress) cancelDrag();
}

function cleanupCenterPress() {
  if (!centerPressState) return;
  window.clearTimeout(centerPressState.timer);
  centerPressState.center.removeEventListener("pointermove", updateCenterPress);
  centerPressState.center.removeEventListener("pointerup", endCenterPress);
  centerPressState.center.removeEventListener("pointercancel", cancelCenterPress);
  window.removeEventListener("pointermove", updateCenterPress);
  window.removeEventListener("pointerup", endCenterPress);
  window.removeEventListener("pointercancel", cancelCenterPress);
  centerPressState = null;
}

function updateDrag(event) {
  if (!dragState) return;
  if (dragState.inputType === "pointer" && event.pointerId !== dragState.pointerId) return;
  if (event.cancelable) event.preventDefault();
  const point = getEventPoint(event);
  updateDragFromPoint(point.x, point.y);
}

function updateDragFromPoint(x, y) {
  if (!dragState) return;
  const dx = x - dragState.origin.x;
  const dy = y - dragState.origin.y;
  const distance = Math.hypot(dx, dy);
  const angle = Math.atan2(dy, dx) * (180 / Math.PI);
  const width = Math.min(distance, 154);
  dragState.maxDistance = Math.max(dragState.maxDistance, distance);

  dragState.line.style.width = `${width}px`;
  dragState.line.style.transform = `rotate(${angle}deg)`;

  const selected = getNearestModule(x, y);
  const shouldSelect = selected && distance > 58;
  dragState.target = shouldSelect ? selected.dataset.module : null;

  document.querySelectorAll(".module-node").forEach((node) => {
    node.classList.toggle("is-target", shouldSelect && node === selected);
  });
  setWheelFocus(dragState.target, shouldSelect ? "drag" : "idle");
}

function getNearestModule(x, y) {
  const module = getModuleFromPoint(x, y);
  if (!module) return null;
  return document.querySelector(`[data-module="${module.id}"]`);
}

function getModuleFromPoint(x, y) {
  const wheelRing = document.querySelector("#wheelRing");
  if (!wheelRing) return null;

  const rect = wheelRing.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  const dx = x - cx;
  const dy = y - cy;
  const radius = Math.hypot(dx, dy);
  const scale = rect.width / wheel.size;
  const inner = wheel.innerRadius * scale;
  const outer = wheel.outerRadius * scale;

  if (radius < inner * 0.72 || radius > outer * 1.05) return null;

  const sliceAngle = 360 / homeModules.length;
  const angle = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
  const normalized = (angle + 360) % 360;
  const index = Math.round(normalized / sliceAngle) % homeModules.length;
  return homeModules[index];
}

function endDrag(event) {
  if (!dragState) return;
  if (dragState.inputType === "pointer" && event.pointerId !== dragState.pointerId) return;
  if (event.cancelable) event.preventDefault();
  const target = dragState.target;
  const moved = dragState.maxDistance > 10;
  resetDrag();
  suppressCenterClick = moved;
  if (target) {
    vibrate(12);
    openRoute(target);
  }
}

function cancelDrag() {
  resetDrag();
}

function resetDrag() {
  if (!dragState) return;
  dragState.stage.classList.remove("is-wheel-expanded");
  dragState.center.classList.remove("is-dragging");
  dragState.line.classList.remove("is-visible");
  dragState.line.style.width = "0";
  dragState.line.style.transform = "rotate(0deg)";
  document.querySelectorAll(".module-node").forEach((node) => node.classList.remove("is-target"));
  setWheelFocus(null);
  dragState.center.removeEventListener("pointermove", updateDrag);
  window.removeEventListener("pointermove", updateDrag);
  window.removeEventListener("pointerup", endDrag);
  window.removeEventListener("pointercancel", cancelDrag);
  window.removeEventListener("mousemove", updateDrag);
  window.removeEventListener("mouseup", endDrag);
  window.removeEventListener("touchmove", updateDrag);
  window.removeEventListener("touchend", endDrag);
  window.removeEventListener("touchcancel", cancelDrag);
  dragState = null;
}

function setWheelFocus(moduleId, mode = "idle") {
  const module = modules.find((item) => item.id === moduleId);
  const center = document.querySelector("#centerControl");
  const label = document.querySelector("#centerLabel");
  const hint = document.querySelector("#centerHint");
  if (!center || !label || !hint) return;

  if (!module) {
    document.querySelectorAll("[data-wheel-module]").forEach((segment) => {
      segment.classList.remove("is-target");
    });
    document.querySelectorAll(".module-node").forEach((node) => {
      node.classList.remove("is-target");
    });
    center.style.removeProperty("--focus-color");
    label.textContent = "1Mail";
    label.style.removeProperty("--label-size");
    hint.textContent = "Ask Anything";
    fitOneLineText(center);
    return;
  }

  center.style.setProperty("--focus-color", module.accent);
  document.querySelectorAll("[data-wheel-module]").forEach((segment) => {
    segment.classList.toggle("is-target", segment.dataset.wheelModule === module.id);
  });
  document.querySelectorAll(".module-node").forEach((node) => {
    node.classList.toggle("is-target", node.dataset.module === module.id);
  });
  label.textContent = module.label;
  label.style.setProperty("--label-size", getCenterLabelSize(module.label));
  hint.textContent = module.wheelDescription || pages[module.id]?.subtitle || "Section";
  fitOneLineText(center);
}

function getCenterLabelSize(label) {
  const length = label.length;
  if (length > 12) return "10px";
  if (length > 9) return "12px";
  if (length > 7) return "15.5px";
  if (length > 6) return "16px";
  return "19px";
}

function fitOneLineText(root = document) {
  const scopedElements = root.querySelectorAll ? Array.from(root.querySelectorAll(".fit-one-line")) : [];
  const elements = root.matches?.(".fit-one-line") ? [root, ...scopedElements] : scopedElements;

  elements.forEach((element) => {
    element.style.removeProperty("font-size");
    const baseSize = Number(element.dataset.fitBase || parseFloat(getComputedStyle(element).fontSize) || 14);
    const minSize = Number(element.dataset.fitMin || 8.5);
    element.dataset.fitBase = String(baseSize);
    element.style.fontSize = `${baseSize}px`;

    if (!element.clientWidth || element.scrollWidth <= element.clientWidth) return;

    let nextSize = baseSize;
    while (element.scrollWidth > element.clientWidth && nextSize > minSize) {
      nextSize -= 0.5;
      element.style.fontSize = `${nextSize}px`;
    }
    element.title = element.textContent.trim();
  });
}

function getEventPoint(event) {
  const touch = event.changedTouches?.[0] || event.touches?.[0];
  if (touch) {
    return { x: touch.clientX, y: touch.clientY };
  }
  return { x: event.clientX, y: event.clientY };
}

function renderSettingsPage() {
  app.classList.remove("is-home-view");
  app.classList.remove("is-make-section-view");
  app.classList.add("is-page-view");
  const profile = getStoredGmailProfile();
  const displayEmail = profile?.emailAddress || "alex@example.com";
  const displayName = profile ? displayEmail.split("@")[0] : "Alex Chen";

  app.innerHTML = `
    <div class="view page settings-page">
      <header class="page-header">
        <button class="icon-button" type="button" data-back aria-label="Back">${icons.arrowLeft}</button>
        <div class="page-heading">
          <p class="eyebrow">Settings</p>
          <h1 class="page-title">Your 1Mail</h1>
          <p class="page-subtitle">Control what the assistant can see, save, and change.</p>
        </div>
      </header>

      <section class="settings-summary">
        <span class="settings-avatar">${icons.user}</span>
        <span>
          <strong>${escapeHtml(displayName)}</strong>
          <span>${escapeHtml(displayEmail)}</span>
        </span>
      </section>

      <section class="settings-scroll">
        ${renderGmailConnectPanel()}

        ${settingsGroups
          .map(
            (group) => `
              <section class="settings-group">
                <h2>${group.title}</h2>
                <div class="settings-list">
                  ${group.items
                    .map(
                      ([icon, title, subtitle, status]) => {
                        const effectiveStatus = title === "Email lookback window" ? getEmailLookbackLabel() : status;
                        return `
                          <button
                            class="settings-row"
                            type="button"
                            data-setting-option="${escapeAttribute(title)}"
                            aria-label="Open ${escapeAttribute(title)} settings"
                          >
                            <span class="settings-row-icon">${icons[icon]}</span>
                            <span class="settings-row-main">
                              <strong>${title}</strong>
                              <span>${subtitle}</span>
                            </span>
                            <span class="settings-row-status">${effectiveStatus}</span>
                          </button>
                        `;
                      },
                    )
                    .join("")}
                </div>
              </section>
            `,
          )
          .join("")}

        <section class="settings-group feedback-card">
          <h2>Be a powerful user</h2>
          <p>Tell us what felt useful, confusing, too much, or missing. Product ideas are welcome here.</p>
          <form class="feedback-form">
            <label class="sr-only" for="feedbackInput">Suggest an app improvement</label>
            <textarea id="feedbackInput" placeholder="I wish 1Mail could..." rows="4"></textarea>
            <button type="submit">${icons.message}<span>Send feedback</span></button>
          </form>
          <p class="feedback-status" role="status" aria-live="polite"></p>
        </section>
      </section>
    </div>
  `;

  document.querySelector("[data-back]").addEventListener("click", () => openRoute("home"));
  const gmailButton = document.querySelector("[data-gmail-connect]");
  if (gmailButton) {
    gmailButton.addEventListener("click", startGmailOAuth);
  }
  const gmailProcessButton = document.querySelector("[data-gmail-process]");
  if (gmailProcessButton) {
    gmailProcessButton.addEventListener("click", () => processLatestWeekGmail({ silent: false }));
  }
  document.querySelectorAll("[data-setting-option]").forEach((button) => {
    button.addEventListener("click", () => openSettingsOption(button.dataset.settingOption));
  });
  document.querySelector(".feedback-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const input = document.querySelector("#feedbackInput");
    const status = document.querySelector(".feedback-status");
    if (!input.value.trim()) {
      status.textContent = "Write a thought first, even a tiny one.";
      return;
    }
    input.value = "";
    status.textContent = "Sent. Thank you. This is exactly how 1Mail gets kinder.";
  });
}

function openSettingsOption(title = "") {
  const detail = settingsOptionDetails[title] || {
    summary: "This setting is ready for prototype review.",
    statusLabel: "Current setting",
    controls: ["Enabled", "Ask before changing", "Keep history"],
    action: "Done",
  };
  const row = settingsGroups.flatMap((group) => group.items).find((item) => item[1] === title) || [];
  const [icon = "settings", itemTitle = title, subtitle = "", status = "On"] = row;
  const effectiveStatus = title === "Email lookback window" ? getEmailLookbackLabel() : status;
  document.querySelector(".settings-detail-overlay")?.remove();
  const overlay = document.createElement("div");
  overlay.className = "settings-detail-overlay";
  overlay.innerHTML = `
    <section class="settings-detail-sheet" role="dialog" aria-modal="true" aria-labelledby="settingsDetailTitle">
      <header class="settings-detail-header">
        <span class="settings-row-icon">${icons[icon] || icons.settings}</span>
        <span>
          <strong id="settingsDetailTitle">${escapeHtml(itemTitle)}</strong>
          <em>${escapeHtml(subtitle)}</em>
        </span>
        <button class="settings-detail-close" type="button" data-settings-detail-close aria-label="Close">
          ${icons.arrowLeft}
        </button>
      </header>
      <p class="settings-detail-summary">${escapeHtml(detail.summary)}</p>
      <div class="settings-detail-status">
        <span>${escapeHtml(detail.statusLabel)}</span>
        <strong data-settings-detail-status>${escapeHtml(effectiveStatus)}</strong>
      </div>
      <div class="settings-detail-controls">
        ${detail.controls
          .map(
            (control, index) => `
              <button
                class="settings-detail-control${title === "Email lookback window" ? control === getEmailLookbackLabel() ? " is-active" : "" : index === 0 ? " is-active" : ""}"
                type="button"
                data-settings-control
                data-settings-control-value="${escapeAttribute(control)}"
              >
                <span>${escapeHtml(control)}</span>
                <span class="settings-control-dot" aria-hidden="true"></span>
              </button>
            `,
          )
          .join("")}
      </div>
      <button class="settings-detail-primary" type="button" data-settings-detail-close>
        ${escapeHtml(detail.action)}
      </button>
    </section>
  `;
  app.appendChild(overlay);
  overlay.addEventListener("click", (event) => {
    if (event.target === overlay || event.target.closest("[data-settings-detail-close]")) {
      overlay.remove();
    }
  });
  overlay.querySelectorAll("[data-settings-control]").forEach((button) => {
    button.addEventListener("click", () => {
      if (title === "Email lookback window") {
        const days = Number.parseInt(button.dataset.settingsControlValue || button.textContent, 10);
        setEmailLookbackDays(days);
        overlay.querySelectorAll("[data-settings-control]").forEach((control) => {
          control.classList.toggle("is-active", control === button);
        });
        const status = overlay.querySelector("[data-settings-detail-status]");
        if (status) status.textContent = getEmailLookbackLabel();
        return;
      }
      button.classList.toggle("is-active");
    });
  });
}

function renderGmailConnectPanel() {
  const config = getGmailConfig();
  const profile = getStoredGmailProfile();
  const digest = getStoredGmailDigest();
  const isConfigured = isGmailConfigured(config);
  const lookbackLabel = getEmailLookbackLabel();
  const status =
    gmailConnectStatus ||
    (digest
      ? `Processed ${digest.lookbackLabel || lookbackLabel}: ${digest.scannedCount} emails, ${digest.unreadCount} unread.`
      : profile
        ? `Connected as ${profile.emailAddress}. Process ${lookbackLabel} to update the app.`
        : "Gmail is not connected yet.");
  const buttonLabel = profile ? "Reconnect Gmail" : "Connect Gmail";
  const aiConfig = getAiParserConfig();
  const aiCopy = isAiParserConfigured(aiConfig)
    ? ` Cloud AI parser: ${getAiParserEndpoint(aiConfig)}.`
    : " Cloud AI parser is off.";
  const detail = isConfigured
    ? `Uses Google OAuth with Gmail read/modify access for prototype testing.${aiCopy}`
    : "Add your Google iOS OAuth client ID in oauth-config.js before testing on iPhone.";
  const processButton = profile
    ? `<button class="gmail-process-button" type="button" data-gmail-process>Process ${escapeHtml(lookbackLabel)}</button>`
    : "";

  return `
    <section class="gmail-connect-card">
      <span class="gmail-connect-icon">${icons.mail}</span>
      <span class="gmail-connect-copy">
        <strong>Gmail test connection</strong>
        <span>${escapeHtml(detail)}</span>
        <em role="status" aria-live="polite">${escapeHtml(status)}</em>
      </span>
      <button class="gmail-connect-button" type="button" data-gmail-connect ${isConfigured ? "" : "disabled"}>
        ${buttonLabel}
      </button>
      ${processButton}
    </section>
  `;
}

function renderAiPage() {
  app.classList.remove("is-home-view");
  app.classList.remove("is-make-section-view");
  app.classList.add("is-page-view");
  app.innerHTML = `
    <div class="view page ai-page">
      <header class="page-header">
        <button class="icon-button" type="button" data-back aria-label="Back">${icons.arrowLeft}</button>
        <div class="page-heading">
          <p class="eyebrow">1Mail AI</p>
          <h1 class="page-title">Ask your mailbox</h1>
          <p class="page-subtitle">Search, summarize, and act across email</p>
          <span class="ai-experiment-badge">Experimental mailbox context search</span>
        </div>
      </header>

      <section class="ai-thread" aria-label="Conversation with 1Mail AI">
        <article class="ai-message assistant-message">
          <span class="ai-avatar">${icons.mail}</span>
          <p>I can search your mailbox, summarize what I find, and prepare actions like unsubscribe, trash, or label. I ask before changing anything.</p>
        </article>
        <article class="ai-message user-message">
          <p>Can you clean up Product Hunt?</p>
        </article>
        ${renderAiActionCard(createAiAction("Unsubscribe Product Hunt"))}
      </section>

      <section class="ai-suggestions" aria-label="Suggested prompts">
        ${aiSuggestions
          .map((prompt) => `<button type="button" data-ai-prompt="${prompt}">${prompt}</button>`)
          .join("")}
      </section>

      <form class="ai-composer">
        <label class="sr-only" for="aiInput">Ask 1Mail AI</label>
        <input id="aiInput" type="text" placeholder="Ask anything about your mailbox" autocomplete="off" />
        <button type="submit" aria-label="Send">${icons.send}</button>
      </form>
    </div>
  `;

  const input = document.querySelector("#aiInput");
  document.querySelector("[data-back]").addEventListener("click", () => openRoute("home"));
  document.querySelectorAll("[data-ai-prompt]").forEach((button) => {
    button.addEventListener("click", () => {
      input.value = button.dataset.aiPrompt;
      input.focus();
    });
  });
  document.querySelector(".ai-thread").addEventListener("click", handleAiThreadClick);
  document.querySelector(".ai-composer").addEventListener("submit", (event) => {
    event.preventDefault();
    const prompt = input.value.trim();
    if (!prompt) return;
    const thread = document.querySelector(".ai-thread");
    appendAiMessage(thread, "user", prompt);
    const action = createAiAction(prompt);
    if (action) {
      thread.insertAdjacentHTML("beforeend", renderAiActionCard(action));
    } else {
      appendAiMessage(thread, "assistant", getAiReply(prompt));
    }
    input.value = "";
    thread.scrollTop = thread.scrollHeight;
  });
}

function appendAiMessage(thread, type, text) {
  const message = document.createElement("article");
  message.className = `ai-message ${type === "user" ? "user-message" : "assistant-message"}`;

  if (type !== "user") {
    const avatar = document.createElement("span");
    avatar.className = "ai-avatar";
    avatar.innerHTML = icons.mail;
    message.append(avatar);
  }

  const copy = document.createElement("p");
  copy.textContent = text;
  message.append(copy);
  thread.append(message);
}

function renderAiActionCard(action) {
  pendingAiActions[action.id] = action;
  const rows = action.messages
    .map(
      (message) => `
        <li>
          <strong>${message.sender}</strong>
          <span>${message.title}</span>
        </li>
      `,
    )
    .join("");
  const tools = action.tools.map((tool) => `<span>${tool}</span>`).join("");

  return `
    <article class="ai-message assistant-message ai-action-message">
      <span class="ai-avatar">${icons.lock}</span>
      <div class="ai-action-card" data-ai-action-card="${action.id}">
        <p class="ai-tool-label">${action.intent}</p>
        <strong>${action.title}</strong>
        <p>${action.summary}</p>
        <div class="ai-tool-chain" aria-label="Tool chain">${tools}</div>
        <ul class="ai-result-list">${rows}</ul>
        <div class="ai-confirm-row">
          <button class="secondary" type="button" data-ai-action-choice="cancel" data-ai-action-id="${action.id}">Cancel</button>
          <button type="button" data-ai-action-choice="confirm" data-ai-action-id="${action.id}">Confirm</button>
        </div>
      </div>
    </article>
  `;
}

function createAiAction(prompt) {
  const normalized = prompt.toLowerCase();
  if (normalized.includes("product hunt") || normalized.includes("producthunt")) {
    const messages = aiMailbox.filter((message) => message.sender === "hello@producthunt.com");
    return buildAiAction({
      intent: "unsubscribe_sender",
      title: `Unsubscribe from hello@producthunt.com?`,
      summary: `Found ${messages.length} Product Hunt emails with one-click unsubscribe available. Existing email stays unless you ask me to trash it.`,
      messages,
      tools: ["search_mail", "read_headers", "unsubscribe_sender"],
      done: "Done. Sent the one-click unsubscribe request for hello@producthunt.com. No existing emails were deleted.",
    });
  }

  if (normalized.includes("trash") || normalized.includes("delete") || normalized.includes("airbnb")) {
    const messages = aiMailbox.filter((message) => message.sender === "offers@airbnb.com");
    return buildAiAction({
      intent: "trash_messages",
      title: `Move ${messages.length} Airbnb promo emails to Trash?`,
      summary: "I will move these messages to Trash, not permanently delete them. You can still recover them from the mail provider.",
      messages,
      tools: ["search_mail", "preview_matches", "trash_messages"],
      done: `Done. Moved ${messages.length} Airbnb promo emails to Trash. Nothing was permanently deleted.`,
    });
  }

  if (normalized.includes("label") || normalized.includes("travel")) {
    const messages = aiMailbox.filter((message) => message.category === "travel");
    return buildAiAction({
      intent: "label_messages",
      title: `Add Travel label to ${messages.length} booking emails?`,
      summary: "These look like flight, hotel, and rental car confirmations from your mailbox.",
      messages,
      tools: ["search_mail", "classify_messages", "label_messages"],
      done: `Done. Added the Travel label to ${messages.length} booking emails.`,
    });
  }

  return null;
}

function buildAiAction(action) {
  return {
    id: `ai-action-${nextAiActionId++}`,
    ...action,
  };
}

function handleAiThreadClick(event) {
  const button = event.target.closest("[data-ai-action-choice]");
  if (!button) return;

  const action = pendingAiActions[button.dataset.aiActionId];
  if (!action) return;

  const card = button.closest(".ai-action-card");
  const confirmed = button.dataset.aiActionChoice === "confirm";
  card.classList.add(confirmed ? "is-complete" : "is-canceled");
  card.querySelector(".ai-confirm-row").remove();
  card.insertAdjacentHTML(
    "beforeend",
    `<p class="ai-action-status">${confirmed ? "Confirmed" : "Canceled"}</p>`,
  );

  document.querySelector(".ai-thread").append(
    createAiMessageNode(
      "assistant",
      confirmed ? action.done : "Canceled. No mailbox changes were made.",
      confirmed ? "check" : "mail",
    ),
  );
  document.querySelector(".ai-thread").scrollTop = document.querySelector(".ai-thread").scrollHeight;
  delete pendingAiActions[action.id];
}

function createAiMessageNode(type, text, icon = "mail") {
  const message = document.createElement("article");
  message.className = `ai-message ${type === "user" ? "user-message" : "assistant-message"}`;

  if (type !== "user") {
    const avatar = document.createElement("span");
    avatar.className = "ai-avatar";
    avatar.innerHTML = icons[icon];
    message.append(avatar);
  }

  const copy = document.createElement("p");
  copy.textContent = text;
  message.append(copy);
  return message;
}

function getAiReply(prompt) {
  const normalized = prompt.toLowerCase();
  if (normalized.includes("travel") || normalized.includes("booking")) {
    return "I found one flight, one hotel check-in, and one rental pickup from your travel emails.";
  }
  if (normalized.includes("bill") || normalized.includes("week")) {
    return "This week shows Notion Plus and iCloud+ as recurring bills. I can set reminders for both.";
  }
  if (normalized.includes("reply")) {
    return "There are 5 emails that look like they need action, with the client follow-up first.";
  }
  return "I can search matching email threads, summarize the important parts, and suggest the next action.";
}

function renderPage(id) {
  if (makeSectionIds.has(id)) {
    renderMakeSectionPage(id);
    return;
  }

  app.classList.remove("is-home-view");
  app.classList.remove("is-make-section-view");
  app.classList.add("is-page-view");
  const page = pages[id];
  const color = modules.find((module) => module.id === id)?.accent || "#2458ff";
  const activeTabIndex = activePageTabs[id] ?? 0;
  const tabView = page.tabViews?.[activeTabIndex];
  const timeline = tabView?.timeline || page.timeline;
  const items = tabView?.items || page.items;
  const metric = id === "bills" ? getBillTotal(items) : page.metric;

  app.innerHTML = `
    <div class="view page" style="--page-bg: ${id === "security" ? "#fbf4f3" : "var(--bg)"}">
      <header class="page-header">
        <button class="icon-button" type="button" data-back aria-label="Back">${icons.arrowLeft}</button>
        <div class="page-heading">
          <p class="eyebrow">${page.eyebrow}</p>
          <h1 class="page-title">${page.title}</h1>
          <p class="page-subtitle fit-one-line">${escapeHtml(page.subtitle)}</p>
        </div>
      </header>

      ${id === "security" ? renderRisk(page) : renderMetric(page, color, metric)}
      ${renderTabs(id, page.pills)}
      ${id === "today" ? renderTodayContent(tabView) : id === "bills" ? renderBillItems(items) : id === "subscriptions" ? renderSubscriptionItems(items) : id === "logins" ? renderLoginItems(items) : timeline ? renderTimeline(timeline) : renderItems(items)}
    </div>
  `;

  document.querySelector("[data-back]").addEventListener("click", () => openRoute("home"));
  document.querySelectorAll("[data-page-tab]").forEach((tab) => {
    tab.addEventListener("click", () => {
      activePageTabs[id] = Number(tab.dataset.pageTab);
      renderPage(id);
    });
  });
  document.querySelectorAll("[data-action-route]").forEach((button) => {
    button.addEventListener("click", () => openRoute(button.dataset.actionRoute));
  });
  if (id === "bills") {
    setupBillCancelButtons();
  }
  if (id === "today") {
    setupReminderButtons();
  }
  if (id === "subscriptions") {
    setupSubscriptionButtons();
  }
  if (id === "logins") {
    setupLoginCleanupButtons();
  }
  setupMailDetailCards();
  fitOneLineText();
}

function renderMakeSectionPage(id) {
  app.classList.remove("is-home-view");
  app.classList.add("is-page-view", "is-make-section-view");

  const meta = makeSectionMeta[id];
  const page = pages[id];
  const tabs = meta.tabs || [];
  const activeTabIndex = tabs.length ? Math.min(activePageTabs[id] ?? 0, tabs.length - 1) : 0;
  const items = getMakeSectionItems(id, activeTabIndex);
  const metric = getMakeSectionMetric(id, items);

  app.innerHTML = `
    <div class="view make-section-page make-section-${id}">
      <header class="make-section-nav">
        <button class="make-back-button" type="button" data-make-back aria-label="Back">${icons.arrowLeft}</button>
      </header>

      <section class="make-section-hero">
        <h1>${escapeHtml(meta.title)}</h1>
        <p>${escapeHtml(meta.subtitle)}</p>
        ${metric ? `<strong class="make-section-metric" style="--metric-color: ${meta.metricColor}">${escapeHtml(metric)}</strong>` : ""}
      </section>

      ${renderMakeTabs(id, tabs, activeTabIndex)}
      ${renderMakeCards(id, items)}
      ${renderMakeUnsubscribeModal()}
    </div>
  `;

  setupMakeSectionPage(id);
}

function renderMakeTabs(pageId, tabs = [], activeIndex = 0) {
  if (!tabs.length) return "";
  return `
    <div class="make-tabs" role="tablist" aria-label="${escapeAttribute(makeSectionMeta[pageId].title)} tabs">
      ${tabs
        .map(
          (tab, index) => `
            <button
              class="make-tab${index === activeIndex ? " is-active" : ""}"
              type="button"
              role="tab"
              aria-selected="${index === activeIndex}"
              data-make-tab="${index}"
            >
              ${escapeHtml(tab)}
            </button>
          `,
        )
        .join("")}
    </div>
  `;
}

function getMakeSectionMetric(id, visibleItems = []) {
  if (id === "logins") return "";
  if (id === "bills") return getBillTotal(visibleItems.map((item) => item.raw || []));
  if (id === "starred") return String(visibleItems.length);
  if (id === "subscriptions") {
    const page = pages.subscriptions;
    const base = Number(page.metric) || getAllSubscriptionItems().length;
    const unsubscribedCount = getAllSubscriptionItems().filter((item) => isSubscriptionUnsubscribed(item[1])).length;
    return String(Math.max(0, base - unsubscribedCount));
  }
  return pages[id]?.metric || "";
}

function getMakeSectionItems(id, activeTabIndex = 0) {
  if (id === "calendar") return getMakeCalendarItems(activeTabIndex);
  if (id === "logins") return getMakeTraceItems();

  const page = pages[id];
  const tabItems = page.tabViews?.[activeTabIndex]?.items;
  const items = tabItems || page.items || [];

  if (id === "subscriptions") {
    return items
      .filter((item) => !isSubscriptionUnsubscribed(item[1]))
      .map((item, index) => normalizeMakeItem(id, activeTabIndex, item, index));
  }

  return items
    .map((item, index) => normalizeMakeItem(id, activeTabIndex, item, index))
    .filter((item) => !makeDeletedCards.has(item.key));
}

function getAllSubscriptionItems() {
  const tabViews = pages.subscriptions.tabViews || [];
  return tabViews.flatMap((view) => view.items || []);
}

function getMakeCalendarItems(activeTabIndex = 0) {
  const page = pages.calendar;
  const timeline = page.tabViews?.[activeTabIndex]?.timeline || page.timeline || [];
  return timeline
    .map((item, index) => {
      const [time, title, subtitle] = item;
      return normalizeMakeItem(
        "calendar",
        activeTabIndex,
        [activeTabIndex === 1 ? "plane" : "calendar", title, time, "", "#efbd38", { ...getItemMeta(item), context: subtitle }],
        index,
      );
    })
    .filter((item) => !makeDeletedCards.has(item.key));
}

function getMakeTraceItems() {
  const page = pages.logins;
  const rawItems = page.tabViews?.length ? page.tabViews.flatMap((view) => view.items || []) : page.items || [];
  const seen = new Set();
  return rawItems
    .map((item, index) => normalizeMakeItem("logins", 0, item, index))
    .filter((item) => {
      const key = item.messageId || `${item.title}-${item.subtitle}`;
      if (seen.has(key) || makeDeletedCards.has(item.key)) return false;
      seen.add(key);
      return true;
    });
}

function normalizeMakeItem(sectionId, tabIndex, item = [], index = 0) {
  const [icon, title, subtitle, side, color] = item;
  const itemTitle = title || "Untitled";
  const messageId = getItemMessageId(item);
  return {
    color: color || "#efbd38",
    icon: getMakeItemIcon(sectionId, icon, tabIndex),
    key: makeItemKey(sectionId, tabIndex, item, index),
    messageId,
    raw: item,
    side: side || "",
    subtitle: subtitle || "",
    title: itemTitle,
  };
}

function getMakeItemIcon(sectionId, icon, tabIndex = 0) {
  if (sectionId === "subscriptions") return "ban";
  if (sectionId === "logins") return "footprint";
  if (sectionId === "starred") return "star";
  if (sectionId === "security") return icon === "shield" ? "shield" : "alert";
  if (sectionId === "calendar") return tabIndex === 1 ? "plane" : "calendar";
  if (icon === "stopHand") return "ban";
  return icons[icon] ? icon : "receipt";
}

function makeItemKey(sectionId, tabIndex, item = [], index = 0) {
  const messageId = getItemMessageId(item);
  return [sectionId, tabIndex, messageId || item[1] || "item", item[2] || "", index].join("::");
}

function renderMakeCards(sectionId, items = []) {
  if (!items.length) return renderMakeEmptyState(makeSectionMeta[sectionId].empty);
  return `
    <section class="make-card-stack">
      ${items.map((item) => renderMakeCard(sectionId, item)).join("")}
    </section>
  `;
}

function renderMakeCard(sectionId, item) {
  const expanded = Boolean(makeExpandedCards[item.key]);
  const detailAttr = item.messageId ? getMailDetailAttributes(item.raw, item.title) : "";
  const toggleAttr = item.messageId ? "" : `data-make-card-toggle="${escapeAttribute(item.key)}" role="button" tabindex="0"`;
  const right = renderMakeCardRight(sectionId, item);
  const iconButton = renderMakeCardIcon(sectionId, item);

  return `
    <article
      class="make-card${expanded ? " is-expanded" : ""}${item.messageId ? " mail-detail-card" : ""}"
      style="--item-color: ${item.color}"
      ${detailAttr}
      ${toggleAttr}
    >
      ${iconButton}
      <span class="make-card-main">
        <strong>${escapeHtml(item.title)}</strong>
        <span>${escapeHtml(item.subtitle)}</span>
      </span>
      ${right}
      ${expanded ? renderMakeCardDetail(sectionId, item) : ""}
    </article>
  `;
}

function renderMakeCardIcon(sectionId, item) {
  const icon = icons[item.icon] || icons.receipt;
  if (sectionId === "subscriptions") {
    return `
      <button
        class="make-card-icon make-unsubscribe-icon"
        type="button"
        data-make-unsubscribe="${escapeAttribute(item.key)}"
        data-make-unsubscribe-source="${escapeAttribute(item.title)}"
        data-make-unsubscribe-label="${escapeAttribute(getSubscriptionBrandLabel(item))}"
        aria-label="Unsubscribe ${escapeAttribute(item.title)}"
      >${icon}</button>
    `;
  }

  return `
    <button
      class="make-card-icon"
      type="button"
      data-make-expand="${escapeAttribute(item.key)}"
      aria-label="Expand ${escapeAttribute(item.title)}"
      aria-expanded="${Boolean(makeExpandedCards[item.key])}"
    >${icon}</button>
  `;
}

function renderMakeCardRight(sectionId, item) {
  if (sectionId === "subscriptions" || sectionId === "calendar" || sectionId === "starred") return "";
  if (sectionId === "logins") {
    return `
      <button
        class="make-delete-button"
        type="button"
        data-make-delete="${escapeAttribute(item.key)}"
        data-make-delete-message="${escapeAttribute(item.messageId)}"
      >
        Delete
      </button>
    `;
  }

  const rightClass = sectionId === "security" ? "make-card-status" : "make-card-amount";
  return item.side ? `<span class="${rightClass}">${escapeHtml(item.side)}</span>` : "";
}

function renderMakeCardDetail(sectionId, item) {
  const detail = getMakeCardDetail(sectionId, item);
  return `
    <div class="make-card-detail">
      <p>${escapeHtml(detail.body)}</p>
      <span>ATTACHMENTS</span>
      <div class="make-attachment-list">
        ${detail.attachments.map((attachment) => `<em>${escapeHtml(attachment)}</em>`).join("")}
      </div>
    </div>
  `;
}

function getMakeCardDetail(sectionId, item) {
  const message = item.messageId ? getStoredMessageById(item.messageId) : null;
  if (message) {
    return {
      attachments: message.attachmentNames?.length ? message.attachmentNames : ["No attachments"],
      body: getMessageFullText(message).slice(0, 360) || "No readable body text was captured for this email.",
    };
  }

  return (
    makeItemDetails[sectionId]?.[item.title] || {
      attachments: ["No attachments"],
      body: item.subtitle
        ? `${item.title} was detected from an email related to ${item.subtitle}.`
        : `${item.title} was detected from the mailbox.`,
    }
  );
}

function renderMakeEmptyState(message) {
  return `
    <section class="make-empty-state">
      <span>${escapeHtml(message)}</span>
    </section>
  `;
}

function renderMakeUnsubscribeModal() {
  if (!makeUnsubscribeModal) return "";
  return `
    <div class="make-modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="makeUnsubTitle">
      <section class="make-unsub-modal">
        <span class="make-unsub-check">${icons.check}</span>
        <h2 id="makeUnsubTitle">UNSUBSCRIBED</h2>
        <p>You have been successfully removed from ${escapeHtml(makeUnsubscribeModal.label)} mailing list.</p>
        <button class="make-unsub-done" type="button" data-make-unsub-done>Done</button>
      </section>
    </div>
  `;
}

function setupMakeSectionPage(id) {
  document.querySelector("[data-make-back]").addEventListener("click", () => openRoute("home"));

  document.querySelectorAll("[data-make-tab]").forEach((tab) => {
    tab.addEventListener("click", () => {
      activePageTabs[id] = Number(tab.dataset.makeTab);
      renderMakeSectionPage(id);
    });
  });

  document.querySelectorAll("[data-make-expand]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      toggleMakeCard(button.dataset.makeExpand);
    });
  });

  document.querySelectorAll("[data-make-card-toggle]").forEach((card) => {
    card.addEventListener("click", (event) => {
      if (event.target.closest("button, a")) return;
      toggleMakeCard(card.dataset.makeCardToggle);
    });
    card.addEventListener("keydown", (event) => {
      if (event.target.closest("button, a")) return;
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      toggleMakeCard(card.dataset.makeCardToggle);
    });
  });

  document.querySelectorAll("[data-make-unsubscribe]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      markSubscriptionUnsubscribed(button.dataset.makeUnsubscribeSource);
      makeUnsubscribeModal = {
        label: button.dataset.makeUnsubscribeLabel || button.dataset.makeUnsubscribeSource || "this sender",
      };
      renderMakeSectionPage("subscriptions");
    });
  });

  document.querySelectorAll("[data-make-delete]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      deleteMakeTraceCard(button);
    });
  });

  document.querySelector("[data-make-unsub-done]")?.addEventListener("click", () => {
    makeUnsubscribeModal = null;
    renderMakeSectionPage("subscriptions");
  });

  setupMailDetailCards();
}

function toggleMakeCard(key) {
  if (!key) return;
  makeExpandedCards[key] = !makeExpandedCards[key];
  renderMakeSectionPage(route);
}

async function deleteMakeTraceCard(button) {
  const key = button.dataset.makeDelete;
  const messageId = button.dataset.makeDeleteMessage;
  button.disabled = true;
  button.textContent = "Deleting";

  try {
    if (messageId) {
      await trashGmailMessage(messageId);
      removeMessageFromStoredDigest(messageId);
    }
    makeDeletedCards.add(key);
    renderMakeSectionPage("logins");
  } catch (error) {
    button.disabled = false;
    button.textContent = "Delete";
  }
}

function getSubscriptionBrandLabel(item) {
  const domain = item.subtitle || item.title.split("@")[1] || item.title;
  const root = domain.replace(/^www\./, "").split(".")[0] || item.title;
  return root.charAt(0).toUpperCase() + root.slice(1);
}

function renderMetric(page, color, metric = page.metric) {
  return `
    <section class="hero-metric">
      <strong class="metric-value" style="color: ${color}">${escapeHtml(metric)}</strong>
      <p class="metric-copy fit-one-line">${escapeHtml(page.copy)}</p>
    </section>
  `;
}

function renderRisk(page) {
  return `
    <section class="hero-metric">
      <div class="risk-meter"><strong>${page.metric}</strong><span>High risk</span></div>
      <p class="metric-copy fit-one-line">${escapeHtml(page.copy)}</p>
    </section>
  `;
}

function renderTabs(pageId, tabs) {
  const activeIndex = activePageTabs[pageId] ?? 0;
  return `
    <div class="tab-bar" role="tablist" aria-label="${pages[pageId].eyebrow} sections">
      ${tabs
        .map(
          (tab, index) => `
            <button
              class="tab-button${index === activeIndex ? " is-active" : ""}"
              type="button"
              role="tab"
              aria-selected="${index === activeIndex}"
              data-page-tab="${index}"
            >
              ${tab}
            </button>
          `,
        )
        .join("")}
    </div>
  `;
}

function getItemMeta(item = []) {
  const last = item[item.length - 1];
  return last && typeof last === "object" && !Array.isArray(last) ? last : {};
}

function getItemMessageId(item = []) {
  return getItemMeta(item).messageId || "";
}

function createMailItemMeta(message, extra = {}) {
  return {
    ...extra,
    messageId: message.id,
  };
}

function getMailDetailAttributes(item = [], label = "email") {
  const messageId = getItemMessageId(item);
  if (!messageId) return "";
  return [
    `data-mail-detail="${escapeAttribute(messageId)}"`,
    `role="button"`,
    `tabindex="0"`,
    `aria-label="Open original email for ${escapeAttribute(label)}"`,
  ].join(" ");
}

function renderItems(items = []) {
  if (!items.length) return renderEmptyState("Nothing matched here from the latest week.");
  return `
    <section class="single-stack">
      ${items
        .map((item) => {
          const [icon, title, subtitle, side, color] = item;
          const detailAttr = getMailDetailAttributes(item, title);
          return `
            <article class="item${detailAttr ? " mail-detail-card" : ""}" style="--item-color: ${color}" ${detailAttr}>
              <span class="item-icon">${icons[icon]}</span>
              <span class="item-main"><strong>${escapeHtml(title)}</strong><span>${escapeHtml(subtitle)}</span></span>
              <span class="item-side">${escapeHtml(side)}</span>
            </article>
          `;
        })
        .join("")}
    </section>
  `;
}

function renderLoginItems(items = []) {
  if (!items.length) return renderEmptyState("No login confirmations matched the latest week.");
  return `
    <section class="single-stack login-stack">
      ${items
        .map((item) => {
          const [icon, title, subtitle, side, color] = item;
          const messageId = getItemMessageId(item);
          const detailAttr = getMailDetailAttributes(item, title);
          return `
            <article class="item login-item${detailAttr ? " mail-detail-card" : ""}" style="--item-color: ${color}" ${detailAttr}>
              <span class="item-icon">${icons[icon]}</span>
              <span class="item-main"><strong>${escapeHtml(title)}</strong><span>${escapeHtml(subtitle)}</span></span>
              <button
                class="login-delete-button"
                type="button"
                data-login-delete="${escapeAttribute(messageId)}"
                aria-label="Move ${escapeAttribute(title)} to Trash"
              >
                ${icons.trash}
                <span>${escapeHtml(side || "Delete")}</span>
              </button>
              <p class="login-delete-status" role="status" aria-live="polite"></p>
            </article>
          `;
        })
        .join("")}
    </section>
  `;
}

function setupLoginCleanupButtons() {
  document.querySelectorAll("[data-login-delete]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      cleanupLoginMessage(button);
    });
  });
}

async function cleanupLoginMessage(button) {
  const messageId = button.dataset.loginDelete;
  const item = button.closest(".login-item");
  const status = item?.querySelector(".login-delete-status");
  if (!messageId || !status) return;

  button.disabled = true;
  item.classList.add("is-deleting");
  status.textContent = "Moving to Trash...";

  try {
    await trashGmailMessage(messageId);
    status.textContent = "Moved to Trash.";
    item.classList.add("is-deleted");
    window.setTimeout(() => {
      removeMessageFromStoredDigest(messageId);
      renderPage("logins");
    }, 420);
  } catch (error) {
    button.disabled = false;
    item.classList.remove("is-deleting");
    status.textContent = error.message;
  }
}

function renderSubscriptionItems(items = []) {
  if (!items.length) return renderEmptyState("No senders matched this subscription category in the latest week.");
  return `
    <section class="single-stack subscription-stack">
      ${items
        .map((item) => {
          const [icon, title, subtitle, _side, color, mode, url] = item;
          const isUnsubscribed = isSubscriptionUnsubscribed(title);
          const messageId = getItemMessageId(item);
          const detailAttr = getMailDetailAttributes(item, title);
          return `
            <article class="item subscription-item${isUnsubscribed ? " is-unsubscribed" : ""}${detailAttr ? " mail-detail-card" : ""}" style="--item-color: ${color}" ${detailAttr}>
              <button
                class="subscription-stop-button"
                type="button"
                aria-label="${isUnsubscribed ? `Unsubscribed from ${title}` : `Check unsubscribe options for ${title}`}"
                aria-expanded="false"
                data-subscription-source="${escapeAttribute(title)}"
                data-unsub-mode="${escapeAttribute(mode)}"
                data-unsub-url="${escapeAttribute(url)}"
              >${icons[icon]}</button>
              <span class="item-main"><strong>${escapeHtml(title)}</strong><span>${escapeHtml(subtitle)}</span></span>
              <button
                class="subscription-delete-button"
                type="button"
                data-subscription-delete="${escapeAttribute(messageId)}"
                aria-label="Move ${escapeAttribute(title)} email to Trash"
                ${messageId ? "" : "disabled"}
              >${icons.trash}</button>
              <p class="subscription-delete-status" role="status" aria-live="polite"></p>
              <div class="subscription-unsub-result" aria-live="polite"></div>
            </article>
          `;
        })
        .join("")}
    </section>
  `;
}

function setupSubscriptionButtons() {
  document.querySelectorAll(".subscription-stop-button").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      showSubscriptionUnsubscribeFlow(button);
    });
  });
  document.querySelectorAll("[data-subscription-delete]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      cleanupSubscriptionMessage(button);
    });
  });
}

async function cleanupSubscriptionMessage(button) {
  const messageId = button.dataset.subscriptionDelete;
  const item = button.closest(".subscription-item");
  const status = item?.querySelector(".subscription-delete-status");
  if (!messageId || !status) return;

  button.disabled = true;
  item.classList.add("is-deleting");
  status.textContent = "Moving to Trash...";

  try {
    await trashGmailMessage(messageId);
    status.textContent = "Moved to Trash.";
    item.classList.add("is-deleted");
    window.setTimeout(() => {
      removeMessageFromStoredDigest(messageId);
      renderPage("subscriptions");
    }, 420);
  } catch (error) {
    button.disabled = false;
    item.classList.remove("is-deleting");
    status.textContent = error.message;
  }
}

function showSubscriptionUnsubscribeFlow(button) {
  const item = button.closest(".subscription-item");
  const result = item?.querySelector(".subscription-unsub-result");
  if (!item || !result) return;

  const source = button.dataset.subscriptionSource || "this sender";
  const mode = button.dataset.unsubMode;
  const url = button.dataset.unsubUrl;

  item.classList.add("has-result");
  button.setAttribute("aria-expanded", "true");

  if (isSubscriptionUnsubscribed(source)) {
    item.classList.add("is-unsubscribed");
    result.innerHTML = renderSubscriptionUnsubscribeSuccess(source);
    return;
  }

  if (mode === "one-click") {
    result.innerHTML = `
      <strong>Original email checked.</strong>
      <span>One-click unsubscribe is available for ${source}.</span>
      <button class="subscription-confirm-button" type="button">One-click unsubscribe</button>
    `;
    result.querySelector(".subscription-confirm-button").addEventListener("click", () => {
      markSubscriptionUnsubscribed(source);
      item.classList.add("is-unsubscribed");
      button.setAttribute("aria-label", `Unsubscribed from ${source}`);
      result.innerHTML = renderSubscriptionUnsubscribeSuccess(source);
    });
    return;
  }

  result.innerHTML = `
    <strong>Original email checked.</strong>
    <span>No one-click header found. Use the sender's unsubscribe page.</span>
    <a class="subscription-unsub-link" href="${escapeAttribute(url)}" target="_blank" rel="noreferrer">
      ${url}
    </a>
  `;
}

function renderSubscriptionUnsubscribeSuccess(source) {
  return `
    <strong>Unsubscribe successful.</strong>
    <span>${escapeHtml(source)} is marked as unsubscribed. 1Mail will not offer this action again for this sender.</span>
  `;
}

function getSubscriptionUnsubscribeKey(source = "") {
  return source.trim().toLowerCase();
}

function isSubscriptionUnsubscribed(source) {
  return unsubscribedSubscriptionKeys.has(getSubscriptionUnsubscribeKey(source));
}

function markSubscriptionUnsubscribed(source) {
  const key = getSubscriptionUnsubscribeKey(source);
  if (!key) return;
  unsubscribedSubscriptionKeys.add(key);
  saveUnsubscribedSubscriptionKeys();
}

function loadUnsubscribedSubscriptionKeys() {
  try {
    const stored = JSON.parse(localStorage.getItem(SUBSCRIPTION_UNSUBSCRIBED_STORAGE_KEY) || "[]");
    return new Set(Array.isArray(stored) ? stored : []);
  } catch {
    return new Set();
  }
}

function saveUnsubscribedSubscriptionKeys() {
  try {
    localStorage.setItem(SUBSCRIPTION_UNSUBSCRIBED_STORAGE_KEY, JSON.stringify([...unsubscribedSubscriptionKeys]));
  } catch {
    // Local storage can be unavailable in private or restricted browser contexts.
  }
}

function renderTodayContent(tabView = {}) {
  if (tabView.summary) {
    return `
      <section class="today-summary-card">
        <ul class="today-summary-list">
          ${tabView.summary.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
        </ul>
      </section>
    `;
  }

  if (tabView.meetingItems) {
    return renderReminderItems(
      tabView.meetingItems.map(([title, subtitle, color, meta]) => ["bell", title, subtitle, "", color, meta]),
    );
  }

  return renderReminderItems(
    (tabView.reminderItems || []).map(([title, subtitle, side, color, meta]) => [
      "bell",
      title,
      subtitle,
      side,
      color,
      meta,
    ]),
  );
}

function renderReminderItems(items = []) {
  if (!items.length) return renderEmptyState("No reminder-ready emails matched this tab in the latest week.");
  return `
    <section class="single-stack">
      ${items
        .map((item) => {
          const [icon, title, subtitle, side, color] = item;
          const detailAttr = getMailDetailAttributes(item, title);
          return `
            <article class="item reminder-item${detailAttr ? " mail-detail-card" : ""}" style="--item-color: ${color}" ${detailAttr}>
              <button
                class="reminder-bell-button"
                type="button"
                aria-label="Set reminder for ${title}"
                aria-pressed="false"
                data-calendar-title="${escapeAttribute(title)}"
                data-calendar-time="${escapeAttribute(subtitle)}"
              >${icons[icon]}</button>
              <span class="item-main"><strong>${escapeHtml(title)}</strong><span>${escapeHtml(subtitle)}</span></span>
              ${side ? `<span class="item-side">${escapeHtml(side)}</span>` : ""}
              <p class="reminder-calendar-status" role="status" aria-live="polite"></p>
            </article>
          `;
        })
        .join("")}
    </section>
  `;
}

function setupReminderButtons() {
  document.querySelectorAll(".reminder-bell-button").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const title = button.dataset.calendarTitle;
      const time = button.dataset.calendarTime;
      button.setAttribute("aria-pressed", "true");
      button.classList.add("is-set");
      createAppleCalendarHandoff(title, time);
      const status = button.closest(".reminder-item")?.querySelector(".reminder-calendar-status");
      if (status) status.textContent = "Apple Calendar reminder ready.";
    });
  });
}

function createAppleCalendarHandoff(title, time) {
  const start = getCalendarStart(title, time);
  const end = addMinutesToIcsDate(start, 30);
  const uid = `${slugify(`${title}-${time}`)}-${Date.now()}@1mail.local`;
  const calendar = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//1Mail//Mailbox Reminder Prototype//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${formatIcsUtcDate(new Date())}`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:${escapeIcsText(title)}`,
    `DESCRIPTION:${escapeIcsText(`Created from 1Mail. Original email time: ${time}`)}`,
    "BEGIN:VALARM",
    "TRIGGER:-PT30M",
    "ACTION:DISPLAY",
    `DESCRIPTION:${escapeIcsText(`Reminder: ${title}`)}`,
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([calendar], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${slugify(title)}.ics`;
  document.body.append(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function getCalendarStart(title, time) {
  const knownStarts = {
    "Dentist appointment": "20260702T150000",
    "Flight check-in window": "20260706T074500",
    "Rental car pickup": "20260708T100000",
    "maya@northstar.studio": "20260630T093000",
    "design.team@luma-labs.ai": "20260703T110000",
    "sam@foundry.ventures": "20260704T140000",
  };
  if (knownStarts[title]) return knownStarts[title];

  const fallback = new Date();
  fallback.setDate(fallback.getDate() + 1);
  fallback.setHours(9, 0, 0, 0);
  return formatIcsLocalDate(fallback);
}

function addMinutesToIcsDate(value, minutes) {
  const date = new Date(
    Number(value.slice(0, 4)),
    Number(value.slice(4, 6)) - 1,
    Number(value.slice(6, 8)),
    Number(value.slice(9, 11)),
    Number(value.slice(11, 13)),
    Number(value.slice(13, 15)),
  );
  date.setMinutes(date.getMinutes() + minutes);
  return formatIcsLocalDate(date);
}

function formatIcsLocalDate(date) {
  return [
    date.getFullYear(),
    padDatePart(date.getMonth() + 1),
    padDatePart(date.getDate()),
    "T",
    padDatePart(date.getHours()),
    padDatePart(date.getMinutes()),
    padDatePart(date.getSeconds()),
  ].join("");
}

function formatIcsUtcDate(date) {
  return [
    date.getUTCFullYear(),
    padDatePart(date.getUTCMonth() + 1),
    padDatePart(date.getUTCDate()),
    "T",
    padDatePart(date.getUTCHours()),
    padDatePart(date.getUTCMinutes()),
    padDatePart(date.getUTCSeconds()),
    "Z",
  ].join("");
}

function padDatePart(value) {
  return String(value).padStart(2, "0");
}

function escapeIcsText(value = "") {
  return String(value)
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\n/g, "\\n");
}

function slugify(value = "") {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "") || "1mail-reminder";
}

function escapeAttribute(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function getBillGuideId(title) {
  if (title.toLowerCase().includes("notion")) return "notion";
  if (title.toLowerCase().includes("icloud")) return "icloud";
  if (title.toLowerCase().includes("chatgpt")) return "chatgpt";
  return "";
}

function getBillTotal(items = []) {
  const total = items.reduce((sum, item) => {
    const amount = Number(String(item[3]).replace(/[^0-9.-]/g, ""));
    return Number.isFinite(amount) ? sum + amount : sum;
  }, 0);
  return `$${total.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function renderBillIcon(icon) {
  if (icon.startsWith("letter:")) {
    const letter = icon.slice("letter:".length, "letter:".length + 1).toUpperCase();
    return `<span class="item-icon bill-letter-avatar" aria-hidden="true">${letter}</span>`;
  }
  return `<span class="item-icon">${icons[icon]}</span>`;
}

function renderBillItems(items = []) {
  if (!items.length) return renderEmptyState("No money emails matched this bill tab in the latest week.");
  return `
    <section class="single-stack bill-stack">
      ${items
        .map((item) => {
          const [icon, title, subtitle, side, color] = item;
          const guideId = getBillGuideId(title);
          const guideAttr = guideId ? `data-bill-guide="${guideId}"` : "";
          const detailAttr = getMailDetailAttributes(item, title);
          const iconMarkup = guideId
            ? `<button class="bill-stop-button" type="button" data-bill-card="${guideId}" aria-label="Show cancellation steps for ${escapeAttribute(title)}">${icons.stopHand}</button>`
            : renderBillIcon(icon);
          return `
            <article class="item bill-item${detailAttr ? " mail-detail-card" : ""}" style="--item-color: ${color}" ${guideAttr} ${detailAttr}>
              ${iconMarkup}
              <span class="item-main"><strong>${escapeHtml(title)}</strong><span>${escapeHtml(subtitle)}</span></span>
              <span class="bill-side">
                <span class="item-side">${escapeHtml(side)}</span>
              </span>
              <div class="bill-cancel-result" aria-live="polite"></div>
            </article>
          `;
        })
        .join("")}
    </section>
  `;
}

function setupBillCancelButtons() {
  document.querySelectorAll("[data-bill-cancel]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      showBillCancelGuide(button.dataset.billCancel);
    });
  });
  document.querySelectorAll("[data-bill-card]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      showBillCancelGuide(button.dataset.billCard);
    });
    button.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        event.stopPropagation();
        showBillCancelGuide(button.dataset.billCard);
      }
    });
  });
}

function showBillCancelGuide(guideId) {
  const guide = billCancelGuides[guideId];
  if (!guide) return;

  document.querySelectorAll(".bill-item").forEach((card) => {
    card.classList.remove("is-searching", "has-result");
    card.querySelector(".bill-cancel-result").replaceChildren();
  });

  const card = document.querySelector(`[data-bill-guide="${guideId}"]`);
  const result = card?.querySelector(".bill-cancel-result");
  if (!card || !result) return;

  card.classList.add("is-searching", "has-result");
  result.innerHTML = `
    <p class="bill-searching">${icons.eye}<span>Searching official cancellation guidance...</span></p>
  `;

  window.setTimeout(() => {
    card.classList.remove("is-searching");
    const steps = guide.steps
      .map((step) => `<li>${step}</li>`)
      .join("");
    result.innerHTML = `
      <p class="bill-guide-label">${guide.name} cancellation</p>
      <ol class="bill-guide-steps">${steps}</ol>
      <a class="bill-guide-link" href="${guide.sourceUrl}" target="_blank" rel="noreferrer">
        <span>Source: ${guide.sourceLabel}</span>
        <span>${guide.sourceUrl}</span>
      </a>
    `;
  }, 520);
}

function renderTimeline(items = []) {
  if (!items.length) return renderEmptyState("No timeline items matched this tab in the latest week.");
  return `
    <section class="timeline">
      ${items
        .map((item) => {
          const [time, title, subtitle] = item;
          const detailAttr = getMailDetailAttributes(item, title);
          return `
            <article class="timeline-item${detailAttr ? " mail-detail-card" : ""}" ${detailAttr}>
              <span>${escapeHtml(time)}</span>
              <strong>${escapeHtml(title)}</strong>
              <span>${escapeHtml(subtitle)}</span>
            </article>
          `;
        })
        .join("")}
    </section>
  `;
}

function setupMailDetailCards() {
  document.querySelectorAll("[data-mail-detail]").forEach((card) => {
    card.addEventListener("click", (event) => {
      if (event.target.closest("button, a, .bill-cancel-result, .subscription-unsub-result")) return;
      showMailDetail(card.dataset.mailDetail);
    });
    card.addEventListener("keydown", (event) => {
      if (event.target.closest("button, a, .bill-cancel-result, .subscription-unsub-result")) return;
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      showMailDetail(card.dataset.mailDetail);
    });
  });
}

function showUserAgreementIfNeeded() {
  if (hasAcceptedUserAgreement()) return;
  if (document.querySelector(".user-agreement-overlay")) return;

  document.body.insertAdjacentHTML(
    "beforeend",
    `
      <div class="user-agreement-overlay" role="dialog" aria-modal="true" aria-labelledby="userAgreementTitle">
        <section class="user-agreement-sheet">
          <div class="user-agreement-brand" aria-label="1Mail">1MAIL</div>
          <header class="user-agreement-header">
            <h2 id="userAgreementTitle"><span>User Data</span><span>Notice and</span><span>Consent</span></h2>
            <p>Please read this notice before connecting a mailbox. By continuing, you give 1Mail permission to process mailbox data only for the user-facing features described below.</p>
          </header>

          <div class="user-agreement-body">
            <section>
              <h3>Data we access</h3>
              <p>When you connect Gmail or another supported mailbox, 1Mail may access email metadata, sender information, subject lines, labels, timestamps, message snippets, and readable message text needed to classify and organize your mailbox.</p>
            </section>
            <section>
              <h3>How we use mailbox data</h3>
              <p>1Mail uses mailbox data to provide visible app features, including inbox summaries, bill and receipt detection, subscription management, security notices, login confirmations, meetings, appointments, travel reminders, search, and user-requested email actions.</p>
            </section>
            <section>
              <h3>Attachments</h3>
              <p>1Mail does not open, download, summarize, or analyze the contents of attachments. We may display or process attachment file names only when available, for example to identify that an email included <em>invoice.pdf</em>.</p>
            </section>
            <section>
              <h3>AI and service providers</h3>
              <p>If cloud AI parsing is enabled, selected email text may be sent to the configured AI/parser service solely to classify, summarize, or prepare user-facing mailbox actions. 1Mail redacts common sensitive values where practical before sending.</p>
            </section>
            <section>
              <h3>What we do not do</h3>
              <ul>
                <li>We do not sell mailbox content, email metadata, or personal information.</li>
                <li>We do not use mailbox data for advertising, retargeting, or sale to data brokers.</li>
                <li>We do not delete, unsubscribe, label, or modify email unless you request that action.</li>
              </ul>
            </section>
          </div>

          <label class="user-agreement-check">
            <input type="checkbox" data-user-agreement-check />
            <span>I have read this notice and agree to let 1Mail process my mailbox data for the purposes described above.</span>
          </label>

          <button class="user-agreement-accept" type="button" data-user-agreement-accept disabled>
            Continue to 1Mail
          </button>
        </section>
      </div>
    `,
  );

  const overlay = document.querySelector(".user-agreement-overlay");
  const checkbox = overlay.querySelector("[data-user-agreement-check]");
  const acceptButton = overlay.querySelector("[data-user-agreement-accept]");
  checkbox.addEventListener("change", () => {
    acceptButton.disabled = !checkbox.checked;
  });
  acceptButton.addEventListener("click", () => {
    localStorage.setItem(
      USER_AGREEMENT_STORAGE_KEY,
      JSON.stringify({
        acceptedAt: new Date().toISOString(),
        version: USER_AGREEMENT_VERSION,
      }),
    );
    overlay.remove();
  });
}

function hasAcceptedUserAgreement() {
  try {
    const stored = JSON.parse(localStorage.getItem(USER_AGREEMENT_STORAGE_KEY) || "null");
    return stored?.version === USER_AGREEMENT_VERSION;
  } catch {
    return false;
  }
}

function showMailDetail(messageId) {
  const message = getStoredMessageById(messageId);
  if (!message) return;

  document.querySelector(".mail-detail-overlay")?.remove();
  document.body.insertAdjacentHTML(
    "beforeend",
    `
      <div class="mail-detail-overlay" role="dialog" aria-modal="true" aria-labelledby="mailDetailTitle">
        <section class="mail-detail-sheet">
          <header class="mail-detail-header">
            <span id="mailDetailTitle">Original email</span>
            <button class="mail-detail-close" type="button" data-mail-detail-close>Close</button>
          </header>
          <div class="mail-detail-block">
            <span>Sender</span>
            <strong>${escapeHtml(message.from || message.senderEmail || message.senderName || "Unknown sender")}</strong>
          </div>
          <div class="mail-detail-block">
            <span>Full text</span>
            <div class="mail-detail-text">${renderFormattedEmailText(getMessageFullText(message))}</div>
          </div>
          <div class="mail-detail-block">
            <span>Attachments</span>
            ${renderAttachmentNames(message.attachmentNames)}
          </div>
        </section>
      </div>
    `,
  );

  const overlay = document.querySelector(".mail-detail-overlay");
  const closeDetail = () => {
    overlay.remove();
    window.removeEventListener("keydown", closeOnEscape);
  };
  const closeOnEscape = (event) => {
    if (event.key !== "Escape") return;
    closeDetail();
  };
  overlay.querySelector("[data-mail-detail-close]").addEventListener("click", closeDetail);
  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) closeDetail();
  });
  window.addEventListener("keydown", closeOnEscape);
}

function getStoredMessageById(messageId) {
  const digest = getStoredGmailDigest();
  return (digest?.messages || []).find((message) => message.id === messageId) || null;
}

function getMessageFullText(message) {
  const bodyText = normalizeEmailLineEndings(message.bodyText || "").trim();
  if (bodyText) return bodyText;
  return normalizeEmailLineEndings(message.snippet || "No readable body text was captured for this email.").trim();
}

function renderFormattedEmailText(value = "") {
  const text = normalizeEmailLineEndings(value);
  const urlPattern = /\b(?:https?:\/\/|mailto:)[^\s<>"']+/gi;
  let cursor = 0;
  let html = "";
  for (const match of text.matchAll(urlPattern)) {
    const rawUrl = match[0];
    const start = match.index || 0;
    const { url, trailing } = splitTrailingUrlPunctuation(rawUrl);
    html += escapeHtml(text.slice(cursor, start));
    html += renderSafeEmailLink(url);
    html += escapeHtml(trailing);
    cursor = start + rawUrl.length;
  }
  html += escapeHtml(text.slice(cursor));
  return html || escapeHtml("No readable body text was captured for this email.");
}

function splitTrailingUrlPunctuation(rawUrl = "") {
  let url = rawUrl;
  let trailing = "";
  while (/[.,;:!?)]$/.test(url)) {
    trailing = `${url.slice(-1)}${trailing}`;
    url = url.slice(0, -1);
  }
  return { trailing, url };
}

function renderSafeEmailLink(url = "") {
  if (!isSafeEmailUrl(url)) return escapeHtml(url);
  return `<a href="${escapeAttribute(url)}" target="_blank" rel="noreferrer">${escapeHtml(url)}</a>`;
}

function isSafeEmailUrl(url = "") {
  return /^(https?:\/\/|mailto:)/i.test(url);
}

function renderAttachmentNames(names = []) {
  if (!names.length) return `<p class="mail-detail-empty">No attachments found.</p>`;
  return `
    <ul class="mail-detail-attachments">
      ${names.map((name) => `<li>${escapeHtml(name)}</li>`).join("")}
    </ul>
  `;
}

function renderEmptyState(message) {
  return `
    <section class="empty-state">
      <span>${escapeHtml(message)}</span>
    </section>
  `;
}

function renderActions(actions = []) {
  return `
    <nav class="action-dock" aria-label="Page actions">
      ${actions
        .map(([label, icon, style, target]) => {
          const routeAttr = target ? `data-action-route="${target}"` : "";
          return `<button class="${style}" type="button" ${routeAttr}>${icons[icon]}<span>${label}</span></button>`;
        })
        .join("")}
    </nav>
  `;
}

function openRoute(nextRoute) {
  route = nextRoute;
  render();
}

function vibrate(ms) {
  if ("vibrate" in navigator) {
    navigator.vibrate(ms);
  }
}

function getGmailConfig() {
  return window.ONE_MAIL_CONFIG?.gmail || {};
}

function getAiParserConfig() {
  return window.ONE_MAIL_CONFIG?.aiParser || {};
}

function getAiParserEndpoint(config = getAiParserConfig()) {
  const host = window.location.hostname;
  if ((host === "localhost" || host === "127.0.0.1") && config.endpoint) {
    return "http://localhost:8787/api/classify-emails";
  }
  return config.endpoint || "";
}

function isGmailConfigured(config = getGmailConfig()) {
  return Boolean(
    config.clientId &&
      config.redirectUri &&
      !config.clientId.includes("PASTE_IOS_CLIENT_ID") &&
      !config.redirectUri.includes("PASTE_IOS_CLIENT_ID"),
  );
}

function isAiParserConfigured(config = getAiParserConfig()) {
  return Boolean(config.enabled && getAiParserEndpoint(config));
}

function isCapacitorRuntime() {
  return Boolean(window.Capacitor?.Plugins?.Browser && window.Capacitor?.Plugins?.App);
}

function getStoredGmailProfile() {
  try {
    return JSON.parse(localStorage.getItem("oneMailGmailProfile") || "null");
  } catch {
    return null;
  }
}

function getStoredGmailToken() {
  try {
    return JSON.parse(localStorage.getItem("oneMailGmailToken") || "null");
  } catch {
    return null;
  }
}

function getStoredGmailDigest() {
  try {
    return JSON.parse(localStorage.getItem("oneMailGmailDigest") || "null");
  } catch {
    return null;
  }
}

function setGmailConnectStatus(message) {
  gmailConnectStatus = message;
  const status = document.querySelector(".gmail-connect-copy em");
  if (status) status.textContent = message;
}

async function processLatestWeekGmail(options = {}) {
  const { accessToken = "", silent = false } = options;
  if (gmailSyncInFlight) return null;
  gmailSyncInFlight = true;
  const lookbackLabel = getEmailLookbackLabel();

  try {
    if (!silent) setGmailConnectStatus(`Processing ${lookbackLabel} of Gmail...`);
    const token = accessToken || (await getValidGmailAccessToken());
    let messages = await fetchLatestWeekGmailMessages(token);
    try {
      messages = await enrichMessagesWithCloudAi(messages, { silent });
    } catch (aiError) {
      if (!silent) {
        setGmailConnectStatus(`Cloud AI parser unavailable, using local rules: ${aiError.message}`);
      }
    }
    const digest = buildGmailDigest(messages);
    localStorage.setItem("oneMailGmailDigest", JSON.stringify(digest));
    applyGmailDigest(digest);
    setGmailConnectStatus(`Processed ${lookbackLabel}: ${digest.scannedCount} emails, ${digest.unreadCount} unread.`);
    render();
    return digest;
  } catch (error) {
    if (!silent || route === "settings") {
      setGmailConnectStatus(`Gmail processing failed: ${error.message}`);
    }
    return null;
  } finally {
    gmailSyncInFlight = false;
  }
}

async function getValidGmailAccessToken() {
  const token = getStoredGmailToken();
  if (!token?.accessToken) {
    throw new Error("Connect Gmail first.");
  }
  if (!token.expiresAt || token.expiresAt > Date.now() + 60_000) {
    return token.accessToken;
  }
  if (!token.refreshToken) {
    throw new Error("Gmail token expired. Reconnect Gmail.");
  }
  const refreshed = await refreshGmailAccessToken(token.refreshToken);
  return refreshed.accessToken;
}

async function refreshGmailAccessToken(refreshToken) {
  const config = getGmailConfig();
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: config.clientId,
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });
  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.error_description || body.error || "Could not refresh Gmail token");
  }
  const stored = getStoredGmailToken() || {};
  const nextToken = {
    ...stored,
    accessToken: body.access_token,
    expiresAt: Date.now() + Number(body.expires_in || 3600) * 1000,
    refreshToken: body.refresh_token || stored.refreshToken || refreshToken,
    scope: body.scope || stored.scope || "",
    tokenType: body.token_type || stored.tokenType || "Bearer",
  };
  localStorage.setItem("oneMailGmailToken", JSON.stringify(nextToken));
  return nextToken;
}

function hasGmailModifyScope() {
  const token = getStoredGmailToken();
  return String(token?.scope || "")
    .split(/\s+/)
    .includes("https://www.googleapis.com/auth/gmail.modify");
}

async function trashGmailMessage(messageId) {
  if (!hasGmailModifyScope()) {
    throw new Error("Reconnect Gmail from Settings to allow 1Mail to move emails to Trash.");
  }

  const accessToken = await getValidGmailAccessToken();
  const response = await fetch(`https://gmail.googleapis.com/gmail/v1/users/me/messages/${messageId}/trash`, {
    method: "POST",
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(body.error?.message || "Could not move this email to Trash.");
  }
  return body;
}

function removeMessageFromStoredDigest(messageId) {
  const digest = getStoredGmailDigest();
  if (!digest?.messages) return;
  const messages = digest.messages.filter((message) => message.id !== messageId);
  const nextDigest = buildGmailDigest(messages);
  localStorage.setItem("oneMailGmailDigest", JSON.stringify(nextDigest));
  applyGmailDigest(nextDigest);
}

async function enrichMessagesWithCloudAi(messages, { silent = false } = {}) {
  const config = getAiParserConfig();
  if (!isAiParserConfigured(config)) return messages;

  const maxMessages = Math.max(1, Math.min(Number(config.maxMessages || 30), 60));
  const candidates = [...messages]
    .sort((left, right) => new Date(right.date).getTime() - new Date(left.date).getTime())
    .slice(0, maxMessages);

  if (!candidates.length) return messages;
  if (!silent) setGmailConnectStatus(`Cloud AI is reading ${candidates.length} redacted email texts...`);

  const response = await fetch(getAiParserEndpoint(config), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      emails: candidates.map(createAiParserEmailPayload),
    }),
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(body.error || "Cloud AI parser request failed.");
  }

  const byId = new Map((body.classifications || []).map((classification) => [classification.id, classification]));
  return messages.map((message) => {
    const classification = byId.get(message.id);
    if (!classification) return message;
    return {
      ...message,
      aiClassification: normalizeAiClassification(classification, body),
    };
  });
}

function createAiParserEmailPayload(message) {
  return {
    attachmentNames: (message.attachmentNames || []).map((name) => redactAiParserText(name)).slice(0, 12),
    hasCalendarInvite: hasCalendarInvite(message),
    hasListUnsubscribe: Boolean(message.listUnsubscribe),
    id: message.id,
    isUnread: Boolean(message.isUnread),
    date: message.date || "",
    labels: message.labelIds || [],
    senderDomain: message.senderDomain || "",
    senderEmailDomain: message.senderDomain || "",
    senderName: redactAiParserText(message.senderName || ""),
    subject: redactAiParserText(message.subject || ""),
    text: redactAiParserText(getMessageFullText(message)).slice(0, 9000),
  };
}

function redactAiParserText(value = "") {
  return String(value)
    .replace(/\b\d{6}\b/g, "[code]")
    .replace(/\b(?:\d[ -]*?){13,19}\b/g, "[card]")
    .replace(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi, "[email]")
    .replace(/\b\+?1?[-.\s(]*\d{3}[-.\s)]*\d{3}[-.\s]*\d{4}\b/g, "[phone]")
    .replace(/\b(order|invoice|transaction|tracking)\s*(#|id|number)?\s*[:#-]?\s*[A-Z0-9-]{6,}\b/gi, "$1 [id]");
}

function normalizeAiClassification(classification, responseBody = {}) {
  return {
    amount: classification.amount === null || classification.amount === undefined ? null : Number(classification.amount) || null,
    confidence: Math.max(0, Math.min(1, Number(classification.confidence) || 0)),
    currency: classification.currency || null,
    evidence: Array.isArray(classification.evidence) ? classification.evidence.slice(0, 5) : [],
    isCompletedTransaction: Boolean(classification.isCompletedTransaction),
    isPromo: Boolean(classification.isPromo),
    merchant: classification.merchant || null,
    model: responseBody.model || "",
    negativeEvidence: Array.isArray(classification.negativeEvidence) ? classification.negativeEvidence.slice(0, 5) : [],
    primaryCategory: classification.primaryCategory || "unknown",
    provider: responseBody.provider || "",
    recommendedAction: classification.recommendedAction || "keep_in_inbox",
    summary: classification.summary || "",
  };
}

async function fetchLatestWeekGmailMessages(accessToken) {
  const ids = [];
  let pageToken = "";

  do {
    const listUrl = new URL("https://gmail.googleapis.com/gmail/v1/users/me/messages");
    listUrl.searchParams.set("includeSpamTrash", "false");
    listUrl.searchParams.set("maxResults", String(Math.min(GMAIL_SYNC_BATCH_SIZE, GMAIL_SYNC_MAX_MESSAGES - ids.length)));
    listUrl.searchParams.set("q", getGmailSyncQuery());
    if (pageToken) listUrl.searchParams.set("pageToken", pageToken);

    const response = await fetch(listUrl.toString(), {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const body = await response.json();
    if (!response.ok) {
      throw new Error(body.error?.message || "Could not list Gmail messages");
    }
    ids.push(...(body.messages || []));
    pageToken = body.nextPageToken || "";
  } while (pageToken && ids.length < GMAIL_SYNC_MAX_MESSAGES);

  const details = await Promise.all(ids.map((message) => fetchGmailMessageMetadata(accessToken, message.id)));
  return details.filter(Boolean);
}

async function fetchGmailMessageMetadata(accessToken, messageId) {
  const url = new URL(`https://gmail.googleapis.com/gmail/v1/users/me/messages/${messageId}`);
  url.searchParams.set("format", "full");

  const response = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.error?.message || "Could not read Gmail message metadata");
  }
  return normalizeGmailMessage(body);
}

function normalizeGmailMessage(message) {
  const headers = getHeaderMap(message.payload?.headers || []);
  const sender = parseSender(headers.from || "");
  const internalDate = Number(message.internalDate || 0);
  const date = new Date(internalDate || Date.parse(headers.date || "") || Date.now());
  const bodyText = extractGmailBodyText(message.payload).slice(0, GMAIL_BODY_TEXT_LIMIT);
  const attachmentNames = getGmailAttachmentNames(message.payload);
  const calendarInvite = getGmailCalendarInviteInfo(headers, message.payload);

  return {
    id: message.id,
    threadId: message.threadId,
    labelIds: message.labelIds || [],
    isUnread: (message.labelIds || []).includes("UNREAD"),
    subject: cleanSubject(headers.subject || "(no subject)"),
    snippet: message.snippet || "",
    bodyText,
    date: date.toISOString(),
    from: headers.from || "",
    replyTo: headers["reply-to"] || "",
    senderName: sender.name,
    senderEmail: sender.email,
    senderDomain: sender.domain,
    listUnsubscribe: headers["list-unsubscribe"] || "",
    listUnsubscribePost: headers["list-unsubscribe-post"] || "",
    attachmentNames,
    calendarInvite,
  };
}

function getHeaderMap(headers) {
  return headers.reduce((map, header) => {
    map[String(header.name || "").toLowerCase()] = header.value || "";
    return map;
  }, {});
}

function extractGmailBodyText(payload) {
  const textParts = flattenGmailPayload(payload)
    .filter((part) => {
      const mimeType = String(part.mimeType || "").toLowerCase();
      return !part.filename && part.body?.data && (mimeType === "text/plain" || mimeType === "text/html");
    })
    .sort((left, right) => getGmailMimeScore(left.mimeType) - getGmailMimeScore(right.mimeType));
  const plainParts = textParts.filter((part) => String(part.mimeType || "").toLowerCase() === "text/plain");
  const htmlParts = textParts.filter((part) => String(part.mimeType || "").toLowerCase() === "text/html");
  const selectedParts = plainParts.length ? plainParts : htmlParts;

  return selectedParts
    .map((part) => {
      const decoded = decodeGmailBase64Text(part.body.data);
      return String(part.mimeType || "").toLowerCase() === "text/html"
        ? normalizeHtmlEmailText(htmlToReadableText(decoded))
        : normalizePlainEmailText(decoded);
    })
    .filter(Boolean)
    .join("\n\n");
}

function getGmailAttachmentNames(payload) {
  const names = flattenGmailPayload(payload)
    .map((part) => normalizeWhitespace(part.filename || ""))
    .filter(Boolean);
  return [...new Set(names)];
}

function getGmailCalendarInviteInfo(headers, payload) {
  const parts = flattenGmailPayload(payload);
  let hasCalendarPart = false;
  let hasIcsAttachment = false;
  let method = "";
  let provider = "";
  const calendarText = [];

  parts.forEach((part) => {
    const mimeType = String(part.mimeType || "").toLowerCase();
    const filename = String(part.filename || "").toLowerCase();
    const partHeaders = getHeaderMap(part.headers || []);
    const contentType = String(partHeaders["content-type"] || "").toLowerCase();
    const isCalendarPart = mimeType.includes("text/calendar") || contentType.includes("text/calendar");
    const isIcsAttachment = filename.endsWith(".ics");

    if (!isCalendarPart && !isIcsAttachment) return;

    hasCalendarPart = hasCalendarPart || isCalendarPart;
    hasIcsAttachment = hasIcsAttachment || isIcsAttachment;

    const methodMatch = contentType.match(/method="?([^";\s]+)/i);
    if (methodMatch?.[1] && !method) method = methodMatch[1].toLowerCase();

    if (part.body?.data) {
      const decoded = decodeGmailBase64Text(part.body.data);
      calendarText.push(decoded);
      const decodedMethod = decoded.match(/^METHOD:([A-Z]+)/im);
      if (decodedMethod?.[1] && !method) method = decodedMethod[1].toLowerCase();
    }
  });

  const headerText = `${headers.from || ""} ${headers.subject || ""}`.toLowerCase();
  const inviteText = calendarText.join("\n").toLowerCase();
  if (headerText.includes("calendar-notification@google.com") || inviteText.includes("prodid:-//google inc//google calendar")) {
    provider = "google";
  } else if (headerText.includes("icloud.com") || inviteText.includes("apple calendar") || inviteText.includes("prodid:-//apple")) {
    provider = "apple";
  }

  return {
    hasInvite: hasCalendarPart || hasIcsAttachment,
    hasCalendarPart,
    hasIcsAttachment,
    method,
    provider,
  };
}

function flattenGmailPayload(payload) {
  if (!payload) return [];
  const parts = [payload];
  (payload.parts || []).forEach((part) => {
    parts.push(...flattenGmailPayload(part));
  });
  return parts;
}

function getGmailMimeScore(mimeType = "") {
  return String(mimeType).toLowerCase() === "text/plain" ? 0 : 1;
}

function decodeGmailBase64Text(value = "") {
  try {
    const padded = value.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(value.length / 4) * 4, "=");
    const binary = atob(padded);
    const bytes = new Uint8Array(binary.length);
    for (let index = 0; index < binary.length; index += 1) {
      bytes[index] = binary.charCodeAt(index);
    }
    return new TextDecoder().decode(bytes);
  } catch {
    return "";
  }
}

function htmlToReadableText(value = "") {
  const withoutHidden = String(value)
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<head[\s\S]*?<\/head>/gi, " ");
  return decodeHtmlEntities(
    withoutHidden
      .replace(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi, (_match, attributes, labelHtml) =>
        formatReadableHtmlLink(attributes, labelHtml),
      )
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<\/(?:p|div|section|article|header|footer|li|tr|table|h[1-6]|blockquote)>/gi, "\n")
      .replace(/<(?:p|div|section|article|header|footer|li|tr|table|h[1-6]|blockquote)\b[^>]*>/gi, "\n")
      .replace(/<[^>]+>/g, " "),
  );
}

function formatReadableHtmlLink(attributes = "", labelHtml = "") {
  const href = getHtmlAttribute(attributes, "href");
  const label = htmlInlineToText(labelHtml);
  if (!href || !isSafeEmailUrl(href)) return label;
  if (!label || label === href) return href;
  return `${label} (${href})`;
}

function getHtmlAttribute(attributes = "", name = "") {
  const quoted = attributes.match(new RegExp(`\\b${name}\\s*=\\s*([\"'])(.*?)\\1`, "i"));
  if (quoted?.[2]) return decodeHtmlEntities(quoted[2].trim());
  const unquoted = attributes.match(new RegExp(`\\b${name}\\s*=\\s*([^\\s>]+)`, "i"));
  return decodeHtmlEntities((unquoted?.[1] || "").trim());
}

function htmlInlineToText(value = "") {
  return normalizeWhitespace(decodeHtmlEntities(String(value).replace(/<[^>]+>/g, " ")));
}

function decodeHtmlEntities(value = "") {
  return String(value)
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&#39;/g, "'")
    .replace(/&apos;/gi, "'")
    .replace(/&quot;/gi, '"')
    .replace(/&#(\d+);/g, (_match, code) => String.fromCharCode(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_match, code) => String.fromCharCode(parseInt(code, 16)));
}

function normalizeEmailLineEndings(value = "") {
  return String(value).replace(/\r\n?/g, "\n");
}

function normalizePlainEmailText(value = "") {
  return normalizeEmailLineEndings(value)
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n[ \t]+/g, "\n")
    .trim();
}

function normalizeHtmlEmailText(value = "") {
  return normalizePlainEmailText(value)
    .replace(/[ \t]{2,}/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function parseSender(value = "") {
  const bracketEmail = value.match(/<([^<>@\s]+@[^<>\s]+)>/);
  const looseEmail = value.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
  const email = (bracketEmail?.[1] || looseEmail?.[0] || "").toLowerCase();
  const rawName = bracketEmail ? value.slice(0, value.indexOf("<")) : value.replace(looseEmail?.[0] || "", "");
  const name = rawName.replace(/^"|"$/g, "").trim() || email.split("@")[0] || "Unknown sender";
  return {
    domain: email.split("@")[1] || "",
    email,
    name,
  };
}

function cleanSubject(subject = "") {
  return String(subject)
    .replace(/^\s*(re|fw|fwd):\s*/i, "")
    .replace(/\s+/g, " ")
    .trim() || "(no subject)";
}

function buildGmailDigest(messages = []) {
  const unread = messages.filter((message) => message.isUnread);
  const events = messages.filter((message) => isEventMessage(message) && !isMeetingMessage(message));
  const meetings = unread.filter(isMeetingMessage);
  const subscriptions = buildSubscriptionViews(messages);
  const bills = buildBillViews(messages);
  const logins = buildLoginViews(messages);
  const starred = buildStarredViews(messages);
  const inboxItems = buildInboxItems(unread.filter((message) => !isLoginConfirmationMessage(message)));
  const calendar = buildCalendarViews(events, messages);
  const security = buildSecurityItems(messages);

  return {
    generatedAt: new Date().toISOString(),
    lookbackDays: getEmailLookbackDays(),
    lookbackLabel: getEmailLookbackLabel(),
    query: getGmailSyncQuery(),
    scannedCount: messages.length,
    unreadCount: unread.length,
    messages,
    sections: {
      bills,
      calendar,
      inbox: {
        count: inboxItems.length,
        items: inboxItems,
      },
      logins: {
        ...logins,
      },
      security,
      starred,
      subscriptions,
      today: {
        events,
        meetings,
        summary: [
          `${unread.length} unread emails need a first look.`,
          `${events.length} events may need reminders.`,
          `${meetings.length} unread meeting invites are waiting for a decision.`,
        ],
      },
    },
  };
}

function applyStoredGmailDigest() {
  const digest = getStoredGmailDigest();
  if (digest) applyGmailDigest(digest);
}

function applyGmailDigest(digest) {
  const sections = digest.sections || {};
  const today = sections.today || {};
  const events = today.events || [];
  const meetings = today.meetings || [];
  const lookbackLabel = digest.lookbackLabel || getEmailLookbackLabel();

  pages.today.subtitle = `${lookbackLabel} from Gmail`;
  pages.today.metric = String(digest.unreadCount || 0);
  pages.today.tabViews = [
    { summary: today.summary || [] },
    {
      reminderItems: events.slice(0, 8).map((message) => [
        getEventTitle(message),
        getMessageWhen(message),
        getEventCategory(message),
        "#2458ff",
        createMailItemMeta(message),
      ]),
    },
    {
      meetingItems: meetings.slice(0, 8).map((message) => [
        message.senderEmail || message.from || message.senderName,
        getMessageWhen(message),
        "#2458ff",
        createMailItemMeta(message),
      ]),
    },
  ];

  const bills = sections.bills || {};
  pages.bills.subtitle = `${lookbackLabel} from Gmail`;
  pages.bills.tabViews = [
    { items: bills.recurring || [] },
    { items: bills.oneTime || [] },
    { items: bills.eTransfer || [] },
  ];
  pages.bills.items = pages.bills.tabViews[0].items;

  const subscriptions = sections.subscriptions || {};
  pages.subscriptions.metric = String(subscriptions.total || 0);
  pages.subscriptions.subtitle = `${lookbackLabel} from Gmail`;
  pages.subscriptions.tabViews = [
    { items: subscriptions.promos || [] },
    { items: subscriptions.newsletter || [] },
    { items: subscriptions.social || [] },
    { items: subscriptions.productivity || [] },
  ];
  pages.subscriptions.items = pages.subscriptions.tabViews[0].items;

  const inbox = sections.inbox || {};
  pages.inbox.metric = String(inbox.count || 0);
  pages.inbox.subtitle = `Unread mail from ${lookbackLabel}`;
  pages.inbox.items = inbox.items || [];

  const logins = sections.logins || {};
  pages.logins.metric = String(logins.count || 0);
  pages.logins.subtitle = `${lookbackLabel} from Gmail`;
  pages.logins.tabViews = [
    { items: logins.newDevice || [] },
    { items: logins.signIn || [] },
    { items: logins.verification || [] },
  ];
  pages.logins.items = pages.logins.tabViews[0].items;

  const calendar = sections.calendar || {};
  pages.calendar.metric = calendar.nextTime || "0";
  pages.calendar.subtitle = `${lookbackLabel} from Gmail`;
  pages.calendar.tabViews = [
    { timeline: calendar.appointments || [] },
    { timeline: calendar.travel || [] },
  ];
  pages.calendar.timeline = pages.calendar.tabViews[0].timeline;

  const security = sections.security || {};
  pages.security.metric = String(security.riskScore || 12);
  pages.security.subtitle = security.items?.length ? "Suspicious mail from Gmail" : "No obvious suspicious mail";
  pages.security.items = security.items || [];

  const starred = sections.starred || {};
  pages.starred.metric = String(starred.total || 0);
  pages.starred.subtitle = `${lookbackLabel} from Gmail`;
  pages.starred.tabViews = [{ items: starred.items || [] }];
  pages.starred.items = pages.starred.tabViews[0].items;

  bookmarkInboxItems = (digest.messages || []).slice(0, 8).map((message) => ({
    sender: message.senderName || message.senderEmail || "Gmail",
    time: formatRelativeMailDate(message.date),
    title: message.subject,
    tone: getMessageTone(message),
  }));

  aiMailbox = (digest.messages || []).map((message) => ({
    id: message.id,
    sender: message.senderEmail || message.senderName,
    site: message.senderDomain,
    title: message.subject,
    date: formatRelativeMailDate(message.date),
    category: getMessageTone(message).toLowerCase(),
    labels: message.labelIds || [],
    unsubscribe: getUnsubscribeMode(message),
  }));
}

function buildSubscriptionViews(messages) {
  const groups = {
    promos: [],
    newsletter: [],
    social: [],
    productivity: [],
  };
  const seen = new Set();

  messages.forEach((message) => {
    if (!isSubscriptionMessage(message)) return;
    const category = getSubscriptionCategory(message);
    const key = `${category}:${message.senderEmail || message.senderName}`;
    if (seen.has(key)) return;
    seen.add(key);
    const url = getUnsubscribeUrl(message) || (message.senderDomain ? `https://${message.senderDomain}` : "");
    groups[category].push([
      "stopHand",
      message.senderEmail || message.senderName,
      message.senderDomain || message.senderName,
      getSubscriptionSideLabel(category),
      "#d64242",
      getUnsubscribeMode(message),
      url,
      createMailItemMeta(message),
    ]);
  });

  return {
    ...groups,
    total: Object.values(groups).reduce((sum, items) => sum + items.length, 0),
  };
}

function buildBillViews(messages) {
  return {
    eTransfer: messages.filter(isETransferMessage).slice(0, 8).map((message) => {
      const receiver = getTransferReceiver(message);
      return [
        `letter:${getMailboxInitial(receiver.name)}`,
        receiver.name,
        receiver.emailLocal || message.senderEmail.split("@")[0] || message.senderName,
        formatMoney(getMessageAmount(message)),
        "#d64242",
        createMailItemMeta(message),
      ];
    }),
    oneTime: messages.filter(isOneTimePurchaseMessage).slice(0, 8).map((message) => [
      getPurchaseIcon(message),
      getPurchaseTitle(message),
      `From ${message.senderName}`,
      getFinanceSideLabel(message),
      "#0d8a61",
      createMailItemMeta(message),
    ]),
    recurring: messages.filter(isRecurringBillMessage).slice(0, 8).map((message) => [
      "stopHand",
      getBillTitle(message),
      getBillSubtitle(message),
      getFinanceSideLabel(message),
      "#d64242",
      createMailItemMeta(message),
    ]),
  };
}

function buildInboxItems(messages) {
  return messages.slice(0, 10).map((message) => [
    getInboxIcon(message),
    message.senderEmail || message.senderName,
    message.subject,
    getMessageTone(message),
    getToneColor(message),
    createMailItemMeta(message),
  ]);
}

function buildStarredViews(messages) {
  const items = messages.filter(isStarredMessage).slice(0, 30).map((message) => [
    "star",
    message.subject || "(no subject)",
    message.senderEmail || message.senderName || "Unknown sender",
    "",
    "#efbd38",
    createMailItemMeta(message),
  ]);

  return {
    items,
    total: items.length,
  };
}

function buildLoginViews(messages) {
  const groups = {
    newDevice: [],
    signIn: [],
    verification: [],
  };

  messages.filter(isLoginConfirmationMessage).forEach((message) => {
    const type = getLoginNoticeType(message);
    groups[type].push([
      getLoginIcon(message),
      getLoginTitle(message),
      getLoginSubtitle(message),
      "Delete",
      "#343a40",
      createMailItemMeta(message, { cleanupAction: "trash", loginNoticeType: type }),
    ]);
  });

  return {
    ...groups,
    count: Object.values(groups).reduce((sum, items) => sum + items.length, 0),
  };
}

function buildCalendarViews(events, messages) {
  const appointments = events
    .filter((message) => !isTravelMessage(message))
    .slice(0, 8)
    .map((message) => [getMessageWhen(message), getEventTitle(message), message.senderName, createMailItemMeta(message)]);
  const travel = messages
    .filter(isTravelMessage)
    .slice(0, 8)
    .map((message) => [getMessageWhen(message), getEventTitle(message), message.senderName, createMailItemMeta(message)]);

  return {
    appointments,
    nextTime: (appointments[0]?.[0] || travel[0]?.[0] || "0").split(",")[0],
    travel,
  };
}

function buildSecurityItems(messages) {
  const suspicious = messages.filter((message) => isSuspiciousMessage(message) && !isLoginConfirmationMessage(message)).slice(0, 6);
  return {
    items: suspicious.map((message) => [
      "alert",
      message.subject,
      message.senderDomain || message.senderEmail || message.senderName,
      "Review",
      "#d64242",
      createMailItemMeta(message),
    ]),
    riskScore: suspicious.length ? Math.min(94, 50 + suspicious.length * 12) : 12,
  };
}

function isStarredMessage(message) {
  return (message.labelIds || []).includes("STARRED");
}

function messageText(message) {
  return `${message.subject || ""} ${message.snippet || ""} ${message.bodyText || ""} ${message.senderName || ""} ${message.senderEmail || ""}`.toLowerCase();
}

function messageContentText(message) {
  return `${message.subject || ""} ${message.snippet || ""} ${message.bodyText || ""}`.toLowerCase();
}

function includesAny(value, keywords) {
  return keywords.some((keyword) => value.includes(keyword));
}

function getMatchedKeywords(value, keywords) {
  return keywords.filter((keyword) => value.includes(keyword));
}

function getUsableAiClassification(message) {
  const classification = message.aiClassification;
  const minConfidence = Number(getAiParserConfig().minConfidence || 0.72);
  if (!classification || Number(classification.confidence || 0) < minConfidence) return null;
  return classification;
}

function isAiCategory(message, categories) {
  const classification = getUsableAiClassification(message);
  return Boolean(classification && categories.includes(classification.primaryCategory));
}

function getMarketingEvidence(message) {
  const text = messageText(message);
  return getMatchedKeywords(text, [
    "save ",
    "savings",
    "discount",
    "coupon",
    "promo",
    "promotion",
    "offer",
    "offers",
    "deal",
    "deals",
    "sale",
    "clearance",
    "cash back",
    "cashback",
    "rewards",
    "points",
    "shop now",
    "limited time",
    "as low as",
    "starting at",
    "up to",
    "buy now",
    "new arrivals",
    "today only",
    "ends soon",
    "on sale",
    "sale event",
    "exclusive offer",
  ]);
}

function isLikelyPromotionalMessage(message) {
  const labelIds = message.labelIds || [];
  return Boolean(
    labelIds.includes("CATEGORY_PROMOTIONS") ||
      message.listUnsubscribe ||
      getMarketingEvidence(message).length > 0 ||
      includesAny(messageText(message), ["unsubscribe", "notification preferences"]),
  );
}

function isEventMessage(message) {
  const ai = getUsableAiClassification(message);
  if (ai) return ["event_appointment", "event_travel"].includes(ai.primaryCategory);
  if (isLikelyPromotionalMessage(message) && !hasStrongEventEvidence(message)) return false;
  return hasAppointmentEvidence(message) || hasTravelEvidence(message) || hasTicketEvidence(message);
}

function hasStrongEventEvidence(message) {
  return hasAppointmentEvidence(message) || hasTravelEvidence(message) || hasTicketEvidence(message);
}

function hasAppointmentEvidence(message) {
  const text = messageText(message);
  return (
    includesAny(text, ["appointment", "scheduled visit", "confirmed visit"]) &&
    includesAny(text, ["confirmed", "confirmation", "scheduled", "reminder", "rescheduled", "tomorrow", "today", " at "])
  );
}

function hasTravelEvidence(message) {
  const text = messageText(message);
  const travelSignal = includesAny(text, [
    "flight",
    "airline",
    "boarding pass",
    "boarding",
    "hotel",
    "check-in",
    "rental car",
    "car rental",
    "pickup",
  ]);
  const confirmationSignal = includesAny(text, [
    "confirmation",
    "confirmed",
    "reservation number",
    "booking reference",
    "itinerary",
    "boarding pass",
    "check-in opens",
    "mobile entry",
  ]);
  return travelSignal && confirmationSignal;
}

function hasTicketEvidence(message) {
  const text = messageText(message);
  const ticketSignal = includesAny(text, ["ticket", "tickets", "concert", "show", "eventbrite", "ticketmaster", "box office"]);
  const confirmationSignal = includesAny(text, [
    "receipt",
    "confirmation",
    "confirmed",
    "order confirmation",
    "order #",
    "order number",
    "mobile entry",
    "seat ",
    "section ",
    "row ",
    "doors open",
    "show starts",
  ]);
  return ticketSignal && confirmationSignal;
}

function isMeetingMessage(message) {
  const ai = getUsableAiClassification(message);
  if (ai) return ai.primaryCategory === "meeting" && hasCalendarInvite(message);
  const text = messageText(message);
  if (!hasCalendarInvite(message)) return false;

  const hasExplicitMeetingSignal = includesAny(text, [
    "meeting",
    "zoom",
    "google meet",
    "microsoft teams",
    "teams meeting",
    "webex",
    "conference call",
    "calendar invitation",
  ]);
  const hasInviteSignal =
    ["request", "counter", "cancel"].includes(String(message.calendarInvite?.method || "").toLowerCase()) ||
    includesAny(text, [
      "invite",
      "invitation",
      "updated invitation",
      "new invitation",
      "calendar invitation",
      "organizer",
      "attendee",
      "accepted:",
      "declined:",
      "tentative:",
    ]);
  const looksAppointmentOnly =
    !hasExplicitMeetingSignal &&
    includesAny(text, [
      "appointment",
      "booking",
      "reservation",
      "ticket",
      "concert",
      "show",
      "flight",
      "hotel",
      "rental car",
      "boarding",
      "check-in",
      "pickup",
    ]);

  return (hasExplicitMeetingSignal || hasInviteSignal) && !looksAppointmentOnly;
}

function hasCalendarInvite(message) {
  if (message.calendarInvite?.hasInvite) return true;
  return (message.attachmentNames || []).some((name) => String(name).toLowerCase().endsWith(".ics"));
}

function isTravelMessage(message) {
  const ai = getUsableAiClassification(message);
  if (ai) return ai.primaryCategory === "event_travel";
  return hasTravelEvidence(message);
}

function getEventTitle(message) {
  return message.subject || `${getEventCategory(message)} from ${message.senderName}`;
}

function getEventCategory(message) {
  const ai = getUsableAiClassification(message);
  if (ai?.primaryCategory === "event_appointment") return "Appointment";
  if (ai?.primaryCategory === "event_travel") return "Travel";
  const text = messageText(message);
  if (text.includes("appointment")) return "Appointment";
  if (text.includes("flight") || text.includes("boarding") || text.includes("airline")) return "Flight";
  if (text.includes("hotel") || text.includes("check-in")) return "Hotel";
  if (text.includes("rental car") || text.includes("pickup")) return "Rental";
  if (text.includes("ticket") || text.includes("concert") || text.includes("show")) return "Ticket";
  if (text.includes("reservation") || text.includes("booking")) return "Reservation";
  return "Event";
}

function getMessageWhen(message) {
  const text = `${message.subject || ""} ${message.snippet || ""}`;
  const explicitDate = text.match(
    /\b(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun)?\.?\s?(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\.?\s+\d{1,2}(?:,\s*\d{4})?(?:\s*(?:at)?\s*\d{1,2}:\d{2}\s*(?:AM|PM)?)?/i,
  );
  if (explicitDate) return normalizeWhitespace(explicitDate[0]);

  const monthlessTime = text.match(/\b(?:today|tomorrow|tonight)\s*(?:at)?\s*\d{1,2}(?::\d{2})?\s*(?:AM|PM)\b/i);
  if (monthlessTime) return normalizeWhitespace(monthlessTime[0]);

  return formatMailDate(message.date);
}

function normalizeWhitespace(value = "") {
  return String(value).replace(/\s+/g, " ").trim();
}

function isSubscriptionMessage(message) {
  const ai = getUsableAiClassification(message);
  if (shouldPreferSubscriptionOverBill(message, ai)) return true;
  if (ai) {
    return [
      "subscription_promo",
      "subscription_newsletter",
      "subscription_social",
      "subscription_productivity",
    ].includes(ai.primaryCategory);
  }
  return Boolean(
    message.listUnsubscribe ||
      message.labelIds.includes("CATEGORY_PROMOTIONS") ||
      message.labelIds.includes("CATEGORY_SOCIAL") ||
      hasSubscriptionDeliverySignal(message),
  );
}

function getSubscriptionCategory(message) {
  const ai = getUsableAiClassification(message);
  if (ai?.primaryCategory === "subscription_newsletter") return "newsletter";
  if (ai?.primaryCategory === "subscription_social") return "social";
  if (ai?.primaryCategory === "subscription_productivity") return "productivity";
  if (ai?.primaryCategory === "subscription_promo") return "promos";
  const text = messageText(message);
  if (
    message.labelIds.includes("CATEGORY_SOCIAL") ||
    includesAny(text, ["linkedin", "instagram", "facebook", "discord", "reddit", "twitter", "x.com", "followed you"])
  ) {
    return "social";
  }
  if (
    includesAny(text, [
      "notion",
      "figma",
      "linear",
      "slack",
      "github",
      "jira",
      "asana",
      "trello",
      "workspace",
      "product update",
    ])
  ) {
    return "productivity";
  }
  if (includesAny(text, ["newsletter", "digest", "weekly", "roundup", "substack", "medium", "product hunt", "news"])) {
    return "newsletter";
  }
  return "promos";
}

function getSubscriptionSideLabel(category) {
  return {
    newsletter: "Digest",
    productivity: "Product",
    promos: "Promo",
    social: "Social",
  }[category];
}

function getUnsubscribeMode(message) {
  return message.listUnsubscribePost.toLowerCase().includes("one-click") ? "one-click" : "web";
}

function getUnsubscribeUrl(message) {
  const urls = message.listUnsubscribe.match(/https?:\/\/[^>,\s]+/gi);
  if (urls?.[0]) return urls[0];
  return "";
}

function isETransferMessage(message) {
  const ai = getUsableAiClassification(message);
  if (ai) return ai.primaryCategory === "e_transfer";
  return getEmailFinanceUnderstanding(message).kind === "e-transfer";
}

function isOneTimePurchaseMessage(message) {
  const ai = getUsableAiClassification(message);
  if (ai) return ai.primaryCategory === "bill_one_time" && !shouldPreferSubscriptionOverBill(message, ai);
  if (isSubscriptionLikeMarketingNotice(message)) return false;
  return ["one-time", "recurring"].includes(getEmailFinanceUnderstanding(message).kind);
}

function isRecurringBillMessage(message) {
  const ai = getUsableAiClassification(message);
  if (ai) return ai.primaryCategory === "bill_recurring" && !shouldPreferSubscriptionOverBill(message, ai);
  return false;
}

function shouldPreferSubscriptionOverBill(message, ai = getUsableAiClassification(message)) {
  if (!["bill_one_time", "bill_recurring"].includes(ai?.primaryCategory)) return false;
  return isSubscriptionLikeMarketingNotice(message);
}

function isSubscriptionLikeMarketingNotice(message) {
  return hasSubscriptionDeliverySignal(message) && !hasCompletedBillingEvidence(message);
}

function hasSubscriptionDeliverySignal(message) {
  const text = messageText(message);
  const labelIds = message.labelIds || [];
  return Boolean(
    message.listUnsubscribe ||
      labelIds.includes("CATEGORY_PROMOTIONS") ||
      labelIds.includes("CATEGORY_SOCIAL") ||
      includesAny(text, [
        "unsubscribe",
        "newsletter",
        "digest",
        "sale",
        "deal",
        "promo",
        "promotion",
        "notification preferences",
        "email preferences",
        "manage preferences",
        "membership offer",
        "subscription plan",
      ]),
  );
}

function hasCompletedBillingEvidence(message) {
  const text = messageText(message);
  const contentText = messageContentText(message);
  const subjectText = String(message.subject || "").toLowerCase();
  return Boolean(
    includesAny(subjectText, ["receipt", "invoice", "order confirmation", "payment confirmation", "purchase confirmation"]) ||
      includesAny(contentText, [
        "invoice notification",
        "invoice #",
        "invoice number",
        "new invoice",
        "view invoice",
        "download invoice",
        "receipt",
        "your receipt",
        "purchase receipt",
        "payment receipt",
        "paid invoice",
        "order confirmation",
        "order number",
        "order #",
        "order total",
        "thank you for your order",
        "thank you for your purchase",
        "thank you for shopping",
        "your purchase",
        "purchase history",
        "transaction id",
        "total paid",
        "amount due",
        "balance due",
        "payment due",
        "charged to",
        "payment processed",
        "renewal receipt",
        "subscription renewed",
        "membership renewed",
        "steam purchase",
        "uniqlo order",
      ]) ||
      /\b(?:paid|charged)\s+(?:ca\$|us\$|usd|cad|\$)?\s*[0-9]/i.test(text),
  );
}

function getMessageAmount(message) {
  const ai = getUsableAiClassification(message);
  if (ai && Number.isFinite(Number(ai.amount)) && Number(ai.amount) > 0) return Number(ai.amount);
  return getEmailFinanceUnderstanding(message).amount;
}

function getEmailFinanceUnderstanding(message) {
  const contentText = messageContentText(message);
  const fullText = messageText(message);
  const subjectText = String(message.subject || "").toLowerCase();
  const labelIds = message.labelIds || [];
  const isGmailPromotion = labelIds.includes("CATEGORY_PROMOTIONS");
  const transferEvidence = getMatchedKeywords(fullText, [
    "e-transfer",
    "etransfer",
    "interac",
    "sent you money",
    "money sent",
    "sent money",
    "money transfer",
  ]);
  const recurringEvidence = getMatchedKeywords(fullText, [
    "subscription",
    "renewal",
    "renews",
    "monthly",
    "annual",
    "membership",
    "plan renew",
    "plan renewal",
    "renews on",
    "billing cycle",
    "recurring charge",
    "auto-renew",
    "autorenew",
    "next billing date",
  ]);
  const invoiceEvidence = getMatchedKeywords(contentText, [
    "invoice notification",
    "invoice #",
    "invoice number",
    "new invoice",
    "attached invoice",
    "view invoice",
    "download invoice",
    "tax invoice",
    "payment due",
    "amount due",
    "balance due",
    "bill due",
  ]);
  if (subjectText.includes("invoice") && !invoiceEvidence.includes("invoice")) {
    invoiceEvidence.push("invoice");
  }
  const receiptEvidence = getMatchedKeywords(contentText, [
    "receipt",
    "your receipt",
    "receipt for",
    "purchase receipt",
    "order receipt",
    "payment receipt",
    "transaction receipt",
    "statement",
    "paid invoice",
    "payment received",
    "payment confirmation",
    "total paid",
    "charged to",
    "steam purchase",
    "uniqlo order",
  ]);
  if (subjectText.includes("receipt") && !receiptEvidence.includes("receipt")) {
    receiptEvidence.push("receipt");
  }
  const purchaseEvidence = getMatchedKeywords(contentText, [
    "order confirmation",
    "order number",
    "order #",
    "order details",
    "order summary",
    "order total",
    "your order",
    "thanks for your order",
    "thank you for your order",
    "thank you for your purchase",
    "thank you for shopping",
    "your purchase",
    "recent purchase",
    "purchase confirmation",
    "purchase history",
    "steam support",
    "steam purchase",
    "steampowered",
    "uniqlo order",
    "uniqlo.com order",
    "items purchased",
    "transaction id",
    "transaction",
    "charged",
    "charge posted",
    "payment processed",
    "your order is ready",
    "your order has shipped",
    "has shipped",
  ]);
  const eventPurchaseEvidence = getMatchedKeywords(contentText, [
    "mobile entry",
    "seat ",
    "show starts",
    "doors open",
  ]);
  const preliminaryTransactionIntent = Boolean(
    transferEvidence.length ||
      invoiceEvidence.length ||
      receiptEvidence.length ||
      purchaseEvidence.length ||
      eventPurchaseEvidence.length ||
      recurringEvidence.length,
  );
  const amount = extractChargeAmount(contentText, {
    hasTransactionIntent: preliminaryTransactionIntent,
  });
  const marketingEvidence = getMarketingEvidence(message);
  if (!hasTransferIntent && isSubscriptionLikeMarketingNotice(message)) {
    return {
      amount: 0,
      confidence: 0.86,
      evidence: marketingEvidence.length ? marketingEvidence : ["subscription or marketing controls"],
      kind: "promo",
      promotional: true,
    };
  }
  const semanticPurchase = getSemanticPurchaseUnderstanding(message, {
    amount,
    eventPurchaseEvidence,
    invoiceEvidence,
    isGmailPromotion,
    marketingEvidence,
    purchaseEvidence,
    receiptEvidence,
  });
  const paymentEvidence = [...invoiceEvidence, ...receiptEvidence];
  const transactionEvidence = [
    ...paymentEvidence,
    ...purchaseEvidence,
    ...eventPurchaseEvidence,
    ...semanticPurchase.evidence,
  ];
  const hasTransferIntent = transferEvidence.length > 0;
  const hasHardPaymentIntent = paymentEvidence.length > 0 || purchaseEvidence.length > 0 || semanticPurchase.isCompletedPurchase;
  const hasTicketReceiptIntent = eventPurchaseEvidence.length > 0 && hasHardPaymentIntent;
  const hasTransactionIntent = hasHardPaymentIntent || hasTicketReceiptIntent;
  const hasRecurringIntent = recurringEvidence.length > 0;
  const promotional = isLikelyPromotionalFinanceNoise({
    amount,
    isGmailPromotion,
    marketingEvidence,
    paymentEvidence,
    purchaseEvidence,
    recurringEvidence,
    transferEvidence,
  }) && !semanticPurchase.isCompletedPurchase;

  if (hasTransferIntent) {
    return {
      amount,
      confidence: amount > 0 ? 0.88 : 0.72,
      evidence: transferEvidence,
      kind: "e-transfer",
      promotional: false,
    };
  }

  if (promotional) {
    return {
      amount: 0,
      confidence: 0.82,
      evidence: marketingEvidence,
      kind: "promo",
      promotional: true,
    };
  }

  if (
    hasRecurringIntent &&
    !isPromoOnlyFinanceNotice({ amount, isGmailPromotion, marketingEvidence, paymentEvidence }) &&
    (paymentEvidence.length > 0 ||
      (amount > 0 && !isGmailPromotion) ||
      includesAny(contentText, ["renews on", "next billing date", "billing cycle", "recurring charge"]))
  ) {
    return {
      amount,
      confidence: paymentEvidence.length > 0 || amount > 0 ? 0.84 : 0.68,
      evidence: [...recurringEvidence, ...paymentEvidence],
      kind: "recurring",
      promotional: false,
    };
  }

  if (
    hasTransactionIntent &&
    (amount > 0 || paymentEvidence.length > 0 || purchaseEvidence.length > 0 || semanticPurchase.isCompletedPurchase)
  ) {
    return {
      amount,
      confidence: paymentEvidence.length > 0 || amount > 0 || semanticPurchase.isCompletedPurchase ? 0.86 : 0.7,
      evidence: transactionEvidence,
      kind: "one-time",
      promotional: false,
    };
  }

  return {
    amount: 0,
    confidence: 0.4,
    evidence: [...transactionEvidence, ...recurringEvidence, ...marketingEvidence],
    kind: "none",
    promotional: marketingEvidence.length > 0 || isGmailPromotion,
  };
}

function getSemanticPurchaseUnderstanding(
  message,
  { amount, eventPurchaseEvidence, invoiceEvidence, isGmailPromotion, marketingEvidence, purchaseEvidence, receiptEvidence },
) {
  const contentText = messageContentText(message);
  const fullText = messageText(message);
  const receiptTrigger = receiptEvidence.length > 0 || includesAny(contentText, ["receipt", "purchase record"]);
  const merchantEvidence = getMatchedKeywords(fullText, [
    "steam support",
    "steampowered",
    "steam purchase",
    "valve",
    "uniqlo",
    "uniqlo.com",
    "uniqlo order",
  ]);
  const completionEvidence = getMatchedKeywords(contentText, [
    "paid",
    "charged",
    "total",
    "grand total",
    "order total",
    "subtotal",
    "tax",
    "payment",
    "transaction id",
    "order number",
    "order #",
    "order details",
    "order summary",
    "thank you for your purchase",
    "thank you for your order",
    "thank you for shopping",
    "your purchase",
    "recent purchase",
    "items purchased",
  ]);
  const weakPromoOnly =
    marketingEvidence.length > 0 &&
    !receiptTrigger &&
    !purchaseEvidence.length &&
    !invoiceEvidence.length &&
    !completionEvidence.length &&
    amount === 0;

  const score =
    receiptEvidence.length * 3 +
    invoiceEvidence.length * 3 +
    purchaseEvidence.length * 2 +
    completionEvidence.length * 2 +
    merchantEvidence.length * 2 +
    eventPurchaseEvidence.length +
    (amount > 0 ? 2 : 0) -
    (weakPromoOnly || (isGmailPromotion && amount === 0 && !receiptTrigger) ? marketingEvidence.length : 0);

  return {
    confidence: Math.max(0.4, Math.min(0.96, 0.55 + score * 0.04)),
    evidence: [...merchantEvidence, ...completionEvidence].slice(0, 8),
    isCompletedPurchase: !weakPromoOnly && score >= 4,
  };
}

function isLikelyPromotionalFinanceNoise({
  amount,
  isGmailPromotion,
  marketingEvidence,
  paymentEvidence,
  purchaseEvidence,
  recurringEvidence,
  transferEvidence,
}) {
  const marketingScore = marketingEvidence.length + (isGmailPromotion ? 2 : 0);
  const hardFinanceScore =
    paymentEvidence.length * 3 + purchaseEvidence.length * 2 + recurringEvidence.length * 2 + transferEvidence.length * 3;

  if (marketingScore === 0) return false;
  if (hardFinanceScore === 0 && amount === 0) return true;
  return amount === 0 && marketingScore >= hardFinanceScore + 2;
}

function isPromoOnlyFinanceNotice({ amount, isGmailPromotion, marketingEvidence, paymentEvidence }) {
  return (marketingEvidence.length > 0 || isGmailPromotion) && amount === 0 && paymentEvidence.length === 0;
}

function extractChargeAmount(text, { hasTransactionIntent = false } = {}) {
  const matches = [...text.matchAll(/(?:CA\$|US\$|USD|CAD|\$)\s*([0-9][0-9,]*(?:\.[0-9]{2})?)/gi)];
  if (!matches.length) return 0;

  const candidates = matches
    .map((match) => {
      const before = text.slice(Math.max(0, match.index - 48), match.index);
      const after = text.slice(match.index + match[0].length, match.index + match[0].length + 48);
      const context = `${before} ${match[0]} ${after}`;
      return {
        amount: Number(match[1].replace(/,/g, "")) || 0,
        priority: getMoneyContextPriority(before, after),
        score: getMoneyContextScore(context),
      };
    })
    .filter((candidate) => candidate.amount > 0);

  const positive = candidates
    .filter((candidate) => candidate.score > 0)
    .sort((left, right) => right.priority - left.priority || right.score - left.score || right.amount - left.amount)[0];
  if (positive) return positive.amount;

  const neutral = candidates.find((candidate) => candidate.score === 0);
  if (neutral && hasTransactionIntent) return neutral.amount;

  return 0;
}

function getMoneyContextPriority(before = "", after = "") {
  const lead = before.slice(-42);
  const context = `${lead} ${after.slice(0, 18)}`;
  if (includesAny(lead, ["grand total", "order total", "total paid", "amount due", "balance due"])) return 6;
  if (includesAny(lead, ["charged", "paid", "payment", "receipt total"])) return 5;
  if (includesAny(lead, ["total"])) return 4;
  if (includesAny(lead, ["subtotal"])) return 1;
  if (includesAny(lead, ["tax", "shipping", "discount", "savings"])) return 0;
  if (includesAny(context, ["invoice", "receipt", "purchase", "order"])) return 3;
  return 2;
}

function getMoneyContextScore(context) {
  const positiveContext = [
    "total",
    "grand total",
    "order total",
    "amount due",
    "balance due",
    "payment",
    "paid",
    "charged",
    "charge",
    "invoice",
    "receipt",
    "statement",
    "subtotal",
    "tax",
    "transaction",
    "sent",
    "transfer",
    "e-transfer",
    "purchase",
  ];
  const promoContext = [
    "save",
    "savings",
    "discount",
    "coupon",
    "off",
    "deal",
    "promo",
    "promotion",
    "clearance",
    "cash back",
    "cashback",
    "reward",
    "points",
    "as low as",
    "starting at",
    "from",
    "up to",
    "was",
    "now",
    "under",
  ];
  const positiveScore = getMatchedKeywords(context, positiveContext).length;
  const promoScore = getMatchedKeywords(context, promoContext).length;
  return positiveScore - promoScore;
}

function formatMoney(value) {
  const amount = Math.abs(Number(value) || 0);
  return `$${amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function getFinanceSideLabel(message) {
  const amount = getMessageAmount(message);
  if (amount > 0) return formatMoney(amount);

  const text = messageContentText(message);
  if (text.includes("invoice")) return "Invoice";
  if (text.includes("statement")) return "Statement";
  if (text.includes("receipt")) return "Receipt";
  if (text.includes("payment due") || text.includes("amount due") || text.includes("balance due")) return "Due";
  return "Review";
}

function getTransferReceiver(message) {
  const text = messageContentText(message);
  const email = (text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)?.[0] || "").toLowerCase();
  const name =
    text.match(/\bto\s+([A-Z][A-Za-z.'-]+(?:\s+[A-Z][A-Za-z.'-]+){0,2})/)?.[1] ||
    email.split("@")[0]?.replace(/[._-]+/g, " ") ||
    message.senderName ||
    "Contact";
  return {
    emailLocal: email.split("@")[0] || "",
    name: normalizeWhitespace(name),
  };
}

function getPurchaseIcon(message) {
  const category = getEventCategory(message);
  if (["Appointment", "Flight", "Hotel", "Rental", "Ticket", "Reservation"].includes(category)) return "receipt";
  return "receipt";
}

function getPurchaseTitle(message) {
  return message.subject || `Receipt from ${message.senderName}`;
}

function getBillTitle(message) {
  return message.subject.replace(/receipt|invoice|payment|subscription|renewal/gi, "").trim() || message.senderName;
}

function getBillSubtitle(message) {
  const when = getMessageWhen(message);
  if (when) return `From ${message.senderName} · ${when}`;
  return `From ${message.senderName}`;
}

function isLoginConfirmationMessage(message) {
  const ai = getUsableAiClassification(message);
  if (ai) return ai.primaryCategory === "login_confirmation";
  const text = messageText(message);
  const loginEvidence = getMatchedKeywords(text, [
    "new sign-in",
    "new sign in",
    "new login",
    "new device",
    "device signed in",
    "signed in on",
    "signed in from",
    "login confirmation",
    "sign-in confirmation",
    "sign in confirmation",
    "security alert",
    "recent sign-in",
    "recent login",
    "login attempt",
    "sign-in attempt",
    "unrecognized device",
    "unknown device",
    "verify it was you",
    "verification code",
    "one-time code",
  ]);
  if (!loginEvidence.length) return false;

  const accountEvidence = includesAny(text, [
    "google account",
    "apple id",
    "microsoft account",
    "github",
    "steam guard",
    "your account",
    "account security",
    "device",
    "browser",
  ]);
  return accountEvidence && !isMeetingMessage(message) && !isOneTimePurchaseMessage(message);
}

function getLoginIcon(message) {
  const text = messageText(message);
  if (text.includes("security alert") || text.includes("unrecognized") || text.includes("unknown device")) return "shield";
  return "lock";
}

function getLoginTitle(message) {
  const text = messageText(message);
  if (text.includes("google account")) return "Google account sign-in";
  if (text.includes("apple id")) return "Apple ID sign-in";
  if (text.includes("microsoft account")) return "Microsoft account sign-in";
  if (text.includes("github")) return "GitHub sign-in";
  if (text.includes("steam guard")) return "Steam Guard sign-in";
  return message.subject || "Login confirmation";
}

function getLoginSubtitle(message) {
  const when = formatRelativeMailDate(message.date);
  return `${message.senderEmail || message.senderName} · ${when}`;
}

function getLoginNoticeType(message) {
  const text = messageText(message);
  const subject = String(message.subject || "").toLowerCase();
  const newDeviceSignals = [
    "new device",
    "unknown device",
    "unrecognized device",
    "new browser",
    "unrecognized browser",
    "device signed in",
    "signed in on",
    "signed in from",
    "new sign-in on",
  ];
  const verificationSignals = [
    "verification code",
    "one-time code",
    "security code",
    "confirm your email",
    "verify your email",
    "verify it was you",
    "authentication code",
  ];

  if (includesAny(text, newDeviceSignals) || includesAny(subject, newDeviceSignals)) return "newDevice";
  if (includesAny(text, verificationSignals) || includesAny(subject, verificationSignals)) return "verification";
  return "signIn";
}

function getInboxIcon(message) {
  if (isLoginConfirmationMessage(message)) return "lock";
  if (isMeetingMessage(message) || isEventMessage(message)) return "calendar";
  if (isRecurringBillMessage(message) || isOneTimePurchaseMessage(message) || isETransferMessage(message)) return "receipt";
  if (isSuspiciousMessage(message)) return "alert";
  return "mail";
}

function getMessageTone(message) {
  if (isLoginConfirmationMessage(message)) return "Login";
  if (isSuspiciousMessage(message)) return "Review";
  if (isMeetingMessage(message)) return "Meeting";
  if (isEventMessage(message)) return getEventCategory(message);
  if (isRecurringBillMessage(message)) return "Bill";
  if (isOneTimePurchaseMessage(message)) return "Receipt";
  if (isSubscriptionMessage(message)) return "Subscription";
  return "Unread";
}

function getToneColor(message) {
  if (isLoginConfirmationMessage(message)) return "#343a40";
  if (isSuspiciousMessage(message)) return "#d64242";
  if (isMeetingMessage(message) || isEventMessage(message)) return "#2458ff";
  if (isRecurringBillMessage(message) || isOneTimePurchaseMessage(message) || isETransferMessage(message)) return "#0d8a61";
  if (isSubscriptionMessage(message)) return "#6b4be8";
  return "#343a40";
}

function isSuspiciousMessage(message) {
  const ai = getUsableAiClassification(message);
  if (ai) return ai.primaryCategory === "security_risk";
  const text = messageText(message);
  return includesAny(text, [
    "urgent payment",
    "wire transfer",
    "gift card",
    "password expires",
    "account locked",
    "verify your account",
    "suspended",
    "crypto",
    "unusual sign-in",
  ]);
}

function formatMailDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Unknown time";
  return date.toLocaleString("en-US", {
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    month: "short",
  });
}

function formatRelativeMailDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Now";
  const minutes = Math.max(0, Math.round((Date.now() - date.getTime()) / 60000));
  if (minutes < 60) return `${Math.max(1, minutes)}m`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h`;
  return `${Math.round(hours / 24)}d`;
}

async function startGmailOAuth() {
  const config = getGmailConfig();
  if (!isGmailConfigured(config)) {
    setGmailConnectStatus("Add the Gmail iOS OAuth client ID first.");
    return;
  }

  if (!isCapacitorRuntime()) {
    await startGmailWebOAuth(config);
    return;
  }

  try {
    const state = createOAuthRandomString(24);
    const codeVerifier = createOAuthRandomString(64);
    const codeChallenge = await createCodeChallenge(codeVerifier);
    localStorage.setItem(
      "oneMailGmailOAuthPending",
      JSON.stringify({ codeVerifier, state, createdAt: Date.now() }),
    );

    const authUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
    authUrl.search = new URLSearchParams({
      access_type: "offline",
      client_id: config.clientId,
      code_challenge: codeChallenge,
      code_challenge_method: "S256",
      prompt: "consent",
      redirect_uri: config.redirectUri,
      response_type: "code",
      scope: (config.scopes || []).join(" "),
      state,
    }).toString();

    setGmailConnectStatus("Opening Google sign-in...");
    const Browser = window.Capacitor?.Plugins?.Browser;
    if (Browser?.open) {
      await Browser.open({ url: authUrl.toString() });
      return;
    }
    window.location.href = authUrl.toString();
  } catch (error) {
    setGmailConnectStatus(`Could not start Gmail sign-in: ${error.message}`);
  }
}

async function startGmailWebOAuth(config = getGmailConfig()) {
  const webClientId = config.webClientId || config.browserClientId || "";
  if (!webClientId || webClientId.includes("PASTE_WEB_CLIENT_ID")) {
    setGmailConnectStatus(
      "Local browser preview needs a Web OAuth client ID. Add it to oauth-config.js as gmail.webClientId.",
    );
    return;
  }

  try {
    setGmailConnectStatus("Opening Google sign-in for browser testing...");
    await loadGoogleIdentityServices();
    const tokenResponse = await requestGoogleAccessToken(webClientId, (config.scopes || []).join(" "));
    if (!tokenResponse?.access_token) {
      throw new Error(tokenResponse?.error_description || tokenResponse?.error || "No access token returned");
    }
    const token = {
      accessToken: tokenResponse.access_token,
      expiresAt: Date.now() + Number(tokenResponse.expires_in || 3600) * 1000,
      refreshToken: null,
      scope: tokenResponse.scope || (config.scopes || []).join(" "),
      tokenType: tokenResponse.token_type || "Bearer",
    };
    localStorage.setItem("oneMailGmailToken", JSON.stringify(token));
    const profile = await fetchGmailProfile(token.accessToken);
    localStorage.setItem("oneMailGmailProfile", JSON.stringify(profile));
    setGmailConnectStatus(`Connected as ${profile.emailAddress}. Processing latest week...`);
    await processLatestWeekGmail({ accessToken: token.accessToken, silent: false });
  } catch (error) {
    setGmailConnectStatus(`Gmail browser connection failed: ${error.message}`);
  }
}

function loadGoogleIdentityServices() {
  if (window.google?.accounts?.oauth2) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const existing = document.querySelector('script[src="https://accounts.google.com/gsi/client"]');
    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error("Could not load Google Identity Services")), {
        once: true,
      });
      return;
    }

    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Could not load Google Identity Services"));
    document.head.appendChild(script);
  });
}

function requestGoogleAccessToken(clientId, scope) {
  return new Promise((resolve) => {
    const tokenClient = window.google.accounts.oauth2.initTokenClient({
      client_id: clientId,
      prompt: "consent",
      scope,
      callback: resolve,
      error_callback: resolve,
    });
    tokenClient.requestAccessToken();
  });
}

function setupGmailOAuthRedirectListener() {
  const App = window.Capacitor?.Plugins?.App;
  if (App?.addListener) {
    App.addListener("appUrlOpen", ({ url }) => handleGmailOAuthRedirect(url));
  }
  handleGmailOAuthRedirect(window.location.href);
}

async function handleGmailOAuthRedirect(callbackUrl) {
  if (!callbackUrl || !callbackUrl.includes("oauth2redirect")) return;

  let url;
  try {
    url = new URL(callbackUrl);
  } catch {
    return;
  }

  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const error = url.searchParams.get("error");
  if (error) {
    setGmailConnectStatus(`Google sign-in stopped: ${error}`);
    return;
  }
  if (!code) return;

  const pending = getPendingGmailOAuth();
  if (!pending || pending.state !== state) {
    setGmailConnectStatus("Google sign-in could not be verified. Please try again.");
    return;
  }

  try {
    setGmailConnectStatus("Connecting Gmail...");
    const token = await exchangeGmailAuthCode(code, pending.codeVerifier);
    localStorage.removeItem("oneMailGmailOAuthPending");
    localStorage.setItem(
      "oneMailGmailToken",
      JSON.stringify({
        accessToken: token.access_token,
        expiresAt: Date.now() + Number(token.expires_in || 3600) * 1000,
        refreshToken: token.refresh_token || null,
        scope: token.scope || "",
        tokenType: token.token_type || "Bearer",
      }),
    );
    const profile = await fetchGmailProfile(token.access_token);
    localStorage.setItem("oneMailGmailProfile", JSON.stringify(profile));
    setGmailConnectStatus(`Connected as ${profile.emailAddress}. Processing latest week...`);
    await processLatestWeekGmail({ accessToken: token.access_token, silent: false });
  } catch (exchangeError) {
    setGmailConnectStatus(`Gmail connection failed: ${exchangeError.message}`);
  }
}

function getPendingGmailOAuth() {
  try {
    return JSON.parse(localStorage.getItem("oneMailGmailOAuthPending") || "null");
  } catch {
    return null;
  }
}

async function exchangeGmailAuthCode(code, codeVerifier) {
  const config = getGmailConfig();
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: config.clientId,
      code,
      code_verifier: codeVerifier,
      grant_type: "authorization_code",
      redirect_uri: config.redirectUri,
    }),
  });
  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.error_description || body.error || "Token exchange failed");
  }
  return body;
}

async function fetchGmailProfile(accessToken) {
  const response = await fetch("https://gmail.googleapis.com/gmail/v1/users/me/profile", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.error?.message || "Could not read Gmail profile");
  }
  return {
    emailAddress: body.emailAddress,
    messagesTotal: body.messagesTotal,
    threadsTotal: body.threadsTotal,
    connectedAt: new Date().toISOString(),
  };
}

function createOAuthRandomString(length) {
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);
  return base64Url(bytes);
}

async function createCodeChallenge(codeVerifier) {
  const bytes = new TextEncoder().encode(codeVerifier);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return base64Url(new Uint8Array(digest));
}

function base64Url(bytes) {
  let value = "";
  bytes.forEach((byte) => {
    value += String.fromCharCode(byte);
  });
  return btoa(value).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

applyStoredGmailDigest();
setupGmailOAuthRedirectListener();
render();
window.setTimeout(() => {
  if (getStoredGmailToken()) processLatestWeekGmail({ silent: true });
}, 450);
