import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const root = process.cwd();

const pageSources = {
  "user-management": "html/user&access management/usermanagement.html",
  "all-instructors": "html/user&access management/instructor management/all instrutors.html",
  applications: "html/user&access management/instructor management/applications.html",
  "team-contacts": "html/user&access management/teams/team contacts.html",
  "team-members": "html/user&access management/teams/team members.html",
  "all-products": "html/products/all products.html",
  courses: "html/products/courses.html",
  "event-products": "html/products/event products.html",
  "session-instances": "html/products/session instances.html",
  bundles: "html/products/bundles.html",
  "course-content": "html/products/course content.html",
  enrollments: "html/enrollment&progress/enrollments.html",
  "user-subscriptions": "html/enrollment&progress/user subscriptions.html",
  "user-progress": "html/enrollment&progress/user progress & analytics.html",
  "certificate-management": "html/enrollment&progress/certificate management.html",
  transactions: "html/financials/transactions.html",
  "subscription-plans": "html/financials/subscription plans.html",
  payouts: "html/financials/payouts.html",
  coupons: "html/financials/coupons & promotions.html",
  collections: "html/community & engagement/communities-collections.html",
  posts: "html/community & engagement/communities-posts.html",
  spaces: "html/community & engagement/communities-spaces.html",
  reviews: "html/community & engagement/reviews & ratings.html",
  schools: "html/community & engagement/schools.html",
  "platform-settings": "html/platform/platform settings.html",
  "form-submissions": "html/platform/from submissions.html",
  "team-plans": "html/platform/team plans.html",
  notifications: "html/platform/notifications.html",
  "checklist-instances": "html/system & operations/check list instance.html",
  "search-management": "html/system & operations/search management.html",
  "marketing-emails": "html/system & operations/marketing emails.html",
  "system-health": "html/system & operations/system health & logs.html",
};

function decodeHtmlEntities(value) {
  return value
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'");
}

function extractAttribute(attrs, name) {
  const match = attrs.match(new RegExp(`${name}=["']([^"']*)["']`, "i"));
  return match?.[1] ?? "";
}

function cleanCell(cellHtml) {
  return decodeHtmlEntities(
    cellHtml
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<svg[\s\S]*?<\/svg>/gi, " ")
      .replace(/<img([^>]*)>/gi, (_, attrs) => {
        const src = extractAttribute(attrs, "src");
        const alt = extractAttribute(attrs, "alt");
        return ` [[img:${src}|${alt}]] `;
      })
      .replace(/<br\s*\/?\s*>/gi, " | ")
      .replace(/<input[^>]*>/gi, " ")
      .replace(/<button[^>]*>[\s\S]*?<\/button>/gi, " ")
      .replace(/<option[^>]*>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim(),
  );
}

function extractTables(html) {
  const tables = [];
  const tableMatches = html.matchAll(/<table[^>]*>([\s\S]*?)<\/table>/gi);

  for (const match of tableMatches) {
    const tableHtml = match[1];
    const headers = [...tableHtml.matchAll(/<th[^>]*>([\s\S]*?)<\/th>/gi)].map((item) => cleanCell(item[1]));
    const rowMatches = [...tableHtml.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)];
    const rows = [];

    for (const rowMatch of rowMatches) {
      const cells = [...rowMatch[1].matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi)].map((item) => cleanCell(item[1]));
      if (cells.length > 0) {
        rows.push(cells);
      }
    }

    if (!headers.length || !rows.length) {
      continue;
    }

    const keepIndexes = headers
      .map((header, index) => ({
        index,
        header,
        values: rows.map((row) => row[index] ?? ""),
      }))
      .filter(({ header, values }) => header || values.some((value) => value));

    tables.push({
      headers: keepIndexes.map(({ header }, index) => header || `Column ${index + 1}`),
      rows: rows.map((row) => keepIndexes.map(({ index }) => row[index] ?? "")),
    });
  }

  return tables;
}

function extractBalancedArray(source, startIndex) {
  let depth = 0;
  let quote = "";
  let escaped = false;

  for (let index = startIndex; index < source.length; index += 1) {
    const char = source[index];

    if (quote) {
      if (escaped) {
        escaped = false;
      } else if (char === "\\") {
        escaped = true;
      } else if (char === quote) {
        quote = "";
      }
      continue;
    }

    if (char === '"' || char === "'" || char === "`") {
      quote = char;
      continue;
    }

    if (char === "[") {
      depth += 1;
    } else if (char === "]") {
      depth -= 1;
      if (depth === 0) {
        return source.slice(startIndex, index + 1);
      }
    }
  }

  return null;
}

function extractDatasets(html) {
  const datasets = {};
  const matcher = /const\s+(\w+Data)\s*=\s*\[/g;

  for (const match of html.matchAll(matcher)) {
    const name = match[1];
    const arrayStart = match.index + match[0].lastIndexOf("[");
    const literal = extractBalancedArray(html, arrayStart);

    if (!literal) {
      continue;
    }

    try {
      const value = vm.runInNewContext(`(${literal})`, {});
      if (Array.isArray(value) && value.every((item) => item && typeof item === "object" && !Array.isArray(item))) {
        datasets[name] = value;
      }
    } catch {
      // Ignore arrays that are not plain data.
    }
  }

  return datasets;
}

const output = {};
for (const [pageId, relativePath] of Object.entries(pageSources)) {
  const filePath = path.join(root, relativePath);
  const html = fs.readFileSync(filePath, "utf8");
  output[pageId] = {
    source: relativePath.replaceAll("\\", "/"),
    tables: extractTables(html),
    datasets: extractDatasets(html),
  };
}

const targetPath = path.join(root, "src", "data", "legacyData.ts");
const fileContents = `export const legacyData = ${JSON.stringify(output, null, 2)} as const;\n`;
fs.writeFileSync(targetPath, fileContents, "utf8");
console.log(`Wrote ${targetPath}`);
