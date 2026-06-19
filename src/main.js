import "./styles.css";
import githubData from "./data/github.generated.json";
import { siteContent } from "./content.js";

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

document.querySelectorAll("[data-contact-link]").forEach((link) => {
  link.href = siteContent.contactUrl;
});

document.querySelectorAll("[data-github-link]").forEach((link) => {
  link.href = siteContent.githubUrl;
});

document.querySelector("[data-year]").textContent = new Date().getFullYear();

const menuButton = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");

menuButton?.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!open));
  nav.dataset.open = String(!open);
  document.body.classList.toggle("menu-open", !open);
});

nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuButton?.setAttribute("aria-expanded", "false");
    nav.dataset.open = "false";
    document.body.classList.remove("menu-open");
  });
});

const formatDate = (value, options) =>
  new Intl.DateTimeFormat("en-US", options).format(new Date(value));

const hydrateGitHubData = () => {
  const { organization, projects, retrievedAt } = githubData;

  document.querySelectorAll("[data-metric]").forEach((element) => {
    const key = element.dataset.metric;
    element.dataset.value = organization[key];
    element.textContent = organization[key];
  });

  document.querySelector("[data-latest-update]").textContent =
    `Updated ${formatDate(organization.latestUpdate, {
      month: "short",
      day: "numeric",
      year: "numeric",
    })}`;

  const retrievedElement = document.querySelector("[data-retrieved-at]");
  retrievedElement.dateTime = retrievedAt;
  retrievedElement.textContent = formatDate(retrievedAt, {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  projects.forEach((project) => {
    const card = document.querySelector(`[data-project="${project.name}"]`);
    if (!card) return;
    card.href = project.url;
    card.querySelector(".project-category").textContent = project.category;
    card.querySelector(".project-description").textContent =
      project.description;
    const metadata = card.querySelectorAll(".project-meta span");
    metadata[0].textContent = project.language;
    metadata[1].textContent =
      project.stars > 0
        ? `${project.stars} ${project.stars === 1 ? "star" : "stars"}`
        : "Open source";
  });
};

hydrateGitHubData();

const revealElements = document.querySelectorAll(".reveal");
if (reducedMotion.matches || !("IntersectionObserver" in window)) {
  revealElements.forEach((element) => element.classList.add("is-visible"));
} else {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
  );
  revealElements.forEach((element) => revealObserver.observe(element));
}

const metricElements = document.querySelectorAll("[data-metric]");
if (!reducedMotion.matches && "IntersectionObserver" in window) {
  const metricObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const target = Number(entry.target.dataset.value);
        const duration = 700;
        const start = performance.now();
        const tick = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - (1 - progress) ** 3;
          entry.target.textContent = Math.round(target * eased);
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.8 },
  );
  metricElements.forEach((element) => metricObserver.observe(element));
}

const signalStage = document.querySelector("[data-signal-stage]");
const hero = document.querySelector(".hero");
if (signalStage && hero && !reducedMotion.matches) {
  hero.addEventListener("pointermove", (event) => {
    const bounds = hero.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    signalStage.style.setProperty("--signal-x", `${x * 18}px`);
    signalStage.style.setProperty("--signal-y", `${y * 14}px`);
  });
  hero.addEventListener("pointerleave", () => {
    signalStage.style.setProperty("--signal-x", "0px");
    signalStage.style.setProperty("--signal-y", "0px");
  });
}
