import "./Toolbar.css";

export default function ToolbarUI({
  fileRef,
  onAddTable,
  onAutoLayout,
  onSQLImport,
  onOpenFilePicker,
  onFileImport,
  onExportJSON,
  onClear,
}) {
  return (
    <div className="toolbar">

      {/* Brand */}
      <div className="toolbar__brand">
        <span className="toolbar__brand-icon">⊞</span>
        ER Diagram
      </div>

      <div className="toolbar__divider" />

      {/* Add table */}
      <button
        className="toolbar__btn toolbar__btn--primary"
        onClick={onAddTable}
        title="Add a new table"
      >
        + Add Table
      </button>

      <div className="toolbar__divider" />

      {/* SQL import */}
      <button
        className="toolbar__btn toolbar__btn--secondary"
        onClick={onSQLImport}
        title="Import from SQL CREATE TABLE statements"
      >
        ⬆ SQL Import
      </button>

      {/* JSON import */}
      {/* <button
        className="toolbar__btn toolbar__btn--secondary"
        onClick={onOpenFilePicker}
        title="Import from a JSON schema file"
      >
        📂 Import JSON
      </button>
      <input
        ref={fileRef}
        type="file"
        accept=".json"
        hidden
        onChange={onFileImport}
      /> */}

      {/* JSON export */}
      {/* <button
        className="toolbar__btn toolbar__btn--secondary"
        onClick={onExportJSON}
        title="Export schema as JSON"
      >
        ⬇ Export JSON
      </button> */}

      {/* Auto layout */}
      {/* <button
        className="toolbar__btn toolbar__btn--secondary"
        onClick={onAutoLayout}
        title="Auto-arrange all tables"
      >
        ⊟ Auto Layout
      </button>

      <div className="toolbar__spacer" /> */}

      {/* Clear — destructive, right-aligned */}
      <button
        className="toolbar__btn toolbar__btn--danger"
        onClick={onClear}
        title="Remove all tables and relationships"
      >
        🗑 Clear
      </button>

    </div>
  );
}