/**
 * AI Journey — study tracker
 *
 * Data lives in three categories:
 *   Static     MODULES, from modules.js. Never written.
 *   Persisted  state.sessions and state.projects, in localStorage.
 *   Derived    every total below. Never stored.
 */

"use strict";

/**
 * @typedef {Object} Session
 * @property {string} id
 * @property {string} date          ISO date, e.g. "2026-09-14"
 * @property {"resource"|"project"} targetType
 * @property {string} targetId
 * @property {number} minutes
 * @property {number|null} rating   1-5, null for projects
 * @property {string} notes
 * @property {string} blocker
 */

/**
 * @typedef {Object} Project
 * @property {string} id
 * @property {string} name
 * @property {string} description
 * @property {string} url
 * @property {string} createdAt
 */


/* ========== Configuration ========== */

const JOURNEY_START = "2026-08-05";
const WEEKLY_ON_TRACK_HOURS = 12;   // keeps the curriculum on schedule
const WEEKLY_TARGET_HOURS = 15;     // the week's actual target
const WEEKLY_SCALE_HOURS = 20;      // full width of the weekly track
const STORAGE_KEY = "ai-journey";

const MS_PER_DAY = 24 * 60 * 60 * 1000;

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const WEEKDAY_INITIALS = ["M", "T", "W", "T", "F", "S", "S"];

/** Calendar day shading bands, in minutes. Tighter at the low end. */
const INTENSITY_THRESHOLDS = [30, 60, 90, 120, 180, 240];


/* ========== State ========== */

/**
 * completedResources holds resource ids. Completion is user state, so it
 * cannot live in modules.js, which is read-only at runtime.
 *
 * @type {{sessions: Session[], projects: Project[], completedResources: string[]}}
 */
let state = {
  sessions: [],
  projects: [],
  completedResources: []
};


/**
 * Which month the calendar shows. This is view state, not user data — it is
 * never saved, and resets to the current month on reload.
 */
let calendarMonth = new Date();

/** The resource or project a new session will be attached to. */
let pendingTarget = null;


/* ========== Entry point ==================================================

   Everything below this block is a function declaration. JavaScript hoists
   those, so they can be called here before they appear in the file — no
   forward declarations needed.

   Note this only holds for `function name() {}`. A function assigned to a
   const is not hoisted and would throw if called from here.

   The same applies to values: every const and let used by these three calls,
   however indirectly, must be declared above this block. `const` is not
   hoisted usefully — the name exists but throws until its line runs.
   ======================================================================== */

loadState();
wireEvents();
render();


/* ========== Storage ========== */

function loadState() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return;

  try {
    const parsed = JSON.parse(stored);
    state.sessions = parsed.sessions || [];
    state.projects = parsed.projects || [];
    state.completedResources = parsed.completedResources || [];
  } catch (error) {
    console.error("Stored data could not be read:", error);
    // Leave state at its defaults rather than crashing. The stored value is
    // left untouched so it can be recovered manually if it mattered.
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}


/* ========== Helpers ========== */

/** Adds up an array of numbers. */
function sum(numbers) {
  return numbers.reduce((total, value) => total + value, 0);
}

/** Adds up the minutes across an array of sessions. */
function sumMinutes(sessions) {
  const minutes = sessions.map(session => session.minutes);
  return sum(minutes);
}


/* ========== Derived: hours ========== */

function minutesLoggedFor(targetId) {
  const matching = state.sessions.filter(session => session.targetId === targetId);
  const minutes = matching.reduce((total, session) => total + session.minutes, 0);
  return minutes;
}

function hoursLoggedFor(targetId) {
  const minutes = minutesLoggedFor(targetId);
  return minutes / 60;
}

function moduleActualHours(module) {
  const hoursPerResource = module.resources.map(resource => hoursLoggedFor(resource.id));
  const total = sum(hoursPerResource);
  return total;
}

function modulePlannedHours(module) {
  const hoursPerResource = module.resources.map(resource => resource.plannedHours);
  const total = sum(hoursPerResource);
  return total;
}

function curriculumPlannedHours() {
  const hoursPerModule = MODULES.map(module => modulePlannedHours(module));
  const total = sum(hoursPerModule);
  return total;
}

function curriculumActualHours() {
  const hoursPerModule = MODULES.map(module => moduleActualHours(module));
  const total = sum(hoursPerModule);
  return total;
}

function projectActualHours() {
  const projectSessions = state.sessions.filter(session => session.targetType === "project");
  const minutes = sumMinutes(projectSessions);
  return minutes / 60;
}


/* ========== Derived: ratings ========== */

/** Mean usefulness for a resource, or null when nothing is rated yet. */
function averageRatingFor(targetId) {
  const sessionsForTarget = state.sessions.filter(session => session.targetId === targetId);
  const rated = sessionsForTarget.filter(session => session.rating !== null);

  if (rated.length === 0) {
    return null;
  }

  const ratings = rated.map(session => session.rating);
  const total = sum(ratings);
  return total / rated.length;
}


/* ========== Completion ========== */

function isResourceComplete(resourceId) {
  return state.completedResources.includes(resourceId);
}

function toggleResourceComplete(resourceId) {
  const complete = isResourceComplete(resourceId);

  if (complete) {
    state.completedResources = state.completedResources.filter(
      id => id !== resourceId
    );
  } else {
    state.completedResources.push(resourceId);
  }

  saveState();
  render();
}

function completedCountFor(module) {
  const done = module.resources.filter(resource => isResourceComplete(resource.id));
  return done.length;
}


/* ========== Derived: time ========== */

/**
 * Turns a value into a local date with the time stripped.
 *
 * A "YYYY-MM-DD" string is parsed by hand: new Date("2026-08-11") treats it as
 * UTC midnight, which lands on the previous local day anywhere west of UTC.
 */
function toDateOnly(value) {
  if (typeof value === "string") {
    const parts = value.split("-");
    const year = Number(parts[0]);
    const month = Number(parts[1]) - 1;
    const day = Number(parts[2]);
    return new Date(year, month, day);
  }

  const date = new Date(value);
  date.setHours(0, 0, 0, 0);
  return date;
}

/** Monday of the week containing the given date. */
function startOfWeek(value) {
  const date = toDateOnly(value);
  const weekday = date.getDay();                  // 0 = Sunday
  const daysSinceMonday = weekday === 0 ? 6 : weekday - 1;
  date.setDate(date.getDate() - daysSinceMonday);
  return date;
}

function hoursThisWeek() {
  const monday = startOfWeek(new Date());
  const thisWeek = state.sessions.filter(session => toDateOnly(session.date) >= monday);
  const minutes = sumMinutes(thisWeek);
  return minutes / 60;
}

/** Weeks elapsed since the journey began. Open-ended: there is no end date. */
function currentWeek() {
  const elapsedMs = toDateOnly(new Date()) - toDateOnly(JOURNEY_START);
  const elapsedDays = elapsedMs / MS_PER_DAY;
  const elapsedWeeks = Math.floor(elapsedDays / 7);
  return Math.max(1, elapsedWeeks + 1);
}

/**
 * Consecutive days with at least one session, counting back from today.
 * A day with no session yet does not break the streak if yesterday has one —
 * otherwise the figure would read zero every morning before logging.
 */
function currentStreak() {
  const allDates = state.sessions.map(session => session.date);
  const loggedDays = new Set(allDates);

  if (loggedDays.size === 0) {
    return 0;
  }

  const cursor = toDateOnly(new Date());
  const loggedToday = loggedDays.has(isoDate(cursor));

  if (!loggedToday) {
    cursor.setDate(cursor.getDate() - 1);
    const loggedYesterday = loggedDays.has(isoDate(cursor));
    if (!loggedYesterday) {
      return 0;
    }
  }

  let streak = 0;
  while (loggedDays.has(isoDate(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

/**
 * Formats a date as YYYY-MM-DD using local calendar parts.
 *
 * toISOString() would convert to UTC first, which shifts the date by one day
 * for anyone not on UTC — local midnight in Spain is 22:00 the previous day
 * in UTC. Every date in this app is a calendar date, never an instant, so
 * local parts are the correct source.
 */
function isoDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return year + "-" + month + "-" + day;
}


/* ========== Formatting ========== */

/**
 * Makes a string safe to place inside HTML.
 *
 * Curriculum text comes from modules.js, which we wrote. Project text comes
 * from a form, and a name containing <script> would otherwise be executed
 * rather than displayed. Letting the browser do the conversion is safer than
 * writing the replacements by hand.
 */
function escapeHtml(value) {
  const element = document.createElement("div");
  element.textContent = value;
  return element.innerHTML;
}

/** Only http and https links are rendered. Blocks javascript: URLs. */
function isSafeUrl(value) {
  if (!value) {
    return false;
  }
  return value.startsWith("http://") || value.startsWith("https://");
}

function formatHours(hours) {
  const isWholeNumber = hours % 1 === 0;

  if (isWholeNumber) {
    return String(hours);
  }
  return hours.toFixed(1);
}

function formatRating(average) {
  if (average === null) {
    return "—";
  }

  const filled = Math.round(average);
  const empty = 5 - filled;
  return "★".repeat(filled) + "☆".repeat(empty);
}


/* ========== Rendering ========== */

/**
 * Rebuilds the whole page from state. Never update the DOM directly from an
 * event handler: change state, save, then call this. One logged session
 * affects six figures on screen, and recomputing all of them is the only way
 * they cannot disagree.
 */
function render() {
  renderSummary();
  renderCalendar();
  updateCalendarNav();
  renderProjects();
  renderCurriculum();
}

function renderSummary() {
  const curriculumActual = curriculumActualHours();
  const curriculumPlanned = curriculumPlannedHours();
  const projects = projectActualHours();
  const total = curriculumActual + projects;
  const fraction = curriculumActual / curriculumPlanned;
  const percent = fraction * 100;
  const container = document.getElementById("summary-figures");

  const week = hoursThisWeek();
  const curriculumPercent = Math.min(percent, 100);
  const curriculumOver = curriculumActual > curriculumPlanned;

  container.innerHTML = `
    <div class="readouts">
      <div class="readout readout--hero">
        <span class="readout-value">${formatHours(total)}</span>
        <span class="readout-label">Hours logged</span>
      </div>
      <div class="readout">
        <span class="readout-value">${currentWeek()}</span>
        <span class="readout-label">Week</span>
      </div>
      <div class="readout">
        <span class="readout-value">${currentStreak()}</span>
        <span class="readout-label">Day streak</span>
      </div>
    </div>

    <div class="scales">
      ${renderWeeklyScale(week)}
      ${renderScale("Curriculum", curriculumActual, curriculumPlanned, curriculumPercent, curriculumOver)}
      <div class="scale scale--untargeted">
        <span class="scale-label">Projects</span>
        <span class="scale-figures">${formatHours(projects)} h</span>
      </div>
    </div>
  `;
}

/**
 * The weekly reading, measured against two nominals.
 *
 * Below 12 h the week is behind. Between 12 and 15 it is on track — enough to
 * keep the curriculum on schedule. Past 15 it is ahead, and the fill is
 * allowed to keep growing rather than capping, so a strong week stays visible.
 */
function renderWeeklyScale(hours) {
  let status = "behind";

  if (hours >= WEEKLY_TARGET_HOURS) {
    status = "ahead";
  } else if (hours >= WEEKLY_ON_TRACK_HOURS) {
    status = "on-track";
  }

  const fillPercent = Math.min((hours / WEEKLY_SCALE_HOURS) * 100, 100);
  const onTrackPercent = (WEEKLY_ON_TRACK_HOURS / WEEKLY_SCALE_HOURS) * 100;
  const targetPercent = (WEEKLY_TARGET_HOURS / WEEKLY_SCALE_HOURS) * 100;

  return `
    <div class="scale scale--weekly is-${status}">
      <span class="scale-label">This week</span>
      <span class="scale-figures">
        ${formatHours(hours)}
        <em>/ ${WEEKLY_ON_TRACK_HOURS}–${WEEKLY_TARGET_HOURS} h</em>
      </span>
      <div class="scale-track">
        <div class="scale-fill" style="width: ${fillPercent}%"></div>
        <div class="scale-tick scale-tick--minor" style="left: ${onTrackPercent}%"></div>
        <div class="scale-tick scale-tick--major" style="left: ${targetPercent}%"></div>
      </div>
    </div>
  `;
}

/**
 * A measurement against a single nominal value. The tick marks the target; the
 * fill turns amber past it. Overrunning an estimate is information, not failure.
 */
function renderScale(label, actual, nominal, fillPercent, isOver) {
  return `
    <div class="scale ${isOver ? "is-over" : ""}">
      <span class="scale-label">${label}</span>
      <span class="scale-figures">${formatHours(actual)} <em>/ ${formatHours(nominal)} h</em></span>
      <div class="scale-track">
        <div class="scale-fill" style="width: ${fillPercent}%"></div>
        <div class="scale-tick"></div>
      </div>
    </div>
  `;
}

/** Total minutes logged per day, keyed by ISO date. */
function minutesByDay() {
  const totals = {};

  state.sessions.forEach(function (session) {
    const existing = totals[session.date] || 0;
    totals[session.date] = existing + session.minutes;
  });

  return totals;
}

/**
 * Seven intensity steps in half-hour bands up to 1 h, then hourly to 4 h+.
 * The bands are tighter at the bottom because most days land there, and a
 * 30-minute session should look different from a two-hour one.
 */
function intensityLevel(minutes) {
  if (minutes === 0) {
    return 0;
  }

  let level = INTENSITY_THRESHOLDS.length + 1;

  INTENSITY_THRESHOLDS.forEach(function (threshold, index) {
    const isSmaller = minutes < threshold;
    const notYetSet = level === INTENSITY_THRESHOLDS.length + 1;

    if (isSmaller && notYetSet) {
      level = index + 1;
    }
  });

  return level;
}

/**
 * Shows the month being viewed on the right and the one before it on the left.
 * This is a record of what happened, so the view looks backwards — a future
 * month would only ever be empty.
 */
function renderCalendar() {
  const totals = minutesByDay();

  const current = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth(), 1);
  const previous = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() - 1, 1);

  const label = document.getElementById("calendar-month");
  const previousLabel = MONTH_NAMES[previous.getMonth()] + " " + previous.getFullYear();
  const currentLabel = MONTH_NAMES[current.getMonth()] + " " + current.getFullYear();
  label.textContent = previousLabel + " – " + currentLabel;

  const container = document.getElementById("calendar-grid");
  container.innerHTML =
    renderMonth(previous, totals) + renderMonth(current, totals);
}

function renderMonth(monthDate, totals) {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();

  const firstOfMonth = new Date(year, month, 1);
  const weekday = firstOfMonth.getDay();
  const blanksBefore = weekday === 0 ? 6 : weekday - 1;

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const headers = WEEKDAY_INITIALS.map(function (initial) {
    return `<div class="cal-head">${initial}</div>`;
  });

  const blanks = [];
  for (let i = 0; i < blanksBefore; i += 1) {
    blanks.push(`<div class="cal-day is-blank"></div>`);
  }

  const days = [];
  for (let day = 1; day <= daysInMonth; day += 1) {
    const date = isoDate(new Date(year, month, day));
    const minutes = totals[date] || 0;
    const level = intensityLevel(minutes);
    const hours = minutes / 60;
    const figure = minutes > 0 ? formatHours(hours) : "";

    days.push(`
      <div class="cal-day level-${level}" title="${date}">
        <span class="cal-date">${day}</span>
        <span class="cal-hours">${figure}</span>
      </div>
    `);
  }

  return `
    <div class="cal-month">
      <div class="cal-month-name">${MONTH_NAMES[month]}</div>
      <div class="cal-weeks">
        ${headers.join("")}${blanks.join("")}${days.join("")}
      </div>
    </div>
  `;
}

/**
 * Moves the view by whole months. Forward stops at the current month, since
 * there is nothing to see beyond today.
 */
function shiftCalendarMonth(offset) {
  const year = calendarMonth.getFullYear();
  const month = calendarMonth.getMonth();
  const proposed = new Date(year, month + offset, 1);

  const today = new Date();
  const thisMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  if (proposed > thisMonth) {
    return;
  }

  calendarMonth = proposed;
  renderCalendar();
  updateCalendarNav();
}

/** Disables the forward arrow when the view is already at the current month. */
function updateCalendarNav() {
  const today = new Date();
  const atCurrentMonth =
    calendarMonth.getFullYear() === today.getFullYear() &&
    calendarMonth.getMonth() === today.getMonth();

  const nextButton = document.getElementById("calendar-next");
  nextButton.disabled = atCurrentMonth;
}

function renderProjects() {
  const container = document.getElementById("projects-list");
  const hasProjects = state.projects.length > 0;

  if (!hasProjects) {
    container.innerHTML = `<p class="empty">No projects yet.</p>`;
    return;
  }

  const rows = state.projects.map(project => renderProject(project));
  container.innerHTML = rows.join("");
}

function renderProject(project) {
  const hours = hoursLoggedFor(project.id);
  const name = escapeHtml(project.name);
  const description = escapeHtml(project.description);

  let link = name;
  if (isSafeUrl(project.url)) {
    const url = escapeHtml(project.url);
    link = `<a href="${url}" target="_blank" rel="noopener">${name}</a>`;
  }

  return `
    <div class="project" data-project-id="${project.id}">
      <div class="project-main">
        <span class="project-name">${link}</span>
        <p class="project-description">${description}</p>
      </div>
      <div class="project-figures">
        <span class="project-hours">${formatHours(hours)} h</span>
        <button type="button" class="log-button" data-target-type="project" data-target-id="${project.id}">
          + Log time
        </button>
      </div>
    </div>
  `;
}

function renderCurriculum() {
  const container = document.getElementById("modules-list");
  const moduleBlocks = MODULES.map(module => renderModule(module));
  container.innerHTML = moduleBlocks.join("");
}

function renderModule(module) {
  const actual = moduleActualHours(module);
  const planned = modulePlannedHours(module);
  const rows = module.resources.map(resource => renderResource(resource));
  const resourceRows = rows.join("");
  const isOver = actual > planned;
  const fillPercent = Math.min((actual / planned) * 100, 100);

  return `
    <details class="module">
      <summary>
        <span class="module-id">${module.id}</span>
        <span class="module-name">${module.name}</span>
        <span class="module-month">${module.month} · ${completedCountFor(module)}/${module.resources.length} done</span>
        <span class="module-hours">${formatHours(actual)} <em>/ ${planned} h</em></span>
        <div class="scale-track ${isOver ? "is-over" : ""}">
          <div class="scale-fill" style="width: ${fillPercent}%"></div>
          <div class="scale-tick"></div>
        </div>
      </summary>
      <div class="resources">
        ${resourceRows}
      </div>
    </details>
  `;
}

function renderResource(resource) {
  const actual = hoursLoggedFor(resource.id);
  const rating = averageRatingFor(resource.id);
  const isUnrated = rating === null;

  let link = resource.name;
  if (resource.url) {
    link = `<a href="${resource.url}" target="_blank" rel="noopener">${resource.name}</a>`;
  }

  const complete = isResourceComplete(resource.id);

  return `
    <div class="resource ${complete ? "is-complete" : ""}" data-resource-id="${resource.id}">
      <div class="resource-main">
        <button type="button" class="tickbox" data-resource-id="${resource.id}"
                aria-pressed="${complete}" aria-label="Mark complete">
          ${complete ? "✓" : ""}
        </button>
        <span class="resource-name">${link}</span>
        <p class="resource-description">${resource.description}</p>
      </div>
      <div class="resource-figures">
        <span class="resource-hours">${formatHours(actual)} / ${resource.plannedHours} h</span>
        <span class="resource-rating ${isUnrated ? "unrated" : ""}">${formatRating(rating)}</span>
        <button type="button" class="log-button" data-target-type="resource" data-target-id="${resource.id}">
          + Log time
        </button>
      </div>
    </div>
  `;
}


/* ========== Session logging ========== */

function newId() {
  // crypto.randomUUID needs a secure context. Falls back for local file:// use.
  if (window.crypto && window.crypto.randomUUID) {
    return window.crypto.randomUUID();
  }
  return String(Date.now()) + "-" + String(Math.random()).slice(2, 8);
}

function openSessionDialog(targetType, targetId, label) {
  pendingTarget = { targetType, targetId };

  const dialog = document.getElementById("session-dialog");
  const title = document.getElementById("session-dialog-title");
  const ratingField = document.getElementById("session-rating-field");
  const dateInput = document.getElementById("session-date");

  title.textContent = label;
  dateInput.value = isoDate(new Date());

  // Projects are never rated, so the control is removed rather than ignored.
  const isProject = targetType === "project";
  ratingField.hidden = isProject;

  dialog.showModal();
}

function closeSessionDialog() {
  const dialog = document.getElementById("session-dialog");
  const form = document.getElementById("session-form");

  form.reset();
  pendingTarget = null;
  dialog.close();
}

function readRating() {
  const isProject = pendingTarget.targetType === "project";
  if (isProject) {
    return null;
  }

  const value = document.getElementById("session-rating").value;
  if (value === "") {
    return null;
  }
  return Number(value);
}

function saveSessionFromForm() {
  const minutes = Number(document.getElementById("session-minutes").value);

  const session = {
    id: newId(),
    date: document.getElementById("session-date").value,
    targetType: pendingTarget.targetType,
    targetId: pendingTarget.targetId,
    minutes: minutes,
    rating: readRating(),
    notes: document.getElementById("session-notes").value,
    blocker: document.getElementById("session-blocker").value
  };

  state.sessions.push(session);
  saveState();
  render();
}


/* ========== Projects ========== */

function openProjectDialog() {
  const dialog = document.getElementById("project-dialog");
  dialog.showModal();
}

function closeProjectDialog() {
  const dialog = document.getElementById("project-dialog");
  const form = document.getElementById("project-form");

  form.reset();
  dialog.close();
}

function saveProjectFromForm() {
  const project = {
    id: newId(),
    name: document.getElementById("project-name").value,
    description: document.getElementById("project-description").value,
    url: document.getElementById("project-url").value,
    createdAt: isoDate(new Date())
  };

  state.projects.push(project);
  saveState();
  render();
}


/* ========== Export and import ========== */

function exportData() {
  const json = JSON.stringify(state, null, 2);

  // A Blob is a file-like object held in memory. createObjectURL gives it a
  // temporary URL so a link can point at it, which is how a browser downloads
  // something that was never on a server.
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "ai-journey-" + isoDate(new Date()) + ".json";

  // The link must be in the document for click() to work in some browsers,
  // and the URL must stay alive until the download has actually started —
  // click() schedules it rather than performing it immediately.
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  window.setTimeout(function () {
    URL.revokeObjectURL(url);
  }, 1000);
}

/**
 * Checks imported data before it is trusted.
 *
 * This is the only place data enters the application from outside, so it is
 * the only place that validates. Everything past this point assumes the shape
 * is correct, and that assumption is only safe because of this function.
 *
 * Returns an array of problems. Empty means the data is usable.
 */
function findImportProblems(data) {
  const problems = [];

  if (data === null || typeof data !== "object") {
    problems.push("File does not contain an object.");
    return problems;
  }

  if (!Array.isArray(data.sessions)) {
    problems.push("Missing a sessions array.");
  }

  if (!Array.isArray(data.projects)) {
    problems.push("Missing a projects array.");
  }

  const hasCompleted = data.completedResources === undefined
    || Array.isArray(data.completedResources);

  if (!hasCompleted) {
    problems.push("completedResources is not a list.");
  }

  if (problems.length > 0) {
    return problems;
  }

  data.sessions.forEach(function (session, index) {
    const position = "Session " + (index + 1);

    if (typeof session.id !== "string") {
      problems.push(position + " has no id.");
    }
    if (typeof session.date !== "string") {
      problems.push(position + " has no date.");
    }
    if (typeof session.minutes !== "number" || Number.isNaN(session.minutes)) {
      problems.push(position + " has invalid minutes.");
    }
    if (session.targetType !== "resource" && session.targetType !== "project") {
      problems.push(position + " has an unknown target type.");
    }
    if (typeof session.targetId !== "string") {
      problems.push(position + " has no target.");
    }
  });

  data.projects.forEach(function (project, index) {
    const position = "Project " + (index + 1);

    if (typeof project.id !== "string") {
      problems.push(position + " has no id.");
    }
    if (typeof project.name !== "string") {
      problems.push(position + " has no name.");
    }
  });

  return problems;
}

/**
 * Reading a file takes time, so file.text() hands back a promise rather than
 * the contents. "await" pauses this function until it resolves. The function
 * is marked "async" because only an async function may await.
 */
async function importData(file) {
  let data;

  try {
    const text = await file.text();
    data = JSON.parse(text);
  } catch (error) {
    window.alert("That file is not valid JSON.");
    return;
  }

  const problems = findImportProblems(data);

  if (problems.length > 0) {
    window.alert("Import cancelled:\n\n" + problems.slice(0, 10).join("\n"));
    return;
  }

  const sessionCount = data.sessions.length;
  const projectCount = data.projects.length;
  const confirmed = window.confirm(
    "Replace all current data with " + sessionCount + " sessions and " +
    projectCount + " projects? This cannot be undone."
  );

  if (!confirmed) {
    return;
  }

  state.sessions = data.sessions;
  state.projects = data.projects;
  state.completedResources = data.completedResources || [];
  saveState();
  render();
}


/* ========== Events ========== */

/**
 * Listeners are attached to containers, not to buttons.
 *
 * render() replaces innerHTML, which destroys every element inside it along
 * with any listener attached to them. A listener on the container survives,
 * because the container itself is never replaced. The event bubbles up from
 * whichever button was clicked and we identify it from the event target.
 */
function handleLogButtonClick(event, rowSelector, nameSelector) {
  const button = event.target.closest(".log-button");
  if (!button) {
    return;
  }

  const targetType = button.dataset.targetType;
  const targetId = button.dataset.targetId;
  const row = button.closest(rowSelector);
  const label = row.querySelector(nameSelector).textContent.trim();

  openSessionDialog(targetType, targetId, label);
}

function wireEvents() {
  const modulesList = document.getElementById("modules-list");

  modulesList.addEventListener("click", function (event) {
    const tickbox = event.target.closest(".tickbox");

    if (tickbox) {
      toggleResourceComplete(tickbox.dataset.resourceId);
      return;
    }

    handleLogButtonClick(event, ".resource", ".resource-name");
  });

  const projectsList = document.getElementById("projects-list");

  projectsList.addEventListener("click", function (event) {
    handleLogButtonClick(event, ".project", ".project-name");
  });

  const calendarPrev = document.getElementById("calendar-prev");

  calendarPrev.addEventListener("click", function () {
    shiftCalendarMonth(-1);
  });

  const calendarNext = document.getElementById("calendar-next");

  calendarNext.addEventListener("click", function () {
    shiftCalendarMonth(1);
  });

  const addProjectButton = document.getElementById("add-project-button");

  addProjectButton.addEventListener("click", function () {
    openProjectDialog();
  });

  const projectForm = document.getElementById("project-form");

  projectForm.addEventListener("submit", function () {
    saveProjectFromForm();
    closeProjectDialog();
  });

  const projectCancel = document.getElementById("project-cancel");

  projectCancel.addEventListener("click", function () {
    closeProjectDialog();
  });

  const exportButton = document.getElementById("export-button");

  exportButton.addEventListener("click", function () {
    exportData();
  });

  const importButton = document.getElementById("import-button");
  const importFile = document.getElementById("import-file");

  // The file input is hidden because browsers style it badly and cannot be
  // restyled. The visible button forwards the click to it.
  importButton.addEventListener("click", function () {
    importFile.click();
  });

  importFile.addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
      importData(file);
    }
    // Cleared so selecting the same file twice still fires a change event.
    event.target.value = "";
  });

  const form = document.getElementById("session-form");

  form.addEventListener("submit", function () {
    saveSessionFromForm();
    closeSessionDialog();
  });

  const cancelButton = document.getElementById("session-cancel");

  cancelButton.addEventListener("click", function () {
    closeSessionDialog();
  });
}
