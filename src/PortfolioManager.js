import React, { useMemo, useState } from "react";
import {
  DEFAULT_PORTFOLIO,
  loadPortfolioContent,
  resetPortfolioContent,
  savePortfolioContent,
} from "./portfolioContent";
import "./PortfolioManager.css";

const emptyProject = { title: "", description: "", tech: [], link: "" };
const emptyExperience = { role: "", org: "", period: "", points: [] };
const emptySkillGroup = { category: "", items: [] };
const emptyTestimonial = { text: "", name: "", role: "" };

function linesToArray(value) {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function arrayToLines(value = []) {
  return value.join("\n");
}

function csvToArray(value) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function ManagerField({ label, children, helper }) {
  return (
    <label className="manager-field">
      <span>{label}</span>
      {children}
      {helper && <small>{helper}</small>}
    </label>
  );
}

function ManagerSection({ title, description, children }) {
  return (
    <section className="manager-section">
      <div className="manager-section-heading">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      {children}
    </section>
  );
}

function safeLoadPortfolioContent() {
  try {
    return loadPortfolioContent();
  } catch (error) {
    console.warn("Unable to load saved manager content. Using defaults.", error);
    return DEFAULT_PORTFOLIO;
  }
}

function PortfolioManager() {
  const [content, setContent] = useState(safeLoadPortfolioContent);
  const [status, setStatus] = useState("Changes save automatically to this browser.");
  const exportedJson = useMemo(() => JSON.stringify(content, null, 2), [content]);

  const persist = (nextContent, message = "Saved to this browser.") => {
    try {
      setContent(nextContent);
      savePortfolioContent(nextContent);
      setStatus(message);
    } catch (error) {
      console.error("Unable to save portfolio content.", error);
      setStatus("Unable to save. The upload may be too large for browser storage.");
    }
  };

  const updateSection = (section, key, value) => {
    persist({
      ...content,
      [section]: {
        ...content[section],
        [key]: value,
      },
    });
  };

  const updateTopLevel = (key, value) => {
    persist({ ...content, [key]: value });
  };

  const updateListItem = (listName, index, key, value) => {
    const nextItems = content[listName].map((item, itemIndex) =>
      itemIndex === index ? { ...item, [key]: value } : item
    );
    updateTopLevel(listName, nextItems);
  };

  const addListItem = (listName, item) => {
    updateTopLevel(listName, [...content[listName], item]);
  };

  const removeListItem = (listName, index) => {
    updateTopLevel(
      listName,
      content[listName].filter((_, itemIndex) => itemIndex !== index)
    );
  };

  const uploadFile = (event, section, key, labelKey) => {
    const file = event.target.files[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      persist({
        ...content,
        [section]: {
          ...content[section],
          [key]: reader.result,
          ...(labelKey ? { [labelKey]: file.name } : {}),
        },
      }, `${file.name} uploaded and saved locally.`);
    };
    reader.readAsDataURL(file);
  };

  const handleImport = (event) => {
    const file = event.target.files[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const importedContent = JSON.parse(reader.result);
        persist(importedContent, `${file.name} imported successfully.`);
      } catch (error) {
        console.error("Unable to import portfolio backup.", error);
        setStatus("Import failed. Please choose a valid portfolio JSON backup.");
      }
    };
    reader.readAsText(file);
  };

  const handleReset = () => {
    resetPortfolioContent();
    setContent(DEFAULT_PORTFOLIO);
    setStatus("Reset to default portfolio content.");
  };

  return (
    <div className="manager-app">
      <header className="manager-hero">
        <p className="manager-kicker">Portfolio management</p>
        <h1>Edit the main site from your browser</h1>
        <p>
          Update text, projects, experience, skills, testimonials, and upload a
          CV or profile image. Saved edits appear on the main portfolio on this
          same browser/device.
        </p>
        <div className="manager-actions">
          <a className="manager-button manager-button-primary" href="/">
            View main site
          </a>
          <a className="manager-button" href="/?preview=true">
            View preview design
          </a>
          <button className="manager-button manager-button-danger" type="button" onClick={handleReset}>
            Reset local edits
          </button>
        </div>
        <p className="manager-status">{status}</p>
      </header>

      <main className="manager-layout">
        <ManagerSection
          title="Hero and contact"
          description="Control the first text people see plus your contact destinations."
        >
          <div className="manager-grid two-columns">
            <ManagerField label="Brand name">
              <input
                value={content.hero.brandName}
                onChange={(event) => updateSection("hero", "brandName", event.target.value)}
              />
            </ManagerField>
            <ManagerField label="Full name">
              <input
                value={content.hero.name}
                onChange={(event) => updateSection("hero", "name", event.target.value)}
              />
            </ManagerField>
            <ManagerField label="Hero eyebrow">
              <input
                value={content.hero.eyebrow}
                onChange={(event) => updateSection("hero", "eyebrow", event.target.value)}
              />
            </ManagerField>
            <ManagerField label="Typing titles" helper="One title per line.">
              <textarea
                rows="4"
                value={arrayToLines(content.hero.titles)}
                onChange={(event) => updateSection("hero", "titles", linesToArray(event.target.value))}
              />
            </ManagerField>
            <ManagerField label="Hero intro">
              <textarea
                rows="4"
                value={content.hero.intro}
                onChange={(event) => updateSection("hero", "intro", event.target.value)}
              />
            </ManagerField>
            <ManagerField label="Snapshot" helper="One snapshot item per line.">
              <textarea
                rows="4"
                value={arrayToLines(content.snapshot)}
                onChange={(event) => updateTopLevel("snapshot", linesToArray(event.target.value))}
              />
            </ManagerField>
            <ManagerField label="Email">
              <input
                type="email"
                value={content.contact.email}
                onChange={(event) => updateSection("contact", "email", event.target.value)}
              />
            </ManagerField>
            <ManagerField label="Phone link value">
              <input
                value={content.contact.phone}
                onChange={(event) => updateSection("contact", "phone", event.target.value)}
              />
            </ManagerField>
            <ManagerField label="Phone display">
              <input
                value={content.contact.phoneDisplay}
                onChange={(event) => updateSection("contact", "phoneDisplay", event.target.value)}
              />
            </ManagerField>
            <ManagerField label="WhatsApp number">
              <input
                value={content.contact.whatsapp}
                onChange={(event) => updateSection("contact", "whatsapp", event.target.value)}
              />
            </ManagerField>
            <ManagerField label="GitHub URL">
              <input
                value={content.contact.github}
                onChange={(event) => updateSection("contact", "github", event.target.value)}
              />
            </ManagerField>
            <ManagerField label="GitHub display">
              <input
                value={content.contact.githubDisplay}
                onChange={(event) => updateSection("contact", "githubDisplay", event.target.value)}
              />
            </ManagerField>
          </div>
        </ManagerSection>

        <ManagerSection
          title="Documents and images"
          description="Upload files for local preview. For a live site, commit the final file into public/ later."
        >
          <div className="manager-grid two-columns">
            <ManagerField label="Profile image upload" helper="PNG/JPG/WebP saved locally as browser data.">
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={(event) => uploadFile(event, "documents", "profileImage")}
              />
            </ManagerField>
            <ManagerField label="CV/document upload" helper={`Current: ${content.documents.cvName}`}>
              <input
                type="file"
                accept="application/pdf,.doc,.docx"
                onChange={(event) => uploadFile(event, "documents", "cvUrl", "cvName")}
              />
            </ManagerField>
          </div>
        </ManagerSection>

        <ManagerSection
          title="About"
          description="Each line becomes one paragraph in the About section."
        >
          <ManagerField label="About paragraphs">
            <textarea
              rows="7"
              value={arrayToLines(content.about)}
              onChange={(event) => updateTopLevel("about", linesToArray(event.target.value))}
            />
          </ManagerField>
        </ManagerSection>

        <ManagerSection title="Projects" description="Edit, add, or remove portfolio projects.">
          <div className="manager-stack">
            {content.projects.map((project, index) => (
              <article className="manager-card" key={`${project.title}-${index}`}>
                <div className="manager-card-header">
                  <h3>Project {index + 1}</h3>
                  <button type="button" onClick={() => removeListItem("projects", index)}>
                    Remove
                  </button>
                </div>
                <ManagerField label="Title">
                  <input
                    value={project.title}
                    onChange={(event) => updateListItem("projects", index, "title", event.target.value)}
                  />
                </ManagerField>
                <ManagerField label="Description">
                  <textarea
                    rows="3"
                    value={project.description}
                    onChange={(event) => updateListItem("projects", index, "description", event.target.value)}
                  />
                </ManagerField>
                <ManagerField label="Tech tags" helper="Comma separated.">
                  <input
                    value={project.tech.join(", ")}
                    onChange={(event) => updateListItem("projects", index, "tech", csvToArray(event.target.value))}
                  />
                </ManagerField>
                <ManagerField label="GitHub/project link">
                  <input
                    value={project.link}
                    onChange={(event) => updateListItem("projects", index, "link", event.target.value)}
                  />
                </ManagerField>
              </article>
            ))}
            <button className="manager-button manager-button-primary" type="button" onClick={() => addListItem("projects", emptyProject)}>
              Add project
            </button>
          </div>
        </ManagerSection>

        <ManagerSection title="Experience" description="Manage teaching, work, and training roles.">
          <div className="manager-stack">
            {content.experience.map((job, index) => (
              <article className="manager-card" key={`${job.role}-${index}`}>
                <div className="manager-card-header">
                  <h3>Experience {index + 1}</h3>
                  <button type="button" onClick={() => removeListItem("experience", index)}>
                    Remove
                  </button>
                </div>
                <div className="manager-grid three-columns">
                  <ManagerField label="Role">
                    <input
                      value={job.role}
                      onChange={(event) => updateListItem("experience", index, "role", event.target.value)}
                    />
                  </ManagerField>
                  <ManagerField label="Organization">
                    <input
                      value={job.org}
                      onChange={(event) => updateListItem("experience", index, "org", event.target.value)}
                    />
                  </ManagerField>
                  <ManagerField label="Period">
                    <input
                      value={job.period}
                      onChange={(event) => updateListItem("experience", index, "period", event.target.value)}
                    />
                  </ManagerField>
                </div>
                <ManagerField label="Bullet points" helper="One bullet per line.">
                  <textarea
                    rows="4"
                    value={arrayToLines(job.points)}
                    onChange={(event) => updateListItem("experience", index, "points", linesToArray(event.target.value))}
                  />
                </ManagerField>
              </article>
            ))}
            <button className="manager-button manager-button-primary" type="button" onClick={() => addListItem("experience", emptyExperience)}>
              Add experience
            </button>
          </div>
        </ManagerSection>

        <ManagerSection title="Skills" description="Edit skill groups and one-skill-per-line lists.">
          <div className="manager-stack">
            {content.skills.map((group, index) => (
              <article className="manager-card" key={`${group.category}-${index}`}>
                <div className="manager-card-header">
                  <h3>Skill group {index + 1}</h3>
                  <button type="button" onClick={() => removeListItem("skills", index)}>
                    Remove
                  </button>
                </div>
                <ManagerField label="Category">
                  <input
                    value={group.category}
                    onChange={(event) => updateListItem("skills", index, "category", event.target.value)}
                  />
                </ManagerField>
                <ManagerField label="Skills" helper="One skill per line.">
                  <textarea
                    rows="4"
                    value={arrayToLines(group.items)}
                    onChange={(event) => updateListItem("skills", index, "items", linesToArray(event.target.value))}
                  />
                </ManagerField>
              </article>
            ))}
            <button className="manager-button manager-button-primary" type="button" onClick={() => addListItem("skills", emptySkillGroup)}>
              Add skill group
            </button>
          </div>
        </ManagerSection>

        <ManagerSection
          title="Certifications"
          description="Edit certifications, one item per line."
        >
          <ManagerField label="Certifications">
            <textarea
              rows="6"
              value={arrayToLines(content.certifications)}
              onChange={(event) => updateTopLevel("certifications", linesToArray(event.target.value))}
            />
          </ManagerField>
        </ManagerSection>

        <ManagerSection title="Testimonials" description="Edit proof and recommendation cards.">
          <div className="manager-stack">
            {content.testimonials.map((testimonial, index) => (
              <article className="manager-card" key={`${testimonial.name}-${index}`}>
                <div className="manager-card-header">
                  <h3>Testimonial {index + 1}</h3>
                  <button type="button" onClick={() => removeListItem("testimonials", index)}>
                    Remove
                  </button>
                </div>
                <ManagerField label="Quote">
                  <textarea
                    rows="3"
                    value={testimonial.text}
                    onChange={(event) => updateListItem("testimonials", index, "text", event.target.value)}
                  />
                </ManagerField>
                <div className="manager-grid two-columns">
                  <ManagerField label="Name">
                    <input
                      value={testimonial.name}
                      onChange={(event) => updateListItem("testimonials", index, "name", event.target.value)}
                    />
                  </ManagerField>
                  <ManagerField label="Role">
                    <input
                      value={testimonial.role}
                      onChange={(event) => updateListItem("testimonials", index, "role", event.target.value)}
                    />
                  </ManagerField>
                </div>
              </article>
            ))}
            <button className="manager-button manager-button-primary" type="button" onClick={() => addListItem("testimonials", emptyTestimonial)}>
              Add testimonial
            </button>
          </div>
        </ManagerSection>

        <ManagerSection
          title="Backup and transfer"
          description="Export your edits or import them on another browser/device."
        >
          <div className="manager-grid two-columns">
            <ManagerField label="Import JSON backup">
              <input type="file" accept="application/json" onChange={handleImport} />
            </ManagerField>
            <ManagerField label="Export JSON backup">
              <textarea rows="8" readOnly value={exportedJson} />
            </ManagerField>
          </div>
        </ManagerSection>
      </main>
    </div>
  );
}

export default PortfolioManager;
