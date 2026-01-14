/**
 * SkillPath AI - Storage Manager
 * Handles localStorage for admin data, analytics, and dynamic content
 */

const StorageManager = {
    // Storage keys
    KEYS: {
        ADMIN_CREDENTIALS: 'skillpath_admin_creds',
        ADMIN_SESSION: 'skillpath_admin_session',
        CUSTOM_SKILLS: 'skillpath_custom_skills',
        CUSTOM_FAQS: 'skillpath_custom_faqs',
        CUSTOM_TIPS: 'skillpath_custom_tips',
        CUSTOM_TESTIMONIALS: 'skillpath_custom_testimonials',
        ANALYTICS: 'skillpath_analytics'
    },

    // Default admin credentials
    DEFAULT_ADMIN: {
        username: 'admin',
        password: 'skillpath2025'
    },

    // ==========================================
    // INITIALIZATION
    // ==========================================
    init() {
        // Initialize admin credentials if not exists
        if (!localStorage.getItem(this.KEYS.ADMIN_CREDENTIALS)) {
            localStorage.setItem(this.KEYS.ADMIN_CREDENTIALS, JSON.stringify(this.DEFAULT_ADMIN));
        }

        // Initialize analytics if not exists
        if (!localStorage.getItem(this.KEYS.ANALYTICS)) {
            localStorage.setItem(this.KEYS.ANALYTICS, JSON.stringify({
                totalAnalyses: 0,
                skillsDetected: {},
                dailyUsage: {},
                lastUpdated: new Date().toISOString()
            }));
        }
    },

    // ==========================================
    // AUTHENTICATION
    // ==========================================
    login(username, password) {
        const creds = JSON.parse(localStorage.getItem(this.KEYS.ADMIN_CREDENTIALS));
        if (creds && creds.username === username && creds.password === password) {
            const session = {
                loggedIn: true,
                loginTime: new Date().toISOString(),
                expires: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
            };
            localStorage.setItem(this.KEYS.ADMIN_SESSION, JSON.stringify(session));
            return true;
        }
        return false;
    },

    logout() {
        localStorage.removeItem(this.KEYS.ADMIN_SESSION);
    },

    isLoggedIn() {
        const session = JSON.parse(localStorage.getItem(this.KEYS.ADMIN_SESSION));
        if (session && session.loggedIn && session.expires > Date.now()) {
            return true;
        }
        this.logout();
        return false;
    },

    changePassword(currentPassword, newPassword) {
        const creds = JSON.parse(localStorage.getItem(this.KEYS.ADMIN_CREDENTIALS));
        if (creds && creds.password === currentPassword) {
            creds.password = newPassword;
            localStorage.setItem(this.KEYS.ADMIN_CREDENTIALS, JSON.stringify(creds));
            return true;
        }
        return false;
    },

    // ==========================================
    // ANALYTICS
    // ==========================================
    trackAnalysis(skills) {
        const analytics = JSON.parse(localStorage.getItem(this.KEYS.ANALYTICS)) || {
            totalAnalyses: 0,
            skillsDetected: {},
            dailyUsage: {},
            lastUpdated: new Date().toISOString()
        };

        // Increment total
        analytics.totalAnalyses++;

        // Track skill frequency
        skills.forEach(skill => {
            const skillLower = skill.toLowerCase();
            analytics.skillsDetected[skillLower] = (analytics.skillsDetected[skillLower] || 0) + 1;
        });

        // Track daily usage
        const today = new Date().toISOString().split('T')[0];
        analytics.dailyUsage[today] = (analytics.dailyUsage[today] || 0) + 1;

        analytics.lastUpdated = new Date().toISOString();
        localStorage.setItem(this.KEYS.ANALYTICS, JSON.stringify(analytics));
    },

    getAnalytics() {
        return JSON.parse(localStorage.getItem(this.KEYS.ANALYTICS)) || {
            totalAnalyses: 0,
            skillsDetected: {},
            dailyUsage: {},
            lastUpdated: null
        };
    },

    resetAnalytics() {
        localStorage.setItem(this.KEYS.ANALYTICS, JSON.stringify({
            totalAnalyses: 0,
            skillsDetected: {},
            dailyUsage: {},
            lastUpdated: new Date().toISOString()
        }));
    },

    // ==========================================
    // CUSTOM SKILLS MANAGEMENT
    // ==========================================
    getCustomSkills() {
        return JSON.parse(localStorage.getItem(this.KEYS.CUSTOM_SKILLS)) || {};
    },

    saveCustomSkill(skillKey, skillData) {
        const skills = this.getCustomSkills();
        skills[skillKey] = skillData;
        localStorage.setItem(this.KEYS.CUSTOM_SKILLS, JSON.stringify(skills));
    },

    deleteCustomSkill(skillKey) {
        const skills = this.getCustomSkills();
        delete skills[skillKey];
        localStorage.setItem(this.KEYS.CUSTOM_SKILLS, JSON.stringify(skills));
    },

    // ==========================================
    // CONTENT MANAGEMENT
    // ==========================================
    getCustomFAQs() {
        return JSON.parse(localStorage.getItem(this.KEYS.CUSTOM_FAQS)) || null;
    },

    saveCustomFAQs(faqs) {
        localStorage.setItem(this.KEYS.CUSTOM_FAQS, JSON.stringify(faqs));
    },

    getCustomTips() {
        return JSON.parse(localStorage.getItem(this.KEYS.CUSTOM_TIPS)) || null;
    },

    saveCustomTips(tips) {
        localStorage.setItem(this.KEYS.CUSTOM_TIPS, JSON.stringify(tips));
    },

    getCustomTestimonials() {
        return JSON.parse(localStorage.getItem(this.KEYS.CUSTOM_TESTIMONIALS)) || null;
    },

    saveCustomTestimonials(testimonials) {
        localStorage.setItem(this.KEYS.CUSTOM_TESTIMONIALS, JSON.stringify(testimonials));
    },

    // ==========================================
    // UTILITY
    // ==========================================
    exportData() {
        return {
            customSkills: this.getCustomSkills(),
            customFAQs: this.getCustomFAQs(),
            customTips: this.getCustomTips(),
            customTestimonials: this.getCustomTestimonials(),
            analytics: this.getAnalytics()
        };
    },

    clearAllData() {
        Object.values(this.KEYS).forEach(key => {
            localStorage.removeItem(key);
        });
        this.init();
    }
};

// Initialize on load
StorageManager.init();
