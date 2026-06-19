import assert from "node:assert/strict";
import { test } from "node:test";
import {
  loadFallback,
  normalizeGitHubData,
} from "../scripts/fetch-github-data.mjs";

const org = {
  login: "Algovate",
  name: null,
  description: "Intelligence in Motion",
  html_url: "https://github.com/Algovate",
  public_repos: 4,
};

const repos = [
  {
    name: "xhs-mcp",
    fork: false,
    language: "TypeScript",
    stargazers_count: 52,
    html_url: "https://github.com/Algovate/xhs-mcp",
    updated_at: "2026-06-10T00:00:00Z",
  },
  {
    name: "Zephyr",
    fork: false,
    language: "Python",
    stargazers_count: 2,
    html_url: "https://github.com/Algovate/Zephyr",
    updated_at: "2026-06-12T00:00:00Z",
  },
  {
    name: "Quanta",
    fork: false,
    language: null,
    stargazers_count: 1,
    html_url: "https://github.com/Algovate/Quanta",
    updated_at: "2026-06-11T00:00:00Z",
  },
  {
    name: "forked-project",
    fork: true,
    language: "Shell",
    stargazers_count: 100,
    html_url: "https://github.com/Algovate/forked-project",
    updated_at: "2026-06-13T00:00:00Z",
  },
];

test("normalizes organization evidence and selected projects", () => {
  const data = normalizeGitHubData(org, repos, "2026-06-19T00:00:00Z");

  assert.equal(data.organization.name, "Algovate");
  assert.equal(data.organization.originalRepos, 3);
  assert.equal(data.organization.totalStars, 155);
  assert.equal(data.organization.latestUpdate, "2026-06-13T00:00:00Z");
  assert.deepEqual(
    data.projects.map((project) => project.name),
    ["xhs-mcp", "Zephyr", "Quanta"],
  );
  assert.equal(data.projects[2].language, "Multi-language");
});

test("fallback snapshot is complete and deployable", async () => {
  const fallback = await loadFallback();

  assert.equal(fallback.organization.login, "Algovate");
  assert.equal(fallback.projects.length, 3);
  assert.ok(fallback.projects.every((project) => project.url.startsWith("https://")));
  assert.ok(fallback.retrievedAt);
});
