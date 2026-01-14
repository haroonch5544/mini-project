/**
 * SkillPath AI - Auth Client (No Backend Required)
 * Uses localStorage for user authentication and data storage
 */

const AuthClient = {
    KEYS: {
        USERS: 'skillpath_users',
        CURRENT_USER: 'skillpath_current_user',
        ROADMAPS: 'skillpath_user_roadmaps'
    },

    // Get stored user
    getUser() {
        const user = localStorage.getItem(this.KEYS.CURRENT_USER);
        return user ? JSON.parse(user) : null;
    },

    // Check if logged in
    isLoggedIn() {
        return !!this.getUser();
    },

    // Get all users
    getUsers() {
        const users = localStorage.getItem(this.KEYS.USERS);
        return users ? JSON.parse(users) : [];
    },

    // Save users
    saveUsers(users) {
        localStorage.setItem(this.KEYS.USERS, JSON.stringify(users));
    },

    // Sign up
    async signup(name, email, password) {
        const users = this.getUsers();

        // Check if email exists
        if (users.find(u => u.email === email)) {
            throw new Error('Email already registered');
        }

        // Create user
        const newUser = {
            id: 'user_' + Date.now(),
            name,
            email,
            password, // Note: In production, hash this!
            createdAt: new Date().toISOString()
        };

        users.push(newUser);
        this.saveUsers(users);

        // Log in
        const userData = { id: newUser.id, name: newUser.name, email: newUser.email };
        localStorage.setItem(this.KEYS.CURRENT_USER, JSON.stringify(userData));

        return { user: userData };
    },

    // Login
    async login(email, password) {
        const users = this.getUsers();
        const user = users.find(u => u.email === email && u.password === password);

        if (!user) {
            throw new Error('Invalid email or password');
        }

        const userData = { id: user.id, name: user.name, email: user.email };
        localStorage.setItem(this.KEYS.CURRENT_USER, JSON.stringify(userData));

        return { user: userData };
    },

    // Logout
    logout() {
        localStorage.removeItem(this.KEYS.CURRENT_USER);
        window.location.reload();
    },

    // Get all roadmaps for current user
    async getRoadmaps() {
        const user = this.getUser();
        if (!user) return [];

        const allRoadmaps = JSON.parse(localStorage.getItem(this.KEYS.ROADMAPS) || '[]');
        return allRoadmaps.filter(r => r.userId === user.id);
    },

    // Get single roadmap
    async getRoadmap(id) {
        const user = this.getUser();
        if (!user) throw new Error('Not logged in');

        const allRoadmaps = JSON.parse(localStorage.getItem(this.KEYS.ROADMAPS) || '[]');
        const roadmap = allRoadmaps.find(r => r.id === id && r.userId === user.id);

        if (!roadmap) throw new Error('Roadmap not found');
        return roadmap;
    },

    // Save new roadmap
    async saveRoadmap(data) {
        const user = this.getUser();
        if (!user) throw new Error('Not logged in');

        const allRoadmaps = JSON.parse(localStorage.getItem(this.KEYS.ROADMAPS) || '[]');

        const newRoadmap = {
            id: 'roadmap_' + Date.now(),
            userId: user.id,
            jobTitle: data.jobTitle,
            jobType: data.jobType || 'Unknown',
            experienceLevel: data.experienceLevel || 'Not specified',
            roadmap: data.roadmap,
            progress: data.progress || {},
            totalSkills: data.roadmap?.length || 0,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        allRoadmaps.push(newRoadmap);
        localStorage.setItem(this.KEYS.ROADMAPS, JSON.stringify(allRoadmaps));

        return { roadmap: newRoadmap };
    },

    // Update roadmap progress
    async updateProgress(roadmapId, progress) {
        const user = this.getUser();
        if (!user) throw new Error('Not logged in');

        const allRoadmaps = JSON.parse(localStorage.getItem(this.KEYS.ROADMAPS) || '[]');
        const index = allRoadmaps.findIndex(r => r.id === roadmapId && r.userId === user.id);

        if (index === -1) throw new Error('Roadmap not found');

        allRoadmaps[index].progress = progress;
        allRoadmaps[index].updatedAt = new Date().toISOString();
        localStorage.setItem(this.KEYS.ROADMAPS, JSON.stringify(allRoadmaps));

        return { roadmap: allRoadmaps[index] };
    },

    // Delete roadmap
    async deleteRoadmap(roadmapId) {
        const user = this.getUser();
        if (!user) throw new Error('Not logged in');

        const allRoadmaps = JSON.parse(localStorage.getItem(this.KEYS.ROADMAPS) || '[]');
        const filtered = allRoadmaps.filter(r => !(r.id === roadmapId && r.userId === user.id));
        localStorage.setItem(this.KEYS.ROADMAPS, JSON.stringify(filtered));

        return { success: true };
    }
};

// ==========================================
// AUTH UI CONTROLLER
// ==========================================

const AuthUI = {
    init() {
        this.createAuthModal();
        this.updateHeaderUI();
    },

    createAuthModal() {
        if (document.getElementById('authModal')) return;

        const modal = document.createElement('div');
        modal.id = 'authModal';
        modal.className = 'auth-modal-overlay';
        modal.innerHTML = `
      <div class="auth-modal">
        <button class="auth-modal-close" id="authModalClose">&times;</button>
        
        <!-- Login Form -->
        <div class="auth-form" id="loginForm">
          <h2>Welcome Back</h2>
          <p class="auth-subtitle">Sign in to access your roadmaps</p>
          <div class="auth-error" id="loginError"></div>
          
          <div class="input-group">
            <label>Email</label>
            <input type="email" id="loginEmail" class="input-field" placeholder="your@email.com">
          </div>
          <div class="input-group">
            <label>Password</label>
            <input type="password" id="loginPassword" class="input-field" placeholder="••••••••">
          </div>
          
          <button class="btn btn-primary btn-lg" style="width:100%" id="loginBtn">Sign In</button>
          
          <p class="auth-switch">
            Don't have an account? <a href="#" id="showSignup">Sign up</a>
          </p>
        </div>
        
        <!-- Signup Form -->
        <div class="auth-form hidden" id="signupForm">
          <h2>Create Account</h2>
          <p class="auth-subtitle">Start tracking your learning journey</p>
          <div class="auth-error" id="signupError"></div>
          
          <div class="input-group">
            <label>Full Name</label>
            <input type="text" id="signupName" class="input-field" placeholder="John Doe">
          </div>
          <div class="input-group">
            <label>Email</label>
            <input type="email" id="signupEmail" class="input-field" placeholder="your@email.com">
          </div>
          <div class="input-group">
            <label>Password</label>
            <input type="password" id="signupPassword" class="input-field" placeholder="••••••••">
          </div>
          
          <button class="btn btn-primary btn-lg" style="width:100%" id="signupBtn">Create Account</button>
          
          <p class="auth-switch">
            Already have an account? <a href="#" id="showLogin">Sign in</a>
          </p>
        </div>
      </div>
    `;

        document.body.appendChild(modal);

        // Add styles
        if (!document.getElementById('authStyles')) {
            const styles = document.createElement('style');
            styles.id = 'authStyles';
            styles.textContent = `
        .auth-modal-overlay {
          display: none;
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.8);
          backdrop-filter: blur(4px);
          z-index: 9999;
          align-items: center;
          justify-content: center;
        }
        .auth-modal-overlay.active { display: flex; }
        .auth-modal {
          background: var(--color-bg-secondary);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-2xl);
          padding: var(--space-8);
          width: 90%;
          max-width: 400px;
          position: relative;
        }
        .auth-modal-close {
          position: absolute;
          top: 16px; right: 16px;
          background: none;
          border: none;
          color: var(--color-text-muted);
          font-size: 24px;
          cursor: pointer;
        }
        .auth-modal-close:hover { color: var(--color-text-primary); }
        .auth-form h2 { margin-bottom: var(--space-2); text-align: center; }
        .auth-subtitle { 
          color: var(--color-text-muted); 
          text-align: center; 
          margin-bottom: var(--space-6);
          font-size: var(--text-sm);
        }
        .auth-error {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid var(--color-error);
          color: var(--color-error);
          padding: var(--space-3);
          border-radius: var(--radius-md);
          margin-bottom: var(--space-4);
          font-size: var(--text-sm);
          display: none;
        }
        .auth-error.show { display: block; }
        .auth-switch {
          text-align: center;
          margin-top: var(--space-4);
          font-size: var(--text-sm);
          color: var(--color-text-muted);
        }
        .auth-switch a { color: var(--color-accent-purple); }
        .auth-form.hidden { display: none; }
        
        /* User menu in header */
        .user-menu {
          display: flex;
          align-items: center;
          gap: var(--space-3);
        }
        .user-avatar {
          width: 36px;
          height: 36px;
          background: var(--gradient-primary);
          border-radius: var(--radius-full);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: var(--text-sm);
          cursor: pointer;
        }
        .user-dropdown {
          position: relative;
        }
        .user-dropdown-menu {
          position: absolute;
          top: 100%;
          right: 0;
          background: var(--color-bg-secondary);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-lg);
          padding: var(--space-2);
          min-width: 180px;
          display: none;
          z-index: 100;
          margin-top: var(--space-2);
        }
        .user-dropdown:hover .user-dropdown-menu { display: block; }
        .user-dropdown-item {
          display: block;
          padding: var(--space-3) var(--space-4);
          color: var(--color-text-secondary);
          text-decoration: none;
          border-radius: var(--radius-md);
          font-size: var(--text-sm);
        }
        .user-dropdown-item:hover {
          background: var(--color-bg-tertiary);
          color: var(--color-text-primary);
        }
      `;
            document.head.appendChild(styles);
        }

        this.bindEvents();
    },

    bindEvents() {
        // Close modal
        document.getElementById('authModalClose').addEventListener('click', () => this.closeModal());
        document.getElementById('authModal').addEventListener('click', (e) => {
            if (e.target.id === 'authModal') this.closeModal();
        });

        // Toggle forms
        document.getElementById('showSignup').addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('loginForm').classList.add('hidden');
            document.getElementById('signupForm').classList.remove('hidden');
        });
        document.getElementById('showLogin').addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('signupForm').classList.add('hidden');
            document.getElementById('loginForm').classList.remove('hidden');
        });

        // Login submit
        document.getElementById('loginBtn').addEventListener('click', async () => {
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            const errorDiv = document.getElementById('loginError');

            if (!email || !password) {
                errorDiv.textContent = 'Please fill in all fields';
                errorDiv.classList.add('show');
                return;
            }

            try {
                document.getElementById('loginBtn').disabled = true;
                document.getElementById('loginBtn').textContent = 'Signing in...';
                await AuthClient.login(email, password);
                this.closeModal();
                this.updateHeaderUI();
                window.location.reload();
            } catch (error) {
                errorDiv.textContent = error.message;
                errorDiv.classList.add('show');
            } finally {
                document.getElementById('loginBtn').disabled = false;
                document.getElementById('loginBtn').textContent = 'Sign In';
            }
        });

        // Signup submit
        document.getElementById('signupBtn').addEventListener('click', async () => {
            const name = document.getElementById('signupName').value;
            const email = document.getElementById('signupEmail').value;
            const password = document.getElementById('signupPassword').value;
            const errorDiv = document.getElementById('signupError');

            if (!name || !email || !password) {
                errorDiv.textContent = 'Please fill in all fields';
                errorDiv.classList.add('show');
                return;
            }

            if (password.length < 6) {
                errorDiv.textContent = 'Password must be at least 6 characters';
                errorDiv.classList.add('show');
                return;
            }

            try {
                document.getElementById('signupBtn').disabled = true;
                document.getElementById('signupBtn').textContent = 'Creating account...';
                await AuthClient.signup(name, email, password);
                this.closeModal();
                this.updateHeaderUI();
                window.location.reload();
            } catch (error) {
                errorDiv.textContent = error.message;
                errorDiv.classList.add('show');
            } finally {
                document.getElementById('signupBtn').disabled = false;
                document.getElementById('signupBtn').textContent = 'Create Account';
            }
        });
    },

    openModal(mode = 'login') {
        document.getElementById('authModal').classList.add('active');
        // Clear previous errors
        document.getElementById('loginError').classList.remove('show');
        document.getElementById('signupError').classList.remove('show');

        if (mode === 'signup') {
            document.getElementById('loginForm').classList.add('hidden');
            document.getElementById('signupForm').classList.remove('hidden');
        } else {
            document.getElementById('signupForm').classList.add('hidden');
            document.getElementById('loginForm').classList.remove('hidden');
        }
    },

    closeModal() {
        document.getElementById('authModal').classList.remove('active');
    },

    updateHeaderUI() {
        const nav = document.querySelector('.nav');
        if (!nav) return;

        // Remove existing auth button/menu
        const existingAuthBtn = nav.querySelector('.auth-btn, .user-dropdown');
        if (existingAuthBtn) existingAuthBtn.remove();

        if (AuthClient.isLoggedIn()) {
            const user = AuthClient.getUser();
            const initials = user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

            const userMenu = document.createElement('div');
            userMenu.className = 'user-dropdown';
            userMenu.innerHTML = `
        <div class="user-menu">
          <div class="user-avatar">${initials}</div>
        </div>
        <div class="user-dropdown-menu">
          <span class="user-dropdown-item" style="color:var(--color-text-muted);pointer-events:none;">👋 Hi, ${user.name.split(' ')[0]}</span>
          <a href="my-roadmaps.html" class="user-dropdown-item">📚 My Roadmaps</a>
          <a href="#" class="user-dropdown-item" id="logoutBtn">🚪 Logout</a>
        </div>
      `;

            // Insert before Get Started button or at end
            const getStartedBtn = nav.querySelector('.btn-primary');
            if (getStartedBtn) {
                getStartedBtn.style.display = 'none';
            }
            nav.appendChild(userMenu);

            // Bind logout
            setTimeout(() => {
                document.getElementById('logoutBtn')?.addEventListener('click', (e) => {
                    e.preventDefault();
                    AuthClient.logout();
                });
            }, 100);
        } else {
            const authBtn = document.createElement('button');
            authBtn.className = 'btn btn-secondary auth-btn';
            authBtn.textContent = 'Login';
            authBtn.addEventListener('click', () => this.openModal('login'));

            const getStartedBtn = nav.querySelector('.btn-primary');
            if (getStartedBtn) {
                getStartedBtn.parentNode.insertBefore(authBtn, getStartedBtn);
            } else {
                nav.appendChild(authBtn);
            }
        }
    }
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    AuthUI.init();
});
