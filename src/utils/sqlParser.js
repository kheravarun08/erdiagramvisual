/**
 * Parses one or more CREATE TABLE SQL statements into the app's schema format.
 * Handles: column definitions, PRIMARY KEY inline + constraint,
 *          FOREIGN KEY ... REFERENCES, UNIQUE constraints.
 */
export function parseSQLToSchema(sql) {
  const tables = [];
  const relationships = [];

  // Match each CREATE TABLE block
  const tableRegex = /CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?`?(\w+)`?\s*\(([^;]+)\)/gi;
  let tableMatch;

  while ((tableMatch = tableRegex.exec(sql)) !== null) {
    const tableName = tableMatch[1];
    const body = tableMatch[2];
    const columns = [];

    // Collect FK column names so we can tag them
    const fkMap = {}; // colName → referencedTable
    const fkRegex =
      /FOREIGN\s+KEY\s*\(\s*`?(\w+)`?\s*\)\s*REFERENCES\s+`?(\w+)`?/gi;
    let fkMatch;
    while ((fkMatch = fkRegex.exec(body)) !== null) {
      fkMap[fkMatch[1]] = fkMatch[2];
      relationships.push({
        id: `${fkMatch[2]}-${tableName}-${fkMatch[1]}`,
        source: fkMatch[2],
        target: tableName,
        sourceColumn: "id",
        targetColumn: fkMatch[1],
        // type: "one-to-many",
      });
    }

    // Collect table-level PK columns: PRIMARY KEY (col1, col2)
    const tablePKSet = new Set();
    const tablePKRegex = /PRIMARY\s+KEY\s*\(\s*([^)]+)\)/gi;
    let pkMatch;
    while ((pkMatch = tablePKRegex.exec(body)) !== null) {
      pkMatch[1].split(",").forEach((c) => tablePKSet.add(c.trim().replace(/`/g, "")));
    }

    // Parse individual column definitions
    // Split by comma — but ignore commas inside parentheses (e.g. DECIMAL(10,2))
    const lines = splitTopLevelCommas(body);

    for (const rawLine of lines) {
      const line = rawLine.trim();

      // Skip constraint-only lines
      if (/^(PRIMARY|FOREIGN|UNIQUE|KEY|INDEX|CONSTRAINT)\b/i.test(line)) continue;

      // Match: `col_name` TYPE(...) [modifiers]
      const colMatch = /^`?(\w+)`?\s+([\w]+(?:\s*\([^)]*\))?)\s*(.*)/i.exec(line);
      if (!colMatch) continue;

      const colName = colMatch[1];
      const colType = colMatch[2] + (colMatch[0].match(/\([^)]*\)/) || [""])[0]; // preserve full type
      const modifiers = colMatch[3];

      const constraints = [];
      if (/PRIMARY\s+KEY/i.test(modifiers) || tablePKSet.has(colName)) constraints.push("PK");
      if (fkMap[colName]) constraints.push("FK");
      if (/\bUNIQUE\b/i.test(modifiers)) constraints.push("UNIQUE");
      if (/\bNOT\s+NULL\b/i.test(modifiers)) constraints.push("NOT NULL");

      columns.push({ name: colName, type: normalizeType(colType), constraints });
    }

    if (columns.length > 0) {
      tables.push({
        id: tableName,
        name: tableName,
        columns,
        // position assigned by auto-layout
        x: 40 + tables.length * 240,
        y: 60,
      });
    }
  }

  return { tables, relationships };
}

// ─── Helpers ────────────────────────────────────────────────────────────────

/** Split by top-level commas (ignore commas inside parentheses) */
function splitTopLevelCommas(str) {
  const result = [];
  let depth = 0, current = "";
  for (const ch of str) {
    if (ch === "(") depth++;
    else if (ch === ")") depth--;
    else if (ch === "," && depth === 0) { result.push(current); current = ""; continue; }
    current += ch;
  }
  if (current.trim()) result.push(current);
  return result;
}

/** Normalize SQL types to a clean uppercase form */
function normalizeType(raw) {
  return raw.trim().toUpperCase().replace(/\s+/g, " ");
}