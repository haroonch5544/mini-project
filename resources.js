/**
 * SkillPath AI - Learning Resources Database
 * Contains curated learning platforms for various skills
 */

const LEARNING_RESOURCES = {
  // Programming Languages
  javascript: {
    name: 'JavaScript',
    category: 'Programming Languages',
    description: 'The core language of web development, essential for frontend and backend development.',
    difficulty: 'Beginner',
    timeToLearn: '2-3 months',
    resources: [
      { name: 'freeCodeCamp JavaScript', url: 'https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/', platform: 'freeCodeCamp', free: true },
      { name: 'JavaScript: Understanding the Weird Parts', url: 'https://www.udemy.com/course/understand-javascript/', platform: 'Udemy', free: false },
      { name: 'The Modern JavaScript Tutorial', url: 'https://javascript.info/', platform: 'JavaScript.info', free: true },
      { name: 'MDN JavaScript Guide', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide', platform: 'MDN', free: true }
    ]
  },
  python: {
    name: 'Python',
    category: 'Programming Languages',
    description: 'Versatile language popular in data science, AI, web development, and automation.',
    difficulty: 'Beginner',
    timeToLearn: '2-3 months',
    resources: [
      { name: 'Python for Everybody', url: 'https://www.coursera.org/specializations/python', platform: 'Coursera', free: true },
      { name: 'Automate the Boring Stuff', url: 'https://automatetheboringstuff.com/', platform: 'Book', free: true },
      { name: 'Complete Python Bootcamp', url: 'https://www.udemy.com/course/complete-python-bootcamp/', platform: 'Udemy', free: false },
      { name: 'Python Documentation', url: 'https://docs.python.org/3/tutorial/', platform: 'Official', free: true }
    ]
  },
  java: {
    name: 'Java',
    category: 'Programming Languages',
    description: 'Enterprise-grade language used in Android development and large-scale applications.',
    difficulty: 'Intermediate',
    timeToLearn: '3-4 months',
    resources: [
      { name: 'Java Programming Masterclass', url: 'https://www.udemy.com/course/java-the-complete-java-developer-course/', platform: 'Udemy', free: false },
      { name: 'Java Programming on Coursera', url: 'https://www.coursera.org/specializations/java-programming', platform: 'Coursera', free: true },
      { name: 'Codecademy Java', url: 'https://www.codecademy.com/learn/learn-java', platform: 'Codecademy', free: true }
    ]
  },
  typescript: {
    name: 'TypeScript',
    category: 'Programming Languages',
    description: 'Typed superset of JavaScript that adds static typing for better code quality.',
    difficulty: 'Intermediate',
    timeToLearn: '1-2 months',
    resources: [
      { name: 'TypeScript Official Docs', url: 'https://www.typescriptlang.org/docs/', platform: 'Official', free: true },
      { name: 'Understanding TypeScript', url: 'https://www.udemy.com/course/understanding-typescript/', platform: 'Udemy', free: false },
      { name: 'TypeScript Deep Dive', url: 'https://basarat.gitbook.io/typescript/', platform: 'Book', free: true }
    ]
  },
  sql: {
    name: 'SQL',
    category: 'Programming Languages',
    description: 'Query language for managing and manipulating relational databases.',
    difficulty: 'Beginner',
    timeToLearn: '1-2 months',
    resources: [
      { name: 'SQL for Data Science', url: 'https://www.coursera.org/learn/sql-for-data-science', platform: 'Coursera', free: true },
      { name: 'SQLBolt', url: 'https://sqlbolt.com/', platform: 'SQLBolt', free: true },
      { name: 'Complete SQL Bootcamp', url: 'https://www.udemy.com/course/the-complete-sql-bootcamp/', platform: 'Udemy', free: false }
    ]
  },

  // Frontend Frameworks
  react: {
    name: 'React',
    category: 'Frontend Frameworks',
    description: 'Popular JavaScript library for building user interfaces, especially single-page applications.',
    difficulty: 'Intermediate',
    timeToLearn: '2-3 months',
    resources: [
      { name: 'React Official Tutorial', url: 'https://react.dev/learn', platform: 'Official', free: true },
      { name: 'React - The Complete Guide', url: 'https://www.udemy.com/course/react-the-complete-guide-incl-redux/', platform: 'Udemy', free: false },
      { name: 'freeCodeCamp React', url: 'https://www.freecodecamp.org/learn/front-end-development-libraries/', platform: 'freeCodeCamp', free: true }
    ]
  },
  vue: {
    name: 'Vue.js',
    category: 'Frontend Frameworks',
    description: 'Progressive JavaScript framework for building web interfaces.',
    difficulty: 'Intermediate',
    timeToLearn: '2-3 months',
    resources: [
      { name: 'Vue.js Official Guide', url: 'https://vuejs.org/guide/introduction.html', platform: 'Official', free: true },
      { name: 'Vue Mastery', url: 'https://www.vuemastery.com/', platform: 'Vue Mastery', free: false },
      { name: 'Vue.js Complete Guide', url: 'https://www.udemy.com/course/vuejs-2-the-complete-guide/', platform: 'Udemy', free: false }
    ]
  },
  angular: {
    name: 'Angular',
    category: 'Frontend Frameworks',
    description: 'Full-featured framework for building enterprise-scale applications.',
    difficulty: 'Advanced',
    timeToLearn: '3-4 months',
    resources: [
      { name: 'Angular Official Tutorial', url: 'https://angular.io/tutorial', platform: 'Official', free: true },
      { name: 'Angular Complete Guide', url: 'https://www.udemy.com/course/the-complete-guide-to-angular-2/', platform: 'Udemy', free: false }
    ]
  },

  // Backend Technologies
  nodejs: {
    name: 'Node.js',
    category: 'Backend Technologies',
    description: 'JavaScript runtime for building scalable server-side applications.',
    difficulty: 'Intermediate',
    timeToLearn: '2-3 months',
    resources: [
      { name: 'Node.js Official Docs', url: 'https://nodejs.org/en/docs/', platform: 'Official', free: true },
      { name: 'The Complete Node.js Course', url: 'https://www.udemy.com/course/the-complete-nodejs-developer-course-2/', platform: 'Udemy', free: false },
      { name: 'Node.js on freeCodeCamp', url: 'https://www.freecodecamp.org/learn/back-end-development-and-apis/', platform: 'freeCodeCamp', free: true }
    ]
  },
  express: {
    name: 'Express.js',
    category: 'Backend Technologies',
    description: 'Minimal and flexible Node.js web application framework.',
    difficulty: 'Intermediate',
    timeToLearn: '1 month',
    resources: [
      { name: 'Express.js Guide', url: 'https://expressjs.com/en/guide/routing.html', platform: 'Official', free: true },
      { name: 'Express.js Course', url: 'https://www.udemy.com/course/just-express-with-a-bunch-of-node-and-http-in-detail/', platform: 'Udemy', free: false }
    ]
  },
  django: {
    name: 'Django',
    category: 'Backend Technologies',
    description: 'High-level Python web framework for rapid development.',
    difficulty: 'Intermediate',
    timeToLearn: '2-3 months',
    resources: [
      { name: 'Django Official Tutorial', url: 'https://docs.djangoproject.com/en/stable/intro/tutorial01/', platform: 'Official', free: true },
      { name: 'Django for Everybody', url: 'https://www.dj4e.com/', platform: 'DJ4E', free: true },
      { name: 'Python Django Full Course', url: 'https://www.udemy.com/course/python-and-django-full-stack-web-developer-bootcamp/', platform: 'Udemy', free: false }
    ]
  },

  // Cloud & DevOps
  aws: {
    name: 'AWS',
    category: 'Cloud & DevOps',
    description: 'Amazon Web Services - leading cloud computing platform.',
    difficulty: 'Advanced',
    timeToLearn: '3-6 months',
    resources: [
      { name: 'AWS Cloud Practitioner', url: 'https://aws.amazon.com/training/learn-about/cloud-practitioner/', platform: 'AWS', free: true },
      { name: 'AWS Certified Solutions Architect', url: 'https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03/', platform: 'Udemy', free: false }
    ]
  },
  docker: {
    name: 'Docker',
    category: 'Cloud & DevOps',
    description: 'Platform for containerizing applications for consistent deployment.',
    difficulty: 'Intermediate',
    timeToLearn: '1-2 months',
    resources: [
      { name: 'Docker Official Docs', url: 'https://docs.docker.com/get-started/', platform: 'Official', free: true },
      { name: 'Docker Mastery', url: 'https://www.udemy.com/course/docker-mastery/', platform: 'Udemy', free: false }
    ]
  },
  kubernetes: {
    name: 'Kubernetes',
    category: 'Cloud & DevOps',
    description: 'Container orchestration system for automating deployment and scaling.',
    difficulty: 'Advanced',
    timeToLearn: '2-3 months',
    resources: [
      { name: 'Kubernetes Official Tutorial', url: 'https://kubernetes.io/docs/tutorials/', platform: 'Official', free: true },
      { name: 'Kubernetes for Developers', url: 'https://www.udemy.com/course/kubernetes-for-developers/', platform: 'Udemy', free: false }
    ]
  },
  git: {
    name: 'Git',
    category: 'Cloud & DevOps',
    description: 'Version control system essential for collaborative development.',
    difficulty: 'Beginner',
    timeToLearn: '1-2 weeks',
    resources: [
      { name: 'Git Official Book', url: 'https://git-scm.com/book/en/v2', platform: 'Official', free: true },
      { name: 'Learn Git Branching', url: 'https://learngitbranching.js.org/', platform: 'Interactive', free: true },
      { name: 'GitHub Learning Lab', url: 'https://lab.github.com/', platform: 'GitHub', free: true }
    ]
  },

  // Data Science & AI
  'machine learning': {
    name: 'Machine Learning',
    category: 'Data Science & AI',
    description: 'Building systems that learn from data to make predictions.',
    difficulty: 'Advanced',
    timeToLearn: '4-6 months',
    resources: [
      { name: 'Machine Learning by Andrew Ng', url: 'https://www.coursera.org/learn/machine-learning', platform: 'Coursera', free: true },
      { name: 'Fast.ai', url: 'https://www.fast.ai/', platform: 'fast.ai', free: true },
      { name: 'Hands-On ML Book', url: 'https://www.oreilly.com/library/view/hands-on-machine-learning/9781492032632/', platform: 'O\'Reilly', free: false }
    ]
  },
  'data analysis': {
    name: 'Data Analysis',
    category: 'Data Science & AI',
    description: 'Extracting insights from data using statistical methods.',
    difficulty: 'Intermediate',
    timeToLearn: '2-3 months',
    resources: [
      { name: 'Google Data Analytics', url: 'https://www.coursera.org/professional-certificates/google-data-analytics', platform: 'Coursera', free: true },
      { name: 'Data Analysis with Python', url: 'https://www.freecodecamp.org/learn/data-analysis-with-python/', platform: 'freeCodeCamp', free: true }
    ]
  },

  // Soft Skills
  communication: {
    name: 'Communication',
    category: 'Soft Skills',
    description: 'Effectively conveying ideas and collaborating with teams.',
    difficulty: 'Beginner',
    timeToLearn: 'Ongoing',
    resources: [
      { name: 'Effective Communication', url: 'https://www.coursera.org/learn/wharton-communication-skills', platform: 'Coursera', free: true },
      { name: 'LinkedIn Learning Communication', url: 'https://www.linkedin.com/learning/topics/communication', platform: 'LinkedIn Learning', free: false }
    ]
  },
  leadership: {
    name: 'Leadership',
    category: 'Soft Skills',
    description: 'Guiding teams and projects towards successful outcomes.',
    difficulty: 'Intermediate',
    timeToLearn: 'Ongoing',
    resources: [
      { name: 'Leading People and Teams', url: 'https://www.coursera.org/specializations/leading-teams', platform: 'Coursera', free: true },
      { name: 'Leadership on LinkedIn Learning', url: 'https://www.linkedin.com/learning/topics/leadership', platform: 'LinkedIn Learning', free: false }
    ]
  },
  'problem solving': {
    name: 'Problem Solving',
    category: 'Soft Skills',
    description: 'Analytical thinking to solve complex challenges.',
    difficulty: 'Intermediate',
    timeToLearn: 'Ongoing',
    resources: [
      { name: 'Critical Thinking Skills', url: 'https://www.coursera.org/learn/critical-thinking-skills-for-professionals', platform: 'Coursera', free: true }
    ]
  },
  agile: {
    name: 'Agile/Scrum',
    category: 'Project Management',
    description: 'Iterative project management methodology for software development.',
    difficulty: 'Beginner',
    timeToLearn: '1-2 months',
    resources: [
      { name: 'Agile with Atlassian Jira', url: 'https://www.coursera.org/learn/agile-atlassian-jira', platform: 'Coursera', free: true },
      { name: 'Scrum Master Certification', url: 'https://www.scrum.org/professional-scrum-certifications', platform: 'Scrum.org', free: false }
    ]
  },

  // Web Technologies
  html: {
    name: 'HTML',
    category: 'Web Technologies',
    description: 'Markup language for structuring web content.',
    difficulty: 'Beginner',
    timeToLearn: '2-3 weeks',
    resources: [
      { name: 'freeCodeCamp Responsive Web Design', url: 'https://www.freecodecamp.org/learn/2022/responsive-web-design/', platform: 'freeCodeCamp', free: true },
      { name: 'MDN HTML Basics', url: 'https://developer.mozilla.org/en-US/docs/Learn/HTML', platform: 'MDN', free: true }
    ]
  },
  css: {
    name: 'CSS',
    category: 'Web Technologies',
    description: 'Stylesheet language for designing web page layouts and styling.',
    difficulty: 'Beginner',
    timeToLearn: '1-2 months',
    resources: [
      { name: 'CSS Complete Guide', url: 'https://www.udemy.com/course/css-the-complete-guide-incl-flexbox-grid-sass/', platform: 'Udemy', free: false },
      { name: 'MDN CSS Basics', url: 'https://developer.mozilla.org/en-US/docs/Learn/CSS', platform: 'MDN', free: true },
      { name: 'CSS Tricks', url: 'https://css-tricks.com/', platform: 'CSS-Tricks', free: true }
    ]
  },

  // Databases
  mongodb: {
    name: 'MongoDB',
    category: 'Databases',
    description: 'NoSQL document database for modern applications.',
    difficulty: 'Intermediate',
    timeToLearn: '1-2 months',
    resources: [
      { name: 'MongoDB University', url: 'https://university.mongodb.com/', platform: 'MongoDB', free: true },
      { name: 'MongoDB Complete Guide', url: 'https://www.udemy.com/course/mongodb-the-complete-developers-guide/', platform: 'Udemy', free: false }
    ]
  },
  postgresql: {
    name: 'PostgreSQL',
    category: 'Databases',
    description: 'Advanced open-source relational database.',
    difficulty: 'Intermediate',
    timeToLearn: '1-2 months',
    resources: [
      { name: 'PostgreSQL Tutorial', url: 'https://www.postgresqltutorial.com/', platform: 'Tutorial', free: true },
      { name: 'Complete SQL Bootcamp', url: 'https://www.udemy.com/course/the-complete-sql-bootcamp/', platform: 'Udemy', free: false }
    ]
  },

  // APIs
  'rest api': {
    name: 'REST API',
    category: 'API Development',
    description: 'Designing and consuming RESTful web services.',
    difficulty: 'Intermediate',
    timeToLearn: '1 month',
    resources: [
      { name: 'REST API Tutorial', url: 'https://restfulapi.net/', platform: 'Tutorial', free: true },
      { name: 'REST APIs with Flask and Python', url: 'https://www.udemy.com/course/rest-api-flask-and-python/', platform: 'Udemy', free: false }
    ]
  },
  graphql: {
    name: 'GraphQL',
    category: 'API Development',
    description: 'Query language for APIs enabling flexible data fetching.',
    difficulty: 'Intermediate',
    timeToLearn: '1-2 months',
    resources: [
      { name: 'GraphQL Official Docs', url: 'https://graphql.org/learn/', platform: 'Official', free: true },
      { name: 'GraphQL with React', url: 'https://www.udemy.com/course/graphql-with-react-course/', platform: 'Udemy', free: false }
    ]
  },

  // ========================================
  // NON-TECH / ADMINISTRATIVE SKILLS
  // ========================================

  'customer service': {
    name: 'Customer Service',
    category: 'Customer Service',
    description: 'Excellence in handling customer inquiries, complaints, and building positive relationships.',
    difficulty: 'Beginner',
    timeToLearn: '1-2 months',
    resources: [
      { name: 'Customer Service Fundamentals', url: 'https://www.coursera.org/learn/customer-service', platform: 'Coursera', free: true },
      { name: 'Customer Service Training', url: 'https://www.linkedin.com/learning/customer-service-foundations-2019', platform: 'LinkedIn Learning', free: false },
      { name: 'HubSpot Customer Service', url: 'https://academy.hubspot.com/courses/customer-service', platform: 'HubSpot Academy', free: true }
    ]
  },
  'front desk': {
    name: 'Front Desk / Reception',
    category: 'Customer Service',
    description: 'Managing reception areas, greeting visitors, and handling inquiries professionally.',
    difficulty: 'Beginner',
    timeToLearn: '2-4 weeks',
    resources: [
      { name: 'Receptionist Skills', url: 'https://www.linkedin.com/learning/administrative-professional-tips', platform: 'LinkedIn Learning', free: false },
      { name: 'Front Desk Training', url: 'https://www.udemy.com/course/hotel-front-desk-training/', platform: 'Udemy', free: false }
    ]
  },
  'microsoft office': {
    name: 'Microsoft Office',
    category: 'Office & Administrative',
    description: 'Proficiency in Word, Excel, PowerPoint, and Outlook for business productivity.',
    difficulty: 'Beginner',
    timeToLearn: '1-2 months',
    resources: [
      { name: 'Microsoft 365 Training', url: 'https://support.microsoft.com/en-us/training', platform: 'Microsoft', free: true },
      { name: 'MS Office Complete Course', url: 'https://www.udemy.com/course/microsoft-office-complete-course/', platform: 'Udemy', free: false },
      { name: 'LinkedIn Learning Office', url: 'https://www.linkedin.com/learning/topics/microsoft-office', platform: 'LinkedIn Learning', free: false }
    ]
  },
  excel: {
    name: 'Microsoft Excel',
    category: 'Office & Administrative',
    description: 'Spreadsheet skills for data organization, analysis, and reporting.',
    difficulty: 'Beginner',
    timeToLearn: '1-2 months',
    resources: [
      { name: 'Excel Skills for Business', url: 'https://www.coursera.org/specializations/excel', platform: 'Coursera', free: true },
      { name: 'Excel from Beginner to Advanced', url: 'https://www.udemy.com/course/microsoft-excel-2013-from-beginner-to-advanced-and-beyond/', platform: 'Udemy', free: false },
      { name: 'Excel Easy Tutorial', url: 'https://www.excel-easy.com/', platform: 'Tutorial', free: true }
    ]
  },
  'data entry': {
    name: 'Data Entry',
    category: 'Office & Administrative',
    description: 'Accurate and efficient data input skills for databases and spreadsheets.',
    difficulty: 'Beginner',
    timeToLearn: '2-4 weeks',
    resources: [
      { name: 'Data Entry Skills', url: 'https://www.linkedin.com/learning/learning-data-entry', platform: 'LinkedIn Learning', free: false },
      { name: 'Typing.com', url: 'https://www.typing.com/', platform: 'Typing.com', free: true }
    ]
  },
  'phone etiquette': {
    name: 'Phone Etiquette',
    category: 'Communication Skills',
    description: 'Professional telephone communication skills for business calls.',
    difficulty: 'Beginner',
    timeToLearn: '1-2 weeks',
    resources: [
      { name: 'Phone Skills Training', url: 'https://www.linkedin.com/learning/phone-based-customer-service', platform: 'LinkedIn Learning', free: false },
      { name: 'Business Phone Etiquette', url: 'https://www.udemy.com/course/telephone-etiquette/', platform: 'Udemy', free: false }
    ]
  },
  'time management': {
    name: 'Time Management',
    category: 'Soft Skills',
    description: 'Organizing and planning how to divide time between activities effectively.',
    difficulty: 'Beginner',
    timeToLearn: 'Ongoing',
    resources: [
      { name: 'Time Management Fundamentals', url: 'https://www.linkedin.com/learning/time-management-fundamentals', platform: 'LinkedIn Learning', free: false },
      { name: 'Work Smarter, Not Harder', url: 'https://www.coursera.org/learn/work-smarter-not-harder', platform: 'Coursera', free: true }
    ]
  },
  'multitasking': {
    name: 'Multitasking',
    category: 'Soft Skills',
    description: 'Handling multiple tasks and priorities simultaneously while maintaining quality.',
    difficulty: 'Intermediate',
    timeToLearn: 'Ongoing',
    resources: [
      { name: 'Productivity Tips', url: 'https://www.linkedin.com/learning/productivity-tips', platform: 'LinkedIn Learning', free: false },
      { name: 'Task Management', url: 'https://www.coursera.org/learn/managing-project-tasks', platform: 'Coursera', free: true }
    ]
  },
  english: {
    name: 'English Language',
    category: 'Languages',
    description: 'Business English communication for professional environments.',
    difficulty: 'Beginner',
    timeToLearn: '3-6 months',
    resources: [
      { name: 'English for Career Development', url: 'https://www.coursera.org/learn/careerdevelopment', platform: 'Coursera', free: true },
      { name: 'Business English', url: 'https://www.udemy.com/course/business-english-for-beginners/', platform: 'Udemy', free: false },
      { name: 'Duolingo', url: 'https://www.duolingo.com/', platform: 'Duolingo', free: true }
    ]
  },
  sales: {
    name: 'Sales Skills',
    category: 'Sales & Marketing',
    description: 'Techniques for selling products and services effectively.',
    difficulty: 'Intermediate',
    timeToLearn: '2-3 months',
    resources: [
      { name: 'Sales Training', url: 'https://www.coursera.org/specializations/sales-training-inbound-business', platform: 'Coursera', free: true },
      { name: 'Sales Skills Masterclass', url: 'https://www.udemy.com/course/sales-skills-mastery/', platform: 'Udemy', free: false }
    ]
  },
  bookkeeping: {
    name: 'Bookkeeping',
    category: 'Finance & Accounting',
    description: 'Recording and organizing financial transactions for businesses.',
    difficulty: 'Intermediate',
    timeToLearn: '2-3 months',
    resources: [
      { name: 'Bookkeeping Basics', url: 'https://www.coursera.org/learn/bookkeeping-basics', platform: 'Coursera', free: true },
      { name: 'QuickBooks Training', url: 'https://quickbooks.intuit.com/learn-support/en-us/training', platform: 'QuickBooks', free: true }
    ]
  },
  'first aid': {
    name: 'First Aid / CPR',
    category: 'Healthcare & Safety',
    description: 'Emergency response skills and basic life support certification.',
    difficulty: 'Beginner',
    timeToLearn: '1-2 days',
    resources: [
      { name: 'Red Cross First Aid', url: 'https://www.redcross.org/take-a-class/first-aid', platform: 'Red Cross', free: false },
      { name: 'First Aid Course', url: 'https://www.udemy.com/course/first-aid-for-life/', platform: 'Udemy', free: false }
    ]
  },
  'food safety': {
    name: 'Food Safety',
    category: 'Food & Hospitality',
    description: 'Food handling, hygiene, and safety certifications for food service.',
    difficulty: 'Beginner',
    timeToLearn: '1-2 weeks',
    resources: [
      { name: 'Food Safety Training', url: 'https://www.coursera.org/learn/food-safety-for-managers', platform: 'Coursera', free: true },
      { name: 'ServSafe Certification', url: 'https://www.servsafe.com/', platform: 'ServSafe', free: false }
    ]
  },
  'cash handling': {
    name: 'Cash Handling',
    category: 'Food & Hospitality',
    description: 'Managing cash transactions, registers, and financial accuracy.',
    difficulty: 'Beginner',
    timeToLearn: '1-2 weeks',
    resources: [
      { name: 'Cash Handling Basics', url: 'https://www.linkedin.com/learning/retail-customer-service', platform: 'LinkedIn Learning', free: false }
    ]
  }
};

// Skill aliases for better matching
const SKILL_ALIASES = {
  'js': 'javascript',
  'ts': 'typescript',
  'py': 'python',
  'node': 'nodejs',
  'node.js': 'nodejs',
  'react.js': 'react',
  'reactjs': 'react',
  'vue.js': 'vue',
  'vuejs': 'vue',
  'angular.js': 'angular',
  'angularjs': 'angular',
  'express.js': 'express',
  'expressjs': 'express',
  'postgres': 'postgresql',
  'mongo': 'mongodb',
  'ml': 'machine learning',
  'ai': 'machine learning',
  'artificial intelligence': 'machine learning',
  'data analytics': 'data analysis',
  'scrum': 'agile',
  'project management': 'agile',
  'api': 'rest api',
  'restful': 'rest api',
  'amazon web services': 'aws',
  'version control': 'git',
  'github': 'git',
  'gitlab': 'git',
  'k8s': 'kubernetes',
  'container': 'docker',
  'containerization': 'docker'
};

// Function to get resource by skill name
function getSkillResource(skillName) {
  const normalized = skillName.toLowerCase().trim();
  const aliased = SKILL_ALIASES[normalized] || normalized;
  return LEARNING_RESOURCES[aliased] || null;
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { LEARNING_RESOURCES, SKILL_ALIASES, getSkillResource };
}
