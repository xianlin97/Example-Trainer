const STORAGE_KEY = "egtrainer:v1";
const SETTINGS_KEY = "egtrainer:ai-settings";
const DEFAULT_API_URL = "https://api.openai.com/v1/chat/completions";
const CUSTOM_API_URL_MODE = "custom";
const API_URL_OPTIONS = [
  { id: "openai", label: "OpenAI", url: DEFAULT_API_URL, defaultModel: "gpt-4o-mini" },
  { id: "deepseek", label: "DeepSeek", url: "https://api.deepseek.com/chat/completions", defaultModel: "deepseek-v4-flash" }
];
const LAST_PUBLIC_DICTIONARY_KEY = "egtrainer:last-public-dictionary";
const MOBILE_NAV_MEDIA = "(max-width: 760px)";
const PUBLIC_DICTIONARIES = [
  { name: "A", title: "LLA Lexicon A", file: "dicts/LLA_LEXICON_A-dictionary.json", dictionaryId: "lla-lexicon-a", stats: { topics: 13, expressions: 641, examples: 951 } },
  { name: "B", title: "LLA Lexicon B", file: "dicts/LLA_LEXICON_B-dictionary.json", dictionaryId: "lla-lexicon-b", stats: { topics: 33, expressions: 1250, examples: 1987 } },
  { name: "C", title: "LLA Lexicon C", file: "dicts/LLA_LEXICON_C-dictionary.json", dictionaryId: "lla-lexicon-c", stats: { topics: 62, expressions: 2613, examples: 3851 } },
  { name: "D", title: "LLA Lexicon D", file: "dicts/LLA_LEXICON_D-dictionary.json", dictionaryId: "lla-lexicon-d", stats: { topics: 27, expressions: 942, examples: 1441 } },
  { name: "E", title: "LLA Lexicon E", file: "dicts/LLA_LEXICON_E-dictionary.json", dictionaryId: "lla-lexicon-e", stats: { topics: 14, expressions: 560, examples: 884 } },
  { name: "F", title: "LLA Lexicon F", file: "dicts/LLA_LEXICON_F-dictionary.json", dictionaryId: "lla-lexicon-f", stats: { topics: 125, expressions: 6532, examples: 9959 } },
  { name: "G", title: "LLA Lexicon G", file: "dicts/LLA_LEXICON_G-dictionary.json", dictionaryId: "lla-lexicon-g", stats: { topics: 131, expressions: 6641, examples: 9744 } },
  { name: "H", title: "LLA Lexicon H", file: "dicts/LLA_LEXICON_H-dictionary.json", dictionaryId: "lla-lexicon-h", stats: { topics: 25, expressions: 873, examples: 1315 } },
  { name: "I", title: "LLA Lexicon I", file: "dicts/LLA_LEXICON_I-dictionary.json", dictionaryId: "lla-lexicon-i", stats: { topics: 21, expressions: 1034, examples: 1530 } },
  { name: "J", title: "LLA Lexicon J", file: "dicts/LLA_LEXICON_J-dictionary.json", dictionaryId: "lla-lexicon-j", stats: { topics: 55, expressions: 2794, examples: 4419 } },
  { name: "K", title: "LLA Lexicon K", file: "dicts/LLA_LEXICON_K-dictionary.json", dictionaryId: "lla-lexicon-k", stats: { topics: 21, expressions: 709, examples: 1058 } },
  { name: "L", title: "LLA Lexicon L", file: "dicts/LLA_LEXICON_L-dictionary.json", dictionaryId: "lla-lexicon-l", stats: { topics: 76, expressions: 3070, examples: 5331 } },
  { name: "M", title: "LLA Lexicon M", file: "dicts/LLA_LEXICON_M-dictionary.json", dictionaryId: "lla-lexicon-m", stats: { topics: 78, expressions: 3681, examples: 5818 } },
  { name: "N", title: "LLA Lexicon N", file: "dicts/LLA_LEXICON_N-dictionary.json", dictionaryId: "lla-lexicon-n", stats: { topics: 185, expressions: 8266, examples: 13057 } },
  { name: "Collins C4", title: "Collins C4", file: "dicts/collins-c4-dictionary.json", dictionaryId: "collins-c4", stats: { topics: 8, expressions: 144, examples: 660 } }
];
const PUBLIC_DICTIONARY_GROUPS = [
  {
    id: "lla-lexicon",
    name: "LLA Lexicon",
    parts: PUBLIC_DICTIONARIES.filter(item => item.dictionaryId.startsWith("lla-lexicon-"))
  },
  {
    id: "collins-c4",
    name: "Collins C4",
    parts: PUBLIC_DICTIONARIES.filter(item => item.dictionaryId === "collins-c4")
  }
];
const DEFAULT_PROMPT = `目标表达: {expression}
中文: {chinese}
用户: {userTranslation}
参考: {reference}
按以下格式回复，总字数不超过150字，用【】标记错误，用「」标记建议:
1. 语法: 
2. 用词 (3条): 
3. 翻译技巧:`;

const els = {
  galleryView: document.getElementById("galleryView"),
  gallerySearch: document.getElementById("gallerySearch"),
  dictionaryGallery: document.getElementById("dictionaryGallery"),
  galleryImportBtn: document.getElementById("galleryImportBtn"),
  galleryHelpBtn: document.getElementById("galleryHelpBtn"),
  gallerySettingsBtn: document.getElementById("gallerySettingsBtn"),
  galleryReturnStudyBtn: document.getElementById("galleryReturnStudyBtn"),
  appShell: document.querySelector(".app-shell"),
  studyMain: document.getElementById("studyMain"),
  topbar: document.getElementById("topbar"),
  topbarInfo: document.querySelector(".topbar-info"),
  topActions: document.querySelector(".top-actions"),
  revealTopbarBtn: document.getElementById("revealTopbarBtn"),
  collapseTopbarBtn: document.getElementById("collapseTopbarBtn"),
  topicRail: document.getElementById("topicRail"),
  collapseNavBtn: document.getElementById("collapseNavBtn"),
  expandNavBtn: document.getElementById("expandNavBtn"),
  mobileExpandNavBtn: document.getElementById("mobileExpandNavBtn"),
  topicSearch: document.getElementById("topicSearch"),
  topicList: document.getElementById("topicList"),
  dictionaryName: document.getElementById("dictionaryName"),
  progressLine: document.getElementById("progressLine"),
  loader: document.getElementById("loader"),
  loaderHint: document.getElementById("loaderHint"),
  dictionaryFileInput: document.getElementById("dictionaryFileInput"),
  dictionaryFileName: document.getElementById("dictionaryFileName"),
  reviewPanel: document.getElementById("reviewPanel"),
  reviewTodayBtn: document.getElementById("reviewTodayBtn"),
  review7Btn: document.getElementById("review7Btn"),
  review30Btn: document.getElementById("review30Btn"),
  reviewStartDate: document.getElementById("reviewStartDate"),
  reviewEndDate: document.getElementById("reviewEndDate"),
  reviewCount: document.getElementById("reviewCount"),
  startReviewBtn: document.getElementById("startReviewBtn"),
  studyPanel: document.getElementById("studyPanel"),
  completePanel: document.getElementById("completePanel"),
  completeTitle: document.getElementById("completeTitle"),
  completeText: document.getElementById("completeText"),
  contextLine: document.getElementById("contextLine"),
  contextToggle: document.getElementById("contextToggle"),
  expressionText: document.getElementById("expressionText"),
  metaTags: document.getElementById("metaTags"),
  explanationPanel: document.getElementById("explanationPanel"),
  explanationContent: document.getElementById("explanationContent"),
  promptLabel: document.getElementById("promptLabel"),
  chinesePrompt: document.getElementById("chinesePrompt"),
  inputArea: document.getElementById("inputArea"),
  translationInput: document.getElementById("translationInput"),
  submitBtn: document.getElementById("submitBtn"),
  comparisonArea: document.getElementById("comparisonArea"),
  userTranslationView: document.getElementById("userTranslationView"),
  referenceView: document.getElementById("referenceView"),
  greenMarkBtn: document.getElementById("greenMarkBtn"),
  redMarkBtn: document.getElementById("redMarkBtn"),
  clearMarksBtn: document.getElementById("clearMarksBtn"),
  aiResult: document.getElementById("aiResult"),
  runAiBtn: document.getElementById("runAiBtn"),
  addAiToNoteBtn: document.getElementById("addAiToNoteBtn"),
  studyNote: document.getElementById("studyNote"),
  historyPanel: document.getElementById("historyPanel"),
  historyList: document.getElementById("historyList"),
  nextBtn: document.getElementById("nextBtn"),
  backToGalleryBtn: document.getElementById("backToGalleryBtn"),
  skipExpressionBtn: document.getElementById("skipExpressionBtn"),
  skipExpressionBtnAfter: document.getElementById("skipExpressionBtnAfter"),
  restartBtn: document.getElementById("restartBtn"),
  exportBtn: document.getElementById("exportBtn"),
  exitReviewBtn: document.getElementById("exitReviewBtn"),
  settingsBtn: document.getElementById("settingsBtn"),
  settingsDialog: document.getElementById("settingsDialog"),
  closeSettingsBtn: document.getElementById("closeSettingsBtn"),
  apiKeyInput: document.getElementById("apiKeyInput"),
  apiUrlSelect: document.getElementById("apiUrlSelect"),
  customApiUrlField: document.getElementById("customApiUrlField"),
  apiUrlInput: document.getElementById("apiUrlInput"),
  modelInput: document.getElementById("modelInput"),
  promptInput: document.getElementById("promptInput"),
  aiAutoRunInput: document.getElementById("aiAutoRunInput"),
  enterSubmitInput: document.getElementById("enterSubmitInput"),
  exportTodayOnlyInput: document.getElementById("exportTodayOnlyInput"),
  clearPracticeBtn: document.getElementById("clearPracticeBtn"),
  saveSettingsBtn: document.getElementById("saveSettingsBtn"),
  testAiBtn: document.getElementById("testAiBtn"),
  settingsStatus: document.getElementById("settingsStatus"),
  helpDialog: document.getElementById("helpDialog"),
  closeHelpBtn: document.getElementById("closeHelpBtn"),
  partsDialog: document.getElementById("partsDialog"),
  partsTitle: document.getElementById("partsTitle"),
  partsSummary: document.getElementById("partsSummary"),
  partsList: document.getElementById("partsList"),
  closePartsBtn: document.getElementById("closePartsBtn")
};

let dictionary = null;
let flatExamples = [];
let exampleIndexById = new Map();
let topicFirstFlatIndex = [];
let topicExampleCounts = [];
let currentFlatIndex = 0;
let isComplete = false;
let activeMarkable = null;
let currentDictionaryStorageId = "";
let store = loadStore();
let settings = loadSettings();
let appMode = "study";
let reviewQueue = [];
let reviewIndex = 0;
let reviewSessionId = "";
let studyFlatIndexBeforeReview = 0;

function practiceStoreKey(dictionaryStorageId = currentDictionaryStorageId) {
  return `${STORAGE_KEY}:practice:${dictionaryStorageId || "unselected"}`;
}

function makeDictionaryStorageId(nextDictionary, file) {
  const baseId = nextDictionary.dictionaryId || nextDictionary.name || "dictionary";
  if (file?.kind === "public") {
    return `${baseId}::public::${file.path}`;
  }
  const fileName = file?.name || "unknown-file";
  const fileSize = file?.size || 0;
  return `${baseId}::${fileName}::${fileSize}`;
}

function loadStore() {
  try {
    if (!currentDictionaryStorageId) return {};
    const parsed = JSON.parse(localStorage.getItem(practiceStoreKey()) || "{}");
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function saveStore() {
  if (!currentDictionaryStorageId) return;
  localStorage.setItem(practiceStoreKey(), JSON.stringify(store));
}

function maybeMigrateLegacyStore() {
  const targetKey = practiceStoreKey();
  if (localStorage.getItem(targetKey)) return;
  const dictionaryId = dictionary?.dictionaryId || "";
  const priorDictionaryKey = dictionaryId ? `${STORAGE_KEY}:practice:${dictionaryId}` : "";
  if (priorDictionaryKey) {
    const priorDictionaryStore = localStorage.getItem(priorDictionaryKey);
    if (priorDictionaryStore) {
      localStorage.setItem(targetKey, priorDictionaryStore);
      return;
    }
  }
  if (dictionaryId !== "lla-dictionary") return;
  const legacy = localStorage.getItem(STORAGE_KEY);
  if (!legacy) return;
  localStorage.setItem(targetKey, legacy);
}

function getApiUrlOption(mode) {
  return API_URL_OPTIONS.find(option => option.id === mode) || null;
}

function getApiUrlOptionByUrl(value) {
  if (!value) return null;
  const apiUrl = normalizeApiUrl(value);
  return API_URL_OPTIONS.find(option => normalizeApiUrl(option.url) === apiUrl) || null;
}

function getApiUrlModeFromStoredSettings(parsed) {
  if (parsed.apiUrlMode === CUSTOM_API_URL_MODE) return CUSTOM_API_URL_MODE;
  if (getApiUrlOption(parsed.apiUrlMode)) return parsed.apiUrlMode;
  return getApiUrlOptionByUrl(parsed.apiUrl)?.id || "openai";
}

function getDefaultModelForApiUrlMode(mode, apiUrl = "") {
  if (mode === CUSTOM_API_URL_MODE && isDeepSeekApiUrl(apiUrl || els.apiUrlInput?.value)) return "deepseek-v4-flash";
  return getApiUrlOption(mode)?.defaultModel || "gpt-4o-mini";
}

function loadSettings() {
  try {
    const parsed = JSON.parse(localStorage.getItem(SETTINGS_KEY) || "{}");
    const apiUrlMode = getApiUrlModeFromStoredSettings(parsed);
    const selectedOption = getApiUrlOption(apiUrlMode);
    const apiUrl = apiUrlMode === CUSTOM_API_URL_MODE
      ? (parsed.apiUrl ? normalizeApiUrl(parsed.apiUrl) : "")
      : selectedOption.url;
    return {
      apiKey: parsed.apiKey || "",
      apiUrlMode,
      apiUrl,
      model: parsed.model || getDefaultModelForApiUrlMode(apiUrlMode, apiUrl),
      customPrompt: typeof parsed.customPrompt === "string" ? parsed.customPrompt.trim() : "",
      aiAutoRun: Boolean(parsed.aiAutoRun),
      enterSubmit: Boolean(parsed.enterSubmit),
      exportTodayOnly: Boolean(parsed.exportTodayOnly)
    };
  } catch {
    return { apiKey: "", apiUrlMode: "openai", apiUrl: DEFAULT_API_URL, model: "gpt-4o-mini", customPrompt: "", aiAutoRun: false, enterSubmit: false, exportTodayOnly: false };
  }
}

function saveSettings() {
  const { prompt, ...settingsToSave } = settings;
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settingsToSave));
}

function isDefaultPrompt(value) {
  return String(value || "").trim() === DEFAULT_PROMPT.trim();
}

function getEffectivePrompt() {
  return settings.customPrompt || DEFAULT_PROMPT;
}

function customPromptFromInput(value) {
  const prompt = String(value || "").trim();
  return prompt && !isDefaultPrompt(prompt) ? prompt : "";
}

function getApiUrlFromForm() {
  const apiUrlMode = els.apiUrlSelect.value;
  if (apiUrlMode === CUSTOM_API_URL_MODE) {
    const customApiUrl = els.apiUrlInput.value.trim();
    return customApiUrl ? normalizeApiUrl(customApiUrl) : "";
  }
  return getApiUrlOption(apiUrlMode)?.url || DEFAULT_API_URL;
}

function validateSettingsForm() {
  if (els.apiUrlSelect.value === CUSTOM_API_URL_MODE && !els.apiUrlInput.value.trim()) {
    els.settingsStatus.textContent = "请选择 DeepSeek、OpenAI，或填写自定义 API URL。";
    return false;
  }
  return true;
}

function settingsFromForm() {
  const apiUrlMode = els.apiUrlSelect.value;
  return {
    apiKey: els.apiKeyInput.value.trim(),
    apiUrlMode,
    apiUrl: getApiUrlFromForm(),
    model: els.modelInput.value.trim() || getDefaultModelForApiUrlMode(apiUrlMode),
    customPrompt: customPromptFromInput(els.promptInput.value),
    aiAutoRun: els.aiAutoRunInput.checked,
    enterSubmit: els.enterSubmitInput.checked,
    exportTodayOnly: els.exportTodayOnlyInput.checked
  };
}

function publicStorageId(entry) {
  return `${entry.dictionaryId}::public::${entry.file}`;
}

function publicPracticeStoreKey(entry) {
  return practiceStoreKey(publicStorageId(entry));
}

function readPracticeStoreByKey(key) {
  try {
    const parsed = JSON.parse(localStorage.getItem(key) || "{}");
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function hasSubmittedRawRecord(rawRecord) {
  const record = migrateRecord(rawRecord);
  return hasSubmittedAttempt(record);
}

function topicIdFromPracticeId(practiceId) {
  return String(practiceId || "").split("/")[0] || "";
}

function expressionIdFromPracticeId(practiceId) {
  return String(practiceId || "").split("/").slice(0, 3).join("/");
}

function partProgress(entry) {
  const partStore = readPracticeStoreByKey(publicPracticeStoreKey(entry));
  const topics = new Set();
  const expressions = new Set();

  Object.entries(partStore).forEach(([practiceId, rawRecord]) => {
    if (!hasSubmittedRawRecord(rawRecord)) return;
    const topicId = topicIdFromPracticeId(practiceId);
    const expressionId = expressionIdFromPracticeId(practiceId);
    if (topicId) topics.add(topicId);
    if (expressionId) expressions.add(expressionId);
  });

  return {
    topics: topics.size,
    expressions: expressions.size
  };
}

function groupStats(group) {
  return group.parts.reduce((stats, part) => {
    stats.topics += part.stats?.topics || 0;
    stats.expressions += part.stats?.expressions || 0;
    stats.examples += part.stats?.examples || 0;
    return stats;
  }, { topics: 0, expressions: 0, examples: 0 });
}

function groupProgress(group) {
  return group.parts.reduce((progress, part) => {
    const next = partProgress(part);
    progress.topics += next.topics;
    progress.expressions += next.expressions;
    return progress;
  }, { topics: 0, expressions: 0 });
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function textToHtml(value) {
  return escapeHtml(value).replaceAll("\n", "<br>");
}

function renderExpressionText(value) {
  const fragment = document.createDocumentFragment();
  const softBreakAfter = new Set(["/", "-", ",", ";", ":", ")"]);

  Array.from(String(value || "")).forEach(char => {
    fragment.appendChild(document.createTextNode(char));
    if (softBreakAfter.has(char)) {
      fragment.appendChild(document.createElement("wbr"));
    }
  });

  els.expressionText.replaceChildren(fragment);
}

function localDateString(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function makeAttempt(mode = "study", sessionId = "") {
  return {
    id: `attempt-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    mode,
    sessionId,
    submitted: false,
    userTranslation: "",
    userHtml: "",
    referenceHtml: "",
    note: "",
    aiEvaluation: "",
    practiceDate: "",
    submittedAt: "",
    updatedAt: ""
  };
}

function touchAttempt(record, attempt) {
  const now = new Date().toISOString();
  attempt.practiceDate = localDateString();
  attempt.updatedAt = now;
  record.lastPracticeDate = attempt.practiceDate;
  record.updatedAt = now;
}

function migrateRecord(record) {
  if (Array.isArray(record.attempts)) return record;
  const attempt = makeAttempt("study");
  attempt.submitted = Boolean(record.submitted);
  attempt.userTranslation = record.userTranslation || "";
  attempt.userHtml = record.userHtml || "";
  attempt.referenceHtml = record.referenceHtml || "";
  attempt.note = record.note || "";
  attempt.aiEvaluation = record.aiEvaluation || "";
  attempt.practiceDate = record.practiceDate || "";
  attempt.submittedAt = record.submittedAt || "";
  attempt.updatedAt = record.updatedAt || "";
  const hasLegacyContent = attempt.submitted || attempt.userTranslation || attempt.note || attempt.aiEvaluation || attempt.userHtml;
  record.attempts = hasLegacyContent ? [attempt] : [];
  record.activeStudyAttemptId = hasLegacyContent ? attempt.id : "";
  record.lastPracticeDate = record.practiceDate || "";
  delete record.submitted;
  delete record.userTranslation;
  delete record.userHtml;
  delete record.referenceHtml;
  delete record.note;
  delete record.aiEvaluation;
  delete record.practiceDate;
  delete record.submittedAt;
  return record;
}

function getRecord(exampleId) {
  if (!store[exampleId]) {
    store[exampleId] = {
      attempts: [],
      activeStudyAttemptId: "",
      lastPracticeDate: "",
      updatedAt: ""
    };
  }
  return migrateRecord(store[exampleId]);
}

function getExistingRecord(exampleId) {
  return store[exampleId] ? migrateRecord(store[exampleId]) : null;
}

function findAttempt(record, attemptId) {
  return record.attempts.find(attempt => attempt.id === attemptId) || null;
}

function getStudyAttempt(record) {
  let attempt = findAttempt(record, record.activeStudyAttemptId);
  if (!attempt) {
    const studyAttempts = record.attempts.filter(item => item.mode === "study");
    attempt = studyAttempts.length ? studyAttempts[studyAttempts.length - 1] : null;
  }
  if (!attempt) {
    attempt = makeAttempt("study");
    record.attempts.push(attempt);
  }
  record.activeStudyAttemptId = attempt.id;
  return attempt;
}

function getReviewAttempt(record) {
  let attempt = record.attempts.find(item => item.mode === "review" && item.sessionId === reviewSessionId);
  if (!attempt) {
    attempt = makeAttempt("review", reviewSessionId);
    record.attempts.push(attempt);
  }
  return attempt;
}

function getCurrentAttempt(record) {
  return appMode === "review" ? getReviewAttempt(record) : getStudyAttempt(record);
}

function getSubmittedAttempts(record) {
  return record.attempts.filter(attempt => attempt.submitted);
}

function hasSubmittedAttempt(record) {
  return getSubmittedAttempts(record).length > 0;
}

function isEmptyAttempt(attempt) {
  return !attempt.submitted &&
    !attempt.userTranslation &&
    !attempt.userHtml &&
    !attempt.referenceHtml &&
    !attempt.note &&
    !attempt.aiEvaluation;
}

function pruneEmptyAttempt(recordId, record, attempt) {
  if (!isEmptyAttempt(attempt)) return;
  record.attempts = record.attempts.filter(item => item.id !== attempt.id);
  if (record.activeStudyAttemptId === attempt.id) {
    record.activeStudyAttemptId = "";
  }
  if (!record.attempts.length) {
    delete store[recordId];
  }
}

function buildFlatIndex() {
  flatExamples = [];
  exampleIndexById = new Map();
  topicFirstFlatIndex = [];
  topicExampleCounts = [];

  dictionary.topics.forEach((topic, topicIndex) => {
    topicFirstFlatIndex[topicIndex] = -1;
    topicExampleCounts[topicIndex] = 0;

    (topic.centers || []).forEach((center, centerIndex) => {
      (center.expressions || []).forEach((expression, expressionIndex) => {
        const examples = expression.examples || [];
        if (!examples.length) {
          const flatIndex = flatExamples.length;
          if (topicFirstFlatIndex[topicIndex] === -1) {
            topicFirstFlatIndex[topicIndex] = flatIndex;
          }
          topicExampleCounts[topicIndex] += 1;
          flatExamples.push({
            type: "expression",
            topicIndex,
            centerIndex,
            expressionIndex,
            exampleIndex: -1,
            exampleId: `${expression.id}/expression-practice`
          });
          exampleIndexById.set(`${expression.id}/expression-practice`, flatIndex);
          return;
        }
        examples.forEach((example, exampleIndex) => {
          const flatIndex = flatExamples.length;
          if (topicFirstFlatIndex[topicIndex] === -1) {
            topicFirstFlatIndex[topicIndex] = flatIndex;
          }
          topicExampleCounts[topicIndex] += 1;
          flatExamples.push({
            type: "example",
            topicIndex,
            centerIndex,
            expressionIndex,
            exampleIndex,
            exampleId: example.id
          });
          exampleIndexById.set(example.id, flatIndex);
        });
      });
    });
  });
}

function currentPosition() {
  if (isComplete) return null;
  if (appMode === "review") return reviewQueue[reviewIndex] || null;
  return flatExamples[currentFlatIndex] || null;
}

function currentData() {
  const pos = currentPosition();
  if (!pos) return null;
  const topic = dictionary.topics[pos.topicIndex];
  const center = topic.centers[pos.centerIndex];
  const expression = center.expressions[pos.expressionIndex];
  const example = pos.type === "example" ? expression.examples[pos.exampleIndex] : null;
  return { pos, topic, center, expression, example };
}

async function init() {
  wireEvents();
  hydrateSettingsForm();
  renderDictionaryPicker("请选择词典开始学习");
  renderGallery();
  showGallery(false);
}

function renderDictionaryPicker(message = "请在设置中选择词典 JSON 文件") {
  dictionary = null;
  flatExamples = [];
  topicFirstFlatIndex = [];
  topicExampleCounts = [];
  currentFlatIndex = 0;
  isComplete = false;
  appMode = "study";
  reviewQueue = [];
  reviewIndex = 0;
  reviewSessionId = "";
  currentDictionaryStorageId = "";
  store = {};
  activeMarkable = null;
  resetStudySurface();
  els.dictionaryName.textContent = "EgTrainer";
  els.progressLine.textContent = message;
  els.topicList.replaceChildren();
  els.loader.classList.remove("hidden");
  els.reviewPanel.classList.add("hidden");
  els.studyPanel.classList.add("hidden");
  els.completePanel.classList.add("hidden");
  els.exitReviewBtn.classList.add("hidden");
  els.loaderHint.textContent = "文件只在当前浏览器中读取，不会上传。";
  els.dictionaryFileName.textContent = "尚未选择";
}

function showStudyView() {
  els.galleryView.classList.add("hidden");
  els.appShell.classList.remove("hidden");
}

function returnToStudyFromGallery() {
  if (!dictionary) return;
  showStudyView();
}

function hasPendingTranslationDraft() {
  if (!dictionary || els.studyPanel.classList.contains("hidden")) return false;
  const data = currentData();
  if (!data) return false;
  const record = getExistingRecord(data.pos.exampleId);
  const attempt = record ? getCurrentAttempt(record) : null;
  return Boolean(els.translationInput.value.trim() && !attempt?.submitted && els.comparisonArea.classList.contains("hidden"));
}

function showGallery(confirmDraft = true) {
  if (confirmDraft && hasPendingTranslationDraft()) {
    const confirmed = window.confirm("当前输入尚未提交，是否返回词典库？");
    if (!confirmed) return;
  }
  if (dictionary) persistVisibleRecord();
  els.appShell.classList.add("hidden");
  els.galleryView.classList.remove("hidden");
  renderGallery();
}

function renderGallery() {
  const query = (els.gallerySearch.value || "").trim().toLowerCase();
  const fragment = document.createDocumentFragment();
  els.galleryReturnStudyBtn.classList.toggle("hidden", !dictionary);

  PUBLIC_DICTIONARY_GROUPS
    .filter(group => !query || group.name.toLowerCase().includes(query))
    .forEach(group => {
      const stats = groupStats(group);
      const progress = groupProgress(group);
      const hasProgress = progress.topics > 0;
      const card = document.createElement("article");
      card.className = "dictionary-card";
      card.innerHTML = `
        <div>
          <div class="dictionary-card-kicker">${group.parts.length > 1 ? `${group.parts.length} 个部分` : "公开词典"}</div>
          <h2>${escapeHtml(group.name)}</h2>
          <div class="dictionary-card-stat">${stats.topics} Topics</div>
          ${hasProgress ? `<div class="dictionary-card-progress">已学习 ${progress.topics} / ${stats.topics} Topics</div>` : ""}
        </div>
        <div class="dictionary-card-actions">
          <button class="primary-button" type="button" data-action="continue">${hasProgress ? "继续学习" : "开始学习"}</button>
          ${group.parts.length > 1 ? `<button class="secondary-button" type="button" data-action="parts">选择部分</button>` : ""}
        </div>
      `;
      card.querySelector('[data-action="continue"]').addEventListener("click", () => loadGroupDefault(group));
      const partsButton = card.querySelector('[data-action="parts"]');
      if (partsButton) {
        partsButton.addEventListener("click", () => showPartsDialog(group));
      }
      fragment.appendChild(card);
    });

  els.dictionaryGallery.replaceChildren(fragment);
}

function loadGroupDefault(group) {
  const lastFile = localStorage.getItem(LAST_PUBLIC_DICTIONARY_KEY);
  const remembered = group.parts.find(part => part.file === lastFile);
  loadDictionaryFromUrl(remembered || group.parts[0]);
}

function showPartsDialog(group) {
  const stats = groupStats(group);
  els.partsTitle.textContent = `${group.name} · 选择部分`;
  els.partsSummary.textContent = `${stats.topics} Topics · ${stats.expressions} Expressions`;

  const fragment = document.createDocumentFragment();
  group.parts.forEach(part => {
    const progress = partProgress(part);
    const row = document.createElement("button");
    row.className = "part-row";
    row.type = "button";
    row.innerHTML = `
      <span class="part-name">${escapeHtml(part.name)}</span>
      <span>${progress.topics} / ${part.stats.topics} Topics</span>
      <span>${progress.expressions} / ${part.stats.expressions} Expressions</span>
    `;
    row.addEventListener("click", () => {
      els.partsDialog.close();
      loadDictionaryFromUrl(part);
    });
    fragment.appendChild(row);
  });

  els.partsList.replaceChildren(fragment);
  els.partsDialog.showModal();
}

async function loadDictionaryFromUrl(entry) {
  const displayName = entry.title || entry.name;
  showStudyView();
  renderDictionaryPicker(`正在加载公开词典：${displayName}`);
  showStudyView();
  els.loaderHint.textContent = `正在加载公开词典：${displayName}`;
  els.settingsStatus.textContent = `正在加载公开词典：${displayName}`;

  try {
    const response = await fetch(entry.file, { cache: "force-cache" });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const parsed = await response.json();
    validateDictionary(parsed);
    activateDictionary(parsed, { kind: "public", name: displayName, path: entry.file });
    localStorage.setItem(LAST_PUBLIC_DICTIONARY_KEY, entry.file);
    els.settingsStatus.textContent = `已加载公开词典：${displayName}`;
  } catch (error) {
    showLoadError(`公开词典加载失败：${displayName}，${error.message}`);
    els.settingsStatus.textContent = `公开词典加载失败：${error.message}`;
  }
}

async function loadSelectedFile(event) {
  const file = event.target.files?.[0];
  event.target.value = "";
  if (!file) return;
  await loadDictionaryFromFile(file);
}

async function loadDictionaryFromFile(file) {
  showStudyView();
  renderDictionaryPicker(`正在读取：${file.name}`);
  showStudyView();
  els.loaderHint.textContent = `正在读取：${file.name}`;
  els.settingsStatus.textContent = `正在读取：${file.name}`;

  try {
    const text = await file.text();
    const parsed = JSON.parse(text);
    validateDictionary(parsed);
    activateDictionary(parsed, file);
    els.settingsStatus.textContent = `已读取词典：${file.name}`;
  } catch (error) {
    showLoadError(`读取失败：${error.message}`);
    els.settingsStatus.textContent = `词典读取失败：${error.message}`;
  }
}

function validateDictionary(candidate) {
  if (!candidate || typeof candidate !== "object") {
    throw new Error("JSON 根节点不是对象。");
  }
  if (!Array.isArray(candidate.topics)) {
    throw new Error("缺少 topics[]。");
  }
  if (!candidate.topics.length) {
    throw new Error("topics[] 为空。");
  }
  const firstTopic = candidate.topics[0];
  if (!firstTopic || typeof firstTopic.word !== "string" || !Array.isArray(firstTopic.centers)) {
    throw new Error("topic 结构不符合要求。");
  }
  const hasExpression = candidate.topics.some(topic =>
    (topic.centers || []).some(center =>
      Array.isArray(center.expressions) && center.expressions.length > 0
    )
  );
  if (!hasExpression) {
    throw new Error("没有找到 expressions[] 表达。");
  }
}

function activateDictionary(nextDictionary, file) {
  dictionary = nextDictionary;
  currentDictionaryStorageId = makeDictionaryStorageId(dictionary, file);
  maybeMigrateLegacyStore();
  store = loadStore();
  appMode = "study";
  reviewQueue = [];
  reviewIndex = 0;
  reviewSessionId = "";
  isComplete = false;
  activeMarkable = null;
  els.dictionaryFileName.textContent = file.name || "已选择词典文件";
  resetStudySurface();
  buildFlatIndex();

  if (!flatExamples.length) {
    throw new Error("词典中没有可学习的内容。");
  }

  els.dictionaryName.textContent = file?.kind === "public" ? file.name : dictionary.name || file.name || "EgTrainer";
  currentFlatIndex = Number(localStorage.getItem(currentIndexKey()) || 0);
  if (!flatExamples[currentFlatIndex]) currentFlatIndex = 0;
  Object.keys(store).forEach(exampleId => getRecord(exampleId));
  saveStore();

  renderTopicList();
  renderCurrent();
  setDefaultStudyChromeCollapsed();
}

function currentIndexKey() {
  return `${STORAGE_KEY}:currentIndex:${currentDictionaryStorageId || "default"}`;
}

function resetStudySurface() {
  els.translationInput.value = "";
  els.userTranslationView.textContent = "";
  els.referenceView.textContent = "";
  els.aiResult.textContent = "";
  els.aiResult.classList.add("hidden");
  els.studyNote.value = "";
  els.historyPanel.classList.add("hidden");
  els.historyList.replaceChildren();
  els.explanationPanel.classList.add("hidden");
  els.explanationPanel.open = false;
  els.explanationContent.replaceChildren();
  els.comparisonArea.classList.add("hidden");
  els.inputArea.classList.remove("hidden");
  els.exitReviewBtn.classList.add("hidden");
}

function showLoadError(message) {
  dictionary = null;
  flatExamples = [];
  exampleIndexById = new Map();
  topicFirstFlatIndex = [];
  topicExampleCounts = [];
  store = {};
  currentDictionaryStorageId = "";
  activeMarkable = null;
  resetStudySurface();
  els.dictionaryFileName.textContent = "尚未选择";
  els.dictionaryName.textContent = "EgTrainer";
  els.progressLine.textContent = "词典读取失败";
  els.topicList.replaceChildren();
  els.loader.classList.remove("hidden");
  els.reviewPanel.classList.add("hidden");
  els.studyPanel.classList.add("hidden");
  els.completePanel.classList.add("hidden");
  els.exitReviewBtn.classList.add("hidden");
  els.loaderHint.textContent = message;
}

function wireEvents() {
  els.gallerySearch.addEventListener("input", renderGallery);
  els.galleryImportBtn.addEventListener("click", () => els.dictionaryFileInput.click());
  els.galleryReturnStudyBtn.addEventListener("click", returnToStudyFromGallery);
  els.galleryHelpBtn.addEventListener("click", () => els.helpDialog.showModal());
  els.closeHelpBtn.addEventListener("click", () => els.helpDialog.close());
  els.gallerySettingsBtn.addEventListener("click", () => {
    hydrateSettingsForm();
    els.settingsDialog.showModal();
  });
  els.backToGalleryBtn.addEventListener("click", () => showGallery(true));
  els.topbar.addEventListener("click", handleTopbarBlankClick);
  els.collapseTopbarBtn.addEventListener("click", () => setTopbarCollapsed(true));
  els.revealTopbarBtn.addEventListener("click", () => setTopbarCollapsed(false));
  els.contextToggle.addEventListener("click", () => toggleContextStrip());
  els.closePartsBtn.addEventListener("click", () => els.partsDialog.close());
  els.collapseNavBtn.addEventListener("click", () => {
    setNavCollapsed(true);
  });
  els.expandNavBtn.addEventListener("click", () => setNavCollapsed(false));
  els.mobileExpandNavBtn.addEventListener("click", () => setNavCollapsed(false));
  document.addEventListener("pointerdown", handleMobileNavOutsidePointerDown);

  els.topicSearch.addEventListener("input", renderTopicList);
  els.submitBtn.addEventListener("click", submitTranslation);
  els.nextBtn.addEventListener("click", goNext);
  els.skipExpressionBtn.addEventListener("click", skipCurrentExpression);
  els.skipExpressionBtnAfter.addEventListener("click", skipCurrentExpression);
  els.restartBtn.addEventListener("click", restart);
  els.exportBtn.addEventListener("click", exportHtml);
  els.exitReviewBtn.addEventListener("click", exitReviewMode);
  els.reviewTodayBtn.addEventListener("click", () => setReviewRangePreset(1));
  els.review7Btn.addEventListener("click", () => setReviewRangePreset(7));
  els.review30Btn.addEventListener("click", () => setReviewRangePreset(30));
  els.reviewStartDate.addEventListener("change", updateReviewCount);
  els.reviewEndDate.addEventListener("change", updateReviewCount);
  els.startReviewBtn.addEventListener("click", startReviewMode);
  els.dictionaryFileInput.addEventListener("change", loadSelectedFile);

  els.translationInput.addEventListener("input", () => {
    const data = currentData();
    if (!data) return;
    const record = getRecord(data.pos.exampleId);
    const attempt = getCurrentAttempt(record);
    if (!attempt.submitted) {
      attempt.userTranslation = els.translationInput.value;
      touchAttempt(record, attempt);
      saveStore();
    }
  });
  els.translationInput.addEventListener("keydown", event => {
    if (!settings.enterSubmit) return;
    if (event.key !== "Enter" || event.shiftKey || event.metaKey || event.ctrlKey || event.altKey || event.isComposing) return;
    event.preventDefault();
    submitTranslation();
  });

  els.studyNote.addEventListener("input", () => {
    const data = currentData();
    if (!data) return;
    const record = getRecord(data.pos.exampleId);
    const attempt = getCurrentAttempt(record);
    attempt.note = els.studyNote.value;
    touchAttempt(record, attempt);
    saveStore();
  });

  for (const node of [els.userTranslationView, els.referenceView]) {
    node.addEventListener("mousedown", () => {
      activeMarkable = node;
    });
    node.addEventListener("mouseup", () => {
      activeMarkable = node;
    });
  }

  for (const button of [els.greenMarkBtn, els.redMarkBtn, els.clearMarksBtn]) {
    button.addEventListener("mousedown", event => event.preventDefault());
  }
  els.greenMarkBtn.addEventListener("click", () => applyMark("green"));
  els.redMarkBtn.addEventListener("click", () => applyMark("red"));
  els.clearMarksBtn.addEventListener("click", clearActiveMarks);

  els.settingsBtn.addEventListener("click", () => {
    hydrateSettingsForm();
    els.settingsDialog.showModal();
  });
  els.saveSettingsBtn.addEventListener("click", event => {
    event.preventDefault();
    if (!validateSettingsForm()) return;
    settings = settingsFromForm();
    saveSettings();
    els.settingsStatus.textContent = "设置已保存。";
    window.setTimeout(() => els.settingsDialog.close(), 350);
  });
  els.apiUrlSelect.addEventListener("change", () => syncApiUrlControls(true));
  els.testAiBtn.addEventListener("click", testAiConnection);
  els.runAiBtn.addEventListener("click", runAiEvaluation);
  els.addAiToNoteBtn.addEventListener("click", addAiToNote);
  els.clearPracticeBtn.addEventListener("click", clearAllPracticeRecords);
}

function hydrateSettingsForm() {
  els.apiKeyInput.value = settings.apiKey || "";
  els.apiUrlSelect.value = settings.apiUrlMode === CUSTOM_API_URL_MODE || getApiUrlOption(settings.apiUrlMode) ? settings.apiUrlMode : "openai";
  els.apiUrlInput.value = els.apiUrlSelect.value === CUSTOM_API_URL_MODE ? settings.apiUrl || DEFAULT_API_URL : "";
  els.modelInput.value = settings.model || "gpt-4o-mini";
  els.promptInput.value = getEffectivePrompt();
  els.aiAutoRunInput.checked = Boolean(settings.aiAutoRun);
  els.enterSubmitInput.checked = Boolean(settings.enterSubmit);
  els.exportTodayOnlyInput.checked = Boolean(settings.exportTodayOnly);
  syncApiUrlControls(false);
  els.settingsStatus.textContent = "";
}

function syncApiUrlControls(shouldSyncModel) {
  const apiUrlMode = els.apiUrlSelect.value;
  const isCustom = apiUrlMode === CUSTOM_API_URL_MODE;
  els.customApiUrlField.hidden = !isCustom;

  if (!shouldSyncModel) return;

  const selectedOption = getApiUrlOption(apiUrlMode);
  if (!selectedOption) return;

  const currentModel = els.modelInput.value.trim();
  const knownDefaultModels = API_URL_OPTIONS.map(option => option.defaultModel);
  if (!currentModel || knownDefaultModels.includes(currentModel)) {
    els.modelInput.value = selectedOption.defaultModel;
  }
}

function setNavCollapsed(collapsed) {
  els.topicRail.classList.toggle("collapsed", collapsed);
  els.appShell.classList.toggle("nav-collapsed", collapsed);
  els.collapseNavBtn.setAttribute("aria-expanded", String(!collapsed));
  els.expandNavBtn.setAttribute("aria-expanded", String(!collapsed));
  els.mobileExpandNavBtn.setAttribute("aria-expanded", String(!collapsed));
}

function handleMobileNavOutsidePointerDown(event) {
  if (!window.matchMedia(MOBILE_NAV_MEDIA).matches) return;
  if (els.appShell.classList.contains("hidden") || els.topicRail.classList.contains("collapsed")) return;
  if (!(event.target instanceof Node)) return;
  if (els.topicRail.contains(event.target) || els.expandNavBtn.contains(event.target) || els.mobileExpandNavBtn.contains(event.target)) return;
  setNavCollapsed(true);
}

function setTopbarCollapsed(collapsed) {
  els.studyMain.classList.toggle("topbar-collapsed", collapsed);
  els.collapseTopbarBtn.setAttribute("aria-expanded", String(!collapsed));
  els.revealTopbarBtn.setAttribute("aria-expanded", String(!collapsed));
}

function handleTopbarBlankClick(event) {
  if (els.studyMain.classList.contains("topbar-collapsed")) return;
  if (!(event.target instanceof Node)) return;
  if (event.target.closest("button, input, textarea, select, a")) return;
  if (event.target === els.topbar || event.target === els.topbarInfo || event.target === els.topActions) {
    setTopbarCollapsed(true);
  }
}

function setDefaultStudyChromeCollapsed() {
  setNavCollapsed(true);
  setTopbarCollapsed(true);
}

function setContextStripExpanded(expanded) {
  els.contextToggle.classList.toggle("expanded", expanded);
  els.contextToggle.setAttribute("aria-expanded", String(expanded));
  if (expanded) {
    fitExpandedContextLine();
  }
}

function toggleContextStrip() {
  setContextStripExpanded(!els.contextToggle.classList.contains("expanded"));
}

function contextLineText(topic, center, compact = false) {
  const order = center.secNumber || center.order || "";
  const centerEnglish = center.english || "";
  if (compact) {
    return [order, centerEnglish].filter(Boolean).join(" · ");
  }
  return [topic.word, order, centerEnglish, center.chinese || ""].filter(Boolean).join(" · ");
}

function fitExpandedContextLine() {
  const data = currentData();
  if (!data) return;
  els.contextLine.textContent = contextLineText(data.topic, data.center, false);
  window.requestAnimationFrame(() => {
    if (!els.contextToggle.classList.contains("expanded")) return;
    if (els.contextLine.scrollWidth > els.contextLine.clientWidth) {
      els.contextLine.textContent = contextLineText(data.topic, data.center, true);
    }
  });
}

function getPracticedExampleCount() {
  return Object.values(store).reduce((count, rawRecord) => {
    const record = migrateRecord(rawRecord);
    return count + (hasSubmittedAttempt(record) ? 1 : 0);
  }, 0);
}

function renderTopicList() {
  if (!dictionary) return;
  const query = els.topicSearch.value.trim().toLowerCase();
  const activeTopicIndex = currentPosition()?.topicIndex;
  const fragment = document.createDocumentFragment();

  const reviewButton = document.createElement("button");
  reviewButton.className = `topic-item review-entry${appMode === "review" || appMode === "reviewSetup" ? " active" : ""}`;
  reviewButton.type = "button";
  reviewButton.title = "查看已练习并进入复习模式";
  reviewButton.innerHTML = `
    <span class="topic-name">已练习</span>
    <span class="topic-count">${getPracticedExampleCount()}</span>
  `;
  reviewButton.addEventListener("click", showReviewSetup);
  fragment.appendChild(reviewButton);

  dictionary.topics.forEach((topic, topicIndex) => {
    if (topicFirstFlatIndex[topicIndex] === -1) return;
    if (query && !topic.word.toLowerCase().includes(query)) return;

    const button = document.createElement("button");
    button.className = `topic-item${appMode === "study" && topicIndex === activeTopicIndex ? " active" : ""}`;
    button.type = "button";
    button.title = topic.word;
    button.innerHTML = `
      <span class="topic-name">${escapeHtml(topic.word)}</span>
      <span class="topic-count">${topicExampleCounts[topicIndex]}</span>
    `;
    button.addEventListener("click", () => startTopic(topicIndex));
    fragment.appendChild(button);
  });

  els.topicList.replaceChildren(fragment);
}

function addDays(date, days) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function setReviewRangePreset(days) {
  const end = new Date();
  const start = addDays(end, -(days - 1));
  els.reviewStartDate.value = localDateString(start);
  els.reviewEndDate.value = localDateString(end);
  updateReviewCount();
}

function getReviewDateRange() {
  const end = els.reviewEndDate.value || localDateString();
  const start = els.reviewStartDate.value || end;
  return start <= end ? { start, end } : { start: end, end: start };
}

function attemptInRange(attempt, range) {
  return attempt.submitted && attempt.practiceDate && attempt.practiceDate >= range.start && attempt.practiceDate <= range.end;
}

function buildReviewQueue() {
  const range = getReviewDateRange();
  const seen = new Set();
  const queue = [];
  flatExamples.forEach(pos => {
    const record = getExistingRecord(pos.exampleId);
    if (!record) return;
    if (seen.has(pos.exampleId)) return;
    if (record.attempts.some(attempt => attemptInRange(attempt, range))) {
      queue.push(pos);
      seen.add(pos.exampleId);
    }
  });
  return queue;
}

function updateReviewCount() {
  if (!dictionary) {
    els.reviewCount.textContent = "0 个练习项";
    return;
  }
  const count = buildReviewQueue().length;
  els.reviewCount.textContent = `${count} 个练习项`;
}

function showReviewSetup() {
  if (!dictionary) return;
  persistVisibleRecord();
  appMode = "reviewSetup";
  isComplete = false;
  els.loader.classList.add("hidden");
  els.studyPanel.classList.add("hidden");
  els.completePanel.classList.add("hidden");
  els.reviewPanel.classList.remove("hidden");
  els.exitReviewBtn.classList.add("hidden");
  if (!els.reviewStartDate.value || !els.reviewEndDate.value) {
    setReviewRangePreset(7);
  } else {
    updateReviewCount();
  }
  els.progressLine.textContent = "已练习 · 选择复习日期范围";
  renderTopicList();
}

function startReviewMode() {
  reviewQueue = buildReviewQueue();
  if (!reviewQueue.length) {
    alert("这个日期范围内没有已练习的内容。");
    return;
  }
  studyFlatIndexBeforeReview = currentFlatIndex;
  reviewIndex = 0;
  reviewSessionId = `review-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  appMode = "review";
  isComplete = false;
  renderCurrent();
}

function exitReviewMode() {
  persistVisibleRecord();
  appMode = "study";
  reviewQueue = [];
  reviewIndex = 0;
  reviewSessionId = "";
  currentFlatIndex = studyFlatIndexBeforeReview;
  isComplete = false;
  renderCurrent();
}

function renderCurrent() {
  const data = currentData();
  if (!data) {
    renderComplete();
    return;
  }

  isComplete = false;
  els.loader.classList.add("hidden");
  els.reviewPanel.classList.add("hidden");
  els.completePanel.classList.add("hidden");
  els.studyPanel.classList.remove("hidden");
  els.exitReviewBtn.classList.toggle("hidden", appMode !== "review");

  const { pos, topic, center, expression, example } = data;
  const hasExample = pos.type === "example";
  const record = getRecord(pos.exampleId);
  const attempt = getCurrentAttempt(record);

  els.contextLine.textContent = contextLineText(topic, center);
  setContextStripExpanded(false);
  renderExpressionText(expression.text);
  renderTags(expression);
  renderExplanation(expression, !hasExample);
  els.promptLabel.textContent = hasExample ? "中文例句" : "暂无例句";
  els.chinesePrompt.textContent = hasExample ? example.chinese || "" : "";
  els.translationInput.value = attempt.userTranslation || "";
  els.translationInput.placeholder = hasExample ? "根据中文例句输入你的英文翻译" : "可选：根据当前表达尝试造一个英文句子";
  els.submitBtn.textContent = hasExample ? "提交" : "继续";
  els.skipExpressionBtn.classList.toggle("hidden", !hasExample);

  const total = flatExamples.length;
  els.progressLine.textContent = appMode === "review"
    ? `复习 · ${reviewIndex + 1} / ${reviewQueue.length}`
    : `进度 ${currentFlatIndex + 1} / ${total}`;

  if (hasExample && attempt.submitted) {
    showComparison(record, attempt, example);
  } else {
    els.inputArea.classList.remove("hidden");
    els.comparisonArea.classList.add("hidden");
    els.historyPanel.classList.add("hidden");
    els.historyList.replaceChildren();
  }

  if (appMode === "study") {
    localStorage.setItem(currentIndexKey(), String(currentFlatIndex));
  }
  renderTopicList();
}

function renderExplanation(expression, defaultOpen) {
  const explanation = typeof expression.explanation === "string" ? expression.explanation.trim() : "";
  if (!explanation) {
    els.explanationPanel.classList.add("hidden");
    els.explanationPanel.open = false;
    els.explanationContent.replaceChildren();
    return;
  }

  const fragment = document.createDocumentFragment();
  explanation.split(/\n\s*\n/).map(paragraph => paragraph.trim()).filter(Boolean).forEach(paragraph => {
    const p = document.createElement("p");
    p.textContent = paragraph;
    fragment.appendChild(p);
  });
  els.explanationContent.replaceChildren(fragment);
  els.explanationPanel.open = defaultOpen;
  els.explanationPanel.classList.remove("hidden");
}

function renderTags(expression) {
  const fragment = document.createDocumentFragment();
  const items = [];
  if (expression.gram) {
    items.push({ text: expression.gram, className: "tag" });
  }
  (expression.labels || []).forEach(label => {
    items.push({ text: label, className: "tag label" });
  });

  items.forEach((item, index) => {
    if (index > 0) {
      const separator = document.createElement("span");
      separator.className = "tag-separator";
      separator.textContent = "·";
      fragment.appendChild(separator);
    }
    const tag = document.createElement("span");
    tag.className = item.className;
    tag.textContent = item.text;
    fragment.appendChild(tag);
  });
  els.metaTags.replaceChildren(fragment);
}

function renderHistory(record, currentAttemptId) {
  const history = getSubmittedAttempts(record).filter(attempt => attempt.id !== currentAttemptId);
  if (!history.length) {
    els.historyPanel.classList.add("hidden");
    els.historyList.replaceChildren();
    return;
  }
  const fragment = document.createDocumentFragment();
  history.slice().reverse().forEach(attempt => {
    const item = document.createElement("div");
    item.className = "history-item";
    item.innerHTML = `
      <div class="history-meta">${attempt.mode === "review" ? "复习" : "学习"} · ${escapeHtml(attempt.practiceDate || "")}</div>
      <div class="history-text">${attempt.userHtml || textToHtml(attempt.userTranslation || "")}</div>
      ${attempt.note ? `<div class="history-note">${textToHtml(attempt.note)}</div>` : ""}
    `;
    fragment.appendChild(item);
  });
  els.historyList.replaceChildren(fragment);
  els.historyPanel.classList.remove("hidden");
}

function showComparison(record, attempt, example) {
  els.inputArea.classList.add("hidden");
  els.comparisonArea.classList.remove("hidden");
  els.userTranslationView.innerHTML = attempt.userHtml || textToHtml(attempt.userTranslation);
  els.referenceView.innerHTML = attempt.referenceHtml || textToHtml(example.english);
  els.aiResult.textContent = attempt.aiEvaluation || "";
  els.aiResult.classList.toggle("hidden", !attempt.aiEvaluation);
  els.studyNote.value = attempt.note || "";
  renderHistory(record, attempt.id);
}

function submitTranslation() {
  const data = currentData();
  if (!data) return;
  const value = els.translationInput.value.trim();
  const hasExample = data.pos.type === "example";

  if (!hasExample) {
    if (value) {
      const record = getRecord(data.pos.exampleId);
      const attempt = getCurrentAttempt(record);
      attempt.submitted = true;
      attempt.userTranslation = value;
      attempt.userHtml = textToHtml(value);
      attempt.referenceHtml = "";
      attempt.submittedAt = attempt.submittedAt || new Date().toISOString();
      touchAttempt(record, attempt);
      saveStore();
      renderTopicList();
    }
    goNext();
    return;
  }

  if (!value) {
    alert("请先输入你的英文翻译。");
    return;
  }

  const record = getRecord(data.pos.exampleId);
  const attempt = getCurrentAttempt(record);
  attempt.submitted = true;
  attempt.userTranslation = value;
  attempt.userHtml = textToHtml(value);
  attempt.referenceHtml = textToHtml(data.example.english || "");
  attempt.submittedAt = attempt.submittedAt || new Date().toISOString();
  touchAttempt(record, attempt);
  saveStore();
  showComparison(record, attempt, data.example);
  renderTopicList();

  if (appMode === "study" && settings.aiAutoRun && settings.apiKey) {
    runAiEvaluation();
  }
}

function startTopic(topicIndex) {
  const nextIndex = topicFirstFlatIndex[topicIndex];
  if (nextIndex === -1) return;
  persistVisibleRecord();
  appMode = "study";
  reviewQueue = [];
  reviewIndex = 0;
  reviewSessionId = "";
  currentFlatIndex = nextIndex;
  renderCurrent();
}

function goNext() {
  persistVisibleRecord();
  if (appMode === "review") {
    if (reviewIndex + 1 < reviewQueue.length) {
      reviewIndex += 1;
      renderCurrent();
    } else {
      renderReviewComplete();
    }
    return;
  }
  if (currentFlatIndex + 1 < flatExamples.length) {
    currentFlatIndex += 1;
    renderCurrent();
  } else {
    renderComplete();
  }
}

function skipCurrentExpression() {
  if (appMode === "review") {
    goNext();
    return;
  }
  const current = currentPosition();
  if (!current) return;
  persistVisibleRecord();
  const nextIndex = flatExamples.findIndex((pos, index) => {
    if (index <= currentFlatIndex) return false;
    return (
      pos.topicIndex !== current.topicIndex ||
      pos.centerIndex !== current.centerIndex ||
      pos.expressionIndex !== current.expressionIndex
    );
  });

  if (nextIndex === -1) {
    renderComplete();
    return;
  }
  currentFlatIndex = nextIndex;
  renderCurrent();
}

function restart() {
  isComplete = false;
  if (appMode === "review") {
    reviewIndex = 0;
    renderCurrent();
    return;
  }
  currentFlatIndex = 0;
  renderCurrent();
}

function renderComplete() {
  isComplete = true;
  els.loader.classList.add("hidden");
  els.reviewPanel.classList.add("hidden");
  els.studyPanel.classList.add("hidden");
  els.completePanel.classList.remove("hidden");
  els.exitReviewBtn.classList.add("hidden");
  els.completeTitle.textContent = "已完成当前词典学习";
  els.completeText.textContent = "可以导出已提交练习的高亮翻译和学习笔记，或回到第一个 Topic 重新开始。";
  els.progressLine.textContent = "已完成当前词典学习";
  localStorage.setItem(currentIndexKey(), String(Math.max(0, flatExamples.length - 1)));
  renderTopicList();
}

function renderReviewComplete() {
  isComplete = true;
  els.loader.classList.add("hidden");
  els.reviewPanel.classList.add("hidden");
  els.studyPanel.classList.add("hidden");
  els.completePanel.classList.remove("hidden");
  els.exitReviewBtn.classList.remove("hidden");
  els.completeTitle.textContent = "已完成本次复习";
  els.completeText.textContent = "可以导出本次复习记录，或退出复习回到普通学习位置。";
  els.progressLine.textContent = "复习完成";
  renderTopicList();
}

function persistVisibleRecord() {
  const data = currentData();
  if (!data) return;
  const recordId = data.pos.exampleId;
  const record = getRecord(recordId);
  const attempt = getCurrentAttempt(record);
  if (attempt.submitted) {
    attempt.userHtml = els.userTranslationView.innerHTML || attempt.userHtml;
    attempt.referenceHtml = els.referenceView.innerHTML || attempt.referenceHtml;
    attempt.note = els.studyNote.value;
  } else {
    attempt.userTranslation = els.translationInput.value;
  }
  if (!isEmptyAttempt(attempt)) {
    touchAttempt(record, attempt);
  } else {
    pruneEmptyAttempt(recordId, record, attempt);
  }
  saveStore();
}

function getSelectionMarkable() {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0 || selection.isCollapsed) return null;
  const range = selection.getRangeAt(0);
  const node = range.commonAncestorContainer.nodeType === Node.ELEMENT_NODE
    ? range.commonAncestorContainer
    : range.commonAncestorContainer.parentElement;
  const markable = node?.closest?.(".markable-text");
  if (!markable || !markable.contains(range.commonAncestorContainer)) return null;
  return { selection, range, markable };
}

function applyMark(color) {
  const selected = getSelectionMarkable();
  if (!selected) {
    alert("请先在用户翻译或参考英文例句中选中文本。");
    return;
  }

  const span = document.createElement("span");
  span.className = color === "green" ? "mark-green" : "mark-red";

  try {
    selected.range.surroundContents(span);
  } catch {
    const contents = selected.range.extractContents();
    span.appendChild(contents);
    selected.range.insertNode(span);
  }

  activeMarkable = selected.markable;
  selected.selection.removeAllRanges();
  saveMarkableHtml(selected.markable);
}

function clearActiveMarks() {
  const selected = getSelectionMarkable();
  const target = selected?.markable || activeMarkable;
  if (!target) {
    alert("请先点击用户翻译或参考英文例句区域。");
    return;
  }

  target.querySelectorAll(".mark-green, .mark-red").forEach(span => {
    span.replaceWith(document.createTextNode(span.textContent));
  });
  target.normalize();
  saveMarkableHtml(target);
}

function saveMarkableHtml(markable) {
  const data = currentData();
  if (!data) return;
  const record = getRecord(data.pos.exampleId);
  const attempt = getCurrentAttempt(record);
  if (markable.dataset.target === "user") {
    attempt.userHtml = markable.innerHTML;
  }
  if (markable.dataset.target === "reference") {
    attempt.referenceHtml = markable.innerHTML;
  }
  touchAttempt(record, attempt);
  saveStore();
}

function buildPrompt(data, attempt) {
  return getEffectivePrompt()
    .replaceAll("{expression}", data.expression?.text || "当前表达为空")
    .replaceAll("{chinese}", data.example?.chinese || "当前表达暂无中文例句")
    .replaceAll("{userTranslation}", attempt.userTranslation || "")
    .replaceAll("{reference}", data.example?.english || "当前表达暂无参考例句");
}

function normalizeApiUrl(value) {
  const trimmed = (value || "").trim();
  if (!trimmed) return DEFAULT_API_URL;
  try {
    const url = new URL(trimmed);
    const path = url.pathname.replace(/\/+$/, "");
    if (!path || path === "") {
      url.pathname = url.hostname === "api.openai.com" ? "/v1/chat/completions" : "/chat/completions";
      return url.toString().replace(/\/$/, "");
    }
    if (path.endsWith("/v1")) {
      url.pathname = `${path}/chat/completions`;
      return url.toString().replace(/\/$/, "");
    }
    return url.toString().replace(/\/$/, "");
  } catch {
    const withoutTrailingSlash = trimmed.replace(/\/+$/, "");
    if (withoutTrailingSlash.endsWith("/v1")) {
      return `${withoutTrailingSlash}/chat/completions`;
    }
    return withoutTrailingSlash;
  }
}

function isDeepSeekApiUrl(value) {
  try {
    return new URL(normalizeApiUrl(value)).hostname.includes("deepseek.com");
  } catch {
    return String(value || "").includes("deepseek.com");
  }
}

function resolveModel() {
  const model = (settings.model || "").trim();
  const defaultModel = getDefaultModelForApiUrlMode(settings.apiUrlMode, settings.apiUrl);
  if (isDeepSeekApiUrl(settings.apiUrl) && (!model || model === "gpt-4o-mini")) {
    return "deepseek-v4-flash";
  }
  return model || defaultModel;
}

async function callAi(message) {
  const selectedOption = getApiUrlOption(settings.apiUrlMode);
  const rawApiUrl = selectedOption ? selectedOption.url : settings.apiUrl;
  if (!rawApiUrl) {
    throw new Error("请先在设置中选择 DeepSeek、OpenAI，或填写自定义 API URL。");
  }
  const apiUrl = normalizeApiUrl(rawApiUrl);
  const body = {
    model: resolveModel(),
    messages: [{ role: "user", content: message }],
    max_tokens: 260,
    stream: false
  };

  if (isDeepSeekApiUrl(apiUrl)) {
    body.thinking = { type: "disabled" };
  } else {
    body.temperature = 0.2;
  }

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${settings.apiKey}`
    },
    body: JSON.stringify(body)
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload.error?.message || `HTTP ${response.status}`);
  }
  return payload.choices?.[0]?.message?.content?.trim() || "没有收到评估内容。";
}

async function runAiEvaluation() {
  const data = currentData();
  if (!data) return;
  if (data.pos.type !== "example") return;
  const record = getRecord(data.pos.exampleId);
  const attempt = getCurrentAttempt(record);
  if (!settings.apiKey) {
    els.aiResult.classList.remove("hidden");
    els.aiResult.textContent = "请先在设置中保存 API Key。";
    return;
  }

  els.runAiBtn.disabled = true;
  els.aiResult.classList.remove("hidden");
  els.aiResult.textContent = "正在评估...";
  try {
    const result = await callAi(buildPrompt(data, attempt));
    attempt.aiEvaluation = result;
    els.aiResult.textContent = result;
    touchAttempt(record, attempt);
    saveStore();
  } catch (error) {
    els.aiResult.textContent = `AI 评估失败：${error.message}`;
  } finally {
    els.runAiBtn.disabled = false;
  }
}

async function testAiConnection() {
  if (!validateSettingsForm()) return;
  settings = settingsFromForm();

  if (!settings.apiKey) {
    els.settingsStatus.textContent = "请先填写 API Key。";
    return;
  }

  els.testAiBtn.disabled = true;
  els.settingsStatus.textContent = "正在测试连接...";
  try {
    await callAi("请只回复 ok。");
    els.settingsStatus.textContent = "连接成功。";
  } catch (error) {
    els.settingsStatus.textContent = `连接失败：${error.message}`;
  } finally {
    els.testAiBtn.disabled = false;
  }
}

function addAiToNote() {
  const data = currentData();
  if (!data) return;
  const record = getRecord(data.pos.exampleId);
  const attempt = getCurrentAttempt(record);
  const aiText = attempt.aiEvaluation || els.aiResult.textContent.trim();
  if (!aiText || aiText.startsWith("未运行评估")) return;

  const addition = `AI评估：\n${aiText}`;
  els.studyNote.value = els.studyNote.value.trim()
    ? `${els.studyNote.value.trim()}\n\n${addition}`
    : addition;
  attempt.note = els.studyNote.value;
  touchAttempt(record, attempt);
  saveStore();
}

function clearAllPracticeRecords() {
  const confirmed = window.confirm("确定要清空所有练习记录吗？此操作会删除翻译、高亮、笔记、AI 评估和复习记录，且无法撤销。");
  if (!confirmed) return;

  store = {};
  saveStore();
  activeMarkable = null;
  reviewQueue = [];
  reviewIndex = 0;
  reviewSessionId = "";
  appMode = "study";
  isComplete = false;
  els.settingsStatus.textContent = "所有练习记录已清空。";

  if (dictionary) {
    renderTopicList();
    renderCurrent();
  } else {
    renderDictionaryPicker();
  }
}

function exportHtml() {
  if (!dictionary) {
    alert("请先选择词典文件。");
    return;
  }
  persistVisibleRecord();
  const rows = [];
  const today = localDateString();
  const todayOnly = Boolean(settings.exportTodayOnly);

  flatExamples.forEach(pos => {
    const topic = dictionary.topics[pos.topicIndex];
    const center = topic.centers[pos.centerIndex];
    const expression = center.expressions[pos.expressionIndex];
    const example = pos.type === "example" ? expression.examples[pos.exampleIndex] : null;
    const record = getExistingRecord(pos.exampleId);
    if (!record) return;
    getSubmittedAttempts(record).forEach(attempt => {
      if (todayOnly && attempt.practiceDate !== today) return;

      rows.push(`
        <tr>
          <td>${attempt.userHtml || textToHtml(attempt.userTranslation || "")}</td>
          <td>
            <div>${example ? attempt.referenceHtml || textToHtml(example.english || "") : `表达：${escapeHtml(expression.text || "")}`}</div>
            <div class="zh">${example ? escapeHtml(example.chinese || "") : "暂无例句"}</div>
            <div class="meta">${attempt.mode === "review" ? "复习" : "学习"} · ${escapeHtml(attempt.practiceDate || "")}</div>
          </td>
          <td>${textToHtml(attempt.note || "")}</td>
        </tr>
      `);
    });
  });

  if (!rows.length) {
    alert(todayOnly ? "今天没有可导出的练习记录。" : "没有可导出的已提交练习记录。");
    return;
  }

  const html = `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <title>${escapeHtml(dictionary.name || "Dictionary")} Study Notes</title>
  <style>
    body { margin: 24px; color: #333; font-family: "Open Sans", Helvetica, Arial, sans-serif; }
    table { width: 100%; border-collapse: collapse; table-layout: fixed; }
    th, td { vertical-align: top; border: 1px solid rgb(0 114 207 / 28%); padding: 12px; line-height: 1.65; }
    th { color: #0072cf; background: rgb(0 136 221 / 6%); text-align: left; }
    td { font-family: Bookerly, Georgia, "Times New Roman", serif; font-size: 17px; }
    .zh { margin-top: 8px; color: #666; font-family: "Open Sans", Helvetica, Arial, sans-serif; font-size: 14px; }
    .meta { margin-top: 8px; color: #666; font-family: "Open Sans", Helvetica, Arial, sans-serif; font-size: 12px; }
    .mark-green { background-color: rgb(46 139 87 / 22%); }
    .mark-red { background-color: rgb(222 0 45 / 18%); }
  </style>
</head>
<body>
  <table>
    <thead>
      <tr>
        <th>用户翻译</th>
        <th>参考英文例句和中文例句</th>
        <th>用户笔记</th>
      </tr>
    </thead>
    <tbody>${rows.join("")}</tbody>
  </table>
</body>
</html>`;

  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${dictionary.dictionaryId || "dictionary"}-study-notes${todayOnly ? `-${today}` : ""}.html`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

init();
