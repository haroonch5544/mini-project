/**
 * SkillPath AI - Admin Panel Controller
 */

document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    initLogin();
    initLogout();
    initTabs();
    initSkillsManager();
    initContentEditors();
    initSettings();
});

// ==========================================
// AUTHENTICATION
// ==========================================
function checkAuth() {
    if (StorageManager.isLoggedIn()) {
        showDashboard();
    } else {
        showLogin();
    }
}

function showLogin() {
    document.getElementById('loginContainer').style.display = 'block';
    document.getElementById('dashboard').classList.remove('active');
}

function showDashboard() {
    document.getElementById('loginContainer').style.display = 'none';
    document.getElementById('dashboard').classList.add('active');
    loadAnalytics();
    loadCustomSkills();
    loadFAQs();
    loadTips();
    loadTestimonials();
}

function initLogin() {
    const form = document.getElementById('loginForm');
    const errorDiv = document.getElementById('loginError');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (StorageManager.login(username, password)) {
            errorDiv.classList.remove('show');
            showDashboard();
        } else {
            errorDiv.classList.add('show');
        }
    });
}

function initLogout() {
    document.getElementById('logoutBtn').addEventListener('click', () => {
        StorageManager.logout();
        showLogin();
    });
}

// ==========================================
// TABS
// ==========================================
function initTabs() {
    const tabs = document.querySelectorAll('.admin-tab');
    const panels = document.querySelectorAll('.tab-panel');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));

            tab.classList.add('active');
            document.getElementById(`${tab.dataset.tab}Panel`).classList.add('active');
        });
    });
}

// ==========================================
// ANALYTICS
// ==========================================
function loadAnalytics() {
    const analytics = StorageManager.getAnalytics();

    document.getElementById('totalAnalyses').textContent = analytics.totalAnalyses;
    document.getElementById('uniqueSkills').textContent = Object.keys(analytics.skillsDetected).length;

    const today = new Date().toISOString().split('T')[0];
    document.getElementById('todayUsage').textContent = analytics.dailyUsage[today] || 0;

    // Render top skills chart
    const chartContainer = document.getElementById('topSkillsChart');
    const skills = Object.entries(analytics.skillsDetected)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10);

    if (skills.length === 0) {
        chartContainer.innerHTML = '<p style="color:var(--color-text-muted);">No data yet.</p>';
        return;
    }

    const maxValue = skills[0][1];
    chartContainer.innerHTML = skills.map(([skill, count]) => {
        const percentage = (count / maxValue) * 100;
        return `
      <div class="skill-bar">
        <div class="skill-bar-label">${skill}</div>
        <div class="skill-bar-track">
          <div class="skill-bar-fill" style="width:${percentage}%">${count}</div>
        </div>
      </div>
    `;
    }).join('');

    // Reset button
    document.getElementById('resetAnalyticsBtn').addEventListener('click', () => {
        if (confirm('Are you sure you want to reset all analytics?')) {
            StorageManager.resetAnalytics();
            loadAnalytics();
        }
    });
}

// ==========================================
// SKILLS MANAGER
// ==========================================
let editingSkillKey = null;

function initSkillsManager() {
    const modal = document.getElementById('skillModal');
    const addBtn = document.getElementById('addSkillBtn');
    const closeBtn = document.getElementById('closeSkillModal');
    const form = document.getElementById('skillForm');

    addBtn.addEventListener('click', () => {
        editingSkillKey = null;
        document.getElementById('skillModalTitle').textContent = 'Add New Skill';
        form.reset();
        modal.classList.add('active');
    });

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('active');
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const skillData = {
            name: document.getElementById('skillName').value,
            category: document.getElementById('skillCategory').value,
            description: document.getElementById('skillDescription').value || `Learn ${document.getElementById('skillName').value} to improve your qualifications.`,
            timeToLearn: document.getElementById('skillTime').value || '1-2 months',
            difficulty: document.getElementById('skillDifficulty').value,
            resources: []
        };

        const key = editingSkillKey || skillData.name.toLowerCase().replace(/\s+/g, ' ');
        StorageManager.saveCustomSkill(key, skillData);

        modal.classList.remove('active');
        loadCustomSkills();
    });
}

function loadCustomSkills() {
    const container = document.getElementById('customSkillsList');
    const skills = StorageManager.getCustomSkills();
    const entries = Object.entries(skills);

    if (entries.length === 0) {
        container.innerHTML = '<p style="color:var(--color-text-muted);">No custom skills added yet. Click "Add Skill" to create one.</p>';
        return;
    }

    container.innerHTML = `
    <table class="data-table">
      <thead>
        <tr>
          <th>Skill</th>
          <th>Category</th>
          <th>Difficulty</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        ${entries.map(([key, skill]) => `
          <tr>
            <td><strong>${skill.name}</strong></td>
            <td>${skill.category}</td>
            <td>${skill.difficulty}</td>
            <td>
              <button class="btn btn-sm btn-secondary" onclick="editSkill('${key}')">Edit</button>
              <button class="btn btn-sm btn-danger" onclick="deleteSkill('${key}')">Delete</button>
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

function editSkill(key) {
    const skills = StorageManager.getCustomSkills();
    const skill = skills[key];
    if (!skill) return;

    editingSkillKey = key;
    document.getElementById('skillModalTitle').textContent = 'Edit Skill';
    document.getElementById('skillName').value = skill.name;
    document.getElementById('skillCategory').value = skill.category;
    document.getElementById('skillDescription').value = skill.description;
    document.getElementById('skillTime').value = skill.timeToLearn;
    document.getElementById('skillDifficulty').value = skill.difficulty;

    document.getElementById('skillModal').classList.add('active');
}

function deleteSkill(key) {
    if (confirm('Delete this skill?')) {
        StorageManager.deleteCustomSkill(key);
        loadCustomSkills();
    }
}

// ==========================================
// CONTENT EDITORS
// ==========================================
const DEFAULT_FAQS = [
    { question: 'Is SkillPath AI free to use?', answer: 'Yes! SkillPath AI is completely free. Analyze unlimited job postings without any cost.' },
    { question: 'What job platforms are supported?', answer: 'Paste descriptions from LinkedIn, ss.lv, Indeed, Glassdoor, and any career page.' },
    { question: 'How accurate is the skill analysis?', answer: 'Our AI achieves 85-95% accuracy for major skill categories.' },
    { question: 'Are the learning resources verified?', answer: 'Yes, we curate resources from Coursera, Udemy, LinkedIn Learning, and freeCodeCamp.' },
    { question: 'Can I save my roadmap?', answer: 'Use the "Copy Roadmap" button to save your roadmap to clipboard.' }
];

const DEFAULT_TIPS = [
    { title: '🎯 Tailor Your Resume', text: 'Customize your resume for each job. Use keywords from the job posting.' },
    { title: '🌐 Build Online Presence', text: 'Create a strong LinkedIn profile. 87% of recruiters use LinkedIn.' },
    { title: '📚 Learn in Public', text: 'Share your learning journey on social media to build credibility.' },
    { title: '🤝 Network Strategically', text: '70% of jobs are filled through networking. Connect wisely.' },
    { title: '💡 Focus on Projects', text: 'Build real projects to showcase skills. Experience beats certificates.' },
    { title: '🔄 Keep Learning', text: 'Dedicate 5+ hours weekly to learning new skills.' }
];

const DEFAULT_TESTIMONIALS = [
    { name: 'Maria K.', role: 'Data Scientist', initials: 'MK', text: 'SkillPath AI gave me a clear 6-month roadmap for Data Science. I landed my dream job!' },
    { name: 'James P.', role: 'Frontend Developer', initials: 'JP', text: 'The learning resources were spot-on. Got hired as Frontend Developer in 3 months.' },
    { name: 'Sarah L.', role: 'Product Manager', initials: 'SL', text: 'As a career switcher, this tool created the perfect step-by-step plan for me.' }
];

function initContentEditors() {
    // FAQs
    document.getElementById('addFaqBtn').addEventListener('click', () => addContentItem('faqs'));
    document.getElementById('saveFaqsBtn').addEventListener('click', () => saveContent('faqs'));

    // Tips
    document.getElementById('addTipBtn').addEventListener('click', () => addContentItem('tips'));
    document.getElementById('saveTipsBtn').addEventListener('click', () => saveContent('tips'));

    // Testimonials
    document.getElementById('addTestimonialBtn').addEventListener('click', () => addContentItem('testimonials'));
    document.getElementById('saveTestimonialsBtn').addEventListener('click', () => saveContent('testimonials'));
}

function loadFAQs() {
    const faqs = StorageManager.getCustomFAQs() || DEFAULT_FAQS;
    renderContentList('faqs', faqs, ['question', 'answer']);
}

function loadTips() {
    const tips = StorageManager.getCustomTips() || DEFAULT_TIPS;
    renderContentList('tips', tips, ['title', 'text']);
}

function loadTestimonials() {
    const testimonials = StorageManager.getCustomTestimonials() || DEFAULT_TESTIMONIALS;
    renderContentList('testimonials', testimonials, ['name', 'role', 'initials', 'text']);
}

function renderContentList(type, items, fields) {
    const container = document.getElementById(`${type}List`);

    container.innerHTML = items.map((item, index) => `
    <div class="content-item" data-index="${index}">
      <div class="content-item-header">
        <strong>#${index + 1}</strong>
        <button class="btn btn-sm btn-danger" onclick="removeContentItem('${type}', ${index})">Remove</button>
      </div>
      ${fields.map(field => `
        <div class="form-row">
          <label>${field.charAt(0).toUpperCase() + field.slice(1)}</label>
          ${field === 'text' || field === 'answer'
            ? `<textarea class="input-field" data-field="${field}" rows="2">${item[field] || ''}</textarea>`
            : `<input type="text" class="input-field" data-field="${field}" value="${item[field] || ''}">`
        }
        </div>
      `).join('')}
    </div>
  `).join('');
}

function addContentItem(type) {
    let items;
    let newItem;

    switch (type) {
        case 'faqs':
            items = StorageManager.getCustomFAQs() || DEFAULT_FAQS;
            newItem = { question: 'New Question?', answer: 'Answer here...' };
            break;
        case 'tips':
            items = StorageManager.getCustomTips() || DEFAULT_TIPS;
            newItem = { title: '💡 New Tip', text: 'Tip content here...' };
            break;
        case 'testimonials':
            items = StorageManager.getCustomTestimonials() || DEFAULT_TESTIMONIALS;
            newItem = { name: 'Name', role: 'Role', initials: 'XX', text: 'Testimonial text...' };
            break;
    }

    items.push(newItem);
    saveContentToStorage(type, items);

    if (type === 'faqs') loadFAQs();
    else if (type === 'tips') loadTips();
    else loadTestimonials();
}

function removeContentItem(type, index) {
    let items;
    switch (type) {
        case 'faqs': items = StorageManager.getCustomFAQs() || DEFAULT_FAQS; break;
        case 'tips': items = StorageManager.getCustomTips() || DEFAULT_TIPS; break;
        case 'testimonials': items = StorageManager.getCustomTestimonials() || DEFAULT_TESTIMONIALS; break;
    }

    items.splice(index, 1);
    saveContentToStorage(type, items);

    if (type === 'faqs') loadFAQs();
    else if (type === 'tips') loadTips();
    else loadTestimonials();
}

function saveContent(type) {
    const container = document.getElementById(`${type}List`);
    const items = [];

    container.querySelectorAll('.content-item').forEach(itemEl => {
        const item = {};
        itemEl.querySelectorAll('[data-field]').forEach(input => {
            item[input.dataset.field] = input.value;
        });
        items.push(item);
    });

    saveContentToStorage(type, items);
    showToast('Content saved successfully!', 'success');
}

function saveContentToStorage(type, items) {
    switch (type) {
        case 'faqs': StorageManager.saveCustomFAQs(items); break;
        case 'tips': StorageManager.saveCustomTips(items); break;
        case 'testimonials': StorageManager.saveCustomTestimonials(items); break;
    }
}

// ==========================================
// SETTINGS
// ==========================================
function initSettings() {
    document.getElementById('passwordForm').addEventListener('submit', (e) => {
        e.preventDefault();

        const current = document.getElementById('currentPassword').value;
        const newPass = document.getElementById('newPassword').value;
        const confirm = document.getElementById('confirmPassword').value;

        if (newPass !== confirm) {
            showToast('Passwords do not match!', 'error');
            return;
        }

        if (newPass.length < 6) {
            showToast('Password must be at least 6 characters!', 'error');
            return;
        }

        if (StorageManager.changePassword(current, newPass)) {
            showToast('Password updated successfully!', 'success');
            document.getElementById('passwordForm').reset();
        } else {
            showToast('Current password is incorrect!', 'error');
        }
    });
}

// ==========================================
// UTILITIES
// ==========================================
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.style.cssText = `
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: ${type === 'success' ? 'var(--color-success)' : 'var(--color-error)'};
    color: white;
    padding: 16px 24px;
    border-radius: 12px;
    font-size: 14px;
    z-index: 9999;
  `;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}
