/**
 * SkillPath AI - Main Application Controller
 * Handles UI interactions, animations, and tool functionality
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    initHeader();
    initMobileNav();
    initInputTabs();
    initAnalyzer();
    initFAQ();
    initScrollAnimations();
    initCopyButton();
});

/**
 * Header scroll effects
 */
function initHeader() {
    const header = document.getElementById('header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);

            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });

                // Close mobile nav if open
                const mobileNav = document.getElementById('mobileNav');
                if (mobileNav.classList.contains('active')) {
                    mobileNav.classList.remove('active');
                }
            }
        });
    });
}

/**
 * Mobile navigation
 */
function initMobileNav() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mobileNav');
    const mobileNavClose = document.getElementById('mobileNavClose');

    mobileMenuBtn.addEventListener('click', () => {
        mobileNav.classList.add('active');
    });

    mobileNavClose.addEventListener('click', () => {
        mobileNav.classList.remove('active');
    });

    // Close on link click
    mobileNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('active');
        });
    });
}

/**
 * Input tabs switching
 */
function initInputTabs() {
    const tabs = document.querySelectorAll('.input-tab');
    const descriptionPanel = document.getElementById('descriptionPanel');
    const urlPanel = document.getElementById('urlPanel');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Show/hide panels
            if (tab.dataset.tab === 'description') {
                descriptionPanel.classList.remove('hidden');
                urlPanel.classList.add('hidden');
            } else {
                descriptionPanel.classList.add('hidden');
                urlPanel.classList.remove('hidden');
            }
        });
    });
}

/**
 * Main analyzer functionality
 */
function initAnalyzer() {
    const analyzeBtn = document.getElementById('analyzeBtn');
    const jobDescription = document.getElementById('jobDescription');
    const jobUrl = document.getElementById('jobUrl');
    const loadingState = document.getElementById('loadingState');

    analyzeBtn.addEventListener('click', async () => {
        // Get input based on active tab
        const activeTab = document.querySelector('.input-tab.active');
        let input = '';

        if (activeTab.dataset.tab === 'description') {
            input = jobDescription.value.trim();
        } else {
            // URL feature - show helpful message
            const urlInput = jobUrl.value.trim();
            if (urlInput) {
                showInfo('💡 Tip: For best results, please copy the job description from the link and paste it in the "Paste Job Description" tab. We cannot directly access external job sites.');
                return;
            }
        }

        if (!input || input.length < 50) {
            showError('Please enter a more detailed job description (at least 50 characters). Copy the full job posting text and paste it here.');
            return;
        }

        // Show loading state
        analyzeBtn.disabled = true;
        loadingState.classList.add('active');

        // Simulate analysis delay for better UX
        await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));

        try {
            // Analyze the job description
            const results = jobAnalyzer.analyze(input);

            // Track analytics
            if (typeof StorageManager !== 'undefined') {
                const allSkills = Object.values(results.skillsByCategory)
                    .flat()
                    .map(s => s.name);
                StorageManager.trackAnalysis(allSkills);
            }

            // Save roadmap to localStorage for the results page
            const roadmapData = {
                ...results,
                timestamp: new Date().toISOString()
            };
            localStorage.setItem('skillpath_current_roadmap', JSON.stringify(roadmapData));

            // Hide loading and redirect to roadmap page
            loadingState.classList.remove('active');
            window.location.href = 'roadmap.html';

        } catch (error) {
            loadingState.classList.remove('active');
            showError(error.message);
        }

        analyzeBtn.disabled = false;
    });
}

/**
 * Generate sample description from URL for demo purposes
 */
function generateSampleFromUrl(url) {
    // Since we can't fetch external URLs, provide helpful message
    if (url.includes('linkedin.com')) {
        return `Senior Software Engineer at Tech Company

We are looking for a Senior Software Engineer to join our growing team.

Requirements:
- 5+ years of experience in software development
- Strong proficiency in JavaScript, TypeScript, and React
- Experience with Node.js and RESTful APIs
- Familiarity with cloud services (AWS, GCP, or Azure)
- Experience with SQL and NoSQL databases
- Git version control
- Excellent problem-solving and communication skills

Nice to have:
- Experience with Docker and Kubernetes
- CI/CD pipeline experience
- Agile/Scrum methodology

We offer competitive salary, remote work options, and great benefits.`;
    }

    if (url.includes('ss.lv')) {
        return `Web Developer Position

We are seeking a talented Web Developer to join our team.

Required Skills:
- HTML, CSS, JavaScript
- React or Vue.js experience
- PHP and Laravel knowledge
- MySQL database experience
- Git version control
- Good communication skills in English

Benefits:
- Competitive salary
- Flexible working hours
- Professional development opportunities`;
    }

    // Generic sample for other URLs
    return `Software Developer Position

Required qualifications:
- Bachelor's degree in Computer Science or related field
- 3+ years of experience in software development
- Proficiency in at least one programming language (Python, Java, JavaScript)
- Experience with web frameworks
- Database knowledge (SQL)
- Strong problem-solving skills
- Good communication and teamwork abilities

Preferred:
- Cloud experience (AWS/Azure)
- Agile development experience
- DevOps practices knowledge`;
}

/**
 * Display analysis results
 */
function displayResults(results) {
    // Update job summary
    document.getElementById('jobTitle').textContent = results.metadata.title;

    const jobMeta = document.getElementById('jobMeta');
    jobMeta.innerHTML = `
    <div class="job-meta-item">
      <span>📊</span> <span>Experience: ${results.experienceLevel}</span>
    </div>
    <div class="job-meta-item">
      <span>💼</span> <span>Type: ${results.jobType}</span>
    </div>
    <div class="job-meta-item">
      <span>🏠</span> <span>${results.metadata.workMode}</span>
    </div>
    <div class="job-meta-item">
      <span>🎯</span> <span>${results.totalSkills} skills detected</span>
    </div>
  `;

    // Display skill categories
    const skillCategories = document.getElementById('skillCategories');
    skillCategories.innerHTML = '';

    const categoryIcons = {
        // Tech categories
        'Programming Languages': '💻',
        'Frontend Frameworks': '🎨',
        'Backend Technologies': '⚙️',
        'Databases': '🗄️',
        'Cloud & DevOps': '☁️',
        'Tools & Version Control': '🔧',
        'Data Science & AI': '🤖',
        'API & Integration': '🔗',
        'Testing': '✅',
        // Non-tech categories
        'Customer Service': '🎧',
        'Office & Administrative': '📂',
        'Communication Skills': '💬',
        'Languages': '🌍',
        'Sales & Marketing': '📈',
        'Finance & Accounting': '💰',
        'Healthcare & Safety': '🏥',
        'Food & Hospitality': '🍽️',
        // General categories
        'Soft Skills': '🤝',
        'Project Management': '📋'
    };

    for (const [category, skills] of Object.entries(results.skillsByCategory)) {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'skill-category';

        categoryDiv.innerHTML = `
      <div class="skill-category-header">
        <div class="skill-category-icon">${categoryIcons[category] || '📌'}</div>
        <h5>${category}</h5>
      </div>
      <div class="skills-list">
        ${skills.map(skill => `
          <span class="skill-tag priority-${skill.priority}" title="${skill.priority} priority">
            ${skill.name}
          </span>
        `).join('')}
      </div>
    `;

        skillCategories.appendChild(categoryDiv);
    }

    // Display roadmap
    const roadmapTimeline = document.getElementById('roadmapTimeline');
    roadmapTimeline.innerHTML = '';

    results.roadmap.forEach(item => {
        const roadmapItem = document.createElement('div');
        roadmapItem.className = 'roadmap-item';

        const resourceLinks = item.resources.length > 0
            ? item.resources.map(r => `
          <a href="${r.url}" target="_blank" rel="noopener noreferrer" class="resource-link">
            ${r.free ? '🆓' : '💰'} ${r.platform}
          </a>
        `).join('')
            : '<span style="color: var(--color-text-muted); font-size: 12px;">No specific resources available</span>';

        roadmapItem.innerHTML = `
      <div class="roadmap-dot"></div>
      <div class="roadmap-card">
        <div class="roadmap-card-header">
          <h5>${item.order}. ${item.skill}</h5>
          <span class="time-estimate">⏱️ ${item.timeToLearn}</span>
        </div>
        <p>${item.description}</p>
        <div class="resources-list">
          ${resourceLinks}
        </div>
      </div>
    `;

        roadmapTimeline.appendChild(roadmapItem);
    });
}

/**
 * Show error message
 */
function showError(message) {
    // Create toast notification
    const toast = document.createElement('div');
    toast.style.cssText = `
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: var(--color-error);
    color: white;
    padding: 16px 24px;
    border-radius: 12px;
    font-size: 14px;
    z-index: 9999;
    animation: fadeIn 0.3s ease;
    max-width: 90%;
    text-align: center;
  `;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

/**
 * Show info message (blue toast)
 */
function showInfo(message) {
    const toast = document.createElement('div');
    toast.style.cssText = `
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: var(--color-info);
    color: white;
    padding: 16px 24px;
    border-radius: 12px;
    font-size: 14px;
    z-index: 9999;
    animation: fadeIn 0.3s ease;
    max-width: 90%;
    text-align: center;
    line-height: 1.5;
  `;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 5000);
}

/**
 * FAQ accordion functionality
 */
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            // Close other items
            faqItems.forEach(other => {
                if (other !== item && other.classList.contains('active')) {
                    other.classList.remove('active');
                }
            });

            // Toggle current item
            item.classList.toggle('active');
        });
    });
}

/**
 * Scroll-triggered animations
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => observer.observe(el));
}

/**
 * Copy roadmap to clipboard
 */
function initCopyButton() {
    const copyBtn = document.getElementById('copyResultsBtn');

    copyBtn.addEventListener('click', () => {
        const resultsSection = document.getElementById('resultsSection');

        // Build text version of roadmap
        const title = document.getElementById('jobTitle').textContent;
        const roadmapItems = document.querySelectorAll('.roadmap-item');

        let text = `🎯 SkillPath AI - Skill Roadmap\n`;
        text += `${'='.repeat(40)}\n\n`;
        text += `📋 Position: ${title}\n\n`;
        text += `📍 Learning Roadmap:\n\n`;

        roadmapItems.forEach(item => {
            const skillName = item.querySelector('h5').textContent;
            const timeEstimate = item.querySelector('.time-estimate').textContent;
            const description = item.querySelector('p').textContent;

            text += `${skillName}\n`;
            text += `   ${timeEstimate}\n`;
            text += `   ${description}\n`;

            const resources = item.querySelectorAll('.resource-link');
            if (resources.length > 0) {
                text += `   Resources:\n`;
                resources.forEach(r => {
                    text += `   - ${r.textContent.trim()}: ${r.href}\n`;
                });
            }
            text += `\n`;
        });

        text += `\n${'='.repeat(40)}\n`;
        text += `Generated by SkillPath AI\n`;

        navigator.clipboard.writeText(text).then(() => {
            // Show success feedback
            const originalText = copyBtn.innerHTML;
            copyBtn.innerHTML = '<span>✅</span> Copied!';
            copyBtn.style.background = 'var(--color-success)';

            setTimeout(() => {
                copyBtn.innerHTML = originalText;
                copyBtn.style.background = '';
            }, 2000);
        }).catch(() => {
            showError('Failed to copy to clipboard');
        });
    });
}

/**
 * Handle tips carousel hover pause
 */
document.addEventListener('DOMContentLoaded', () => {
    const tipsTrack = document.querySelector('.tips-track');

    if (tipsTrack) {
        tipsTrack.addEventListener('mouseenter', () => {
            tipsTrack.style.animationPlayState = 'paused';
        });

        tipsTrack.addEventListener('mouseleave', () => {
            tipsTrack.style.animationPlayState = 'running';
        });
    }
});
