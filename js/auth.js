// ============================================================
//  Wellness Challenge 2026 — Auth
// ============================================================

const AUTH = {
    SESSION_KEY: "wc_session",

    getSession() {
        try {
            return JSON.parse(localStorage.getItem(this.SESSION_KEY));
        } catch { return null; }
    },

    setSession(user) {
        localStorage.setItem(this.SESSION_KEY, JSON.stringify(user));
    },

    clearSession() {
        localStorage.removeItem(this.SESSION_KEY);
    },

    isLoggedIn() {
        return !!this.getSession();
    },

    isAdmin() {
        const s = this.getSession();
        return s && s.role === "admin";
    },

    getCurrentUser() {
        return this.getSession();
    },

    // Call on every protected page load
    requireAuth(redirectTo = "index.html") {
        if (!this.isLoggedIn()) {
            window.location.href = redirectTo;
            return null;
        }
        return this.getSession();
    },

    // Call on every admin-only page load
    requireAdmin(redirectTo = "dashboard.html") {
        const user = this.requireAuth();
        if (user && !this.isAdmin()) {
            window.location.href = redirectTo;
            return null;
        }
        return user;
    },

    logout() {
        this.clearSession();
        window.location.href = "index.html";
    },
};
