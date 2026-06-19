import { readFile, rename, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const fallbackPath = path.join(root, "src/data/github.fallback.json");
const outputPath = path.join(root, "src/data/github.generated.json");
const selectedProjects = ["xhs-mcp", "Zephyr", "Quanta"];

const editorial = {
  "xhs-mcp": {
    description:
      "MCP server and CLI for social platform publishing, search, recommendations, and workflow automation.",
    category: "Agent infrastructure",
  },
  Zephyr: {
    description:
      "A multimodal AI generation gateway designed to unify creative model workflows.",
    category: "AI gateway",
  },
  Quanta: {
    description:
      "An AI-powered quantitative system for real-time market analysis and decision support.",
    category: "Market intelligence",
  },
};

export function normalizeGitHubData(org, repos, retrievedAt = new Date().toISOString()) {
  const originals = repos.filter((repo) => !repo.fork);
  const projects = selectedProjects
    .map((name) => repos.find((repo) => repo.name === name))
    .filter(Boolean)
    .map((repo) => ({
      name: repo.name,
      description: editorial[repo.name].description,
      category: editorial[repo.name].category,
      language: repo.language || "Multi-language",
      stars: repo.stargazers_count || 0,
      url: repo.html_url,
    }));

  return {
    source: "github-api",
    retrievedAt,
    organization: {
      login: org.login,
      name: org.name || org.login,
      description: org.description || "Intelligence in Motion",
      htmlUrl: org.html_url,
      publicRepos: org.public_repos,
      originalRepos: originals.length,
      totalStars: repos.reduce(
        (total, repo) => total + (repo.stargazers_count || 0),
        0,
      ),
      latestUpdate:
        repos
          .map((repo) => repo.updated_at)
          .filter(Boolean)
          .sort()
          .at(-1) || retrievedAt,
    },
    projects,
  };
}

export async function loadFallback(filePath = fallbackPath) {
  return JSON.parse(await readFile(filePath, "utf8"));
}

export async function fetchGitHubData(fetchImpl = fetch) {
  const headers = {
    Accept: "application/vnd.github+json",
    "User-Agent": "algovate-homepage-build",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const [orgResponse, reposResponse] = await Promise.all([
    fetchImpl("https://api.github.com/orgs/Algovate", { headers }),
    fetchImpl(
      "https://api.github.com/orgs/Algovate/repos?per_page=100&type=public",
      { headers },
    ),
  ]);

  if (!orgResponse.ok || !reposResponse.ok) {
    throw new Error(
      `GitHub API failed (${orgResponse.status}/${reposResponse.status})`,
    );
  }

  return normalizeGitHubData(
    await orgResponse.json(),
    await reposResponse.json(),
  );
}

export async function writeGeneratedData(data, destination = outputPath) {
  const temporary = `${destination}.tmp`;
  await writeFile(temporary, `${JSON.stringify(data, null, 2)}\n`);
  await rename(temporary, destination);
}

async function main() {
  try {
    const data = await fetchGitHubData();
    await writeGeneratedData(data);
    console.log(
      `GitHub data refreshed: ${data.organization.publicRepos} repositories, ${data.organization.totalStars} stars.`,
    );
  } catch (error) {
    const fallback = await loadFallback();
    await writeGeneratedData({ ...fallback, source: "fallback" });
    console.warn(`GitHub refresh failed; using fallback data: ${error.message}`);
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  await main();
}
