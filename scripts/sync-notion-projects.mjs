import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const NOTION_VERSION = "2022-06-28";
const token = process.env.NOTION_TOKEN;
const databaseId = process.env.NOTION_DATABASE_ID;

if (!token || !databaseId) {
  throw new Error("NOTION_TOKEN and NOTION_DATABASE_ID are required.");
}

async function notionRequest(endpoint, options = {}) {
  const response = await fetch(`https://api.notion.com/v1${endpoint}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      "Notion-Version": NOTION_VERSION,
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Notion API request failed: ${response.status} ${body}`);
  }

  return response.json();
}

function plainText(items = []) {
  return items.map((item) => item.plain_text).join("");
}

function richTextToMarkdown(items = []) {
  return items
    .map((item) => {
      let text = item.plain_text;
      const href = item.href;
      const annotations = item.annotations ?? {};

      if (!text) return "";
      if (annotations.code) text = `\`${text}\``;
      if (annotations.bold) text = `**${text}**`;
      if (annotations.italic) text = `_${text}_`;
      if (annotations.strikethrough) text = `~~${text}~~`;
      if (href) text = `[${text}](${href})`;

      return text;
    })
    .join("");
}

function getTitle(properties, name) {
  return plainText(properties[name]?.title ?? "");
}

function getRichText(properties, name) {
  return richTextToMarkdown(properties[name]?.rich_text ?? []);
}

function getDate(properties, name) {
  return properties[name]?.date?.start ?? undefined;
}

function getSelect(properties, name) {
  return properties[name]?.select?.name ?? "";
}

function getMultiSelect(properties, name) {
  return (properties[name]?.multi_select ?? []).map((item) => item.name);
}

function getNumber(properties, name) {
  return properties[name]?.number ?? 0;
}

function getCheckbox(properties, name) {
  return properties[name]?.checkbox ?? false;
}

function getFiles(properties, name) {
  return (properties[name]?.files ?? [])
    .map((file) => {
      if (file.type === "external") return file.external?.url;
      if (file.type === "file") return file.file?.url;
      return undefined;
    })
    .filter(Boolean);
}

function blockToMarkdown(block) {
  const type = block.type;
  const value = block[type];

  switch (type) {
    case "paragraph":
      return richTextToMarkdown(value.rich_text);
    case "heading_1":
      return `# ${richTextToMarkdown(value.rich_text)}`;
    case "heading_2":
      return `## ${richTextToMarkdown(value.rich_text)}`;
    case "heading_3":
      return `### ${richTextToMarkdown(value.rich_text)}`;
    case "bulleted_list_item":
      return `- ${richTextToMarkdown(value.rich_text)}`;
    case "numbered_list_item":
      return `1. ${richTextToMarkdown(value.rich_text)}`;
    case "quote":
      return `> ${richTextToMarkdown(value.rich_text)}`;
    case "code":
      return `\`\`\`${value.language ?? ""}\n${plainText(value.rich_text)}\n\`\`\``;
    case "divider":
      return "---";
    case "image": {
      const url =
        value.type === "external" ? value.external?.url : value.file?.url;
      const caption = plainText(value.caption);
      return url ? `![${caption}](${url})` : "";
    }
    default:
      return "";
  }
}

async function getBlockChildren(blockId) {
  const results = [];
  let cursor;

  do {
    const searchParams = new URLSearchParams({ page_size: "100" });
    if (cursor) searchParams.set("start_cursor", cursor);

    const response = await notionRequest(
      `/blocks/${blockId}/children?${searchParams}`,
    );

    results.push(...response.results);
    cursor = response.has_more ? response.next_cursor : undefined;
  } while (cursor);

  return results;
}

async function getDescription(pageId) {
  const blocks = await getBlockChildren(pageId);

  return blocks
    .map(blockToMarkdown)
    .filter(Boolean)
    .join("\n\n");
}

async function queryProjects() {
  const results = [];
  let cursor;

  do {
    const body = {
      page_size: 100,
      filter: {
        property: "Published",
        checkbox: {
          equals: true,
        },
      },
      sorts: [
        {
          property: "Order",
          direction: "ascending",
        },
      ],
    };

    if (cursor) body.start_cursor = cursor;

    const response = await notionRequest(`/databases/${databaseId}/query`, {
      method: "POST",
      body: JSON.stringify(body),
    });

    results.push(...response.results);
    cursor = response.has_more ? response.next_cursor : undefined;
  } while (cursor);

  return results;
}

function toProject(page, index, description) {
  const properties = page.properties;
  const id = getRichText(properties, "Slug") || page.id;
  const images = getFiles(properties, "Images");

  return {
    index,
    id,
    title: getTitle(properties, "Name"),
    category: getSelect(properties, "Category"),
    startDate: getDate(properties, "Start Date"),
    endDate: getDate(properties, "End Date"),
    techTags: getMultiSelect(properties, "Tech Tags"),
    summary: getRichText(properties, "Summary"),
    description,
    image1: images[0],
    image2: images[1],
    image3: images[2],
    image4: images[3],
    image5: images[4],
  };
}

function pruneEmptyValues(project) {
  return Object.fromEntries(
    Object.entries(project).filter(([, value]) => {
      if (value === undefined || value === "") return false;
      if (Array.isArray(value) && value.length === 0) return false;
      return true;
    }),
  );
}

function renderProjectsFile(projects) {
  return `import { type Project } from "../types/Project";

export const projects: Project[] = ${JSON.stringify(projects, null, 2)};

export function getProjects(): Project[] {
  return projects;
}

export function getProjectById(id: string): Project | undefined {
  return projects.find((project) => project.id === id);
}
`;
}

const pages = await queryProjects();
const projects = await Promise.all(
  pages.map(async (page, index) => {
    const description = await getDescription(page.id);
    return pruneEmptyValues(toProject(page, index + 1, description));
  }),
);

const outputPath = path.resolve("src/data/projects.ts");
await mkdir(path.dirname(outputPath), { recursive: true });
await writeFile(outputPath, renderProjectsFile(projects), "utf8");

console.log(`Synced ${projects.length} projects from Notion.`);
