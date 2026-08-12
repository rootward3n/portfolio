export const config = {
  profile: {
    username: "@luna.dev",
    name: "Luna",
    role: "AI Developer",
    tagline:
      "Learning and building at the intersection of AI, cybersecurity, and software development.",
    bio:
      "IT student exploring Artificial Intelligence, Cybersecurity, and software development. I learn by building projects, experimenting with new technologies, and understanding how systems work under the hood.",
    location: "India",
    status: "Open to opportunities",
  },

  socials: {
    github: "https://github.com/rootward3n",
    instagram: "https://instagram.com/rootward3n",
    linkedin: "https://www.linkedin.com/in/rootward3n",
    email: "digicartelecom@gmail.com",
  },

  projects: [
    {
      name: "Phantom",
      role: "AI Systems Developer",
      description:
        "An AI assistant project exploring intelligent interaction, developer tooling, extensible AI providers, memory, and voice capabilities.",
      technologies: ["Python", "FastAPI", "AI APIs", "SQLite"],
      github: "",
      demo: "",
    },

    {
      name: "Developer Portfolio",
      role: "Frontend Developer",
      description:
        "A personal developer portfolio showcasing projects, technical interests, skills, and progress in AI, cybersecurity, and software development.",
      technologies: ["Next.js", "TypeScript", "React", "CSS"],
      github: "",
      demo: "",
    },

    /*
    {
      name: "Project Name",
      role: "Project Role",
      description: "Project description.",
      technologies: ["Technology 1", "Technology 2", "Technology 3"],
      github: "",
      demo: "",
    },
    */
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
    title: "Luna | AI • Cybersecurity • Software Development",
    description:
      "@luna.dev — AI developer exploring artificial intelligence, cybersecurity, and software development.",
    ogImage: "/images/og-image.png",
    twitterHandle: "@luna.dev",
  },
} as const;

export type Config = typeof config;
