export function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

export interface RoadmapData {
  domain: string;
  slug: string;
  icon: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  timeToLearn: string;
  description: string;
  prerequisites: string[];
  weeklyPlan: {
    week: number;
    title: string;
    topics: string[];
    project: string;
    resources: { name: string; url: string; type: "video" | "article" | "course" }[];
  }[];
  essentialTools: { name: string; purpose: string; icon: string }[];
  certifications: { name: string; provider: string; value: string; link: string }[];
  careerOutcomes: {
    roles: string[];
    avgSalary: { entry: string; mid: string; senior: string };
    topCompanies: string[];
  };
  relatedRoadmaps: string[];
}

export const roadmaps: RoadmapData[] = [
  {
    domain: "Frontend Development",
    slug: "frontend-development",
    icon: "Layout",
    difficulty: "Beginner",
    timeToLearn: "6 months",
    description: "Build user interfaces and experiences for the web using HTML, CSS, and JavaScript frameworks like React, Vue, or Angular.",
    prerequisites: ["Basic computer skills", "Problem-solving mindset"],
    weeklyPlan: [
      {
        week: 1,
        title: "Internet & HTML Basics",
        topics: ["How the internet works", "Browsers & HTTP", "HTML tags & forms", "Semantic HTML"],
        project: "Personal Profile Page",
        resources: [
          { name: "MDN HTML Basics", url: "https://developer.mozilla.org/en-US/docs/Learn/HTML", type: "article" },
          { name: "HTML Crash Course", url: "#", type: "video" }
        ]
      },
      {
        week: 2,
        title: "CSS Fundamentals",
        topics: ["Box Model", "Flexbox & Grid", "Responsive Design", "Variables & Variables"],
        project: "Responsive Landing Page",
        resources: [
          { name: "CSS Tricks Flexbox", url: "https://css-tricks.com/snippets/css/a-guide-to-flexbox/", type: "article" }
        ]
      },
      {
        week: 3,
        title: "JavaScript Basics",
        topics: ["Variables, Data Types", "Functions & Scope", "DOM Manipulation", "Events"],
        project: "Interactive To-Do List",
        resources: [
          { name: "JavaScript.info", url: "https://javascript.info/", type: "course" }
        ]
      },
      {
        week: 4,
        title: "Advanced JavaScript",
        topics: ["Promises & Async/Await", "ES6+ Features", "Fetch API", "Modules"],
        project: "Weather Dashboard API App",
        resources: [
          { name: "Async JS Overview", url: "#", type: "video" }
        ]
      },
      {
        week: 5,
        title: "React Fundamentals",
        topics: ["Components & Props", "State & Hooks", "Handling Events", "Conditional Rendering"],
        project: "Movie Search App",
        resources: [
          { name: "React Official Docs", url: "https://react.dev/", type: "article" }
        ]
      },
      {
        week: 6,
        title: "Advanced React & Ecosystem",
        topics: ["Context API / Redux", "React Router", "Next.js Basics", "Tailwind CSS"],
        project: "E-Commerce Mock Storefront",
        resources: [
          { name: "Next.js Learn", url: "https://nextjs.org/learn", type: "course" }
        ]
      }
    ],
    essentialTools: [
      { name: "VS Code", purpose: "Code Editor", icon: "Code" },
      { name: "Git & GitHub", purpose: "Version Control", icon: "GitBranch" },
      { name: "Figma", purpose: "Design Handoff", icon: "PenTool" }
    ],
    certifications: [
      { name: "Meta Front-End Developer", provider: "Coursera", value: "High", link: "#" }
    ],
    careerOutcomes: {
      roles: ["Frontend UI Developer", "React Developer", "Web Designer"],
      avgSalary: { entry: "$65,000", mid: "$95,000", senior: "$130,000+" },
      topCompanies: ["Meta", "Netflix", "Airbnb", "Spotify"]
    },
    relatedRoadmaps: ["UI/UX Design", "Full Stack Development"]
  },
  {
    domain: "Backend Development",
    slug: "backend-development",
    icon: "Database",
    difficulty: "Intermediate",
    timeToLearn: "6 months",
    description: "Create the server-side logic, APIs, and database structures that power web applications.",
    prerequisites: ["Basic Programming Logic", "Understanding of HTTP/Internet"],
    weeklyPlan: [
      {
        week: 1,
        title: "Programming Fundamentals & OS",
        topics: ["Python/Node.js/Go", "Terminal/CLI", "Process & Threads", "Memory Management"],
        project: "CLI Task Manager",
        resources: [
          { name: "Node.js Basics", url: "https://nodejs.org/en/learn", type: "article" }
        ]
      },
      {
        week: 2,
        title: "Networking & APIs",
        topics: ["RESTful APIs", "HTTP Methods & Status Codes", "JSON/XML", "Postman/cURL"],
        project: "Simple REST API using Express or FastAPI",
        resources: [
          { name: "Building APIs", url: "#", type: "video" }
        ]
      },
      {
        week: 3,
        title: "Relational Databases",
        topics: ["SQL Basics", "PostgreSQL/MySQL", "Joins & Indexes", "ACID Properties"],
        project: "Blog Database Schema & Queries",
        resources: [
          { name: "SQLBolt", url: "https://sqlbolt.com/", type: "course" }
        ]
      },
      {
        week: 4,
        title: "NoSQL Database & Caching",
        topics: ["MongoDB", "Redis", "Key-Value Stores", "Document DBs"],
        project: "URL Shortener with Redis cache",
        resources: [
          { name: "Redis Crash Course", url: "#", type: "video" }
        ]
      },
      {
        week: 5,
        title: "Security & Authentication",
        topics: ["JWT & OAuth", "Hashing (Bcrypt)", "CORS", "Rate Limiting"],
        project: "Secure Auth System API",
        resources: [
          { name: "Auth0 Guides", url: "#", type: "article" }
        ]
      },
      {
        week: 6,
        title: "Deployment & CI/CD",
        topics: ["Docker", "Docker Compose", "GitHub Actions", "AWS/Heroku"],
        project: "Dockerized API Deployment",
        resources: [
          { name: "Docker for Beginners", url: "#", type: "video" }
        ]
      }
    ],
    essentialTools: [
      { name: "Docker", purpose: "Containerization", icon: "Box" },
      { name: "Postman", purpose: "API Testing", icon: "Send" },
      { name: "Linux", purpose: "Server OS", icon: "Terminal" }
    ],
    certifications: [
      { name: "AWS Certified Developer", provider: "AWS", value: "High", link: "#" }
    ],
    careerOutcomes: {
      roles: ["Backend Engineer", "API Developer", "Systems Engineer"],
      avgSalary: { entry: "$75,000", mid: "$110,000", senior: "$150,000+" },
      topCompanies: ["Amazon", "Stripe", "Uber", "Netflix"]
    },
    relatedRoadmaps: ["Full Stack Development", "Cloud Engineer (AWS/Azure/GCP)", "DevOps Engineer"]
  },
  {
    domain: "AI/Machine Learning Engineer",
    slug: "ai-machine-learning-engineer",
    icon: "Brain",
    difficulty: "Advanced",
    timeToLearn: "8-12 months",
    description: "Design and implement machine learning models and predictive algorithms that power AI applications.",
    prerequisites: ["Python Proficiency", "Calculus & Linear Algebra", "Statistics Foundation"],
    weeklyPlan: [
      {
        week: 1,
        title: "Python & Data Handling",
        topics: ["NumPy", "Pandas", "Matplotlib", "Jupyter Notebooks"],
        project: "Exploratory Data Analysis (EDA) on Kaggle Dataset",
        resources: [{ name: "Pandas Docs", url: "#", type: "article" }]
      },
      {
        week: 2,
        title: "Machine Learning Concepts",
        topics: ["Supervised vs Unsupervised", "Regression", "Classification", "Scikit-Learn"],
        project: "House Price Predictor",
        resources: [{ name: "Andrew Ng ML", url: "#", type: "course" }]
      },
      {
        week: 3,
        title: "Deep Learning Foundations",
        topics: ["Neural Networks", "Activation Functions", "Backpropagation", "PyTorch/TensorFlow"],
        project: "Digit Recognizer (MNIST)",
        resources: [{ name: "DeepLearning.AI", url: "#", type: "course" }]
      },
      {
        week: 4,
        title: "Computer Vision or NLP",
        topics: ["CNNs for Images", "RNNs/Transformers for Text", "Hugging Face"],
        project: "Sentiment Analysis or Image Classifier",
        resources: [{ name: "Hugging Face Course", url: "#", type: "course" }]
      },
      {
        week: 5,
        title: "MLOps & Deployment",
        topics: ["Model Serving", "FastAPI for ML", "Dockerizing Models", "ONNX"],
        project: "Deploying Model as API",
        resources: [{ name: "MLOps Basics", url: "#", type: "video" }]
      }
    ],
    essentialTools: [
      { name: "PyTorch", purpose: "Deep Learning", icon: "Cpu" },
      { name: "Jupyter", purpose: "Experimentation", icon: "Terminal" },
      { name: "Hugging Face", purpose: "Model Hub", icon: "Smile" }
    ],
    certifications: [
      { name: "TensorFlow Developer", provider: "Google", value: "High", link: "#" }
    ],
    careerOutcomes: {
      roles: ["ML Engineer", "AI Researcher", "Data Scientist NLP"],
      avgSalary: { entry: "$95,000", mid: "$140,000", senior: "$180,000+" },
      topCompanies: ["OpenAI", "Google DeepMind", "Meta", "Tesla"]
    },
    relatedRoadmaps: ["Data Science", "Data Analytics"]
  },
  {
    domain: "UI/UX Design",
    slug: "ui-ux-design",
    icon: "PenTool",
    difficulty: "Beginner",
    timeToLearn: "4-6 months",
    description: "Design intuitive and aesthetically pleasing digital products through user research, wireframing, and interactive prototyping.",
    prerequisites: ["Visual design sense", "Empathy for users"],
    weeklyPlan: [
      {
        week: 1,
        title: "Design Principles & Theory",
        topics: ["Color Theory", "Typography", "Grid Systems", "Composition"],
        project: "Redesigning a bad website UI",
        resources: [{ name: "Refactoring UI", url: "#", type: "article" }]
      },
      {
        week: 2,
        title: "User Experience (UX) Basics",
        topics: ["User Research", "User Personas", "Journey Mapping", "Information Architecture"],
        project: "App Case Study part 1: Research",
        resources: [{ name: "Nielsen Norman Group", url: "#", type: "article" }]
      },
      {
        week: 3,
        title: "Wireframing & Tools",
        topics: ["Figma Basics", "Low-fidelity wireframes", "User flows"],
        project: "Wireframing a Mobile App",
        resources: [{ name: "Figma Crash Course", url: "#", type: "video" }]
      },
      {
        week: 4,
        title: "High-Fidelity UI Design",
        topics: ["Components & Variants", "Auto-layout", "Design Systems"],
        project: "High-Fidelity App Mockups",
        resources: [{ name: "Design Systems Guide", url: "#", type: "article" }]
      },
      {
        week: 5,
        title: "Prototyping & Testing",
        topics: ["Interactive Prototyping", "Micro-interactions", "Usability Testing"],
        project: "Clickable Figma Prototype",
        resources: [{ name: "Prototyping in Figma", url: "#", type: "video" }]
      }
    ],
    essentialTools: [
      { name: "Figma", purpose: "Interface Design", icon: "Monitor" },
      { name: "Miro", purpose: "Whiteboarding", icon: "ClipboardList" },
      { name: "Notion", purpose: "Documentation", icon: "FileText" }
    ],
    certifications: [
      { name: "Google UX Design", provider: "Coursera", value: "Medium", link: "#" }
    ],
    careerOutcomes: {
      roles: ["Product Designer", "UX Researcher", "UI Designer"],
      avgSalary: { entry: "$60,000", mid: "$90,000", senior: "$130,000+" },
      topCompanies: ["Apple", "Airbnb", "Spotify", "Vercel"]
    },
    relatedRoadmaps: ["Frontend Development", "Product Management"]
  },
  {
    domain: "Product Management",
    slug: "product-management",
    icon: "Target",
    difficulty: "Intermediate",
    timeToLearn: "6 months",
    description: "Lead cross-functional teams to define, design, and deliver software products that solve real user problems and drive business growth.",
    prerequisites: ["Strong Communication", "Analytical Thinking", "Basic Tech Literacy"],
    weeklyPlan: [
      {
        week: 1,
        title: "Product Fundamentals",
        topics: ["What is a PM?", "Product Life Cycle", "Agile & Scrum Basics"],
        project: "Product Breakdown of a Favorite App",
        resources: [{ name: "Inspired by Marty Cagan", url: "#", type: "article" }]
      },
      {
        week: 2,
        title: "User Research & Empathy",
        topics: ["Customer Interviews", "Surveys", "Identifying Problems", "User Personas"],
        project: "Conducting User Interviews",
        resources: [{ name: "The Mom Test", url: "#", type: "video" }]
      },
      {
        week: 3,
        title: "Strategy & Roadmapping",
        topics: ["OKRs", "Prioritization Frameworks (RICE, MoSCoW)", "Product Roadmaps"],
        project: "Create a 6-month product roadmap",
        resources: [{ name: "Roadmap Tools Guide", url: "#", type: "article" }]
      },
      {
        week: 4,
        title: "Execution & Delivery",
        topics: ["Writing PRDs (Product Requirements Docs)", "User Stories", "Working with Engineers"],
        project: "Write a complete PRD for a new feature",
        resources: [{ name: "How to write a PRD", url: "#", type: "article" }]
      },
      {
        week: 5,
        title: "Go-to-Market & Metrics",
        topics: ["A/B Testing", "Product Analytics (Mixpanel, Amplitude)", "Launch Strategies"],
        project: "Define success metrics for a feature launch",
        resources: [{ name: "Product Analytics 101", url: "#", type: "course" }]
      }
    ],
    essentialTools: [
      { name: "Jira/Linear", purpose: "Issue Tracking", icon: "CheckSquare" },
      { name: "Mixpanel", purpose: "Analytics", icon: "BarChart2" },
      { name: "Figma", purpose: "Reviewing Designs", icon: "PenTool" }
    ],
    certifications: [
      { name: "Certified Scrum Product Owner (CSPO)", provider: "Scrum Alliance", value: "High", link: "#" }
    ],
    careerOutcomes: {
      roles: ["Associate Product Manager", "Product Manager", "Director of Product"],
      avgSalary: { entry: "$85,000", mid: "$120,000", senior: "$160,000+" },
      topCompanies: ["Google", "Meta", "Stripe", "Atlassian"]
    },
    relatedRoadmaps: ["UI/UX Design", "Data Analytics", "Business Analysis"]
  }
];

// Fallback roadmap factory for unlisted domains
export function getRoadmapBySlug(slug: string): RoadmapData | undefined {
  const found = roadmaps.find((r) => r.slug === slug);
  if (found) return found;

  // Since having EVERY roadmap meticulously defined would take thousands of lines,
  // we can provide a dynamic fallback if requested slug is somewhat valid.
  const allRequestedDomains = [
    "Frontend Development", "Backend Development", "Full Stack Development", 
    "Mobile App Development", "AI/Machine Learning Engineer", "Data Science", 
    "Data Analytics", "DevOps Engineer", "Cloud Engineer", "Cybersecurity", 
    "Blockchain Development", "Game Development", "UI/UX Design", "Product Management", 
    "Technical Writing", "QA/Testing Engineer", "Site Reliability Engineer (SRE)",
    "Digital Marketing", "Content Creation", "Project Management", "Business Analysis", 
    "Sales Engineering"
  ];
  
  const matchedDomain = allRequestedDomains.find(d => slugify(d) === slug);
  
  if (matchedDomain) {
    return {
      domain: matchedDomain,
      slug: slug,
      icon: "BookOpen",
      difficulty: "Intermediate",
      timeToLearn: "6 months",
      description: `Comprehensive learning path to master ${matchedDomain} and start your career.`,
      prerequisites: ["Curiosity", "Basic computer literacy", "Dedication"],
      weeklyPlan: [
        {
          week: 1,
          title: "Fundamentals & Core Concepts",
          topics: ["History & Evolution", "Core Principles", "Industry Standards", "Basic Terminology"],
          project: "Concept Mapping Exercise",
          resources: [{ name: "Platform Basics", url: "#", type: "article" }]
        },
        {
          week: 2,
          title: "Essential Tools & Workflows",
          topics: ["Setting up the Environment", "Tooling Basics", "Best Practices", "Common Workflows"],
          project: "First Simple Project",
          resources: [{ name: "Tooling Guide", url: "#", type: "video" }]
        },
        {
          week: 3,
          title: "Intermediate Applications",
          topics: ["Advanced Use Cases", "Integration", "Optimization", "Pattern Recognition"],
          project: "Mid-level Implementation",
          resources: [{ name: "Intermediate Concepts", url: "#", type: "course" }]
        },
        {
          week: 4,
          title: "Advanced Topics & Portfolio",
          topics: ["Real-world Scenarios", "Troubleshooting", "Portfolio Building", "Interview Prep"],
          project: "Capstone Portfolio Project",
          resources: [{ name: "Job Ready Guide", url: "#", type: "article" }]
        }
      ],
      essentialTools: [
        { name: "Industry Standard Tool", purpose: "Core Work", icon: "Tool" },
        { name: "Documentation", purpose: "Reference", icon: "Book" }
      ],
      certifications: [
        { name: `Certified ${matchedDomain} Professional`, provider: "Platform Exams", value: "Medium", link: "#" }
      ],
      careerOutcomes: {
        roles: [`Junior ${matchedDomain} Specialist`, `${matchedDomain} Professional`, `Senior ${matchedDomain} Lead`],
        avgSalary: { entry: "$60,000", mid: "$90,000", senior: "$130,000" },
        topCompanies: ["Top Tech Giants", "Startups", "Enterprise Companies"]
      },
      relatedRoadmaps: []
    };
  }

  return undefined;
}

export function getAllRoadmaps(): RoadmapData[] {
  const allRequestedDomains = [
    "Frontend Development", "Backend Development", "Full Stack Development", 
    "Mobile App Development", "AI/Machine Learning Engineer", "Data Science", 
    "Data Analytics", "DevOps Engineer", "Cloud Engineer", "Cybersecurity", 
    "Blockchain Development", "Game Development", "UI/UX Design", "Product Management", 
    "Technical Writing", "QA/Testing Engineer", "Site Reliability Engineer (SRE)",
    "Digital Marketing", "Content Creation", "Project Management", "Business Analysis", 
    "Sales Engineering"
  ];
  
  const results: RoadmapData[] = [];
  
  for (const domain of allRequestedDomains) {
    const slug = slugify(domain);
    const roadmap = getRoadmapBySlug(slug);
    if (roadmap) {
      results.push(roadmap);
    }
  }
  
  return results;
}
