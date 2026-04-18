export interface CareerData {
  id: string;
  title: string;
  icon: string;
  description: string;
  avgSalary: { us: string; india: string; remote: string };
  growthRate: string;
  workLifeBalance: number;
  remoteFriendly: number;
  topSkills: string[];
  dailyTasks: string[];
  tools: string[];
  learningPath: string[];
}

export const careersData: CareerData[] = [
  {
    id: "frontend-developer",
    title: "Frontend Developer",
    icon: "💻",
    description: "Build beautiful, responsive user interfaces and user experiences.",
    avgSalary: { us: "$110K", india: "₹12L", remote: "$90K" },
    growthRate: "High (23% YoY)",
    workLifeBalance: 8,
    remoteFriendly: 9,
    topSkills: ["React", "TypeScript", "CSS", "Next.js"],
    dailyTasks: ["Write components", "Review PRs", "Optimize performance"],
    tools: ["VS Code", "Figma", "Chrome DevTools", "Git"],
    learningPath: ["HTML/CSS", "JavaScript", "React Core", "Next.js App Router"]
  },
  {
    id: "backend-developer",
    title: "Backend Developer",
    icon: "⚙️",
    description: "Design and manage the logic, databases, and APIs powering applications.",
    avgSalary: { us: "$130K", india: "₹15L", remote: "$110K" },
    growthRate: "High (21% YoY)",
    workLifeBalance: 7,
    remoteFriendly: 9,
    topSkills: ["Node.js", "Python", "SQL", "Docker"],
    dailyTasks: ["API design", "Database queries", "Server architecture optimization"],
    tools: ["Postman", "Docker", "AWS", "Datagrip"],
    learningPath: ["Programming Logic", "Databases", "API Architecture", "Cloud Deployment"]
  },
  {
    id: "data-scientist",
    title: "Data Scientist",
    icon: "📊",
    description: "Analyze complex data to help companies make impactful decisions.",
    avgSalary: { us: "$140K", india: "₹18L", remote: "$120K" },
    growthRate: "Very High (35% YoY)",
    workLifeBalance: 8,
    remoteFriendly: 8,
    topSkills: ["Python", "Machine Learning", "SQL", "Statistics"],
    dailyTasks: ["Cleaning data", "Training models", "Presenting insights"],
    tools: ["Jupyter", "Pandas", "PyTorch", "Tableau"],
    learningPath: ["Statistics", "Python Data Stack", "Machine Learning Algorithms", "Deep Learning"]
  },
  {
    id: "product-manager",
    title: "Product Manager",
    icon: "📈",
    description: "Guide the strategy, roadmap, and feature definition of products.",
    avgSalary: { us: "$150K", india: "₹20L", remote: "$130K" },
    growthRate: "High (18% YoY)",
    workLifeBalance: 6,
    remoteFriendly: 7,
    topSkills: ["Agile", "User Research", "Roadmapping", "Communication"],
    dailyTasks: ["Sprint planning", "User interviews", "Cross-functional syncing"],
    tools: ["Jira", "Notion", "Figma", "Amplitude"],
    learningPath: ["Agile Basics", "User Empathy", "Data Analytics", "Leadership & Negotiation"]
  },
  {
    id: "ux-designer",
    title: "UX Designer",
    icon: "🎨",
    description: "Research and design seamless experiences that users love.",
    avgSalary: { us: "$105K", india: "₹10L", remote: "$85K" },
    growthRate: "Moderate (15% YoY)",
    workLifeBalance: 9,
    remoteFriendly: 8,
    topSkills: ["Wireframing", "Prototyping", "User Research", "Figma"],
    dailyTasks: ["User testing", "Creating user flows", "Designing interfaces"],
    tools: ["Figma", "Miro", "Framer", "Maze"],
    learningPath: ["Design Principles", "UX Research", "UI Design patterns", "Prototyping"]
  },
  {
    id: "devops-engineer",
    title: "DevOps Engineer",
    icon: "🚀",
    description: "Bridge operations and development to automate scaling and deployment.",
    avgSalary: { us: "$135K", india: "₹16L", remote: "$115K" },
    growthRate: "Very High (28% YoY)",
    workLifeBalance: 6,
    remoteFriendly: 9,
    topSkills: ["CI/CD", "Kubernetes", "AWS", "Terraform"],
    dailyTasks: ["Writing deployment scripts", "Monitoring uptime", "Managing infrastructure"],
    tools: ["GitHub Actions", "Docker", "Kubernetes", "Terraform"],
    learningPath: ["Linux/Networking", "Scripting", "Containerization", "Infrastructure as Code"]
  },
  {
    id: "cybersecurity-analyst",
    title: "Cybersecurity Analyst",
    icon: "🛡️",
    description: "Protect systems and networks from digital attacks and threats.",
    avgSalary: { us: "$120K", india: "₹14L", remote: "$100K" },
    growthRate: "Extremely High (33% YoY)",
    workLifeBalance: 7,
    remoteFriendly: 8,
    topSkills: ["Network Security", "Ethical Hacking", "Threat Hunting", "Incident Response"],
    dailyTasks: ["Monitoring logs", "Vulnerability scanning", "Writing security reports"],
    tools: ["Splunk", "Wireshark", "Kali Linux", "Burp Suite"],
    learningPath: ["Networking Fundamentals", "Security+ Certification", "Ethical Hacking", "SIEM Tools"]
  },
  {
    id: "ai-engineer",
    title: "AI Prompt Engineer",
    icon: "🤖",
    description: "Design optimal prompts and integrate foundational models.",
    avgSalary: { us: "$160K", india: "₹25L", remote: "$140K" },
    growthRate: "Explosive (50%+ YoY)",
    workLifeBalance: 8,
    remoteFriendly: 9,
    topSkills: ["LLMs", "RAG", "Python", "LangChain"],
    dailyTasks: ["Testing prompts", "Fine-tuning models", "Building agentic pipelines"],
    tools: ["OpenAI API", "HuggingFace", "LangChain", "Pinecone"],
    learningPath: ["Prompt Engineering", "Python basics", "Vector Databases", "Agentic Workflows"]
  },
  {
    id: "mobile-developer",
    title: "Mobile App Developer",
    icon: "📱",
    description: "Create applications for iOS and Android platforms.",
    avgSalary: { us: "$125K", india: "₹13L", remote: "$105K" },
    growthRate: "High (19% YoY)",
    workLifeBalance: 8,
    remoteFriendly: 8,
    topSkills: ["Swift / Kotlin", "React Native", "Flutter", "Mobile UI"],
    dailyTasks: ["Building app layouts", "Testing on devices", "App store deployment"],
    tools: ["Xcode", "Android Studio", "Firebase", "TestFlight"],
    learningPath: ["Mobile UI fundamentals", "State Management", "Native APIs", "App Publishing"]
  },
  {
    id: "blockchain-developer",
    title: "Blockchain Developer",
    icon: "⛓️",
    description: "Write smart contracts and build decentralized applications (dApps).",
    avgSalary: { us: "$145K", india: "₹22L", remote: "$130K" },
    growthRate: "Moderate (12% YoY)",
    workLifeBalance: 7,
    remoteFriendly: 10,
    topSkills: ["Solidity", "Web3.js", "Cryptography", "Smart Contracts"],
    dailyTasks: ["Auditing contracts", "Writing dApp logic", "Gas optimization"],
    tools: ["Hardhat", "Truffle", "Metamask", "Remix"],
    learningPath: ["Cryptography Basics", "Solidity", "Web3 Integration", "Security Auditing"]
  },
  {
    id: "cloud-architect",
    title: "Cloud Architect",
    icon: "☁️",
    description: "Design comprehensive cloud environments and migration strategies.",
    avgSalary: { us: "$165K", india: "₹28L", remote: "$150K" },
    growthRate: "Very High (24% YoY)",
    workLifeBalance: 7,
    remoteFriendly: 8,
    topSkills: ["AWS/Azure/GCP", "System Design", "Networking", "Security"],
    dailyTasks: ["Designing topologies", "Cost optimization", "Reviewing security posture"],
    tools: ["AWS Console", "Lucidchart", "Terraform", "CloudWatch"],
    learningPath: ["Cloud Fundamentals", "Networking", "Advanced Certifications", "Enterprise Architecture"]
  },
  {
    id: "technical-writer",
    title: "Technical Writer",
    icon: "📝",
    description: "Translate complex technical concepts into readable documentation.",
    avgSalary: { us: "$85K", india: "₹8L", remote: "$75K" },
    growthRate: "Stable (8% YoY)",
    workLifeBalance: 9,
    remoteFriendly: 10,
    topSkills: ["Clear Writing", "Markdown", "API Documentation", "Git"],
    dailyTasks: ["Writing docs", "Reviewing specs", "Formatting text"],
    tools: ["Markdown", "GitBook", "Docusaurus", "Swagger"],
    learningPath: ["Writing fundamentals", "Markdown & Git", "API basics", "Docs-as-code deployment"]
  },
  {
    id: "game-developer",
    title: "Game Developer",
    icon: "🎮",
    description: "Program logic, physics, and gameplay for video games.",
    avgSalary: { us: "$95K", india: "₹9L", remote: "$80K" },
    growthRate: "Moderate (11% YoY)",
    workLifeBalance: 5,
    remoteFriendly: 6,
    topSkills: ["C# / C++", "Unity", "Unreal Engine", "3D Math"],
    dailyTasks: ["Implementing mechanics", "Debugging physics", "Optimizing framerate"],
    tools: ["Unity", "Unreal", "Visual Studio", "Blender"],
    learningPath: ["C#/C++ basics", "Game Engine tools", "Physics programming", "Performance profiling"]
  },
  {
    id: "scrum-master",
    title: "Scrum Master",
    icon: "🔄",
    description: "Facilitate agile methodologies and remove team blockers.",
    avgSalary: { us: "$110K", india: "₹14L", remote: "$100K" },
    growthRate: "Stable (9% YoY)",
    workLifeBalance: 8,
    remoteFriendly: 7,
    topSkills: ["Servant Leadership", "Agile", "Conflict Resolution", "Jira"],
    dailyTasks: ["Running daily standups", "Sprint retrospectives", "Coaching team members"],
    tools: ["Jira", "Trello", "Mural", "Confluence"],
    learningPath: ["Agile Manifesto", "Scrum Framework", "CSM Certification", "Team psychology"]
  },
  {
    id: "marketing-analyst",
    title: "Growth/Marketing Analyst",
    icon: "🎯",
    description: "Use data to drive user acquisition and retention strategies.",
    avgSalary: { us: "$95K", india: "₹11L", remote: "$85K" },
    growthRate: "High (18% YoY)",
    workLifeBalance: 7,
    remoteFriendly: 8,
    topSkills: ["SEO/SEM", "Google Analytics", "A/B Testing", "SQL"],
    dailyTasks: ["Running ad campaigns", "Analyzing funnel conversion", "Writing copy"],
    tools: ["Google Analytics", "HubSpot", "Mixpanel", "Ahrefs"],
    learningPath: ["Digital Marketing basics", "Data Analytics", "Performance Marketing", "Conversion Optimization"]
  },
  {
    id: "qa-engineer",
    title: "QA Automation Engineer",
    icon: "✅",
    description: "Write automated tests to ensure software quality and reliability.",
    avgSalary: { us: "$105K", india: "₹10L", remote: "$90K" },
    growthRate: "High (16% YoY)",
    workLifeBalance: 8,
    remoteFriendly: 9,
    topSkills: ["Test Automation", "Selenium / Cypress", "JavaScript/Python", "CI/CD"],
    dailyTasks: ["Writing test scripts", "Reporting bugs", "Maintaining CI pipelines"],
    tools: ["Cypress", "Selenium", "Postman", "Jest"],
    learningPath: ["Manual Testing basics", "JavaScript", "E2E Testing frameworks", "CI/CD integration"]
  }
];
