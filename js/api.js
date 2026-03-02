// ============================================================
//  Wellness Challenge 2026 — API layer (Google Apps Script)
// ============================================================

const API = {
    get url() {
        return CONFIG.APPS_SCRIPT_URL;
    },

    async _get(params) {
        const qs = new URLSearchParams({ ...params, _t: Date.now() }).toString();
        const res = await fetch(`${this.url}?${qs}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
    },

    async _post(body) {
        const res = await fetch(this.url, {
            method: "POST",
            headers: { "Content-Type": "text/plain" },
            body: JSON.stringify(body),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
    },

    // ── Auth ─────────────────────────────────────────────────
    async login(username, password) {
        return this._post({ action: "login", username, password });
    },

    // ── Users ────────────────────────────────────────────────
    async getUsers() {
        return this._get({ action: "getUsers" });
    },

    async getUser(userId) {
        return this._get({ action: "getUser", userId });
    },

    async createUser(data) {
        return this._post({ action: "createUser", ...data });
    },

    async updateUser(userId, data) {
        return this._post({ action: "updateUser", userId, ...data });
    },

    async updateUserSelf(userId, data) {
        return this._post({ action: "updateUserSelf", userId, ...data });
    },

    async deleteUser(userId) {
        return this._post({ action: "deleteUser", userId });
    },

    // ── Activities ───────────────────────────────────────────
    async logActivity(data) {
        return this._post({ action: "logActivity", ...data });
    },

    async getActivities(userId) {
        return this._get({ action: "getActivities", userId });
    },

    async getAllActivities() {
        return this._get({ action: "getAllActivities" });
    },

    // ── Images ───────────────────────────────────────────────
    async uploadImage(base64Data, mimeType, folder) {
        return this._post({ action: "uploadImage", base64Data, mimeType, folder });
    },

    async updateProfilePic(userId, base64Data, mimeType) {
        return this._post({ action: "updateProfilePic", userId, base64Data, mimeType });
    },

    // ── Helpers ──────────────────────────────────────────────
    // Convert File object → base64 string
    fileToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                // Strip the data:xxx;base64, prefix
                const base64 = reader.result.split(",")[1];
                resolve({ base64, mimeType: file.type });
            };
            reader.onerror = reject;
        });
    },

    // Count total activities (replaces score system)
    countActivities(logs) {
        return (logs || []).length;
    },
};
