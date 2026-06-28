const app = document.querySelector("#app");

const icons = {
  arrowLeft:
    '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>',
  settings:
    '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M9.7 4.1 11 2h2l1.3 2.1 2.4.8.9 1.8-1.1 2.2 1.1 2.2-.9 1.8-2.4.8L13 16h-2l-1.3-2.3-2.4-.8-.9-1.8 1.1-2.2-1.1-2.2.9-1.8 2.4-.8Z"/><circle cx="12" cy="9" r="2.4"/></svg>',
  receipt:
    '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1-2-1Z"/><path d="M8 7h8"/><path d="M8 11h8"/><path d="M8 15h5"/></svg>',
  calendar:
    '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 2v4"/><path d="M16 2v4"/><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M3 10h18"/></svg>',
  shield:
    '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 13c0 5-3.5 7.5-8 9-4.5-1.5-8-4-8-9V5l8-3 8 3v8Z"/><path d="m9.5 12 1.8 1.8 3.6-4"/></svg>',
  repeat:
    '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m17 2 4 4-4 4"/><path d="M3 11V9a3 3 0 0 1 3-3h15"/><path d="m7 22-4-4 4-4"/><path d="M21 13v2a3 3 0 0 1-3 3H3"/></svg>',
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
    wheelDescription: "Priority bills, events, risks, and replies",
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
    metric: "2",
    copy: "A compact read of today's event and recurring bills before the inbox gets loud.",
    pills: ["1 Summary", "1 Event", "2 Bills"],
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
        items: [
          ["mail", "Today summary", "1 event and 2 recurring bills", "Now", "#343a40"],
          ["calendar", "Dentist appointment", "Tomorrow 3:00 PM", "Event", "#2458ff"],
          ["repeat", "Notion Plus", "Renews Jul 2", "$10", "#6b4be8"],
        ],
      },
      {
        items: [
          ["calendar", "Dentist appointment", "Tomorrow 3:00 PM", "Event", "#2458ff"],
          ["bell", "Reminder suggested", "Leave 20 minutes early", "Set", "#2458ff"],
        ],
      },
      {
        items: [
          ["repeat", "Notion Plus", "Renews Jul 2", "$10", "#6b4be8"],
          ["repeat", "iCloud+", "Renews Jul 5", "$2.99", "#6b4be8"],
        ],
      },
    ],
  },
  bills: {
    eyebrow: "Bills",
    title: "Recurring bills",
    subtitle: "Renewals from email",
    metric: "$10",
    copy: "Notion Plus renews Jul 2. Recurring charges stay here, separate from subscriptions.",
    pills: ["Recurring"],
    actions: [
      ["Remind", "bell", "", null],
      ["Archive", "archive", "secondary", null],
      ["Done", "check", "secondary", null],
    ],
    items: [
      ["repeat", "Notion Plus", "Renews Jul 2", "$10", "#6b4be8"],
      ["repeat", "iCloud+", "Renews Jul 5", "$2.99", "#6b4be8"],
      ["repeat", "ChatGPT Plus", "Renews Jul 11", "$20", "#6b4be8"],
    ],
  },
  calendar: {
    eyebrow: "Calendar",
    title: "Next appointment",
    subtitle: "Pulled from email",
    metric: "3:00",
    copy: "Dentist appointment tomorrow. Confirmation email includes address and check-in note.",
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
    copy: "Sender name says PayPal, but the domain and reply-to do not match.",
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
    title: "Subscribed senders",
    subtitle: "Email addresses and sites",
    metric: "26",
    copy: "Recurring senders live here. Bills, payments, and renewals move to Bills.",
    pills: ["Senders", "Websites", "Newsletters"],
    actions: [
      ["Keep", "check", "secondary", null],
      ["Block", "ban", "secondary", null],
      ["Unsub", "trash", "", null],
    ],
    items: [
      ["repeat", "news@medium.com", "medium.com", "Daily", "#6b4be8"],
      ["repeat", "hello@producthunt.com", "producthunt.com", "Weekly", "#6b4be8"],
      ["repeat", "offers@airbnb.com", "airbnb.com", "Promo", "#6b4be8"],
    ],
  },
  inbox: {
    eyebrow: "Inbox",
    title: "Needs action",
    subtitle: "Only unresolved mail",
    metric: "5",
    copy: "The rest can wait. These messages look like they need a reply or decision.",
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

let route = "home";
let dragState = null;
let suppressCenterClick = false;
const activePageTabs = {};

function render() {
  if (route === "home") {
    renderHome();
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
        </div>
        <button class="icon-button" type="button" aria-label="Settings">${icons.settings}</button>
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
          <button class="center-control" id="centerControl" type="button" aria-label="1Mail Today">
            <span class="center-mark">
              <strong id="centerLabel">1Mail</strong>
              <span id="centerHint">Swipe to choose money, time, risk, and mail</span>
            </span>
          </button>
        </div>
      </div>

      <footer class="home-footer">
        <div class="quiet-status">
          <strong>Inbox is quiet</strong>
          <span>Swipe from the center to open a section</span>
        </div>
      </footer>
    </div>
  `;

  const center = document.querySelector("#centerControl");
  const stage = document.querySelector("#hubStage");
  const line = document.querySelector("#unlockLine");
  const wheelRing = document.querySelector("#wheelRing");

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
    openRoute("today");
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
    label.textContent = "1Mail";
    label.style.removeProperty("--label-size");
    hint.textContent = "Swipe to choose money, time, risk, and mail";
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

function renderPage(id) {
  const page = pages[id];
  const color = modules.find((module) => module.id === id)?.accent || "#2458ff";
  const activeTabIndex = activePageTabs[id] ?? 0;
  const tabView = page.tabViews?.[activeTabIndex];
  const timeline = tabView?.timeline || page.timeline;
  const items = tabView?.items || page.items;

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

      ${id === "security" ? renderRisk(page) : renderMetric(page, color)}
      ${renderTabs(id, page.pills)}
      ${timeline ? renderTimeline(timeline) : renderItems(items)}
      ${renderActions(page.actions)}
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
}

function renderMetric(page, color) {
  return `
    <section class="hero-metric">
      <strong class="metric-value" style="color: ${color}">${page.metric}</strong>
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
