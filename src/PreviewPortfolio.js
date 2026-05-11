import React, { useState } from "react";
import {
  FaBars,
  FaDownload,
  FaEnvelope,
  FaGithub,
  FaPhoneAlt,
  FaTimes,
  FaWhatsapp,
} from "react-icons/fa";
import "./PreviewPortfolio.css";

const previewStats = [
  { value: "50+", label: "Learners trained" },
  { value: "3+", label: "Security projects" },
  { value: "6", label: "Cyber certs" },
  { value: "Owerri", label: "Nigeria based" },
];

const previewProjects = [
  {
    category: "Security Tool",
    title: "ML-Based SMS & Email Phishing Detection",
    problem: "Users need a quick way to test suspicious messages before clicking unsafe links.",
    description:
      "A supervised machine-learning web app that classifies SMS and email text as phishing or legitimate with a simple testing interface.",
    tech: ["Python", "Pandas", "Scikit-Learn", "Flask"],
    link: "https://github.com/Dabz01/phishing-detector",
  },
  {
    category: "Network Defense Lab",
    title: "Cypher Injection Detection Simulation",
    problem: "Security learners need practical labs that connect intrusion detection theory to real packet-level behavior.",
    description:
      "A network simulation showing cypher injection detection with open-source intrusion detection systems such as Suricata and Snort.",
    tech: ["Suricata", "Snort", "Networking", "IDS"],
    link: "https://github.com/Dabz01/cypher-injection",
  },
  {
    category: "Browser Safety",
    title: "URL Security Scanner Extension",
    problem: "People often visit suspicious links without an immediate warning inside their browser flow.",
    description:
      "A Chrome extension concept that inspects URLs, checks them against a backend or security API, and warns users before risky visits.",
    tech: ["JavaScript", "Chrome APIs", "REST APIs"],
    link: "https://github.com/Dabz01/url-scanner",
  },
];

const previewExperience = [
  {
    role: "Computer Science Teacher",
    org: "Mountain Top Secondary School, Owerri",
    period: "2025 – Present",
    detail:
      "Teaching programming fundamentals, digital literacy, and practical confidence with technology.",
  },
  {
    role: "Cybersecurity Tutor",
    org: "Kunoch Digi, Owerri",
    period: "2025",
    detail:
      "Facilitating cybersecurity sessions on phishing awareness, safe browsing, and digital hygiene.",
  },
  {
    role: "Cybersecurity Instructor",
    org: "3MTT (AIFCE, Owerri)",
    period: "2024",
    detail:
      "Trained 50+ learners on security fundamentals, password safety, hardening, and threat awareness.",
  },
];

const previewSkills = [
  "Kali Linux",
  "Snort / Suricata",
  "Wireshark",
  "Python automation",
  "JavaScript",
  "React basics",
  "Git & GitHub",
  "Technical teaching",
  "Research & writing",
];

const previewCertifications = [
  "Linux Essentials",
  "Endpoint Security",
  "Networking Devices & Initial Configuration",
  "Ethical Hacking",
  "CyberThreat Management",
  "CyberOps Associate",
];

function PreviewNav() {
  const [isOpen, setIsOpen] = useState(false);
  const links = ["About", "Work", "Projects", "Skills", "Contact"];

  const handleClick = () => setIsOpen(false);

  return (
    <header className="preview-nav">
      <a href="/" className="preview-brand" aria-label="Return to current portfolio">
        Daberechukwu<span>.</span>
      </a>
      <button
        className="preview-menu-button"
        type="button"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>
      <nav className={isOpen ? "preview-links is-open" : "preview-links"}>
        {links.map((link) => (
          <a key={link} href={`#${link.toLowerCase()}`} onClick={handleClick}>
            {link}
          </a>
        ))}
      </nav>
    </header>
  );
}

function PreviewHero() {
  return (
    <section className="preview-hero" id="about">
      <div className="preview-hero-copy">
        <p className="preview-kicker">Preview redesign • Current site untouched</p>
        <h1>
          Cybersecurity educator & security-focused developer building practical
          digital safety tools.
        </h1>
        <p className="preview-lede">
          I teach real-world cybersecurity in clear, hands-on ways and build
          projects that help people identify threats like phishing, suspicious
          links, and unsafe digital habits.
        </p>
        <div className="preview-actions">
          <a href="#projects" className="preview-button preview-button-primary">
            View my work
          </a>
          <a
            href="/daberechukwu-chukwuma-cv.pdf"
            className="preview-button preview-button-secondary"
            download
          >
            <FaDownload /> Download CV
          </a>
        </div>
      </div>
      <aside className="preview-profile-card" aria-label="Portfolio snapshot">
        <div className="preview-avatar-shell">
          <img
            src="/profile.jpg"
            alt="Daberechukwu Chukwuma"
            className="preview-avatar"
          />
        </div>
        <h2>Daberechukwu Chukwuma</h2>
        <p>Cybersecurity • Teaching • Development</p>
        <div className="preview-socials">
          <a href="mailto:dab.chukwuma@gmail.com" aria-label="Email Daberechukwu">
            <FaEnvelope />
          </a>
          <a href="tel:+2349060390763" aria-label="Call Daberechukwu">
            <FaPhoneAlt />
          </a>
          <a
            href="https://wa.me/2349060390763"
            target="_blank"
            rel="noreferrer"
            aria-label="Message Daberechukwu on WhatsApp"
          >
            <FaWhatsapp />
          </a>
          <a
            href="https://github.com/Dabz01"
            target="_blank"
            rel="noreferrer"
            aria-label="View Daberechukwu on GitHub"
          >
            <FaGithub />
          </a>
        </div>
      </aside>
    </section>
  );
}

function PreviewStats() {
  return (
    <section className="preview-stats" aria-label="Impact highlights">
      {previewStats.map((stat) => (
        <article key={stat.label}>
          <strong>{stat.value}</strong>
          <span>{stat.label}</span>
        </article>
      ))}
    </section>
  );
}

function SectionIntro({ eyebrow, title, children }) {
  return (
    <div className="preview-section-intro">
      <p>{eyebrow}</p>
      <h2>{title}</h2>
      {children && <span>{children}</span>}
    </div>
  );
}

function PreviewExperience() {
  return (
    <section className="preview-section" id="work">
      <SectionIntro eyebrow="Experience" title="Teaching security with practical context.">
        A timeline-style preview that makes your teaching and training work easier to scan.
      </SectionIntro>
      <div className="preview-timeline">
        {previewExperience.map((item) => (
          <article key={`${item.role}-${item.org}`} className="preview-timeline-item">
            <div>
              <p className="preview-period">{item.period}</p>
              <h3>{item.role}</h3>
              <p className="preview-org">{item.org}</p>
            </div>
            <p>{item.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function PreviewProjects() {
  return (
    <section className="preview-section" id="projects">
      <SectionIntro eyebrow="Projects" title="Security projects presented as case studies.">
        Each card explains the category, problem, solution, tech stack, and GitHub link.
      </SectionIntro>
      <div className="preview-project-grid">
        {previewProjects.map((project) => (
          <article key={project.title} className="preview-project-card">
            <p className="preview-category">{project.category}</p>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div className="preview-problem">
              <strong>Problem solved</strong>
              <span>{project.problem}</span>
            </div>
            <div className="preview-tags">
              {project.tech.map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </div>
            <a href={project.link} target="_blank" rel="noreferrer">
              View GitHub →
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}

function PreviewSkills() {
  return (
    <section className="preview-section preview-split" id="skills">
      <div>
        <SectionIntro eyebrow="Skills" title="A clearer security-focused toolkit.">
          This preview groups your strongest technical and teaching signals into quick skill chips.
        </SectionIntro>
        <div className="preview-skill-cloud">
          {previewSkills.map((skill) => (
            <span key={skill}>{skill}</span>
          ))}
        </div>
      </div>
      <div className="preview-cert-card">
        <p className="preview-category">Certifications</p>
        <h3>Security learning path</h3>
        <ul>
          {previewCertifications.map((cert) => (
            <li key={cert}>{cert}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function PreviewContact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (event) => {
    event.preventDefault();
    const text = encodeURIComponent(
      `Hello Daberechukwu, my name is ${form.name}. My email is ${form.email}. ${form.message}`
    );
    window.open(`https://wa.me/2349060390763?text=${text}`, "_blank", "noreferrer");
  };

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  return (
    <section className="preview-section preview-contact" id="contact">
      <div>
        <SectionIntro eyebrow="Contact" title="Turn visitors into conversations.">
          The preview form opens WhatsApp with the visitor’s message already prepared.
        </SectionIntro>
        <div className="preview-contact-links">
          <a href="mailto:dab.chukwuma@gmail.com">
            <FaEnvelope /> dab.chukwuma@gmail.com
          </a>
          <a href="tel:+2349060390763">
            <FaPhoneAlt /> +234 906 039 0763
          </a>
          <a href="https://github.com/Dabz01" target="_blank" rel="noreferrer">
            <FaGithub /> github.com/Dabz01
          </a>
        </div>
      </div>
      <form className="preview-contact-form" onSubmit={handleSubmit}>
        <label>
          Name
          <input
            name="name"
            type="text"
            placeholder="Your name"
            value={form.name}
            onChange={updateField}
            required
          />
        </label>
        <label>
          Email
          <input
            name="email"
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={updateField}
            required
          />
        </label>
        <label>
          Message
          <textarea
            name="message"
            rows="4"
            placeholder="What should we discuss?"
            value={form.message}
            onChange={updateField}
            required
          />
        </label>
        <button type="submit" className="preview-button preview-button-primary">
          Start WhatsApp chat
        </button>
      </form>
    </section>
  );
}

function PreviewPortfolio() {
  return (
    <div className="preview-app">
      <div className="preview-glow preview-glow-one" />
      <div className="preview-glow preview-glow-two" />
      <PreviewNav />
      <main>
        <PreviewHero />
        <PreviewStats />
        <PreviewExperience />
        <PreviewProjects />
        <PreviewSkills />
        <PreviewContact />
      </main>
      <footer className="preview-footer">
        <p>Preview version only — your current homepage is still available at /.</p>
      </footer>
    </div>
  );
}

export default PreviewPortfolio;
