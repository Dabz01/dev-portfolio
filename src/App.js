import React, { useEffect, useState } from "react";
import "./App.css";
import {
  FaGithub,
  FaEnvelope,
  FaPhoneAlt,
  FaWhatsapp,
} from "react-icons/fa";

/* =========================
   DATA
========================= */

const PROJECTS = [
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
];

const EXPERIENCE = [
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
];

const SKILLS = [
  {
    category: "Cybersecurity & Networking",
    items: [
      "Kali Linux",
      "Snort / Suricata",
      "Wireshark",
      "Firewalls",
      "TCP/IP",
    ],
  },
  {
    category: "Programming & Web",
    items: [
      "Python (APIs, automation)",
      "JavaScript",
      "HTML & CSS",
      "React basics",
    ],
  },
  {
    category: "Tools & Platforms",
    items: ["Linux", "Git & GitHub", "CLI", "Basic server management"],
  },
  {
    category: "Soft Skills",
    items: ["Teaching", "Communication", "Mentoring", "Research & Writing"],
  },
];

const CERTIFICATIONS = [
  "Linux Essentials (2024)",
  "Endpoint Security (2024)",
  "Networking Devices & Initial Configuration (2024)",
  "Ethical Hacking (2024)",
  "CyberThreat Management (2024)",
  "CyberOps Associate (2025)",
];

const TESTIMONIALS = [
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
];

/* =========================
   SMALL UTILS
========================= */

function TypingText({ words, speed = 120, pause = 1000 }) {
  const [index, setIndex] = useState(0);
  const [display, setDisplay] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[index % words.length];
    let timeout;

    if (!isDeleting && display.length < currentWord.length) {
      timeout = setTimeout(
        () => setDisplay(currentWord.slice(0, display.length + 1)),
        speed
      );
    } else if (isDeleting && display.length > 0) {
      timeout = setTimeout(
        () => setDisplay(currentWord.slice(0, display.length - 1)),
        speed / 2
      );
    } else {
      if (!isDeleting && display.length === currentWord.length) {
        timeout = setTimeout(() => setIsDeleting(true), pause);
      } else if (isDeleting && display.length === 0) {
        setIsDeleting(false);
        setIndex((prev) => (prev + 1) % words.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [display, isDeleting, index, words, speed, pause]);

  return (
    <span className="typing">
      {display}
      <span className="typing-caret">|</span>
    </span>
  );
}

/* =========================
   SECTIONS
========================= */

function Navbar() {
  return (
    <header className="nav">
      <div className="nav-left">
        <div className="nav-logo">Daberechukwu<span>.</span></div>
      </div>
      <nav className="nav-right">
        <a href="#hero">Home</a>
        <a href="#about">About</a>
        <a href="#experience">Experience</a>
        <a href="#projects">Projects</a>
        <a href="#skills">Skills</a>
        <a href="#certifications">Certs</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="hero-main">
        <p className="eyebrow">Cybersecurity • Development • Teaching</p>
        <h1>
          Hi, I’m <span className="accent">Daberechukwu Chukwuma</span>
        </h1>
        <h2>
          <TypingText
            words={[
              "Cybersecurity Specialist",
              "Developer",
              "Technology Educator",
            ]}
          />
        </h2>
        <p className="hero-text">
          I design and explain cybersecurity in a simple, practical way—through
          real-world projects, training, and tools that help people stay safe
          online.
        </p>
        <div className="hero-actions">
          <a href="#projects" className="btn btn-primary">
            View Projects
          </a>
          <a href="#contact" className="btn btn-ghost">
            Get in Touch
          </a>
          <a
            href="/daberechukwu-chukwuma-cv.pdf"
            className="btn btn-outline"
            download
          >
            Download CV
          </a>
        </div>
        <div className="hero-links">
          <a href="mailto:dab.chukwuma@gmail.com">
            <FaEnvelope /> Email
          </a>
          <a href="tel:+2349060390763">
            <FaPhoneAlt /> Call
          </a>
          <a
            href="https://wa.me/2349060390763"
            target="_blank"
            rel="noreferrer"
          >
            <FaWhatsapp /> WhatsApp
          </a>
          <a
            href="https://github.com/Dabz01"
            target="_blank"
            rel="noreferrer"
          >
            <FaGithub /> GitHub
          </a>
        </div>
      </div>
      <div className="hero-side">
        <div className="hero-avatar-wrap">
          <div className="hero-ring" />
          <img src="/profile.jpg" alt="Profile" className="hero-avatar" />
        </div>
        <div className="hero-summary card">
          <h3>Snapshot</h3>
          <ul>
            <li>Computer Science Teacher – MTS Owerri</li>
            <li>Cybersecurity Tutor – Kunoch Digi</li>
            <li>Cybersecurity Instructor – 3MTT (AIFCE)</li>
            <li>B.Sc. Cybersecurity – FUTO</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="section section-narrow">
      <h2>About</h2>
      <p>
        I am a cybersecurity-focused developer and educator based in Owerri,
        Nigeria. My work sits at the intersection of secure systems, practical
        training, and real-world problem solving. I enjoy breaking down complex
        ideas into clear, step-by-step explanations and building tools that
        defend against threats like phishing and unsafe links.
      </p>
      <p>
        Long-term, I want to contribute to a safer digital ecosystem in Africa
        by combining hands-on technical skills, teaching, and community-focused
        security awareness.
      </p>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="section">
      <div className="section-header">
        <h2>Experience</h2>
        <p>Roles that have shaped how I think about security and teaching.</p>
      </div>
      <div className="experience-grid">
        {EXPERIENCE.map((job, idx) => (
          <article key={idx} className="card">
            <div className="card-header-row">
              <h3>{job.role}</h3>
              <span className="badge">{job.period}</span>
            </div>
            <p className="muted">{job.org}</p>
            <ul className="bullet-list">
              {job.points.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="section">
      <div className="section-header">
        <h2>Projects</h2>
        <p>
          A selection of security-focused projects and tools I’ve worked on
          recently.
        </p>
      </div>
      <div className="project-grid">
        {PROJECTS.map((project, idx) => (
          <article key={idx} className="card project-card">
            <h3>{project.title}</h3>
            <p className="muted">{project.description}</p>
            <div className="tags">
              {project.tech.map((t) => (
                <span key={t} className="tag">
                  {t}
                </span>
              ))}
            </div>
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="project-link"
            >
              View on GitHub →
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="section">
      <div className="section-header">
        <h2>Skills</h2>
        <p>Tools and capabilities I use to deliver secure, practical outcomes.</p>
      </div>
      <div className="skills-grid">
        {SKILLS.map((group, idx) => (
          <article key={idx} className="card">
            <h3>{group.category}</h3>
            <ul className="simple-list">
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

function Certifications() {
  return (
    <section id="certifications" className="section section-narrow">
      <h2>Certifications</h2>
      <div className="cert-row">
        {CERTIFICATIONS.map((cert) => (
          <span key={cert} className="cert-chip">
            {cert}
          </span>
        ))}
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="section">
      <div className="section-header">
        <h2>Testimonials</h2>
        <p>What learners and supervisors have said about working with me.</p>
      </div>
      <div className="testimonial-grid">
        {TESTIMONIALS.map((t, idx) => (
          <article key={idx} className="card">
            <p className="quote">“{t.text}”</p>
            <p className="muted">
              {t.name} — {t.role}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thanks for reaching out! I will respond as soon as I can.");
  };

  return (
    <section id="contact" className="section">
      <div className="section-header">
        <h2>Contact</h2>
        <p>Open to teaching, collaboration, and security-focused roles.</p>
      </div>
      <div className="contact-layout">
        <div className="card contact-card">
          <h3>Let’s work together</h3>
          <ul className="contact-list">
            <li>
              <FaEnvelope />{" "}
              <a href="mailto:dab.chukwuma@gmail.com">
                dab.chukwuma@gmail.com
              </a>
            </li>
            <li>
              <FaPhoneAlt />{" "}
              <a href="tel:+2349060390763">+234 906 039 0763</a>
            </li>
            <li>
              <FaWhatsapp />{" "}
              <a
                href="https://wa.me/2349060390763"
                target="_blank"
                rel="noreferrer"
              >
                Chat on WhatsApp
              </a>
            </li>
            <li>
              <FaGithub />{" "}
              <a
                href="https://github.com/Dabz01"
                target="_blank"
                rel="noreferrer"
              >
                github.com/Dabz01
              </a>
            </li>
          </ul>
        </div>
        <form className="card contact-form" onSubmit={handleSubmit}>
          <h3>Send a message</h3>
          <label>
            Name
            <input type="text" placeholder="Your name" required />
          </label>
          <label>
            Email
            <input
              type="email"
              placeholder="you@example.com"
              required
            />
          </label>
          <label>
            Message
            <textarea
              rows="4"
              placeholder="How can I help you?"
              required
            />
          </label>
          <button type="submit" className="btn btn-primary full-width">
            Send
          </button>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Daberechukwu Chukwuma</p>
      <p className="muted">
        Cybersecurity • Development • Teaching
      </p>
    </footer>
  );
}

/* =========================
   ROOT
========================= */

function App() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="app">
      <div className="bg-gradient" />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Certifications />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
