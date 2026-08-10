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
const WEEKLY_TARGET_HOURS = 15;
const STORAGE_KEY = "ai-journey";


/* ========== State ========== */

/** @type {{sessions: Session[], projects: Project[]}} */
let state = {
  sessions: [],
  projects: []
};


/* ========== Storage ========== */

function loadState() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return;

  try {
    const parsed = JSON.parse(stored);
    state.sessions = parsed.sessions || [];
    state.projects = parsed.projects || [];
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


/* ========== Derived: time ========== */

const MS_PER_DAY = 24 * 60 * 60 * 1000;

function toDateOnly(value) {
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

function isoDate(date) {
  return date.toISOString().slice(0, 10);
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

  container.innerHTML = `
    <p class="week-counter">Week ${currentWeek()}</p>

    <div class="figure">
      <span class="figure-label">Curriculum</span>
      <span class="figure-value">${formatHours(curriculumActual)} / ${formatHours(curriculumPlanned)} h</span>
      <div class="bar"><div class="bar-fill" style="width: ${percent}%"></div></div>
    </div>

    <div class="figure">
      <span class="figure-label">Projects</span>
      <span class="figure-value">${formatHours(projects)} h</span>
    </div>

    <div class="figure">
      <span class="figure-label">Total</span>
      <span class="figure-value">${formatHours(total)} h</span>
    </div>

    <p class="week-figures">
      This week ${formatHours(hoursThisWeek())} / ${WEEKLY_TARGET_HOURS} h
      · Streak ${currentStreak()} days
    </p>
  `;
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

  return `
    <details class="module">
      <summary>
        <span class="module-name">${module.id} · ${module.name}</span>
        <span class="module-month">${module.month}</span>
        <span class="module-hours">${formatHours(actual)} / ${planned} h</span>
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

  return `
    <div class="resource" data-resource-id="${resource.id}">
      <div class="resource-main">
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

/** The resource or project a new session will be attached to. */
let pendingTarget = null;

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
    handleLogButtonClick(event, ".resource", ".resource-name");
  });

  const projectsList = document.getElementById("projects-list");

  projectsList.addEventListener("click", function (event) {
    handleLogButtonClick(event, ".project", ".project-name");
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


/* ========== Start ========== */

loadState();
wireEvents();
render();
