// ============================================================
//  Wellness Challenge 2026 — Google Apps Script Backend
//  Deploy as: Web App → Execute as Me → Anyone can access
// ============================================================

// ── Configuration ───────────────────────────────────────────
const SHEET_ID              = "1KyRyd_XhMJr6VaqLwfUHsJn2UnLxkPL-xztcNKN3D5Q";
const PROFILE_FOLDER_ID     = "1rIITAWfvrFndUuXCXgEdFymyEphI10zj";
const EVIDENCE_FOLDER_ID    = "12xGiGbLYa7sztwhX-6ldgVk7LlpHdAgo";

// ── CORS helper ─────────────────────────────────────────────
function buildResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

// ── Sheets helpers ───────────────────────────────────────────
function getSheet(name) {
  return SpreadsheetApp.openById(SHEET_ID).getSheetByName(name);
}

function sheetToObjects(sheet) {
  const data = sheet.getDataRange().getValues();
  if (data.length < 2) return [];
  const headers = data[0];
  return data.slice(1).map(row => {
    const obj = {};
    headers.forEach((h, i) => { obj[h] = row[i]; });
    return obj;
  });
}

function generateId() {
  return Utilities.getUuid();
}

// ── doGet ───────────────────────────────────────────────────
function doGet(e) {
  try {
    const action = e.parameter.action;
    switch (action) {
      case "getUsers":        return buildResponse(getUsers());
      case "getUser":         return buildResponse(getUser(e.parameter.userId));
      case "getActivities":   return buildResponse(getActivities(e.parameter.userId));
      case "getAllActivities": return buildResponse(getAllActivities());
      default:                return buildResponse({ success: false, message: "Unknown action: " + action });
    }
  } catch (err) {
    return buildResponse({ success: false, message: err.toString() });
  }
}

// ── doPost ──────────────────────────────────────────────────
function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);
    const action = body.action;
    switch (action) {
      case "login":           return buildResponse(login(body.username, body.password));
      case "createUser":      return buildResponse(createUser(body));
      case "updateUser":      return buildResponse(updateUser(body.userId, body));
      case "updateUserSelf":  return buildResponse(updateUserSelf(body.userId, body));
      case "deleteUser":      return buildResponse(deleteUser(body.userId));
      case "logActivity":     return buildResponse(logActivity(body));
      case "uploadImage":     return buildResponse(uploadImage(body.base64Data, body.mimeType, body.folder));
      case "updateProfilePic":return buildResponse(updateProfilePic(body.userId, body.base64Data, body.mimeType));
      default:                return buildResponse({ success: false, message: "Unknown action: " + action });
    }
  } catch (err) {
    return buildResponse({ success: false, message: err.toString() });
  }
}

// ════════════════════════════════════════════════════════════
//  AUTH
// ════════════════════════════════════════════════════════════
function login(identifier, password) {
  const users = sheetToObjects(getSheet("Users"));
  const user = users.find(u => 
    (u.username === identifier || u.fullName === identifier) && 
    u.password === password
  );
  if (!user) return { success: false, message: "Invalid credentials" };
  const { password: _, ...safeUser } = user;
  return { success: true, user: safeUser };
}

// ════════════════════════════════════════════════════════════
//  USERS
// ════════════════════════════════════════════════════════════
function getUsers() {
  const users = sheetToObjects(getSheet("Users")).map(u => {
    const { password: _, ...safe } = u;
    return safe;
  });
  return { success: true, users };
}

function getUser(userId) {
  const users = sheetToObjects(getSheet("Users"));
  const user = users.find(u => u.userId === userId);
  if (!user) return { success: false, message: "User not found" };
  const { password: _, ...safe } = user;
  return { success: true, user: safe };
}

function createUser(data) {
  const sheet = getSheet("Users");
  const userId = generateId();
  const now = new Date().toISOString();
  sheet.appendRow([
    userId,
    data.username || "",
    data.password || "",
    data.fullName || "",
    data.role || "user",
    data.employeeType || "office",
    "", // profilePicId
    "", // profilePicUrl
    now,
  ]);
  return { success: true, userId };
}

function updateUser(userId, data) {
  const sheet = getSheet("Users");
  const values = sheet.getDataRange().getValues();
  const headers = values[0];
  const uidCol = headers.indexOf("userId");
  for (let i = 1; i < values.length; i++) {
    if (values[i][uidCol] === userId) {
      const row = i + 1;
      const set = (col, val) => {
        const c = headers.indexOf(col);
        if (c >= 0 && val !== undefined) sheet.getRange(row, c + 1).setValue(val);
      };
      set("fullName",     data.fullName);
      set("username",     data.username);
      set("role",         data.role);
      set("employeeType", data.employeeType);
      if (data.password && data.password.trim() !== "") set("password", data.password);
      return { success: true };
    }
  }
  return { success: false, message: "User not found" };
}

function updateUserSelf(userId, data) {
  const sheet = getSheet("Users");
  const values = sheet.getDataRange().getValues();
  const headers = values[0];
  const uidCol = headers.indexOf("userId");
  const userCol = headers.indexOf("username");
  const passCol = headers.indexOf("password");
  
  for (let i = 1; i < values.length; i++) {
    if (values[i][uidCol] === userId) {
      const row = i + 1;
      
      // 1. Verify old password
      if (values[i][passCol] !== data.currentPassword) {
        return { success: false, message: "Invalid current password", code: "INVALID_CURRENT" };
      }
      
      // 2. If username changed, check uniqueness
      if (data.username && data.username !== values[i][userCol]) {
        const usernameExists = values.some((v, idx) => idx !== 0 && idx !== i && v[userCol] === data.username);
        if (usernameExists) return { success: false, message: "Username already exists", code: "USER_EXISTS" };
        sheet.getRange(row, userCol + 1).setValue(data.username);
      }
      
      // 3. Update password if new one provided
      if (data.newPassword && data.newPassword.trim() !== "") {
        sheet.getRange(row, passCol + 1).setValue(data.newPassword);
      }
      
      return { success: true };
    }
  }
  return { success: false, message: "User not found" };
}

function deleteUser(userId) {
  const sheet = getSheet("Users");
  const values = sheet.getDataRange().getValues();
  const uidCol = values[0].indexOf("userId");
  for (let i = 1; i < values.length; i++) {
    if (values[i][uidCol] === userId) {
      sheet.deleteRow(i + 1);
      return { success: true };
    }
  }
  return { success: false, message: "User not found" };
}

// ════════════════════════════════════════════════════════════
//  ACTIVITIES — expanded columns (no JSON blob in sheet)
// ════════════════════════════════════════════════════════════
// ActivityLogs column order:
// logId | userId | username | fullName | activityType |
// date | time | location | distance | runWalkType | steps |
// employeeType | sessionNum | duration | days | note |
// challengeName | description | evidenceFileId | evidenceUrl | createdAt

function logActivity(data) {
  const sheet = getSheet("ActivityLogs");
  const logId = generateId();
  const now   = new Date().toISOString();

  // Look up username + fullName from Users sheet
  let username = "", fullName = "";
  try {
    const users = sheetToObjects(getSheet("Users"));
    const user  = users.find(u => u.userId === data.userId);
    if (user) { username = user.username || ""; fullName = user.fullName || ""; }
  } catch(e) {}

  // Parse details JSON sent from frontend
  let d = {};
  try { d = JSON.parse(data.details || "{}"); } catch(e) {}

  // Build Drive URL for evidence
  let evidenceUrl = "";
  if (data.evidenceFileId) {
    try {
      const file = DriveApp.getFileById(data.evidenceFileId);
      file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
      // Use thumbnail URL — works reliably as <img> src in browser
      evidenceUrl = "https://drive.google.com/thumbnail?id=" + data.evidenceFileId + "&sz=w1000";
    } catch(e) { evidenceUrl = ""; }
  }

  sheet.appendRow([
    logId,
    data.userId         || "",
    username,
    fullName,
    data.activityType   || "",
    d.date              || data.date || now.split("T")[0],
    d.time              || "",
    d.location          || "",
    d.distance          || "",
    d.type              || "",   // run / walk
    d.steps             || "",
    d.employeeType      || "",
    d.sessionNum        || "",
    d.duration          || "",
    d.days              || "",
    d.note              || "",
    d.challengeName     || "",
    d.description       || "",
    data.evidenceFileId || "",
    evidenceUrl,
    now,
  ]);

  return { success: true, logId };
}

function getActivities(userId) {
  const all = sheetToObjects(getSheet("ActivityLogs"));
  const logs = userId ? all.filter(l => l.userId === userId) : all;
  // Re-map to keep frontend API compatible
  return { success: true, logs: logs.map(normalizeLog) };
}

function getAllActivities() {
  const logs = sheetToObjects(getSheet("ActivityLogs"));
  return { success: true, logs: logs.map(normalizeLog) };
}

// Re-assemble a "details" object from flat columns so frontend still works
function normalizeLog(log) {
  return {
    ...log,
    evidenceUrl: log.evidenceUrl || "",
    details: JSON.stringify({
      date:          log.date,
      time:          log.time,
      location:      log.location,
      distance:      log.distance,
      type:          log.runWalkType || log.type,
      steps:         log.steps,
      employeeType:  log.employeeType,
      sessionNum:    log.sessionNum,
      duration:      log.duration,
      days:          log.days,
      note:          log.note,
      challengeName: log.challengeName,
      description:   log.description,
    }),
  };
}

// ════════════════════════════════════════════════════════════
//  IMAGE UPLOAD TO GOOGLE DRIVE
// ════════════════════════════════════════════════════════════
function uploadImage(base64Data, mimeType, folder) {
  const folderId = folder === "evidence" ? EVIDENCE_FOLDER_ID : PROFILE_FOLDER_ID;
  const driveFolder = DriveApp.getFolderById(folderId);
  const blob = Utilities.newBlob(Utilities.base64Decode(base64Data), mimeType, "upload_" + Date.now());
  const file = driveFolder.createFile(blob);
  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  const fileId = file.getId();
  // Use thumbnail URL — works as <img> src without CORS issues
  const url = "https://drive.google.com/thumbnail?id=" + fileId + "&sz=w1000";
  return { success: true, fileId, url };
}

function updateProfilePic(userId, base64Data, mimeType) {
  const res = uploadImage(base64Data, mimeType, "profile");
  if (!res.success) return res;

  const sheet = getSheet("Users");
  const values = sheet.getDataRange().getValues();
  const headers = values[0];
  const uidCol    = headers.indexOf("userId");
  const picIdCol  = headers.indexOf("profilePicId")  + 1;
  const picUrlCol = headers.indexOf("profilePicUrl") + 1;
  for (let i = 1; i < values.length; i++) {
    if (values[i][uidCol] === userId) {
      sheet.getRange(i + 1, picIdCol).setValue(res.fileId);
      sheet.getRange(i + 1, picUrlCol).setValue(res.url);
      return { success: true, fileId: res.fileId, url: res.url };
    }
  }
  return { success: false, message: "User not found" };
}

// ════════════════════════════════════════════════════════════
//  SETUP — Run ONCE to initialise headers + seed accounts
// ════════════════════════════════════════════════════════════
function setupSheets() {
  const ss = SpreadsheetApp.openById(SHEET_ID);

  // ── Users ────────────────────────────────────────────────
  let usersSheet = ss.getSheetByName("Users");
  if (!usersSheet) usersSheet = ss.insertSheet("Users");
  usersSheet.clearContents();
  usersSheet.appendRow(["userId","username","password","fullName","role","employeeType","profilePicId","profilePicUrl","createdAt"]);
  usersSheet.appendRow([Utilities.getUuid(), "admin", "admin1234", "Administrator", "admin", "office", "", "", new Date().toISOString()]);
  usersSheet.appendRow([Utilities.getUuid(), "demo",  "demo1234",  "Demo User",     "user",  "office", "", "", new Date().toISOString()]);

  // ── ActivityLogs ─────────────────────────────────────────
  let logsSheet = ss.getSheetByName("ActivityLogs");
  if (!logsSheet) logsSheet = ss.insertSheet("ActivityLogs");
  logsSheet.clearContents();
  logsSheet.appendRow([
    "logId","userId","username","fullName","activityType",
    "date","time","location","distance","runWalkType","steps",
    "employeeType","sessionNum","duration","days","note",
    "challengeName","description","evidenceFileId","evidenceUrl","createdAt"
  ]);

  // ── Config ───────────────────────────────────────────────
  let configSheet = ss.getSheetByName("Config");
  if (!configSheet) configSheet = ss.insertSheet("Config");
  configSheet.clearContents();
  configSheet.appendRow(["key","value"]);
  configSheet.appendRow(["challengeStart","2026-01-01"]);
  configSheet.appendRow(["profileFolderId",  PROFILE_FOLDER_ID]);
  configSheet.appendRow(["evidenceFolderId", EVIDENCE_FOLDER_ID]);

  Logger.log("✅ Setup complete! Admin: admin / admin1234  |  Demo: demo / demo1234");
}
