export const PORTFOLIO_STORAGE_KEY = "daberechukwu-portfolio-content-v1";

export const DEFAULT_PORTFOLIO = {
  hero: {
    brandName: "Daberechukwu",
    eyebrow: "Cybersecurity • Development • Teaching",
    name: "Daberechukwu Chukwuma",
    titles: ["Cybersecurity Specialist", "Developer", "Technology Educator"],
    intro:
      "I design and explain cybersecurity in a simple, practical way—through real-world projects, training, and tools that help people stay safe online.",
  },
  contact: {
    email: "dab.chukwuma@gmail.com",
    phone: "+2349060390763",
    phoneDisplay: "+234 906 039 0763",
    whatsapp: "2349060390763",
    github: "https://github.com/Dabz01",
    githubDisplay: "github.com/Dabz01",
  },
  documents: {
    cvUrl: "/daberechukwu-chukwuma-cv.pdf",
    cvName: "daberechukwu-chukwuma-cv.pdf",
    profileImage: "/profile.jpg",
  },
  snapshot: [
    "Computer Science Teacher – MTS Owerri",
    "Cybersecurity Tutor – Kunoch Digi",
    "Cybersecurity Instructor – 3MTT (AIFCE)",
    "B.Sc. Cybersecurity – FUTO",
  ],
  about: [
    "I am a cybersecurity-focused developer and educator based in Owerri, Nigeria. My work sits at the intersection of secure systems, practical training, and real-world problem solving. I enjoy breaking down complex ideas into clear, step-by-step explanations and building tools that defend against threats like phishing and unsafe links.",
    "Long-term, I want to contribute to a safer digital ecosystem in Africa by combining hands-on technical skills, teaching, and community-focused security awareness.",
  ],
  projects: [
    {
      title: "ML-Based SMS & Email Phishing Detection",
      description:
        "Supervised ML-based web application that classifies SMS and email text as phishing or legitimate, with a simple interface for live testing.",
      tech: ["Python", "Pandas", "Scikit-Learn", "Flask"],
      link: "https://github.com/Dabz01/phishing-detector",
    },
    {
      title: "Cypher Injection Detection Simulation",
      description:
        "Network simulation showing cypher injection detection using open-source intrusion detection systems like Suricata and Snort.",
      tech: ["Suricata", "Snort", "Networking", "Intrusion Detection"],
      link: "https://github.com/Dabz01/cypher-injection",
    },
    {
      title: "URL Security Scanner Extension",
      description:
        "Chrome extension that inspects URLs, checks them against a backend or security API, and warns users before visiting suspicious sites.",
      tech: ["JavaScript", "Chrome APIs", "REST APIs"],
      link: "https://github.com/Dabz01/url-scanner",
    },
  ],
  experience: [
    {
      role: "Computer Science Teacher",
      org: "Mountain Top Secondary School, Owerri",
      period: "2025 – Present",
      points: [
        "Teach computer science, programming fundamentals, and digital literacy.",
        "Help students build confidence with technology through hands-on practice.",
      ],
    },
    {
      role: "Cybersecurity Tutor",
      org: "Kunoch Digi, Owerri",
      period: "2025",
      points: [
        "Facilitated cybersecurity training sessions with practical labs.",
        "Introduced learners to phishing detection, safe browsing, and digital hygiene.",
      ],
    },
    {
      role: "Cybersecurity Instructor",
      org: "3MTT (AIFCE, Owerri)",
      period: "2024",
      points: [
        "Trained 50+ learners on core cybersecurity concepts and best practices.",
        "Led exercises on passwords, system hardening, and threat awareness.",
      ],
    },
  ],
  skills: [
    {
      category: "Cybersecurity & Networking",
      items: ["Kali Linux", "Snort / Suricata", "Wireshark", "Firewalls", "TCP/IP"],
    },
    {
      category: "Programming & Web",
      items: ["Python (APIs, automation)", "JavaScript", "HTML & CSS", "React basics"],
    },
    {
      category: "Tools & Platforms",
      items: ["Linux", "Git & GitHub", "CLI", "Basic server management"],
    },
    {
      category: "Soft Skills",
      items: ["Teaching", "Communication", "Mentoring", "Research & Writing"],
    },
  ],
  certifications: [
    "Linux Essentials (2024)",
    "Endpoint Security (2024)",
    "Networking Devices & Initial Configuration (2024)",
    "Ethical Hacking (2024)",
    "CyberThreat Management (2024)",
    "CyberOps Associate (2025)",
  ],
  testimonials: [
    {
      text: "He explains cybersecurity in simple, practical language. Every session left me more confident and more aware of digital threats.",
      name: "3MTT Cybersecurity Trainee",
      role: "Program Participant",
    },
    {
      text: "Very patient and methodical. He always connects theory with real-world security scenarios.",
      name: "Kunoch Digi Student",
      role: "Cybersecurity Track",
    },
    {
      text: "Daberechukwu consistently showed initiative, ownership, and strong problem-solving skills on his project work.",
      name: "Project Supervisor",
      role: "FUTO",
    },
  ],
};

export function mergePortfolioContent(savedContent = {}) {
  return {
    ...DEFAULT_PORTFOLIO,
    ...savedContent,
    hero: { ...DEFAULT_PORTFOLIO.hero, ...savedContent.hero },
    contact: { ...DEFAULT_PORTFOLIO.contact, ...savedContent.contact },
    documents: { ...DEFAULT_PORTFOLIO.documents, ...savedContent.documents },
    snapshot: savedContent.snapshot || DEFAULT_PORTFOLIO.snapshot,
    about: savedContent.about || DEFAULT_PORTFOLIO.about,
    projects: savedContent.projects || DEFAULT_PORTFOLIO.projects,
    experience: savedContent.experience || DEFAULT_PORTFOLIO.experience,
    skills: savedContent.skills || DEFAULT_PORTFOLIO.skills,
    certifications: savedContent.certifications || DEFAULT_PORTFOLIO.certifications,
    testimonials: savedContent.testimonials || DEFAULT_PORTFOLIO.testimonials,
  };
}

export function loadPortfolioContent() {
  if (typeof window === "undefined") {
    return DEFAULT_PORTFOLIO;
  }

  const saved = window.localStorage.getItem(PORTFOLIO_STORAGE_KEY);
  if (!saved) {
    return DEFAULT_PORTFOLIO;
  }

  return mergePortfolioContent(JSON.parse(saved));
}

export function savePortfolioContent(content) {
  window.localStorage.setItem(PORTFOLIO_STORAGE_KEY, JSON.stringify(content));
  window.dispatchEvent(new Event("portfolio-content-updated"));
}

export function resetPortfolioContent() {
  window.localStorage.removeItem(PORTFOLIO_STORAGE_KEY);
  window.dispatchEvent(new Event("portfolio-content-updated"));
}
