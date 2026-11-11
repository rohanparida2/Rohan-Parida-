"use strict";

const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
const escapeHTML = (value) => String(value).replace(/[&<>"']/g, (char) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
})[char]);

const icons = {
  GitHub: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 6v-3.9a3.4 3.4 0 0 0-.9-2.7c3-.3 6.2-1.5 6.2-6.7a5.2 5.2 0 0 0-1.4-3.6 4.8 4.8 0 0 0-.1-3.6s-1.2-.4-3.8 1.4a13.2 13.2 0 0 0-6.9 0C5.5 1.1 4.3 1.5 4.3 1.5a4.8 4.8 0 0 0-.1 3.6 5.2 5.2 0 0 0-1.4 3.7c0 5.1 3.2 6.3 6.2 6.7A3.4 3.4 0 0 0 8 18.2V22"></path></svg>',
  LinkedIn: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9v11M4 4v.01M9 20v-6a4 4 0 0 1 8 0v6m0-6v6m-8-11v11"></path></svg>',
  Instagram: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"></rect><circle cx="12" cy="12" r="4"></circle><path d="M17.5 6.5h.01"></path></svg>',
  Email: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"></rect><path d="m3 7 9 6 9-6"></path></svg>'
};

const socialLinks = (contact) => [
  ["GitHub", contact.github],
  ["LinkedIn", contact.linkedin],
  ["Instagram", contact.instagram],
  ["Email", `mailto:${contact.email}`]
].map(([label, url]) => `<a class="social-link" href="${escapeHTML(url)}" aria-label="${label}"${url.startsWith("http") ? ' target="_blank" rel="noopener noreferrer"' : ""}>${icons[label]}</a>`).join("");

function renderPortfolio(data) {
  document.title = `${data.name} — AI & Software`;
  $(".hero-name").innerHTML = `${escapeHTML(data.name)}<span class="name-period">.</span>`;
  $(".hero-greeting").textContent = "Hello, I'm";
  $(".hero-tagline").textContent = data.tagline;
  $("#typed-role").dataset.roles = JSON.stringify(data.roles);
  $(".podium-card img").alt = `${data.name} speaking at a university podium.`;
  $(".hero-social").innerHTML = socialLinks(data.contact);

  $(".about-text").textContent = data.about;
  $(".stats-grid").innerHTML = [
    ["cgpa", "CGPA", 2], ["projects", "Projects", 0],
    ["certifications", "Certifications", 0], ["hackathons", "Hackathons", 0]
  ].map(([key, label, decimals]) => {
    const number = Number(data.stats[key]);
    return `<div class="stat-card"><strong class="stat-number" data-count="${number}" data-decimals="${decimals}">0</strong><span class="stat-label">${label}</span></div>`;
  }).join("");

  const education = data.education;
  $(".education-school").textContent = education.school;
  $(".education-degree").textContent = education.degree;
  $(".education-period").textContent = education.period;
  $(".grade-row").innerHTML = [
    ["sem1_sgpa", "Sem 1 SGPA"], ["sem2_sgpa", "Sem 2 SGPA"], ["overall_cgpa", "Overall CGPA"]
  ].map(([key, label]) => `<div class="grade"><strong>${Number(education.grades[key]).toFixed(2)}</strong><span>${label}</span></div>`).join("");

  $(".skills-grid").innerHTML = Object.entries(data.skills).map(([group, skills], index) =>
    `<article class="skill-card reveal" style="transition-delay:${Math.min(index * 45, 360)}ms"><h3 class="skill-title">${escapeHTML(group)}</h3><div class="skill-chips">${skills.map((skill, chipIndex) => `<span class="skill-chip" style="--chip-index:${chipIndex}">${escapeHTML(skill)}</span>`).join("")}</div></article>`
  ).join("");

  $(".timeline").innerHTML = data.experience.map((job) =>
    `<article class="timeline-item reveal"><span class="timeline-marker" aria-hidden="true"></span><div class="timeline-meta"><span>${escapeHTML(job.period)}</span>${job.location ? `<span>· ${escapeHTML(job.location)}</span>` : ""}</div><h3 class="timeline-role">${escapeHTML(job.role)}</h3><p class="timeline-org">${escapeHTML(job.org)}</p><p class="timeline-description">${escapeHTML(job.description)}</p><div class="tag-list">${job.tags.map((tag) => `<span class="tag">${escapeHTML(tag)}</span>`).join("")}</div></article>`
  ).join("");

  const projects = data.projects;
  $(".work-count").textContent = `${String(projects.filter((project) => project.url).length).padStart(2, "0")} PROJECTS`;
  $(".projects-grid").innerHTML = projects.map((project, index) => {
    if (!project.url) {
      return `<article class="project-card project-coming reveal"><span class="project-topline">IN PROGRESS <span class="project-arrow" aria-hidden="true">✳</span></span><h3>${escapeHTML(project.name)}</h3><p>${escapeHTML(project.description)}</p></article>`;
    }
    return `<article class="project-card reveal" data-tilt><span class="project-topline">0${index + 1} / PROJECT <span class="project-arrow" aria-hidden="true">↗</span></span><h3>${escapeHTML(project.name)}</h3><p>${escapeHTML(project.description)}</p><div class="tag-list">${project.tags.map((tag) => `<span class="tag">${escapeHTML(tag)}</span>`).join("")}</div><a class="project-link" href="${escapeHTML(project.url)}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHTML(project.name)} on GitHub"></a></article>`;
  }).join("");

  $(".certifications-grid").innerHTML = Object.entries(data.certifications).map(([issuer, certificates]) =>
    `<article class="issuer-card reveal"><h3 class="issuer-title"><span class="issuer-mark" aria-hidden="true">${escapeHTML(issuer.slice(0, 1))}</span>${escapeHTML(issuer)}</h3><ul class="certificate-list">${certificates.map((certificate) => `<li>${escapeHTML(certificate)}</li>`).join("")}</ul></article>`
  ).join("");

  $(".hackathons-grid").innerHTML = data.hackathons.map((hackathon, index) =>
    `<article class="hackathon-card reveal"><span class="hackathon-number">0${index + 1} / HACKATHON</span><p>${escapeHTML(hackathon)}</p></article>`
  ).join("");

  $(".contact-email").textContent = data.contact.email;
  $(".contact-email").href = `mailto:${data.contact.email}`;
  $(".contact-social").innerHTML = socialLinks(data.contact);
  $(".footer-copy").textContent = `© ${new Date().getFullYear()} ${data.name}. All rights reserved.`;
}

function setupMotion() {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  $$(".reveal").forEach((element) => revealObserver.observe(element));

  const roleElement = $("#typed-role");
  const roles = JSON.parse(roleElement.dataset.roles);
  if (!reducedMotion) {
    let roleIndex = 0;
    let characterIndex = 0;
    let deleting = false;
    const type = () => {
      const currentRole = roles[roleIndex];
      characterIndex += deleting ? -1 : 1;
      roleElement.textContent = currentRole.slice(0, characterIndex);
      let delay = deleting ? 38 : 68;
      if (!deleting && characterIndex === currentRole.length) {
        deleting = true;
        delay = 1450;
      } else if (deleting && characterIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        delay = 280;
      }
      window.setTimeout(type, delay);
    };
    type();
  } else {
    roleElement.textContent = roles[0];
    $(".typing-caret").hidden = true;
  }

  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const counter = entry.target;
      const target = Number(counter.dataset.count);
      const decimals = Number(counter.dataset.decimals);
      const start = performance.now();
      const duration = reducedMotion ? 0 : 1100;
      const tick = (now) => {
        const progress = duration === 0 ? 1 : Math.min((now - start) / duration, 1);
        const eased = 1 - (1 - progress) ** 4;
        const value = target * eased;
        counter.innerHTML = decimals
          ? value.toFixed(decimals)
          : `${Math.floor(value)}<span>+</span>`;
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      observer.unobserve(counter);
    });
  }, { threshold: 0.75 });
  $$(".stat-number").forEach((counter) => {
    const decimals = Number(counter.dataset.decimals);
    counter.innerHTML = decimals ? (0).toFixed(decimals) : '0<span>+</span>';
    counterObserver.observe(counter);
  });
}

function setupInteractions(data) {
  const menuToggle = $(".menu-toggle");
  const navLinks = $(".nav-links");
  const closeMenu = () => {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    navLinks.classList.remove("is-open");
  };
  menuToggle.addEventListener("click", () => {
    const open = menuToggle.getAttribute("aria-expanded") !== "true";
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    navLinks.classList.toggle("is-open", open);
  });
  $$(".nav-links a").forEach((link) => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  const themeToggle = $(".theme-toggle");
  const themeIcon = $(".theme-icon");
  const savedTheme = localStorage.getItem("portfolio-theme");
  if (savedTheme === "light") document.documentElement.dataset.theme = "light";
  const updateThemeButton = () => {
    const light = document.documentElement.dataset.theme === "light";
    themeToggle.setAttribute("aria-label", light ? "Switch to dark theme" : "Switch to light theme");
    themeIcon.innerHTML = light
      ? '<path d="M20.5 15.2A8.5 8.5 0 0 1 8.8 3.5 8.5 8.5 0 1 0 20.5 15.2Z"></path>'
      : '<circle cx="12" cy="12" r="4"></circle><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"></path>';
  };
  updateThemeButton();
  themeToggle.addEventListener("click", () => {
    const light = document.documentElement.dataset.theme !== "light";
    document.documentElement.dataset.theme = light ? "light" : "dark";
    localStorage.setItem("portfolio-theme", light ? "light" : "dark");
    updateThemeButton();
  });

  const navItems = $$(".nav-links a");
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navItems.forEach((link) => {
        const active = link.hash === `#${entry.target.id}`;
        link.classList.toggle("active", active);
        if (active) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    });
  }, { rootMargin: "-30% 0px -60% 0px" });
  navItems.forEach((link) => {
    const section = $(link.hash);
    if (section) sectionObserver.observe(section);
  });

  const progressBar = $("#scroll-progress");
  const updateProgress = () => {
    const available = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.width = `${available > 0 ? window.scrollY / available * 100 : 0}%`;
  };
  window.addEventListener("scroll", updateProgress, { passive: true });
  updateProgress();

  const pointerFine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (pointerFine && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const glow = $(".cursor-glow");
    window.addEventListener("pointermove", (event) => {
      glow.style.left = `${event.clientX}px`;
      glow.style.top = `${event.clientY}px`;
      glow.style.opacity = "1";
    }, { passive: true });
    $$(".magnetic").forEach((button) => {
      button.addEventListener("pointermove", (event) => {
        const rect = button.getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;
        button.style.transform = `translate(${x * .11}px, ${y * .16}px)`;
      });
      button.addEventListener("pointerleave", () => { button.style.transform = ""; });
    });
    $$("[data-tilt]").forEach((card) => {
      card.addEventListener("pointermove", (event) => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - .5;
        const y = (event.clientY - rect.top) / rect.height - .5;
        card.style.transform = `perspective(900px) rotateX(${-y * 3}deg) rotateY(${x * 3}deg)`;
      });
      card.addEventListener("pointerleave", () => { card.style.transform = ""; });
    });
  }

  $(".copy-button").addEventListener("click", async () => {
    const button = $(".copy-button");
    try {
      await navigator.clipboard.writeText(data.contact.email);
      button.innerHTML = "Email copied <span aria-hidden=\"true\">✓</span>";
    } catch (error) {
      console.error("Could not copy email to clipboard:", error);
      button.textContent = "Copy unavailable — select the email above";
    }
  });

  $(".contact-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const values = new FormData(form);
    const subject = `Portfolio hello from ${values.get("name")}`;
    const body = `From: ${values.get("name")}\nReply to: ${values.get("email")}\n\n${values.get("message")}`;
    $(".form-status").textContent = "Opening your email app with a draft.";
    window.location.href = `mailto:${data.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}

async function initialize() {
  try {
    const response = await fetch("content.json");
    if (!response.ok) throw new Error(`Could not load content.json (${response.status})`);
    const data = await response.json();
    renderPortfolio(data);
    setupMotion();
    setupInteractions(data);
  } catch (error) {
    console.error("Portfolio initialization failed:", error);
    $("#load-error").hidden = false;
  }
}

initialize();
