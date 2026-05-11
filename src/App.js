import React, { useEffect, useState } from "react";
import "./App.css";
import PreviewPortfolio from "./PreviewPortfolio";
import PortfolioManager from "./PortfolioManager";
import usePortfolioContent from "./usePortfolioContent";
import {
  FaGithub,
  FaEnvelope,
  FaPhoneAlt,
  FaWhatsapp,
} from "react-icons/fa";

/* =========================
   SMALL UTILS
========================= */

function TypingText({ words, speed = 120, pause = 1000 }) {
  const [index, setIndex] = useState(0);
  const [display, setDisplay] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words.length ? words[index % words.length] : "";
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

function Navbar({ brandName }) {
  return (
    <header className="nav">
      <div className="nav-left">
        <div className="nav-logo">{brandName}<span>.</span></div>
      </div>
      <nav className="nav-right">
        <a href="#hero">Home</a>
        <a href="#about">About</a>
        <a href="#experience">Experience</a>
        <a href="#projects">Projects</a>
        <a href="#skills">Skills</a>
        <a href="#certifications">Certs</a>
        <a href="#contact">Contact</a>
        <a href="/manage">Manage</a>
      </nav>
    </header>
  );
}

function Hero({ content }) {
  return (
    <section id="hero" className="hero">
      <div className="hero-main">
        <p className="eyebrow">{content.hero.eyebrow}</p>
        <h1>
          Hi, I’m <span className="accent">{content.hero.name}</span>
        </h1>
        <h2>
          <TypingText words={content.hero.titles} />
        </h2>
        <p className="hero-text">
          {content.hero.intro}
        </p>
        <div className="hero-actions">
          <a href="#projects" className="btn btn-primary">
            View Projects
          </a>
          <a href="#contact" className="btn btn-ghost">
            Get in Touch
          </a>
          <a
            href={content.documents.cvUrl}
            className="btn btn-outline"
            download
          >
            Download CV
          </a>
        </div>
        <div className="hero-links">
          <a href={`mailto:${content.contact.email}`}>
            <FaEnvelope /> Email
          </a>
          <a href={`tel:${content.contact.phone}`}>
            <FaPhoneAlt /> Call
          </a>
          <a
            href={`https://wa.me/${content.contact.whatsapp}`}
            target="_blank"
            rel="noreferrer"
          >
            <FaWhatsapp /> WhatsApp
          </a>
          <a
            href={content.contact.github}
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
          <img src={content.documents.profileImage} alt={content.hero.name} className="hero-avatar" />
        </div>
        <div className="hero-summary card">
          <h3>Snapshot</h3>
          <ul>
            {content.snapshot.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function About({ about }) {
  return (
    <section id="about" className="section section-narrow">
      <h2>About</h2>
      {about.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </section>
  );
}

function Experience({ experience }) {
  return (
    <section id="experience" className="section">
      <div className="section-header">
        <h2>Experience</h2>
        <p>Roles that have shaped how I think about security and teaching.</p>
      </div>
      <div className="experience-grid">
        {experience.map((job, idx) => (
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

function Projects({ projects }) {
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
        {projects.map((project, idx) => (
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

function Skills({ skills }) {
  return (
    <section id="skills" className="section">
      <div className="section-header">
        <h2>Skills</h2>
        <p>Tools and capabilities I use to deliver secure, practical outcomes.</p>
      </div>
      <div className="skills-grid">
        {skills.map((group, idx) => (
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

function Certifications({ certifications }) {
  return (
    <section id="certifications" className="section section-narrow">
      <h2>Certifications</h2>
      <div className="cert-row">
        {certifications.map((cert) => (
          <span key={cert} className="cert-chip">
            {cert}
          </span>
        ))}
      </div>
    </section>
  );
}

function Testimonials({ testimonials }) {
  return (
    <section className="section">
      <div className="section-header">
        <h2>Testimonials</h2>
        <p>What learners and supervisors have said about working with me.</p>
      </div>
      <div className="testimonial-grid">
        {testimonials.map((t, idx) => (
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

function Contact({ contact }) {
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
              <a href={`mailto:${contact.email}`}>
                {contact.email}
              </a>
            </li>
            <li>
              <FaPhoneAlt />{" "}
              <a href={`tel:${contact.phone}`}>{contact.phoneDisplay}</a>
            </li>
            <li>
              <FaWhatsapp />{" "}
              <a
                href={`https://wa.me/${contact.whatsapp}`}
                target="_blank"
                rel="noreferrer"
              >
                Chat on WhatsApp
              </a>
            </li>
            <li>
              <FaGithub />{" "}
              <a
                href={contact.github}
                target="_blank"
                rel="noreferrer"
              >
                {contact.githubDisplay}
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

function Footer({ hero }) {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} {hero.name}</p>
      <p className="muted">
        {hero.eyebrow}
      </p>
    </footer>
  );
}

/* =========================
   ROOT
========================= */

function App() {
  const portfolio = usePortfolioContent();
  const isPreviewRoute =
    window.location.pathname === "/preview" ||
    window.location.search.includes("preview=true");
  const isManagerRoute =
    window.location.pathname === "/manage" ||
    window.location.search.includes("manage=true");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [isPreviewRoute, isManagerRoute]);

  if (isPreviewRoute) {
    return <PreviewPortfolio />;
  }

  if (isManagerRoute) {
    return <PortfolioManager />;
  }

  return (
    <div className="app">
      <div className="bg-gradient" />
      <Navbar brandName={portfolio.hero.brandName} />
      <main>
        <Hero content={portfolio} />
        <About about={portfolio.about} />
        <Experience experience={portfolio.experience} />
        <Projects projects={portfolio.projects} />
        <Skills skills={portfolio.skills} />
        <Certifications certifications={portfolio.certifications} />
        <Testimonials testimonials={portfolio.testimonials} />
        <Contact contact={portfolio.contact} />
      </main>
      <Footer hero={portfolio.hero} />
    </div>
  );
}

export default App;
