export const config = {
  profile: {
    username: "@rootward3n",
    name: "Shravan Kubade",
    role: "IT Student",
    tagline: "Building intelligent systems at the intersection of AI, cybersecurity, and software engineering.",
    bio: "IT student passionate about Artificial Intelligence, Cybersecurity, and emerging technologies. Currently exploring neural architectures, threat modeling, and building robust software systems. I enjoy diving deep into complex problems and emerging with practical solutions.",
    location: "India",
    status: "Open to opportunities",
  },
  socials: {
    github: "https://github.com/rootward3n",
    instagram: "https://instagram.com/rootward3n",
    linkedin: "",
    email: "digicartelecom@gmail.com",
  },
  projects: [
    {
      name: "[PROJECT NAME]",
      description: "[PROJECT DESCRIPTION - A brief summary of what this project does and the problem it solves.]",
      technologies: ["TECH 1", "TECH 2", "TECH 3"],
      github: "[PROJECT REPOSITORY URL]",
      demo: "[LIVE DEMO URL]",
    },
    {
      name: "[PROJECT NAME]",
      description: "[PROJECT DESCRIPTION - A brief summary of what this project does and the problem it solves.]",
      technologies: ["TECH 1", "TECH 2", "TECH 3"],
      github: "[PROJECT REPOSITORY URL]",
      demo: "[LIVE DEMO URL]",
    },
    {
      name: "[PROJECT NAME]",
      description: "[PROJECT DESCRIPTION - A brief summary of what this project does and the problem it solves.]",
      technologies: ["TECH 1", "TECH 2", "TECH 3"],
      github: "[PROJECT REPOSITORY URL]",
      demo: "[LIVE DEMO URL]",
    },
  ],
  topSkills: [
    { name: "Python", level: 90, domain: "AI" },
    { name: "TypeScript", level: 80, domain: "Dev" },
    { name: "Pandas / NumPy", level: 85, domain: "AI" },
    { name: "React / Next.js", level: 75, domain: "Dev" },
    { name: "Git / GitHub Actions", level: 80, domain: "Dev" },
    { name: "Linux / Bash", level: 75, domain: "Dev" },
  ],
  interests: {
    ai: [
      "Generative AI",
      "Computer Vision",
      "AI Safety & Alignment",
    ],
    cybersecurity: [
      "Offensive Security",
      "Web App Penetration Testing",
      "Threat Modeling",
    ],
    development: [
      "Full-Stack Web Development",
      "Real-time Systems",
      "Developer Tooling",
      "Clean Architecture",
    ],
  },
  seo: {
    title: "rootward3n | AI • Cybersecurity • Software Development",
    description: "@rootward3n — IT student building at the intersection of AI, cybersecurity, and software engineering. Exploring neural architectures, threat modeling, and robust software systems.",
    ogImage: "/images/og-image.png",
    twitterHandle: "@rootward3n",
  },
} as const;

export type Config = typeof config;