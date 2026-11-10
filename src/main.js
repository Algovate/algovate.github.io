import "./styles.css";
import githubData from "./data/github.generated.json";
import { siteContent } from "./content.js";

const contactLinks = document.querySelectorAll("[data-contact-link]");
const githubLinks = document.querySelectorAll("[data-github-link]");

contactLinks.forEach((link) => {
  link.href = siteContent.contactUrl;
});

githubLinks.forEach((link) => {
  link.href = siteContent.githubUrl;
});

document.querySelectorAll("[data-year]").forEach((element) => {
  element.textContent = new Date().getFullYear();
});

const menuButton = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");
const pageRegions = [
  document.querySelector("main"),
  document.querySelector("footer"),
].filter(Boolean);

const setMenuOpen = (open) => {
  if (!menuButton || !nav) return;

  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.textContent = open ? "Close" : "Menu";
  nav.dataset.open = String(open);
  document.body.classList.toggle("menu-open", open);
  document.documentElement.classList.toggle("menu-open", open);

  pageRegions.forEach((region) => {
    region.inert = open;
  });
};

const closeMenu = () => setMenuOpen(false);

menuButton?.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") === "true";
  setMenuOpen(!open);
});

nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  if (menuButton?.getAttribute("aria-expanded") !== "true") return;
  closeMenu();
  menuButton.focus();
});

const desktopQuery = window.matchMedia("(min-width: 861px)");
desktopQuery.addEventListener("change", (event) => {
  if (event.matches) closeMenu();
});

const formatDate = (value) =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));

const hydrateGitHubData = () => {
  const { organization, projects, retrievedAt } = githubData;

  document.querySelectorAll("[data-metric]").forEach((element) => {
    const value = organization[element.dataset.metric];
    if (value === undefined) return;
    element.textContent = value;
  });

  const retrievedElement = document.querySelector("[data-retrieved-at]");
  if (retrievedElement) {
    retrievedElement.dateTime = retrievedAt;
    retrievedElement.textContent = formatDate(retrievedAt);
  }

  projects.forEach((project) => {
    const card = document.querySelector(`[data-project="${project.name}"]`);
    if (!card) return;

    card.href = project.url;

    const category = card.querySelector(".project-category");
    const description = card.querySelector(".project-description");
    const language = card.querySelector("[data-project-language]");
    const stars = card.querySelector("[data-project-stars]");

    if (category) category.textContent = project.category;
    if (description) description.textContent = project.description;
    if (language) language.textContent = project.language;
    if (stars) {
      stars.textContent =
        project.stars > 0
          ? `${project.stars} ${project.stars === 1 ? "star" : "stars"}`
          : "Open source";
    }
  });
};

hydrateGitHubData();
