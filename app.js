const app = document.querySelector("#app");

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
    '<svg class="icon stop-hand-icon" viewBox="0 0 24 24" aria-hidden="true"><circle class="stop-sign" cx="12" cy="12" r="9"/><path class="stop-sign" d="m5.6 18.4 12.8-12.8"/><path class="stop-palm" d="M8.8 13.2V9.4a1.1 1.1 0 0 1 2.2 0v3.3"/><path class="stop-palm" d="M11 12.5V8.2a1.1 1.1 0 0 1 2.2 0v4.3"/><path class="stop-palm" d="M13.2 12.7V9.1a1.1 1.1 0 0 1 2.2 0v4.8"/><path class="stop-palm" d="M15.4 13.9v-2.3a1.1 1.1 0 0 1 2.2 0v3.2c0 2.5-1.7 4.4-4.3 4.4h-1.1c-1.7 0-2.8-.7-3.8-2l-1.1-1.5a1.1 1.1 0 0 1 1.7-1.4l1.2 1.1"/></svg>',
  inbox:
    '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="m5.5 5.1-3.2 7.4A2 2 0 0 0 4.1 15H20a2 2 0 0 0 1.8-2.8l-3.3-7.1A2 2 0 0 0 16.7 4H7.3a2 2 0 0 0-1.8 1.1Z"/></svg>',
  mail:
    '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-10 6L2 7"/></svg>',
  lock:
    '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
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
    id: "inbox",
    label: "Inbox",
    icon: "inbox",
    accent: "#343a40",
    wheelColor: "#805b38",
    activeWheelColor: "#9a6d43",
    iconColor: "#e5b36e",
    wheelDescription: "Messages waiting for your action",
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

const wheel = {
  size: 350,
  center: 175,
  innerRadius: 72,
  outerRadius: 171,
  iconRadius: 122,
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

let route = "home";
let dragState = null;
let suppressCenterClick = false;
const activePageTabs = {};

const aiSuggestions = [
  "Unsubscribe Product Hunt",
  "Trash Airbnb promo emails",
  "Label my travel bookings",
];

const aiMailbox = [
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

const bookmarkInboxItems = [
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
      ["sliders", "AI behavior", "Summary depth, tone, and suggestions", "Balanced"],
      ["archive", "Labels and filters", "Auto labels, saved rules, undo window", "On"],
      ["trash", "Delete safety", "Trash first, never permanent by default", "Protected"],
      ["ban", "Unsubscribe rules", "One-click, web links, and block list", "Ask first"],
    ],
  },
  {
    title: "Personal space",
    items: [
      ["bookmark", "Saved items", "Pinned emails, receipts, trips, notes", "14 saved"],
      ["calendar", "Calendar and reminders", "Appointments, travel, bill reminders", "Synced"],
      ["shield", "Privacy and security", "Data retention, action log, phishing guard", "Private"],
    ],
  },
  {
    title: "Plan",
    items: [
      ["card", "Billing and subscription", "Plan, invoices, payment method", "1Mail Plus"],
    ],
  },
];

let nextAiActionId = 1;
const pendingAiActions = {};
let inboxBookmarkDrag = null;
let suppressInboxBookmarkClick = false;

function render() {
  if (route === "home") {
    renderHome();
    return;
  }
  if (route === "ai") {
    renderAiPage();
    return;
  }
  if (route === "settings") {
    renderSettingsPage();
    return;
  }
  renderPage(route);
}

function renderHome() {
  const sliceAngle = 360 / modules.length;
  app.innerHTML = `
    <div class="view home-view">
      <header class="topbar">
        <div class="brand-lockup">
          <p class="eyebrow">Private email intelligence</p>
          <h1 class="title">1Mail</h1>
          <button class="title-menu-button" type="button" data-open="settings" aria-label="Open app settings">
            <span class="title-menu-lines" aria-hidden="true"><span></span><span></span><span></span></span>
            <span class="sr-only">App settings</span>
          </button>
        </div>
        <button class="icon-button" type="button" data-open="settings" aria-label="Settings">${icons.settings}</button>
      </header>

      <div class="hub-stage" id="hubStage">
        <div class="wheel-ring" id="wheelRing">
          ${renderWheelSurface(sliceAngle)}
          <div class="unlock-line" id="unlockLine" aria-hidden="true"></div>
          ${modules
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
              <strong id="centerLabel">1Mail AI</strong>
              <span id="centerHint">Ask anything about your mailbox</span>
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
  setupInboxBookmark();

  center.addEventListener("pointerdown", (event) => startDrag(event, center, stage, line, "pointer"));
  center.addEventListener("mousedown", (event) => startDrag(event, center, stage, line, "mouse"));
  center.addEventListener("touchstart", (event) => startDrag(event, center, stage, line, "touch"), {
    passive: false,
  });
  center.addEventListener("click", () => {
    if (suppressCenterClick) {
      suppressCenterClick = false;
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
    node.addEventListener("pointerenter", () => setWheelFocus(node.dataset.module, "hover"));
    node.addEventListener("pointerleave", () => {
      if (!dragState) setWheelFocus(null);
    });
    node.addEventListener("focus", () => setWheelFocus(node.dataset.module, "hover"));
    node.addEventListener("blur", () => {
      if (!dragState) setWheelFocus(null);
    });
    node.addEventListener("click", () => openRoute(node.dataset.module));
  });

  wheelRing.addEventListener("pointermove", (event) => {
    if (dragState) return;
    const module = getModuleFromPoint(event.clientX, event.clientY);
    setWheelFocus(module?.id || null, module ? "hover" : "idle");
  });
  wheelRing.addEventListener("pointerleave", () => {
    if (!dragState) setWheelFocus(null);
  });
  wheelRing.addEventListener("click", (event) => {
    if (event.target.closest("#centerControl, .module-node")) return;
    const module = getModuleFromPoint(event.clientX, event.clientY);
    if (module) openRoute(module.id);
  });

  document.querySelectorAll("[data-wheel-module]").forEach((segment) => {
    segment.addEventListener("pointerenter", () => setWheelFocus(segment.dataset.wheelModule, "hover"));
    segment.addEventListener("pointerleave", () => {
      if (!dragState) setWheelFocus(null);
    });
    segment.addEventListener("click", (event) => {
      event.stopPropagation();
      openRoute(segment.dataset.wheelModule);
    });
  });

  document.querySelectorAll("[data-open]").forEach((button) => {
    button.addEventListener("click", () => openRoute(button.dataset.open));
  });
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

function renderWheelSurface(sliceAngle) {
  return `
    <svg class="wheel-surface" viewBox="0 0 ${wheel.size} ${wheel.size}" aria-hidden="true">
      ${modules
        .map((module) => {
          const angle = getModuleAngle(module.id);
          const start = angle - sliceAngle / 2;
          const end = angle + sliceAngle / 2;
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
  const index = modules.findIndex((module) => module.id === moduleId);
  return index < 0 ? 0 : index * (360 / modules.length);
}

function describeSegment(startAngle, endAngle) {
  const outerStart = polarPoint(wheel.outerRadius, startAngle);
  const outerEnd = polarPoint(wheel.outerRadius, endAngle);
  const innerEnd = polarPoint(wheel.innerRadius, endAngle);
  const innerStart = polarPoint(wheel.innerRadius, startAngle);
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;

  return [
    `M ${outerStart.x} ${outerStart.y}`,
    `A ${wheel.outerRadius} ${wheel.outerRadius} 0 ${largeArc} 1 ${outerEnd.x} ${outerEnd.y}`,
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

function startDrag(event, center, stage, line, inputType) {
  if (dragState) return;
  event.preventDefault();
  if (inputType === "pointer") {
    center.setPointerCapture(event.pointerId);
  }
  const centerRect = center.getBoundingClientRect();
  const origin = {
    x: centerRect.left + centerRect.width / 2,
    y: centerRect.top + centerRect.height / 2,
  };
  const point = getEventPoint(event);

  dragState = {
    pointerId: event.pointerId ?? null,
    inputType,
    origin,
    maxDistance: 0,
    target: null,
    center,
    stage,
    line,
  };

  center.classList.add("is-dragging");
  line.classList.add("is-visible");
  updateDragFromPoint(point.x, point.y);

  if (inputType === "pointer") {
    center.addEventListener("pointermove", updateDrag);
    center.addEventListener("pointerup", endDrag, { once: true });
    center.addEventListener("pointercancel", cancelDrag, { once: true });
    window.addEventListener("pointermove", updateDrag);
    window.addEventListener("pointerup", endDrag, { once: true });
    window.addEventListener("pointercancel", cancelDrag, { once: true });
  } else if (inputType === "mouse") {
    window.addEventListener("mousemove", updateDrag);
    window.addEventListener("mouseup", endDrag, { once: true });
  } else {
    window.addEventListener("touchmove", updateDrag, { passive: false });
    window.addEventListener("touchend", endDrag, { once: true });
    window.addEventListener("touchcancel", cancelDrag, { once: true });
  }
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

  const sliceAngle = 360 / modules.length;
  const angle = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
  const normalized = (angle + 360) % 360;
  const index = Math.round(normalized / sliceAngle) % modules.length;
  return modules[index];
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
    label.textContent = "1Mail AI";
    label.style.removeProperty("--label-size");
    hint.textContent = "Ask anything about your mailbox";
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
}

function getCenterLabelSize(label) {
  const length = label.length;
  if (length > 12) return "16px";
  if (length > 9) return "19px";
  if (length > 7) return "22px";
  return "25px";
}

function getEventPoint(event) {
  const touch = event.changedTouches?.[0] || event.touches?.[0];
  if (touch) {
    return { x: touch.clientX, y: touch.clientY };
  }
  return { x: event.clientX, y: event.clientY };
}

function renderSettingsPage() {
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
          <strong>Alex Chen</strong>
          <span>alex@example.com</span>
        </span>
      </section>

      <section class="settings-scroll">
        ${settingsGroups
          .map(
            (group) => `
              <section class="settings-group">
                <h2>${group.title}</h2>
                <div class="settings-list">
                  ${group.items
                    .map(
                      ([icon, title, subtitle, status]) => `
                        <button class="settings-row" type="button">
                          <span class="settings-row-icon">${icons[icon]}</span>
                          <span class="settings-row-main">
                            <strong>${title}</strong>
                            <span>${subtitle}</span>
                          </span>
                          <span class="settings-row-status">${status}</span>
                        </button>
                      `,
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

function renderAiPage() {
  app.innerHTML = `
    <div class="view page ai-page">
      <header class="page-header">
        <button class="icon-button" type="button" data-back aria-label="Back">${icons.arrowLeft}</button>
        <div class="page-heading">
          <p class="eyebrow">1Mail AI</p>
          <h1 class="page-title">Ask your mailbox</h1>
          <p class="page-subtitle">Search, summarize, and act across email</p>
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
          <p class="page-subtitle">${page.subtitle}</p>
        </div>
      </header>

      ${id === "security" ? renderRisk(page) : renderMetric(page, color, metric)}
      ${renderTabs(id, page.pills)}
      ${id === "today" ? renderTodayContent(tabView) : id === "bills" ? renderBillItems(items) : id === "subscriptions" ? renderSubscriptionItems(items) : timeline ? renderTimeline(timeline) : renderItems(items)}
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
}

function renderMetric(page, color, metric = page.metric) {
  return `
    <section class="hero-metric">
      <strong class="metric-value" style="color: ${color}">${metric}</strong>
      <p class="metric-copy">${page.copy}</p>
    </section>
  `;
}

function renderRisk(page) {
  return `
    <section class="hero-metric">
      <div class="risk-meter"><strong>${page.metric}</strong><span>High risk</span></div>
      <p class="metric-copy">${page.copy}</p>
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

function renderItems(items = []) {
  return `
    <section class="single-stack">
      ${items
        .map(
          ([icon, title, subtitle, side, color]) => `
            <article class="item" style="--item-color: ${color}">
              <span class="item-icon">${icons[icon]}</span>
              <span class="item-main"><strong>${title}</strong><span>${subtitle}</span></span>
              <span class="item-side">${side}</span>
            </article>
          `,
        )
        .join("")}
    </section>
  `;
}

function renderSubscriptionItems(items = []) {
  return `
    <section class="single-stack subscription-stack">
      ${items
        .map(
          ([icon, title, subtitle, side, color, mode, url]) => `
            <article class="item subscription-item" style="--item-color: ${color}">
              <button
                class="subscription-stop-button"
                type="button"
                aria-label="Check unsubscribe options for ${title}"
                aria-expanded="false"
                data-subscription-source="${escapeAttribute(title)}"
                data-unsub-mode="${escapeAttribute(mode)}"
                data-unsub-url="${escapeAttribute(url)}"
              >${icons[icon]}</button>
              <span class="item-main"><strong>${title}</strong><span>${subtitle}</span></span>
              <span class="item-side">${side}</span>
              <div class="subscription-unsub-result" aria-live="polite"></div>
            </article>
          `,
        )
        .join("")}
    </section>
  `;
}

function setupSubscriptionButtons() {
  document.querySelectorAll(".subscription-stop-button").forEach((button) => {
    button.addEventListener("click", () => showSubscriptionUnsubscribeFlow(button));
  });
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

  if (mode === "one-click") {
    result.innerHTML = `
      <strong>Original email checked.</strong>
      <span>One-click unsubscribe is available for ${source}.</span>
      <button class="subscription-confirm-button" type="button">One-click unsubscribe</button>
    `;
    result.querySelector(".subscription-confirm-button").addEventListener("click", () => {
      item.classList.add("is-unsubscribed");
      result.innerHTML = `
        <strong>Unsubscribe request sent.</strong>
        <span>Future emails from ${source} will stop when the sender confirms it.</span>
      `;
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

function renderTodayContent(tabView = {}) {
  if (tabView.summary) {
    return `
      <section class="today-summary-card">
        <ul class="today-summary-list">
          ${tabView.summary.map((item) => `<li>${item}</li>`).join("")}
        </ul>
      </section>
    `;
  }

  if (tabView.meetingItems) {
    return renderReminderItems(
      tabView.meetingItems.map(([title, subtitle, color]) => ["bell", title, subtitle, "", color]),
    );
  }

  return renderReminderItems(
    (tabView.reminderItems || []).map(([title, subtitle, side, color]) => ["bell", title, subtitle, side, color]),
  );
}

function renderReminderItems(items = []) {
  return `
    <section class="single-stack">
      ${items
        .map(
          ([icon, title, subtitle, side, color]) => `
            <article class="item reminder-item" style="--item-color: ${color}">
              <button
                class="reminder-bell-button"
                type="button"
                aria-label="Set reminder for ${title}"
                aria-pressed="false"
                data-calendar-title="${escapeAttribute(title)}"
                data-calendar-time="${escapeAttribute(subtitle)}"
              >${icons[icon]}</button>
              <span class="item-main"><strong>${title}</strong><span>${subtitle}</span></span>
              ${side ? `<span class="item-side">${side}</span>` : ""}
              <p class="reminder-calendar-status" role="status" aria-live="polite"></p>
            </article>
          `,
        )
        .join("")}
    </section>
  `;
}

function setupReminderButtons() {
  document.querySelectorAll(".reminder-bell-button").forEach((button) => {
    button.addEventListener("click", () => {
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
  return `
    <section class="single-stack bill-stack">
      ${items
        .map(([icon, title, subtitle, side, color]) => {
          const guideId = getBillGuideId(title);
          const guideAttr = guideId ? `data-bill-card="${guideId}"` : "";
          const actionAttr = guideId ? `role="button" tabindex="0" aria-label="Show cancellation steps for ${title}"` : "";
          return `
            <article class="item bill-item${guideId ? " is-guide-trigger" : ""}" style="--item-color: ${color}" ${guideAttr} ${actionAttr}>
              ${renderBillIcon(icon)}
              <span class="item-main"><strong>${title}</strong><span>${subtitle}</span></span>
              <span class="bill-side">
                <span class="item-side">${side}</span>
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
    button.addEventListener("click", () => showBillCancelGuide(button.dataset.billCancel));
  });
  document.querySelectorAll("[data-bill-card]").forEach((card) => {
    card.addEventListener("click", () => showBillCancelGuide(card.dataset.billCard));
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        showBillCancelGuide(card.dataset.billCard);
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

  const card = document.querySelector(`[data-bill-card="${guideId}"]`);
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
  return `
    <section class="timeline">
      ${items
        .map(
          ([time, title, subtitle]) => `
            <article class="timeline-item">
              <span>${time}</span>
              <strong>${title}</strong>
              <span>${subtitle}</span>
            </article>
          `,
        )
        .join("")}
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

render();
