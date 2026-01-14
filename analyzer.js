/**
 * SkillPath AI - Job Analyzer Engine
 * Analyzes job descriptions to extract skills and generate roadmaps
 */

class JobAnalyzer {
    constructor() {
        // Skill patterns with categories - includes both tech and non-tech skills
        this.skillPatterns = {
            'Programming Languages': [
                'javascript', 'python', 'java', 'typescript', 'c++', 'c#', 'ruby', 'php', 'go', 'golang',
                'rust', 'swift', 'kotlin', 'scala', 'r', 'sql', 'perl', 'shell', 'bash'
            ],
            'Frontend Frameworks': [
                'react', 'vue', 'angular', 'svelte', 'next.js', 'nextjs', 'nuxt', 'gatsby', 'remix',
                'ember', 'backbone', 'jquery', 'bootstrap', 'tailwind', 'sass', 'less'
            ],
            'Backend Technologies': [
                'node.js', 'nodejs', 'express', 'django', 'flask', 'fastapi', 'spring', 'spring boot',
                'rails', 'ruby on rails', 'laravel', 'asp.net', '.net', 'nestjs', 'fastify'
            ],
            'Databases': [
                'mysql', 'postgresql', 'postgres', 'mongodb', 'redis', 'elasticsearch', 'cassandra',
                'dynamodb', 'sqlite', 'oracle', 'sql server', 'firebase', 'supabase', 'prisma'
            ],
            'Cloud & DevOps': [
                'aws', 'amazon web services', 'azure', 'google cloud', 'gcp', 'docker', 'kubernetes', 'k8s',
                'terraform', 'jenkins', 'gitlab ci', 'github actions', 'circleci', 'ansible', 'puppet',
                'vagrant', 'nginx', 'apache', 'linux', 'unix', 'ci/cd', 'devops'
            ],
            'Tools & Version Control': [
                'git', 'github', 'gitlab', 'bitbucket', 'jira', 'confluence', 'slack', 'trello',
                'figma', 'sketch', 'photoshop', 'vscode', 'webpack', 'vite', 'npm', 'yarn'
            ],
            'Data Science & AI': [
                'machine learning', 'deep learning', 'tensorflow', 'pytorch', 'keras', 'scikit-learn',
                'pandas', 'numpy', 'data analysis', 'data science', 'nlp', 'natural language processing',
                'computer vision', 'neural networks', 'ai', 'artificial intelligence', 'big data', 'spark'
            ],
            'API & Integration': [
                'rest', 'restful', 'rest api', 'graphql', 'api', 'soap', 'grpc', 'websocket',
                'microservices', 'oauth', 'jwt', 'swagger', 'postman'
            ],
            'Testing': [
                'jest', 'mocha', 'cypress', 'selenium', 'playwright', 'puppeteer', 'junit', 'pytest',
                'testing', 'unit testing', 'integration testing', 'tdd', 'bdd', 'qa'
            ],
            // NON-TECH SKILLS
            'Customer Service': [
                'customer service', 'customer support', 'client relations', 'customer experience',
                'client service', 'customer satisfaction', 'complaint handling', 'customer care',
                'helpdesk', 'service desk', 'front desk', 'reception', 'greeting', 'hospitality'
            ],
            'Office & Administrative': [
                'microsoft office', 'ms office', 'excel', 'word', 'powerpoint', 'outlook',
                'data entry', 'filing', 'scheduling', 'calendar management', 'appointment scheduling',
                'office management', 'administrative', 'admin', 'clerical', 'typing',
                'document management', 'record keeping', 'bookkeeping', 'invoicing',
                'office equipment', 'photocopying', 'scanning', 'faxing', 'mail handling'
            ],
            'Communication Skills': [
                'communication', 'verbal communication', 'written communication', 'presentation',
                'public speaking', 'phone etiquette', 'telephone skills', 'email', 'correspondence',
                'interpersonal', 'negotiation', 'persuasion', 'active listening', 'professional manner'
            ],
            'Languages': [
                'english', 'spanish', 'french', 'german', 'chinese', 'mandarin', 'russian', 'latvian',
                'arabic', 'portuguese', 'italian', 'japanese', 'korean', 'hindi', 'bilingual', 'multilingual'
            ],
            'Soft Skills': [
                'leadership', 'teamwork', 'problem solving', 'analytical', 'time management',
                'collaboration', 'critical thinking', 'creativity', 'attention to detail',
                'self-motivated', 'adaptability', 'mentoring', 'multitasking', 'organized',
                'reliable', 'punctual', 'flexible', 'initiative', 'professional', 'friendly',
                'patient', 'empathy', 'stress management', 'positive attitude', 'work ethic'
            ],
            'Sales & Marketing': [
                'sales', 'marketing', 'lead generation', 'cold calling', 'upselling', 'cross-selling',
                'crm', 'salesforce', 'hubspot', 'social media', 'digital marketing', 'seo',
                'content marketing', 'email marketing', 'brand awareness', 'market research'
            ],
            'Finance & Accounting': [
                'accounting', 'bookkeeping', 'budgeting', 'financial analysis', 'payroll',
                'accounts payable', 'accounts receivable', 'quickbooks', 'sap', 'erp',
                'tax preparation', 'auditing', 'financial reporting', 'invoicing', 'billing'
            ],
            'Project Management': [
                'agile', 'scrum', 'kanban', 'waterfall', 'project management', 'product management',
                'stakeholder', 'sprint', 'backlog', 'roadmap', 'pmp', 'prince2', 'planning',
                'coordination', 'deadline management', 'resource allocation'
            ],
            'Healthcare & Safety': [
                'first aid', 'cpr', 'health and safety', 'hipaa', 'patient care', 'medical terminology',
                'infection control', 'vital signs', 'medication administration', 'healthcare'
            ],
            'Food & Hospitality': [
                'food service', 'food handling', 'food safety', 'bartending', 'barista', 'cooking',
                'menu knowledge', 'wine knowledge', 'table service', 'cash handling', 'pos system',
                'reservation management', 'event planning', 'catering'
            ]
        };

        // Experience level keywords
        this.experienceLevels = {
            'entry': ['entry level', 'junior', 'graduate', 'intern', 'trainee', '0-1 year', '0-2 years', 'fresher', 'beginner', 'no experience', 'will train'],
            'mid': ['mid-level', 'mid level', 'intermediate', '2-5 years', '3-5 years', '2+ years', '3+ years', 'experienced'],
            'senior': ['senior', 'lead', 'principal', '5+ years', '5-10 years', '7+ years', '8+ years', 'staff', 'expert'],
            'executive': ['director', 'vp', 'vice president', 'head of', 'chief', 'executive', 'cto', 'ceo', 'manager', 'supervisor']
        };

        // Job type keywords - expanded for non-tech roles
        this.jobTypes = {
            'frontend': ['frontend', 'front-end', 'front end', 'ui developer', 'web developer'],
            'backend': ['backend', 'back-end', 'back end', 'server-side', 'api developer'],
            'fullstack': ['full stack', 'fullstack', 'full-stack'],
            'data': ['data scientist', 'data analyst', 'data engineer', 'machine learning', 'ml engineer'],
            'devops': ['devops', 'sre', 'site reliability', 'platform engineer', 'infrastructure'],
            'mobile': ['ios', 'android', 'mobile developer', 'react native', 'flutter'],
            'qa': ['qa', 'quality assurance', 'test engineer', 'sdet', 'automation engineer'],
            'administrative': ['receptionist', 'secretary', 'administrative assistant', 'office manager', 'executive assistant', 'clerk', 'admin assistant'],
            'customer service': ['customer service', 'customer support', 'call center', 'helpdesk', 'support representative'],
            'sales': ['sales representative', 'account executive', 'sales manager', 'business development'],
            'marketing': ['marketing', 'social media manager', 'content creator', 'seo specialist'],
            'finance': ['accountant', 'bookkeeper', 'financial analyst', 'auditor', 'payroll'],
            'healthcare': ['nurse', 'medical assistant', 'healthcare', 'caregiver', 'patient care'],
            'hospitality': ['hotel', 'restaurant', 'waiter', 'waitress', 'bartender', 'chef', 'cook', 'hospitality'],
            'retail': ['retail', 'cashier', 'store manager', 'sales associate', 'merchandiser']
        };
    }

    /**
     * Analyze a job description and extract skills
     * @param {string} text - Job description text
     * @returns {object} Analysis results
     */
    analyze(text) {
        if (!text || text.trim().length < 50) {
            throw new Error('Please provide a more detailed job description (at least 50 characters).');
        }

        const normalizedText = text.toLowerCase();

        // Extract job title and metadata
        const metadata = this.extractMetadata(text);

        // Extract skills by category
        const skillsByCategory = this.extractSkillsByCategory(normalizedText);

        // Determine priority levels
        const prioritizedSkills = this.prioritizeSkills(normalizedText, skillsByCategory);

        // Detect experience level
        const experienceLevel = this.detectExperienceLevel(normalizedText);

        // Detect job type
        const jobType = this.detectJobType(normalizedText);

        // Generate learning roadmap
        const roadmap = this.generateRoadmap(prioritizedSkills, experienceLevel);

        return {
            metadata,
            experienceLevel,
            jobType,
            skillsByCategory: prioritizedSkills,
            roadmap,
            totalSkills: Object.values(prioritizedSkills).flat().length
        };
    }

    /**
     * Extract metadata from job description
     */
    extractMetadata(text) {
        const lines = text.split('\n').filter(line => line.trim());
        let title = 'Position';

        // Try to find job title (usually in first few lines)
        for (let i = 0; i < Math.min(5, lines.length); i++) {
            const line = lines[i].trim();
            if (line.length > 5 && line.length < 100 && !line.includes('http')) {
                // Check for common title patterns
                const titlePatterns = [
                    /^(senior|junior|lead|staff|principal)?\s*(software|web|frontend|backend|fullstack|data|devops|mobile)/i,
                    /developer|engineer|analyst|scientist|architect|manager|designer/i
                ];

                if (titlePatterns.some(pattern => pattern.test(line))) {
                    title = line.replace(/[•\-–—]/g, '').trim();
                    break;
                }
            }
        }

        // Check for remote/hybrid/onsite
        const workMode = this.detectWorkMode(text.toLowerCase());

        return { title: title.substring(0, 80), workMode };
    }

    /**
     * Detect work mode (remote, hybrid, onsite)
     */
    detectWorkMode(text) {
        if (/fully remote|100% remote|remote first|remote-first|work from anywhere/.test(text)) {
            return 'Remote';
        }
        if (/hybrid|flexible|part-time remote/.test(text)) {
            return 'Hybrid';
        }
        if (/on-site|onsite|in-office|office-based/.test(text)) {
            return 'On-site';
        }
        return 'Not specified';
    }

    /**
     * Extract skills organized by category
     */
    extractSkillsByCategory(text) {
        const results = {};

        for (const [category, skills] of Object.entries(this.skillPatterns)) {
            const foundSkills = [];

            for (const skill of skills) {
                // Create regex pattern for skill (word boundary matching)
                const pattern = new RegExp(`\\b${skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');

                if (pattern.test(text)) {
                    // Normalize skill name
                    const normalizedSkill = this.normalizeSkillName(skill);
                    if (!foundSkills.includes(normalizedSkill)) {
                        foundSkills.push(normalizedSkill);
                    }
                }
            }

            if (foundSkills.length > 0) {
                results[category] = foundSkills;
            }
        }

        return results;
    }

    /**
     * Normalize skill names to display format
     */
    normalizeSkillName(skill) {
        const normalizations = {
            'nodejs': 'Node.js',
            'node.js': 'Node.js',
            'javascript': 'JavaScript',
            'typescript': 'TypeScript',
            'react': 'React',
            'vue': 'Vue.js',
            'angular': 'Angular',
            'nextjs': 'Next.js',
            'next.js': 'Next.js',
            'graphql': 'GraphQL',
            'postgresql': 'PostgreSQL',
            'postgres': 'PostgreSQL',
            'mongodb': 'MongoDB',
            'mysql': 'MySQL',
            'aws': 'AWS',
            'gcp': 'Google Cloud',
            'docker': 'Docker',
            'kubernetes': 'Kubernetes',
            'k8s': 'Kubernetes',
            'ci/cd': 'CI/CD',
            'git': 'Git',
            'github': 'GitHub',
            'gitlab': 'GitLab',
            'python': 'Python',
            'java': 'Java',
            'c++': 'C++',
            'c#': 'C#',
            'go': 'Go',
            'golang': 'Go',
            'ruby': 'Ruby',
            'php': 'PHP',
            'sql': 'SQL',
            'html': 'HTML',
            'css': 'CSS',
            'rest api': 'REST API',
            'restful': 'REST API',
            'machine learning': 'Machine Learning',
            'deep learning': 'Deep Learning',
            'tensorflow': 'TensorFlow',
            'pytorch': 'PyTorch',
            'agile': 'Agile',
            'scrum': 'Scrum',
            'jira': 'Jira',
            'figma': 'Figma'
        };

        return normalizations[skill.toLowerCase()] ||
            skill.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }

    /**
     * Assign priority levels to skills based on frequency and context
     */
    prioritizeSkills(text, skillsByCategory) {
        const prioritized = {};

        for (const [category, skills] of Object.entries(skillsByCategory)) {
            prioritized[category] = skills.map(skill => {
                const priority = this.calculatePriority(text, skill.toLowerCase());
                return { name: skill, priority };
            });
        }

        return prioritized;
    }

    /**
     * Calculate priority based on context clues
     */
    calculatePriority(text, skill) {
        let score = 0;

        // Check for "must have", "required", "essential"
        const requiredPatterns = [
            new RegExp(`(must have|required|essential|mandatory).*${skill}`, 'i'),
            new RegExp(`${skill}.*(required|essential|must)`, 'i')
        ];

        if (requiredPatterns.some(p => p.test(text))) {
            score += 3;
        }

        // Check for "nice to have", "preferred", "bonus"
        const optionalPatterns = [
            new RegExp(`(nice to have|preferred|bonus|plus|advantage).*${skill}`, 'i'),
            new RegExp(`${skill}.*(nice to have|preferred|bonus|plus|advantage)`, 'i')
        ];

        if (optionalPatterns.some(p => p.test(text))) {
            score -= 1;
        }

        // Count occurrences (more = higher priority)
        const regex = new RegExp(`\\b${skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
        const matches = text.match(regex);
        if (matches) {
            score += Math.min(matches.length, 3);
        }

        if (score >= 3) return 'high';
        if (score >= 1) return 'medium';
        return 'low';
    }

    /**
     * Detect experience level
     */
    detectExperienceLevel(text) {
        for (const [level, keywords] of Object.entries(this.experienceLevels)) {
            for (const keyword of keywords) {
                if (text.includes(keyword)) {
                    return level.charAt(0).toUpperCase() + level.slice(1);
                }
            }
        }
        return 'Not specified';
    }

    /**
     * Detect job type
     */
    detectJobType(text) {
        const detectedTypes = [];

        for (const [type, keywords] of Object.entries(this.jobTypes)) {
            for (const keyword of keywords) {
                if (text.includes(keyword)) {
                    detectedTypes.push(type.charAt(0).toUpperCase() + type.slice(1));
                    break;
                }
            }
        }

        return detectedTypes.length > 0 ? detectedTypes.join(' / ') : 'General';
    }

    /**
     * Generate a learning roadmap
     */
    generateRoadmap(skillsByCategory, experienceLevel) {
        const roadmap = [];
        let order = 1;

        // Priority order for categories - now includes non-tech categories
        const categoryOrder = [
            // Tech categories
            'Programming Languages',
            'Frontend Frameworks',
            'Backend Technologies',
            'Databases',
            'API & Integration',
            'Tools & Version Control',
            'Cloud & DevOps',
            'Testing',
            'Data Science & AI',
            // Non-tech categories
            'Customer Service',
            'Office & Administrative',
            'Communication Skills',
            'Languages',
            'Sales & Marketing',
            'Finance & Accounting',
            'Healthcare & Safety',
            'Food & Hospitality',
            // General categories
            'Project Management',
            'Soft Skills'
        ];

        // Process skills in priority order
        for (const category of categoryOrder) {
            if (skillsByCategory[category]) {
                // Sort by priority (high first)
                const sortedSkills = [...skillsByCategory[category]].sort((a, b) => {
                    const priorityOrder = { high: 0, medium: 1, low: 2 };
                    return priorityOrder[a.priority] - priorityOrder[b.priority];
                });

                for (const skill of sortedSkills) {
                    const resource = getSkillResource(skill.name);

                    roadmap.push({
                        order: order++,
                        skill: skill.name,
                        category,
                        priority: skill.priority,
                        description: resource?.description || `Learn ${skill.name} to improve your qualifications.`,
                        timeToLearn: resource?.timeToLearn || '1-2 months',
                        difficulty: resource?.difficulty || 'Intermediate',
                        resources: resource?.resources || []
                    });

                    // Limit roadmap to top skills
                    if (order > 10) break;
                }
            }
            if (order > 10) break;
        }

        return roadmap;
    }
}

// Create global instance
const jobAnalyzer = new JobAnalyzer();
