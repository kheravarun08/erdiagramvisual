import { useRef } from "react";
import { parseSQLToSchema } from "../../utils/sqlParser";

/**
 * All toolbar business logic.
 * Zero JSX. Fully testable without mounting any component.
 */
export function useToolbar(schema, onImport) {
  const fileRef = useRef();

  // ── Export ──────────────────────────────────────────────────────────────

  const exportJSON = () => {
    const blob = new Blob(
      [JSON.stringify(schema, null, 2)],
      { type: "application/json" }
    );
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "schema.json";
    a.click();
  };

  // ── Import JSON ──────────────────────────────────────────────────────────

  const openFilePicker = () => fileRef.current.click();

  const handleFileImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const parsed = JSON.parse(evt.target.result);
        onImport(parsed);
      } catch {
        alert("Invalid JSON file.");
      }
    };
    reader.readAsText(file);
  };

  // ── Import SQL ───────────────────────────────────────────────────────────

  const handleSQLImport = () => {
    const sql = window.prompt("Paste your CREATE TABLE SQL:");
    if (!sql) return;

    try {
      const newSchema = parseSQLToSchema(sql);
      if (newSchema.tables.length === 0) {
        alert("No tables found. Check your SQL syntax.");
        return;
      }
      onImport(newSchema);
    } catch (err) {
      alert("SQL parse error: " + err.message);
    }
  };

  return {
    fileRef,
    exportJSON,
    openFilePicker,
    handleFileImport,
    handleSQLImport,
  };
}